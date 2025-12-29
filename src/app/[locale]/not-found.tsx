import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('Common');

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-slate-900">404</h1>
      <p className="mt-4 text-xl text-slate-600">{t('notFound')}</p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-primary-500 px-6 py-3 text-white hover:bg-primary-600"
      >
        Go Home
      </Link>
    </div>
  );
}
