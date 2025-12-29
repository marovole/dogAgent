import { setRequestLocale } from 'next-intl/server';
import type { PageProps } from '@/types';
import JsonLd from '@/components/seo/JsonLd';
import { generateOrganizationSchema } from '@/lib/seo/schema/organization';
import { generateWebSiteSchema } from '@/lib/seo/schema/website';
import HeroSection from '@/components/home/HeroSection';
import ValueProposition from '@/components/home/ValueProposition';
import CommissionCalculator from '@/components/home/CommissionCalculator';
import OnboardingSteps from '@/components/home/OnboardingSteps';
import FAQSection from '@/components/home/FAQSection';
import TrustModule from '@/components/home/TrustModule';

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />

      <HeroSection />
      <ValueProposition />
      <CommissionCalculator />
      <OnboardingSteps />
      <FAQSection />
      <TrustModule />
    </>
  );
}
