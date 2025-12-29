import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import type { PageProps, Locale } from '@/types';
import { generateAlternates } from '@/lib/seo/hreflang';
import Container from '@/components/ui/Container';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Legal.affiliateDisclosure' });
  return {
    title: t('title'),
    alternates: generateAlternates('/affiliate-disclosure', locale as Locale),
  };
}

export default async function AffiliateDisclosurePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Legal.affiliateDisclosure');

  return (
    <section className="section-padding bg-white">
      <Container className="max-w-4xl">
        <h1 className="heading-2 text-slate-900">{t('title')}</h1>
        <div className="mt-8 prose prose-slate max-w-none">
          <div className="rounded-lg bg-amber-50 p-6 not-prose mb-8">
            <p className="text-amber-800">{t('content')}</p>
          </div>
          <h2>What This Means</h2>
          <p>
            Links on this website that point to Dogplay.io are affiliate links. When you click these
            links and sign up or make a deposit, we may receive a commission. This is at no additional
            cost to you.
          </p>
          <h2>Our Commitment</h2>
          <p>
            Despite our affiliate relationship, we strive to provide honest, accurate, and helpful
            information. Our recommendations are based on the merits of the programs we promote.
          </p>
          <h2>FTC Compliance</h2>
          <p>
            This disclosure is made in accordance with the Federal Trade Commission&apos;s guidelines
            on endorsements and testimonials.
          </p>
        </div>
      </Container>
    </section>
  );
}
