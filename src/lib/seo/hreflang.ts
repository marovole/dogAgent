import { SITE_URL } from '@/lib/metadata';
import { locales, type Locale } from '@/i18n/routing';

export function generateAlternates(pathname: string, currentLocale: Locale) {
  const languages: Record<string, string> = {};

  locales.forEach((locale) => {
    const url = locale === 'en' ? `${SITE_URL}${pathname}` : `${SITE_URL}/${locale}${pathname}`;
    const hreflangCode = locale === 'en' ? 'en-IN' : 'hi-IN';
    languages[hreflangCode] = url;
  });

  languages['x-default'] = `${SITE_URL}${pathname}`;

  const canonical = currentLocale === 'en' ? `${SITE_URL}${pathname}` : `${SITE_URL}/${currentLocale}${pathname}`;

  return {
    canonical,
    languages,
  };
}

export function getLocalizedUrl(pathname: string, locale: Locale): string {
  if (locale === 'en') {
    return `${SITE_URL}${pathname}`;
  }
  return `${SITE_URL}/${locale}${pathname}`;
}
