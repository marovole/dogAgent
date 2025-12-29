import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen bg-slate-100">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">運營後台</h1>
            <p className="text-sm text-slate-500">內部使用 - 不公開索引</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
