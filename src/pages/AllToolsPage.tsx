import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowUpDown, Search } from 'lucide-react';
import {
  ALL_TOOLS,
  FEATURED_TOOLS,
  POPULAR_TOOLS,
  RECENT_TOOLS,
  TOOL_CATEGORIES,
  getCategoryById,
  resolveCategoryId,
  type ToolCategoryId,
} from '../data/tools';
import { SITE_CONFIG } from '../data/site';
import { usePageMeta } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolIcon } from '../components/ToolIcon';

type SortOption = 'featured' | 'name-asc' | 'name-desc' | 'category';
type CollectionFilter = 'all' | 'featured' | 'popular' | 'recent';

function resolveCollection(raw: string | null): CollectionFilter {
  if (raw === 'featured' || raw === 'popular' || raw === 'recent') return raw;
  return 'all';
}

export function AllToolsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramCategory = searchParams.get('category');
  const paramQuery = searchParams.get('q') ?? '';
  const paramCollection = searchParams.get('collection');

  const [query, setQuery] = useState(paramQuery);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [collection, setCollection] = useState<CollectionFilter>(() =>
    resolveCollection(paramCollection)
  );
  const [category, setCategory] = useState<'all' | ToolCategoryId>(() =>
    resolveCategoryId(paramCategory)
  );

  useEffect(() => {
    setQuery(paramQuery);
  }, [paramQuery]);

  useEffect(() => {
    setCategory(resolveCategoryId(paramCategory));
  }, [paramCategory]);

  useEffect(() => {
    setCollection(resolveCollection(paramCollection));
  }, [paramCollection]);

  const pageSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `All ${ALL_TOOLS.length} Free Online Tools — TooloraHub`,
      url: `${SITE_CONFIG.domain}/tools/`,
      description: `Browse all ${ALL_TOOLS.length} free online tools on TooloraHub across ${TOOL_CATEGORIES.length} categories including Text, Calculators, Finance, Date & Time, Conversions, Productivity, and Web tools.`,
    }),
    []
  );

  usePageMeta({
    title: `All Free Online Tools — ${ALL_TOOLS.length} Everyday Utilities | TooloraHub`,
    description: `Browse all ${ALL_TOOLS.length} free online tools on TooloraHub across ${TOOL_CATEGORIES.length} categories: Text, Calculators, Finance, Date & Time, Conversions, Productivity, and Web Tools.`,
    path: '/tools/',
    schema: pageSchema,
  });

  const handleCategoryChange = (next: 'all' | ToolCategoryId) => {
    setCategory(next);
    const nextParams = new URLSearchParams(searchParams);
    if (next === 'all') nextParams.delete('category');
    else nextParams.set('category', next);
    setSearchParams(nextParams, { replace: true });
  };

  const handleCollectionChange = (next: CollectionFilter) => {
    setCollection(next);
    const nextParams = new URLSearchParams(searchParams);
    if (next === 'all') nextParams.delete('collection');
    else nextParams.set('collection', next);
    setSearchParams(nextParams, { replace: true });
  };

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = ALL_TOOLS.filter((tool) => {
      if (collection === 'featured' && !tool.isFeatured) return false;
      if (collection === 'popular' && typeof tool.popularOrder !== 'number') return false;
      if (collection === 'recent' && !tool.isRecent) return false;
      if (category !== 'all' && tool.categoryId !== category) return false;
      if (!q) return true;
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });

    const sorted = [...matches];
    if (sortBy === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'category') {
      sorted.sort((a, b) => {
        const catCompare = getCategoryById(a.categoryId).name.localeCompare(
          getCategoryById(b.categoryId).name
        );
        return catCompare !== 0 ? catCompare : a.name.localeCompare(b.name);
      });
    } else {
      sorted.sort((a, b) => (a.popularOrder ?? 99) - (b.popularOrder ?? 99));
    }
    return sorted;
  }, [query, collection, category, sortBy]);

  const handleResetAll = () => {
    setQuery('');
    setSortBy('featured');
    setCollection('all');
    setCategory('all');
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const hasActiveFilters =
    collection !== 'all' || category !== 'all' || query.trim() !== '' || sortBy !== 'featured';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <Breadcrumbs items={[{ label: 'All Tools' }]} />

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#12345A]">
            All {ALL_TOOLS.length} Free Online Tools
          </h1>
          <p className="mt-2 text-base text-[#4B617D]">
            Every TooloraHub utility runs directly in your browser across {TOOL_CATEGORIES.length} organized categories with clear controls and instant results.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="w-full sm:w-72">
            <label htmlFor="all-tools-search" className="sr-only">
              Search all tools
            </label>
            <div className="relative">
              <Search
                className="w-4 h-4 text-[#5B708B] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="all-tools-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${ALL_TOOLS.length} tools...`}
                className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#10243E] placeholder:text-[#6B809A] focus:outline-none focus:border-[#16C6C9] focus:ring-2 focus:ring-[#16C6C9]/25"
              />
            </div>
          </div>

          <div className="relative shrink-0">
            <label htmlFor="all-tools-sort" className="sr-only">
              Sort tools
            </label>
            <ArrowUpDown
              className="w-4 h-4 text-[#5B708B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <select
              id="all-tools-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full sm:w-44 h-11 pl-9 pr-3 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] focus:outline-none focus:border-[#16C6C9]"
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
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Tool collections">
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
              onClick={() => handleCollectionChange(col.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                collection === col.id
                  ? 'bg-[#0C8588] text-white'
                  : 'bg-white border border-[#DCE5F0] text-[#39506B] hover:border-[#16C6C9]'
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>

        {hasActiveFilters && (
          <div className="flex items-center gap-3 text-xs text-[#4B617D]">
            <span className="tabular-nums">
              Showing {filteredTools.length} of {ALL_TOOLS.length} tools
            </span>
            <button
              type="button"
              onClick={handleResetAll}
              className="font-semibold text-[#12345A] hover:text-[#0C8588] underline underline-offset-2"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Tool categories">
        <button
          type="button"
          onClick={() => handleCategoryChange('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            category === 'all'
              ? 'bg-[#12345A] text-white'
              : 'bg-white border border-[#DCE5F0] text-[#39506B] hover:border-[#16C6C9]'
          }`}
        >
          All Categories ({ALL_TOOLS.length})
        </button>
        {TOOL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              category === cat.id
                ? 'bg-[#12345A] text-white'
                : 'bg-white border border-[#DCE5F0] text-[#39506B] hover:border-[#16C6C9]'
            }`}
          >
            {cat.name} ({cat.toolCount})
          </button>
        ))}
      </div>

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => {
            const cat = getCategoryById(tool.categoryId);
            return (
              <Link
                key={tool.id}
                to={tool.path}
                className="group flex flex-col justify-between h-full bg-white rounded-xl border border-[#DCE5F0] p-5 hover:border-[#16C6C9] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="w-10 h-10 rounded-lg bg-[#EEF6FB] text-[#12345A] inline-flex items-center justify-center group-hover:bg-[#12345A] group-hover:text-white transition-colors">
                      <ToolIcon slug={tool.slug} className="w-5 h-5" />
                    </span>
                    <span className="text-xs text-[#5B708B]">{cat.shortName}</span>
                  </div>
                  <h2 className="mt-4 font-display font-semibold text-lg text-[#12345A] group-hover:text-[#0C8588]">
                    {tool.name}
                  </h2>
                  <p className="mt-1.5 text-sm text-[#4B617D] leading-relaxed">
                    {tool.shortDescription}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#F0F4F9] inline-flex items-center gap-1.5 text-xs font-semibold text-[#12345A] group-hover:text-[#0C8588]">
                  <span>Use Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0FA7AA]" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#DCE5F0] p-10 text-center space-y-3">
          <p className="text-base text-[#4B617D]">
            No tools matched &ldquo;{query}&rdquo;.
          </p>
          <button
            type="button"
            onClick={handleResetAll}
            className="px-4 py-2 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678]"
          >
            Show All {ALL_TOOLS.length} Tools
          </button>
        </div>
      )}
    </div>
  );
}
