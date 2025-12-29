import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import AffiliateDisclosure from '@/components/compliance/AffiliateDisclosure';

interface ArticleFooterProps {
  sources?: { title: string; url: string }[];
}

export default function ArticleFooter({ sources }: ArticleFooterProps) {
  const t = useTranslations('ArticlePage');

  return (
    <footer className="mt-12 border-t border-slate-200 pt-8">
      {sources && sources.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-900">{t('sources')}</h3>
          <ul className="mt-4 space-y-2">
            {sources.map((source, index) => (
              <li key={index}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <AffiliateDisclosure />

      <div className="mt-8">
        <Link href="/blog" className="text-primary-600 hover:underline">
          {t('backToBlogs')}
        </Link>
      </div>
    </footer>
  );
}
