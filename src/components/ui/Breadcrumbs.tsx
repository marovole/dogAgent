import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/seo/schema/breadcrumb';
import type { BreadcrumbItem } from '@/types/seo';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema = generateBreadcrumbSchema(items);

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-slate-400" aria-hidden="true">
                  /
                </span>
              )}
              {index === items.length - 1 ? (
                <span className="font-medium text-slate-900" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.url} className="hover:text-primary-600">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
