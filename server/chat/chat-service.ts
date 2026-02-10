import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { hybridSearch, type SearchResult } from './search';

let _openai: OpenAI | null = null;
function getOpenAI() {
  if (!_openai) _openai = new OpenAI();
  return _openai;
}

// --- Types ---

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  sessionId: string;
  language: 'zh' | 'en';
}

export type ChatEvent =
  | { type: 'searching' }
  | { type: 'thinking' }
  | { type: 'text'; content: string }
  | { type: 'navigation'; route: string; label_zh: string; label_en: string }
  | { type: 'done' }
  | { type: 'error'; message: string };

interface Session {
  messages: ChatMessage[];
  lastActivity: number;
}

// --- Session Management ---

const MAX_HISTORY = 10; // rounds (20 messages)
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

const sessions = new Map<string, Session>();

// Auto-cleanup expired sessions
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [id, session] of Array.from(sessions.entries())) {
    if (now - session.lastActivity > SESSION_TTL_MS) {
      sessions.delete(id);
    }
  }
}, CLEANUP_INTERVAL_MS);

// Allow the timer to not keep the process alive
if (cleanupTimer.unref) {
  cleanupTimer.unref();
}

function getSession(sessionId: string): Session {
  let session = sessions.get(sessionId);
  if (!session) {
    session = { messages: [], lastActivity: Date.now() };
    sessions.set(sessionId, session);
  }
  session.lastActivity = Date.now();
  return session;
}

export function clearSession(sessionId: string): void {
  sessions.delete(sessionId);
}

// --- System Prompt and Context Building ---

function buildSystemPrompt(language: 'zh' | 'en', context: string): string {
  return [
    '你是顺风压缩机官网的智能客服助手。',
    '',
    '严格规则：',
    '- 只能基于下方【参考资料】中的内容回答',
    '- 禁止使用你自身的知识进行补充、扩展或联想',
    '- 如果参考资料中没有相关信息，直接回复："抱歉，这个问题超出了我的服务范围，建议您联系我们：+86 025-52415588 或 nyxs@njysj.com"',
    '- 不要编造任何产品参数、价格、交期等信息',
    '',
    '【页面导航标记 — 必须遵守】',
    '参考资料中每条都有"页面"字段。你必须在回答末尾为所有相关页面添加 NAV 标记。',
    '格式：[NAV:{"route":"页面字段的值","label_zh":"中文描述","label_en":"English description"}]',
    '示例：',
    '  [NAV:{"route":"/projects","label_zh":"查看工程案例","label_en":"View Engineering Cases"}]',
    '  [NAV:{"route":"/products/marine/marine-air-cooled","label_zh":"查看风冷型船用压缩机","label_en":"View Air-Cooled Marine Compressor"}]',
    '  [NAV:{"route":"/certifications","label_zh":"查看资质认证","label_en":"View Certifications"}]',
    '规则：',
    '- route 必须使用参考资料中"页面"字段的精确值，不能编造',
    '- 优先指向最精确的页面（如具体产品页而非产品列表页）',
    '- 可以有多个 NAV 标记',
    '- 即使回答中已经用文字提到了页面，仍然必须添加 NAV 标记',
    '',
    `用户当前语言：${language}`,
    '请用对应语言回答。使用 Markdown 格式（加粗、列表、分段等）让回答清晰易读。',
    '',
    '【参考资料】',
    context,
  ].join('\n');
}

function buildContext(results: SearchResult[], language: 'zh' | 'en'): string {
  return results
    .map(r => {
      const content = language === 'zh' ? r.content_zh : r.content_en;
      return [
        '---',
        `来源: ${r.source} | 页面: ${r.page_route ?? 'N/A'}`,
        `标题: ${r.title_zh ?? 'N/A'} / ${r.title_en ?? 'N/A'}`,
        content,
        '---',
      ].join('\n');
    })
    .join('\n\n');
}

// --- NAV Marker Parsing ---

interface NavMarker {
  route: string;
  label_zh: string;
  label_en: string;
}

/**
 * Process text to detect and extract [NAV:{...}] markers.
 * Returns cleaned text and any navigation events found.
 */
function parseNavMarkers(text: string): { cleanText: string; navMarkers: NavMarker[] } {
  const navMarkers: NavMarker[] = [];
  const navPattern = /\[NAV:\s*(\{[^}]+\})\s*\]/g;
  let match: RegExpExecArray | null;

  while ((match = navPattern.exec(text)) !== null) {
    try {
      const parsed = JSON.parse(match[1]) as NavMarker;
      if (parsed.route && parsed.label_zh && parsed.label_en) {
        navMarkers.push(parsed);
      }
    } catch {
      // Skip malformed NAV markers
    }
  }

  const cleanText = text.replace(navPattern, '').trimEnd();
  return { cleanText, navMarkers };
}

// --- Core Chat Handler ---

export async function handleChat(
  req: ChatRequest,
  sendEvent: (event: ChatEvent) => void
): Promise<void> {
  const { message, sessionId, language } = req;

  try {
    // Step 1: Search
    sendEvent({ type: 'searching' });
    const results = await hybridSearch(message, language);

    // Step 2: Check relevance
    if (results.length === 0 || results[0].score < 0.15) {
      const errorMsg =
        language === 'zh'
          ? '抱歉，这个问题超出了我的服务范围，建议您联系我们：+86 025-52415588 或 nyxs@njysj.com'
          : 'Sorry, this question is beyond my service scope. Please contact us: +86 025-52415588 or nyxs@njysj.com';
      sendEvent({ type: 'error', message: errorMsg });
      return;
    }

    // Step 3: Prepare LLM call
    sendEvent({ type: 'thinking' });

    const context = buildContext(results, language);
    const systemPrompt = buildSystemPrompt(language, context);

    const session = getSession(sessionId);

    // Build messages array with history (limited to MAX_HISTORY rounds = 2*MAX_HISTORY messages)
    const historyMessages = session.messages.slice(-(MAX_HISTORY * 2));
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...historyMessages.map(
        (m): ChatCompletionMessageParam => ({
          role: m.role,
          content: m.content,
        })
      ),
      { role: 'user', content: message },
    ];

    // Step 4: Stream response from OpenAI
    const stream = await getOpenAI().chat.completions.create({
      model: 'gpt-4o',
      messages,
      stream: true,
    });

    // Buffer for detecting NAV markers across chunk boundaries
    let buffer = '';
    let fullResponse = '';

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (!content) continue;

      buffer += content;

      // Process buffer: look for complete text segments and NAV markers
      // Keep buffering if we see an incomplete [NAV: pattern at the end
      const incompleteNavIndex = findIncompleteNavStart(buffer);

      if (incompleteNavIndex === -1) {
        // No incomplete NAV marker - flush the entire buffer
        flushBuffer(buffer, sendEvent);
        fullResponse += buffer;
        buffer = '';
      } else if (incompleteNavIndex > 0) {
        // Flush everything before the potential NAV marker
        const safe = buffer.slice(0, incompleteNavIndex);
        flushBuffer(safe, sendEvent);
        fullResponse += safe;
        buffer = buffer.slice(incompleteNavIndex);
      }
      // else incompleteNavIndex === 0, keep buffering
    }

    // Flush any remaining buffer
    if (buffer.length > 0) {
      flushBuffer(buffer, sendEvent);
      fullResponse += buffer;
    }

    // Step 5: Fallback navigation — if GPT didn't produce NAV markers, derive them from search results
    const { cleanText, navMarkers } = parseNavMarkers(fullResponse);
    if (navMarkers.length === 0) {
      emitFallbackNavigation(results, language, sendEvent);
    }

    // Step 6: Save to session
    session.messages.push({ role: 'user', content: message });
    session.messages.push({ role: 'assistant', content: cleanText });

    // Trim session to MAX_HISTORY rounds
    if (session.messages.length > MAX_HISTORY * 2) {
      session.messages = session.messages.slice(-(MAX_HISTORY * 2));
    }

    sendEvent({ type: 'done' });
  } catch (err) {
    console.error('[ChatService] Error handling chat:', err);
    const errorMsg =
      language === 'zh'
        ? '服务暂时不可用，请稍后重试。'
        : 'Service temporarily unavailable. Please try again later.';
    sendEvent({ type: 'error', message: errorMsg });
  }
}

/**
 * Find the start index of an incomplete [NAV: pattern at the end of the buffer.
 * Returns -1 if no incomplete pattern is found.
 */
function findIncompleteNavStart(text: string): number {
  // Check if the buffer ends with a partial "[NAV:" or "[NAV:{...}" without closing "]"
  const navPrefix = '[NAV:';

  // First check for a complete but unclosed [NAV: marker
  const lastNavOpen = text.lastIndexOf(navPrefix);
  if (lastNavOpen !== -1) {
    const closingBracket = text.indexOf(']', lastNavOpen);
    if (closingBracket === -1) {
      // Incomplete NAV marker found
      return lastNavOpen;
    }
  }

  // Check for partial starts at the end of the buffer: "[", "[N", "[NA", "[NAV", "[NAV:"
  for (let len = 1; len < navPrefix.length; len++) {
    const suffix = navPrefix.slice(0, len);
    if (text.endsWith(suffix)) {
      return text.length - len;
    }
  }

  return -1;
}

// --- Route label mapping for fallback navigation ---

const ROUTE_LABELS: Record<string, { label_zh: string; label_en: string }> = {
  '/products': { label_zh: '查看全部产品', label_en: 'View All Products' },
  '/products/marine': { label_zh: '查看船用压缩机', label_en: 'View Marine Compressors' },
  '/products/industrial': { label_zh: '查看工艺压缩机', label_en: 'View Industrial Compressors' },
  '/products/parts': { label_zh: '查看压力容器及配件', label_en: 'View Vessels & Parts' },
  '/projects': { label_zh: '查看工程案例', label_en: 'View Engineering Cases' },
  '/certifications': { label_zh: '查看资质认证', label_en: 'View Certifications' },
  '/about': { label_zh: '关于我们', label_en: 'About Us' },
  '/contact': { label_zh: '联系我们', label_en: 'Contact Us' },
  '/service': { label_zh: '服务与支持', label_en: 'Service & Support' },
};

/**
 * Fallback: emit navigation events from search results when GPT didn't produce NAV markers.
 * Picks the most relevant page_route from the top search results (deduped, max 2).
 */
function emitFallbackNavigation(
  results: SearchResult[],
  language: 'zh' | 'en',
  sendEvent: (event: ChatEvent) => void
): void {
  const seen = new Set<string>();
  for (const r of results) {
    if (!r.page_route || r.page_route === '/' || seen.has(r.page_route)) continue;
    seen.add(r.page_route);

    const labels = ROUTE_LABELS[r.page_route];
    const label_zh = labels?.label_zh ?? r.title_zh ?? '查看详情';
    const label_en = labels?.label_en ?? r.title_en ?? 'View Details';

    sendEvent({
      type: 'navigation',
      route: r.page_route,
      label_zh,
      label_en,
    });

    if (seen.size >= 2) break;
  }
}

/**
 * Flush buffer text: extract complete NAV markers and emit text/navigation events.
 */
function flushBuffer(text: string, sendEvent: (event: ChatEvent) => void): void {
  const { cleanText, navMarkers } = parseNavMarkers(text);

  if (cleanText.length > 0) {
    sendEvent({ type: 'text', content: cleanText });
  }

  for (const nav of navMarkers) {
    sendEvent({
      type: 'navigation',
      route: nav.route,
      label_zh: nav.label_zh,
      label_en: nav.label_en,
    });
  }
}
