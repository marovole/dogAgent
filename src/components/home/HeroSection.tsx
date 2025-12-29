import { useTranslations } from 'next-intl';
import CTAButton from '@/components/ui/CTAButton';
import Container from '@/components/ui/Container';
import { DOGPLAY_URL } from '@/lib/metadata';

export default function HeroSection() {
  const t = useTranslations('HomePage.hero');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 py-20 md:py-32">
      <div className="absolute inset-0 bg-[url('/images/hero/pattern.svg')] opacity-10" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="heading-1 text-white">
            {t('title')}
          </h1>
          <p className="mt-6 text-lg text-slate-300 md:text-xl">
            {t('subtitle')}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton href={DOGPLAY_URL} size="lg">
              {t('cta')}
            </CTAButton>
            <CTAButton
              href="#calculator"
              variant="secondary"
              size="lg"
              external={false}
              className="border-white text-white hover:bg-white/10"
            >
              {t('ctaSecondary')}
            </CTAButton>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
