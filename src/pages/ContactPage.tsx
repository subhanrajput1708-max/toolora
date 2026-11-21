import { Bug, Lightbulb, Mail, MessageSquare, Phone, User } from 'lucide-react';
import { SITE_CONFIG } from '../data/site';
import { usePageMeta } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ContactForm } from '../components/ContactForm';

export function ContactPage() {
  usePageMeta({
    title: 'Contact Us — Suggestions, Bug Reports & Support | TooloraHub',
    description:
      'Get in touch with TooloraHub developer Muhammad Subhan to suggest a new tool, report a bug, or share feedback via email or phone.',
    path: '/contact/',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <div className="max-w-3xl mb-8">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#12345A]">
          Contact Us
        </h1>
        <p className="mt-3 text-base text-[#4B617D] leading-relaxed">
          Whether you want to suggest a new everyday utility, report an edge case in an existing tool, or ask a general question about TooloraHub, you are welcome to reach out directly. Every message goes straight to developer {SITE_CONFIG.developer.name}.
        </p>
      </div>

      {/* What to Reach Out About */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-[#DCE5F0] p-5">
          <span className="w-9 h-9 rounded-lg bg-[#EEF6FB] text-[#0C8588] inline-flex items-center justify-center">
            <Lightbulb className="w-4 h-4" aria-hidden="true" />
          </span>
          <h2 className="mt-3 font-display font-semibold text-base text-[#12345A]">
            Tool Suggestions
          </h2>
          <p className="mt-1.5 text-sm text-[#4B617D] leading-relaxed">
            Missing a text helper, web formatter, or everyday calculator? Describe the task you want to simplify and what inputs or outputs would help most.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#DCE5F0] p-5">
          <span className="w-9 h-9 rounded-lg bg-[#EEF6FB] text-[#0C8588] inline-flex items-center justify-center">
            <Bug className="w-4 h-4" aria-hidden="true" />
          </span>
          <h2 className="mt-3 font-display font-semibold text-base text-[#12345A]">
            Bug Reports
          </h2>
          <p className="mt-1.5 text-sm text-[#4B617D] leading-relaxed">
            Notice a calculation mismatch, mobile layout issue, or broken link? Include the tool name, what you entered, and your browser or device if possible.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#DCE5F0] p-5">
          <span className="w-9 h-9 rounded-lg bg-[#EEF6FB] text-[#0C8588] inline-flex items-center justify-center">
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
          </span>
          <h2 className="mt-3 font-display font-semibold text-base text-[#12345A]">
            Feedback &amp; Support
          </h2>
          <p className="mt-1.5 text-sm text-[#4B617D] leading-relaxed">
            Have questions about one of our guides, accessibility improvements, or site policies? Send a note anytime for a direct response.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <aside className="lg:col-span-4 space-y-5 bg-white rounded-xl border border-[#DCE5F0] p-6">
          <div>
            <h2 className="font-display font-semibold text-lg text-[#12345A]">
              Developer Contact Details
            </h2>
            <p className="mt-1.5 text-sm text-[#4B617D] leading-relaxed">
              TooloraHub is developed and maintained by {SITE_CONFIG.developer.name} ({SITE_CONFIG.developer.experience}).
            </p>
          </div>

          <div className="space-y-3.5 pt-3 border-t border-[#E6EEF7] text-sm">
            <div className="flex items-center gap-3 text-[#12345A] font-medium">
              <User className="w-4 h-4 text-[#0FA7AA] shrink-0" aria-hidden="true" />
              <span>{SITE_CONFIG.developer.name}</span>
            </div>
            <a
              href={`mailto:${SITE_CONFIG.developer.email}`}
              className="flex items-start gap-3 text-[#39506B] hover:text-[#12345A] break-all"
            >
              <Mail className="w-4 h-4 text-[#0FA7AA] shrink-0 mt-0.5" aria-hidden="true" />
              <span>{SITE_CONFIG.developer.email}</span>
            </a>
            <a
              href={SITE_CONFIG.developer.phoneHref}
              className="flex items-center gap-3 text-[#39506B] hover:text-[#12345A] tabular-nums"
            >
              <Phone className="w-4 h-4 text-[#0FA7AA] shrink-0" aria-hidden="true" />
              <span>{SITE_CONFIG.developer.phoneDisplay}</span>
            </a>
          </div>

          <div className="pt-4 border-t border-[#E6EEF7]">
            <h3 className="font-display font-semibold text-sm text-[#12345A]">
              How This Form Works
            </h3>
            <p className="mt-1.5 text-xs text-[#5B708B] leading-relaxed">
              TooloraHub runs as a static website without a backend email server. When you complete and submit the form, it validates your fields locally and opens a pre-filled email draft in your device&apos;s default email app addressed to {SITE_CONFIG.developer.email}. If your device does not have a mail app configured, you can copy the formatted message with one click after submitting.
            </p>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
