import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
} from 'lucide-react';
import { getGuideBySlug } from '../data/guides';
import { getToolBySlug } from '../data/tools';
import { SITE_CONFIG } from '../data/site';
import { usePageMeta } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolIcon } from '../components/ToolIcon';
import { NotFoundPage } from './LegalPages';

export function GuideDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const guide = getGuideBySlug(slug);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const schema = useMemo(() => {
    if (!guide) return undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.metaDescription,
      author: {
        '@type': 'Person',
        name: SITE_CONFIG.developer.name,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
      mainEntityOfPage: `${SITE_CONFIG.domain}${guide.path}`,
    };
  }, [guide]);

  usePageMeta({
    title: guide ? guide.metaTitle : 'Guide Not Found | TooloraHub',
    description: guide ? guide.metaDescription : SITE_CONFIG.description,
    path: guide ? guide.path : `/guides/${slug}/`,
    schema,
  });

  if (!guide) {
    return <NotFoundPage />;
  }

  const relatedTools = guide.relatedToolSlugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const relatedGuides = guide.relatedGuideSlugs
    .map((s) => getGuideBySlug(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: 'Guides', to: '/guides/' },
          { label: guide.category },
        ]}
      />

      <article className="bg-white rounded-2xl border border-[#DCE5F0] overflow-hidden">
        <div className="aspect-[16/9] sm:aspect-[21/9] bg-[#EEF6FB] overflow-hidden">
          <img
            src={guide.thumbnail}
            alt={guide.thumbnailAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-10">
          {/* Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#5B708B]">
            <span className="font-semibold text-[#0C8588]">{guide.category}</span>
            <span aria-hidden="true">·</span>
            <span>{guide.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>{guide.publishedDate}</span>
            <span aria-hidden="true">·</span>
            <span>By {SITE_CONFIG.developer.name}</span>
          </div>

          <h1 className="mt-3 font-display font-bold text-2xl sm:text-4xl text-[#12345A] leading-tight [text-wrap:balance]">
            {guide.title}
          </h1>

          {/* Meaningful Introduction */}
          <div className="mt-5 space-y-3.5 text-base text-[#39506B] leading-relaxed">
            {guide.introduction.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <hr className="my-8 border-[#E6EEF7]" />

          {/* Main Structured Sections */}
          <div className="space-y-9">
            {guide.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[#12345A]">
                  {section.heading}
                </h2>
                {section.paragraphs.map((para, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-[#2F4663] leading-relaxed">
                    {para}
                  </p>
                ))}

                {/* Optional Subsections (H3) */}
                {section.subsections && (
                  <div className="space-y-4 pt-1">
                    {section.subsections.map((sub) => (
                      <div key={sub.heading} className="space-y-2">
                        <h3 className="font-display font-semibold text-lg text-[#12345A]">
                          {sub.heading}
                        </h3>
                        {sub.paragraphs.map((p, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-sm sm:text-base text-[#2F4663] leading-relaxed"
                          >
                            {p}
                          </p>
                        ))}
                        {sub.bullets && (
                          <ul className="space-y-1.5 pl-5 list-disc text-sm sm:text-base text-[#2F4663]">
                            {sub.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="leading-relaxed">
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Optional Bullets */}
                {section.bullets && (
                  <ul className="space-y-2 pl-5 list-disc text-sm sm:text-base text-[#2F4663]">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Optional Step-by-Step Ordered Checklist */}
                {section.orderedSteps && (
                  <ol className="space-y-2.5 pt-1">
                    {section.orderedSteps.map((step, sIdx) => (
                      <li
                        key={sIdx}
                        className="flex items-start gap-3 p-3.5 rounded-xl border border-[#E6EEF7] bg-[#FAFBFD] text-sm sm:text-base text-[#2F4663]"
                      >
                        <span className="w-6 h-6 rounded-md bg-[#12345A] text-white font-mono text-xs font-semibold inline-flex items-center justify-center shrink-0 tabular-nums mt-0.5">
                          {sIdx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {/* Optional Practical Before/After Example */}
                {section.example && (
                  <div className="rounded-xl border border-[#DCE5F0] bg-[#F8FBFF] p-4 sm:p-5 space-y-3">
                    <div className="text-xs font-semibold text-[#0C8588]">
                      {section.example.label}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-white border border-[#E2EAF4]">
                        <div className="text-[11px] font-medium text-[#5B708B]">Before</div>
                        <div className="mt-1 font-mono text-xs text-[#39506B] break-words">
                          {section.example.before}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-white border border-[#16C6C9]">
                        <div className="text-[11px] font-medium text-[#0C8588]">After</div>
                        <div className="mt-1 font-mono text-xs text-[#12345A] font-medium break-words">
                          {section.example.after}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Optional Reference Table */}
                {section.table && (
                  <div className="rounded-xl border border-[#DCE5F0] overflow-hidden">
                    {section.table.caption && (
                      <div className="px-4 py-2.5 bg-[#F8FBFF] border-b border-[#DCE5F0] text-xs font-semibold text-[#12345A]">
                        {section.table.caption}
                      </div>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#FAFBFD] border-b border-[#E6EEF7] text-[#5B708B]">
                          <tr>
                            {section.table.headers.map((h) => (
                              <th key={h} className="px-4 py-2.5 font-semibold whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F0F4F9]">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-[#FAFBFD]">
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`px-4 py-2.5 text-[#2F4663] ${
                                    cIdx === 0 ? 'font-medium text-[#12345A]' : ''
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* Common Mistakes */}
            <section className="space-y-4 pt-4 border-t border-[#E6EEF7]">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#12345A]">
                Common Mistakes to Avoid
              </h2>
              <div className="space-y-3">
                {guide.commonMistakes.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-[#E6EEF7] bg-[#FAFBFD] space-y-1.5"
                  >
                    <div className="flex items-start gap-2 font-display font-semibold text-sm sm:text-base text-[#12345A]">
                      <AlertTriangle
                        className="w-4 h-4 text-[#B45309] shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span>{item.mistake}</span>
                    </div>
                    <p className="text-sm text-[#39506B] leading-relaxed pl-6">
                      {item.solution}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Actionable Tips */}
            <section className="space-y-3 pt-4 border-t border-[#E6EEF7]">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#12345A]">
                Actionable Tips
              </h2>
              <ul className="space-y-2.5">
                {guide.actionableTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#2F4663]">
                    <Check className="w-4 h-4 text-[#0FA7AA] shrink-0 mt-1" aria-hidden="true" />
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Conclusion */}
            <section className="space-y-3 pt-4 border-t border-[#E6EEF7]">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#12345A]">
                Conclusion
              </h2>
              {guide.conclusion.map((para, idx) => (
                <p key={idx} className="text-sm sm:text-base text-[#2F4663] leading-relaxed">
                  {para}
                </p>
              ))}
            </section>

            {/* Guide FAQs (5+ Questions) */}
            <section className="space-y-4 pt-4 border-t border-[#E6EEF7]">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#12345A]">
                Frequently Asked Questions
              </h2>
              <div className="divide-y divide-[#EEF3F9] border-t border-[#EEF3F9]">
                {guide.faqs.map((faq, idx) => {
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
          </div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div className="mt-10 pt-8 border-t border-[#E6EEF7]">
              <h2 className="font-display font-bold text-lg text-[#12345A] mb-4">
                Tools Referenced in This Guide
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedTools.map((tool) => (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    className="flex items-center justify-between gap-3 p-4 rounded-xl border border-[#DCE5F0] bg-[#FAFBFD] hover:bg-white hover:border-[#16C6C9] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-9 h-9 rounded-lg bg-[#12345A] text-[#16C6C9] inline-flex items-center justify-center shrink-0">
                        <ToolIcon slug={tool.slug} className="w-4 h-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-[#12345A] truncate">
                          {tool.name}
                        </div>
                        <div className="text-xs text-[#5B708B] truncate">
                          {tool.shortDescription}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#0FA7AA] shrink-0" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#E6EEF7]">
              <h2 className="font-display font-bold text-lg text-[#12345A] mb-3">
                Continue Reading
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedGuides.map((relGuide) => (
                  <Link
                    key={relGuide.id}
                    to={relGuide.path}
                    className="flex items-start justify-between gap-3 p-4 rounded-xl border border-[#DCE5F0] bg-[#FAFBFD] hover:bg-white hover:border-[#16C6C9] transition-colors"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <BookOpen className="w-4 h-4 text-[#0FA7AA] shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-[#12345A] leading-snug">
                          {relGuide.title}
                        </div>
                        <div className="mt-1 text-xs text-[#5B708B]">
                          {relGuide.category} · {relGuide.readTime}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#0FA7AA] shrink-0 mt-0.5" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author Info */}
          <div className="mt-8 p-5 rounded-xl border border-[#DCE5F0] bg-[#FAFBFD] flex items-start gap-4">
            <div
              aria-hidden="true"
              className="w-11 h-11 rounded-lg bg-[#12345A] text-[#16C6C9] flex items-center justify-center shrink-0"
            >
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#0C8588]">About the Author</div>
              <div className="font-display font-semibold text-base text-[#12345A]">
                {SITE_CONFIG.developer.name} · {SITE_CONFIG.developer.experience}
              </div>
              <p className="mt-1 text-xs sm:text-sm text-[#4B617D] leading-relaxed">
                {SITE_CONFIG.developer.bio}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E6EEF7] flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/guides/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#12345A] hover:text-[#0C8588]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Back to All Guides</span>
            </Link>
            <Link
              to="/tools/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#12345A] hover:text-[#0C8588]"
            >
              <span>Explore All 22 Tools</span>
              <ArrowRight className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
