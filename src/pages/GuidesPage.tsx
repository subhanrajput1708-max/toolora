import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { ALL_GUIDES, GUIDE_CATEGORIES, type GuideCategory } from '../data/guides';
import { usePageMeta } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | GuideCategory>('all');
  const [query, setQuery] = useState('');

  usePageMeta({
    title: 'Guides & Practical Tips — Digital Productivity & Formatting | TooloraHub',
    description:
      'Explore practical guides on text formatting, URL slugs, HTML entities, everyday calculations, and browser productivity.',
    path: '/guides/',
  });

  const filteredGuides = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_GUIDES.filter((guide) => {
      if (selectedCategory !== 'all' && guide.category !== selectedCategory) return false;
      if (!q) return true;
      return (
        guide.title.toLowerCase().includes(q) ||
        guide.shortDescription.toLowerCase().includes(q) ||
        guide.category.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <Breadcrumbs items={[{ label: 'Guides' }]} />

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#12345A]">
            Helpful Guides &amp; Tips
          </h1>
          <p className="mt-2 text-base text-[#4B617D]">
            Explore practical guides that help you understand digital tools, text formatting, web basics, and everyday productivity.
          </p>
        </div>

        <div className="w-full lg:w-80">
          <label htmlFor="guides-search" className="sr-only">
            Search guides
          </label>
          <div className="relative">
            <Search
              className="w-4 h-4 text-[#5B708B] absolute left-3.5 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              id="guides-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guides..."
              className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#10243E] placeholder:text-[#6B809A] focus:outline-none focus:border-[#16C6C9] focus:ring-2 focus:ring-[#16C6C9]/25"
            />
          </div>
        </div>
      </div>

      {/* Guide Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-[#12345A] text-white'
              : 'bg-white border border-[#DCE5F0] text-[#39506B] hover:border-[#16C6C9]'
          }`}
        >
          All Guides ({ALL_GUIDES.length})
        </button>
        {GUIDE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#12345A] text-white'
                : 'bg-white border border-[#DCE5F0] text-[#39506B] hover:border-[#16C6C9]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredGuides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <article
              key={guide.id}
              className="group flex flex-col justify-between h-full bg-white rounded-xl border border-[#DCE5F0] overflow-hidden hover:border-[#16C6C9] transition-colors"
            >
              <div>
                <Link to={guide.path} className="block aspect-[4/3] bg-[#EEF6FB] overflow-hidden">
                  <img
                    src={guide.thumbnail}
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
                  <h2 className="mt-2 font-display font-semibold text-lg text-[#12345A] leading-snug">
                    <Link to={guide.path} className="hover:text-[#0C8588] transition-colors">
                      {guide.title}
                    </Link>
                  </h2>
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
      ) : (
        <div className="bg-white rounded-xl border border-[#DCE5F0] p-10 text-center space-y-3">
          <p className="text-base text-[#4B617D]">No guides matched your filter.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678]"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
