import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { SITE_CONFIG } from '../data/site';
import { ALL_TOOLS, TOOL_CATEGORIES } from '../data/tools';
import { usePageMeta } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';

function LegalSiteToolsOverview({ currentPath }: { currentPath: string }) {
  const legalLinks = [
    { label: 'Privacy Policy', to: '/privacy-policy/' },
    { label: 'Terms & Conditions', to: '/terms-and-conditions/' },
    { label: 'Disclaimer', to: '/disclaimer/' },
    { label: 'HTML Sitemap', to: '/sitemap/' },
    { label: 'About Us', to: '/about/' },
    { label: 'Contact Us', to: '/contact/' },
  ];

  return (
    <aside
      aria-label="TooloraHub site and tools summary"
      className="pt-6 border-t border-[#E6EEF7] space-y-4"
    >
      <div className="rounded-xl border border-[#DCE5F0] bg-[#FAFBFD] p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="font-display font-semibold text-base text-[#12345A]">
            TooloraHub Platform &amp; Tools Scope ({ALL_TOOLS.length} Utilities)
          </h2>
          <span className="text-xs font-medium text-[#0C8588]">
            {SITE_CONFIG.domain} · {SITE_CONFIG.developer.name}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#4B617D] leading-relaxed">
          All legal policies on this page apply to {SITE_CONFIG.name} ({SITE_CONFIG.domain}), its locally executed <strong>Toolora Assistant</strong> guide, and all {ALL_TOOLS.length} browser utilities across {TOOL_CATEGORIES.length} categories:
        </p>
        <div className="flex flex-wrap gap-2">
          {TOOL_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/tools/?category=${cat.id}`}
              className="px-2.5 py-1 rounded-md border border-[#DCE5F0] bg-white text-xs font-medium text-[#12345A] hover:border-[#16C6C9] transition-colors"
            >
              {cat.shortName} ({cat.toolCount})
            </Link>
          ))}
        </div>
        <div className="pt-2 border-t border-[#E6EEF7] flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
          <span className="font-semibold text-[#12345A]">Related Pages:</span>
          {legalLinks
            .filter((item) => item.to !== currentPath)
            .map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-[#39506B] hover:text-[#0C8588] underline underline-offset-2"
              >
                {item.label}
              </Link>
            ))}
        </div>
      </div>
    </aside>
  );
}

export function PrivacyPolicyPage() {
  usePageMeta({
    title: 'Privacy Policy | TooloraHub',
    description:
      'Read TooloraHub’s Privacy Policy covering local browser tools, local Toolora Assistant handling, voluntary contact information, hosting logs, cookies, and user rights.',
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
            This Privacy Policy explains how TooloraHub (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the website&rdquo;) handles information when you visit {SITE_CONFIG.domain}, use our online tools, interact with Toolora Assistant, or contact the developer. We aim to describe our actual technical practices clearly and accurately.
          </p>
        </div>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            1. Information Automatically Collected by Hosting Infrastructure
          </h2>
          <p>
            When your browser requests pages, scripts, or stylesheets from TooloraHub, the web server and hosting network automatically receive standard technical request metadata—such as your IP address, browser user-agent string, referring page, requested URL path, and timestamp—to deliver files reliably and apply basic rate limiting against abuse. TooloraHub does not operate a user account system or behavioral tracking profile database.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            2. Information You Voluntarily Provide
          </h2>
          <p>
            You do not need to create an account, register, or submit personal details to use any of the {ALL_TOOLS.length} tools on TooloraHub or Toolora Assistant. You only share personal contact information (such as your name, email address, and message content) if you choose to contact Muhammad Subhan by email, phone, or via the Contact Us page.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            3. Local Browser-Based Processing
          </h2>
          <p>
            All {ALL_TOOLS.length} utilities on TooloraHub—including text editors, financial and math calculators, date utilities, unit converters, productivity timers, password generators, JSON formatters, and QR code generators—as well as <strong>Toolora Assistant</strong> execute locally inside your browser using client-side JavaScript. Text, numbers, dates, passwords, JSON payloads, and assistant queries stay in your device&apos;s browser memory and are not sent to an external AI API or saved to a TooloraHub database.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            4. Contact Form Handling
          </h2>
          <p>
            The Contact Us form validates your fields locally in the browser and builds a standard <code className="font-mono text-xs bg-[#F5F8FC] px-1.5 py-0.5 rounded">mailto:</code> draft that opens your own email client addressed to {SITE_CONFIG.developer.email}. Submitting the form does not save messages inside a TooloraHub database; your message is only sent if you complete sending it from your email provider.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            5. Cookies &amp; Browser Local Storage
          </h2>
          <p>
            TooloraHub itself does not set authentication cookies, session tracking cookies, or advertising cookies, and the website&apos;s tools and Toolora Assistant do not write persistent user profiles to <code className="font-mono text-xs bg-[#F5F8FC] px-1.5 py-0.5 rounded">localStorage</code> or <code className="font-mono text-xs bg-[#F5F8FC] px-1.5 py-0.5 rounded">sessionStorage</code>. All tool inputs and assistant history reset when you clear them or refresh the page. Your browser may still cache static files (such as stylesheets, scripts, or images) according to standard HTTP caching behavior.
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
            To render clean, legible typography across devices, TooloraHub loads web fonts from Google Fonts (<code className="font-mono text-xs bg-[#F5F8FC] px-1.5 py-0.5 rounded">fonts.googleapis.com</code> and <code className="font-mono text-xs bg-[#F5F8FC] px-1.5 py-0.5 rounded">fonts.gstatic.com</code>). That font provider receives standard HTTP request metadata in accordance with Google&apos;s own privacy terms.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            9. Data Security &amp; Retention
          </h2>
          <p>
            Because tool inputs stay inside your browser session and TooloraHub does not maintain a database of user documents or assistant histories, clearing or refreshing your browser tab removes your active session data. When you send an email directly to {SITE_CONFIG.developer.email}, that correspondence is retained in the developer&apos;s email inbox only for as long as needed to respond to your support request, bug report, or feedback, and you may request deletion of your correspondence at any time.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            10. Your Privacy Choices &amp; Rights
          </h2>
          <p>
            Depending on where you live, you may have rights to request access to, correction of, or deletion of personal contact emails you voluntarily sent to us, and to manage cookies or browser storage through your browser settings. Clearing your Toolora Assistant conversation or refreshing your browser discards active messages on screen immediately. To request deletion of prior email correspondence, write to {SITE_CONFIG.developer.email}.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            11. Children&apos;s Privacy
          </h2>
          <p>
            TooloraHub provides general-purpose utilities suitable for general audiences and does not knowingly collect personal information from children under 13 (or the applicable age of digital consent in your jurisdiction). If a parent or guardian believes a child has sent personal correspondence by email, please contact us so we can delete it promptly.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            12. External Links
          </h2>
          <p>
            Tool pages may occasionally reference external standards or web formats. We are not responsible for the privacy practices or content of third-party websites outside {SITE_CONFIG.domain}, and we encourage reviewing their respective privacy policies when visiting them.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            13. Policy Updates &amp; Contact Information
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

        <LegalSiteToolsOverview currentPath="/privacy-policy/" />
      </article>
    </div>
  );
}

export function TermsPage() {
  usePageMeta({
    title: 'Terms & Conditions | TooloraHub',
    description:
      'Review the Terms & Conditions for using TooloraHub online utilities and Toolora Assistant, including permitted use, responsibilities, accuracy limits, and intellectual property.',
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
          <p className="mt-3 text-sm sm:text-base text-[#39506B] leading-relaxed">
            These Terms &amp; Conditions govern your access to and use of TooloraHub ({SITE_CONFIG.domain}), including all {ALL_TOOLS.length} browser-based online utilities across {TOOL_CATEGORIES.length} categories, Toolora Assistant, and support pages maintained by {SITE_CONFIG.developer.name}.
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
            TooloraHub grants you permission to use its browser-based utilities and Toolora Assistant for personal, academic, creative, and everyday business workflows at no charge. No user account or paid license is required for normal individual use.
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
            <li>Attempt to disrupt or overload the static hosting infrastructure serving the website.</li>
            <li>Use automated scraping tools to republish TooloraHub&apos;s tools, interface design, or source assets as your own site.</li>
            <li>Generate malicious QR codes, deceptive links, or unlawful content intended to mislead or harm others.</li>
          </ul>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            5. Tool Accuracy and Limitations
          </h2>
          <p>
            Each utility is built using standard JavaScript formulas and algorithms. However, text parsing rules, floating-point rounding, date calculations across timezones, and unit conversion factors can have practical edge cases. TooloraHub does not guarantee that every output will satisfy specialized legal, accounting, medical, or engineering precision requirements.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            6. Intellectual Property
          </h2>
          <p>
            The TooloraHub name, logo emblem, interface design, documentation copy, and website code are owned and maintained by {SITE_CONFIG.developer.name}. Any text, values, CSS snippets, or QR codes you generate from your own inputs remain yours to use freely in your projects.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            7. Website Availability
          </h2>
          <p>
            We strive to keep TooloraHub fast and accessible, though temporary downtime, hosting maintenance, browser compatibility differences, or feature updates may occur from time to time. TooloraHub is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            8. Third-Party Links
          </h2>
          <p>
            TooloraHub may reference external web standards or resources. We do not control and are not responsible for the availability, accuracy, or policies of external websites.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            9. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, TooloraHub and its developer ({SITE_CONFIG.developer.name}) shall not be liable for any indirect, incidental, consequential, or financial losses arising from your use of—or inability to use—the website, its tools, or Toolora Assistant.
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

        <LegalSiteToolsOverview currentPath="/terms-and-conditions/" />
      </article>
    </div>
  );
}

export function DisclaimerPage() {
  usePageMeta({
    title: 'Disclaimer | TooloraHub',
    description:
      'Read the TooloraHub Disclaimer regarding informational use, calculator and tool guide limitations, verification responsibility, and external references.',
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
          <p className="mt-3 text-sm sm:text-base text-[#39506B] leading-relaxed">
            This Disclaimer applies to {SITE_CONFIG.name} ({SITE_CONFIG.domain}), its {ALL_TOOLS.length} free browser utilities across {TOOL_CATEGORIES.length} tool categories, and the locally running Toolora Assistant guide maintained by {SITE_CONFIG.developer.name}.
          </p>
        </div>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            1. General Informational Purpose
          </h2>
          <p>
            All utilities, text processors, calculators, converters, tool documentation, and Toolora Assistant guide entries published on TooloraHub are provided strictly for general informational, educational, and everyday productivity purposes.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            2. Tool Results &amp; Accuracy Limitations
          </h2>
          <p>
            While each tool is carefully tested, automated text tools and client-side formulas operate within practical boundaries. For example, word and sentence counters rely on punctuation and whitespace rules that may count hyphenated terms or abbreviations differently than a specific academic style manual or word processor.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            3. Calculator &amp; Tool Guide Limitations
          </h2>
          <p>
            Our calculators—including the Percentage Calculator, Average Calculator, Ratio Calculator, BMI Calculator, Discount Calculator, Loan EMI Calculator, Compound Interest Calculator, Profit Margin Calculator, Age Calculator, Date Difference Calculator, Unit &amp; Storage Converters, and Time Calculator—use standard arithmetic and browser calendar dates:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Financial estimates (Loan EMI, Compound Interest, Profit Margin, Discount, and Tip) apply standard mathematical formulas and do not account for lender fees, taxes, compounding policy variations, or personalized financial advice.</li>
            <li>The BMI Calculator provides general informational Body Mass Index ranges and is not medical advice or a diagnostic measure of body composition or health.</li>
            <li>Date and age calculations depend on the local date configured on your device and treat weekdays as Monday through Friday without accounting for country-specific public holidays.</li>
            <li>Unit, length, weight, temperature, and data storage conversions apply standard conversion constants and should not replace certified laboratory, legal, or engineering instruments.</li>
            <li>Toolora Assistant provides local tool recommendations from TooloraHub&apos;s catalog; always open and verify results inside the dedicated utility or an authoritative reference.</li>
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
            TooloraHub is an independent collection of software utilities. Nothing on this website constitutes legal, financial, accounting, tax, medical, or certified engineering advice, and we make no warranties or guarantees regarding uninterrupted availability or suitability for high-stakes compliance tasks.
          </p>
        </section>

        <section className="space-y-2.5 text-sm sm:text-base text-[#39506B] leading-relaxed">
          <h2 className="font-display font-semibold text-lg text-[#12345A]">
            6. Third-Party Links &amp; Advertising Disclosure
          </h2>
          <p>
            TooloraHub does not endorse or control third-party websites linked or referenced from external URLs you inspect with our tools. Currently, TooloraHub does not carry paid sponsored reviews or active third-party display ads; if advertising is added in the future to sustain free access, any sponsored or advertising placements will be clearly labeled.
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

        <LegalSiteToolsOverview currentPath="/disclaimer/" />
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
    robots: 'noindex, follow',
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
          The page you tried to open does not exist or may have moved. You can search our {ALL_TOOLS.length} tools below or return to the homepage.
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
          <Link
            to="/sitemap/"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-lg border border-[#C8D7E8] bg-white text-[#12345A] text-sm font-semibold hover:border-[#16C6C9]"
          >
            <span>Open Sitemap</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
