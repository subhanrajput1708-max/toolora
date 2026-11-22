import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpDown,
  Check,
  ChevronDown,
  Compass,
  Layers,
  MonitorSmartphone,
  Search,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  ALL_TOOLS,
  FEATURED_TOOLS,
  POPULAR_TOOLS,
  RECENT_TOOLS,
  TOOL_CATEGORIES,
  getCategoryById,
  type ToolCategoryId,
} from '../data/tools';
import { HOMEPAGE_FAQS, SITE_CONFIG } from '../data/site';
import { usePageMeta } from '../utils/seo';
import { useAiChat } from '../context/AiChatContext';
import { CategoryIcon, ToolIcon } from '../components/ToolIcon';

type HomeSortOption = 'featured' | 'name-asc' | 'name-desc' | 'category';
type CollectionFilter = 'all' | 'featured' | 'popular' | 'recent';

const HOW_IT_WORKS_STEPS = [
  {
    step: 'Step 1',
    title: 'Choose a Tool',
    description:
      'Pick a utility from Featured or Popular Tools, browse our 7 categories, search by keyword, or ask Toolora Assistant to recommend the right fit.',
  },
  {
    step: 'Step 2',
    title: 'Enter Your Information',
    description:
      'Type or paste your text, numbers, dates, JSON, or settings directly into the clean, uncluttered workspace in your browser.',
  },
  {
    step: 'Step 3',
    title: 'Get Your Result',
    description:
      'View results immediately on screen, tweak options anytime, and copy outputs or download PNG, SVG, CSV, JSON, or .txt files in one click.',
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const { openChat } = useAiChat();

  // Hero / Dedicated Search Tools state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  // Interactive Explore All Tools state
  const [exploreQuery, setExploreQuery] = useState('');
  const [exploreCollection, setExploreCollection] = useState<CollectionFilter>('all');
  const [exploreCategory, setExploreCategory] = useState<'all' | ToolCategoryId>('all');
  const [exploreSort, setExploreSort] = useState<HomeSortOption>('featured');
  const [showAllInline, setShowAllInline] = useState(false);

  // FAQ Accordion state
  const [openFaqId, setOpenFaqId] = useState<string | null>(HOMEPAGE_FAQS[0]?.id ?? null);

  const featuredSelection = useMemo(() => {
    const preferredOrder = [
      'loan-emi-calculator',
      'password-generator',
      'json-formatter-validator',
      'bmi-calculator',
      'word-counter',
      'qr-code-generator',
    ];
    return preferredOrder
      .map((slug) => FEATURED_TOOLS.find((t) => t.slug === slug))
      .filter((t): t is NonNullable<typeof t> => Boolean(t));
  }, []);

  const popularSelection = useMemo(() => POPULAR_TOOLS.slice(0, 6), []);

  const whyChooseItems = useMemo(
    () => [
      {
        icon: Zap,
        title: 'Instant Browser Execution',
        description: `All ${ALL_TOOLS.length} text, calculator, finance, date, conversion, and web utilities run locally in your browser without page reloads.`,
      },
      {
        icon: ShieldCheck,
        title: 'Privacy-Conscious Design',
        description:
          'No account sign-ups or user profiles are required. Tool inputs stay inside your browser session rather than being stored in a database.',
      },
      {
        icon: MonitorSmartphone,
        title: 'Mobile & Desktop Ready',
        description:
          'Clean typography, accessible tap targets, and responsive layouts adjust smoothly across phones, tablets, laptops, and desktops.',
      },
      {
        icon: Layers,
        title: `${ALL_TOOLS.length} Utilities in ${TOOL_CATEGORIES.length} Categories`,
        description:
          'From Word Counter, Loan EMI Calculator, and BMI Calculator to Password Generator, JSON Formatter, and QR Codes—all in one workspace.',
      },
    ],
    []
  );

  const pageSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HOMEPAGE_FAQS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }),
    []
  );

  usePageMeta({
    title: SITE_CONFIG.homeTitle,
    description: SITE_CONFIG.description,
    path: '/',
    schema: pageSchema,
  });

  const searchMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return ALL_TOOLS.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const exploreTools = useMemo(() => {
    const q = exploreQuery.trim().toLowerCase();
    const filtered = ALL_TOOLS.filter((tool) => {
      if (exploreCollection === 'featured' && !tool.isFeatured) return false;
      if (exploreCollection === 'popular' && typeof tool.popularOrder !== 'number') return false;
      if (exploreCollection === 'recent' && !tool.isRecent) return false;
      if (exploreCategory !== 'all' && tool.categoryId !== exploreCategory) return false;
      if (!q) return true;
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });

    const sorted = [...filtered];
    if (exploreSort === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (exploreSort === 'name-desc') {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (exploreSort === 'category') {
      sorted.sort((a, b) => {
        const catCmp = getCategoryById(a.categoryId).name.localeCompare(
          getCategoryById(b.categoryId).name
        );
        return catCmp !== 0 ? catCmp : a.name.localeCompare(b.name);
      });
    } else {
      sorted.sort((a, b) => (a.popularOrder ?? 99) - (b.popularOrder ?? 99));
    }
    return sorted;
  }, [exploreQuery, exploreCollection, exploreCategory, exploreSort]);

  const isFilteringExplore =
    exploreCollection !== 'all' ||
    exploreCategory !== 'all' ||
    exploreQuery.trim() !== '' ||
    exploreSort !== 'featured';

  const visibleExploreTools =
    showAllInline || isFilteringExplore ? exploreTools : exploreTools.slice(0, 12);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchMatches.length === 1) {
      navigate(searchMatches[0].path);
    } else if (searchQuery.trim()) {
      navigate(`/tools/?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/tools/');
    }
  };

  const resetExploreFilters = () => {
    setExploreQuery('');
    setExploreCollection('all');
    setExploreCategory('all');
    setExploreSort('featured');
    setShowAllInline(false);
  };

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative bg-white border-b border-[#DCE5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-[#0C8588] tracking-wide mb-3">
              {SITE_CONFIG.tagline}
            </p>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#12345A] tracking-tight leading-[1.15] [text-wrap:balance]">
              Free Online Tools for Everyday Tasks
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#465C78] leading-relaxed max-w-2xl mx-auto">
              Use {ALL_TOOLS.length} free, browser-based utilities for writing, calculations, finance math, dates, unit conversions, productivity, and web tasks—with instant results and no sign-ups.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href="#explore-all-tools"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678] transition-colors whitespace-nowrap"
              >
                <span>Explore All Tools</span>
                <ArrowRight className="w-4 h-4 text-[#16C6C9]" aria-hidden="true" />
              </a>
              <a
                href="#popular-tools"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg border border-[#C8D7E8] bg-white text-[#12345A] text-sm font-semibold hover:border-[#16C6C9] transition-colors whitespace-nowrap"
              >
                <span>Discover Popular Tools</span>
              </a>
              <button
                type="button"
                onClick={() => openChat()}
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg border border-[#C8D7E8] bg-[#F8FBFF] text-[#12345A] text-sm font-semibold hover:border-[#16C6C9] hover:bg-white transition-colors whitespace-nowrap"
              >
                <Compass className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
                <span>Ask Toolora Assistant</span>
              </button>
            </div>

            {/* Concise Trust Facts */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#4B617D]">
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
                {ALL_TOOLS.length} Free Online Tools
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
                {TOOL_CATEGORIES.length} Focused Categories
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
                No Installation or Sign-Up
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Search Tools */}
      <section
        id="search-tools"
        aria-labelledby="search-tools-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-14 pb-6"
      >
        <div className="bg-white rounded-2xl border border-[#DCE5F0] p-6 sm:p-8 shadow-xs">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="search-tools-heading" className="font-display font-bold text-xl sm:text-2xl text-[#12345A]">
              Search Tools
            </h2>
            <p className="mt-1 text-sm text-[#4B617D]">
              Search across all {ALL_TOOLS.length} utilities or open the full directory.
            </p>

            <form
              onSubmit={handleSearchSubmit}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                  setSearchFocused(false);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSearchFocused(false);
                }
              }}
              className="mt-5 relative"
              role="search"
              aria-label="Search TooloraHub tools"
            >
              <div className="flex items-center bg-[#F5F8FC] border border-[#C8D7E8] focus-within:border-[#16C6C9] focus-within:bg-white focus-within:ring-3 focus-within:ring-[#16C6C9]/20 rounded-xl p-1.5 transition-all">
                <Search className="w-5 h-5 text-[#5B708B] ml-3 shrink-0" aria-hidden="true" />
                <input
                  type="search"
                  value={searchQuery}
                  onFocus={() => setSearchFocused(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools — word counter, loan EMI, JSON, password, BMI..."
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

              {searchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl border border-[#DCE5F0] shadow-lg text-left overflow-hidden z-30">
                  {searchMatches.length > 0 ? (
                    <ul className="divide-y divide-[#F0F4F9] max-h-72 overflow-y-auto">
                      {searchMatches.slice(0, 6).map((tool) => (
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
                    <div className="px-4 py-4 text-sm text-[#5B708B] flex flex-wrap items-center justify-between gap-2">
                      <span>No direct tool match for &ldquo;{searchQuery}&rdquo;.</span>
                      <button
                        type="button"
                        onClick={() => openChat(searchQuery)}
                        className="text-xs font-semibold text-[#12345A] hover:text-[#0C8588] underline underline-offset-2"
                      >
                        Ask Toolora Assistant instead
                      </button>
                    </div>
                  )}
                </div>
              )}
            </form>

            {/* Quick Tool Jump Links & Directory CTA */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5B708B]">
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
                <span>Quick picks:</span>
                <Link to="/tools/word-counter/" className="font-medium text-[#12345A] hover:text-[#0C8588]">
                  Word Counter
                </Link>
                <Link to="/tools/loan-emi-calculator/" className="font-medium text-[#12345A] hover:text-[#0C8588]">
                  Loan EMI
                </Link>
                <Link to="/tools/json-formatter-validator/" className="font-medium text-[#12345A] hover:text-[#0C8588]">
                  JSON Formatter
                </Link>
                <Link to="/tools/password-generator/" className="font-medium text-[#12345A] hover:text-[#0C8588]">
                  Password Generator
                </Link>
                <Link to="/tools/qr-code-generator/" className="font-medium text-[#12345A] hover:text-[#0C8588]">
                  QR Code
                </Link>
              </div>
              <Link
                to="/tools/"
                className="inline-flex items-center gap-1.5 font-semibold text-[#12345A] hover:text-[#0C8588] whitespace-nowrap"
              >
                <span>Browse All {ALL_TOOLS.length} Tools</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0FA7AA]" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Tools */}
      <section aria-labelledby="featured-tools-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div>
            <h2 id="featured-tools-heading" className="font-display font-bold text-2xl sm:text-3xl text-[#12345A]">
              Featured Tools
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#4B617D]">
              High-impact utilities across finance, web development, health math, and writing.
            </p>
          </div>
          <Link
            to="/tools/?collection=featured"
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-[#C8D7E8] bg-white text-sm font-semibold text-[#12345A] hover:border-[#16C6C9] transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>See All Featured</span>
            <ArrowRight className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredSelection.map((tool) => {
            const cat = getCategoryById(tool.categoryId);
            return (
              <Link
                key={tool.id}
                to={tool.path}
                className="group flex flex-col justify-between h-full bg-white rounded-xl border border-[#DCE5F0] p-5 hover:border-[#16C6C9] hover:-translate-y-0.5 transition-all duration-150"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-10 h-10 rounded-lg bg-[#EEF6FB] text-[#12345A] inline-flex items-center justify-center group-hover:bg-[#12345A] group-hover:text-white transition-colors duration-150">
                      <ToolIcon slug={tool.slug} className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-[#5B708B]">{cat.shortName}</span>
                  </div>
                  <h3 className="mt-4 font-display font-semibold text-base text-[#12345A] group-hover:text-[#0C8588] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#4B617D] leading-relaxed">
                    {tool.shortDescription}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#F0F4F9] inline-flex items-center gap-1.5 text-xs font-semibold text-[#12345A] group-hover:text-[#0C8588]">
                  <span>Use Tool</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 text-[#0FA7AA] transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Popular Tools */}
      <section
        id="popular-tools"
        aria-labelledby="popular-tools-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div>
            <h2 id="popular-tools-heading" className="font-display font-bold text-2xl sm:text-3xl text-[#12345A]">
              Popular Tools
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#4B617D]">
              Start with six of our most frequently used everyday utilities.
            </p>
          </div>
          <Link
            to="/tools/?collection=popular"
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-[#C8D7E8] bg-white text-sm font-semibold text-[#12345A] hover:border-[#16C6C9] transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>Open Directory</span>
            <ArrowRight className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularSelection.map((tool) => {
            const cat = getCategoryById(tool.categoryId);
            return (
              <Link
                key={tool.id}
                to={tool.path}
                className="group flex flex-col justify-between h-full bg-white rounded-xl border border-[#DCE5F0] p-5 hover:border-[#16C6C9] hover:-translate-y-0.5 transition-all duration-150"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-10 h-10 rounded-lg bg-[#EEF6FB] text-[#12345A] inline-flex items-center justify-center group-hover:bg-[#12345A] group-hover:text-white transition-colors duration-150">
                      <ToolIcon slug={tool.slug} className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-[#5B708B]">{cat.shortName}</span>
                  </div>
                  <h3 className="mt-4 font-display font-semibold text-base text-[#12345A] group-hover:text-[#0C8588] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#4B617D] leading-relaxed">
                    {tool.shortDescription}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#F0F4F9] inline-flex items-center gap-1.5 text-xs font-semibold text-[#12345A] group-hover:text-[#0C8588]">
                  <span>Use Tool</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 text-[#0FA7AA] transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Explore All Tools (Interactive Filter, Collection Tabs, Search & Sort) */}
      <section
        id="explore-all-tools"
        aria-labelledby="explore-all-tools-heading"
        className="bg-white border-y border-[#DCE5F0]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-6">
            <div>
              <h2
                id="explore-all-tools-heading"
                className="font-display font-bold text-2xl sm:text-3xl text-[#12345A]"
              >
                Explore All Tools
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-[#4B617D]">
                Filter by collection or category, search by keyword, or sort all {ALL_TOOLS.length} browser utilities right here.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-64">
                <label htmlFor="home-explore-search" className="sr-only">
                  Filter tools by keyword
                </label>
                <Search
                  className="w-4 h-4 text-[#5B708B] absolute left-3.5 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  id="home-explore-search"
                  type="search"
                  value={exploreQuery}
                  onChange={(e) => setExploreQuery(e.target.value)}
                  placeholder={`Search ${ALL_TOOLS.length} tools...`}
                  className="w-full h-10 pl-10 pr-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] text-sm text-[#10243E] placeholder:text-[#6B809A] focus:outline-none focus:bg-white focus:border-[#16C6C9]"
                />
              </div>

              <div className="relative shrink-0">
                <label htmlFor="home-explore-sort" className="sr-only">
                  Sort tools
                </label>
                <ArrowUpDown
                  className="w-4 h-4 text-[#5B708B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <select
                  id="home-explore-sort"
                  value={exploreSort}
                  onChange={(e) => setExploreSort(e.target.value as HomeSortOption)}
                  className="w-full sm:w-44 h-10 pl-9 pr-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] text-sm font-medium text-[#12345A] focus:outline-none focus:bg-white focus:border-[#16C6C9]"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="name-asc">Sort: Name (A–Z)</option>
                  <option value="name-desc">Sort: Name (Z–A)</option>
                  <option value="category">Sort: Category</option>
                </select>
              </div>
            </div>
          </div>

          {/* Collection Quick Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#EDF2F7]">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Tool collections">
              {(
                [
                  { id: 'all', label: `All (${ALL_TOOLS.length})` },
                  { id: 'featured', label: `Featured (${FEATURED_TOOLS.length})` },
                  { id: 'popular', label: `Popular (${POPULAR_TOOLS.length})` },
                  { id: 'recent', label: `Recently Added (${RECENT_TOOLS.length})` },
                ] as const
              ).map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setExploreCollection(col.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                    exploreCollection === col.id
                      ? 'bg-[#0C8588] text-white'
                      : 'bg-[#F5F8FC] border border-[#DCE5F0] text-[#39506B] hover:border-[#16C6C9]'
                  }`}
                >
                  {col.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-[#4B617D]">
              <span className="tabular-nums">
                Showing {visibleExploreTools.length} of {exploreTools.length} matching ({ALL_TOOLS.length} total)
              </span>
              {isFilteringExplore && (
                <button
                  type="button"
                  onClick={resetExploreFilters}
                  className="font-semibold text-[#12345A] hover:text-[#0C8588] underline underline-offset-2"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter by category">
            <button
              type="button"
              onClick={() => setExploreCategory('all')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                exploreCategory === 'all'
                  ? 'bg-[#12345A] text-white'
                  : 'bg-[#FAFBFD] border border-[#DCE5F0] text-[#39506B] hover:border-[#16C6C9]'
              }`}
            >
              All Categories
            </button>
            {TOOL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setExploreCategory(cat.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  exploreCategory === cat.id
                    ? 'bg-[#12345A] text-white'
                    : 'bg-[#FAFBFD] border border-[#DCE5F0] text-[#39506B] hover:border-[#16C6C9]'
                }`}
              >
                {cat.shortName} ({cat.toolCount})
              </button>
            ))}
          </div>

          {visibleExploreTools.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {visibleExploreTools.map((tool) => {
                  const cat = getCategoryById(tool.categoryId);
                  return (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="group flex flex-col justify-between h-full bg-[#FAFBFD] hover:bg-white rounded-xl border border-[#DCE5F0] p-4 hover:border-[#16C6C9] transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="w-9 h-9 rounded-lg bg-[#EEF6FB] text-[#12345A] inline-flex items-center justify-center group-hover:bg-[#12345A] group-hover:text-white transition-colors">
                            <ToolIcon slug={tool.slug} className="w-4 h-4" />
                          </span>
                          <span className="text-[11px] font-medium text-[#5B708B]">
                            {cat.shortName}
                          </span>
                        </div>
                        <h3 className="mt-3 font-display font-semibold text-sm sm:text-base text-[#12345A] group-hover:text-[#0C8588]">
                          {tool.name}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-[#4B617D] leading-relaxed">
                          {tool.shortDescription}
                        </p>
                      </div>
                      <div className="mt-4 pt-2.5 border-t border-[#E6EEF7] inline-flex items-center gap-1.5 text-xs font-semibold text-[#12345A] group-hover:text-[#0C8588]">
                        <span>Use Tool</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#0FA7AA]" aria-hidden="true" />
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                {!isFilteringExplore && exploreTools.length > 12 && (
                  <button
                    type="button"
                    onClick={() => setShowAllInline((prev) => !prev)}
                    className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg border border-[#C8D7E8] bg-white text-sm font-semibold text-[#12345A] hover:border-[#16C6C9] transition-colors"
                  >
                    <span>
                      {showAllInline
                        ? 'Show Compact Preview'
                        : `Show All ${ALL_TOOLS.length} Tools Here`}
                    </span>
                  </button>
                )}
                <Link
                  to="/tools/"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678] transition-colors"
                >
                  <span>View All {ALL_TOOLS.length} Tools</span>
                  <ArrowRight className="w-4 h-4 text-[#16C6C9]" aria-hidden="true" />
                </Link>
              </div>
            </>
          ) : (
            <div className="bg-[#FAFBFD] rounded-xl border border-[#DCE5F0] p-8 text-center space-y-3">
              <p className="text-sm sm:text-base text-[#4B617D]">
                No tools matched &ldquo;{exploreQuery}&rdquo; with the selected filters.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={resetExploreFilters}
                  className="px-4 py-2 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678]"
                >
                  Reset Filters
                </button>
                <button
                  type="button"
                  onClick={() => openChat(exploreQuery || 'Help me find the right tool')}
                  className="px-4 py-2 rounded-lg border border-[#C8D7E8] bg-white text-[#12345A] text-sm font-semibold hover:border-[#16C6C9]"
                >
                  Ask Toolora Assistant
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. Browse Tools by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#12345A]">
              Browse Tools by Category
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#4B617D]">
              Explore all {ALL_TOOLS.length} utilities organized into {TOOL_CATEGORIES.length} focused categories.
            </p>
          </div>
          <Link
            to="/tools/"
            className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678] transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-4 h-4 text-[#16C6C9]" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {TOOL_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={`/tools/?category=${category.id}`}
              className="group flex flex-col justify-between h-full rounded-xl border border-[#DCE5F0] bg-white hover:border-[#16C6C9] p-5 transition-colors duration-150"
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
                <span>Explore Category</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0FA7AA]" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. How TooloraHub Works */}
      <section className="bg-white border-y border-[#DCE5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="max-w-2xl mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#12345A]">
              How TooloraHub Works
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#4B617D]">
              Every utility follows a clean three-step workflow directly inside your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW_IT_WORKS_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className="rounded-xl border border-[#DCE5F0] bg-[#FAFBFD] p-6 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#12345A] text-[#16C6C9] font-mono text-sm font-semibold inline-flex items-center justify-center tabular-nums">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#0C8588]">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-[#12345A]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#4B617D] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Why Choose TooloraHub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="max-w-2xl mb-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#12345A]">
            Why Choose TooloraHub
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-[#4B617D]">
            Designed by {SITE_CONFIG.developer.name} ({SITE_CONFIG.developer.experience}) for clarity, speed, and dependable everyday productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyChooseItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-[#DCE5F0] p-5 space-y-3"
              >
                <span className="w-10 h-10 rounded-lg bg-[#EEF6FB] text-[#0C8588] inline-flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="font-display font-semibold text-base text-[#12345A]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#4B617D] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Toolora Assistant Introduction */}
      <section className="bg-white border-y border-[#DCE5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="rounded-2xl bg-[#12345A] text-white p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6CE2E4]">
                <Compass className="w-4 h-4 text-[#16C6C9]" aria-hidden="true" />
                <span>Built-In Smart Tool Guide</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Meet Toolora Assistant — Your Smart Guide to TooloraHub
              </h2>
              <p className="text-sm sm:text-base text-[#DCE6F2] leading-relaxed">
                Your smart guide to finding and using TooloraHub&apos;s free online tools. Describe what you want to calculate, convert, format, or check across our {ALL_TOOLS.length} utilities and get instant matching recommendations and direct links—no accounts or external APIs required.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  'Show me all available tools',
                  'Find a calculator',
                  'Help me find the right tool',
                ].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => openChat(prompt)}
                    className="text-xs font-medium text-[#DCE6F2] bg-[#1A4678] border border-[#2C5D94] hover:border-[#16C6C9] hover:text-white rounded-lg px-3 py-1.5 transition-colors"
                  >
                    &ldquo;{prompt}&rdquo;
                  </button>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3">
              <button
                type="button"
                onClick={() => openChat()}
                className="inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-xl bg-[#16C6C9] text-[#0C233D] font-display font-bold text-sm hover:bg-[#3FD8DA] transition-colors whitespace-nowrap"
              >
                <Compass className="w-5 h-5" aria-hidden="true" />
                <span>Open Toolora Assistant</span>
              </button>
              <Link
                to="/about/"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-[#B7C7DA] hover:text-white underline underline-offset-2"
              >
                <span>Learn more about TooloraHub</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="text-center mb-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#12345A]">
            Frequently Asked Questions
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-[#4B617D]">
            Quick answers about TooloraHub tools and Toolora Assistant.
          </p>
        </div>

        <div className="space-y-3">
          {HOMEPAGE_FAQS.map((item) => {
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
