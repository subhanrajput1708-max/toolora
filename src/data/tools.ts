export type ToolCategoryId =
  | 'text-tools'
  | 'calculators'
  | 'finance-tools'
  | 'date-time-tools'
  | 'conversion-tools'
  | 'productivity-tools'
  | 'web-tools';

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
  isFeatured?: boolean;
  isRecent?: boolean;
  categoryId: ToolCategoryId;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  howToUse: string[];
}

export const LEGACY_CATEGORY_MAP: Record<string, ToolCategoryId> = {
  'text-writing': 'text-tools',
  'web-internet': 'web-tools',
  'everyday-calculators': 'calculators',
  'file-productivity': 'productivity-tools',
};

export const ALL_TOOLS: ToolItem[] = [
  // =========================================================
  // 1. Text & Formatting Tools (12)
  // =========================================================
  {
    id: 'word-counter',
    slug: 'word-counter',
    path: '/tools/word-counter/',
    name: 'Word Counter',
    popularOrder: 1,
    isFeatured: true,
    categoryId: 'text-tools',
    shortDescription:
      'Count words, characters, sentences, paragraphs, and estimated reading time as you type.',
    metaTitle: 'Word Counter — Word & Character Count | TooloraHub',
    metaDescription:
      'Count words, characters with and without spaces, sentences, paragraphs, and estimated reading or speaking time instantly in your browser on TooloraHub.',
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
    categoryId: 'text-tools',
    shortDescription:
      'Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, and snake_case.',
    metaTitle: 'Case Converter — Online Text Case Tool | TooloraHub',
    metaDescription:
      'Transform text between uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, and kebab-case cleanly in a single click.',
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
    categoryId: 'text-tools',
    shortDescription:
      'Remove extra spaces, blank lines, HTML tags, and messy formatting from copied text.',
    metaTitle: 'Text Cleaner — Remove Spaces & HTML Tags | TooloraHub',
    metaDescription:
      'Clean up messy copied text by removing extra spaces, blank lines, smart quotes, HTML tags, and stray whitespace directly in your browser on TooloraHub.',
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
    categoryId: 'text-tools',
    shortDescription:
      'Filter out repeated lines from lists, logs, or CSV snippets with optional sorting.',
    metaTitle: 'Duplicate Line Remover — Clean Repeated Lines | TooloraHub',
    metaDescription:
      'Filter out duplicate lines from lists, notes, and text exports with optional case sensitivity, whitespace trimming, sorting, and plain-text download.',
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
    categoryId: 'text-tools',
    shortDescription:
      'Inspect total characters, letters, digits, UTF-8 byte size, and social/SEO length limits.',
    metaTitle: 'Character Counter — Text & Byte Limits | TooloraHub',
    metaDescription:
      'Inspect total characters, non-space letters, digits, punctuation, UTF-8 byte size, and visual bars for SEO titles, meta descriptions, SMS, and posts.',
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
    categoryId: 'text-tools',
    shortDescription:
      'Compare two versions of text line by line to spot additions, removals, and edits.',
    metaTitle: 'Text Diff Checker — Compare Two Texts | TooloraHub',
    metaDescription:
      'Compare original and revised text line by line to highlight added, removed, and unchanged lines with dual line numbers and optional whitespace/case toggles.',
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
    categoryId: 'text-tools',
    shortDescription:
      'Count total lines, non-empty lines, blank lines, and view numbered line breakdowns.',
    metaTitle: 'Line Counter — Count Total & Blank Lines | TooloraHub',
    metaDescription:
      'Count total lines, populated non-empty lines, blank lines, longest line character length, and average words per line with a toggleable numbered preview.',
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
    categoryId: 'text-tools',
    shortDescription:
      'Analyze how often each word appears in your text with share percentages and CSV export.',
    metaTitle: 'Word Frequency Counter — Analyze Word Usage | TooloraHub',
    metaDescription:
      'Rank how often every word appears in an article or transcript, filter out common English stop words, set minimum word lengths, and export results to CSV.',
    keywords: ['word frequency', 'keyword density', 'occurrences', 'csv'],
    howToUse: [
      'Paste an article, essay, or transcript into the text editor.',
      'Optionally hide common stop words or set a minimum word length.',
      'Sort the frequency table or export the breakdown as CSV.',
    ],
  },
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    path: '/tools/lorem-ipsum-generator/',
    name: 'Lorem Ipsum Generator',
    categoryId: 'text-tools',
    shortDescription:
      'Generate clean placeholder paragraphs, sentences, or words in plain text or HTML.',
    metaTitle: 'Lorem Ipsum Generator — Placeholder Text | TooloraHub',
    metaDescription:
      'Generate clean placeholder paragraphs, sentences, or words in plain text or wrapped HTML <p> tags with instant copy and plain-text file export.',
    keywords: ['lorem ipsum', 'placeholder text', 'dummy text', 'paragraphs'],
    howToUse: [
      'Choose whether to generate paragraphs, sentences, or words and set the quantity.',
      'Toggle HTML <p> tags or the classic opening sentence if needed.',
      'Copy the placeholder text or download it as a .txt file.',
    ],
  },
  {
    id: 'text-reverser',
    slug: 'text-reverser',
    path: '/tools/text-reverser/',
    name: 'Text Reverser',
    categoryId: 'text-tools',
    shortDescription:
      'Reverse characters, reverse word order, flip letters per word, or reverse line sequences.',
    metaTitle: 'Text Reverser — Reverse Characters & Lines | TooloraHub',
    metaDescription:
      'Reverse all characters safely, reverse word order, flip letters inside each word, or reverse multi-line sequences cleanly right in your browser.',
    keywords: ['reverse text', 'backwards text', 'flip lines', 'reverse words'],
    howToUse: [
      'Enter or paste your text in the input box.',
      'Select character, word-order, per-word, or line-order reversal.',
      'Copy the reversed output or swap it back into the editor.',
    ],
  },
  {
    id: 'line-break-formatter',
    slug: 'line-break-formatter',
    path: '/tools/line-break-formatter/',
    name: 'Line Break Formatter',
    isRecent: true,
    categoryId: 'text-tools',
    shortDescription:
      'Remove hard line breaks, normalize double spacing, or wrap paragraphs to a fixed character width.',
    metaTitle: 'Line Break Formatter — Unwrap & Wrap Text | TooloraHub',
    metaDescription:
      'Join broken lines from PDFs or emails, convert single breaks to paragraph spacing, add line breaks after sentences, or wrap text to a fixed column width.',
    keywords: ['line break', 'remove line breaks', 'word wrap', 'join lines', 'paragraph formatter'],
    howToUse: [
      'Paste text with awkward line breaks or long unwrapped paragraphs.',
      'Pick a formatting mode such as Unwrap Lines, Sentence Per Line, or Wrap to Width.',
      'Copy the formatted result or export it as a .txt file.',
    ],
  },
  {
    id: 'list-sorter-randomizer',
    slug: 'list-sorter-randomizer',
    path: '/tools/list-sorter-randomizer/',
    name: 'List Sorter & Randomizer',
    isRecent: true,
    categoryId: 'text-tools',
    shortDescription:
      'Sort lists alphabetically, numerically, or by line length, shuffle items, and add numbering.',
    metaTitle: 'List Sorter & Randomizer — Sort or Shuffle Lines | TooloraHub',
    metaDescription:
      'Sort line-based lists A–Z, Z–A, numerically, or by length, shuffle items randomly with Fisher-Yates, remove blanks, and add numbering or bullet prefixes.',
    keywords: ['sort list', 'shuffle lines', 'alphabetize', 'random list', 'number lines'],
    howToUse: [
      'Paste your list with one entry per line.',
      'Choose A–Z, Z–A, Numeric, Length sort, or Randomize Shuffle.',
      'Optionally number the sorted items and copy or download the output.',
    ],
  },

  // =========================================================
  // 2. Calculators (7)
  // =========================================================
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    path: '/tools/percentage-calculator/',
    name: 'Percentage Calculator',
    popularOrder: 5,
    isFeatured: true,
    categoryId: 'calculators',
    shortDescription:
      'Calculate percentages of numbers, percentage shares, and percentage increase or decrease.',
    metaTitle: 'Percentage Calculator — Three Everyday Modes | TooloraHub',
    metaDescription:
      'Solve everyday percentage problems instantly: calculate X% of Y, find what percentage X is of Y, and measure percentage increase or decrease between numbers.',
    keywords: ['percentage', 'percent change', 'percent increase', 'ratio'],
    howToUse: [
      'Pick the calculation mode that fits your question.',
      'Enter your numbers into the labeled fields.',
      'Read the result and step-by-step formula breakdown immediately.',
    ],
  },
  {
    id: 'reading-time-calculator',
    slug: 'reading-time-calculator',
    path: '/tools/reading-time-calculator/',
    name: 'Reading Time Calculator',
    categoryId: 'calculators',
    shortDescription:
      'Estimate article reading and speech duration based on customizable words-per-minute speeds.',
    metaTitle: 'Reading Time Calculator — Estimate Read Time | TooloraHub',
    metaDescription:
      'Estimate article reading time and speech delivery duration from word count using Slow (150), Average (200), Fast (260), or custom WPM presets.',
    keywords: ['reading time', 'wpm', 'speaking time', 'read time'],
    howToUse: [
      'Paste your article, script, or newsletter draft.',
      'Select a reading pace preset (150, 200, or 260 WPM) or set a custom WPM.',
      'Copy the formatted reading and speaking time summary.',
    ],
  },
  {
    id: 'average-calculator',
    slug: 'average-calculator',
    path: '/tools/average-calculator/',
    name: 'Average Calculator',
    isRecent: true,
    categoryId: 'calculators',
    shortDescription:
      'Compute mean, median, mode, sum, minimum, maximum, and range from any list of numbers.',
    metaTitle: 'Average Calculator — Mean, Median, Mode & Range | TooloraHub',
    metaDescription:
      'Paste comma, space, or line-separated numbers to calculate arithmetic mean, median, mode, sum, count, min, max, and range instantly in your browser.',
    keywords: ['average', 'mean', 'median', 'mode', 'range', 'statistics'],
    howToUse: [
      'Enter numbers separated by commas, spaces, or line breaks.',
      'Review live Mean, Median, Mode, Sum, Min/Max, and Range statistics.',
      'Copy the formatted statistical breakdown in one click.',
    ],
  },
  {
    id: 'ratio-calculator',
    slug: 'ratio-calculator',
    path: '/tools/ratio-calculator/',
    name: 'Ratio Calculator',
    isRecent: true,
    categoryId: 'calculators',
    shortDescription:
      'Simplify ratios to lowest terms, solve A:B = C:X proportions, and scale aspect ratios cleanly.',
    metaTitle: 'Ratio Calculator — Simplify & Solve Proportions | TooloraHub',
    metaDescription:
      'Reduce integer ratios to simplest form, solve missing values in proportions (A:B = C:X), and resize dimensions proportionally without distortion.',
    keywords: ['ratio', 'proportion', 'aspect ratio', 'simplify ratio', 'scale dimensions'],
    howToUse: [
      'Enter A and B to simplify a ratio or complete a proportion A : B = C : X.',
      'Leave one proportion field empty or choose which side to solve automatically.',
      'Copy the simplified ratio or scaled output values.',
    ],
  },
  {
    id: 'fraction-percentage-converter',
    slug: 'fraction-percentage-converter',
    path: '/tools/fraction-percentage-converter/',
    name: 'Fraction & Percentage Converter',
    isRecent: true,
    categoryId: 'calculators',
    shortDescription:
      'Convert freely between simplified fractions, mixed numbers, decimals, and percentages.',
    metaTitle: 'Fraction, Decimal & Percentage Converter | TooloraHub',
    metaDescription:
      'Convert fractions to decimals and percentages, or turn decimals and percentages back into lowest-terms fractions and mixed numbers with step-by-step math.',
    keywords: ['fraction converter', 'fraction to percentage', 'decimal to fraction', 'mixed number'],
    howToUse: [
      'Choose Fraction, Decimal, or Percentage as your starting input.',
      'Enter numerator/denominator or decimal/percent value.',
      'Read the simplified fraction, mixed number, decimal, and percentage together.',
    ],
  },
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    path: '/tools/bmi-calculator/',
    name: 'BMI Calculator',
    popularOrder: 10,
    isFeatured: true,
    isRecent: true,
    categoryId: 'calculators',
    shortDescription:
      'Calculate Body Mass Index using metric or US units along with standard weight category reference.',
    metaTitle: 'BMI Calculator — Metric & US Body Mass Index | TooloraHub',
    metaDescription:
      'Calculate adult Body Mass Index (BMI) in metric (kg/cm) or US customary (lbs/ft/in) units with standard WHO category guide and healthy weight range.',
    keywords: ['bmi calculator', 'body mass index', 'healthy weight', 'height weight'],
    howToUse: [
      'Select Metric (cm, kg) or US Imperial (ft/in, lbs) measurement units.',
      'Enter height and body weight.',
      'Review calculated BMI, standard category range, and informational reference note.',
    ],
  },
  {
    id: 'fuel-trip-cost-calculator',
    slug: 'fuel-trip-cost-calculator',
    path: '/tools/fuel-trip-cost-calculator/',
    name: 'Fuel & Trip Cost Calculator',
    isRecent: true,
    categoryId: 'calculators',
    shortDescription:
      'Estimate fuel needed, total trip fuel expense, and cost per passenger in metric or US units.',
    metaTitle: 'Fuel & Trip Cost Calculator — Mileage & Budget | TooloraHub',
    metaDescription:
      'Plan driving budgets by calculating total fuel needed, fuel cost, cost per distance unit, and split cost per passenger in km/L/100km or miles/MPG.',
    keywords: ['fuel cost calculator', 'trip budget', 'mpg', 'gas mileage', 'road trip'],
    howToUse: [
      'Choose Metric (km, L/100km, per liter) or US Imperial (miles, MPG, per gallon).',
      'Enter trip distance, vehicle fuel efficiency, fuel price, and passenger count.',
      'Review fuel required, total fuel bill, and per-person split cost.',
    ],
  },

  // =========================================================
  // 3. Finance Tools (5)
  // =========================================================
  {
    id: 'discount-calculator',
    slug: 'discount-calculator',
    path: '/tools/discount-calculator/',
    name: 'Discount Calculator',
    categoryId: 'finance-tools',
    shortDescription:
      'Find sale prices, total savings, and optional sales tax from any percentage discount.',
    metaTitle: 'Discount Calculator — Sale Price & Savings | TooloraHub',
    metaDescription:
      'Work out discounted sale prices, exact money saved, and optional sales tax across multiple currency symbols directly in your browser on TooloraHub.',
    keywords: ['discount', 'sale price', 'savings', 'markdown', 'tax'],
    howToUse: [
      'Enter the original price and discount percentage.',
      'Optionally add a sales tax percentage and pick your preferred currency symbol.',
      'View the savings amount, discounted subtotal, and final price.',
    ],
  },
  {
    id: 'tip-calculator',
    slug: 'tip-calculator',
    path: '/tools/tip-calculator/',
    name: 'Tip Calculator',
    isRecent: true,
    categoryId: 'finance-tools',
    shortDescription:
      'Calculate gratuity amounts, bill totals, and per-person split shares across custom tip rates.',
    metaTitle: 'Tip Calculator — Gratuity & Bill Splitter | TooloraHub',
    metaDescription:
      'Work out restaurant tips, total bill with gratuity, and exact per-person split amounts with preset tip buttons (10%, 15%, 18%, 20%) and optional rounding.',
    keywords: ['tip calculator', 'bill splitter', 'gratuity', 'restaurant tip', 'split bill'],
    howToUse: [
      'Enter the pre-tip bill amount and select or type a tip percentage.',
      'Set how many people are sharing the bill.',
      'Copy the clear breakdown showing tip, total bill, and cost per person.',
    ],
  },
  {
    id: 'loan-emi-calculator',
    slug: 'loan-emi-calculator',
    path: '/tools/loan-emi-calculator/',
    name: 'Loan EMI Calculator',
    popularOrder: 11,
    isFeatured: true,
    isRecent: true,
    categoryId: 'finance-tools',
    shortDescription:
      'Estimate monthly loan payments (EMI), total interest paid, and total repayment schedule.',
    metaTitle: 'Loan EMI Calculator — Monthly Payment & Interest | TooloraHub',
    metaDescription:
      'Calculate fixed monthly loan EMI payments, total interest cost, and principal-to-interest share using standard amortized loan math directly in your browser.',
    keywords: ['loan calculator', 'emi calculator', 'monthly payment', 'interest rate', 'amortization'],
    howToUse: [
      'Enter the loan principal amount, annual interest rate (%), and term length (years or months).',
      'Review estimated monthly EMI, total interest, and total amount payable.',
      'Inspect the year-by-year payoff summary or copy the figures.',
    ],
  },
  {
    id: 'compound-interest-calculator',
    slug: 'compound-interest-calculator',
    path: '/tools/compound-interest-calculator/',
    name: 'Compound Interest Calculator',
    isRecent: true,
    categoryId: 'finance-tools',
    shortDescription:
      'Compare compound vs. simple interest growth across annual, quarterly, or monthly compounding.',
    metaTitle: 'Compound Interest Calculator — Savings Growth | TooloraHub',
    metaDescription:
      'Calculate future value and total interest earned with compound interest, optional monthly deposits, and compounding frequency comparisons in your browser.',
    keywords: ['compound interest', 'simple interest', 'savings calculator', 'future value'],
    howToUse: [
      'Enter your starting principal, annual interest rate (%), duration in years, and optional monthly contribution.',
      'Select Annual, Quarterly, or Monthly compounding frequency.',
      'Compare total future balance, interest earned, and simple-interest baseline.',
    ],
  },
  {
    id: 'profit-margin-calculator',
    slug: 'profit-margin-calculator',
    path: '/tools/profit-margin-calculator/',
    name: 'Profit Margin Calculator',
    isRecent: true,
    categoryId: 'finance-tools',
    shortDescription:
      'Calculate gross profit, gross margin percentage, markup percentage, and target selling price.',
    metaTitle: 'Profit Margin & Markup Calculator | TooloraHub',
    metaDescription:
      'Determine net dollar profit, gross margin %, and markup % from item cost and revenue—or calculate selling price from target margin or markup directly online.',
    keywords: ['profit margin', 'markup calculator', 'gross margin', 'selling price', 'business math'],
    howToUse: [
      'Switch between "Cost & Selling Price" or "Cost & Target Margin %" mode.',
      'Enter your unit cost and revenue or target margin percentage.',
      'View profit per item, gross margin %, and equivalent markup % side by side.',
    ],
  },

  // =========================================================
  // 4. Date & Time Tools (6)
  // =========================================================
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    path: '/tools/age-calculator/',
    name: 'Age Calculator',
    popularOrder: 6,
    isFeatured: true,
    categoryId: 'date-time-tools',
    shortDescription:
      'Calculate exact age in years, months, and days plus upcoming birthday countdown.',
    metaTitle: 'Age Calculator — Years, Months & Days | TooloraHub',
    metaDescription:
      'Calculate exact chronological age from any date of birth in years, months, weeks, and days, along with birth weekday and next-birthday countdown.',
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
    categoryId: 'date-time-tools',
    shortDescription:
      'Measure days, weeks, months, and weekdays between any two calendar dates.',
    metaTitle: 'Date Difference — Days & Weekdays | TooloraHub',
    metaDescription:
      'Measure exact calendar days, weeks, years, months, working weekdays, and weekend days between any two dates with optional inclusive end-date mode.',
    keywords: ['date difference', 'days between dates', 'weekdays', 'duration'],
    howToUse: [
      'Pick a Start Date and an End Date.',
      'Choose whether to include the end date in the total day count.',
      'View calendar duration, total days, weeks, weekdays, and weekend days.',
    ],
  },
  {
    id: 'time-calculator',
    slug: 'time-calculator',
    path: '/tools/time-calculator/',
    name: 'Time Calculator',
    categoryId: 'date-time-tools',
    shortDescription:
      'Add or subtract hours, minutes, and seconds, or find the duration between two clock times.',
    metaTitle: 'Time Calculator — Add & Subtract Time | TooloraHub',
    metaDescription:
      'Add or subtract hours, minutes, and seconds cleanly, or compute elapsed duration and decimal hours between two clock times including overnight shifts.',
    keywords: ['time calculator', 'hours minutes', 'duration', 'elapsed time'],
    howToUse: [
      'Switch between Duration Math (add/subtract) or Time Between Clock Times.',
      'Enter your hours, minutes, and seconds or start/end times.',
      'Read the normalized duration in HH:MM:SS as well as decimal hours and total minutes.',
    ],
  },
  {
    id: 'add-days-to-date',
    slug: 'add-days-to-date',
    path: '/tools/add-days-to-date/',
    name: 'Add/Subtract Days Calculator',
    isRecent: true,
    categoryId: 'date-time-tools',
    shortDescription:
      'Add or subtract days, weeks, months, years, or business weekdays from any calendar date.',
    metaTitle: 'Add or Subtract Days to Date Calculator | TooloraHub',
    metaDescription:
      'Calculate the exact past or future calendar date after adding or subtracting calendar days, weeks, months, years, or Monday–Friday business days.',
    keywords: ['add days to date', 'subtract days', 'business days calculator', 'future date'],
    howToUse: [
      'Choose a starting calendar date.',
      'Select Add or Subtract and enter days, weeks, months, years, or business days only.',
      'Read the exact resulting date, day of the week, and total day offset.',
    ],
  },
  {
    id: 'week-number-calculator',
    slug: 'week-number-calculator',
    path: '/tools/week-number-calculator/',
    name: 'Week Number Calculator',
    isRecent: true,
    categoryId: 'date-time-tools',
    shortDescription:
      'Find the ISO-8601 week number, day of the year, quarter, and days remaining for any date.',
    metaTitle: 'Week Number Calculator — ISO Week & Day of Year | TooloraHub',
    metaDescription:
      'Check the ISO-8601 week number (Weeks 1–53), week date range (Mon–Sun), day of the year, quarter, and leap-year status for any selected calendar date.',
    keywords: ['week number', 'iso week', 'day of year', 'calendar week', 'quarter'],
    howToUse: [
      'Select any calendar date (defaults to today) or jump to a week.',
      'View the ISO-8601 week number along with the Monday–Sunday week span.',
      'Check day of the year, days remaining in the year, quarter, and leap-year status.',
    ],
  },
  {
    id: 'countdown-timer',
    slug: 'countdown-timer',
    path: '/tools/countdown-timer/',
    name: 'Countdown Timer',
    isRecent: true,
    categoryId: 'date-time-tools',
    shortDescription:
      'Run a clean in-browser countdown timer with quick presets, progress bar, and optional chime.',
    metaTitle: 'Online Countdown Timer — Minutes & Seconds | TooloraHub',
    metaDescription:
      'Set hours, minutes, and seconds or pick a quick preset to run an accurate browser countdown timer with pause, resume, progress bar, and optional sound alert.',
    keywords: ['countdown timer', 'online timer', 'minute timer', 'alarm', 'timer'],
    howToUse: [
      'Pick a quick preset (1m, 5m, 10m, 15m, 30m) or enter custom hours, minutes, and seconds.',
      'Click Start Timer to count down accurately using system clock timestamps.',
      'Pause, resume, or reset anytime—and enable optional finish chimes.',
    ],
  },

  // =========================================================
  // 5. Conversion Tools (7)
  // =========================================================
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    path: '/tools/unit-converter/',
    name: 'Unit Converter',
    popularOrder: 7,
    categoryId: 'conversion-tools',
    shortDescription:
      'Convert length, weight, temperature, area, volume, speed, data storage, and time units.',
    metaTitle: 'Unit Converter — Metric & Imperial Units | TooloraHub',
    metaDescription:
      'Convert measurements across length, weight, temperature, area, volume, speed, binary data storage, and time with instant unit swapping and copy.',
    keywords: ['unit converter', 'metric', 'imperial', 'celsius', 'kg to lbs', 'km to miles'],
    howToUse: [
      'Select a measurement category such as Length, Weight, or Temperature.',
      'Choose your From and To units and enter a numeric value.',
      'Use the Swap button anytime to reverse the conversion direction.',
    ],
  },
  {
    id: 'length-converter',
    slug: 'length-converter',
    path: '/tools/length-converter/',
    name: 'Length Converter',
    isRecent: true,
    categoryId: 'conversion-tools',
    shortDescription:
      'Convert millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles at once.',
    metaTitle: 'Length Converter — Metric & Imperial Distances | TooloraHub',
    metaDescription:
      'Enter any distance in mm, cm, m, km, inches, feet, yards, miles, or nautical miles to see exact equivalents across every length unit simultaneously.',
    keywords: ['length converter', 'cm to inches', 'meters to feet', 'km to miles', 'distance'],
    howToUse: [
      'Enter your measurement and pick the starting length unit.',
      'Inspect all metric, US/imperial, and nautical equivalents simultaneously.',
      'Click Copy next to any converted row.',
    ],
  },
  {
    id: 'weight-converter',
    slug: 'weight-converter',
    path: '/tools/weight-converter/',
    name: 'Weight Converter',
    isRecent: true,
    categoryId: 'conversion-tools',
    shortDescription:
      'Translate grams, kilograms, metric tons, ounces, pounds, and stone in one multi-unit table.',
    metaTitle: 'Weight & Mass Converter — kg, lbs, oz, g | TooloraHub',
    metaDescription:
      'Convert weights cleanly between milligrams, grams, kilograms, metric tons, ounces, pounds, and UK stone with simultaneous comparison outputs.',
    keywords: ['weight converter', 'kg to lbs', 'grams to ounces', 'pounds to kilograms', 'mass'],
    howToUse: [
      'Type any weight value and choose your source unit (such as kg or lb).',
      'Compare exact converted weights across all common metric and imperial units.',
      'Copy any individual value with one click.',
    ],
  },
  {
    id: 'temperature-converter',
    slug: 'temperature-converter',
    path: '/tools/temperature-converter/',
    name: 'Temperature Converter',
    isRecent: true,
    categoryId: 'conversion-tools',
    shortDescription:
      'Convert Celsius, Fahrenheit, and Kelvin together with formula cards and reference benchmarks.',
    metaTitle: 'Temperature Converter — Celsius, Fahrenheit & Kelvin | TooloraHub',
    metaDescription:
      'Convert temperatures instantaneously across Celsius (°C), Fahrenheit (°F), and Kelvin (K) with exact formulas, absolute zero warnings, and reference points.',
    keywords: ['temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius', 'kelvin'],
    howToUse: [
      'Enter a temperature and pick °C, °F, or K as your input scale.',
      'View all three temperature scales updated together with exact conversion formulas.',
      'Use quick presets for freezing water, body temperature, and boiling point.',
    ],
  },
  {
    id: 'data-storage-converter',
    slug: 'data-storage-converter',
    path: '/tools/data-storage-converter/',
    name: 'Data Storage Converter',
    isRecent: true,
    categoryId: 'conversion-tools',
    shortDescription:
      'Convert bits, bytes, KB, MB, GB, and TB using either Binary (1024) or Decimal SI (1000) modes.',
    metaTitle: 'Data Storage Converter — Binary (1024) & SI (1000) | TooloraHub',
    metaDescription:
      'Convert digital storage sizes across bits, Bytes, KB/KiB, MB/MiB, GB/GiB, and TB/TiB with instant toggling between binary (1024) and decimal SI (1000) math.',
    keywords: ['data storage', 'mb to gb', 'gb to tb', 'bits to bytes', 'kib vs kb'],
    howToUse: [
      'Switch between Binary (IEC 1024) and Decimal SI (1000) calculation conventions.',
      'Enter a file size or capacity and pick the source unit.',
      'Inspect all equivalent storage units cleanly side by side.',
    ],
  },
  {
    id: 'color-converter',
    slug: 'color-converter',
    path: '/tools/color-converter/',
    name: 'Color Converter',
    isRecent: true,
    categoryId: 'conversion-tools',
    shortDescription:
      'Convert HEX, RGB, and HSL colors with live swatch preview and WCAG text contrast ratios.',
    metaTitle: 'Color Converter — HEX, RGB, HSL & Contrast | TooloraHub',
    metaDescription:
      'Convert CSS colors smoothly between HEX, RGB, and HSL formats, inspect a live swatch preview, and check WCAG AA/AAA text contrast against white and dark text.',
    keywords: ['color converter', 'hex to rgb', 'rgb to hsl', 'wcag contrast', 'css color'],
    howToUse: [
      'Type a HEX color, drag the visual picker, or enter RGB/HSL values.',
      'Copy formatted HEX, rgb(), or hsl() CSS strings with one click.',
      'Check WCAG text contrast scores against white and dark ink.',
    ],
  },
  {
    id: 'number-base-converter',
    slug: 'number-base-converter',
    path: '/tools/number-base-converter/',
    name: 'Number Base Converter',
    isRecent: true,
    categoryId: 'conversion-tools',
    shortDescription:
      'Convert non-negative integers seamlessly between Binary, Octal, Decimal, and Hexadecimal.',
    metaTitle: 'Number Base Converter — Binary, Octal, Decimal, Hex | TooloraHub',
    metaDescription:
      'Translate whole numbers across Binary (base 2), Octal (base 8), Decimal (base 10), and Hexadecimal (base 16) with arbitrary-precision BigInt math.',
    keywords: ['binary converter', 'hex converter', 'decimal to binary', 'octal', 'base converter'],
    howToUse: [
      'Select your input base (Binary, Octal, Decimal, or Hexadecimal).',
      'Enter any valid whole number for that base.',
      'View and copy all four representations updated instantaneously.',
    ],
  },

  // =========================================================
  // 6. Productivity Tools (6)
  // =========================================================
  {
    id: 'pomodoro-timer',
    slug: 'pomodoro-timer',
    path: '/tools/pomodoro-timer/',
    name: 'Pomodoro Timer',
    isRecent: true,
    categoryId: 'productivity-tools',
    shortDescription:
      'Run structured Focus, Short Break, and Long Break intervals with completed session tracking.',
    metaTitle: 'Pomodoro Timer — Focus & Break Sessions | TooloraHub',
    metaDescription:
      'Stay productive with an uncluttered Pomodoro focus timer supporting Focus (25m), Short Break (5m), and Long Break (15m) presets, customizable minutes, and audio alerts.',
    keywords: ['pomodoro timer', 'focus timer', 'study timer', 'work intervals'],
    howToUse: [
      'Choose Focus, Short Break, or Long Break (or adjust custom minutes).',
      'Click Start to begin your timed focus block.',
      'Track completed focus intervals during your session and switch phases cleanly.',
    ],
  },
  {
    id: 'stopwatch',
    slug: 'stopwatch',
    path: '/tools/stopwatch/',
    name: 'Online Stopwatch',
    isRecent: true,
    categoryId: 'productivity-tools',
    shortDescription:
      'Measure elapsed time accurately to hundredths of a second with unlimited lap split recording.',
    metaTitle: 'Online Stopwatch with Lap Times | TooloraHub',
    metaDescription:
      'Time tasks, workouts, or presentations with a drift-free browser stopwatch supporting millisecond precision, unlimited lap splits, and one-click lap export.',
    keywords: ['stopwatch', 'lap timer', 'chronometer', 'elapsed time'],
    howToUse: [
      'Click Start to begin timing with monotonic browser timestamps.',
      'Click Lap anytime while running to log individual lap splits and cumulative times.',
      'Pause, resume, copy your lap table, or reset back to zero.',
    ],
  },
  {
    id: 'checklist-maker',
    slug: 'checklist-maker',
    path: '/tools/checklist-maker/',
    name: 'Checklist Maker',
    isRecent: true,
    categoryId: 'productivity-tools',
    shortDescription:
      'Create quick interactive checklists, tick off completed steps, and export as Markdown or text.',
    metaTitle: 'Checklist Maker — Interactive List & Markdown Export | TooloraHub',
    metaDescription:
      'Build fast browser checklists for launches, packing, or daily routines—check off items, track completion progress, and copy or download as Markdown/plain text.',
    keywords: ['checklist maker', 'todo checklist', 'markdown checklist', 'packing list'],
    howToUse: [
      'Add checklist items one by one or paste a multi-line list in bulk.',
      'Check off completed steps and view your completion progress bar.',
      'Copy formatted Markdown checkboxes ([x] / [ ]) or download a .txt file.',
    ],
  },
  {
    id: 'simple-task-planner',
    slug: 'simple-task-planner',
    path: '/tools/simple-task-planner/',
    name: 'Simple Task Planner',
    isRecent: true,
    categoryId: 'productivity-tools',
    shortDescription:
      'Organize tasks by High, Medium, or Low priority, filter status, and export your day plan.',
    metaTitle: 'Simple Task Planner — Prioritize Your Day | TooloraHub',
    metaDescription:
      'Plan your workday locally without sign-ups: add tasks with High, Medium, or Low priority tags, filter pending vs. done items, and export your plan as text.',
    keywords: ['task planner', 'daily planner', 'priority list', 'to do organizer'],
    howToUse: [
      'Type a task name, pick High, Medium, or Low priority, and click Add Task.',
      'Filter between All, Active, or Completed tasks and check off finished work.',
      'Copy or download your prioritized plan anytime.',
    ],
  },
  {
    id: 'notes-formatter',
    slug: 'notes-formatter',
    path: '/tools/notes-formatter/',
    name: 'Notes Formatter',
    isRecent: true,
    categoryId: 'productivity-tools',
    shortDescription:
      'Turn rough meeting notes into structured bullet points, numbered lists, checklists, or blockquotes.',
    metaTitle: 'Notes Formatter — Clean Bullets & Markdown Notes | TooloraHub',
    metaDescription:
      'Convert messy raw notes into uniform Markdown bullets, numbered action items, checklist tasks, or clean double-spaced paragraphs in one click.',
    keywords: ['notes formatter', 'meeting notes', 'bullet list', 'markdown formatter'],
    howToUse: [
      'Paste rough meeting notes or brainstorming points on the left.',
      'Choose Bulleted List, Numbered Steps, Checklist, Headings, or Clean Paragraphs.',
      'Copy the structured notes or download them as a .md / .txt file.',
    ],
  },
  {
    id: 'random-number-generator',
    slug: 'random-number-generator',
    path: '/tools/random-number-generator/',
    name: 'Random Number Generator',
    isRecent: true,
    categoryId: 'productivity-tools',
    shortDescription:
      'Generate single or bulk random integers in any range, with optional uniqueness and sorting.',
    metaTitle: 'Random Number Generator — Range & Unique Picks | TooloraHub',
    metaDescription:
      'Draw unbiased random integers inside your Min/Max range using browser crypto randomness, generate up to 100 unique numbers, or roll dice and coin-flip presets.',
    keywords: ['random number generator', 'rng', 'unique random', 'dice roller', 'coin flip'],
    howToUse: [
      'Set Minimum and Maximum integer bounds and how many numbers to generate (1–100).',
      'Optionally enable "Unique numbers only" and ascending sorting.',
      'Click Generate Numbers and copy the results in one click.',
    ],
  },

  // =========================================================
  // 7. Web & Developer Tools (7)
  // =========================================================
  {
    id: 'slug-generator',
    slug: 'slug-generator',
    path: '/tools/slug-generator/',
    name: 'Slug Generator',
    popularOrder: 8,
    categoryId: 'web-tools',
    shortDescription:
      'Turn article titles and page names into clean, readable, URL-friendly slugs.',
    metaTitle: 'URL Slug Generator — Clean SEO URL Slugs | TooloraHub',
    metaDescription:
      'Convert article titles and page names into clean URL-friendly slugs with hyphen or underscore separators, stop-word removal, and live full URL preview.',
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
    categoryId: 'web-tools',
    shortDescription:
      'Encode special characters for safe URLs or decode percent-encoded links and query strings.',
    metaTitle: 'URL Encoder & Decoder — Parse URLs | TooloraHub',
    metaDescription:
      'Percent-encode text for query parameters or decode encoded links cleanly, with Component vs. Full URI modes and an automatic query-string parameter table.',
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
    categoryId: 'web-tools',
    shortDescription:
      'Escape HTML reserved characters into safe entities or decode HTML entities back to text.',
    metaTitle: 'HTML Entity Converter — Encode & Decode | TooloraHub',
    metaDescription:
      'Escape reserved HTML characters (<, >, &, quotes) into safe entities or decode named and numeric HTML entities back into readable plain text.',
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
    isFeatured: true,
    categoryId: 'web-tools',
    shortDescription:
      'Create scannable QR codes for links, Wi-Fi notes, or text and download as PNG or SVG.',
    metaTitle: 'QR Code Generator — Free PNG & SVG QR Codes | TooloraHub',
    metaDescription:
      'Generate crisp scannable QR codes locally in your browser for URLs, notes, or text with custom colors, error correction levels, and PNG or SVG downloads.',
    keywords: ['qr code', 'barcode', 'png', 'svg', 'link qr'],
    howToUse: [
      'Enter a website URL, email address, or short text message.',
      'Customize QR size, foreground/background colors, and error correction level.',
      'Download the crisp QR code directly as a PNG or SVG file.',
    ],
  },
  {
    id: 'gradient-generator',
    slug: 'gradient-generator',
    path: '/tools/gradient-generator/',
    name: 'Gradient Generator',
    categoryId: 'web-tools',
    shortDescription:
      'Build linear or radial CSS gradients with custom color stops, angles, CSS copy, and PNG export.',
    metaTitle: 'CSS Gradient Generator — CSS & PNG Export | TooloraHub',
    metaDescription:
      'Design linear or radial CSS gradients with customizable color stops, angles, and palettes, copy CSS declarations, or download a 1200x800 PNG image.',
    keywords: ['css gradient', 'linear gradient', 'radial gradient', 'color stops'],
    howToUse: [
      'Choose Linear or Radial mode and adjust the gradient angle or presets.',
      'Edit color stops, drag stop positions, or add extra colors.',
      'Copy the generated CSS background rule or download a PNG swatch.',
    ],
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    path: '/tools/password-generator/',
    name: 'Password Generator',
    popularOrder: 9,
    isFeatured: true,
    isRecent: true,
    categoryId: 'web-tools',
    shortDescription:
      'Generate strong, unpredictable passwords locally using browser Web Crypto randomness.',
    metaTitle: 'Password Generator — Secure Random Passwords | TooloraHub',
    metaDescription:
      'Create strong random passwords directly in your browser via Web Crypto (crypto.getRandomValues) with customizable length, character sets, and entropy estimate.',
    keywords: ['password generator', 'strong password', 'random password', 'security', 'entropy'],
    howToUse: [
      'Choose your desired password length (6–64 characters) and character sets.',
      'Optionally exclude ambiguous characters such as 0/O and 1/l/I.',
      'Copy the generated password directly—nothing ever leaves your browser.',
    ],
  },
  {
    id: 'json-formatter-validator',
    slug: 'json-formatter-validator',
    path: '/tools/json-formatter-validator/',
    name: 'JSON Formatter & Validator',
    popularOrder: 12,
    isFeatured: true,
    isRecent: true,
    categoryId: 'web-tools',
    shortDescription:
      'Beautify, minify, sort keys, and pinpoint syntax errors in JSON payloads inside your browser.',
    metaTitle: 'JSON Formatter & Validator — Pretty Print & Minify | TooloraHub',
    metaDescription:
      'Format raw JSON with 2-space or 4-space indentation, minify payloads, sort object keys alphabetically, and inspect exact syntax errors locally in your browser.',
    keywords: ['json formatter', 'json validator', 'pretty print json', 'minify json', 'lint json'],
    howToUse: [
      'Paste raw or minified JSON data into the input editor.',
      'Choose Beautify (2 or 4 spaces) or Minify, and optionally Sort Object Keys.',
      'Inspect validity status or copy and download the formatted .json file.',
    ],
  },
];

function countToolsInCategory(id: ToolCategoryId): number {
  return ALL_TOOLS.filter((tool) => tool.categoryId === id).length;
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'text-tools',
    name: 'Text & Formatting',
    shortName: 'Text & Formatting',
    description: 'Word counting, case styling, cleaning, diff checks, sorting, and formatting.',
    toolCount: countToolsInCategory('text-tools'),
  },
  {
    id: 'calculators',
    name: 'Calculators',
    shortName: 'Calculators',
    description: 'Percentages, averages, ratios, fractions, BMI, fuel cost, and reading time.',
    toolCount: countToolsInCategory('calculators'),
  },
  {
    id: 'finance-tools',
    name: 'Finance Tools',
    shortName: 'Finance Tools',
    description: 'Discounts, tips, loan EMI schedules, compound interest, and profit margins.',
    toolCount: countToolsInCategory('finance-tools'),
  },
  {
    id: 'date-time-tools',
    name: 'Date & Time Tools',
    shortName: 'Date & Time',
    description: 'Age math, date spans, adding days, ISO week numbers, time math, and timers.',
    toolCount: countToolsInCategory('date-time-tools'),
  },
  {
    id: 'conversion-tools',
    name: 'Conversion Tools',
    shortName: 'Conversions',
    description: 'Length, weight, temperature, data storage, colors, number bases, and units.',
    toolCount: countToolsInCategory('conversion-tools'),
  },
  {
    id: 'productivity-tools',
    name: 'Productivity Tools',
    shortName: 'Productivity',
    description: 'Pomodoro timer, stopwatch, checklists, task planning, notes, and random picks.',
    toolCount: countToolsInCategory('productivity-tools'),
  },
  {
    id: 'web-tools',
    name: 'Web & Developer Tools',
    shortName: 'Web & Developer',
    description: 'URL slugs, encoding, HTML entities, QR codes, gradients, passwords, and JSON.',
    toolCount: countToolsInCategory('web-tools'),
  },
];

export const POPULAR_TOOLS: ToolItem[] = ALL_TOOLS.filter(
  (tool) => typeof tool.popularOrder === 'number'
).sort((a, b) => (a.popularOrder ?? 99) - (b.popularOrder ?? 99));

export const FEATURED_TOOLS: ToolItem[] = ALL_TOOLS.filter((tool) => tool.isFeatured);

export const RECENT_TOOLS: ToolItem[] = ALL_TOOLS.filter((tool) => tool.isRecent);

export function getToolBySlug(slug: string): ToolItem | undefined {
  return ALL_TOOLS.find((tool) => tool.slug === slug);
}

export function getCategoryById(id: ToolCategoryId): ToolCategory {
  return TOOL_CATEGORIES.find((c) => c.id === id) ?? TOOL_CATEGORIES[0];
}

export function resolveCategoryId(raw: string | null | undefined): 'all' | ToolCategoryId {
  if (!raw) return 'all';
  const normalized = raw.trim().toLowerCase();
  if (normalized === 'all') return 'all';
  if (normalized in LEGACY_CATEGORY_MAP) {
    return LEGACY_CATEGORY_MAP[normalized];
  }
  const direct = TOOL_CATEGORIES.find((c) => c.id === normalized);
  return direct ? direct.id : 'all';
}
