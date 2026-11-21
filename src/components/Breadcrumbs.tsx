import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-[#5B708B]">
        <li>
          <Link to="/" className="hover:text-[#12345A] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.label} className="inline-flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-[#93A7BF]" aria-hidden="true" />
              {item.to && !isLast ? (
                <Link to={item.to} className="hover:text-[#12345A] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-[#12345A]" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
