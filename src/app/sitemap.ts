import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';
import { locales } from '@/i18n/routing';
import { getAllPosts } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/affiliate-disclosure',
    '/responsible-gambling',
    '/blog',
  ];

  const staticUrls: MetadataRoute.Sitemap = [];

  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      const url = locale === 'en' ? `${SITE_URL}${page}` : `${SITE_URL}/${locale}${page}`;
      staticUrls.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
      });
    });
  });

  const blogUrls: MetadataRoute.Sitemap = posts
    .filter((post) => !post.noindex)
    .map((post) => ({
      url: post.locale === 'en'
        ? `${SITE_URL}/blog/${post.slug}`
        : `${SITE_URL}/${post.locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  return [...staticUrls, ...blogUrls];
}
