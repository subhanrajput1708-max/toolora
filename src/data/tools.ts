export type ToolCategoryId =
  | 'text-writing'
  | 'web-internet'
  | 'everyday-calculators'
  | 'file-productivity';

export interface ToolCategory {
  id: ToolCategoryId;
  name: string;
  shortName: string;
  description: string;
  toolCount: number;
}

export interface ToolItem {
  id: string;
  slug: string;
  path: string;
  name: string;
  popularOrder?: number;
  categoryId: ToolCategoryId;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  howToUse: string[];
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'text-writing',
    name: 'Text & Writing Tools',
    shortName: 'Text & Writing',
    description: 'Word counting, text formatting, cleaning and text analysis.',
    toolCount: 8,
  },
  {
    id: 'web-internet',
    name: 'Web & Internet Tools',
    shortName: 'Web & Internet',
    description: 'URLs, encoding, HTML entities and web-related utilities.',
    toolCount: 4,
  },
  {
    id: 'everyday-calculators',
    name: 'Everyday Calculators',
    shortName: 'Calculators',
    description: 'Simple calculations, percentages, dates, age and unit conversions.',
    toolCount: 6,
  },
  {
    id: 'file-productivity',
    name: 'File & Productivity Tools',
    shortName: 'File & Productivity',
    description: 'Writing utilities, reading-time estimates and productivity helpers.',
    toolCount: 4,
  },
];

export const ALL_TOOLS: ToolItem[] = [
  // Text & Writing (8)
  {
    id: 'word-counter',
    slug: 'word-counter',
    path: '/tools/word-counter/',
    name: 'Word Counter',
    popularOrder: 1,
    categoryId: 'text-writing',
    shortDescription:
      'Count words, characters, sentences, paragraphs, and estimated reading time as you type.',
    metaTitle: 'Word Counter — Free Online Word & Character Count Tool | TooloraHub',
    metaDescription:
      'Count words, characters with and without spaces, sentences, paragraphs, and reading time instantly in your browser with TooloraHub.',
    keywords: ['word count', 'words', 'characters', 'writing', 'essay', 'reading time'],
    howToUse: [
      'Type or paste your text into the editor box.',
      'Review live counts for words, characters, sentences, paragraphs, and lines.',
      'Copy the summary statistics or clear the editor to check another draft.',
    ],
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    path: '/tools/case-converter/',
    name: 'Case Converter',
    popularOrder: 3,
    categoryId: 'text-writing',
    shortDescription:
      'Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, and snake_case.',
    metaTitle: 'Case Converter — Change Text Capitalization Online | TooloraHub',
    metaDescription:
      'Transform text between uppercase, lowercase, title case, sentence case, camelCase, snake_case, and kebab-case in one click.',
    keywords: ['uppercase', 'lowercase', 'title case', 'sentence case', 'camelCase', 'capitalize'],
    howToUse: [
      'Paste or type the text you want to reformat.',
      'Select any capitalization format such as Title Case, Sentence case, or UPPERCASE.',
      'Copy the converted text directly to your clipboard.',
    ],
  },
  {
    id: 'text-cleaner',
    slug: 'text-cleaner',
    path: '/tools/text-cleaner/',
    name: 'Text Cleaner',
    popularOrder: 2,
    categoryId: 'text-writing',
    shortDescription:
      'Remove extra spaces, blank lines, HTML tags, and messy formatting from copied text.',
    metaTitle: 'Text Cleaner — Remove Extra Spaces & Line Breaks | TooloraHub',
    metaDescription:
      'Clean up copied text by removing extra spaces, blank lines, HTML tags, and inconsistent whitespace using TooloraHub.',
    keywords: ['clean text', 'remove spaces', 'strip html', 'whitespace', 'format'],
    howToUse: [
      'Paste messy text copied from PDFs, emails, or web pages.',
      'Choose the cleanup options you need, such as collapsing spaces or stripping HTML tags.',
      'Copy the clean result or apply it back into the input area.',
    ],
  },
  {
    id: 'duplicate-line-remover',
    slug: 'duplicate-line-remover',
    path: '/tools/duplicate-line-remover/',
    name: 'Duplicate Line Remover',
    categoryId: 'text-writing',
    shortDescription:
      'Filter out repeated lines from lists, logs, or CSV snippets with optional sorting.',
    metaTitle: 'Duplicate Line Remover — Remove Repeated Lines Online | TooloraHub',
    metaDescription:
      'Remove duplicate lines from lists and text documents with case-sensitivity, trimming, and sorting controls.',
    keywords: ['deduplicate', 'unique lines', 'remove duplicates', 'list cleaner'],
    howToUse: [
      'Paste your list with one item per line.',
      'Toggle case sensitivity, whitespace trimming, or alphabetical sorting.',
      'Copy the deduplicated output or download it as a .txt file.',
    ],
  },
  {
    id: 'character-counter',
    slug: 'character-counter',
    path: '/tools/character-counter/',
    name: 'Character Counter',
    categoryId: 'text-writing',
    shortDescription:
      'Inspect total characters, letters, digits, UTF-8 byte size, and social/SEO length limits.',
    metaTitle: 'Character Counter — Check Character & Byte Limits | TooloraHub',
    metaDescription:
      'Check exact character counts, characters without spaces, UTF-8 bytes, and common SEO or social media length limits.',
    keywords: ['character count', 'letters', 'meta description length', 'sms limit', 'bytes'],
    howToUse: [
      'Enter headlines, meta descriptions, or social posts into the text box.',
      'Check total characters, non-space characters, digits, and UTF-8 bytes.',
      'Compare your text length against common SEO title, meta description, and post limits.',
    ],
  },
  {
    id: 'text-diff-checker',
    slug: 'text-diff-checker',
    path: '/tools/text-diff-checker/',
    name: 'Text Diff Checker',
    categoryId: 'text-writing',
    shortDescription:
      'Compare two versions of text line by line to spot additions, removals, and edits.',
    metaTitle: 'Text Diff Checker — Compare Two Texts Online | TooloraHub',
    metaDescription:
      'Compare original and updated text side by side or line by line to highlight added, removed, and unchanged lines.',
    keywords: ['diff', 'compare text', 'text difference', 'changes'],
    howToUse: [
      'Paste the original text on the left and the revised text on the right.',
      'Adjust comparison options such as ignoring case or trimming extra spaces.',
      'Review highlighted additions and deletions line by line.',
    ],
  },
  {
    id: 'line-counter',
    slug: 'line-counter',
    path: '/tools/line-counter/',
    name: 'Line Counter',
    categoryId: 'text-writing',
    shortDescription:
      'Count total lines, non-empty lines, blank lines, and view numbered line breakdowns.',
    metaTitle: 'Line Counter — Count Total & Non-Empty Lines | TooloraHub',
    metaDescription:
      'Count total lines, non-blank lines, empty lines, and average line length with an optional line-numbered view.',
    keywords: ['line count', 'lines', 'non-empty lines', 'numbered lines'],
    howToUse: [
      'Paste multi-line text, notes, or structured lists into the input box.',
      'Inspect total lines, populated lines, blank lines, and longest line length.',
      'Toggle numbered preview to inspect individual line numbers.',
    ],
  },
  {
    id: 'word-frequency-counter',
    slug: 'word-frequency-counter',
    path: '/tools/word-frequency-counter/',
    name: 'Word Frequency Counter',
    categoryId: 'text-writing',
    shortDescription:
      'Analyze how often each word appears in your text with share percentages and CSV export.',
    metaTitle: 'Word Frequency Counter — Word Occurrence & Density Tool | TooloraHub',
    metaDescription:
      'See the most frequently used words in any passage, filter out common stop words, and export results to CSV.',
    keywords: ['word frequency', 'keyword density', 'occurrences', 'csv'],
    howToUse: [
      'Paste an article, essay, or transcript into the text editor.',
      'Optionally hide common stop words or set a minimum word length.',
      'Sort the frequency table or export the breakdown as CSV.',
    ],
  },

  // Web & Internet (4)
  {
    id: 'slug-generator',
    slug: 'slug-generator',
    path: '/tools/slug-generator/',
    name: 'Slug Generator',
    popularOrder: 8,
    categoryId: 'web-internet',
    shortDescription:
      'Turn article titles and page names into clean, readable, URL-friendly slugs.',
    metaTitle: 'URL Slug Generator — Clean SEO-Friendly Slugs | TooloraHub',
    metaDescription:
      'Convert titles and phrases into clean URL slugs with custom separators, stop-word removal, and live URL preview.',
    keywords: ['url slug', 'permalink', 'seo url', 'hyphenate'],
    howToUse: [
      'Type or paste a page title or article headline.',
      'Choose hyphen or underscore separators and optional stop-word removal.',
      'Copy the generated URL slug for your website or CMS.',
    ],
  },
  {
    id: 'url-encoder-decoder',
    slug: 'url-encoder-decoder',
    path: '/tools/url-encoder-decoder/',
    name: 'URL Encoder/Decoder',
    categoryId: 'web-internet',
    shortDescription:
      'Encode special characters for safe URLs or decode percent-encoded links and query strings.',
    metaTitle: 'URL Encoder & Decoder — Percent-Encode & Parse URLs | TooloraHub',
    metaDescription:
      'Encode or decode URL components and full URLs cleanly, and inspect query parameters in a structured breakdown.',
    keywords: ['url encode', 'url decode', 'percent encoding', 'query string'],
    howToUse: [
      'Choose Encode or Decode mode and select component or full-URL handling.',
      'Enter your plain text, query value, or encoded URL.',
      'Copy the output or inspect parsed query parameters below.',
    ],
  },
  {
    id: 'html-entity-converter',
    slug: 'html-entity-converter',
    path: '/tools/html-entity-converter/',
    name: 'HTML Entity Converter',
    categoryId: 'web-internet',
    shortDescription:
      'Escape HTML reserved characters into safe entities or decode HTML entities back to text.',
    metaTitle: 'HTML Entity Converter — Encode & Decode HTML Entities | TooloraHub',
    metaDescription:
      'Convert <, >, &, quotes, and symbols to HTML entities or decode HTML entity strings back into readable plain text.',
    keywords: ['html entities', 'escape html', 'decode html', 'ampersand'],
    howToUse: [
      'Select Encode to escape HTML characters or Decode to convert entities back to text.',
      'Paste your HTML snippet or entity-encoded string.',
      'Copy the converted output with one click.',
    ],
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    path: '/tools/qr-code-generator/',
    name: 'QR Code Generator',
    popularOrder: 4,
    categoryId: 'web-internet',
    shortDescription:
      'Create scannable QR codes for links, Wi-Fi notes, or text and download as PNG or SVG.',
    metaTitle: 'QR Code Generator — Create & Download PNG/SVG QR Codes | TooloraHub',
    metaDescription:
      'Generate crisp QR codes for URLs, contact links, or plain text with custom colors, error correction, and PNG or SVG download.',
    keywords: ['qr code', 'barcode', 'png', 'svg', 'link qr'],
    howToUse: [
      'Enter a website URL, email address, or short text message.',
      'Customize QR size, foreground/background colors, and error correction level.',
      'Download the crisp QR code directly as a PNG or SVG file.',
    ],
  },

  // Everyday Calculators (6)
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    path: '/tools/percentage-calculator/',
    name: 'Percentage Calculator',
    popularOrder: 5,
    categoryId: 'everyday-calculators',
    shortDescription:
      'Calculate percentages of numbers, percentage shares, and percentage increase or decrease.',
    metaTitle: 'Percentage Calculator — Three Everyday Percent Modes | TooloraHub',
    metaDescription:
      'Solve everyday percentage problems quickly: find X% of Y, what percent X is of Y, and percentage change between two values.',
    keywords: ['percentage', 'percent change', 'percent increase', 'ratio'],
    howToUse: [
      'Pick the calculation mode that fits your question.',
      'Enter your numbers into the labeled fields.',
      'Read the result and step-by-step formula breakdown immediately.',
    ],
  },
  {
    id: 'discount-calculator',
    slug: 'discount-calculator',
    path: '/tools/discount-calculator/',
    name: 'Discount Calculator',
    categoryId: 'everyday-calculators',
    shortDescription:
      'Find sale prices, total savings, and optional sales tax from any percentage discount.',
    metaTitle: 'Discount Calculator — Sale Price & Savings Calculator | TooloraHub',
    metaDescription:
      'Calculate discounted prices, exact money saved, and optional tax amounts across multiple currencies in seconds.',
    keywords: ['discount', 'sale price', 'savings', 'markdown', 'tax'],
    howToUse: [
      'Enter the original price and discount percentage.',
      'Optionally add a sales tax percentage and pick your preferred currency symbol.',
      'View the savings amount, discounted subtotal, and final price.',
    ],
  },
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    path: '/tools/age-calculator/',
    name: 'Age Calculator',
    popularOrder: 6,
    categoryId: 'everyday-calculators',
    shortDescription:
      'Calculate exact age in years, months, and days plus upcoming birthday countdown.',
    metaTitle: 'Age Calculator — Exact Age in Years, Months & Days | TooloraHub',
    metaDescription:
      'Find your exact age from any birth date in years, months, weeks, and days, along with the countdown to your next birthday.',
    keywords: ['age', 'birthday', 'date of birth', 'years months days'],
    howToUse: [
      'Select your date of birth using the date picker.',
      'Keep today’s date or set a custom target date.',
      'See exact age breakdowns in years, months, weeks, days, and next birthday countdown.',
    ],
  },
  {
    id: 'date-difference-calculator',
    slug: 'date-difference-calculator',
    path: '/tools/date-difference-calculator/',
    name: 'Date Difference Calculator',
    categoryId: 'everyday-calculators',
    shortDescription:
      'Measure days, weeks, months, and weekdays between any two calendar dates.',
    metaTitle: 'Date Difference Calculator — Days & Weekdays Between Dates | TooloraHub',
    metaDescription:
      'Calculate the exact number of calendar days, weeks, months, years, and weekdays between two dates.',
    keywords: ['date difference', 'days between dates', 'weekdays', 'duration'],
    howToUse: [
      'Pick a Start Date and an End Date.',
      'Choose whether to include the end date in the total day count.',
      'View calendar duration, total days, weeks, weekdays, and weekend days.',
    ],
  },
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    path: '/tools/unit-converter/',
    name: 'Unit Converter',
    popularOrder: 7,
    categoryId: 'everyday-calculators',
    shortDescription:
      'Convert length, weight, temperature, area, volume, speed, data storage, and time units.',
    metaTitle: 'Unit Converter — Length, Weight, Temp & Data Units | TooloraHub',
    metaDescription:
      'Convert metric and imperial measurements across length, weight, temperature, area, volume, speed, data, and time.',
    keywords: ['unit converter', 'metric', 'imperial', 'celsius', 'kg to lbs', 'km to miles'],
    howToUse: [
      'Select a measurement category such as Length, Weight, or Temperature.',
      'Choose your From and To units and enter a numeric value.',
      'Use the Swap button anytime to reverse the conversion direction.',
    ],
  },
  {
    id: 'time-calculator',
    slug: 'time-calculator',
    path: '/tools/time-calculator/',
    name: 'Time Calculator',
    categoryId: 'everyday-calculators',
    shortDescription:
      'Add or subtract hours, minutes, and seconds, or find the duration between two clock times.',
    metaTitle: 'Time Calculator — Add, Subtract & Measure Time Durations | TooloraHub',
    metaDescription:
      'Add or subtract hours, minutes, and seconds or calculate the exact elapsed duration between two times of day.',
    keywords: ['time calculator', 'hours minutes', 'duration', 'elapsed time'],
    howToUse: [
      'Switch between Duration Math (add/subtract) or Time Between Clock Times.',
      'Enter your hours, minutes, and seconds or start/end times.',
      'Read the normalized duration in HH:MM:SS as well as decimal hours and total minutes.',
    ],
  },

  // File & Productivity (4)
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    path: '/tools/lorem-ipsum-generator/',
    name: 'Lorem Ipsum Generator',
    categoryId: 'file-productivity',
    shortDescription:
      'Generate clean placeholder paragraphs, sentences, or words in plain text or HTML.',
    metaTitle: 'Lorem Ipsum Generator — Placeholder Text in Text or HTML | TooloraHub',
    metaDescription:
      'Generate custom counts of placeholder paragraphs, sentences, or words with optional HTML <p> tags for layouts and prototypes.',
    keywords: ['lorem ipsum', 'placeholder text', 'dummy text', 'paragraphs'],
    howToUse: [
      'Choose whether to generate paragraphs, sentences, or words and set the quantity.',
      'Toggle HTML <p> tags or the classic opening sentence if needed.',
      'Copy the placeholder text or download it as a .txt file.',
    ],
  },
  {
    id: 'reading-time-calculator',
    slug: 'reading-time-calculator',
    path: '/tools/reading-time-calculator/',
    name: 'Reading Time Calculator',
    categoryId: 'file-productivity',
    shortDescription:
      'Estimate article reading and speech duration based on customizable words-per-minute speeds.',
    metaTitle: 'Reading Time Calculator — Estimate Reading & Speaking Time | TooloraHub',
    metaDescription:
      'Calculate reading time and presentation speaking time for blog posts, speeches, and scripts at slow, average, or custom WPM speeds.',
    keywords: ['reading time', 'wpm', 'speaking time', 'read time'],
    howToUse: [
      'Paste your article, script, or newsletter draft.',
      'Select a reading pace preset (150, 200, or 260 WPM) or set a custom WPM.',
      'Copy the formatted reading and speaking time summary.',
    ],
  },
  {
    id: 'text-reverser',
    slug: 'text-reverser',
    path: '/tools/text-reverser/',
    name: 'Text Reverser',
    categoryId: 'file-productivity',
    shortDescription:
      'Reverse characters, reverse word order, flip letters per word, or reverse line sequences.',
    metaTitle: 'Text Reverser — Reverse Characters, Words & Lines | TooloraHub',
    metaDescription:
      'Reverse entire text strings, word order, letters within words, or line order instantly in your browser.',
    keywords: ['reverse text', 'backwards text', 'flip lines', 'reverse words'],
    howToUse: [
      'Enter or paste your text in the input box.',
      'Select character, word-order, per-word, or line-order reversal.',
      'Copy the reversed output or swap it back into the editor.',
    ],
  },
  {
    id: 'gradient-generator',
    slug: 'gradient-generator',
    path: '/tools/gradient-generator/',
    name: 'Gradient Generator',
    categoryId: 'file-productivity',
    shortDescription:
      'Build linear or radial CSS gradients with custom color stops, angles, CSS copy, and PNG export.',
    metaTitle: 'CSS Gradient Generator — Build Gradients & Export PNG | TooloraHub',
    metaDescription:
      'Design linear and radial CSS gradients with customizable color stops and angles, copy clean CSS code, or download a PNG image.',
    keywords: ['css gradient', 'linear gradient', 'radial gradient', 'color stops'],
    howToUse: [
      'Choose Linear or Radial mode and adjust the gradient angle or presets.',
      'Edit color stops, drag stop positions, or add extra colors.',
      'Copy the generated CSS background rule or download a PNG swatch.',
    ],
  },
];

export const POPULAR_TOOLS: ToolItem[] = ALL_TOOLS.filter(
  (tool) => typeof tool.popularOrder === 'number'
).sort((a, b) => (a.popularOrder ?? 99) - (b.popularOrder ?? 99));

export function getToolBySlug(slug: string): ToolItem | undefined {
  return ALL_TOOLS.find((tool) => tool.slug === slug);
}

export function getCategoryById(id: ToolCategoryId): ToolCategory {
  return TOOL_CATEGORIES.find((c) => c.id === id) ?? TOOL_CATEGORIES[0];
}
