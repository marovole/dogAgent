import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import AffiliateDisclosure from '@/components/compliance/AffiliateDisclosure';
import AgeGate from '@/components/compliance/AgeGate';

export default function TrustModule() {
  const t = useTranslations('HomePage.trust');

  return (
    <section className="section-padding bg-white border-t border-slate-200">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="heading-3 text-center text-slate-900">{t('title')}</h2>

          <div className="mt-8 space-y-6">
            <AffiliateDisclosure />

            <div className="flex justify-center">
              <AgeGate />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Weekly Payouts</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
