import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import type { PageProps, Locale } from '@/types';
import { generateAlternates } from '@/lib/seo/hreflang';
import Container from '@/components/ui/Container';
import AgeGate from '@/components/compliance/AgeGate';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Legal.responsibleGambling' });
  return {
    title: t('title'),
    alternates: generateAlternates('/responsible-gambling', locale as Locale),
  };
}

export default async function ResponsibleGamblingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Legal.responsibleGambling');

  return (
    <section className="section-padding bg-white">
      <Container className="max-w-4xl">
        <h1 className="heading-2 text-slate-900">{t('title')}</h1>
        <div className="mt-8">
          <div className="rounded-lg bg-red-50 p-6 mb-8">
            <AgeGate />
          </div>
        </div>
        <div className="prose prose-slate max-w-none">
          <div className="rounded-lg bg-amber-50 p-6 not-prose mb-8">
            <p className="text-amber-800 font-medium">{t('warning')}</p>
          </div>
          <h2>Age Restriction</h2>
          <p>{t('ageRestriction')}</p>
          <h2>Signs of Problem Gambling</h2>
          <ul>
            <li>Spending more money than you can afford to lose</li>
            <li>Gambling to escape problems or relieve feelings of helplessness</li>
            <li>Lying to family members about your gambling habits</li>
            <li>Borrowing money to gamble</li>
            <li>Feeling restless when trying to cut down or stop gambling</li>
          </ul>
          <h2>Get Help</h2>
          <p>{t('helplines')}</p>
          <ul>
            <li>National Council on Problem Gambling: 1-800-522-4700</li>
            <li>Gamblers Anonymous: www.gamblersanonymous.org</li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
