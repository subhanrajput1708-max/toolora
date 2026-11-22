import { SITE_CONFIG } from './site.ts';
import { ALL_TOOLS, TOOL_CATEGORIES, type ToolCategoryId, type ToolItem } from './tools.ts';
import { TOOL_DETAILS } from './toolDetails.ts';

export const TOOLORA_ASSISTANT_NAME = 'Toolora Assistant';
export const TOOLORA_ASSISTANT_SUBTITLE =
  "Your smart guide to finding and using TooloraHub's free online tools.";

export const TOOLORA_ASSISTANT_GREETING = `Hi! Welcome to TooloraHub 👋 I'm ${TOOLORA_ASSISTANT_NAME}, your smart guide to finding and using all ${ALL_TOOLS.length} free online tools. Ask me what you want to calculate, convert, edit, or organize—or pick a quick question below.`;

export const TOOLORA_SUGGESTED_QUESTIONS: readonly string[] = [
  'Show me all available tools',
  'Find a calculator',
  'What text tools do you have?',
  'I need to convert units',
  'Help me find the right tool',
];

export interface WebsitePageKnowledge {
  title: string;
  path: string;
  purpose: string;
}

export const WEBSITE_PAGES_KB: readonly WebsitePageKnowledge[] = [
  {
    title: 'Home',
    path: '/',
    purpose:
      'Homepage featuring quick search, Featured Tools, Popular Tools, interactive Explore All Tools filters, Tool Categories, and FAQs.',
  },
  {
    title: 'Tools Directory',
    path: '/tools/',
    purpose: `Complete searchable, filterable, and sortable directory of all ${ALL_TOOLS.length} free online tools across ${TOOL_CATEGORIES.length} categories.`,
  },
  {
    title: 'About Us',
    path: '/about/',
    purpose: `Explains TooloraHub's mission, ${TOOL_CATEGORIES.length} tool categories, local browser execution, and developer ${SITE_CONFIG.developer.name} (${SITE_CONFIG.developer.experience}).`,
  },
  {
    title: 'Contact Us',
    path: '/contact/',
    purpose:
      'Allows visitors to suggest tools, report bugs, or contact the developer via the validated email-draft form, email, or phone.',
  },
  {
    title: 'Sitemap',
    path: '/sitemap/',
    purpose: `HTML sitemap listing all core pages, legal policies, XML sitemap link, and all ${ALL_TOOLS.length} utilities grouped by category.`,
  },
  {
    title: 'Privacy Policy',
    path: '/privacy-policy/',
    purpose: `Explains how all ${ALL_TOOLS.length} tools and ${TOOLORA_ASSISTANT_NAME} run locally inside your browser without accounts or external AI APIs.`,
  },
  {
    title: 'Terms & Conditions',
    path: '/terms-and-conditions/',
    purpose:
      'Covers permitted free personal and business use, user responsibilities, accuracy limits, and intellectual property.',
  },
  {
    title: 'Disclaimer',
    path: '/disclaimer/',
    purpose:
      'Explains general informational use, calculator/BMI/finance/text-parsing limits, and user responsibility to verify final outputs.',
  },
];

interface ToolEnrichmentMeta {
  purpose: string;
  synonyms: string[];
  relatedSlugs: string[];
}

const TOOL_ENRICHMENT_META: Record<string, ToolEnrichmentMeta> = {
  'word-counter': {
    purpose:
      'Count words, characters (with and without spaces), sentences, paragraphs, lines, and estimated reading or speaking time as you type.',
    synonyms: [
      'count words',
      'counts words',
      'word count',
      'how many words',
      'essay counter',
      'check word length',
    ],
    relatedSlugs: ['character-counter', 'reading-time-calculator', 'word-frequency-counter'],
  },
  'case-converter': {
    purpose:
      'Convert text between Sentence case, lowercase, UPPERCASE, Title Case, camelCase, PascalCase, snake_case, kebab-case, and alternating case.',
    synonyms: [
      'capitalize',
      'all caps',
      'uppercase',
      'lowercase',
      'title case',
      'sentence case',
      'camelcase',
      'snake case',
    ],
    relatedSlugs: ['slug-generator', 'text-cleaner', 'word-counter'],
  },
  'text-cleaner': {
    purpose:
      'Clean up messy copied text by collapsing extra spaces, removing blank lines, stripping HTML tags, and normalizing smart quotes.',
    synonyms: [
      'clean text',
      'clean this text',
      'cleans text',
      'remove spaces',
      'extra spaces',
      'whitespace',
      'strip html',
      'fix copied text',
    ],
    relatedSlugs: ['line-break-formatter', 'html-entity-converter', 'duplicate-line-remover'],
  },
  'duplicate-line-remover': {
    purpose:
      'Filter out repeated lines from lists, tags, CSV snippets, or logs with optional trimming, case matching, and sorting.',
    synonyms: [
      'remove duplicates',
      'deduplicate',
      'unique lines',
      'repeated lines',
      'delete duplicate rows',
    ],
    relatedSlugs: ['list-sorter-randomizer', 'line-counter', 'text-diff-checker'],
  },
  'character-counter': {
    purpose:
      'Measure exact character length with and without spaces, letters, digits, punctuation, UTF-8 bytes, and common social/SEO limits (60/160/280).',
    synonyms: [
      'count characters',
      'character limit',
      'char count',
      'tweet length',
      'meta description length',
      'letter count',
    ],
    relatedSlugs: ['word-counter', 'reading-time-calculator', 'slug-generator'],
  },
  'text-diff-checker': {
    purpose:
      'Compare two versions of text side-by-side to highlight added, removed, and unchanged lines with line numbers.',
    synonyms: [
      'compare text',
      'text difference',
      'diff tool',
      'find changes between texts',
      'compare drafts',
    ],
    relatedSlugs: ['line-counter', 'duplicate-line-remover', 'text-cleaner'],
  },
  'line-counter': {
    purpose:
      'Count total lines, non-empty lines, blank lines, longest line length, and average words per line with a numbered preview.',
    synonyms: ['count lines', 'how many lines', 'line count', 'blank lines'],
    relatedSlugs: ['duplicate-line-remover', 'line-break-formatter', 'text-diff-checker'],
  },
  'word-frequency-counter': {
    purpose:
      'Analyze how often each word appears in an article or transcript, inspect percentage share, and export a ranked CSV.',
    synonyms: [
      'word frequency',
      'most repeated words',
      'keyword density',
      'word occurrence',
      'count repeated words',
    ],
    relatedSlugs: ['word-counter', 'reading-time-calculator', 'character-counter'],
  },
  'lorem-ipsum-generator': {
    purpose:
      'Generate custom quantities of Lorem Ipsum placeholder paragraphs, sentences, or words with optional HTML <p> wrapping.',
    synonyms: ['lorem ipsum', 'dummy text', 'placeholder text', 'sample text', 'filler copy'],
    relatedSlugs: ['word-counter', 'character-counter', 'html-entity-converter'],
  },
  'text-reverser': {
    purpose:
      'Reverse characters, flip word order, reverse letters inside each word, or reverse multi-line order instantly.',
    synonyms: ['reverse text', 'backwards text', 'flip text', 'invert string'],
    relatedSlugs: ['case-converter', 'line-counter', 'text-cleaner'],
  },
  'line-break-formatter': {
    purpose:
      'Remove unwanted line wraps, join single breaks inside paragraphs, normalize spacing, or wrap lines at a chosen width.',
    synonyms: [
      'remove line breaks',
      'fix line wraps',
      'pdf line breaks',
      'join lines',
      'newlines',
      'wrap text',
    ],
    relatedSlugs: ['text-cleaner', 'notes-formatter', 'line-counter'],
  },
  'list-sorter-randomizer': {
    purpose:
      'Sort lists alphabetically or numerically (ascending or descending), reverse items, or randomly shuffle lines with Web Crypto randomness.',
    synonyms: [
      'sort list',
      'alphabetize',
      'shuffle list',
      'randomize list',
      'random picker',
      'order lines',
    ],
    relatedSlugs: ['duplicate-line-remover', 'random-number-generator', 'notes-formatter'],
  },
  'percentage-calculator': {
    purpose:
      'Find X% of Y, determine what percentage X is of Y, and calculate percentage increases or decreases between two numbers.',
    synonyms: [
      'percent',
      'percentages',
      'calculate percent',
      'percentage increase',
      'percentage decrease',
      'percent of',
      '%',
    ],
    relatedSlugs: ['discount-calculator', 'fraction-percentage-converter', 'profit-margin-calculator'],
  },
  'reading-time-calculator': {
    purpose:
      'Estimate how many minutes an article takes to read at slow, average, or fast WPM speeds alongside 130 WPM speaking time.',
    synonyms: ['reading time', 'read time', 'speaking time', 'speech length', 'min read'],
    relatedSlugs: ['word-counter', 'character-counter', 'word-frequency-counter'],
  },
  'average-calculator': {
    purpose:
      'Compute arithmetic mean, median, mode, sum, count, min, max, and range from any list of numbers.',
    synonyms: ['average', 'mean', 'median', 'mode', 'calculate average', 'sum and mean'],
    relatedSlugs: ['percentage-calculator', 'fraction-percentage-converter', 'ratio-calculator'],
  },
  'ratio-calculator': {
    purpose:
      'Simplify A:B ratios to lowest terms and solve missing values in proportional equations (A:B = C:D).',
    synonyms: ['ratio', 'proportion', 'aspect ratio', 'simplify ratio', 'scale ratio'],
    relatedSlugs: ['fraction-percentage-converter', 'percentage-calculator', 'average-calculator'],
  },
  'fraction-percentage-converter': {
    purpose:
      'Convert seamlessly between simplified fractions, mixed numbers, decimals, and percentages.',
    synonyms: ['fraction', 'decimal to fraction', 'fraction to percent', 'simplify fraction'],
    relatedSlugs: ['percentage-calculator', 'ratio-calculator', 'average-calculator'],
  },
  'bmi-calculator': {
    purpose:
      'Calculate Body Mass Index (BMI) in Metric or US Imperial units and view standard WHO adult reference ranges.',
    synonyms: ['bmi', 'body mass index', 'weight height health', 'healthy weight'],
    relatedSlugs: ['unit-converter', 'weight-converter', 'length-converter'],
  },
  'fuel-trip-cost-calculator': {
    purpose:
      'Estimate fuel volume, total fuel cost, and cost per passenger for one-way or round trips using L/100km or MPG.',
    synonyms: ['fuel cost', 'gas cost', 'trip cost', 'petrol calculator', 'mileage cost', 'road trip'],
    relatedSlugs: ['unit-converter', 'discount-calculator', 'tip-calculator'],
  },
  'discount-calculator': {
    purpose:
      'Calculate sale price, amount saved, and optional sales tax after applying a percentage discount.',
    synonyms: ['discount', 'sale price', 'percent off', 'coupon savings', 'calculate discount'],
    relatedSlugs: ['percentage-calculator', 'tip-calculator', 'profit-margin-calculator'],
  },
  'tip-calculator': {
    purpose:
      'Calculate gratuity amounts and split restaurant or service bills cleanly per person with optional rounding.',
    synonyms: ['tip', 'gratuity', 'split bill', 'restaurant bill', 'service tip'],
    relatedSlugs: ['discount-calculator', 'percentage-calculator', 'average-calculator'],
  },
  'loan-emi-calculator': {
    purpose:
      'Estimate monthly loan EMI payments, total interest payable, total cost, and a year-by-year payoff summary.',
    synonyms: [
      'loan',
      'emi',
      'loan payment',
      'loan payments',
      'monthly payment',
      'mortgage',
      'car loan',
      'installment',
    ],
    relatedSlugs: ['compound-interest-calculator', 'profit-margin-calculator', 'percentage-calculator'],
  },
  'compound-interest-calculator': {
    purpose:
      'Project savings or investment growth with recurring monthly contributions and compare compound vs. simple interest.',
    synonyms: ['compound interest', 'investment growth', 'savings calculator', 'apy', 'interest growth'],
    relatedSlugs: ['loan-emi-calculator', 'profit-margin-calculator', 'percentage-calculator'],
  },
  'profit-margin-calculator': {
    purpose:
      'Calculate gross profit, gross profit margin %, markup %, and recommended selling price from cost and target margins.',
    synonyms: ['profit margin', 'gross margin', 'markup', 'selling price', 'business profit'],
    relatedSlugs: ['discount-calculator', 'percentage-calculator', 'loan-emi-calculator'],
  },
  'age-calculator': {
    purpose:
      'Find exact age in years, months, and days plus total weeks/days lived, birth weekday, and next birthday countdown.',
    synonyms: ['age', 'calculate my age', 'how old', 'birthday', 'date of birth', 'dob'],
    relatedSlugs: ['date-difference-calculator', 'add-days-to-date', 'week-number-calculator'],
  },
  'date-difference-calculator': {
    purpose:
      'Measure total days, weeks, calendar years/months/days, Mon–Fri business days, and weekend days between two dates.',
    synonyms: ['date difference', 'days between dates', 'working days', 'business days', 'date span'],
    relatedSlugs: ['add-days-to-date', 'age-calculator', 'week-number-calculator'],
  },
  'time-calculator': {
    purpose:
      'Add or subtract HH:MM:SS durations and calculate elapsed hours and minutes between two clock times.',
    synonyms: ['time calculator', 'add hours', 'subtract time', 'duration math', 'hours worked'],
    relatedSlugs: ['date-difference-calculator', 'stopwatch', 'countdown-timer'],
  },
  'add-days-to-date': {
    purpose:
      'Add or subtract calendar days, weeks, months, years, or Mon–Fri business days from any start date.',
    synonyms: ['add days', 'subtract days', 'future date', 'deadline date', 'days from today'],
    relatedSlugs: ['date-difference-calculator', 'week-number-calculator', 'age-calculator'],
  },
  'week-number-calculator': {
    purpose:
      'Look up ISO-8601 week numbers (1–53), Monday–Sunday date spans, day of year, and quarter for any date.',
    synonyms: ['week number', 'iso week', 'what week of the year', 'calendar week'],
    relatedSlugs: ['date-difference-calculator', 'add-days-to-date', 'age-calculator'],
  },
  'countdown-timer': {
    purpose:
      'Run a drift-free browser countdown timer with quick presets, pause/resume controls, +1m boost, and optional audio alert.',
    synonyms: ['countdown', 'timer', 'alarm timer', 'minute timer'],
    relatedSlugs: ['pomodoro-timer', 'stopwatch', 'time-calculator'],
  },
  'unit-converter': {
    purpose:
      'Convert values across 8 everyday categories including Length, Weight, Temperature, Area, Volume, Speed, Data Storage, and Time.',
    synonyms: ['unit converter', 'convert units', 'measurement converter', 'metric to imperial'],
    relatedSlugs: ['length-converter', 'weight-converter', 'temperature-converter'],
  },
  'length-converter': {
    purpose:
      'Convert any distance instantly across 9 metric, imperial, and nautical units simultaneously (mm, cm, m, km, in, ft, yd, mi, nmi).',
    synonyms: ['length', 'distance', 'meters to feet', 'cm to inches', 'km to miles', 'height'],
    relatedSlugs: ['weight-converter', 'unit-converter', 'temperature-converter'],
  },
  'weight-converter': {
    purpose:
      'Convert mass and weight across 7 metric and imperial units at once (mg, g, kg, metric tons, oz, lbs, stone).',
    synonyms: ['weight', 'mass', 'kilograms to pounds', 'kg to lbs', 'pounds to kg', 'ounces to grams'],
    relatedSlugs: ['length-converter', 'bmi-calculator', 'unit-converter'],
  },
  'temperature-converter': {
    purpose:
      'Convert Celsius (°C), Fahrenheit (°F), and Kelvin (K) simultaneously with live formulas and reference points.',
    synonyms: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'c to f', 'f to c', 'heat'],
    relatedSlugs: ['unit-converter', 'length-converter', 'weight-converter'],
  },
  'data-storage-converter': {
    purpose:
      'Convert bits, bytes, KB, MB, GB, TB, and PB using either Binary (1024) or Decimal SI (1000) standards.',
    synonyms: ['data storage', 'mb to gb', 'gb to tb', 'bytes', 'file size', 'bandwidth size'],
    relatedSlugs: ['number-base-converter', 'unit-converter', 'json-formatter-validator'],
  },
  'color-converter': {
    purpose:
      'Convert colors between HEX, RGB, and HSL, inspect a live swatch, copy CSS strings, and check WCAG contrast against light and dark backgrounds.',
    synonyms: ['color', 'colour', 'hex to rgb', 'rgb to hsl', 'wcag contrast', 'color picker'],
    relatedSlugs: ['gradient-generator', 'qr-code-generator', 'number-base-converter'],
  },
  'number-base-converter': {
    purpose:
      'Convert integers of arbitrary length across Binary (base 2), Octal (base 8), Decimal (base 10), and Hexadecimal (base 16).',
    synonyms: ['number base', 'binary', 'octal', 'decimal to binary', 'hexadecimal', 'base 16'],
    relatedSlugs: ['data-storage-converter', 'color-converter', 'json-formatter-validator'],
  },
  'pomodoro-timer': {
    purpose:
      'Structure focused study or work intervals (25/5/15 min customizable) with session tracking and optional chime notifications.',
    synonyms: ['pomodoro', 'focus timer', 'study timer', 'work timer', 'productive timer'],
    relatedSlugs: ['countdown-timer', 'stopwatch', 'simple-task-planner'],
  },
  'stopwatch': {
    purpose:
      'Measure elapsed time to centisecond precision with instant lap recording and fastest/slowest split highlights.',
    synonyms: ['stopwatch', 'lap timer', 'chronometer', 'measure time'],
    relatedSlugs: ['countdown-timer', 'pomodoro-timer', 'time-calculator'],
  },
  'checklist-maker': {
    purpose:
      'Build interactive to-do checklists, paste bulk items, track completion progress, and copy Markdown tasks or export .txt.',
    synonyms: ['checklist', 'todo list', 'to-do list', 'check list', 'packing list'],
    relatedSlugs: ['simple-task-planner', 'notes-formatter', 'duplicate-line-remover'],
  },
  'simple-task-planner': {
    purpose:
      'Organize tasks with High, Medium, and Low priorities, filter by status, sort by priority, and export clean task plans.',
    synonyms: ['task planner', 'daily planner', 'priority list', 'manage tasks'],
    relatedSlugs: ['checklist-maker', 'pomodoro-timer', 'notes-formatter'],
  },
  'notes-formatter': {
    purpose:
      'Transform rough notes or transcripts into clean Markdown bullets, numbered lists, checklists, blockquotes, or neat paragraphs.',
    synonyms: ['notes formatter', 'format notes', 'meeting notes', 'markdown list', 'bullet list'],
    relatedSlugs: ['line-break-formatter', 'checklist-maker', 'text-cleaner'],
  },
  'random-number-generator': {
    purpose:
      'Generate cryptographically unbiased random integers inside any custom range with unique-pick, sorting, and dice/coin presets.',
    synonyms: ['random number', 'rng', 'dice roll', 'coin flip', 'lucky number', 'lottery'],
    relatedSlugs: ['list-sorter-randomizer', 'password-generator', 'average-calculator'],
  },
  'slug-generator': {
    purpose:
      'Turn article titles or product names into clean lowercase SEO-friendly URL slugs with hyphen or underscore separators.',
    synonyms: ['slug', 'url slug', 'permalink', 'seo url', 'clean url'],
    relatedSlugs: ['url-encoder-decoder', 'case-converter', 'character-counter'],
  },
  'url-encoder-decoder': {
    purpose:
      'Encode or decode URL query parameters and inspect parsed query string key-value tables safely in the browser.',
    synonyms: ['url encode', 'url decode', 'percent encoding', 'query string', 'escape url'],
    relatedSlugs: ['slug-generator', 'html-entity-converter', 'qr-code-generator'],
  },
  'html-entity-converter': {
    purpose:
      'Escape HTML special characters into entities or decode HTML entities back into readable plain text.',
    synonyms: ['html entities', 'escape html', 'decode html', 'html encode', 'ampersand escape'],
    relatedSlugs: ['url-encoder-decoder', 'text-cleaner', 'json-formatter-validator'],
  },
  'qr-code-generator': {
    purpose:
      'Create custom QR codes for links, text, or contact info and download crisp PNG or scalable SVG files.',
    synonyms: ['qr code', 'qr generator', 'barcode', 'scan code', 'link qr'],
    relatedSlugs: ['url-encoder-decoder', 'color-converter', 'slug-generator'],
  },
  'gradient-generator': {
    purpose:
      'Design linear or radial CSS gradients with custom color stops and angles, copy CSS rules, and export PNG swatches.',
    synonyms: ['gradient', 'css gradient', 'linear gradient', 'radial gradient', 'background css'],
    relatedSlugs: ['color-converter', 'qr-code-generator', 'lorem-ipsum-generator'],
  },
  'password-generator': {
    purpose:
      'Generate strong, unpredictable passwords locally using browser Web Crypto randomness with length and character-set controls.',
    synonyms: ['password', 'strong password', 'random password', 'secure password', 'passphrase'],
    relatedSlugs: ['random-number-generator', 'url-encoder-decoder', 'json-formatter-validator'],
  },
  'json-formatter-validator': {
    purpose:
      'Format, minify, validate, and sort keys in JSON payloads locally inside your browser with exact syntax error messages.',
    synonyms: ['json', 'format json', 'json validator', 'pretty print json', 'minify json', 'lint json'],
    relatedSlugs: ['html-entity-converter', 'url-encoder-decoder', 'text-diff-checker'],
  },
};

export interface ToolKnowledgeEntry {
  id: string;
  slug: string;
  name: string;
  url: string;
  categoryId: ToolCategoryId;
  category: string;
  shortCategory: string;
  description: string;
  detailedExplanation: string;
  purpose: string;
  features: string[];
  howToUse: string[];
  example?: {
    label: string;
    input: string;
    output: string;
  };
  relatedToolSlugs: string[];
  keywords: string[];
}

function buildEntryForTool(tool: ToolItem, sourceTools: ToolItem[] = ALL_TOOLS): ToolKnowledgeEntry {
  const category = TOOL_CATEGORIES.find((c) => c.id === tool.categoryId);
  const details = TOOL_DETAILS[tool.slug];
  const meta = TOOL_ENRICHMENT_META[tool.slug];

  // Auto-discover related tools cleanly if meta doesn't specify 3
  const sameCategorySlugs = sourceTools
    .filter((other) => other.categoryId === tool.categoryId && other.slug !== tool.slug)
    .map((other) => other.slug);

  const explicitRelated = (meta?.relatedSlugs ?? []).filter(
    (slug) => slug !== tool.slug && sourceTools.some((t) => t.slug === slug)
  );
  const combinedRelated = Array.from(new Set([...explicitRelated, ...sameCategorySlugs])).slice(0, 3);

  const nameKeywords = tool.name
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 2);

  const combinedKeywords = Array.from(
    new Set([
      tool.name.toLowerCase(),
      ...tool.keywords.map((k) => k.toLowerCase()),
      ...(meta?.synonyms.map((s) => s.toLowerCase()) ?? []),
      ...nameKeywords,
    ])
  );

  return {
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    url: tool.path,
    categoryId: tool.categoryId,
    category: category?.name ?? tool.categoryId,
    shortCategory: category?.shortName ?? tool.categoryId,
    description: tool.shortDescription,
    detailedExplanation: details?.introduction ?? tool.shortDescription,
    purpose: meta?.purpose ?? details?.introduction ?? tool.shortDescription,
    features: details?.features ?? tool.howToUse,
    howToUse: tool.howToUse,
    example: details?.examples?.[0],
    relatedToolSlugs: combinedRelated,
    keywords: combinedKeywords,
  };
}

export function getToolKnowledgeDatabase(sourceTools: ToolItem[] = ALL_TOOLS): ToolKnowledgeEntry[] {
  return sourceTools.map((tool) => buildEntryForTool(tool, sourceTools));
}

export const TOOL_KNOWLEDGE_DATABASE: ToolKnowledgeEntry[] = getToolKnowledgeDatabase();
