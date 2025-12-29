import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'hi'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇮🇳',
  hi: '🇮🇳',
};
