import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import type { PageProps, Locale } from '@/types';
import { generateAlternates } from '@/lib/seo/hreflang';
import Container from '@/components/ui/Container';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Legal.about' });
  return {
    title: t('title'),
    alternates: generateAlternates('/about', locale as Locale),
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Legal.about');

  return (
    <section className="section-padding bg-white">
      <Container className="max-w-4xl">
        <h1 className="heading-2 text-slate-900">{t('title')}</h1>
        <div className="mt-8 prose prose-slate max-w-none">
          <p>{t('content')}</p>
          <h2>Our Mission</h2>
          <p>
            We aim to connect ambitious affiliates with one of Asia&apos;s leading gaming platforms.
            Our program offers transparent commissions, reliable payments, and dedicated support
            to help you succeed in the competitive iGaming market.
          </p>
          <h2>Editorial Standards</h2>
          <p>
            All content published on this website is created by our editorial team with a focus on
            accuracy, transparency, and value for our readers. We clearly disclose our affiliate
            relationships and ensure all claims are fact-checked.
          </p>
        </div>
      </Container>
    </section>
  );
}
