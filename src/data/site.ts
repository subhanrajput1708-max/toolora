export const SITE_CONFIG = {
  name: 'TooloraHub',
  domain: 'https://toolorahub.site',
  tagline: 'Simple Tools. Smarter Everyday Work.',
  homeTitle: 'TooloraHub - Free Online Tools for Calculations, Text & Productivity',
  description:
    'Use 50 free online tools at TooloraHub for calculations, finance, conversions, text editing, productivity, and web tasks right in your browser.',
  logoPath: '/logo.png',
  developer: {
    name: 'Muhammad Subhan',
    experience: '6 Years of Experience',
    email: 'subhanrajput3222@gmail.com',
    phoneDisplay: '03157867445',
    phoneHref: 'tel:+923157867445',
    bio: 'TooloraHub is developed and maintained by Muhammad Subhan, a web developer with six years of experience in website development, digital tools, user-focused interfaces, and web technologies. His goal is to make useful online tools accessible through a simple, reliable, and user-friendly experience.',
  },
} as const;

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const HOMEPAGE_FAQS: FaqItem[] = [
  {
    id: 'free-to-use',
    question: 'Are TooloraHub tools free to use?',
    answer:
      'Yes. All 50 utilities on TooloraHub—covering text formatting, everyday and finance calculators, date and time math, unit conversions, productivity timers, and web tools—are completely free with no subscriptions or sign-up required.',
  },
  {
    id: 'download-install',
    question: 'Do I need to download or install anything?',
    answer:
      'No installation or account registration is needed. Every utility runs directly inside your modern web browser, so you can open a tool and start working right away.',
  },
  {
    id: 'privacy-processing',
    question: 'How does TooloraHub handle my tool inputs?',
    answer:
      'All 50 utilities and Toolora Assistant run locally in your browser memory—none of your pasted text, generated passwords, JSON payloads, calculator numbers, or assistant questions are sent to an external AI API or stored in a TooloraHub database.',
  },
  {
    id: 'mobile-support',
    question: 'Can I use TooloraHub on mobile devices?',
    answer:
      'Yes. Every page, utility, and Toolora Assistant is built with responsive layouts, readable typography, and touch-friendly controls for phones, tablets, laptops, and desktops.',
  },
  {
    id: 'find-right-tool',
    question: 'How can I quickly find the right tool for my task?',
    answer:
      'Use the Search Tools bar on the homepage, filter by category or collection (Featured, Popular, Recently Added) inside Explore All Tools, or open Toolora Assistant to describe what you want to calculate, convert, or edit.',
  },
];
