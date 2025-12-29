import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import type { PageProps, Locale } from '@/types';
import { generateAlternates } from '@/lib/seo/hreflang';
import Container from '@/components/ui/Container';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Legal.terms' });
  return {
    title: t('title'),
    alternates: generateAlternates('/terms', locale as Locale),
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Legal.terms');

  return (
    <section className="section-padding bg-white">
      <Container className="max-w-4xl">
        <h1 className="heading-2 text-slate-900">{t('title')}</h1>
        <p className="mt-2 text-sm text-slate-500">{t('lastUpdated', { date: 'December 29, 2025' })}</p>
        <div className="mt-8 prose prose-slate max-w-none">
          <h2>Acceptance of Terms</h2>
          <p>By accessing or using our website, you agree to be bound by these Terms of Service.</p>
          <h2>Affiliate Program</h2>
          <p>Participation in the Dogplay Agent affiliate program is subject to separate affiliate terms and conditions.</p>
          <h2>Content</h2>
          <p>All content on this website is for informational purposes only and does not constitute financial or legal advice.</p>
          <h2>Limitation of Liability</h2>
          <p>We are not liable for any damages arising from your use of this website or participation in our affiliate program.</p>
        </div>
      </Container>
    </section>
  );
}
