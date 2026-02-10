import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Shared mock — must be hoisted before vi.mock
const mockCreate = vi.hoisted(() => vi.fn());

vi.mock('openai', () => ({
  default: vi.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: mockCreate,
      },
    },
  })),
}));

vi.mock('./search.js', () => ({
  hybridSearch: vi.fn(),
}));

import { handleChat, clearSession, type ChatEvent, type ChatRequest } from './chat-service.js';
import { hybridSearch } from './search.js';

const mockHybridSearch = vi.mocked(hybridSearch);

function createMockStream(chunks: string[]) {
  return {
    async *[Symbol.asyncIterator]() {
      for (const content of chunks) {
        yield {
          choices: [{ delta: { content } }],
        };
      }
    },
  };
}

const relevantResult = {
  id: 1,
  source: 'products',
  source_id: 'marine-air',
  page_route: '/products',
  title_zh: '船用压缩机',
  title_en: 'Marine Compressor',
  content_zh: '高品质船用压缩机',
  content_en: 'High quality marine compressor',
  score: 0.85,
  metadata: {},
};

describe('ChatService', () => {
  let events: ChatEvent[];
  let sendEvent: (event: ChatEvent) => void;

  beforeEach(() => {
    events = [];
    sendEvent = (event) => events.push(event);
    vi.clearAllMocks();
  });

  afterEach(() => {
    clearSession('test-session');
  });

  describe('handleChat', () => {
    it('should return error when no relevant search results', async () => {
      mockHybridSearch.mockResolvedValue([]);

      const req: ChatRequest = {
        message: 'irrelevant question',
        sessionId: 'test-session',
        language: 'zh',
      };

      await handleChat(req, sendEvent);

      expect(events).toEqual([
        { type: 'searching' },
        { type: 'error', message: expect.stringContaining('025-52415588') },
      ]);
    });

    it('should return error when best score is below threshold', async () => {
      mockHybridSearch.mockResolvedValue([
        { ...relevantResult, score: 0.1 },
      ]);

      const req: ChatRequest = {
        message: 'low relevance query',
        sessionId: 'test-session',
        language: 'en',
      };

      await handleChat(req, sendEvent);

      expect(events[0]).toEqual({ type: 'searching' });
      expect(events[1]).toEqual({
        type: 'error',
        message: expect.stringContaining('beyond my service scope'),
      });
    });

    it('should stream response when search results are relevant', async () => {
      mockHybridSearch.mockResolvedValue([relevantResult]);
      mockCreate.mockResolvedValue(createMockStream(['Hello', ' world']));

      const req: ChatRequest = {
        message: '你们有什么产品？',
        sessionId: 'test-session',
        language: 'zh',
      };

      await handleChat(req, sendEvent);

      expect(events[0]).toEqual({ type: 'searching' });
      expect(events[1]).toEqual({ type: 'thinking' });

      const textEvents = events.filter(e => e.type === 'text');
      expect(textEvents.length).toBeGreaterThan(0);

      expect(events[events.length - 1]).toEqual({ type: 'done' });
    });

    it('should parse NAV markers and emit navigation events', async () => {
      mockHybridSearch.mockResolvedValue([relevantResult]);

      const navMarker = '[NAV:{"route":"/products","label_zh":"查看产品","label_en":"View Products"}]';
      mockCreate.mockResolvedValue(createMockStream(['Some answer ', navMarker]));

      const req: ChatRequest = {
        message: '产品',
        sessionId: 'test-session',
        language: 'zh',
      };

      await handleChat(req, sendEvent);

      const navEvents = events.filter(e => e.type === 'navigation');
      expect(navEvents.length).toBe(1);
      expect(navEvents[0]).toEqual({
        type: 'navigation',
        route: '/products',
        label_zh: '查看产品',
        label_en: 'View Products',
      });

      // Text should NOT contain the NAV marker
      const textContent = events
        .filter(e => e.type === 'text')
        .map(e => (e as { type: 'text'; content: string }).content)
        .join('');
      expect(textContent).not.toContain('[NAV:');
    });

    it('should handle multiple NAV markers', async () => {
      mockHybridSearch.mockResolvedValue([relevantResult]);

      const nav1 = '[NAV:{"route":"/products","label_zh":"查看产品","label_en":"View Products"}]';
      const nav2 = '[NAV:{"route":"/contact","label_zh":"联系我们","label_en":"Contact Us"}]';
      mockCreate.mockResolvedValue(createMockStream([`Answer ${nav1}${nav2}`]));

      const req: ChatRequest = {
        message: 'test',
        sessionId: 'test-session',
        language: 'zh',
      };

      await handleChat(req, sendEvent);

      const navEvents = events.filter(e => e.type === 'navigation');
      expect(navEvents.length).toBe(2);
    });

    it('should handle errors gracefully with Chinese message', async () => {
      mockHybridSearch.mockRejectedValue(new Error('DB connection failed'));

      const req: ChatRequest = {
        message: 'test',
        sessionId: 'test-session',
        language: 'zh',
      };

      await handleChat(req, sendEvent);

      const errorEvents = events.filter(e => e.type === 'error');
      expect(errorEvents.length).toBe(1);
      expect((errorEvents[0] as { type: 'error'; message: string }).message).toContain('服务暂时不可用');
    });

    it('should handle errors with English message when language is en', async () => {
      mockHybridSearch.mockRejectedValue(new Error('DB connection failed'));

      const req: ChatRequest = {
        message: 'test',
        sessionId: 'test-session',
        language: 'en',
      };

      await handleChat(req, sendEvent);

      const errorEvents = events.filter(e => e.type === 'error');
      expect(errorEvents.length).toBe(1);
      expect((errorEvents[0] as { type: 'error'; message: string }).message).toContain('temporarily unavailable');
    });
  });

  describe('session management', () => {
    it('should maintain conversation history within session', async () => {
      mockHybridSearch.mockResolvedValue([relevantResult]);
      mockCreate.mockResolvedValue(createMockStream(['Response 1']));

      // First message
      await handleChat(
        { message: 'Hello', sessionId: 'session-1', language: 'zh' },
        sendEvent,
      );

      // Second message
      events = [];
      mockCreate.mockResolvedValue(createMockStream(['Response 2']));

      await handleChat(
        { message: 'Follow up', sessionId: 'session-1', language: 'zh' },
        sendEvent,
      );

      // The second call should include history from the first call
      const secondCallArgs = mockCreate.mock.calls[1][0] as {
        messages: Array<{ role: string; content: string }>;
      };
      const messages = secondCallArgs.messages;

      // Should have: system + user1 + assistant1 + user2
      expect(messages.length).toBe(4);
      expect(messages[0].role).toBe('system');
      expect(messages[1]).toEqual({ role: 'user', content: 'Hello' });
      expect(messages[2]).toEqual({ role: 'assistant', content: 'Response 1' });
      expect(messages[3]).toEqual({ role: 'user', content: 'Follow up' });

      clearSession('session-1');
    });

    it('should not share history between different sessions', async () => {
      mockHybridSearch.mockResolvedValue([relevantResult]);
      mockCreate.mockResolvedValue(createMockStream(['Response']));

      // Message to session A
      await handleChat(
        { message: 'Hello A', sessionId: 'session-a', language: 'zh' },
        sendEvent,
      );

      // Message to session B
      events = [];
      mockCreate.mockResolvedValue(createMockStream(['Response B']));

      await handleChat(
        { message: 'Hello B', sessionId: 'session-b', language: 'zh' },
        sendEvent,
      );

      // Session B should NOT have session A's history
      const secondCallArgs = mockCreate.mock.calls[1][0] as {
        messages: Array<{ role: string; content: string }>;
      };
      const messages = secondCallArgs.messages;

      // Should only have: system + user (no history from session-a)
      expect(messages.length).toBe(2);

      clearSession('session-a');
      clearSession('session-b');
    });

    it('should clear session data on clearSession', async () => {
      mockHybridSearch.mockResolvedValue([relevantResult]);
      mockCreate.mockResolvedValue(createMockStream(['Response']));

      await handleChat(
        { message: 'Hello', sessionId: 'clear-test', language: 'zh' },
        sendEvent,
      );

      clearSession('clear-test');

      // Next message should not have history
      events = [];
      mockCreate.mockResolvedValue(createMockStream(['Fresh response']));

      await handleChat(
        { message: 'New question', sessionId: 'clear-test', language: 'zh' },
        sendEvent,
      );

      const callArgs = mockCreate.mock.calls[1][0] as {
        messages: Array<{ role: string; content: string }>;
      };
      const messages = callArgs.messages;

      // Only system + current user message (no history)
      expect(messages.length).toBe(2);
    });
  });
});
