'use client';

import { useState, useCallback } from 'react';
import { MessageCircle } from 'lucide-react';
import { ChatPanel } from './ChatPanel';

export function ChatFAB() {
  const [isOpen, setIsOpen] = useState(false);
  // Track whether the panel has ever been opened (lazy mount)
  const [hasOpened, setHasOpened] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setHasOpened(true);
  }, []);

  const handleMinimize = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Always render panel once opened — hide with CSS to preserve state */}
      {hasOpened && (
        <div className={isOpen ? '' : 'hidden'}>
          <ChatPanel onMinimize={handleMinimize} />
        </div>
      )}

      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-4 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
          aria-label="Open chat"
        >
          <MessageCircle className="size-6" />
        </button>
      )}
    </>
  );
}
