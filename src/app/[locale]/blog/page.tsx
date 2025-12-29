import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { PageProps, Locale } from '@/types';
import { generateAlternates } from '@/lib/seo/hreflang';
import { getPostsByLocale } from '@/lib/blog';
import Container from '@/components/ui/Container';
import BlogList from '@/components/blog/BlogList';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SITE_URL } from '@/lib/metadata';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: generateAlternates('/blog', locale as Locale),
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('BlogPage');
  const posts = await getPostsByLocale(locale as Locale);

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: t('title'), url: `${SITE_URL}/${locale === 'en' ? '' : locale + '/'}blog` },
  ];

  return (
    <section className="section-padding bg-white">
      <Container>
        <Breadcrumbs items={breadcrumbs} />

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="heading-2 text-slate-900">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-600">{t('subtitle')}</p>
        </div>

        <div className="mt-12">
          {posts.length > 0 ? (
            <BlogList posts={posts} />
          ) : (
            <p className="text-center text-slate-600">{t('noArticles')}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
