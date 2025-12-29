import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ee7518',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dogplay-agent.pages.dev'),
  title: {
    template: '%s | Dogplay Agent',
    default: 'Dogplay Agent - India\'s Premier Betting Affiliate Program',
  },
  description: 'Join Dogplay Agent Program and earn up to 50% revenue share. High CPA rates, crypto payments, and dedicated support for Indian partners.',
  applicationName: 'Dogplay Agent',
  authors: [{ name: 'Dogplay Agent Team' }],
  generator: 'Next.js',
  keywords: ['Dogplay Agent', 'betting affiliate', 'India affiliate program', 'cricket betting partner', 'iGaming affiliate'],
  referrer: 'origin-when-cross-origin',
  creator: 'Dogplay Agent',
  publisher: 'Dogplay Agent',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
