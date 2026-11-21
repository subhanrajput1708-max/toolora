import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Mail, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../data/site';
import { TOOL_CATEGORIES } from '../data/tools';
import { usePageMeta } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CategoryIcon } from '../components/ToolIcon';

export function AboutPage() {
  usePageMeta({
    title: 'About Us — TooloraHub & Developer Muhammad Subhan',
    description:
      'Learn what TooloraHub is, its mission, who it helps, how browser-based tools work, and meet developer Muhammad Subhan (6 years of experience).',
    path: '/about/',
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      <div className="bg-white rounded-2xl border border-[#DCE5F0] p-6 sm:p-10 space-y-10">
        {/* What TooloraHub Is & Mission */}
        <section className="space-y-4">
          <p className="text-sm font-semibold text-[#0C8588]">{SITE_CONFIG.tagline}</p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#12345A]">
            About TooloraHub
          </h1>
          <p className="text-base text-[#39506B] leading-relaxed">
            TooloraHub is a focused online utility website built to make everyday digital tasks faster and less frustrating. Whether you need to check a word count before submitting an article, clean stray formatting out of copied text, encode a URL query parameter, generate a printable QR code, or work out a percentage or date difference, TooloraHub puts 22 practical utilities in one clean, organized place.
          </p>
          <p className="text-base text-[#39506B] leading-relaxed">
            Our purpose and mission are straightforward: provide dependable, easy-to-understand browser tools without login walls, software downloads, or cluttered interfaces that bury simple controls under distractions.
          </p>
        </section>

        {/* What Types of Tools It Offers */}
        <section className="space-y-4 pt-6 border-t border-[#E6EEF7]">
          <h2 className="font-display font-bold text-2xl text-[#12345A]">
            What TooloraHub Offers
          </h2>
          <p className="text-sm sm:text-base text-[#4B617D] leading-relaxed">
            All 22 utilities are organized into four clear categories alongside practical written guides explaining the concepts behind them:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOOL_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                to={`/tools/?category=${category.id}`}
                className="flex items-start gap-3.5 p-4 rounded-xl border border-[#DCE5F0] bg-[#FAFBFD] hover:bg-white hover:border-[#16C6C9] transition-colors"
              >
                <span className="w-10 h-10 rounded-lg bg-[#12345A] text-[#16C6C9] inline-flex items-center justify-center shrink-0">
                  <CategoryIcon categoryId={category.id} className="w-5 h-5" />
                </span>
                <div>
                  <div className="font-display font-semibold text-base text-[#12345A]">
                    {category.name} ({category.toolCount})
                  </div>
                  <p className="mt-1 text-sm text-[#4B617D] leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Who Can Benefit */}
        <section className="space-y-4 pt-6 border-t border-[#E6EEF7]">
          <h2 className="font-display font-bold text-2xl text-[#12345A]">
            Who TooloraHub Is Built For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-[#39506B]">
            <div className="p-4 rounded-xl border border-[#E6EEF7] bg-[#FAFBFD]">
              <h3 className="font-display font-semibold text-[#12345A]">
                Writers, Students &amp; Editors
              </h3>
              <p className="mt-1.5 text-sm text-[#4B617D] leading-relaxed">
                Check word and character targets, estimate reading or presentation speaking times, clean pasted drafts, and compare revisions line by line.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-[#E6EEF7] bg-[#FAFBFD]">
              <h3 className="font-display font-semibold text-[#12345A]">
                Web Creators &amp; Developers
              </h3>
              <p className="mt-1.5 text-sm text-[#4B617D] leading-relaxed">
                Generate clean URL slugs, inspect or escape URL query strings and HTML entities, build CSS gradients, and export crisp SVG or PNG QR codes.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-[#E6EEF7] bg-[#FAFBFD]">
              <h3 className="font-display font-semibold text-[#12345A]">
                Small Business &amp; Everyday Planning
              </h3>
              <p className="mt-1.5 text-sm text-[#4B617D] leading-relaxed">
                Verify sale discounts and tax totals, calculate percentage changes, count working weekdays between project dates, and add up session durations.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-[#E6EEF7] bg-[#FAFBFD]">
              <h3 className="font-display font-semibold text-[#12345A]">
                Anyone on Desktop or Mobile
              </h3>
              <p className="mt-1.5 text-sm text-[#4B617D] leading-relaxed">
                Every utility adapts cleanly to phones, tablets, and desktop screens with readable typography and straightforward copy or download actions.
              </p>
            </div>
          </div>
        </section>

        {/* Usability, Simplicity & Transparency */}
        <section className="space-y-3 pt-6 border-t border-[#E6EEF7]">
          <h2 className="font-display font-bold text-2xl text-[#12345A]">
            Usability, Simplicity &amp; Transparency
          </h2>
          <p className="text-sm sm:text-base text-[#39506B] leading-relaxed">
            TooloraHub runs its utilities directly inside your web browser using standard JavaScript rather than uploading your pasted text or calculator numbers to a remote processing server. Because every calculation happens locally on your device, results update immediately as you type.
          </p>
          <p className="text-sm sm:text-base text-[#39506B] leading-relaxed">
            We also believe in being clear about what each tool can and cannot do. Every tool page explains how its calculation or text transformation works and highlights edge cases—such as rounding rules, punctuation boundaries, or date-system assumptions—so you know how to interpret the result.
          </p>
        </section>

        {/* Development, Maintenance & Developer Profile */}
        <section className="space-y-4 pt-6 border-t border-[#E6EEF7]">
          <h2 className="font-display font-bold text-2xl text-[#12345A]">
            Development &amp; Maintenance
          </h2>
          <div className="flex flex-col sm:flex-row items-start gap-5 p-5 rounded-xl border border-[#DCE5F0] bg-[#FAFBFD]">
            <div
              aria-hidden="true"
              className="w-14 h-14 rounded-xl bg-[#12345A] text-[#16C6C9] flex items-center justify-center shrink-0"
            >
              <Code2 className="w-7 h-7" />
            </div>
            <div className="space-y-2.5">
              <div>
                <p className="text-xs font-semibold text-[#0C8588]">Independent Web Developer</p>
                <h3 className="font-display font-bold text-xl text-[#12345A]">
                  {SITE_CONFIG.developer.name}
                </h3>
                <p className="text-sm font-medium text-[#4B617D]">
                  {SITE_CONFIG.developer.experience}
                </p>
              </div>
              <p className="text-sm sm:text-base text-[#39506B] leading-relaxed">
                {SITE_CONFIG.developer.bio}
              </p>
              <p className="text-sm text-[#4B617D] leading-relaxed">
                Bug fixes, tool refinements, and new educational guides are maintained directly by Muhammad Subhan based on practical use cases and user feedback.
              </p>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="space-y-3 pt-6 border-t border-[#E6EEF7]">
          <h2 className="font-display font-bold text-2xl text-[#12345A]">
            Looking Ahead
          </h2>
          <p className="text-sm sm:text-base text-[#39506B] leading-relaxed">
            TooloraHub is designed to grow thoughtfully over time. Rather than adding hundreds of shallow or repetitive widgets, future updates focus on refining existing calculators and text utilities, improving keyboard and screen-reader accessibility, and expanding our library of plain-language guides so every feature stays genuinely useful.
          </p>
        </section>

        {/* Contact & Next Steps */}
        <section className="pt-6 border-t border-[#E6EEF7] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2 text-sm">
            <div className="font-semibold text-[#12345A]">Direct Contact</div>
            <div className="flex flex-wrap items-center gap-5">
              <a
                href={`mailto:${SITE_CONFIG.developer.email}`}
                className="inline-flex items-center gap-2 text-[#12345A] hover:text-[#0C8588] font-medium"
              >
                <Mail className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
                <span>{SITE_CONFIG.developer.email}</span>
              </a>
              <a
                href={SITE_CONFIG.developer.phoneHref}
                className="inline-flex items-center gap-2 text-[#12345A] hover:text-[#0C8588] font-medium tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
                <span>{SITE_CONFIG.developer.phoneDisplay}</span>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/tools/"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678] transition-colors"
            >
              <span>Explore All Tools</span>
              <ArrowRight className="w-4 h-4 text-[#16C6C9]" aria-hidden="true" />
            </Link>
            <Link
              to="/contact/"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg border border-[#C8D7E8] bg-white text-[#12345A] text-sm font-semibold hover:border-[#16C6C9] transition-colors"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
