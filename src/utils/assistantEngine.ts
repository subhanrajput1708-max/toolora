import {
  TOOL_KNOWLEDGE_DATABASE,
  TOOLORA_ASSISTANT_NAME,
  type ToolKnowledgeEntry,
} from '../data/knowledgeBase.ts';
import { SITE_CONFIG } from '../data/site.ts';
import { ALL_TOOLS, TOOL_CATEGORIES, type ToolCategoryId } from '../data/tools.ts';

export interface AssistantActionLink {
  label: string;
  to: string;
  variant?: 'primary' | 'secondary';
}

export interface AssistantConversationContext {
  lastToolSlug?: string | null;
  lastCategoryId?: ToolCategoryId | null;
}

export interface AssistantReply {
  markdown: string;
  actions: AssistantActionLink[];
  matchedToolSlug?: string;
  matchedCategoryId?: ToolCategoryId;
}

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'browser',
  'by',
  'can',
  'do',
  'does',
  'easy',
  'everyday',
  'fast',
  'find',
  'for',
  'free',
  'from',
  'get',
  'have',
  'help',
  'how',
  'i',
  'in',
  'instant',
  'into',
  'is',
  'it',
  'me',
  'my',
  'need',
  'of',
  'on',
  'online',
  'or',
  'please',
  'quick',
  'right',
  'show',
  'simple',
  'some',
  'that',
  'the',
  'this',
  'to',
  'tool',
  'tools',
  'use',
  'useful',
  'want',
  'what',
  'which',
  'with',
  'would',
  'you',
  'your',
]);

const UNSUPPORTED_DOMAIN_TERMS = [
  'weather',
  'forecast',
  'temperature outside',
  'recipe',
  'cook',
  'bake',
  'football',
  'cricket',
  'movie',
  'song',
  'lyrics',
  'youtube',
  'instagram',
  'tiktok',
  'video download',
  'audio download',
  'mp3',
  'mp4',
  'pdf',
  'compress image',
  'resize image',
  'image compressor',
  'stock price',
  'crypto price',
  'bitcoin',
  'flight',
  'hotel',
  'news',
  'joke',
  'poem',
  'story',
  'translate',
  'politics',
  'president',
];

const UNKNOWN_RESPONSE_TEXT =
  "I'm designed to help you discover and use TooloraHub tools. I couldn't find a matching tool or answer for that question. Try describing what you want to calculate, convert, or do with your text.";

function normalizeText(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/%/g, ' percent ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function singularizeToken(token: string): string {
  if (token.length <= 3) return token;
  if (token === 'percentages') return 'percentage';
  if (token === 'calculators') return 'calculator';
  if (token === 'converters') return 'converter';
  if (token === 'temperatures') return 'temperature';
  if (token === 'passwords') return 'password';
  if (token === 'fractions') return 'fraction';
  if (token === 'decimals') return 'decimal';
  if (token === 'averages') return 'average';
  if (token === 'ratios') return 'ratio';
  if (token === 'discounts') return 'discount';
  if (token === 'duplicates') return 'duplicate';
  if (token === 'spaces') return 'space';
  if (token === 'words') return 'word';
  if (token === 'lines') return 'line';
  if (token === 'characters') return 'character';
  if (token === 'dates') return 'date';
  if (token === 'days') return 'day';
  if (token === 'units') return 'unit';
  if (token === 'colors' || token === 'colours') return 'color';
  if (token === 'colour') return 'color';
  if (token === 'kilograms') return 'kilogram';
  if (token === 'pounds') return 'pound';
  if (token === 'inches') return 'inch';
  if (token === 'meters' || token === 'metres') return 'meter';
  if (token === 'numbers') return 'number';
  if (token === 'checklists') return 'checklist';
  if (token === 'tasks') return 'task';
  if (token === 'timers') return 'timer';
  if (token === 'payments') return 'payment';
  if (token === 'loans') return 'loan';
  if (token === 'cleans') return 'clean';
  if (token === 'counts') return 'count';
  if (token === 'converts') return 'convert';
  if (token.endsWith('ies') && token.length > 5) return `${token.slice(0, -3)}y`;
  if (token.endsWith('s') && !token.endsWith('ss') && token.length > 4) {
    return token.slice(0, -1);
  }
  return token;
}

function tokenizeSignificant(normalized: string): string[] {
  return normalized
    .split(' ')
    .map((t) => singularizeToken(t))
    .filter((t) => t.length >= 2 && !STOP_WORDS.has(t));
}

function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 2) return 3;

  const prev = new Array<number>(b.length + 1);
  const curr = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
}

function fuzzyTokenMatch(queryToken: string, candidateToken: string): boolean {
  if (queryToken === candidateToken) return true;
  if (queryToken.length >= 4 && candidateToken.includes(queryToken)) return true;
  if (candidateToken.length >= 4 && queryToken.includes(candidateToken)) return true;

  const maxDist = queryToken.length >= 7 ? 2 : queryToken.length >= 4 ? 1 : 0;
  if (maxDist === 0) return false;
  return levenshteinDistance(queryToken, candidateToken) <= maxDist;
}

function formatToolRecommendation(
  entry: ToolKnowledgeEntry,
  extraNote?: string
): AssistantReply {
  const allEntries = TOOL_KNOWLEDGE_DATABASE;
  const relatedEntries = entry.relatedToolSlugs
    .map((slug) => allEntries.find((e) => e.slug === slug))
    .filter((e): e is ToolKnowledgeEntry => Boolean(e))
    .slice(0, 3);

  const featuresList = entry.features
    .slice(0, 4)
    .map((f) => `- ${f}`)
    .join('\n');

  const stepsList = entry.howToUse
    .slice(0, 4)
    .map((step, i) => `${i + 1}. ${step}`)
    .join('\n');

  const relatedList = relatedEntries
    .map((rel) => `- [${rel.name}](${rel.url}) — ${rel.description}`)
    .join('\n');

  const lines = [
    `**${entry.name}**`,
    entry.description,
    extraNote ? `\n${extraNote}` : '',
    `\n**What it does:**\n${entry.purpose}`,
    featuresList ? `\n**Features:**\n${featuresList}` : '',
    stepsList ? `\n**How to use it:**\n${stepsList}` : '',
    `\n**Open Tool:** [${entry.name}](${entry.url})`,
    relatedList ? `\n**Related Tools:**\n${relatedList}` : '',
  ].filter(Boolean);

  return {
    markdown: lines.join('\n'),
    matchedToolSlug: entry.slug,
    matchedCategoryId: entry.categoryId,
    actions: [
      { label: `Open ${entry.name}`, to: entry.url, variant: 'primary' },
      { label: `More ${entry.shortCategory}`, to: `/tools/?category=${entry.categoryId}`, variant: 'secondary' },
    ],
  };
}

function formatCategoryList(categoryId: ToolCategoryId): AssistantReply {
  const category = TOOL_CATEGORIES.find((c) => c.id === categoryId) ?? TOOL_CATEGORIES[0];
  const tools = TOOL_KNOWLEDGE_DATABASE.filter((t) => t.categoryId === category.id);

  const toolLines = tools
    .map((t) => `- [${t.name}](${t.url}) — ${t.description}`)
    .join('\n');

  return {
    markdown: [
      `**${category.name} (${tools.length} Tools)**`,
      category.description,
      '',
      toolLines,
      '',
      `Click any tool above to open it directly, or browse the filtered category directory.`,
    ].join('\n'),
    matchedCategoryId: category.id,
    actions: [
      {
        label: `View ${category.shortName} Directory`,
        to: `/tools/?category=${category.id}`,
        variant: 'primary',
      },
      { label: 'Explore All Tools', to: '/#explore-all-tools', variant: 'secondary' },
    ],
  };
}

function formatAllToolsDirectory(): AssistantReply {
  const sections = TOOL_CATEGORIES.map((category) => {
    const tools = TOOL_KNOWLEDGE_DATABASE.filter((t) => t.categoryId === category.id);
    const links = tools.map((t) => `- [${t.name}](${t.url})`).join('\n');
    return `**${category.name} (${tools.length})**\n${links}`;
  });

  return {
    markdown: [
      `TooloraHub currently includes **${ALL_TOOLS.length} free browser tools** organized into **${TOOL_CATEGORIES.length} categories**:`,
      '',
      ...sections,
    ].join('\n\n'),
    actions: [
      { label: 'Explore All Tools', to: '/#explore-all-tools', variant: 'primary' },
      { label: 'Open Full Directory', to: '/tools/', variant: 'secondary' },
    ],
  };
}

function tryComputeQuickPercentHint(rawInput: string): string | undefined {
  const match = /\b(\d+(?:\.\d+)?)\s*(?:%|percent)\s+of\s+(\d+(?:\.\d+)?)\b/i.exec(rawInput);
  if (!match) return undefined;
  const pct = Number(match[1]);
  const total = Number(match[2]);
  if (!Number.isFinite(pct) || !Number.isFinite(total)) return undefined;
  const result = Number(((pct / 100) * total).toFixed(4));
  return `**Quick Answer:** ${pct}% of ${total} is **${result}**. You can also run any percentage, increase, or decrease check in the tool below.`;
}

function detectCategoryRequest(normalized: string): ToolCategoryId | null {
  // Never hijack an exact tool name match (e.g. "Week Number Calculator", "Unit Converter")
  if (TOOL_KNOWLEDGE_DATABASE.some((t) => normalizeText(t.name) === normalized)) {
    return null;
  }

  // Distinguish specific singular tool intent ("find me a useful productivity tool") from broad category listing
  const wantsSpecificSingleTool =
    /\b(a|an|one)\s+(useful\s+)?(text|calculator|finance|date|time|conversion|productivity|web)\s+tool\b/.test(
      normalized
    ) && !/\b(all|list|available|which|show me|what)\b/.test(normalized);

  if (wantsSpecificSingleTool) {
    return null;
  }

  const hasBrowseSignal =
    /\b(all|list|show|what|which|available|find|browse|categories|category|have|see)\b/.test(normalized) ||
    normalized.split(' ').length <= 3;

  if (!hasBrowseSignal) return null;

  if (/\b(text|writing|formatting)\s+tool/.test(normalized) || normalized === 'text tools') {
    return 'text-tools';
  }
  const isGenericCalculatorBrowse =
    /\b(calculators|math tools|calculation tools|calculator tools)\b/.test(normalized) ||
    /^(find a|show me a|show a|open a|need a|a)?\s*calculator$/.test(normalized);
  if (
    isGenericCalculatorBrowse &&
    !/\b(percentage|discount|age|bmi|emi|loan|tip|average|ratio|fuel|reading|time|date|compound|profit|week|interest)\b/.test(
      normalized
    )
  ) {
    return 'calculators';
  }
  if (/\b(finance|financial|money)\s+tool/.test(normalized) || normalized === 'finance tools') {
    return 'finance-tools';
  }
  if (
    /\b(date|time|date and time|date time)\s+tool/.test(normalized) ||
    normalized === 'date tools'
  ) {
    return 'date-time-tools';
  }
  if (
    /\b(conversion|converter|converters)\s+tool/.test(normalized) ||
    /\bshow\s+(me\s+)?conversion\b/.test(normalized)
  ) {
    return 'conversion-tools';
  }
  if (
    /\b(productivity)\s+tool/.test(normalized) &&
    (/\b(all|which|available|list|show)\b/.test(normalized) || normalized === 'productivity tools')
  ) {
    return 'productivity-tools';
  }
  if (/\b(web|developer|dev)\s+tool/.test(normalized) || normalized === 'web tools') {
    return 'web-tools';
  }

  return null;
}

interface RuleBoost {
  slug: string;
  patterns: RegExp[];
  score: number;
}

const INTENT_RULES: RuleBoost[] = [
  {
    slug: 'percentage-calculator',
    patterns: [/\b(percent|percentage|percentages|percent of)\b/],
    score: 95,
  },
  {
    slug: 'discount-calculator',
    patterns: [/\b(discount|sale price|percent off|coupon|markdown)\b/],
    score: 105,
  },
  {
    slug: 'loan-emi-calculator',
    patterns: [/\b(loan|emi|mortgage|monthly payment|installment|amortization)\b/],
    score: 105,
  },
  {
    slug: 'compound-interest-calculator',
    patterns: [/\b(compound interest|investment growth|savings growth|apy|compound)\b/],
    score: 105,
  },
  {
    slug: 'profit-margin-calculator',
    patterns: [/\b(profit margin|gross margin|markup|profit)\b/],
    score: 100,
  },
  {
    slug: 'tip-calculator',
    patterns: [/\b(tip|gratuity|split bill|restaurant bill)\b/],
    score: 100,
  },
  {
    slug: 'bmi-calculator',
    patterns: [/\b(bmi|body mass|weight category)\b/],
    score: 105,
  },
  {
    slug: 'fuel-trip-cost-calculator',
    patterns: [/\b(fuel|gas cost|petrol|trip cost|mpg|road trip)\b/],
    score: 100,
  },
  {
    slug: 'average-calculator',
    patterns: [/\b(average|mean|median|mode)\b/],
    score: 95,
  },
  {
    slug: 'ratio-calculator',
    patterns: [/\b(ratio|proportion|aspect ratio)\b/],
    score: 95,
  },
  {
    slug: 'fraction-percentage-converter',
    patterns: [/\b(fraction|mixed number|simplify fraction)\b/],
    score: 95,
  },
  {
    slug: 'age-calculator',
    patterns: [/\b(age|how old|birthday|birth date|date of birth|dob)\b/],
    score: 100,
  },
  {
    slug: 'date-difference-calculator',
    patterns: [/\b(date difference|days between|business days|working days|weekdays between)\b/],
    score: 100,
  },
  {
    slug: 'add-days-to-date',
    patterns: [/\b(add days|subtract days|future date|days from today|days ago)\b/],
    score: 100,
  },
  {
    slug: 'week-number-calculator',
    patterns: [/\b(week number|iso week|calendar week)\b/],
    score: 100,
  },
  {
    slug: 'countdown-timer',
    patterns: [/\b(countdown|countdown timer)\b/],
    score: 100,
  },
  {
    slug: 'time-calculator',
    patterns: [/\b(time calculator|add hours|subtract hours|duration math)\b/],
    score: 95,
  },
  {
    slug: 'text-cleaner',
    patterns: [/\b(clean text|cleans text|clean this text|extra spaces|remove spaces|strip html|whitespace)\b/],
    score: 105,
  },
  {
    slug: 'word-counter',
    patterns: [/\b(word counter|word count|count words|counts words|how many words)\b/],
    score: 105,
  },
  {
    slug: 'character-counter',
    patterns: [/\b(character counter|character count|count characters|char count|tweet length|meta length)\b/],
    score: 105,
  },
  {
    slug: 'case-converter',
    patterns: [/\b(case converter|uppercase|lowercase|title case|sentence case|camelcase|snake case|capitalize)\b/],
    score: 100,
  },
  {
    slug: 'duplicate-line-remover',
    patterns: [/\b(duplicate|deduplicate|unique lines|repeated lines)\b/],
    score: 100,
  },
  {
    slug: 'text-diff-checker',
    patterns: [/\b(diff|compare text|text difference|compare drafts)\b/],
    score: 100,
  },
  {
    slug: 'line-counter',
    patterns: [/\b(line counter|count lines|how many lines)\b/],
    score: 100,
  },
  {
    slug: 'word-frequency-counter',
    patterns: [/\b(word frequency|keyword density|repeated words|word occurrence)\b/],
    score: 100,
  },
  {
    slug: 'lorem-ipsum-generator',
    patterns: [/\b(lorem ipsum|placeholder text|dummy text)\b/],
    score: 100,
  },
  {
    slug: 'text-reverser',
    patterns: [/\b(reverse text|text reverser|backwards text|flip text)\b/],
    score: 100,
  },
  {
    slug: 'line-break-formatter',
    patterns: [/\b(line break|remove line breaks|wrap lines|unwrap text|newlines)\b/],
    score: 100,
  },
  {
    slug: 'list-sorter-randomizer',
    patterns: [/\b(sort list|alphabetize|shuffle list|randomize list)\b/],
    score: 100,
  },
  {
    slug: 'reading-time-calculator',
    patterns: [/\b(reading time|speaking time|minutes to read|wpm)\b/],
    score: 100,
  },
  {
    slug: 'temperature-converter',
    patterns: [/\b(temperature|celsius|fahrenheit|kelvin|c to f|f to c)\b/],
    score: 105,
  },
  {
    slug: 'weight-converter',
    patterns: [/\b(weight|kilogram|kilograms|kg|pound|pounds|lbs|ounce|ounces|grams to)\b/],
    score: 105,
  },
  {
    slug: 'length-converter',
    patterns: [/\b(length|meters to|feet to|inches to|km to miles|miles to km|centimeters)\b/],
    score: 100,
  },
  {
    slug: 'data-storage-converter',
    patterns: [/\b(data storage|megabyte|gigabyte|terabyte|mb to gb|gb to tb|kibibyte)\b/],
    score: 105,
  },
  {
    slug: 'color-converter',
    patterns: [/\b(color converter|hex to rgb|rgb to hsl|wcag contrast|color picker)\b/],
    score: 100,
  },
  {
    slug: 'number-base-converter',
    patterns: [/\b(number base|binary|octal|hexadecimal|decimal to binary)\b/],
    score: 100,
  },
  {
    slug: 'unit-converter',
    patterns: [/\b(unit converter|convert units|measurement converter)\b/],
    score: 95,
  },
  {
    slug: 'pomodoro-timer',
    patterns: [/\b(pomodoro|focus timer|study timer)\b/],
    score: 105,
  },
  {
    slug: 'stopwatch',
    patterns: [/\b(stopwatch|lap timer|chronometer)\b/],
    score: 105,
  },
  {
    slug: 'checklist-maker',
    patterns: [/\b(checklist|todo|to do list|packing list)\b/],
    score: 100,
  },
  {
    slug: 'simple-task-planner',
    patterns: [/\b(task planner|daily planner|prioritize tasks|task priorities)\b/],
    score: 100,
  },
  {
    slug: 'notes-formatter',
    patterns: [/\b(notes formatter|format notes|meeting notes|markdown notes)\b/],
    score: 100,
  },
  {
    slug: 'random-number-generator',
    patterns: [/\b(random number|rng|dice|coin flip|pick a number)\b/],
    score: 100,
  },
  {
    slug: 'slug-generator',
    patterns: [/\b(slug|url slug|permalink)\b/],
    score: 100,
  },
  {
    slug: 'url-encoder-decoder',
    patterns: [/\b(url encode|url decode|url encoder|query string)\b/],
    score: 100,
  },
  {
    slug: 'html-entity-converter',
    patterns: [/\b(html entity|html entities|escape html|decode html)\b/],
    score: 100,
  },
  {
    slug: 'qr-code-generator',
    patterns: [/\b(qr code|qr|barcode)\b/],
    score: 105,
  },
  {
    slug: 'gradient-generator',
    patterns: [/\b(gradient|css gradient|linear gradient|radial gradient)\b/],
    score: 100,
  },
  {
    slug: 'password-generator',
    patterns: [/\b(password|strong password|random password|secure password)\b/],
    score: 105,
  },
  {
    slug: 'json-formatter-validator',
    patterns: [/\b(json|pretty print json|format json|validate json|minify json|lint json)\b/],
    score: 105,
  },
];

function scoreToolMatches(
  normalized: string,
  tokens: string[]
): Array<{ entry: ToolKnowledgeEntry; score: number }> {
  const entries = TOOL_KNOWLEDGE_DATABASE;
  const scores = new Map<string, number>();

  for (const entry of entries) {
    let score = 0;
    const nameNorm = normalizeText(entry.name);
    const descNorm = normalizeText(entry.description);
    const purposeNorm = normalizeText(entry.purpose);

    // 1. Exact tool name or full name phrase containment
    if (normalized === nameNorm) {
      score += 150;
    } else if (normalized.includes(nameNorm)) {
      score += 110;
    }

    // 2. Multi-word keyword & synonym phrases
    for (const kw of entry.keywords) {
      const kwNorm = normalizeText(kw);
      if (!kwNorm) continue;
      if (normalized === kwNorm) {
        score += 90;
      } else if (kwNorm.includes(' ') && normalized.includes(kwNorm)) {
        score += 75;
      }
    }

    // 3. Explicit intent rules
    for (const rule of INTENT_RULES) {
      if (rule.slug === entry.slug && rule.patterns.some((re) => re.test(normalized))) {
        score += rule.score;
      }
    }

    // 4. Token-level exact + fuzzy matching across name, keywords, description, purpose
    const nameTokens = nameNorm
      .split(' ')
      .map(singularizeToken)
      .filter((w) => w.length >= 2 && !STOP_WORDS.has(w));

    const candidateWordPool = Array.from(
      new Set([
        ...nameTokens,
        ...entry.keywords.flatMap((k) => normalizeText(k).split(' ').map(singularizeToken)),
      ])
    ).filter((w) => w.length >= 2 && !STOP_WORDS.has(w));

    const descTokens = Array.from(
      new Set([
        ...descNorm.split(' ').map(singularizeToken),
        ...purposeNorm.split(' ').map(singularizeToken),
      ])
    ).filter((w) => w.length >= 3 && !STOP_WORDS.has(w));

    let matchedSignificantTokens = 0;
    for (const qToken of tokens) {
      let tokenScore = 0;
      for (const nToken of nameTokens) {
        if (qToken === nToken) {
          tokenScore = Math.max(tokenScore, 32);
        } else if (
          qToken.length >= 6 &&
          nToken.length >= 6 &&
          nToken !== 'calculator' &&
          nToken !== 'converter' &&
          nToken !== 'generator' &&
          levenshteinDistance(qToken, nToken) <= 1
        ) {
          tokenScore = Math.max(tokenScore, 28);
        }
      }
      for (const cToken of candidateWordPool) {
        if (qToken === cToken) {
          tokenScore = Math.max(tokenScore, 24);
        } else if (fuzzyTokenMatch(qToken, cToken)) {
          tokenScore = Math.max(tokenScore, 16);
        }
      }
      if (tokenScore === 0) {
        for (const dToken of descTokens) {
          if (qToken === dToken) {
            tokenScore = Math.max(tokenScore, 10);
          } else if (fuzzyTokenMatch(qToken, dToken)) {
            tokenScore = Math.max(tokenScore, 6);
          }
        }
      }
      if (tokenScore > 0) {
        matchedSignificantTokens += 1;
        score += tokenScore;
      }
    }

    if (tokens.length >= 2 && matchedSignificantTokens >= 2) {
      score += 14;
    }

    if (score > 0) {
      scores.set(entry.slug, score);
    }
  }

  return entries
    .map((entry) => ({ entry, score: scores.get(entry.slug) ?? 0 }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function generateAssistantReply(
  rawInput: string,
  context: AssistantConversationContext = {}
): AssistantReply {
  const trimmed = rawInput.trim();

  // 1. Empty message handling
  if (!trimmed) {
    return {
      markdown:
        'Please type what tool or task you are looking for—for example, **"calculate percentages"**, **"clean text"**, or **"show all tools"**.',
      actions: [
        { label: 'Explore All Tools', to: '/#explore-all-tools', variant: 'primary' },
        { label: 'Browse Categories', to: '/tools/', variant: 'secondary' },
      ],
    };
  }

  const normalized = normalizeText(trimmed);
  const tokens = tokenizeSignificant(normalized);

  // 2. Friendly greetings, thanks, and farewells
  if (
    /^(hello|hello there|hello toolora)\b/.test(normalized) &&
    tokens.filter((t) => t !== 'hello' && t !== 'there' && t !== 'toolora').length === 0
  ) {
    return {
      markdown:
        "Hello! What are you trying to accomplish? I'll help you find the right TooloraHub tool.",
      actions: [
        { label: 'Explore All Tools', to: '/#explore-all-tools', variant: 'primary' },
      ],
    };
  }

  if (
    /^(hi|hey|salam|assalam|good morning|good afternoon|good evening)\b/.test(normalized) &&
    tokens.filter(
      (t) =>
        ![
          'hi',
          'hey',
          'there',
          'salam',
          'assalam',
          'good',
          'morning',
          'afternoon',
          'evening',
          'toolora',
        ].includes(t)
    ).length === 0
  ) {
    return {
      markdown:
        'Hi! Welcome to TooloraHub 👋 I can help you find the right tool for calculations, text editing, conversions, and everyday tasks. What would you like to do?',
      actions: [
        { label: 'Explore All Tools', to: '/#explore-all-tools', variant: 'primary' },
      ],
    };
  }

  if (/^(thank|thanks|thank you|thx|ty)\b/.test(normalized) && normalized.split(' ').length <= 5) {
    return {
      markdown: "You're welcome! If you need another tool, just ask.",
      actions: [],
    };
  }

  if (/^(bye|goodbye|see you|take care)\b/.test(normalized) && normalized.split(' ').length <= 5) {
    return {
      markdown: 'Thanks for visiting TooloraHub. See you again!',
      actions: [],
    };
  }

  // 3. Assistant capability & "help me find the right tool" prompts
  if (
    /^(what can you do|who are you|how can you help|help me|help me find the right tool)$/.test(
      normalized
    )
  ) {
    if (normalized === 'help me find the right tool') {
      const catLinks = TOOL_CATEGORIES.map(
        (c) => `- [${c.name} (${c.toolCount})](/tools/?category=${c.id}) — ${c.description}`
      ).join('\n');
      return {
        markdown: [
          `Tell me what task you want to complete—for example: *"calculate loan EMI"*, *"remove extra spaces"*, *"convert kg to lbs"*, *"generate a strong password"*, or *"format JSON"*.`,
          '',
          `**Or pick a category below (${ALL_TOOLS.length} tools total):**`,
          catLinks,
        ].join('\n'),
        actions: [
          { label: 'Explore All Tools', to: '/#explore-all-tools', variant: 'primary' },
          { label: 'Browse Categories', to: '/tools/', variant: 'secondary' },
        ],
      };
    }

    return {
      markdown:
        'I can help you discover TooloraHub tools. Tell me what you need—calculate a percentage, convert units, clean text, count words, or find a useful tool.',
      actions: [
        { label: 'Explore All Tools', to: '/#explore-all-tools', variant: 'primary' },
        { label: 'Browse Categories', to: '/tools/', variant: 'secondary' },
      ],
    };
  }

  // 4. Explicit check for clearly unrelated / unsupported topics before fuzzy matching stray words
  const hitsUnsupported = UNSUPPORTED_DOMAIN_TERMS.some((term) => normalized.includes(term));
  if (hitsUnsupported && !/\b(qr|gradient|color|percentage|discount|json|password|word|text)\b/.test(normalized)) {
    return {
      markdown: UNKNOWN_RESPONSE_TEXT,
      actions: [
        { label: 'Explore All Tools', to: '/#explore-all-tools', variant: 'primary' },
        { label: 'Browse Categories', to: '/tools/', variant: 'secondary' },
      ],
    };
  }

  // 5. Follow-up question referencing the previously matched tool
  if (
    context.lastToolSlug &&
    /\b(how to use it|how do i use it|features|open it|related tools|tell me more|more details)\b/.test(
      normalized
    )
  ) {
    const prev = TOOL_KNOWLEDGE_DATABASE.find((t) => t.slug === context.lastToolSlug);
    if (prev) {
      return formatToolRecommendation(prev);
    }
  }

  // 6. Show All Tools / Website Capabilities directory intent
  if (
    /\b(what tools are available|which tools are available|show( me)? all( available)? tools|list all( toolora| toolorahub)? tools|all tools|what can this website do|complete list of tools)\b/.test(
      normalized
    )
  ) {
    return formatAllToolsDirectory();
  }

  // 7. Website Info / About / Developer / Contact / Privacy / Sitemap intents
  if (
    /\b(about toolorahub|tell me about toolorahub|tell me about this site|what is toolorahub|who made toolorahub|who built toolorahub|developer|muhammad subhan|is toolorahub free|how does toolorahub work|contact|privacy policy|terms|disclaimer|sitemap)\b/.test(
      normalized
    )
  ) {
    return {
      markdown: [
        `**About ${SITE_CONFIG.name}** — *${SITE_CONFIG.tagline}*`,
        `${SITE_CONFIG.name} offers **${ALL_TOOLS.length} free browser-based utilities** across **${TOOL_CATEGORIES.length} categories**—including Text & Formatting, Calculators, Finance Tools, Date & Time Tools, Conversion Tools, Productivity Tools, and Web & Developer Tools.`,
        '',
        '- **Runs Locally:** All tools and Toolora Assistant work directly inside your browser with no sign-ups or external AI services.',
        `- **Developer:** Maintained by **${SITE_CONFIG.developer.name}** (${SITE_CONFIG.developer.experience}).`,
        `- **Contact:** Email ${SITE_CONFIG.developer.email} or visit our [Contact Us](/contact/) page for feedback or tool ideas.`,
        '',
        'Helpful pages: [About Us](/about/) · [Sitemap](/sitemap/) · [Privacy Policy](/privacy-policy/) · [Terms & Conditions](/terms-and-conditions/) · [Disclaimer](/disclaimer/)',
      ].join('\n'),
      actions: [
        { label: 'Open Sitemap', to: '/sitemap/', variant: 'primary' },
        { label: 'Explore All Tools', to: '/#explore-all-tools', variant: 'secondary' },
      ],
    };
  }

  // 8. Category listing requests (e.g. "Show me calculators", "Show me text tools", "Show me date tools")
  const matchedCategory = detectCategoryRequest(normalized);
  if (matchedCategory) {
    return formatCategoryList(matchedCategory);
  }

  // 9. Singular productivity recommendation ("Find me a useful productivity tool.")
  if (/\buseful productivity tool\b|\ba productivity tool\b|\brecommend a productivity tool\b/.test(normalized)) {
    const pick = TOOL_KNOWLEDGE_DATABASE.find((t) => t.slug === 'pomodoro-timer');
    if (pick) {
      return formatToolRecommendation(
        pick,
        'Looking for something else in Productivity? Try Checklist Maker, Simple Task Planner, Notes Formatter, Online Stopwatch, or Random Number Generator below.'
      );
    }
  }

  // 10. Specific tool / task matching engine
  const ranked = scoreToolMatches(normalized, tokens);
  const top = ranked[0];

  if (top && top.score >= 28) {
    const percentHint =
      top.entry.slug === 'percentage-calculator'
        ? tryComputeQuickPercentHint(trimmed)
        : undefined;
    return formatToolRecommendation(top.entry, percentHint);
  }

  // 11. Honest out-of-scope fallback (Requirement 10)
  return {
    markdown: UNKNOWN_RESPONSE_TEXT,
    actions: [
      { label: 'Explore All Tools', to: '/#explore-all-tools', variant: 'primary' },
      { label: 'Browse Categories', to: '/tools/', variant: 'secondary' },
    ],
  };
}

export { TOOLORA_ASSISTANT_NAME };
