'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { zh } from '../locales/zh';
import { en } from '../locales/en';
import type { Lang, TranslationKey } from '../lib/i18n';

interface LanguageContextType {
  language: Lang;
  setLanguage: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const translations = { zh, en } as const;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
  lang: Lang;
}

export function LanguageProvider({ children, lang }: LanguageProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const setLanguage = useCallback(
    (newLang: Lang) => {
      // Replace /zh/ or /en/ prefix in the URL
      const newPathname = pathname.replace(`/${lang}`, `/${newLang}`);
      router.push(newPathname);
    },
    [lang, pathname, router]
  );

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[lang]?.[key] ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ language: lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
