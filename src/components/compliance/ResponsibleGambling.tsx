import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function ResponsibleGambling() {
  const t = useTranslations('Legal.responsibleGambling');

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
      <h3 className="text-lg font-semibold text-amber-900">
        {t('title')}
      </h3>
      <p className="mt-2 text-sm text-amber-800">
        {t('warning')}
      </p>
      <p className="mt-2 text-sm font-medium text-amber-900">
        {t('ageRestriction')}
      </p>
      <div className="mt-4">
        <Link
          href="/responsible-gambling"
          className="text-sm font-medium text-amber-700 underline hover:text-amber-900"
        >
          Learn more about responsible gambling →
        </Link>
      </div>
    </div>
  );
}
