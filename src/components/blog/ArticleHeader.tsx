import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { BlogPostMeta } from '@/types/blog';

interface ArticleHeaderProps {
  post: BlogPostMeta;
}

export default function ArticleHeader({ post }: ArticleHeaderProps) {
  const t = useTranslations('BlogPage');

  const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="mb-8">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <time dateTime={post.date}>{formattedDate}</time>
        <span>•</span>
        <span>{t('readingTime', { minutes: post.readingTime })}</span>
        <span>•</span>
        <span>By {post.author}</span>
      </div>

      <h1 className="mt-4 heading-2 text-slate-900">{post.title}</h1>
      <p className="mt-4 text-lg text-slate-600">{post.description}</p>

      <div className="relative mt-8 aspect-video overflow-hidden rounded-xl bg-slate-100">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
          priority
        />
      </div>
    </header>
  );
}
