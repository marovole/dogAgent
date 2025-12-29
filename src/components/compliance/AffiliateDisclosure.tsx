import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function AffiliateDisclosure() {
  const t = useTranslations('HomePage.trust');

  return (
    <div className="rounded-lg bg-amber-50 p-4 text-center text-sm text-amber-800">
      <p>
        {t.rich('affiliateNotice', {
          link: (chunks) => (
            <Link
              href="/affiliate-disclosure"
              className="font-medium underline hover:text-amber-900"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </div>
  );
}
