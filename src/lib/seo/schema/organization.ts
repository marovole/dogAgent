import type { WithContext, Organization } from 'schema-dts';
import { SITE_URL, SITE_NAME, CONTACT_EMAIL, DEFAULT_OG_IMAGE } from '@/lib/metadata';

export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: DEFAULT_OG_IMAGE,
    description: "India's Premier Betting Affiliate Program",
    email: CONTACT_EMAIL,
    sameAs: [
      'https://twitter.com/dogplay',
      'https://t.me/dogplay',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT_EMAIL,
      contactType: 'Partner Support',
      availableLanguage: ['English', 'Hindi'],
    },
  };
}
