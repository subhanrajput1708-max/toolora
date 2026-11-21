import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { SITE_CONFIG } from '../data/site';
import { usePageMeta } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function PrivacyPolicyPage() {
  usePageMeta({
    title: 'Privacy Policy | TooloraHub',
    description:
      'Read TooloraHub’s Privacy Policy covering browser-based tool processing, voluntary contact information, hosting logs, cookies, third-party services, and user rights.',
    path: '/privacy-policy/',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
      <article className="bg-white rounded-2xl border border-[#DCE5F0] p-6 sm:p-10 space-y-7">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#12345A]">Privacy Policy</h1>
          <p className="mt-2 text-sm text-[#5B708B]">
            Effective Date: November 2026 · Domain: {SITE_CONFIG.domain}
          </p>
          <p className="mt-3 text-sm sm:text-base text-[#39506B] leading-relaxed">
            This Privacy Policy explains how TooloraHub (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the website&rdquo;) handles information when you visit {SITE_CONFIG.domain}, use our online tools, read our guides, or contact the developer. We aim to describe our actual technical practices clearly and accurately.
          </p>
        </div>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            1. Information Automatically Collected by Hosting Infrastructure
          </h2>
          <p>
            TooloraHub is served as a static website. When your browser requests a page, image, or stylesheet, the web hosting provider and network infrastructure automatically receive standard technical request data—such as your IP address, browser user-agent string, referring page, requested URL path, and timestamp—to deliver files reliably and protect against abuse. TooloraHub does not operate a custom database of visitor logs.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            2. Information You Voluntarily Provide
          </h2>
          <p>
            You do not need to create an account, register, or submit personal details to use any of the 22 tools or read any guide on TooloraHub. You only share personal contact information (such as your name, email address, and message content) if you choose to contact Muhammad Subhan by email, phone, or via the Contact Us page.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            3. Browser-Based Tool Processing (Local vs. Server Processing)
          </h2>
          <p>
            All 22 utilities on TooloraHub—including text counters, cleaners, diff checkers, URL/HTML encoders, QR code generation, calculators, unit converters, and CSS gradient builders—execute locally inside your browser using client-side JavaScript. Text, numbers, dates, or links you enter into a tool are processed in your device&apos;s memory to display results on screen and are not transmitted to a TooloraHub application server for storage.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            4. Contact Form Handling
          </h2>
          <p>
            Because TooloraHub does not run a server-side form submission backend, the Contact Us form validates your input in the browser and builds a standard <code className="font-mono text-xs bg-[#F5F8FC] px-1.5 py-0.5 rounded">mailto:</code> draft that opens your own email client. Submitting the form does not send data through a TooloraHub database; your message is only sent if you send the email through your email provider.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            5. Cookies &amp; Browser Local Storage
          </h2>
          <p>
            TooloraHub itself does not set authentication cookies, session tracking cookies, or advertising cookies, and the website&apos;s tools currently do not write persistent user profiles to <code className="font-mono text-xs bg-[#F5F8FC] px-1.5 py-0.5 rounded">localStorage</code> or <code className="font-mono text-xs bg-[#F5F8FC] px-1.5 py-0.5 rounded">sessionStorage</code>. All tool inputs reset when you refresh or leave a page. Your browser may still cache static files (such as stylesheets, scripts, or images) according to standard HTTP caching behavior.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            6. Analytics Services
          </h2>
          <p>
            TooloraHub currently does not run third-party behavioral analytics scripts (such as Google Analytics) on its pages. If lightweight privacy-conscious analytics or measurement tools are introduced in the future, this Privacy Policy will be updated before or at the time of integration to identify the service and what data it processes.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            7. Advertising &amp; Google AdSense Disclosure
          </h2>
          <p>
            At present, TooloraHub does not display third-party advertisements or load Google AdSense scripts. Should Google AdSense or another advertising network be enabled in the future to help support free tool hosting and maintenance, third-party vendors (including Google) may use cookies to serve ads based on a visitor&apos;s prior visits to this or other websites, and visitors would be able to manage personalized advertising preferences through Google&apos;s Ads Settings or applicable opt-out mechanisms. Any future addition of advertising will be reflected in an updated version of this policy.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            8. Third-Party Services
          </h2>
          <p>
            To render clean, legible typography across devices, TooloraHub loads web fonts from Google Fonts (<code className="font-mono text-xs bg-[#F5F8FC] px-1.5 py-0.5 rounded">fonts.googleapis.com</code> and <code className="font-mono text-xs bg-[#F5F8FC] px-1.5 py-0.5 rounded">fonts.gstatic.com</code>). When your browser fetches those font files, Google receives standard web request metadata such as your IP address and browser details in accordance with Google&apos;s own privacy terms.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            9. Data Security &amp; Retention
          </h2>
          <p>
            Because tool inputs stay inside your browser session, TooloraHub does not retain copies of documents, calculations, or QR contents you generate. When you send an email directly to {SITE_CONFIG.developer.email}, that correspondence is retained in the developer&apos;s email inbox only for as long as needed to respond to your support request, bug report, or feedback, and you may request deletion of your correspondence at any time.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            10. Children&apos;s Privacy
          </h2>
          <p>
            TooloraHub provides general-purpose utilities and educational guides suitable for general audiences and does not knowingly collect personal information from children under 13 (or the applicable age of digital consent in your jurisdiction). If a parent or guardian believes a child has sent personal correspondence by email, please contact us so we can delete it promptly.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            11. External Links
          </h2>
          <p>
            Our guides or tools may occasionally reference external standards or websites. We are not responsible for the privacy practices or content of third-party websites outside {SITE_CONFIG.domain}, and we encourage reviewing their respective privacy policies when visiting them.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            12. Policy Updates &amp; Contact Information
          </h2>
          <p>
            We may revise this Privacy Policy from time to time if site features, third-party services, or legal requirements change. Updates will be posted on this page with a revised effective date. For any privacy questions, contact {SITE_CONFIG.developer.name} at{' '}
            <a
              href={`mailto:${SITE_CONFIG.developer.email}`}
              className="text-[#12345A] font-medium underline underline-offset-2"
            >
              {SITE_CONFIG.developer.email}
            </a>{' '}
            or call{' '}
            <a
              href={SITE_CONFIG.developer.phoneHref}
              className="text-[#12345A] font-medium underline underline-offset-2 tabular-nums"
            >
              {SITE_CONFIG.developer.phoneDisplay}
            </a>
            .
          </p>
        </section>
      </article>
    </div>
  );
}

export function TermsPage() {
  usePageMeta({
    title: 'Terms & Conditions | TooloraHub',
    description:
      'Review the Terms & Conditions for using TooloraHub online utilities and guides, including permitted use, responsibilities, accuracy limits, and intellectual property.',
    path: '/terms-and-conditions/',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />
      <article className="bg-white rounded-2xl border border-[#DCE5F0] p-6 sm:p-10 space-y-7">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#12345A]">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-sm text-[#5B708B]">
            Effective Date: November 2026 · Website: {SITE_CONFIG.domain}
          </p>
        </div>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing, browsing, or using TooloraHub ({SITE_CONFIG.domain}), you agree to be bound by these Terms &amp; Conditions. If you do not agree with any provision described here, please do not use this website.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            2. Permitted Website Use
          </h2>
          <p>
            TooloraHub grants you permission to use its browser-based utilities and read its guides for personal, academic, creative, and everyday business workflows at no charge. No user account or paid license is required for normal individual use.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            3. User Responsibilities
          </h2>
          <p>
            You are responsible for the content you enter into any tool, how you verify calculated outputs, and how you use downloaded files (such as QR code images, CSV exports, or plain-text downloads). When using outputs for invoices, contracts, printed materials, or published web pages, you agree to double-check accuracy before publishing or distributing them.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            4. Prohibited Activities
          </h2>
          <p>When using TooloraHub, you agree not to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Attempt to disrupt, overload, or interfere with the hosting infrastructure serving the website.</li>
            <li>Use automated scraping tools to republish TooloraHub&apos;s original guides, layout, or source assets as your own site.</li>
            <li>Generate malicious QR codes, deceptive links, or unlawful content intended to mislead or harm others.</li>
          </ul>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            5. Tool Accuracy and Limitations
          </h2>
          <p>
            Each tool is built using standard JavaScript formulas and algorithms. However, text parsing rules, floating-point rounding, date calculations across timezones, and unit conversion factors can have practical edge cases. TooloraHub does not guarantee that every output will satisfy specialized legal, accounting, medical, or engineering precision requirements.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            6. Intellectual Property
          </h2>
          <p>
            The TooloraHub name, logo emblem, interface design, original guides, and website code are owned and maintained by {SITE_CONFIG.developer.name}. Any text, values, CSS snippets, or QR codes you generate from your own inputs remain yours to use freely in your projects.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            7. Website Availability
          </h2>
          <p>
            We strive to keep TooloraHub fast and accessible, but temporary downtime, hosting maintenance, or feature updates may occur from time to time. TooloraHub is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            8. Third-Party Links
          </h2>
          <p>
            TooloraHub may reference external resources or third-party links inside articles or documentation. We do not control and are not responsible for the availability, accuracy, or policies of external websites.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            9. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, TooloraHub and its developer ({SITE_CONFIG.developer.name}) shall not be liable for any indirect, incidental, consequential, or financial losses arising from your use of—or inability to use—the website, its tools, or its guides.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            10. Changes to Terms &amp; Contact Details
          </h2>
          <p>
            We may update these Terms &amp; Conditions periodically as the platform evolves. Continued use of the site after changes are posted constitutes acceptance of the revised terms. Questions may be directed to{' '}
            <a
              href={`mailto:${SITE_CONFIG.developer.email}`}
              className="text-[#12345A] font-medium underline underline-offset-2"
            >
              {SITE_CONFIG.developer.email}
            </a>{' '}
            or {SITE_CONFIG.developer.phoneDisplay}.
          </p>
        </section>
      </article>
    </div>
  );
}

export function DisclaimerPage() {
  usePageMeta({
    title: 'Disclaimer | TooloraHub',
    description:
      'Read the TooloraHub Disclaimer regarding informational use, calculator limitations, verification responsibility, and external references.',
    path: '/disclaimer/',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <Breadcrumbs items={[{ label: 'Disclaimer' }]} />
      <article className="bg-white rounded-2xl border border-[#DCE5F0] p-6 sm:p-10 space-y-7">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#12345A]">Disclaimer</h1>
          <p className="mt-2 text-sm text-[#5B708B]">
            Effective Date: November 2026 · {SITE_CONFIG.domain}
          </p>
        </div>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            1. General Informational Purpose
          </h2>
          <p>
            All utilities, text processors, calculators, converters, and written guides published on TooloraHub are provided strictly for general informational, educational, and everyday productivity purposes.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            2. Tool Results &amp; Accuracy Limitations
          </h2>
          <p>
            While each tool is carefully tested, automated text tools and client-side formulas operate within practical boundaries. For example, word and sentence counters rely on punctuation and whitespace rules that may count hyphenated terms or abbreviations differently than a specific academic style guide or word processor.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            3. Calculator-Specific Limitations
          </h2>
          <p>
            Our calculators—including the Percentage Calculator, Discount Calculator, Age Calculator, Date Difference Calculator, Unit Converter, and Time Calculator—use standard arithmetic and browser calendar dates:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Discount and tax estimates apply flat percentages and do not account for regional tax exemptions, tiered pricing, or merchant rounding rules.</li>
            <li>Date and age calculations depend on the local date configured on your device and treat weekdays as Monday through Friday without accounting for country-specific public holidays.</li>
            <li>Unit conversions round decimal outputs to six significant decimal places for readability and should not replace certified laboratory or engineering instruments.</li>
          </ul>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            4. User Responsibility for Verifying Results
          </h2>
          <p>
            Before using any output from TooloraHub in financial invoices, official forms, printed QR signage, production web code, or academic submissions, you are responsible for reviewing and verifying the final figures or generated text yourself.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            5. No Professional Advice &amp; No Guarantees
          </h2>
          <p>
            TooloraHub is an independent collection of software utilities and practical guides. Nothing on this website constitutes legal, financial, accounting, tax, medical, or certified engineering advice, and we make no warranties or guarantees regarding uninterrupted availability or suitability for high-stakes compliance tasks.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            6. Third-Party Links &amp; Advertising Disclosure
          </h2>
          <p>
            TooloraHub does not endorse or control third-party websites linked or referenced from external URLs you inspect with our tools. Currently, TooloraHub does not carry paid sponsored reviews or active third-party display ads; if advertising is added in the future to sustain free access, any sponsored or advertising placements will be clearly distinguished from editorial guide content.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            7. Contact Information
          </h2>
          <p>
            If you spot a formula issue or have questions about this Disclaimer, please contact {SITE_CONFIG.developer.name} at{' '}
            <a
              href={`mailto:${SITE_CONFIG.developer.email}`}
              className="text-[#12345A] font-medium underline underline-offset-2"
            >
              {SITE_CONFIG.developer.email}
            </a>{' '}
            or {SITE_CONFIG.developer.phoneDisplay}.
          </p>
        </section>
      </article>
    </div>
  );
}

export function NotFoundPage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  usePageMeta({
    title: 'Page Not Found (404) | TooloraHub',
    description: 'The requested page could not be found on TooloraHub.',
    path: '/404.html',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/tools/${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      <div className="bg-white rounded-2xl border border-[#DCE5F0] p-8 sm:p-12 space-y-6">
        <p className="font-mono text-sm font-semibold text-[#0C8588]">Error 404</p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#12345A]">
          Page Not Found
        </h1>
        <p className="text-base text-[#4B617D] max-w-lg mx-auto">
          The page you tried to open does not exist or may have moved. You can search our 22 tools below or return to the homepage.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              className="w-4 h-4 text-[#5B708B] absolute left-3.5 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search TooloraHub tools..."
              aria-label="Search tools"
              className="w-full h-11 pl-10 pr-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] text-sm text-[#10243E] focus:outline-none focus:border-[#16C6C9]"
            />
          </div>
          <button
            type="submit"
            className="h-11 px-4 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678]"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678]"
          >
            <span>Go to Homepage</span>
            <ArrowRight className="w-4 h-4 text-[#16C6C9]" aria-hidden="true" />
          </Link>
          <Link
            to="/tools/"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-lg border border-[#C8D7E8] bg-white text-[#12345A] text-sm font-semibold hover:border-[#16C6C9]"
          >
            <span>Browse All Tools</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
