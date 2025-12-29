import type { Locale } from '@/i18n/routing';

export type { Locale };

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculatorResult {
  players: number;
  cpaEarnings: number;
  revshareEarnings: number;
  totalEarnings: number;
  currency: 'INR' | 'USD';
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PageParams {
  locale: Locale;
}

export interface PageProps<T = Record<string, never>> {
  params: Promise<PageParams & T>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}
