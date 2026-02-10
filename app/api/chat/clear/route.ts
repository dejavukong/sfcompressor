import { clearSession } from '@/server/chat/chat-service';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const body = await request.json();
  const { sessionId } = body as { sessionId?: string };

  if (!sessionId || typeof sessionId !== 'string') {
    return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
  }

  clearSession(sessionId);
  return NextResponse.json({ success: true });
}
