import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import {
  ALL_TOOLS,
  TOOL_CATEGORIES,
  getCategoryById,
  type ToolCategoryId,
} from '../data/tools';
import { usePageMeta } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolIcon } from '../components/ToolIcon';

export function AllToolsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramCategory = searchParams.get('category') as ToolCategoryId | null;
  const paramQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(paramQuery);
  const [category, setCategory] = useState<'all' | ToolCategoryId>(
    paramCategory && TOOL_CATEGORIES.some((c) => c.id === paramCategory) ? paramCategory : 'all'
  );

  useEffect(() => {
    setQuery(paramQuery);
  }, [paramQuery]);

  useEffect(() => {
    if (paramCategory && TOOL_CATEGORIES.some((c) => c.id === paramCategory)) {
      setCategory(paramCategory);
    } else if (!paramCategory) {
      setCategory('all');
    }
  }, [paramCategory]);

  usePageMeta({
    title: 'All Free Online Tools — 22 Everyday Utilities | TooloraHub',
    description:
      'Browse all 22 free online tools on TooloraHub across Text & Writing, Web & Internet, Everyday Calculators, and File & Productivity.',
    path: '/tools/',
  });

  const handleCategoryChange = (next: 'all' | ToolCategoryId) => {
    setCategory(next);
    const nextParams = new URLSearchParams(searchParams);
    if (next === 'all') nextParams.delete('category');
    else nextParams.set('category', next);
    setSearchParams(nextParams, { replace: true });
  };

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_TOOLS.filter((tool) => {
      if (category !== 'all' && tool.categoryId !== category) return false;
      if (!q) return true;
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [query, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <Breadcrumbs items={[{ label: 'All Tools' }]} />

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#12345A]">
            All Free Online Tools
          </h1>
          <p className="mt-2 text-base text-[#4B617D]">
            Every TooloraHub utility runs directly in your browser with clear controls and instant results.
          </p>
        </div>

        <div className="w-full lg:w-80">
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
              placeholder="Search 22 tools..."
              className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#10243E] placeholder:text-[#6B809A] focus:outline-none focus:border-[#16C6C9] focus:ring-2 focus:ring-[#16C6C9]/25"
            />
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => handleCategoryChange('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            category === 'all'
              ? 'bg-[#12345A] text-white'
              : 'bg-white border border-[#DCE5F0] text-[#39506B] hover:border-[#16C6C9]'
          }`}
        >
          All Tools ({ALL_TOOLS.length})
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
                  <span>Open Tool</span>
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
            onClick={() => {
              setQuery('');
              handleCategoryChange('all');
            }}
            className="px-4 py-2 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678]"
          >
            Show All Tools
          </button>
        </div>
      )}
    </div>
  );
}
