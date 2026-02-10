import { useEffect, useRef } from 'react';
import { Minus, RotateCcw, Loader2, Search, Brain } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useChat } from './useChat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface ChatPanelProps {
  onMinimize: () => void;
}

export function ChatPanel({ onMinimize }: ChatPanelProps) {
  const { language, t } = useLanguage();
  const { messages, navigations, status, error, sendMessage, clearSession } = useChat(language);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  const statusText = (() => {
    switch (status) {
      case 'searching':
        return language === 'zh' ? '正在检索...' : 'Searching...';
      case 'thinking':
        return language === 'zh' ? '正在思考...' : 'Thinking...';
      default:
        return null;
    }
  })();

  const placeholder = language === 'zh'
    ? '请输入您的问题...'
    : 'Type your question...';

  return (
    <div className="fixed bottom-20 right-4 z-50 flex h-[min(600px,80vh)] w-[420px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border bg-card shadow-2xl sm:bottom-24 sm:right-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-green-500" />
          <h3 className="text-sm font-semibold">
            {language === 'zh' ? '智能客服' : 'AI Assistant'}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          {/* New Chat — clears history */}
          <button
            onClick={clearSession}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title={language === 'zh' ? '新对话' : 'New Chat'}
          >
            <RotateCcw className="size-3.5" />
          </button>
          {/* Minimize — preserves history */}
          <button
            onClick={onMinimize}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title={language === 'zh' ? '最小化' : 'Minimize'}
          >
            <Minus className="size-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto px-4 py-3 space-y-4"
      >
        {messages.length === 0 && !error && (
          <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
            <p className="text-sm text-center leading-relaxed">
              {language === 'zh'
                ? '您好！我是顺风压缩机智能客服，有什么可以帮您？'
                : 'Hello! I am Shunfeng Compressor AI assistant. How can I help you?'}
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg}
            navigations={navigations.get(index)}
            language={language}
            onNavigate={onMinimize}
          />
        ))}

        {/* Status indicator */}
        {(status === 'searching' || status === 'thinking') && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {status === 'searching' ? (
              <Search className="size-3.5 animate-pulse" />
            ) : (
              <Brain className="size-3.5 animate-pulse" />
            )}
            <span>{statusText}</span>
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput
        onSend={sendMessage}
        disabled={status !== 'idle'}
        placeholder={placeholder}
      />
    </div>
  );
}
