import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import { createChatRouter } from './routes.js';

// Mock the chat-service module
vi.mock('./chat-service.js', () => ({
  handleChat: vi.fn(),
  clearSession: vi.fn(),
}));

import { handleChat, clearSession } from './chat-service.js';

const mockHandleChat = vi.mocked(handleChat);
const mockClearSession = vi.mocked(clearSession);

function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/chat', createChatRouter());
  return app;
}

describe('Chat Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/chat/stream', () => {
    it('should return error when message is missing', async () => {
      const app = createApp();

      const res = await request(app)
        .post('/api/chat/stream')
        .send({ sessionId: 'test-session', language: 'zh' })
        .expect(200); // SSE always returns 200

      const lines = res.text.split('\n').filter((l: string) => l.startsWith('data: '));
      expect(lines.length).toBeGreaterThan(0);

      const event = JSON.parse(lines[0].slice(6));
      expect(event.type).toBe('error');
      expect(event.message).toBe('Message is required');
    });

    it('should return error when sessionId is missing', async () => {
      const app = createApp();

      const res = await request(app)
        .post('/api/chat/stream')
        .send({ message: 'test', language: 'zh' })
        .expect(200);

      const lines = res.text.split('\n').filter((l: string) => l.startsWith('data: '));
      const event = JSON.parse(lines[0].slice(6));
      expect(event.type).toBe('error');
      expect(event.message).toBe('Session ID is required');
    });

    it('should return error when message is empty string', async () => {
      const app = createApp();

      const res = await request(app)
        .post('/api/chat/stream')
        .send({ message: '  ', sessionId: 'test', language: 'zh' })
        .expect(200);

      const lines = res.text.split('\n').filter((l: string) => l.startsWith('data: '));
      const event = JSON.parse(lines[0].slice(6));
      expect(event.type).toBe('error');
      expect(event.message).toBe('Message is required');
    });

    it('should default to zh when language is invalid', async () => {
      const app = createApp();
      mockHandleChat.mockImplementation(async () => {});

      await request(app)
        .post('/api/chat/stream')
        .send({ message: 'hello', sessionId: 'test', language: 'fr' })
        .expect(200);

      expect(mockHandleChat).toHaveBeenCalledWith(
        expect.objectContaining({ language: 'zh' }),
        expect.any(Function),
      );
    });

    it('should call handleChat with valid request', async () => {
      const app = createApp();
      mockHandleChat.mockImplementation(async (_req, sendEvent) => {
        sendEvent({ type: 'text', content: 'Hello!' });
        sendEvent({ type: 'done' });
      });

      const res = await request(app)
        .post('/api/chat/stream')
        .send({ message: 'test question', sessionId: 'session-1', language: 'en' })
        .expect(200);

      expect(mockHandleChat).toHaveBeenCalledWith(
        {
          message: 'test question',
          sessionId: 'session-1',
          language: 'en',
        },
        expect.any(Function),
      );

      // Check SSE format
      expect(res.headers['content-type']).toBe('text/event-stream');
      expect(res.headers['cache-control']).toBe('no-cache');

      const lines = res.text.split('\n').filter((l: string) => l.startsWith('data: '));
      expect(lines.length).toBe(2);

      const textEvent = JSON.parse(lines[0].slice(6));
      expect(textEvent).toEqual({ type: 'text', content: 'Hello!' });

      const doneEvent = JSON.parse(lines[1].slice(6));
      expect(doneEvent).toEqual({ type: 'done' });
    });

    it('should trim the message before passing to handler', async () => {
      const app = createApp();
      mockHandleChat.mockImplementation(async () => {});

      await request(app)
        .post('/api/chat/stream')
        .send({ message: '  hello  ', sessionId: 'test', language: 'zh' })
        .expect(200);

      expect(mockHandleChat).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'hello' }),
        expect.any(Function),
      );
    });

    it('should handle internal errors from handleChat', async () => {
      const app = createApp();
      mockHandleChat.mockRejectedValue(new Error('unexpected'));

      const res = await request(app)
        .post('/api/chat/stream')
        .send({ message: 'test', sessionId: 'test', language: 'zh' })
        .expect(200);

      const lines = res.text.split('\n').filter((l: string) => l.startsWith('data: '));
      expect(lines.length).toBeGreaterThan(0);

      const event = JSON.parse(lines[0].slice(6));
      expect(event.type).toBe('error');
      expect(event.message).toBe('Internal server error');
    });
  });

  describe('POST /api/chat/clear', () => {
    it('should return 400 when sessionId is missing', async () => {
      const app = createApp();

      await request(app)
        .post('/api/chat/clear')
        .send({})
        .expect(400);
    });

    it('should call clearSession and return success', async () => {
      const app = createApp();

      const res = await request(app)
        .post('/api/chat/clear')
        .send({ sessionId: 'test-session' })
        .expect(200);

      expect(mockClearSession).toHaveBeenCalledWith('test-session');
      expect(res.body).toEqual({ success: true });
    });
  });
});
