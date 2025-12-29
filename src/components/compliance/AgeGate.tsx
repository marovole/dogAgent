import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';

interface AgeGateProps {
  className?: string;
}

export default function AgeGate({ className }: AgeGateProps) {
  const t = useTranslations('HomePage.trust');

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
        18+
      </span>
      <p className="text-sm text-slate-600">
        {t('ageWarning')}
      </p>
    </div>
  );
}
