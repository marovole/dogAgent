import { Inter, Noto_Sans_Devanagari } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  display: 'swap',
  variable: '--font-noto-devanagari',
  weight: ['400', '500', '600', '700'],
});
