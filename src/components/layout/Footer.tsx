import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import AffiliateDisclosure from '@/components/compliance/AffiliateDisclosure';
import AgeGate from '@/components/compliance/AgeGate';

export default function Footer() {
  const t = useTranslations('Layout.footer');
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: t('about'), href: '/about' },
      { label: t('contact'), href: '/contact' },
    ],
    legal: [
      { label: t('privacy'), href: '/privacy' },
      { label: t('terms'), href: '/terms' },
      { label: t('affiliateDisclosure'), href: '/affiliate-disclosure' },
      { label: t('responsibleGambling'), href: '/responsible-gambling' },
    ],
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary-600">Dogplay</span>
              <span className="text-lg font-semibold text-slate-700">Agent</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-slate-600">
              {t('disclaimer')}
            </p>
            <AgeGate className="mt-4" />
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <AffiliateDisclosure />
          <p className="mt-4 text-center text-sm text-slate-500">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
