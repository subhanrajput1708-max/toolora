export const SITE_CONFIG = {
  name: 'TooloraHub',
  domain: 'https://toolorahub.site',
  tagline: 'Simple Tools. Smarter Everyday Work.',
  description:
    'Free, easy-to-use online tools designed to help you work smarter, save time, and simplify everyday digital tasks.',
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

export const WHY_TOOLORAHUB = [
  {
    id: 'easy-to-use',
    title: 'Easy to Use',
    description:
      'Our tools are designed with simple controls and clear instructions so anyone can use them.',
  },
  {
    id: 'fast-results',
    title: 'Fast Results',
    description:
      'Get useful results quickly without complicated steps.',
  },
  {
    id: 'free-access',
    title: 'Free Access',
    description:
      'Access helpful everyday tools without unnecessary barriers.',
  },
  {
    id: 'simple-experience',
    title: 'Simple Experience',
    description:
      'A clean interface that works across desktop, tablet and mobile devices.',
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Choose a Tool',
    description: 'Find the tool that matches your task.',
  },
  {
    step: '02',
    title: 'Enter Your Information',
    description: 'Type, paste text, or enter values into the tool.',
  },
  {
    step: '03',
    title: 'Get Your Result',
    description: 'Get your result and copy or download it where supported.',
  },
] as const;

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
      'Yes. All 22 online utilities and all practical guides on TooloraHub are completely free to access without subscriptions, paywalls, or account registration.',
  },
  {
    id: 'download-install',
    question: 'Do I need to download or install anything?',
    answer:
      'No installation is needed. Every TooloraHub utility runs directly inside your web browser, so you can open a tool and start working immediately.',
  },
  {
    id: 'mobile-support',
    question: 'Can I use TooloraHub on mobile?',
    answer:
      'Yes. TooloraHub is designed with responsive layouts, readable typography, and touch-friendly controls so every tool and guide works smoothly on Android phones, iPhones, tablets, laptops, and desktop monitors.',
  },
  {
    id: 'find-right-tool',
    question: 'How do I find the right tool?',
    answer:
      'You can use the search bar in the hero section, open the quick search button in the header, or visit the All Tools directory to filter utilities across Text & Writing, Web & Internet, Everyday Calculators, and File & Productivity.',
  },
  {
    id: 'who-develops',
    question: 'Who develops and maintains TooloraHub?',
    answer:
      'TooloraHub is developed and maintained by Muhammad Subhan, a web developer with six years of experience building practical web interfaces, digital utilities, and modern web applications.',
  },
  {
    id: 'contact-developer',
    question: 'How can I contact the developer?',
    answer:
      'You can reach Muhammad Subhan directly via email at subhanrajput3222@gmail.com, by phone at 03157867445, or through the Contact Us page to share feedback, report an issue, or suggest a new tool.',
  },
  {
    id: 'offers-guides',
    question: 'Does TooloraHub offer guides as well as tools?',
    answer:
      'Yes. Alongside the 22 interactive utilities, the Guides section publishes practical, easy-to-follow articles covering writing clarity, web formatting basics, everyday math calculations, and digital productivity workflows.',
  },
];
