import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Code2,
  Search,
} from 'lucide-react';
import {
  ALL_TOOLS,
  POPULAR_TOOLS,
  TOOL_CATEGORIES,
} from '../data/tools';
import { ALL_GUIDES } from '../data/guides';
import { HOMEPAGE_FAQS, SITE_CONFIG } from '../data/site';
import { usePageMeta } from '../utils/seo';
import { CategoryIcon, ToolIcon } from '../components/ToolIcon';
import { withBase } from '../utils/paths';

export function HomePage() {
  const navigate = useNavigate();
  const [heroQuery, setHeroQuery] = useState('');
  const [heroFocused, setHeroFocused] = useState(false);

  const featuredTools = useMemo(() => POPULAR_TOOLS.slice(0, 6), []);
  const featuredGuides = useMemo(() => ALL_GUIDES.slice(0, 3), []);
  const homeFaqs = useMemo(() => HOMEPAGE_FAQS.slice(0, 4), []);

  const [openFaqId, setOpenFaqId] = useState<string | null>(homeFaqs[0].id);

  const pageSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: homeFaqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }),
    [homeFaqs]
  );

  usePageMeta({
    title: 'TooloraHub — Simple Tools. Smarter Everyday Work.',
    description: SITE_CONFIG.description,
    path: '/',
    schema: pageSchema,
  });

  const heroSuggestions = useMemo(() => {
    const q = heroQuery.trim().toLowerCase();
    if (!q) return [];
    return ALL_TOOLS.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [heroQuery]);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSuggestions.length === 1) {
      navigate(heroSuggestions[0].path);
    } else if (heroQuery.trim()) {
      navigate(`/tools/?q=${encodeURIComponent(heroQuery.trim())}`);
    } else {
      navigate('/tools/');
    }
  };

  return (
    <div>
      {/* 1. Hero Section with Working Tool Search */}
      <section className="relative bg-white border-b border-[#DCE5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-[#0C8588] tracking-wide mb-3">
              {SITE_CONFIG.tagline}
            </p>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#12345A] tracking-tight leading-[1.15] [text-wrap:balance]">
              Simple Tools for Everyday Tasks
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#465C78] leading-relaxed max-w-2xl mx-auto">
              Free, easy-to-use online tools designed to help you work smarter, save time, and simplify everyday digital tasks.
            </p>

            {/* Working Hero Search */}
            <form
              onSubmit={handleHeroSearchSubmit}
              className="mt-8 relative max-w-2xl mx-auto"
              role="search"
              aria-label="Search TooloraHub tools"
            >
              <div className="flex items-center bg-[#F5F8FC] border border-[#C8D7E8] focus-within:border-[#16C6C9] focus-within:bg-white focus-within:ring-3 focus-within:ring-[#16C6C9]/20 rounded-xl p-1.5 transition-all">
                <Search
                  className="w-5 h-5 text-[#5B708B] ml-3 shrink-0"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={heroQuery}
                  onFocus={() => setHeroFocused(true)}
                  onBlur={() => setTimeout(() => setHeroFocused(false), 180)}
                  onChange={(e) => setHeroQuery(e.target.value)}
                  placeholder="Search tools — word counter, calculator, text cleaner..."
                  aria-label="Search tools"
                  className="w-full h-11 px-3 bg-transparent text-sm sm:text-base text-[#10243E] placeholder:text-[#6B809A] focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-11 px-5 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678] transition-colors whitespace-nowrap shrink-0"
                >
                  Find Tool
                </button>
              </div>

              {heroFocused && heroQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl border border-[#DCE5F0] shadow-lg text-left overflow-hidden z-30">
                  {heroSuggestions.length > 0 ? (
                    <ul className="divide-y divide-[#F0F4F9]">
                      {heroSuggestions.map((tool) => (
                        <li key={tool.id}>
                          <Link
                            to={tool.path}
                            className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#F5F8FC] transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="w-8 h-8 rounded-lg bg-[#EEF6FB] text-[#12345A] inline-flex items-center justify-center shrink-0">
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
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-4 text-sm text-[#5B708B]">
                      No direct tool match for &ldquo;{heroQuery}&rdquo;. Press Enter to search all 22 tools.
                    </div>
                  )}
                </div>
              )}
            </form>

            {/* Primary & Secondary CTAs */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                to="/tools/"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678] transition-colors whitespace-nowrap"
              >
                <span>Explore All 22 Tools</span>
                <ArrowRight className="w-4 h-4 text-[#16C6C9]" aria-hidden="true" />
              </Link>
              <Link
                to="/guides/"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg border border-[#C8D7E8] bg-white text-[#12345A] text-sm font-semibold hover:border-[#16C6C9] hover:bg-[#F8FBFF] transition-colors whitespace-nowrap"
              >
                <span>Browse Guides</span>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#4B617D]">
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
                Free Online Tools
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
                No Installation Required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
                Works in Your Browser
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Tools (6 Tools) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#12345A]">
              Popular Tools
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#4B617D]">
              Start with six of our most frequently used everyday utilities.
            </p>
          </div>
          <Link
            to="/tools/"
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-[#C8D7E8] bg-white text-sm font-semibold text-[#12345A] hover:border-[#16C6C9] transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>View All 22 Tools</span>
            <ArrowRight className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredTools.map((tool) => (
            <Link
              key={tool.id}
              to={tool.path}
              className="group flex flex-col justify-between h-full bg-white rounded-xl border border-[#DCE5F0] p-5 hover:border-[#16C6C9] hover:-translate-y-0.5 transition-all duration-150"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#EEF6FB] text-[#12345A] inline-flex items-center justify-center group-hover:bg-[#12345A] group-hover:text-white transition-colors duration-150">
                  <ToolIcon slug={tool.slug} className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-display font-semibold text-base text-[#12345A] group-hover:text-[#0C8588] transition-colors">
                  {tool.name}
                </h3>
                <p className="mt-1.5 text-sm text-[#4B617D] leading-relaxed">
                  {tool.shortDescription}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#F0F4F9] inline-flex items-center gap-1.5 text-xs font-semibold text-[#12345A] group-hover:text-[#0C8588]">
                <span>Open Tool</span>
                <ArrowRight
                  className="w-3.5 h-3.5 text-[#0FA7AA] transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Browse Tools by Category (4 Categories + All Tools CTA) */}
      <section className="bg-white border-y border-[#DCE5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#12345A]">
                Browse Tools by Category
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-[#4B617D]">
                Explore all 22 utilities organized into four focused categories.
              </p>
            </div>
            <Link
              to="/tools/"
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678] transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <span>Browse All Tools</span>
              <ArrowRight className="w-4 h-4 text-[#16C6C9]" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {TOOL_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                to={`/tools/?category=${category.id}`}
                className="group flex flex-col justify-between h-full rounded-xl border border-[#DCE5F0] bg-[#FAFBFD] hover:bg-white hover:border-[#16C6C9] p-5 transition-colors duration-150"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="w-10 h-10 rounded-lg bg-[#12345A] text-[#16C6C9] inline-flex items-center justify-center shrink-0">
                      <CategoryIcon categoryId={category.id} className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-medium text-[#5B708B] tabular-nums">
                      {category.toolCount} tools
                    </span>
                  </div>
                  <h3 className="mt-4 font-display font-semibold text-base text-[#12345A]">
                    {category.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#4B617D] leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E6EEF7] inline-flex items-center gap-1.5 text-xs font-semibold text-[#12345A] group-hover:text-[#0C8588]">
                  <span>Explore Tools</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0FA7AA]" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 3 Featured Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#12345A]">
              Featured Guides &amp; Tips
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#4B617D]">
              Practical articles on text formatting, web fundamentals, and everyday calculations.
            </p>
          </div>
          <Link
            to="/guides/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#12345A] hover:text-[#0C8588] whitespace-nowrap"
          >
            <span>View all guides</span>
            <ArrowRight className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredGuides.map((guide) => (
            <article
              key={guide.id}
              className="group flex flex-col justify-between h-full bg-white rounded-xl border border-[#DCE5F0] overflow-hidden hover:border-[#16C6C9] transition-colors"
            >
              <div>
                <Link to={guide.path} className="block aspect-[4/3] bg-[#EEF6FB] overflow-hidden">
                  <img
                    src={withBase(guide.thumbnail)}
                    alt={guide.thumbnailAlt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                  />
                </Link>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-[#5B708B]">
                    <span className="font-medium text-[#0C8588]">{guide.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{guide.readTime}</span>
                  </div>
                  <h3 className="mt-2 font-display font-semibold text-base text-[#12345A] leading-snug">
                    <Link to={guide.path} className="hover:text-[#0C8588] transition-colors">
                      {guide.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-[#4B617D] leading-relaxed">
                    {guide.shortDescription}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <Link
                  to={guide.path}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12345A] hover:text-[#0C8588]"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0FA7AA]" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Short About Section */}
      <section className="bg-white border-y border-[#DCE5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="rounded-xl border border-[#DCE5F0] bg-[#FAFBFD] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-3xl">
              <div
                aria-hidden="true"
                className="w-12 h-12 rounded-xl bg-[#12345A] text-[#16C6C9] flex items-center justify-center shrink-0"
              >
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[#12345A]">
                  About TooloraHub
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[#4B617D] leading-relaxed">
                  TooloraHub brings 22 straightforward browser-based utilities together in one clean workspace—built and maintained by {SITE_CONFIG.developer.name} ({SITE_CONFIG.developer.experience}) so routine text, web, and calculation tasks stay fast and accessible on any screen.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/about/"
                className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678] transition-colors whitespace-nowrap"
              >
                About Us
              </Link>
              <Link
                to="/contact/"
                className="inline-flex items-center justify-center h-10 px-4 rounded-lg border border-[#C8D7E8] bg-white text-[#12345A] text-sm font-semibold hover:border-[#16C6C9] transition-colors whitespace-nowrap"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Concise FAQ Section (4 Key Questions) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="text-center mb-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#12345A]">
            Frequently Asked Questions
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-[#4B617D]">
            Quick answers about how TooloraHub works.
          </p>
        </div>

        <div className="space-y-3">
          {homeFaqs.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-xl border border-[#DCE5F0] bg-white overflow-hidden"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#FAFBFD] transition-colors"
                >
                  <span className="font-display font-semibold text-sm sm:text-base text-[#12345A]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0FA7AA] shrink-0 transition-transform duration-150 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-sm text-[#4B617D] leading-relaxed border-t border-[#F0F4F9]">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
