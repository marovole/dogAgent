import type { WithContext, Article } from 'schema-dts';
import type { ArticleSchemaInput } from '@/types/seo';
import { SITE_URL, SITE_NAME } from '@/lib/metadata';

export function generateArticleSchema(input: ArticleSchemaInput): WithContext<Article> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    url: input.url,
    image: input.imageUrl,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: {
      '@type': 'Person',
      name: input.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.url,
    },
  };
}
