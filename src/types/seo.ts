import type { WithContext, Organization, WebSite, Article, BreadcrumbList, FAQPage } from 'schema-dts';

export type { WithContext, Organization, WebSite, Article, BreadcrumbList, FAQPage };

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: {
      url: string;
      width: number;
      height: number;
      alt: string;
    }[];
    locale: string;
    type: 'website' | 'article';
  };
  twitter: {
    card: 'summary' | 'summary_large_image';
    title: string;
    description: string;
    images: string[];
  };
  alternates: {
    canonical: string;
    languages: Record<string, string>;
  };
  robots?: {
    index: boolean;
    follow: boolean;
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
}

export interface FAQSchemaInput {
  question: string;
  answer: string;
}
