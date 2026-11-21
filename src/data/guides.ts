export type GuideCategory =
  | 'Text & Writing Tips'
  | 'Web & Internet Basics'
  | 'Everyday Calculations'
  | 'Digital Productivity'
  | 'File & Format Guides';

export const GUIDE_CATEGORIES: GuideCategory[] = [
  'Text & Writing Tips',
  'Web & Internet Basics',
  'Everyday Calculations',
  'Digital Productivity',
  'File & Format Guides',
];

export interface GuideSubsection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuideTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  subsections?: GuideSubsection[];
  bullets?: string[];
  orderedSteps?: string[];
  table?: GuideTable;
  example?: {
    label: string;
    before: string;
    after: string;
  };
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideArticle {
  id: string;
  slug: string;
  path: string;
  title: string;
  category: GuideCategory;
  readTime: string;
  publishedDate: string;
  shortDescription: string;
  introduction: string[];
  metaTitle: string;
  metaDescription: string;
  thumbnail: string;
  thumbnailAlt: string;
  relatedToolSlugs: string[];
  relatedGuideSlugs: string[];
  sections: GuideSection[];
  commonMistakes: { mistake: string; solution: string }[];
  actionableTips: string[];
  conclusion: string[];
  faqs: GuideFaq[];
}

export const ALL_GUIDES: GuideArticle[] = [
  {
    id: 'word-count-and-clean-formatting',
    slug: 'word-count-and-clean-formatting',
    path: '/guides/word-count-and-clean-formatting/',
    title: 'How Word Count, Reading Time, and Clean Formatting Improve Online Writing',
    category: 'Text & Writing Tips',
    readTime: '7 min read',
    publishedDate: 'November 2026',
    shortDescription:
      'Learn how checking word density, pacing reading length, fixing capitalization, and removing hidden whitespace make digital writing clearer.',
    introduction: [
      'Writing for a screen is fundamentally different from writing for printed paper. On laptops and phones, readers scan headings first, check how long an article will take to finish, and decide within seconds whether the page looks easy to read or overwhelming.',
      'Even strong ideas lose impact when a draft arrives with inconsistent line breaks copied from a PDF, accidental double spaces, or an unedited 300-word wall of text. Paying attention to measurable structure—word counts, character thresholds, reading pace, and clean whitespace—turns rough drafts into polished copy without altering your voice.',
      'This guide walks through practical benchmarks for online writing, step-by-step cleanup workflows, common formatting pitfalls, and how to use lightweight browser utilities to check your text before hitting publish.',
    ],
    metaTitle: 'How Word Count & Clean Formatting Improve Writing | TooloraHub Guides',
    metaDescription:
      'Practical guide to word counts, character limits, reading time pacing, and cleaning copied text for clearer articles, emails, and web copy.',
    thumbnail: '/src/assets/images/guide_writing_clarity_1795276688061.jpg',
    thumbnailAlt: 'Minimalist open notebook, fountain pen, and geometric ruler on a light desk',
    relatedToolSlugs: [
      'word-counter',
      'character-counter',
      'text-cleaner',
      'reading-time-calculator',
      'case-converter',
    ],
    relatedGuideSlugs: ['plain-text-and-diff-comparisons', 'simple-digital-productivity-habits'],
    sections: [
      {
        heading: 'Why Measurable Structure Matters in Digital Writing',
        paragraphs: [
          'Good online writing respects the reader’s attention. Whether you are preparing a client proposal, an assignment, a product help article, or a blog post, tracking word and sentence counts shows you where explanations have drifted or where paragraphs have grown too heavy for comfortable scanning on a phone screen.',
          'Rather than chasing an arbitrary word quota, think of word count as a structural diagnostic. Comparing total words against sentence count gives you average sentence length. If a 600-word section contains only 18 sentences, the average exceeds 33 words per sentence—a clear signal to split complex sentences and introduce subheadings.',
        ],
        subsections: [
          {
            heading: 'Balancing Paragraph Density for Mobile Readers',
            paragraphs: [
              'A paragraph that looks modest at five lines on a wide desktop monitor often stretches to eleven or twelve lines on a narrow smartphone screen. Keeping most web paragraphs between two and four sentences preserves visual breathing room and reduces eye fatigue.',
            ],
          },
          {
            heading: 'Tracking Character Limits Where Every Letter Counts',
            paragraphs: [
              'While body copy focuses on words, titles, metadata, and short notifications rely on strict character and UTF-8 byte limits. Exceeding 60 characters in a search title or 160 characters in a meta description often causes search snippets to truncate mid-thought.',
            ],
          },
          {
            heading: 'Adapting Drafts for Emails, Essays, and Web Snippets',
            paragraphs: [
              'Different formats demand different structural priorities. In client emails, keep paragraphs to two or three lines and put direct questions on their own line so busy recipients do not miss them. In academic or editorial essays, keep transitions explicit and monitor section proportions so the introduction does not overshadow the main analysis.',
              'For web landing pages and documentation cards, check character counts before finalizing labels. Buttons and navigation items wrap awkwardly when one label is four words while neighboring buttons are two words.',
            ],
          },
        ],
      },
      {
        heading: 'Using Reading Time Benchmarks to Pace Your Drafts',
        paragraphs: [
          'Most adults read everyday web prose silently at roughly 180 to 220 words per minute (WPM). Technical instructions, code walkthroughs, or legal summaries drop closer to 140 to 160 WPM because readers pause to absorb terms and numbers. When preparing spoken presentations or video voiceovers, comfortable delivery drops further to about 120 to 140 WPM.',
          'Checking estimated reading time before publishing lets you match the format to the reader’s goal. If a quick status update reads like a six-minute essay, trimming repetitive lead-ins makes the message far easier to act on.',
        ],
        table: {
          caption: 'Practical Word Count & Reading Time Benchmarks',
          headers: ['Content Format', 'Typical Word Range', 'Silent Read (200 WPM)', 'Spoken Pace (130 WPM)'],
          rows: [
            ['Quick Email / Update', '75 – 200 words', 'Under 1 min', '1 – 1.5 min'],
            ['Product Overview / FAQ', '300 – 500 words', '1.5 – 2.5 min', '2.5 – 4 min'],
            ['Practical How-To Guide', '800 – 1,500 words', '4 – 7.5 min', '6 – 11.5 min'],
            ['In-Depth Reference', '1,600 – 2,500 words', '8 – 12.5 min', '12 – 19 min'],
          ],
        },
      },
      {
        heading: 'Step-by-Step: Cleaning Copied Drafts Before Publishing',
        paragraphs: [
          'Drafts rarely start and finish inside a single editor. You might outline notes in a mobile app, copy quotes from a PDF report, paste tables from a spreadsheet, and assemble everything inside a website editor. Each transfer leaves behind invisible clutter—double spaces, curly smart quotes, stray HTML spans, or hard line breaks.',
        ],
        orderedSteps: [
          'Paste your raw draft into a plain-text Text Cleaner to strip stray HTML tags, collapse repeated spaces, and convert curly typographic quotes into consistent straight quotes if needed.',
          'If your text came from a multi-column PDF with broken line endings, join hard line breaks first and then re-insert clean paragraph breaks between topics.',
          'Run headings and section titles through a Case Converter so capitalization style (such as Title Case or Sentence case) stays uniform across the entire page.',
          'Check total words, sentence count, and reading time in the Word Counter or Reading Time Calculator to confirm pacing feels balanced.',
          'Verify page titles and summary descriptions in the Character Counter so key words appear before standard truncation cutoffs.',
        ],
        example: {
          label: 'Before & After Cleanup Example',
          before: '  <p>Simple   tools  save  time. </p>\\n\\n\\n  “Write   clearly.”  ',
          after: 'Simple tools save time.\\n"Write clearly."',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Pasting rich HTML directly from word processors into plain-text forms',
        solution:
          'Strip HTML markup and normalize smart quotes first so invisible span styles or mismatched font tags do not break your page layout.',
      },
      {
        mistake: 'Ignoring word repetition when editing quickly',
        solution:
          'Check your draft with a Word Frequency Counter to spot crutch words you repeated eight or ten times in a short section.',
      },
      {
        mistake: 'Writing 200+ character search titles or descriptions',
        solution:
          'Aim for concise 50–60 character titles and 120–155 character descriptions so readers see your full message in search results.',
      },
    ],
    actionableTips: [
      'Read long sentences out loud—if you run out of breath before the period, split the sentence into two shorter statements.',
      'Front-load important facts in the first sentence of each paragraph for readers who skim.',
      'Keep one capitalization convention for all H2 and H3 subheadings across an entire document.',
      'Verify spoken scripts at 130 WPM rather than silent reading speed so presentations do not run overtime.',
    ],
    conclusion: [
      'Clean formatting and realistic pacing do not replace strong ideas—they remove the friction that stops readers from reaching them. By spending two minutes checking word structure, reading time, and stray whitespace before publishing, your articles, emails, and documentation immediately become easier to trust and finish.',
    ],
    faqs: [
      {
        question: 'What is the ideal word count for a helpful online guide?',
        answer:
          'There is no universal target. A straightforward tip may be complete in 500 words, while a detailed multi-step tutorial naturally spans 1,200 to 1,800 words. Stop when every practical question is answered without repetition.',
      },
      {
        question: 'How accurate are 200 WPM reading time estimates?',
        answer:
          '200 WPM is a reliable average for conversational English web prose. If your topic involves technical code, formulas, or unfamiliar terminology, lower the pace to 150 WPM in the Reading Time Calculator.',
      },
      {
        question: 'Should I always remove smart quotes before publishing?',
        answer:
          'Not always. Typographic curly quotes look great in prose, but straight ASCII quotes are essential when pasting code snippets, CSV rows, or plain-text configuration files.',
      },
      {
        question: 'How do I catch overused words in a long article?',
        answer:
          'Paste your finished text into the Word Frequency Counter with common stop words excluded to see your most repeated terms ranked by percentage share.',
      },
      {
        question: 'Do spaces count toward character limits on social platforms and SEO tags?',
        answer:
          'Yes. Search engines, SMS carriers, and social networks count every space and punctuation mark toward their character limits.',
      },
      {
        question: 'Why does UTF-8 byte count matter alongside character count?',
        answer:
          'Databases, SMS gateways, and API fields sometimes enforce byte limits rather than character limits, and accented characters or emojis take 2 to 4 bytes each in UTF-8.',
      },
    ],
  },
  {
    id: 'url-slugs-encoding-and-html-entities',
    slug: 'url-slugs-encoding-and-html-entities',
    path: '/guides/url-slugs-encoding-and-html-entities/',
    title: 'Understanding URL Slugs, URL Encoding, and HTML Entities for Clean Web Pages',
    category: 'Web & Internet Basics',
    readTime: '8 min read',
    publishedDate: 'November 2026',
    shortDescription:
      'A clear breakdown of how readable URL slugs, percent-encoded query strings, and escaped HTML entities prevent broken links and display bugs.',
    introduction: [
      'Every reliable web page depends on clean text handling behind the scenes. When links break after someone shares them in a chat app, or when a code snippet mysteriously disappears inside an article, the culprit is almost always unescaped characters or messy URL formatting.',
      'Three closely related concepts keep web addresses and markup predictable: URL slugs for human-readable paths, URL percent-encoding for safe query parameters, and HTML entities for displaying reserved symbols safely inside HTML documents. Mixing them up—such as using percent-encoding where an HTML entity is needed—causes subtle bugs.',
      'In this guide, we examine how each mechanism works, when to use which approach, and practical examples you can verify directly with TooloraHub’s web utilities.',
    ],
    metaTitle: 'URL Slugs, URL Encoding & HTML Entities Explained | TooloraHub Guides',
    metaDescription:
      'Learn the exact difference between readable URL slugs, percent-encoded query strings, and HTML entities with tables, steps, and common pitfalls.',
    thumbnail: '/src/assets/images/guide_web_urls_1795276690390.jpg',
    thumbnailAlt: 'Matte navy and brushed aluminum architectural blocks connected by teal filaments',
    relatedToolSlugs: [
      'slug-generator',
      'url-encoder-decoder',
      'html-entity-converter',
      'qr-code-generator',
    ],
    relatedGuideSlugs: ['word-count-and-clean-formatting', 'simple-digital-productivity-habits'],
    sections: [
      {
        heading: '01. Crafting Clean, Predictable URL Slugs',
        paragraphs: [
          'A URL slug is the descriptive path segment that identifies a specific page—for example, "word-counter" inside https://toolorahub.site/tools/word-counter/. Well-structured slugs tell both visitors and search engines what the page contains before anyone opens the link.',
          'Slugs should use lowercase ASCII letters, digits, and single hyphens between words. Avoid spaces, accented letters, punctuation marks, and uppercase variations, because web servers on Linux are case-sensitive (/About/ and /about/ can resolve differently) and spaces turn into ugly %20 sequences when copied.',
        ],
        subsections: [
          {
            heading: 'Handling Accented Letters and Punctuation in Slugs',
            paragraphs: [
              'When an article title contains accented letters (such as "résumé" or "café") or typographic apostrophes ("developer’s"), stripping them blindly would leave awkward fragments like "rsum" or "developer s". Normalizing Unicode accents via NFD decomposition folds accented letters cleanly into plain ASCII ("resume", "cafe"), while stripping apostrophes keeps contractions together ("developers").',
            ],
          },
        ],
        orderedSteps: [
          'Start with your descriptive page title rather than generic IDs like "page-12".',
          'Normalize accented letters (for example, converting "é" to "e") and strip punctuation.',
          'Replace spaces with single hyphens (-) rather than underscores (_).',
          'Optionally remove short filler words ("the", "and", "of") if the headline is very long, keeping the slug concise and readable.',
        ],
        example: {
          label: 'Headline to Clean URL Slug',
          before: '10 Tips for Clean & Fast Web Pages (2026 Edition)!',
          after: '10-tips-for-clean-fast-web-pages-2026-edition',
        },
      },
      {
        heading: '02. When and How to Use URL Percent-Encoding',
        paragraphs: [
          'Unlike page paths, query string parameters frequently carry dynamic text: search terms, filter categories, email addresses, or callback URLs. Characters such as spaces, "&", "=", "?", and "/" have special structural meaning inside a URL. If a query value contains an unencoded "&", a server interprets it as the start of a brand-new parameter and cuts your value in half.',
          'URL percent-encoding solves this by replacing unsafe or reserved characters with a "%" followed by two hexadecimal digits representing their UTF-8 bytes. For example, a space becomes %20 and an ampersand becomes %26.',
        ],
        subsections: [
          {
            heading: 'Component Encoding vs. Full URI Encoding',
            paragraphs: [
              'Choosing the wrong encoding function is one of the most common web bugs. Component encoding (encodeURIComponent) encodes structural characters like ":", "/", "?", and "&"—which is exactly what you want when placing a value inside ?q=... or ?next=.... Full URI encoding (encodeURI) leaves "https://", "/", and "?" intact so the overall web address remains navigable.',
            ],
          },
          {
            heading: 'Debugging Broken Query Strings Before Sharing Links',
            paragraphs: [
              'Marketing tracking links, search filters, and redirect URLs frequently break when an unencoded ampersand or question mark hides inside a parameter. Pasting the full link into the URL Encoder/Decoder reveals every detected key-value pair in a structured table so you can immediately verify whether parameters split as intended.',
            ],
          },
        ],
        table: {
          caption: 'Quick Reference: Slug vs. URL Encoding vs. HTML Entities',
          headers: ['Purpose', 'Example Input', 'Formatted Result', 'Tool to Use'],
          rows: [
            ['Page Path Slug', 'Word Counter & Tips', 'word-counter-tips', 'Slug Generator'],
            ['Query Parameter Value', 'text & writing', 'text%20%26%20writing', 'URL Encoder/Decoder'],
            ['Visible HTML Text', '<p>A & B</p>', '&lt;p&gt;A &amp; B&lt;/p&gt;', 'HTML Entity Converter'],
          ],
        },
      },
      {
        heading: '03. Preventing Broken Markup with HTML Entities',
        paragraphs: [
          'HTML uses angle brackets (< and >) to open and close tags, quotes (" and \') to wrap attribute values, and the ampersand (&) to begin character references. If you paste raw code examples or expressions such as "5 < 10 & 10 > 5" directly into an HTML page without escaping them, browsers may misread "< 10" as an unfinished tag and hide the rest of the line.',
          'Converting reserved characters into named or numeric HTML entities—such as &lt; for "<", &gt; for ">", &amp; for "&", and &quot; for double quotes—tells the browser to display the literal characters visibly instead of treating them as markup instructions.',
        ],
        bullets: [
          'Always escape &, <, and > inside HTML code blocks or documentation tutorials.',
          'Escape double quotes (&quot;) when inserting user-provided text inside HTML attributes.',
          'Use the HTML Entity Converter in Decode mode whenever you copy entity-laden source snippets and need clean plain text back.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Running encodeURIComponent on a complete https:// URL and breaking the link',
        solution:
          'Use Full URI encoding when keeping a complete link intact, and reserve Component encoding strictly for individual query parameter values.',
      },
      {
        mistake: 'Double-encoding already encoded URLs or HTML entities (turning &amp; into &amp;amp;)',
        solution:
          'Decode incoming strings once first or inspect query parameters in the URL Encoder/Decoder before re-encoding.',
      },
      {
        mistake: 'Changing live page slugs without setting up redirects',
        solution:
          'Finalize clean slugs before publishing whenever possible so bookmarks, QR codes, and external links stay unbroken.',
      },
    ],
    actionableTips: [
      'Test complex query links in the URL Encoder/Decoder parameter table to confirm every key and value splits cleanly.',
      'Before printing flyers or posters, encode your clean final slug into an SVG file using the QR Code Generator so scanners never hit a messy redirect.',
      'Keep slugs concise (roughly 3 to 6 words) so links stay readable when pasted into emails or chat messages.',
    ],
    conclusion: [
      'Clean URLs and properly escaped characters eliminate an entire class of silent web errors. When you know when to hyphenate a slug, when to percent-encode a parameter, and when to escape an HTML entity, your links stay shareable and your pages render reliably across every browser.',
    ],
    faqs: [
      {
        question: 'Why do spaces turn into %20 or + in web addresses?',
        answer:
          'URLs cannot contain literal spaces. General percent-encoding replaces spaces with %20, while HTML form query strings (application/x-www-form-urlencoded) often represent spaces as "+".',
      },
      {
        question: 'Are underscores bad for URL slugs?',
        answer:
          'Underscores are technically valid in URLs, but hyphens are standard practice because search engines and users read hyphenated words as separate terms.',
      },
      {
        question: 'What is the difference between &amp; and &#38;?',
        answer:
          'Both render the exact same "&" ampersand character in HTML. &amp; is a named entity that is easier for humans to read, while &#38; is its decimal numeric code.',
      },
      {
        question: 'Can a URL slug contain uppercase letters?',
        answer:
          'While technically allowed, lowercase slugs prevent accidental 404 errors on case-sensitive web servers and look cleaner when shared.',
      },
      {
        question: 'Do I need to escape single apostrophes in regular HTML paragraphs?',
        answer:
          'Inside normal paragraph text, literal apostrophes work fine, though escaping them as &#39; is important inside single-quoted HTML attributes.',
      },
      {
        question: 'Should I encode URLs before placing them inside a QR code?',
        answer:
          'Keep the base URL readable, and only percent-encode spaces or special query parameter values so mobile scanners open the exact intended destination.',
      },
    ],
  },
  {
    id: 'practical-everyday-calculations',
    slug: 'practical-everyday-calculations',
    path: '/guides/practical-everyday-calculations/',
    title: 'Practical Everyday Calculations: Percentages, Discounts, Dates, and Unit Conversions',
    category: 'Everyday Calculations',
    readTime: '7 min read',
    publishedDate: 'November 2026',
    shortDescription:
      'Step-by-step explanations and mental sanity checks for percentages, retail markdowns, working-day date spans, and metric-to-imperial conversions.',
    introduction: [
      'Most day-to-day math problems do not involve advanced calculus—they involve checking whether a 25% store discount plus 8% sales tax matches the receipt, calculating how many working days remain before a deadline, or converting recipe and travel measurements between metric and imperial units.',
      'Even simple arithmetic goes wrong when small details are overlooked: confusing percentage points with relative percentage change, applying tax before a discount, or forgetting that calendar months vary between 28 and 31 days.',
      'This guide walks through the exact formulas behind these four everyday calculations, highlights common traps, and shows how to double-check numbers quickly.',
    ],
    metaTitle: 'Practical Everyday Calculations Guide | TooloraHub Guides',
    metaDescription:
      'Understand percentage change vs. percentage points, discount plus tax order, weekday date counting, and metric/imperial unit conversion formulas.',
    thumbnail: '/src/assets/images/guide_everyday_math_1795276690069.jpg',
    thumbnailAlt: 'Brushed metal ruler resting on navy calculator keys beside geometric prisms',
    relatedToolSlugs: [
      'percentage-calculator',
      'discount-calculator',
      'age-calculator',
      'date-difference-calculator',
      'unit-converter',
    ],
    relatedGuideSlugs: ['simple-digital-productivity-habits'],
    sections: [
      {
        heading: 'Percentage Change vs. Percentage Points',
        paragraphs: [
          'Suppose a conversion rate or interest rate moves from 20% to 25%. Describing that shift requires care because two completely different numbers are both accurate depending on wording: it rose by 5 percentage points, which is a 25% relative increase (5 / 20 = 0.25).',
          'Another classic asymmetry appears when a number drops and rises by the same percentage. If a $100 item drops by 20% to $80, raising $80 by 20% brings it only to $96—not back to $100—because the second percentage operates on a smaller base.',
        ],
        table: {
          caption: 'Three Core Percentage Formulas',
          headers: ['Question', 'Formula', 'Quick Example'],
          rows: [
            ['What is X% of Y?', '(X / 100) × Y', '15% of 240 = 36'],
            ['X is what % of Y?', '(X / Y) × 100', '45 of 180 = 25%'],
            ['% change from A to B', '((B − A) / |A|) × 100', '120 to 150 = +25%'],
          ],
        },
      },
      {
        heading: 'Calculating Discounts and Sales Tax in the Right Order',
        paragraphs: [
          'When an item goes on sale, first compute the savings (Original Price × Discount % / 100), subtract savings to get the discounted subtotal, and then apply sales tax to that discounted subtotal. Interestingly, because multiplication commutes, (Price × 0.75) × 1.08 gives the exact same final price as (Price × 1.08) × 0.75—as long as both are percentage rates.',
          'However, if you have a fixed dollar coupon (such as $15 off) alongside a percentage discount, order matters significantly. Merchants almost always apply fixed coupons and tax rules according to local receipt policies, so calculating each step separately in the Discount Calculator makes itemized receipts easy to verify.',
        ],
        subsections: [
          {
            heading: 'Worked Retail Receipt Check',
            paragraphs: [
              'Suppose a jacket listed at $160.00 is marked 30% off in a region with 7.5% sales tax. First, calculate 30% savings: $160.00 × 0.30 = $48.00 saved, leaving a discounted subtotal of $112.00. Next, apply 7.5% sales tax to $112.00: $112.00 × 0.075 = $8.40. Adding tax brings the final total to $120.40.',
            ],
          },
        ],
      },
      {
        heading: 'Measuring Calendar Spans, Ages, and Working Weekdays',
        paragraphs: [
          'Dividing total days by 30 or 365 gives only a rough guess for durations because February has 28 or 29 days and seven months have 31 days. Accurate age and date difference calculations walk actual calendar boundaries, borrowing the preceding month’s exact length whenever the target day is smaller than the start day.',
          'For project scheduling, shipping windows, or billing cycles, total calendar days can also be misleading. A 14-day window from Monday to the second Sunday contains only 10 working weekdays (Monday–Friday) and 4 weekend days. Checking both counts in the Date Difference Calculator prevents overly optimistic deadlines.',
        ],
        bullets: [
          'Use "Include end date (+1 day)" when both the start day and end day are active workdays or booking days.',
          'Remember that standard weekday counts exclude Saturdays and Sundays, but regional public holidays still need manual subtraction.',
        ],
      },
      {
        heading: 'Metric, Imperial, and Binary Data Unit Conversions',
        paragraphs: [
          'Everyday conversions span travel (kilometers to miles), cooking (milliliters to cups), weather and baking (Celsius to Fahrenheit), and file sizes (megabytes to gigabytes). Metric units scale cleanly in powers of 10, while US customary units use irregular ratios (12 inches per foot, 3 feet per yard, 1,760 yards per mile).',
          'For temperature, remember that Celsius and Fahrenheit do not share the same zero point: multiplying by 9/5 and adding 32 converts °C to °F, while subtracting 32 and multiplying by 5/9 reverses it. For digital storage, operating systems traditionally display binary multiples where 1 GB equals 1,024 MB.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming a 20% discount followed by an extra 10% coupon equals 30% off',
        solution:
          'Stacked discounts multiply sequentially: 20% off leaves 80%, and 10% off 80% leaves 72%—which is a 28% total discount, not 30%.',
      },
      {
        mistake: 'Off-by-one errors when counting days between project dates',
        solution:
          'Decide explicitly whether you are counting nights/intervals (exclude end date) or total active days including start and finish (check Include end date).',
      },
      {
        mistake: 'Mixing up US liquid gallons (3.785 L) with UK Imperial gallons (4.546 L)',
        solution:
          'Check which measurement standard a recipe or manual specifies before converting liquid volumes.',
      },
    ],
    actionableTips: [
      'Do a 10% mental sanity check before trusting any calculator entry: 10% of $240 is $24, so 15% must be $36.',
      'Use the Age Calculator’s custom "Age at Date" field to verify eligibility cutoffs for upcoming school terms or travel dates.',
      'Verify unit direction with the Swap button in the Unit Converter if a converted number looks unexpectedly large or small.',
    ],
    conclusion: [
      'Clear math starts with knowing which formula applies—whether you are checking percentage growth, verifying a sale receipt, counting weekdays on a project timeline, or converting units across measurement systems. Pair simple mental estimates with clean step-by-step calculators to keep everyday numbers reliable.',
    ],
    faqs: [
      {
        question: 'Why does a 20% drop followed by a 20% gain not return to the starting price?',
        answer:
          'Because the 20% gain applies to the smaller reduced amount rather than the original starting value ($100 → $80 → $96).',
      },
      {
        question: 'How do you convert Celsius to Fahrenheit mentally for a quick check?',
        answer:
          'A fast rough estimate is to double the Celsius temperature and add 30. For exact cooking or scientific numbers, use (C × 9/5) + 32 in the Unit Converter.',
      },
      {
        question: 'Does the Date Difference Calculator account for leap years?',
        answer:
          'Yes. Calendar calculations recognize February 29 in leap years such as 2024 and 2028 automatically.',
      },
      {
        question: 'How is sales tax handled on discounted items?',
        answer:
          'In our Discount Calculator, tax percentage is calculated on the discounted subtotal after subtracting the markdown amount.',
      },
      {
        question: 'Why are 1,000 MB and 1,024 MB both used for gigabytes?',
        answer:
          'Drive manufacturers often market capacity in decimal gigabytes (1,000 MB), while operating systems commonly report memory and file sizes in binary gibibytes (1,024 MB).',
      },
      {
        question: 'How does the Age Calculator handle February 29 birthdays in regular years?',
        answer:
          'During non-leap years, standard calendar arithmetic rolls February 29 forward to March 1 when calculating the upcoming birthday countdown.',
      },
    ],
  },
  {
    id: 'simple-digital-productivity-habits',
    slug: 'simple-digital-productivity-habits',
    path: '/guides/simple-digital-productivity-habits/',
    title: 'Simple Digital Productivity Habits: Organizing Text, QR Links, and Design Gradients',
    category: 'Digital Productivity',
    readTime: '7 min read',
    publishedDate: 'November 2026',
    shortDescription:
      'Practical browser-based workflows for replacing heavy software installs when building wireframes, printable QR codes, CSS gradients, and time logs.',
    introduction: [
      'A surprising amount of daily desk time disappears into small utility tasks: totaling three sessions on a timesheet, generating a QR code for an event handout, dropping placeholder text into a wireframe, or tweaking a clean two-color CSS gradient for a card header.',
      'Launching heavy desktop suites or hunting through disorganized bookmarks for each tiny task breaks concentration. Building lightweight habits around reliable browser tools keeps small tasks under sixty seconds so you can return to meaningful work.',
      'Here is a practical look at four everyday workflows—QR codes, time math, placeholder layout copy, and CSS gradients—plus checklists to avoid rework.',
    ],
    metaTitle: 'Simple Digital Productivity Habits | TooloraHub Guides',
    metaDescription:
      'Replace heavy app launches with fast browser workflows for scannable SVG QR codes, base-60 time logs, Lorem Ipsum mockups, and CSS gradients.',
    thumbnail: '/src/assets/images/guide_digital_workflow_1795276690065.jpg',
    thumbnailAlt: 'Overhead view of organized desk with laptop, brass compass, and index cards',
    relatedToolSlugs: [
      'qr-code-generator',
      'time-calculator',
      'lorem-ipsum-generator',
      'gradient-generator',
      'text-reverser',
    ],
    relatedGuideSlugs: ['url-slugs-encoding-and-html-entities', 'word-count-and-clean-formatting'],
    sections: [
      {
        heading: '1. Creating Print-Ready QR Codes Without Fragile Links',
        paragraphs: [
          'QR codes appear on workshop flyers, product packaging, restaurant menus, and presentation slides. Two technical mistakes ruin printed QR codes: low color contrast and blurry low-resolution raster scaling.',
          'Always keep strong contrast between foreground modules and background paper—dark navy (#12345A) or pure black on a clean white background scans reliably even under dim indoor lighting. Avoid inverted light-on-dark codes unless you test them across multiple phone cameras first.',
        ],
        bullets: [
          'Download SVG whenever printing on posters, business cards, or brochures so edges stay razor sharp at any scale.',
          'Choose Medium (15%) error correction for clean digital screens, or Quartile/High (25%–30%) for stickers or outdoor signage.',
          'Always scan the finished code with two different phones before sending files to print.',
        ],
      },
      {
        heading: '2. Adding Up Work Sessions and Clock Spans Without Base-60 Mistakes',
        paragraphs: [
          'Time uses base-60 (60 seconds per minute, 60 minutes per hour), whereas calculators and spreadsheets default to base-100 decimals. Entering "1.45 + 1.30" on a regular calculator gives 2.75 instead of 3 hours and 15 minutes—a frequent source of timesheet errors.',
          'Using a dedicated Time Calculator lets you add mixed hours, minutes, and seconds directly and immediately view both normalized HH:MM:SS and decimal hours (such as 3.25 hours) ready for invoicing or study logs.',
        ],
        table: {
          caption: 'Quick Clock Minutes to Decimal Hours Reference',
          headers: ['Minutes', 'Decimal Hours', 'Minutes', 'Decimal Hours'],
          rows: [
            ['10 min', '0.17 hrs', '40 min', '0.67 hrs'],
            ['15 min', '0.25 hrs', '45 min', '0.75 hrs'],
            ['20 min', '0.33 hrs', '50 min', '0.83 hrs'],
            ['30 min', '0.50 hrs', '60 min', '1.00 hrs'],
          ],
        },
      },
      {
        heading: '3. Testing Page Layouts with Placeholder Copy and Clean CSS Gradients',
        paragraphs: [
          'When designing a landing page or report template before final copy arrives, pasting realistic paragraph lengths from the Lorem Ipsum Generator helps you verify line heights, column balance, and mobile card heights without getting distracted by unfinished sentences.',
          'Similarly, subtle two-stop gradients add gentle depth to presentation covers or hero banners without loading large background photographs. Building gradients in the CSS Gradient Generator lets you adjust exact stop percentages, copy clean CSS directly, or export a 1200 × 800 PNG background for slide decks.',
        ],
        subsections: [
          {
            heading: 'Keeping Contrast Accessible When Placing Text Over Gradients',
            paragraphs: [
              'If white or light text sits over a gradient banner, check readability at the lightest stop—not just the darkest corner. Keeping stop hues within a close luminance range (for example, deep navy #12345A into mid slate-blue #1E4D7B) ensures headlines stay legible across the entire width of the card.',
            ],
          },
        ],
      },
      {
        heading: '4. Reversing Lists and Sequences Quickly in Plain Text',
        paragraphs: [
          'Exported activity logs, chronological notes, or study flashcards frequently arrive in reverse order from what a document needs. Rather than dragging rows manually one by one, pasting a list into the Text Reverser in "Reverse Line Order" mode flips bottom-to-top sequence in a single click.',
          'When testing layout mirroring, word-order transformations, or puzzle formatting, switching to "Reverse Word Order" or "Flip Each Word" handles the restructuring cleanly without writing a custom script.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using low-contrast pastel colors for QR codes on printed flyers',
        solution:
          'Phone camera scanners rely on luminance contrast; keep the foreground dark and the background light and clean.',
      },
      {
        mistake: 'Adding 1 hour 30 minutes as 1.30 in a financial spreadsheet',
        solution:
          'Convert minutes by dividing by 60 (30 / 60 = 0.50) or read the Decimal Hours tile directly in the Time Calculator.',
      },
      {
        mistake: 'Leaving Lorem Ipsum placeholder paragraphs in a published page',
        solution:
          'Search your finished site for the word "lorem" before launch as part of your final checklist.',
      },
    ],
    actionableTips: [
      'Use Ctrl/Cmd + K from anywhere on TooloraHub to jump directly between utilities in seconds.',
      'Prefer SVG QR exports for print and PNG exports for quick slide decks or emails.',
      'Keep CSS gradients understated (two close hues or subtle angle shifts) so foreground text stays readable.',
    ],
    conclusion: [
      'Staying productive at the computer is rarely about buying more software—it is about removing small sources of friction. With fast browser utilities for QR codes, base-60 time math, placeholder copy, and CSS gradients, routine preparation takes moments instead of interrupting your focus.',
    ],
    faqs: [
      {
        question: 'Do static QR codes generated in a browser stop working after a trial period?',
        answer:
          'No. Static QR codes encode your URL or text directly into the square pattern, so there is no subscription or third-party redirect that can expire.',
      },
      {
        question: 'How do I calculate an overnight shift like 10:30 PM to 6:15 AM?',
        answer:
          'Switch the Time Calculator to "Time Between Clock Times", enter 22:30 and 06:15, and check "End time is on the next day" to get 7 hours, 45 minutes.',
      },
      {
        question: 'Can I download a CSS gradient as an image for PowerPoint or Canva?',
        answer:
          'Yes. Click Download PNG in the Gradient Generator to save a 1200 × 800 lossless PNG swatch.',
      },
      {
        question: 'When should I wrap Lorem Ipsum output in <p> tags?',
        answer:
          'Use <p> tag wrapping when pasting straight into an HTML prototype or CMS source editor; leave it unchecked for Figma or word-processor mockups.',
      },
      {
        question: 'Why does subtracting two durations sometimes show a minus sign?',
        answer:
          'If the second duration exceeds the first (for example, subtracting 2 hours from 1 hour), the Time Calculator displays the exact negative balance.',
      },
      {
        question: 'How do I flip a chronological list from newest-first to oldest-first?',
        answer:
          'Open the Text Reverser, select "Reverse Line Order", paste your list, and copy the flipped lines back out.',
      },
    ],
  },
  {
    id: 'plain-text-and-diff-comparisons',
    slug: 'plain-text-and-diff-comparisons',
    path: '/guides/plain-text-and-diff-comparisons/',
    title: 'Working with Plain Text, Line Breaks, and Diff Comparisons Across Documents',
    category: 'File & Format Guides',
    readTime: '7 min read',
    publishedDate: 'November 2026',
    shortDescription:
      'Best practices for preparing line-based lists, removing duplicate entries safely, understanding line endings, and comparing text revisions.',
    introduction: [
      'Plain text remains the backbone of everyday digital work. CSV exports, email subscriber lists, configuration files, server logs, and markdown drafts all rely on clean lines separated by consistent line breaks.',
      'Problems appear when lists pass through multiple spreadsheets or messaging apps: trailing spaces sneak onto the end of rows, duplicate entries inflate counts, Windows (CRLF) and Unix (LF) line endings mix, and subtle edits slip past manual proofreading.',
      'This guide explains how line-based plain text behaves, how to clean and deduplicate lists safely before importing them, and how line-by-line diff comparisons catch small edits immediately.',
    ],
    metaTitle: 'Plain Text, Line Breaks & Diff Comparisons Guide | TooloraHub Guides',
    metaDescription:
      'Learn how to clean line-based lists, understand LF vs CRLF line endings, remove duplicate rows safely, and compare text drafts line by line.',
    thumbnail: '/src/assets/images/guide_file_formats_1795276690129.jpg',
    thumbnailAlt: 'Stacked translucent paper sheets and matte navy folders with a teal bookmark tab',
    relatedToolSlugs: [
      'duplicate-line-remover',
      'line-counter',
      'text-diff-checker',
      'word-frequency-counter',
      'text-cleaner',
    ],
    relatedGuideSlugs: ['word-count-and-clean-formatting'],
    sections: [
      {
        heading: 'How Line Breaks Work in Plain Text Files',
        paragraphs: [
          'Although a line break looks invisible on screen, plain-text files encode new lines using control characters: Unix, macOS, and modern web environments use a single Line Feed (LF, \\n), whereas Windows Notepad and legacy formats traditionally use Carriage Return + Line Feed (CRLF, \\r\\n).',
          'Modern browser tools handle both LF and CRLF seamlessly, but trailing spaces at the end of a line often trick spreadsheet lookups and deduplication scripts. To software, "example@domain.com" and "example@domain.com " are two different strings.',
        ],
        subsections: [
          {
            heading: 'Checking Line Totals vs. Populated Lines',
            paragraphs: [
              'When pasting exported rows, a stray blank line at the bottom or gaps between sections can make a 50-item list report 54 total lines. Checking both Total Lines and Non-Empty Lines in the Line Counter verifies the true record count before you import data anywhere else.',
            ],
          },
          {
            heading: 'Spotting Hidden Trailing Whitespace Before Imports',
            paragraphs: [
              'Trailing spaces are invisible unless highlighted by an editor, yet they routinely break VLOOKUP matches and exact-string comparisons. Running exports through the Text Cleaner with "Trim line edges" enabled strips leading and trailing spaces from every row in one step.',
            ],
          },
        ],
      },
      {
        heading: 'Step-by-Step: Deduplicating and Cleaning Lists Safely',
        paragraphs: [
          'Before removing duplicates from a list of domains, tags, or contacts, decide whether capitalization matters. For email addresses or product tags, "Design" and "design" usually represent the same item. For file paths or case-sensitive IDs, keeping Case Sensitive enabled protects distinct entries.',
        ],
        orderedSteps: [
          'Paste your raw list into the Line Counter to confirm how many populated lines and blank lines exist.',
          'Open the Duplicate Line Remover with "Trim whitespace" and "Remove blank lines" enabled so trailing spaces do not hide duplicate rows.',
          'Toggle "Case sensitive" off for general tags/emails, or on for case-sensitive identifiers.',
          'Optionally sort results A–Z for easy visual scanning, then copy or download unique-lines.txt.',
        ],
      },
      {
        heading: 'Spotting Subtle Revisions with a Line Diff Checker',
        paragraphs: [
          'Imagine receiving a revised contract paragraph, terms update, or configuration snippet without tracked changes enabled. Reading both versions side by side with your eyes makes it remarkably easy to miss a single changed digit, deleted line, or reordered item.',
          'A line-by-line diff checker aligns identical lines and highlights only removed (-) and added (+) lines with dual line numbers from both the original and revised documents.',
        ],
        table: {
          caption: 'Diff Checker Comparison Options & When to Use Them',
          headers: ['Option', 'What It Ignores', 'Best Used For'],
          rows: [
            ['Default (Exact)', 'Nothing — compares every character', 'Final code, config values, exact punctuation checks'],
            ['Ignore whitespace', 'Leading/trailing spaces & repeated gaps', 'Drafts reformatted across Word, Docs, or email'],
            ['Ignore case', 'Uppercase vs. lowercase differences', 'Comparing keyword lists, titles, or tag sets'],
          ],
        },
      },
      {
        heading: 'Auditing Word Frequency Across Exported Transcripts and Notes',
        paragraphs: [
          'When reviewing survey responses, support tickets, or interview transcripts stored as plain text, counting individual word frequencies helps surface recurring themes quickly. Using the Word Frequency Counter with common English stop words filtered out highlights meaningful nouns and verbs alongside their share percentage, and lets you export the ranked table directly as a CSV spreadsheet.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Deduplicating a list without trimming trailing spaces first',
        solution:
          'Always trim line edges before deduplicating so invisible spaces at the end of lines do not prevent matches.',
      },
      {
        mistake: 'Comparing two texts that only differ in indentation or spacing',
        solution:
          'Enable "Ignore whitespace" in the Text Diff Checker so spacing noise does not hide real wording changes.',
      },
      {
        mistake: 'Forgetting that soft word-wrap is not a line break',
        solution:
          'Long paragraphs wrap visually inside narrow windows, but line counters only count explicit newline breaks.',
      },
    ],
    actionableTips: [
      'Always keep a quick backup copy of your original list before running destructive edits or sorting.',
      'Use the numbered preview in the Line Counter when referencing specific items during a review call.',
      'If a diff shows an entire paragraph as changed, split sentences onto separate lines temporarily to pinpoint the exact edited sentence.',
    ],
    conclusion: [
      'Plain text is reliable precisely because it has no hidden formatting—yet small differences in spaces, blank lines, and line endings still cause avoidable errors. Using line counters, whitespace-aware deduplication, and line diff checks together turns messy exports into clean, verifiable data in seconds.',
    ],
    faqs: [
      {
        question: 'Does the Duplicate Line Remover change the order of my list?',
        answer:
          'By default, it keeps your original order (preserving the first occurrence of each line). You can switch the Sort dropdown to A–Z or Z–A whenever you want alphabetical sorting.',
      },
      {
        question: 'Why does a line appear as both removed (-) and added (+) in the Diff Checker?',
        answer:
          'Line-level diff tools show an edited line as the old line removed (-) followed immediately by the updated line added (+) so you can compare both versions cleanly.',
      },
      {
        question: 'How do I count lines without counting empty spacing rows?',
        answer:
          'Paste your text into the Line Counter and look at the "Non-Empty" tile, which excludes blank or whitespace-only lines.',
      },
      {
        question: 'Can I export unique deduplicated lines to a file?',
        answer:
          'Yes. Click Download .txt in the Duplicate Line Remover to save your unique list as unique-lines.txt.',
      },
      {
        question: 'What happens if my pasted text ends with an extra Enter keystroke?',
        answer:
          'A trailing newline creates one empty line at the end, which increases Total Lines by 1 and Blank Lines by 1 while leaving Non-Empty Lines unchanged.',
      },
      {
        question: 'Can I export word occurrence counts to Excel or Google Sheets?',
        answer:
          'Yes. Click Export CSV inside the Word Frequency Counter to download word-frequency.csv ready to open in any spreadsheet program.',
      },
    ],
  },
];

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return ALL_GUIDES.find((guide) => guide.slug === slug);
}
