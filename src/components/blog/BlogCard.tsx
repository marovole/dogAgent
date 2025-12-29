import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import type { BlogListItem } from '@/types/blog';

interface BlogCardProps {
  post: BlogListItem;
}

export default function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations('BlogPage');

  const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <time dateTime={post.date}>{formattedDate}</time>
            <span>•</span>
            <span>{t('readingTime', { minutes: post.readingTime })}</span>
          </div>
          <h2 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-primary-600">
            {post.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">
            {post.excerpt}
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-primary-600">
            {t('readMore')} →
          </span>
        </div>
      </Link>
    </article>
  );
}
