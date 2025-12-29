import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import type { PageProps, Locale } from '@/types';
import { generateAlternates } from '@/lib/seo/hreflang';
import Container from '@/components/ui/Container';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Legal.privacy' });
  return {
    title: t('title'),
    alternates: generateAlternates('/privacy', locale as Locale),
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Legal.privacy');

  return (
    <section className="section-padding bg-white">
      <Container className="max-w-4xl">
        <h1 className="heading-2 text-slate-900">{t('title')}</h1>
        <p className="mt-2 text-sm text-slate-500">{t('lastUpdated', { date: 'December 29, 2025' })}</p>
        <div className="mt-8 prose prose-slate max-w-none">
          <h2>Information We Collect</h2>
          <p>We may collect information you provide directly to us, such as when you sign up for our affiliate program or contact us for support.</p>
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to operate and improve our affiliate program, communicate with you, and comply with legal obligations.</p>
          <h2>Cookies</h2>
          <p>We use cookies and similar technologies to track affiliate referrals and improve your experience on our website.</p>
          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at partners@dogplay.io.</p>
        </div>
      </Container>
    </section>
  );
}
