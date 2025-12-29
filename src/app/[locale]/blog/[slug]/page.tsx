import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/types';
import { generateAlternates } from '@/lib/seo/hreflang';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { SITE_URL, SITE_NAME } from '@/lib/metadata';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ArticleHeader from '@/components/blog/ArticleHeader';
import ArticleContent from '@/components/blog/ArticleContent';
import ArticleFooter from '@/components/blog/ArticleFooter';
import JsonLd from '@/components/seo/JsonLd';
import { generateArticleSchema } from '@/lib/seo/schema/article';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    locale: post.locale,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale as Locale);

  if (!post) {
    return { title: 'Article Not Found' };
  }

  const url = `${SITE_URL}/${locale === 'en' ? '' : locale + '/'}blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: generateAlternates(`/blog/${slug}`, locale as Locale),
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: post.coverImage.startsWith('http') ? post.coverImage : `${SITE_URL}${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.coverImage.startsWith('http') ? post.coverImage : `${SITE_URL}${post.coverImage}`],
    },
    robots: post.noindex ? { index: false, follow: true } : undefined,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(slug, locale as Locale);

  if (!post) {
    notFound();
  }

  const t = await getTranslations('BlogPage');
  const url = `${SITE_URL}/${locale === 'en' ? '' : locale + '/'}blog/${slug}`;

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.description,
    url,
    imageUrl: post.coverImage.startsWith('http') ? post.coverImage : `${SITE_URL}${post.coverImage}`,
    datePublished: post.date,
    dateModified: post.date,
    authorName: post.author,
  });

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: t('title'), url: `${SITE_URL}/${locale === 'en' ? '' : locale + '/'}blog` },
    { name: post.title, url },
  ];

  return (
    <article className="section-padding bg-white">
      <JsonLd data={articleSchema} />
      <Container className="max-w-4xl">
        <Breadcrumbs items={breadcrumbs} />
        <ArticleHeader post={post} />
        <ArticleContent content={post.content} />
        <ArticleFooter sources={post.sources} />
      </Container>
    </article>
  );
}
