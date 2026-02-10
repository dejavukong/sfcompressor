import { useState, useCallback, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface NavigationItem {
  route: string;
  label_zh: string;
  label_en: string;
}

export type ChatStatus = 'idle' | 'searching' | 'thinking' | 'streaming';

interface ChatEvent {
  type: 'searching' | 'thinking' | 'text' | 'navigation' | 'done' | 'error';
  content?: string;
  route?: string;
  label_zh?: string;
  label_en?: string;
  message?: string;
}

export function useChat(language: 'zh' | 'en') {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [navigations, setNavigations] = useState<Map<number, NavigationItem[]>>(new Map());
  const [status, setStatus] = useState<ChatStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const sessionIdRef = useRef(uuidv4());
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || status !== 'idle') return;

    setError(null);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: trimmed }]);

    // Track assistant message index for navigation cards
    const assistantIndex = messages.length + 1; // user msg is at messages.length, assistant at +1

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          sessionId: sessionIdRef.current,
          language,
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to connect to chat service');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let assistantContent = '';
      const navItems: NavigationItem[] = [];

      // Add empty assistant message placeholder
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Parse SSE lines
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (!jsonStr) continue;

          try {
            const event: ChatEvent = JSON.parse(jsonStr);

            switch (event.type) {
              case 'searching':
                setStatus('searching');
                break;
              case 'thinking':
                setStatus('thinking');
                break;
              case 'text':
                setStatus('streaming');
                assistantContent += event.content ?? '';
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    content: assistantContent,
                  };
                  return updated;
                });
                break;
              case 'navigation':
                if (event.route && event.label_zh && event.label_en) {
                  navItems.push({
                    route: event.route,
                    label_zh: event.label_zh,
                    label_en: event.label_en,
                  });
                  setNavigations(prev => {
                    const next = new Map(prev);
                    next.set(assistantIndex, [...navItems]);
                    return next;
                  });
                }
                break;
              case 'error':
                setError(event.message ?? 'Unknown error');
                // Remove empty assistant message if no content
                if (!assistantContent) {
                  setMessages(prev => prev.slice(0, -1));
                }
                break;
              case 'done':
                break;
            }
          } catch {
            // Skip malformed SSE data
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      const errorMsg = language === 'zh'
        ? '连接失败，请稍后重试。'
        : 'Connection failed. Please try again later.';
      setError(errorMsg);
      // Remove empty assistant message
      setMessages(prev => {
        if (prev.length > 0 && prev[prev.length - 1].role === 'assistant' && !prev[prev.length - 1].content) {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setStatus('idle');
      abortRef.current = null;
    }
  }, [language, messages.length, status]);

  const clearSession = useCallback(async () => {
    // Cancel any in-flight request
    abortRef.current?.abort();

    try {
      await fetch('/api/chat/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionIdRef.current }),
      });
    } catch {
      // Best effort
    }

    setMessages([]);
    setNavigations(new Map());
    setStatus('idle');
    setError(null);
    sessionIdRef.current = uuidv4();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  return {
    messages,
    navigations,
    status,
    error,
    sendMessage,
    clearSession,
  };
}
