'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import type { Lang } from '@/lib/i18n';

interface ProvidersProps {
  children: React.ReactNode;
  lang: Lang;
}

export function Providers({ children, lang }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      <LanguageProvider lang={lang}>
        <TooltipProvider>
          <Toaster />
          {children}
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
