'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import JsonLd from '@/components/seo/JsonLd';
import { generateFAQSchema } from '@/lib/seo/schema/faq';

export default function FAQSection() {
  const t = useTranslations('HomePage.faq');
  const faqT = useTranslations('FAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = faqT.raw('items') as { question: string; answer: string }[];
  const faqSchema = generateFAQSchema(items);

  return (
    <section className="section-padding bg-slate-50">
      <JsonLd data={faqSchema} />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="heading-2 text-slate-900">{t('title')}</h2>
          <p className="mt-4 text-lg text-slate-600">{t('subtitle')}</p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-200">
          {items.map((item, index) => (
            <div key={index} className="py-4">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-start justify-between text-left"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-medium text-slate-900 pr-4">
                  {item.question}
                </span>
                <span className="ml-6 flex h-7 items-center">
                  <svg
                    className={`h-6 w-6 transform text-slate-500 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? 'mt-4 max-h-96' : 'max-h-0'
                }`}
              >
                <p className="text-slate-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
