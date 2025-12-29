'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import CTAButton from '@/components/ui/CTAButton';
import { DOGPLAY_URL } from '@/lib/metadata';
import { formatINR, formatUSD } from '@/lib/utils/currency';

const CPA_RATE_USD = 50;
const REVSHARE_PERCENTAGE = 0.40;
const AVG_PLAYER_VALUE_USD = 200;
const USD_TO_INR = 83;

export default function CommissionCalculator() {
  const t = useTranslations('HomePage.calculator');
  const [players, setPlayers] = useState(100);

  const cpaEarningsUSD = players * CPA_RATE_USD;
  const revshareEarningsUSD = players * AVG_PLAYER_VALUE_USD * REVSHARE_PERCENTAGE;
  const totalEarningsUSD = Math.max(cpaEarningsUSD, revshareEarningsUSD);

  const totalEarningsINR = totalEarningsUSD * USD_TO_INR;

  return (
    <section id="calculator" className="section-padding bg-slate-50">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="heading-2 text-slate-900">{t('title')}</h2>
          <p className="mt-4 text-lg text-slate-600">{t('subtitle')}</p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                {t('playersLabel')}: <span className="text-primary-600 font-bold">{players}</span>
              </label>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={players}
                onChange={(e) => setPlayers(Number(e.target.value))}
                className="mt-2 w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="mt-1 flex justify-between text-xs text-slate-500">
                <span>10</span>
                <span>500</span>
                <span>1000</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-sm text-blue-700">{t('cpaLabel')}</p>
                <p className="mt-1 text-2xl font-bold text-blue-900">
                  {formatUSD(cpaEarningsUSD)}
                </p>
                <p className="text-sm text-blue-600">
                  ({formatINR(cpaEarningsUSD * USD_TO_INR)})
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-sm text-green-700">{t('revshareLabel')}</p>
                <p className="mt-1 text-2xl font-bold text-green-900">
                  {formatUSD(revshareEarningsUSD)}
                </p>
                <p className="text-sm text-green-600">
                  ({formatINR(revshareEarningsUSD * USD_TO_INR)})
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-primary-50 p-6 text-center">
              <p className="text-sm text-primary-700">{t('totalLabel')}</p>
              <p className="mt-2 text-4xl font-bold text-primary-900">
                {formatINR(totalEarningsINR)}
              </p>
              <p className="text-lg text-primary-700">
                ({formatUSD(totalEarningsUSD)})
              </p>
            </div>

            <div className="text-center">
              <CTAButton href={DOGPLAY_URL} size="lg">
                {t('cta')}
              </CTAButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
