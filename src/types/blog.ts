import type { Locale } from '@/i18n/routing';

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  coverImage: string;
  coverImageAlt: string;
  locale: Locale;
  category: 'news' | 'cricket' | 'tips' | 'general';
  tags: string[];
  readingTime: number;
  noindex?: boolean;
  sources?: { title: string; url: string }[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export interface BlogListItem extends BlogPostMeta {
  excerpt: string;
}

export interface OpsBrief {
  date: string;
  topics: {
    title: string;
    summary: string;
    sources: { title: string; url: string }[];
  }[];
  keyInsights: string[];
  marketTrends: string[];
  generatedAt: string;
}
