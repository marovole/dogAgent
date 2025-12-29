import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';

const steps = [
  {
    key: 'register',
    number: '1',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    key: 'getLink',
    number: '2',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    key: 'earn',
    number: '3',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function OnboardingSteps() {
  const t = useTranslations('HomePage.onboarding');

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="heading-2 text-slate-900">{t('title')}</h2>
          <p className="mt-4 text-lg text-slate-600">{t('subtitle')}</p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.key} className="relative text-center">
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-gradient-to-r from-primary-300 to-primary-100 md:block" />
              )}

              <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary-100">
                <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">
                  {step.number}
                </span>
                <div className="text-primary-600">{step.icon}</div>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                {t(`steps.${step.key}.title`)}
              </h3>
              <p className="mt-2 text-slate-600">
                {t(`steps.${step.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
