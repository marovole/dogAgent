'use client';

import { useTranslations } from 'next-intl';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Common');

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-slate-900">Oops!</h1>
      <p className="mt-4 text-xl text-slate-600">{t('error')}</p>
      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-primary-500 px-6 py-3 text-white hover:bg-primary-600"
      >
        Try Again
      </button>
    </div>
  );
}
