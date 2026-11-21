import { Link } from 'react-router-dom';
import { Mail, Phone, User } from 'lucide-react';
import { SITE_CONFIG } from '../data/site';
import { TOOL_CATEGORIES } from '../data/tools';
import { withBase } from '../utils/paths';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0E2846] text-[#DCE6F2] border-t border-[#1A3B62]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img
                src={withBase(SITE_CONFIG.logoPath)}
                alt="TooloraHub logo"
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg object-contain bg-white p-0.5 shrink-0"
                referrerPolicy="no-referrer"
              />
              <span className="font-display font-bold text-lg text-white">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm font-medium text-[#6CE2E4]">
              {SITE_CONFIG.tagline}
            </p>
            <p className="text-sm text-[#B7C7DA] leading-relaxed">
              Free, browser-based utilities for writing, web formatting, everyday calculations, and digital productivity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-[#C1D0E1] hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tools/" className="text-[#C1D0E1] hover:text-white transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link to="/guides/" className="text-[#C1D0E1] hover:text-white transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/about/" className="text-[#C1D0E1] hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact/" className="text-[#C1D0E1] hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools Categories */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              Tools Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              {TOOL_CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/tools/?category=${category.id}`}
                    className="text-[#C1D0E1] hover:text-white transition-colors"
                  >
                    {category.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              Legal &amp; Policies
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/privacy-policy/"
                  className="text-[#C1D0E1] hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions/"
                  className="text-[#C1D0E1] hover:text-white transition-colors"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer/"
                  className="text-[#C1D0E1] hover:text-white transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Contact */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              Developer Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-[#DCE6F2]">
                <User className="w-4 h-4 text-[#16C6C9] shrink-0" aria-hidden="true" />
                <span>{SITE_CONFIG.developer.name}</span>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.developer.email}`}
                  className="flex items-start gap-2 text-[#C1D0E1] hover:text-white transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#16C6C9] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{SITE_CONFIG.developer.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.developer.phoneHref}
                  className="flex items-center gap-2 text-[#C1D0E1] hover:text-white transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#16C6C9] shrink-0" aria-hidden="true" />
                  <span>{SITE_CONFIG.developer.phoneDisplay}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#1D3F68] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#A9BDD5]">
          <p>&copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.</p>
          <p>
            Developed &amp; maintained by{' '}
            <Link to="/about/" className="text-white hover:text-[#6CE2E4] underline underline-offset-2">
              {SITE_CONFIG.developer.name}
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
