import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  experimental: {
    optimizePackageImports: ['next-intl', 'schema-dts', 'clsx'],
  },
};

export default withNextIntl(nextConfig);
