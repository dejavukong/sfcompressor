import { zh } from '../locales/zh';
import { en } from '../locales/en';

export type Lang = 'zh' | 'en';
export type TranslationKey = keyof typeof zh;

export const SUPPORTED_LANGS: Lang[] = ['zh', 'en'];
export const DEFAULT_LANG: Lang = 'zh';

const dictionaries = { zh, en } as const;

export function getDictionary(lang: Lang) {
  return dictionaries[lang] ?? dictionaries[DEFAULT_LANG];
}

export function isValidLang(lang: string): lang is Lang {
  return SUPPORTED_LANGS.includes(lang as Lang);
}

export function t(lang: Lang, key: TranslationKey): string {
  return dictionaries[lang]?.[key] ?? key;
}
