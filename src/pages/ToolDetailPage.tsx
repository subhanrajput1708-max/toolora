import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, BookOpen, Check, ChevronDown, Info } from 'lucide-react';
import { ALL_TOOLS, getCategoryById, getToolBySlug } from '../data/tools';
import { TOOL_DETAILS } from '../data/toolDetails';
import { ALL_GUIDES } from '../data/guides';
import { SITE_CONFIG } from '../data/site';
import { usePageMeta } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolIcon } from '../components/ToolIcon';
import { ToolRenderer } from '../components/tools/ToolRenderer';
import { NotFoundPage } from './LegalPages';

export function ToolDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const tool = getToolBySlug(slug);
  const details = tool ? TOOL_DETAILS[tool.slug] : undefined;
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const schema = useMemo(() => {
    if (!tool) return undefined;
    const baseApp: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: `${tool.name} — TooloraHub`,
      url: `${SITE_CONFIG.domain}${tool.path}`,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      description: tool.metaDescription,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    };
    return baseApp;
  }, [tool]);

  usePageMeta({
    title: tool ? tool.metaTitle : 'Tool Not Found | TooloraHub',
    description: tool ? tool.metaDescription : SITE_CONFIG.description,
    path: tool ? tool.path : `/tools/${slug}/`,
    schema,
  });

  if (!tool) {
    return <NotFoundPage />;
  }

  const category = getCategoryById(tool.categoryId);
  const relatedTools = ALL_TOOLS.filter(
    (t) => t.categoryId === tool.categoryId && t.slug !== tool.slug
  ).slice(0, 4);
  const relatedGuides = ALL_GUIDES.filter((g) => g.relatedToolSlugs.includes(tool.slug));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: 'All Tools', to: '/tools/' },
          { label: category.shortName, to: `/tools/?category=${category.id}` },
          { label: tool.name },
        ]}
      />

      {/* Tool Header & Introduction */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-xl bg-[#12345A] text-[#16C6C9] inline-flex items-center justify-center shrink-0">
            <ToolIcon slug={tool.slug} className="w-5 h-5" />
          </span>
          <div>
            <p className="text-xs font-medium text-[#0C8588]">{category.name}</p>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#12345A]">
              {tool.name}
            </h1>
          </div>
        </div>
        <p className="mt-3 text-sm sm:text-base text-[#39506B] max-w-3xl leading-relaxed">
          {details ? details.introduction : tool.shortDescription}
        </p>
      </div>

      {/* Main Interactive Tool Surface */}
      <section className="bg-white rounded-2xl border border-[#DCE5F0] p-5 sm:p-7">
        <ToolRenderer slug={tool.slug} />
      </section>

      {/* Detailed Tool Supporting Sections */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          {/* How to Use */}
          <section className="bg-white rounded-xl border border-[#DCE5F0] p-6">
            <h2 className="font-display font-bold text-xl text-[#12345A]">
              How to Use the {tool.name}
            </h2>
            <ol className="mt-4 space-y-3">
              {tool.howToUse.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#39506B]">
                  <span className="w-6 h-6 rounded-md bg-[#EEF6FB] text-[#12345A] font-mono text-xs font-semibold inline-flex items-center justify-center shrink-0 tabular-nums mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {details && (
            <>
              {/* How Calculations / Processing Work */}
              <section className="bg-white rounded-xl border border-[#DCE5F0] p-6 space-y-3">
                <h2 className="font-display font-bold text-xl text-[#12345A]">
                  How Processing &amp; Calculations Work
                </h2>
                <p className="text-sm sm:text-base text-[#39506B] leading-relaxed">
                  {details.howItWorks}
                </p>
              </section>

              {/* Practical Examples */}
              <section className="bg-white rounded-xl border border-[#DCE5F0] p-6 space-y-4">
                <h2 className="font-display font-bold text-xl text-[#12345A]">
                  Practical Examples
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {details.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-[#E2EAF4] bg-[#FAFBFD] p-4 space-y-2.5"
                    >
                      <div className="text-xs font-semibold text-[#0C8588]">{ex.label}</div>
                      <div>
                        <div className="text-[11px] font-medium text-[#5B708B]">Input</div>
                        <div className="mt-0.5 font-mono text-xs text-[#12345A] break-words">
                          {ex.input}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-[#E6EEF7]">
                        <div className="text-[11px] font-medium text-[#5B708B]">Result</div>
                        <div className="mt-0.5 font-mono text-xs text-[#0C8588] font-medium break-words">
                          {ex.output}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Key Features & Limitations */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-xl border border-[#DCE5F0] p-6">
                  <h2 className="font-display font-bold text-lg text-[#12345A]">
                    Key Features
                  </h2>
                  <ul className="mt-3.5 space-y-2.5">
                    {details.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#39506B]">
                        <Check
                          className="w-4 h-4 text-[#0FA7AA] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-xl border border-[#DCE5F0] p-6">
                  <h2 className="font-display font-bold text-lg text-[#12345A]">
                    Limitations &amp; Notes
                  </h2>
                  <ul className="mt-3.5 space-y-2.5">
                    {details.limitations.map((lim, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#39506B]">
                        <Info
                          className="w-4 h-4 text-[#5B708B] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed">{lim}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Tool-Specific FAQs */}
              <section className="bg-white rounded-xl border border-[#DCE5F0] p-6 space-y-4">
                <h2 className="font-display font-bold text-xl text-[#12345A]">
                  {tool.name} FAQs
                </h2>
                <div className="divide-y divide-[#EEF3F9] border-t border-[#EEF3F9]">
                  {details.faqs.map((faq, idx) => {
                    const isOpen = openFaqIdx === idx;
                    return (
                      <div key={idx} className="py-3">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between gap-4 text-left py-1"
                        >
                          <span className="font-display font-semibold text-sm sm:text-base text-[#12345A]">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#0FA7AA] shrink-0 transition-transform duration-150 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                        {isOpen && (
                          <p className="mt-2 text-sm text-[#4B617D] leading-relaxed">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </div>

        {/* Sidebar: Related Tools & Related Guides */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-[#DCE5F0] p-6">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h2 className="font-display font-semibold text-lg text-[#12345A]">
                Related {category.shortName} Tools
              </h2>
              <Link
                to={`/tools/?category=${category.id}`}
                className="text-xs font-semibold text-[#0C8588] hover:text-[#12345A]"
              >
                View all
              </Link>
            </div>
            <div className="space-y-2.5">
              {relatedTools.map((rel) => (
                <Link
                  key={rel.id}
                  to={rel.path}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg border border-[#E6EEF7] hover:border-[#16C6C9] hover:bg-[#FAFBFD] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-[#EEF6FB] text-[#12345A] inline-flex items-center justify-center shrink-0">
                      <ToolIcon slug={rel.slug} className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[#12345A] truncate">
                        {rel.name}
                      </div>
                      <div className="text-xs text-[#5B708B] truncate">{rel.shortDescription}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0FA7AA] shrink-0" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {relatedGuides.length > 0 && (
            <div className="bg-white rounded-xl border border-[#DCE5F0] p-6 space-y-3">
              <h2 className="font-display font-semibold text-lg text-[#12345A]">
                Related Guides
              </h2>
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.id}
                  to={guide.path}
                  className="flex items-start justify-between gap-3 p-3.5 rounded-lg border border-[#E2EAF4] bg-[#FAFBFD] hover:bg-white hover:border-[#16C6C9] transition-colors"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <BookOpen
                      className="w-4 h-4 text-[#0FA7AA] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-[#12345A] leading-snug">
                        {guide.title}
                      </div>
                      <div className="mt-1 text-xs text-[#5B708B]">
                        {guide.category} · {guide.readTime}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0FA7AA] shrink-0 mt-0.5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
