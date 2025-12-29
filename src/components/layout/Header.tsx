'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { DOGPLAY_URL } from '@/lib/metadata';
import LanguageSwitcher from './LanguageSwitcher';
import CTAButton from '@/components/ui/CTAButton';

export default function Header() {
  const t = useTranslations('Layout.nav');
  const locale = useLocale();

  const navItems = [
    { label: t('home'), href: '/' },
    { label: t('blog'), href: '/blog' },
    { label: t('about'), href: '/about' },
    { label: t('contact'), href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary-600">Dogplay</span>
              <span className="text-lg font-semibold text-slate-700">Agent</span>
            </Link>

            <nav className="hidden md:flex">
              <ul className="flex items-center gap-6">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-slate-600 transition-colors hover:text-primary-600"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <CTAButton
              href={DOGPLAY_URL}
              size="sm"
              className="hidden sm:inline-flex"
            >
              {locale === 'hi' ? 'अभी जुड़ें' : 'Join Now'}
            </CTAButton>
          </div>
        </div>
      </div>
    </header>
  );
}
