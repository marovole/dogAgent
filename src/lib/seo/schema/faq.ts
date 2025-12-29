import type { WithContext, FAQPage } from 'schema-dts';
import type { FAQSchemaInput } from '@/types/seo';

export function generateFAQSchema(items: FAQSchemaInput[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
