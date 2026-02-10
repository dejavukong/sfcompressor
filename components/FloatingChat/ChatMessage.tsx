import { User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { NavigationCard } from './NavigationCard';
import type { ChatMessage as ChatMessageType, NavigationItem } from './useChat';

interface ChatMessageProps {
  message: ChatMessageType;
  navigations?: NavigationItem[];
  language: 'zh' | 'en';
  onNavigate?: () => void;
}

export function ChatMessage({ message, navigations, language, onNavigate }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="size-7 shrink-0 mt-0.5 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="size-3.5 text-primary" />
        </div>
      )}

      <div className={`max-w-[85%] ${isUser ? '' : ''}`}>
        <div
          className={`rounded-lg px-3 py-2 text-sm ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-headings:my-2 prose-headings:text-sm prose-strong:text-inherit">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
        {!isUser && navigations && navigations.length > 0 && (
          <NavigationCard items={navigations} language={language} onNavigate={onNavigate} />
        )}
      </div>

      {isUser && (
        <div className="size-7 shrink-0 mt-0.5 rounded-full bg-secondary flex items-center justify-center">
          <User className="size-3.5 text-secondary-foreground" />
        </div>
      )}
    </div>
  );
}
