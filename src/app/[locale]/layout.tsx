import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { inter, notoSansDevanagari } from '@/app/fonts';
import { routing, locales, type Locale } from '@/i18n/routing';
import { generateAlternates } from '@/lib/seo/hreflang';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/metadata';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const isHindi = locale === 'hi';

  return {
    title: isHindi
      ? 'Dogplay एजेंट - भारत का प्रमुख बेटिंग एफिलिएट प्रोग्राम'
      : "Dogplay Agent - India's Premier Betting Affiliate Program",
    description: isHindi
      ? 'Dogplay एजेंट प्रोग्राम से जुड़ें और 50% तक रेवेन्यू शेयर कमाएं।'
      : 'Join Dogplay Agent Program and earn up to 50% revenue share.',
    alternates: generateAlternates('/', locale as Locale),
    openGraph: {
      title: isHindi ? 'Dogplay एजेंट' : 'Dogplay Agent',
      description: isHindi
        ? 'भारत का प्रमुख बेटिंग एफिलिएट प्रोग्राम'
        : "India's Premier Betting Affiliate Program",
      url: SITE_URL,
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'Dogplay Agent',
        },
      ],
      locale: isHindi ? 'hi_IN' : 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: isHindi ? 'Dogplay एजेंट' : 'Dogplay Agent',
      description: isHindi
        ? 'भारत का प्रमुख बेटिंग एफिलिएट प्रोग्राम'
        : "India's Premier Betting Affiliate Program",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const langAttribute = locale === 'hi' ? 'hi-IN' : 'en-IN';
  const fontClass = locale === 'hi' ? notoSansDevanagari.variable : '';

  return (
    <html lang={langAttribute} className={`${inter.variable} ${fontClass}`}>
      <body className={`min-h-screen bg-white font-sans antialiased ${locale === 'hi' ? 'font-hindi' : ''}`}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
