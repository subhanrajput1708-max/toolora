import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCode2, FolderOpen, Globe, ShieldCheck } from 'lucide-react';
import { ALL_TOOLS, TOOL_CATEGORIES } from '../data/tools';
import { SITE_CONFIG } from '../data/site';
import { usePageMeta } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CategoryIcon, ToolIcon } from '../components/ToolIcon';
import { withBase } from '../utils/paths';

const MAIN_PAGES = [
  {
    name: 'Home',
    to: '/',
    description: 'TooloraHub overview, Search Tools, Featured & Popular Tools, Explore All Tools, and FAQs.',
  },
  {
    name: `All ${ALL_TOOLS.length} Tools Directory`,
    to: '/tools/',
    description: 'Filter, sort, and search all 50 free browser utilities across 7 categories.',
  },
  {
    name: 'About Us',
    to: '/about/',
    description: 'Learn about TooloraHub’s mission, local browser architecture, and developer Muhammad Subhan.',
  },
  {
    name: 'Contact Us',
    to: '/contact/',
    description: 'Send tool suggestions, bug reports, or general feedback directly to the developer.',
  },
];

const LEGAL_PAGES = [
  {
    name: 'Privacy Policy',
    to: '/privacy-policy/',
    description: 'Local browser processing, Toolora Assistant data handling, cookies, and visitor rights.',
  },
  {
    name: 'Terms & Conditions',
    to: '/terms-and-conditions/',
    description: 'Permitted usage, user verification responsibilities, accuracy limits, and ownership terms.',
  },
  {
    name: 'Disclaimer',
    to: '/disclaimer/',
    description: 'General informational scope, financial/BMI/date calculation limitations, and external references.',
  },
];

export function SitemapPage() {
  const pageSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: 'HTML Sitemap — All Pages & 50 Free Online Tools | TooloraHub',
          url: `${SITE_CONFIG.domain}/sitemap/`,
          description: `Complete HTML sitemap of TooloraHub listing all ${ALL_TOOLS.length} free browser tools across ${TOOL_CATEGORIES.length} categories, informational pages, and legal policies.`,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${SITE_CONFIG.domain}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Sitemap',
              item: `${SITE_CONFIG.domain}/sitemap/`,
            },
          ],
        },
      ],
    }),
    []
  );

  usePageMeta({
    title: 'Sitemap — All Pages & 50 Free Tools | TooloraHub',
    description: `Browse the complete TooloraHub sitemap with direct links to all ${ALL_TOOLS.length} free browser tools across ${TOOL_CATEGORIES.length} categories, core site pages, and legal policies.`,
    path: '/sitemap/',
    schema: pageSchema,
  });

  const totalIndexableUrls = MAIN_PAGES.length + LEGAL_PAGES.length + 1 + ALL_TOOLS.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <Breadcrumbs items={[{ label: 'Sitemap' }]} />

      <div className="bg-white rounded-2xl border border-[#DCE5F0] p-6 sm:p-10 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-2.5">
            <p className="text-xs sm:text-sm font-semibold text-[#0C8588] uppercase tracking-wider">
              Complete Site Index
            </p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#12345A]">
              TooloraHub Sitemap
            </h1>
            <p className="text-sm sm:text-base text-[#4B617D] leading-relaxed">
              Navigate every page and all {ALL_TOOLS.length} browser-based tools on TooloraHub ({SITE_CONFIG.domain}) organized clearly by section and tool category.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={withBase('/sitemap.xml')}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-[#C8D7E8] bg-[#FAFBFD] text-xs sm:text-sm font-semibold text-[#12345A] hover:border-[#16C6C9] hover:bg-white transition-colors"
            >
              <FileCode2 className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
              <span>XML Sitemap ({totalIndexableUrls} URLs)</span>
            </a>
            <Link
              to="/tools/"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-[#12345A] text-white text-xs sm:text-sm font-semibold hover:bg-[#1A4678] transition-colors"
            >
              <span>Search Tools</span>
              <ArrowRight className="w-4 h-4 text-[#16C6C9]" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Category Quick Jump Links */}
        <nav
          aria-label="Sitemap sections"
          className="mt-6 pt-6 border-t border-[#E6EEF7] flex flex-wrap gap-2"
        >
          <a
            href="#sitemap-core-pages"
            className="px-3 py-1.5 rounded-lg bg-[#F5F8FC] border border-[#DCE5F0] text-xs font-semibold text-[#12345A] hover:border-[#16C6C9] transition-colors"
          >
            Core Pages ({MAIN_PAGES.length})
          </a>
          <a
            href="#sitemap-legal-pages"
            className="px-3 py-1.5 rounded-lg bg-[#F5F8FC] border border-[#DCE5F0] text-xs font-semibold text-[#12345A] hover:border-[#16C6C9] transition-colors"
          >
            Legal &amp; Policies ({LEGAL_PAGES.length})
          </a>
          {TOOL_CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#sitemap-cat-${cat.id}`}
              className="px-3 py-1.5 rounded-lg bg-[#FAFBFD] border border-[#DCE5F0] text-xs font-medium text-[#39506B] hover:text-[#12345A] hover:border-[#16C6C9] transition-colors"
            >
              {cat.shortName} ({cat.toolCount})
            </a>
          ))}
        </nav>
      </div>

      {/* Core & Legal Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <section
          id="sitemap-core-pages"
          className="bg-white rounded-2xl border border-[#DCE5F0] p-6 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg bg-[#12345A] text-[#16C6C9] inline-flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4" aria-hidden="true" />
            </span>
            <h2 className="font-display font-bold text-xl text-[#12345A]">
              Main Website Pages
            </h2>
          </div>
          <ul className="divide-y divide-[#EEF3F9]">
            {MAIN_PAGES.map((page) => (
              <li key={page.to} className="py-3 first:pt-1 last:pb-1">
                <Link
                  to={page.to}
                  className="group flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-display font-semibold text-sm sm:text-base text-[#12345A] group-hover:text-[#0C8588] transition-colors">
                      {page.name}
                    </div>
                    <p className="mt-0.5 text-xs sm:text-sm text-[#4B617D]">
                      {page.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0FA7AA] shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="sitemap-legal-pages"
          className="bg-white rounded-2xl border border-[#DCE5F0] p-6 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg bg-[#12345A] text-[#16C6C9] inline-flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            </span>
            <h2 className="font-display font-bold text-xl text-[#12345A]">
              Legal, Transparency &amp; Policies
            </h2>
          </div>
          <ul className="divide-y divide-[#EEF3F9]">
            {LEGAL_PAGES.map((page) => (
              <li key={page.to} className="py-3 first:pt-1 last:pb-1">
                <Link
                  to={page.to}
                  className="group flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-display font-semibold text-sm sm:text-base text-[#12345A] group-hover:text-[#0C8588] transition-colors">
                      {page.name}
                    </div>
                    <p className="mt-0.5 text-xs sm:text-sm text-[#4B617D]">
                      {page.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0FA7AA] shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-2 border-t border-[#EEF3F9] flex items-center justify-between text-xs text-[#5B708B]">
            <span>Maintained by {SITE_CONFIG.developer.name}</span>
            <a
              href={withBase('/robots.txt')}
              className="font-medium text-[#12345A] hover:text-[#0C8588] underline underline-offset-2"
            >
              robots.txt
            </a>
          </div>
        </section>
      </div>

      {/* All 50 Tools Grouped by 7 Categories */}
      <section aria-labelledby="sitemap-tools-heading" className="space-y-6">
        <div className="flex items-center gap-2.5">
          <FolderOpen className="w-5 h-5 text-[#0FA7AA]" aria-hidden="true" />
          <h2 id="sitemap-tools-heading" className="font-display font-bold text-2xl text-[#12345A]">
            All {ALL_TOOLS.length} Tools by Category
          </h2>
        </div>

        <div className="space-y-6">
          {TOOL_CATEGORIES.map((category) => {
            const categoryTools = ALL_TOOLS.filter((t) => t.categoryId === category.id);
            return (
              <section
                key={category.id}
                id={`sitemap-cat-${category.id}`}
                className="bg-white rounded-2xl border border-[#DCE5F0] p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-[#E6EEF7]">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-[#12345A] text-[#16C6C9] inline-flex items-center justify-center shrink-0">
                      <CategoryIcon categoryId={category.id} className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-[#12345A]">
                        {category.name} ({categoryTools.length})
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4B617D]">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/tools/?category=${category.id}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0C8588] hover:text-[#12345A] whitespace-nowrap self-start sm:self-auto"
                  >
                    <span>Filter {category.shortName}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {categoryTools.map((tool) => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="group flex items-start gap-3 p-3.5 rounded-xl border border-[#E6EEF7] bg-[#FAFBFD] hover:bg-white hover:border-[#16C6C9] transition-colors"
                    >
                      <span className="w-8 h-8 rounded-lg bg-[#EEF6FB] text-[#12345A] inline-flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#12345A] group-hover:text-white transition-colors">
                        <ToolIcon slug={tool.slug} className="w-4 h-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="font-display font-semibold text-sm text-[#12345A] group-hover:text-[#0C8588] transition-colors">
                          {tool.name}
                        </div>
                        <p className="mt-0.5 text-xs text-[#4B617D] line-clamp-2 leading-relaxed">
                          {tool.shortDescription}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </div>
  );
}
