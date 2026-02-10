import { handleChat, type ChatEvent, type ChatRequest } from '@/server/chat/chat-service';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const body = await request.json();
  const { message, sessionId, language } = body as {
    message?: string;
    sessionId?: string;
    language?: string;
  };

  const encoder = new TextEncoder();

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const sendEvent = (event: ChatEvent) => {
    writer.write(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
  };

  // Validate
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    sendEvent({ type: 'error', message: 'Message is required' });
    writer.close();
    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  }

  if (!sessionId || typeof sessionId !== 'string') {
    sendEvent({ type: 'error', message: 'Session ID is required' });
    writer.close();
    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
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

  // Run chat in background, close writer when done
  (async () => {
    try {
      await handleChat(chatRequest, sendEvent);
    } catch (err) {
      console.error('[ChatRoute] Stream error:', err);
      sendEvent({ type: 'error', message: 'Internal server error' });
    } finally {
      writer.close();
    }
  })();

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
