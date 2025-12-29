'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => handleChange(e.target.value as Locale)}
        className="appearance-none rounded-md border border-slate-300 bg-white py-1.5 pl-3 pr-8 text-sm font-medium text-slate-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        aria-label="Select language"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
