import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Search, X, ArrowRight } from 'lucide-react';
import { ALL_TOOLS, getCategoryById } from '../data/tools';
import { SITE_CONFIG } from '../data/site';
import { ToolIcon } from './ToolIcon';
import { withBase } from '../utils/paths';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/tools/', label: 'All Tools', end: false },
  { to: '/guides/', label: 'Guides', end: false },
  { to: '/about/', label: 'About Us', end: false },
  { to: '/contact/', label: 'Contact Us', end: false },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const matchingTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_TOOLS.slice(0, 6);
    return ALL_TOOLS.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 40);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (matchingTools.length > 0 && query.trim()) {
      navigate(matchingTools[0].path);
      setSearchOpen(false);
    } else {
      navigate(`/tools/${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#DCE5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Brand Logo & Name */}
          <Link
            to="/"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16C6C9] rounded-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src={withBase(SITE_CONFIG.logoPath)}
              alt="TooloraHub logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg object-contain bg-white border border-[#E6EEF7] p-0.5 shrink-0"
              referrerPolicy="no-referrer"
            />
            <span className="font-display font-bold text-lg tracking-tight text-[#12345A] whitespace-nowrap">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Zone 2: Clean single-line navigation links */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6 lg:gap-7">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16C6C9] ${
                    isActive
                      ? 'text-[#12345A] border-[#16C6C9]'
                      : 'text-[#4B617D] border-transparent hover:text-[#12345A] hover:border-[#B9CDE4]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Primary Action (Search trigger + mobile menu trigger) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search tools"
              className="inline-flex items-center gap-2 h-10 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#F8FBFF] text-sm font-medium text-[#12345A] hover:border-[#16C6C9] hover:bg-white transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16C6C9]"
            >
              <Search className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
              <span className="hidden sm:inline">Search Tools</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#D4E0EE] bg-white text-[#12345A] hover:bg-[#F5F8FC] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16C6C9]"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="md:hidden border-t border-[#DCE5F0] bg-white px-4 py-3 space-y-1 shadow-sm"
          >
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between min-h-[44px] px-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EEF6FB] text-[#12345A]'
                      : 'text-[#39506B] hover:bg-[#F5F8FC] hover:text-[#12345A]'
                  }`
                }
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search TooloraHub tools"
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#0C233D]/45 backdrop-blur-xs"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-xl border border-[#DCE5F0] shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 px-4 py-3 border-b border-[#E6EEF7]">
              <Search className="w-5 h-5 text-[#0FA7AA] shrink-0" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools — word counter, calculator, text cleaner..."
                aria-label="Search tools"
                className="w-full text-sm sm:text-base text-[#10243E] placeholder:text-[#6B809A] bg-transparent focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-[#5C728D] hover:bg-[#F5F8FC] hover:text-[#12345A]"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>

            <div className="max-h-80 overflow-y-auto divide-y divide-[#F0F4F9]">
              {matchingTools.length > 0 ? (
                matchingTools.map((tool) => {
                  const category = getCategoryById(tool.categoryId);
                  return (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#F5F8FC] transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-9 h-9 rounded-lg bg-[#EEF6FB] text-[#12345A] inline-flex items-center justify-center shrink-0">
                          <ToolIcon slug={tool.slug} className="w-4 h-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-[#12345A] truncate">
                            {tool.name}
                          </div>
                          <div className="text-xs text-[#5B708B] truncate">
                            {category.shortName} · {tool.shortDescription}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#0FA7AA] shrink-0" aria-hidden="true" />
                    </Link>
                  );
                })
              ) : (
                <div className="px-4 py-8 text-center text-sm text-[#5B708B]">
                  No tools matched &ldquo;{query}&rdquo;. Try searching for words, URL, QR, or date.
                </div>
              )}
            </div>

            <div className="px-4 py-2.5 bg-[#F8FBFF] border-t border-[#E6EEF7] flex items-center justify-between text-xs text-[#5B708B]">
              <span>Press Enter to open top match</span>
              <Link
                to="/tools/"
                onClick={() => setSearchOpen(false)}
                className="font-medium text-[#12345A] hover:text-[#0C8588]"
              >
                View all 22 tools
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
