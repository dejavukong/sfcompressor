import { Router } from 'express';
import { handleChat, clearSession, type ChatEvent, type ChatRequest } from './chat-service';

export function createChatRouter(): Router {
  const router = Router();

  // POST /api/chat/stream - SSE streaming chat
  router.post('/stream', async (req, res) => {
    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    const sendEvent = (event: ChatEvent) => {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    };

    try {
      const { message, sessionId, language } = req.body as {
        message?: string;
        sessionId?: string;
        language?: string;
      };

      // Validate required fields
      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        sendEvent({ type: 'error', message: 'Message is required' });
        res.end();
        return;
      }

      if (!sessionId || typeof sessionId !== 'string') {
        sendEvent({ type: 'error', message: 'Session ID is required' });
        res.end();
        return;
      }

      const validLanguages = ['zh', 'en'] as const;
      const lang = validLanguages.includes(language as 'zh' | 'en')
        ? (language as 'zh' | 'en')
        : 'zh';

      const chatRequest: ChatRequest = {
        message: message.trim(),
        sessionId,
        language: lang,
      };

      await handleChat(chatRequest, sendEvent);
    } catch (err) {
      console.error('[ChatRoutes] Stream error:', err);
      sendEvent({ type: 'error', message: 'Internal server error' });
    } finally {
      res.end();
    }
  });

  // POST /api/chat/clear - Clear session
  router.post('/clear', (req, res) => {
    const { sessionId } = req.body as { sessionId?: string };

    if (!sessionId || typeof sessionId !== 'string') {
      res.status(400).json({ error: 'Session ID is required' });
      return;
    }

    clearSession(sessionId);
    res.json({ success: true });
  });

  return router;
}
