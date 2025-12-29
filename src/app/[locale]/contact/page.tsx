import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import type { PageProps, Locale } from '@/types';
import { generateAlternates } from '@/lib/seo/hreflang';
import Container from '@/components/ui/Container';
import { CONTACT_EMAIL } from '@/lib/metadata';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Legal.contact' });
  return {
    title: t('title'),
    alternates: generateAlternates('/contact', locale as Locale),
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Legal.contact');

  return (
    <section className="section-padding bg-white">
      <Container className="max-w-4xl">
        <h1 className="heading-2 text-slate-900">{t('title')}</h1>
        <div className="mt-8 prose prose-slate max-w-none">
          <p>{t('support')}</p>
          <div className="mt-8 rounded-lg bg-slate-50 p-6">
            <h2 className="mt-0">Partner Support</h2>
            <p className="mb-0">
              <strong>Email:</strong>{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary-600">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
          <h2>Response Time</h2>
          <p>
            We typically respond to all inquiries within 24 hours during business days.
            For urgent matters, please indicate so in your email subject.
          </p>
        </div>
      </Container>
    </section>
  );
}
