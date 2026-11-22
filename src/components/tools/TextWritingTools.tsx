import { useMemo, useState } from 'react';
import { ArrowLeftRight, Download } from 'lucide-react';
import { ClearButton, CopyButton, StatTile, downloadTextFile } from './ToolSharedUI';

const SAMPLE_WRITING =
  'TooloraHub brings practical online utilities into one clean workspace. Whether you need to count words, clean up copied text, convert letter cases, or check line differences, every tool works right in your browser without extra steps.';

// 1. Word Counter
export function WordCounterTool() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const characters = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const sentences = trimmed
      ? trimmed.split(/[.!?]+(?:\s|$)/).filter((s) => s.trim().length > 0).length
      : 0;
    const paragraphs = trimmed
      ? trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
      : 0;
    const lines = text ? text.split(/\r?\n/).length : 0;
    const readingSec = Math.ceil((words / 200) * 60);
    const speakingSec = Math.ceil((words / 130) * 60);

    const formatDuration = (sec: number) => {
      if (sec === 0) return '0s';
      const mins = Math.floor(sec / 60);
      const rem = sec % 60;
      if (mins === 0) return `${rem}s`;
      return `${mins}m ${rem}s`;
    };

    return {
      words,
      characters,
      charsNoSpaces,
      sentences,
      paragraphs,
      lines,
      readingTime: formatDuration(readingSec),
      speakingTime: formatDuration(speakingSec),
    };
  }, [text]);

  const summary = `Words: ${stats.words} | Characters: ${stats.characters} (${stats.charsNoSpaces} without spaces) | Sentences: ${stats.sentences} | Paragraphs: ${stats.paragraphs} | Reading Time: ${stats.readingTime}`;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatTile label="Words" value={stats.words} />
        <StatTile label="Characters" value={stats.characters} />
        <StatTile label="No Spaces" value={stats.charsNoSpaces} />
        <StatTile label="Sentences" value={stats.sentences} />
        <StatTile label="Paragraphs" value={stats.paragraphs} />
        <StatTile label="Lines" value={stats.lines} />
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <label htmlFor="word-counter-input" className="text-sm font-medium text-[#12345A]">
            Enter or paste your text
          </label>
          <button
            type="button"
            onClick={() => setText(SAMPLE_WRITING)}
            className="text-xs font-medium text-[#0C8588] hover:text-[#12345A] underline underline-offset-2"
          >
            Load sample text
          </button>
        </div>
        <textarea
          id="word-counter-input"
          rows={9}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your article, essay, or notes here..."
          className="w-full p-4 rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm sm:text-base text-[#10243E] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40 focus:border-[#16C6C9]"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 border-t border-[#E6EEF7]">
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B617D] tabular-nums">
          <span>
            Estimated reading time: <strong className="text-[#12345A]">{stats.readingTime}</strong> (200 WPM)
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Speaking time: <strong className="text-[#12345A]">{stats.speakingTime}</strong> (130 WPM)
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CopyButton value={summary} label="Copy Summary" disabled={stats.words === 0} />
          <ClearButton onClick={() => setText('')} disabled={!text} />
        </div>
      </div>
    </div>
  );
}

// 2. Case Converter
export function CaseConverterTool() {
  const [text, setText] = useState('');

  // Keeps internal apostrophes lowercase (e.g. "don't" -> "Don't", not "Don'T")
  const toTitleCase = (str: string) =>
    str
      .toLowerCase()
      .replace(/(^|[\s\-_/(\["“])([a-z])/g, (_, prefix: string, char: string) => `${prefix}${char.toUpperCase()}`);

  const toSentenceCase = (str: string) =>
    str
      .toLowerCase()
      .replace(/(^\s*[a-z]|[.!?]\s+[a-z])/g, (match) => match.toUpperCase());

  const getWords = (str: string) =>
    str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  const toCamelCase = (str: string) => {
    const words = getWords(str);
    return words
      .map((w, idx) =>
        idx === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      )
      .join('');
  };

  const toPascalCase = (str: string) =>
    getWords(str)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join('');

  const toSnakeCase = (str: string) =>
    getWords(str)
      .map((w) => w.toLowerCase())
      .join('_');

  const toKebabCase = (str: string) =>
    getWords(str)
      .map((w) => w.toLowerCase())
      .join('-');

  const toAlternatingCase = (str: string) =>
    Array.from(str)
      .map((ch, idx) => (idx % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase()))
      .join('');

  const transforms = [
    { label: 'Sentence case', fn: () => setText(toSentenceCase(text)) },
    { label: 'lowercase', fn: () => setText(text.toLowerCase()) },
    { label: 'UPPERCASE', fn: () => setText(text.toUpperCase()) },
    { label: 'Title Case', fn: () => setText(toTitleCase(text)) },
    { label: 'camelCase', fn: () => setText(toCamelCase(text)) },
    { label: 'PascalCase', fn: () => setText(toPascalCase(text)) },
    { label: 'snake_case', fn: () => setText(toSnakeCase(text)) },
    { label: 'kebab-case', fn: () => setText(toKebabCase(text)) },
    { label: 'aLtErNaTiNg', fn: () => setText(toAlternatingCase(text)) },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor="case-converter-input" className="text-sm font-medium text-[#12345A]">
          Input &amp; converted text
        </label>
        <button
          type="button"
          onClick={() => setText("Simple tools don't have to feel complicated")}
          className="text-xs font-medium text-[#0C8588] hover:text-[#12345A] underline underline-offset-2"
        >
          Load sample phrase
        </button>
      </div>

      <textarea
        id="case-converter-input"
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text to convert its capitalization..."
        className="w-full p-4 rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm sm:text-base text-[#10243E] focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40 focus:border-[#16C6C9]"
      />

      <div className="flex flex-wrap gap-2">
        {transforms.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.fn}
            disabled={!text.trim()}
            className="h-10 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#F8FBFF] text-sm font-medium text-[#12345A] hover:border-[#16C6C9] hover:bg-white transition-colors disabled:opacity-45 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E6EEF7]">
        <span className="text-xs text-[#5B708B] tabular-nums">
          {text.length} characters · {text.trim() ? text.trim().split(/\s+/).length : 0} words
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <CopyButton value={text} label="Copy Text" />
          <ClearButton onClick={() => setText('')} disabled={!text} />
        </div>
      </div>
    </div>
  );
}

// 3. Text Cleaner
export function TextCleanerTool() {
  const [input, setInput] = useState('');
  const [trimLines, setTrimLines] = useState(true);
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [removeBlankLines, setRemoveBlankLines] = useState(true);
  const [removeLineBreaks, setRemoveLineBreaks] = useState(false);
  const [stripHtml, setStripHtml] = useState(true);
  const [normalizeQuotes, setNormalizeQuotes] = useState(true);
  const [removePunctuation, setRemovePunctuation] = useState(false);

  const cleaned = useMemo(() => {
    let out = input;
    if (stripHtml) {
      out = out.replace(/<[^>]*>/g, ' ');
    }
    if (normalizeQuotes) {
      out = out
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2013\u2014]/g, '-');
    }
    if (removePunctuation) {
      out = out.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, '');
    }
    if (trimLines) {
      out = out
        .split(/\r?\n/)
        .map((line) => line.trim())
        .join('\n');
    }
    if (collapseSpaces) {
      out = out
        .split(/\r?\n/)
        .map((line) => line.replace(/[ \t]{2,}/g, ' '))
        .join('\n');
    }
    if (removeBlankLines) {
      out = out
        .split(/\r?\n/)
        .filter((line) => line.trim().length > 0)
        .join('\n');
    }
    if (removeLineBreaks) {
      out = out.replace(/\r?\n+/g, ' ').replace(/\s{2,}/g, ' ').trim();
    }
    return out;
  }, [
    input,
    trimLines,
    collapseSpaces,
    removeBlankLines,
    removeLineBreaks,
    stripHtml,
    normalizeQuotes,
    removePunctuation,
  ]);

  const options = [
    { label: 'Trim line edges', checked: trimLines, set: setTrimLines },
    { label: 'Collapse multiple spaces', checked: collapseSpaces, set: setCollapseSpaces },
    { label: 'Remove blank lines', checked: removeBlankLines, set: setRemoveBlankLines },
    { label: 'Join all line breaks', checked: removeLineBreaks, set: setRemoveLineBreaks },
    { label: 'Strip HTML tags', checked: stripHtml, set: setStripHtml },
    { label: 'Normalize smart quotes', checked: normalizeQuotes, set: setNormalizeQuotes },
    { label: 'Remove punctuation', checked: removePunctuation, set: setRemovePunctuation },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-[#F8FBFF] border border-[#E2EAF4]">
        {options.map((opt) => (
          <label
            key={opt.label}
            className="inline-flex items-center gap-2 text-sm text-[#12345A] cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={opt.checked}
              onChange={(e) => opt.set(e.target.checked)}
              className="w-4 h-4 rounded accent-[#12345A]"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="text-cleaner-input" className="text-sm font-medium text-[#12345A]">
              Original Text
            </label>
            <button
              type="button"
              onClick={() =>
                setInput(
                  '  <p>Hello   world! </p>\n\n\n  “Quoted   text”   with   extra spaces.  \n  Second   line.  '
                )
              }
              className="text-xs font-medium text-[#0C8588] hover:text-[#12345A] underline underline-offset-2"
            >
              Load messy sample
            </button>
          </div>
          <textarea
            id="text-cleaner-input"
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste messy text here..."
            className="w-full p-3.5 rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm text-[#10243E] focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="text-cleaner-output" className="text-sm font-medium text-[#12345A]">
              Cleaned Output
            </label>
            <span className="text-xs text-[#5B708B] tabular-nums">{cleaned.length} chars</span>
          </div>
          <textarea
            id="text-cleaner-output"
            rows={8}
            value={cleaned}
            readOnly
            placeholder="Cleaned output appears automatically..."
            className="w-full p-3.5 rounded-xl border border-[#D4E0EE] bg-[#F8FBFF] text-sm text-[#10243E] focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <span className="text-xs text-[#5B708B] tabular-nums">
          Reduced by {Math.max(0, input.length - cleaned.length)} characters
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <CopyButton value={cleaned} label="Copy Cleaned Text" />
          <ClearButton onClick={() => setInput('')} disabled={!input} />
        </div>
      </div>
    </div>
  );
}

// 4. Duplicate Line Remover
export function DuplicateLineRemoverTool() {
  const [input, setInput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [ignoreBlank, setIgnoreBlank] = useState(true);
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

  const result = useMemo(() => {
    const rawLines = input ? input.split(/\r?\n/) : [];
    const seen = new Set<string>();
    const unique: string[] = [];

    for (const raw of rawLines) {
      const line = trimLines ? raw.trim() : raw;
      if (ignoreBlank && line.trim() === '') continue;
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(line);
      }
    }

    if (sortOrder === 'asc') {
      unique.sort((a, b) => a.localeCompare(b));
    } else if (sortOrder === 'desc') {
      unique.sort((a, b) => b.localeCompare(a));
    }

    return {
      output: unique.join('\n'),
      totalLines: rawLines.length,
      uniqueLines: unique.length,
      removedCount: Math.max(0, rawLines.length - unique.length),
    };
  }, [input, caseSensitive, trimLines, ignoreBlank, sortOrder]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-[#F8FBFF] border border-[#E2EAF4]">
        <label className="inline-flex items-center gap-2 text-sm text-[#12345A] cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="w-4 h-4 accent-[#12345A]"
          />
          <span>Case sensitive</span>
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-[#12345A] cursor-pointer">
          <input
            type="checkbox"
            checked={trimLines}
            onChange={(e) => setTrimLines(e.target.checked)}
            className="w-4 h-4 accent-[#12345A]"
          />
          <span>Trim whitespace</span>
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-[#12345A] cursor-pointer">
          <input
            type="checkbox"
            checked={ignoreBlank}
            onChange={(e) => setIgnoreBlank(e.target.checked)}
            className="w-4 h-4 accent-[#12345A]"
          />
          <span>Remove blank lines</span>
        </label>
        <div className="flex items-center gap-2 ml-auto">
          <label htmlFor="dedup-sort" className="text-xs font-medium text-[#5B708B]">
            Sort:
          </label>
          <select
            id="dedup-sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'none' | 'asc' | 'desc')}
            className="h-9 px-2.5 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            <option value="none">Keep original order</option>
            <option value="asc">Sort A–Z</option>
            <option value="desc">Sort Z–A</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="dedup-input" className="text-sm font-medium text-[#12345A]">
              Input List ({result.totalLines} lines)
            </label>
            <button
              type="button"
              onClick={() =>
                setInput('Apple\nBanana\napple\nOrange\nBanana\nGrape\nOrange\nMango')
              }
              className="text-xs font-medium text-[#0C8588] hover:text-[#12345A] underline underline-offset-2"
            >
              Load sample list
            </button>
          </div>
          <textarea
            id="dedup-input"
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste one item per line..."
            className="w-full p-3.5 rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm font-mono text-[#10243E] focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="dedup-output" className="text-sm font-medium text-[#12345A]">
              Unique Lines ({result.uniqueLines} lines)
            </label>
            <span className="text-xs text-[#0C8588] font-medium tabular-nums">
              {result.removedCount} removed
            </span>
          </div>
          <textarea
            id="dedup-output"
            rows={8}
            value={result.output}
            readOnly
            placeholder="Unique lines will appear here..."
            className="w-full p-3.5 rounded-xl border border-[#D4E0EE] bg-[#F8FBFF] text-sm font-mono text-[#10243E] focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          disabled={!result.output}
          onClick={() => downloadTextFile('unique-lines.txt', result.output)}
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9] disabled:opacity-45 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
          <span>Download .txt</span>
        </button>
        <CopyButton value={result.output} label="Copy Unique Lines" />
        <ClearButton onClick={() => setInput('')} disabled={!input} />
      </div>
    </div>
  );
}

// 5. Character Counter
export function CharacterCounterTool() {
  const [text, setText] = useState('');

  const metrics = useMemo(() => {
    const total = text.length;
    const noSpaces = text.replace(/\s/g, '').length;
    const letters = (text.match(/\p{L}/gu) || []).length;
    const digits = (text.match(/\p{N}/gu) || []).length;
    const spaces = (text.match(/\s/g) || []).length;
    const punctuation = Math.max(0, total - letters - digits - spaces);
    const bytes = new TextEncoder().encode(text).length;

    return { total, noSpaces, letters, digits, spaces, punctuation, bytes };
  }, [text]);

  const limits = [
    { name: 'SEO Title Tag', max: 60 },
    { name: 'SEO Meta Description', max: 160 },
    { name: 'Standard SMS Segment', max: 160 },
    { name: 'Social Post (Short)', max: 280 },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatTile label="Characters" value={metrics.total} />
        <StatTile label="No Spaces" value={metrics.noSpaces} />
        <StatTile label="Letters" value={metrics.letters} />
        <StatTile label="Digits" value={metrics.digits} />
        <StatTile label="Punctuation" value={metrics.punctuation} />
        <StatTile label="UTF-8 Bytes" value={metrics.bytes} />
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <label htmlFor="char-counter-input" className="text-sm font-medium text-[#12345A]">
            Text to inspect
          </label>
          <button
            type="button"
            onClick={() =>
              setText('Free online utilities for writing, URLs, and everyday math — TooloraHub.')
            }
            className="text-xs font-medium text-[#0C8588] hover:text-[#12345A] underline underline-offset-2"
          >
            Load sample text
          </button>
        </div>
        <textarea
          id="char-counter-input"
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste headlines, meta descriptions, or short posts..."
          className="w-full p-4 rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm sm:text-base text-[#10243E] focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {limits.map((lim) => {
          const pct = Math.min(100, Math.round((metrics.total / lim.max) * 100));
          const over = metrics.total > lim.max;
          return (
            <div key={lim.name} className="p-3.5 rounded-lg border border-[#E2EAF4] bg-[#F8FBFF]">
              <div className="flex items-center justify-between text-xs font-medium mb-2">
                <span className="text-[#12345A]">{lim.name}</span>
                <span className={`tabular-nums ${over ? 'text-[#B32D2A]' : 'text-[#4B617D]'}`}>
                  {metrics.total} / {lim.max} {over ? '(Over limit)' : ''}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E2EAF4] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-150 ${
                    over ? 'bg-[#C83E3B]' : 'bg-[#16C6C9]'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <CopyButton value={text} label="Copy Text" />
        <ClearButton onClick={() => setText('')} disabled={!text} />
      </div>
    </div>
  );
}

// 6. Text Diff Checker (Prefix/Suffix trimmed LCS with large-input guard)
interface DiffLine {
  type: 'equal' | 'added' | 'removed';
  text: string;
  leftNum?: number;
  rightNum?: number;
}

const MAX_LCS_CELLS = 1_200_000;

function computeLineDiff(
  leftText: string,
  rightText: string,
  ignoreCase: boolean,
  ignoreWhitespace: boolean
): { lines: DiffLine[]; fallbackUsed: boolean } {
  const leftLines = leftText === '' ? [] : leftText.split(/\r?\n/);
  const rightLines = rightText === '' ? [] : rightText.split(/\r?\n/);

  const normalize = (s: string) => {
    let val = ignoreWhitespace ? s.trim().replace(/\s+/g, ' ') : s;
    if (ignoreCase) val = val.toLowerCase();
    return val;
  };

  // Trim identical prefix and suffix first to shrink DP matrix
  let prefixLen = 0;
  while (
    prefixLen < leftLines.length &&
    prefixLen < rightLines.length &&
    normalize(leftLines[prefixLen]) === normalize(rightLines[prefixLen])
  ) {
    prefixLen++;
  }

  let suffixLen = 0;
  while (
    suffixLen < leftLines.length - prefixLen &&
    suffixLen < rightLines.length - prefixLen &&
    normalize(leftLines[leftLines.length - 1 - suffixLen]) ===
      normalize(rightLines[rightLines.length - 1 - suffixLen])
  ) {
    suffixLen++;
  }

  const prefix: DiffLine[] = [];
  for (let p = 0; p < prefixLen; p++) {
    prefix.push({ type: 'equal', text: rightLines[p], leftNum: p + 1, rightNum: p + 1 });
  }

  const midLeft = leftLines.slice(prefixLen, leftLines.length - suffixLen);
  const midRight = rightLines.slice(prefixLen, rightLines.length - suffixLen);
  const m = midLeft.length;
  const n = midRight.length;

  const midResult: DiffLine[] = [];
  let fallbackUsed = false;

  if (m * n > MAX_LCS_CELLS) {
    // Linear line-by-line fallback for huge divergent texts to prevent browser memory crash
    fallbackUsed = true;
    const maxMid = Math.max(m, n);
    for (let k = 0; k < maxMid; k++) {
      const hasL = k < m;
      const hasR = k < n;
      if (hasL && hasR && normalize(midLeft[k]) === normalize(midRight[k])) {
        midResult.push({
          type: 'equal',
          text: midRight[k],
          leftNum: prefixLen + k + 1,
          rightNum: prefixLen + k + 1,
        });
      } else {
        if (hasL) {
          midResult.push({ type: 'removed', text: midLeft[k], leftNum: prefixLen + k + 1 });
        }
        if (hasR) {
          midResult.push({ type: 'added', text: midRight[k], rightNum: prefixLen + k + 1 });
        }
      }
    }
  } else {
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = m - 1; i >= 0; i--) {
      for (let j = n - 1; j >= 0; j--) {
        if (normalize(midLeft[i]) === normalize(midRight[j])) {
          dp[i][j] = dp[i + 1][j + 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
        }
      }
    }

    let i = 0;
    let j = 0;
    while (i < m && j < n) {
      if (normalize(midLeft[i]) === normalize(midRight[j])) {
        midResult.push({
          type: 'equal',
          text: midRight[j],
          leftNum: prefixLen + i + 1,
          rightNum: prefixLen + j + 1,
        });
        i++;
        j++;
      } else if (dp[i + 1][j] >= dp[i][j + 1]) {
        midResult.push({ type: 'removed', text: midLeft[i], leftNum: prefixLen + i + 1 });
        i++;
      } else {
        midResult.push({ type: 'added', text: midRight[j], rightNum: prefixLen + j + 1 });
        j++;
      }
    }
    while (i < m) {
      midResult.push({ type: 'removed', text: midLeft[i], leftNum: prefixLen + i + 1 });
      i++;
    }
    while (j < n) {
      midResult.push({ type: 'added', text: midRight[j], rightNum: prefixLen + j + 1 });
      j++;
    }
  }

  const suffix: DiffLine[] = [];
  for (let s = 0; s < suffixLen; s++) {
    const lIdx = leftLines.length - suffixLen + s;
    const rIdx = rightLines.length - suffixLen + s;
    suffix.push({
      type: 'equal',
      text: rightLines[rIdx],
      leftNum: lIdx + 1,
      rightNum: rIdx + 1,
    });
  }

  return { lines: [...prefix, ...midResult, ...suffix], fallbackUsed };
}

const SAMPLE_DIFF_ORIG =
  'TooloraHub provides free online tools.\nWord Counter\nCase Converter\nText Cleaner';
const SAMPLE_DIFF_MOD =
  'TooloraHub provides free, fast online tools.\nWord Counter\nCharacter Counter\nCase Converter\nText Cleaner';

export function TextDiffCheckerTool() {
  const [original, setOriginal] = useState(SAMPLE_DIFF_ORIG);
  const [modified, setModified] = useState(SAMPLE_DIFF_MOD);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);

  const { lines: diff, fallbackUsed } = useMemo(
    () => computeLineDiff(original, modified, ignoreCase, ignoreWhitespace),
    [original, modified, ignoreCase, ignoreWhitespace]
  );

  const summary = useMemo(() => {
    const added = diff.filter((d) => d.type === 'added').length;
    const removed = diff.filter((d) => d.type === 'removed').length;
    const unchanged = diff.filter((d) => d.type === 'equal').length;
    return { added, removed, unchanged };
  }, [diff]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-[#F8FBFF] border border-[#E2EAF4]">
        <div className="flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-2 text-sm text-[#12345A] cursor-pointer">
            <input
              type="checkbox"
              checked={ignoreWhitespace}
              onChange={(e) => setIgnoreWhitespace(e.target.checked)}
              className="w-4 h-4 accent-[#12345A]"
            />
            <span>Ignore whitespace</span>
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-[#12345A] cursor-pointer">
            <input
              type="checkbox"
              checked={ignoreCase}
              onChange={(e) => setIgnoreCase(e.target.checked)}
              className="w-4 h-4 accent-[#12345A]"
            />
            <span>Ignore case</span>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOriginal(SAMPLE_DIFF_ORIG);
              setModified(SAMPLE_DIFF_MOD);
            }}
            className="text-xs font-medium text-[#0C8588] hover:text-[#12345A] underline underline-offset-2 px-2"
          >
            Load sample
          </button>
          <button
            type="button"
            onClick={() => {
              setOriginal(modified);
              setModified(original);
            }}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[#D4E0EE] bg-white text-xs font-medium text-[#12345A] hover:border-[#16C6C9]"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#0FA7AA]" aria-hidden="true" />
            <span>Swap Texts</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label htmlFor="diff-original" className="block text-sm font-medium text-[#12345A] mb-1.5">
            Original Text
          </label>
          <textarea
            id="diff-original"
            rows={7}
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original text..."
            className="w-full p-3.5 rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm font-mono text-[#10243E] focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40"
          />
        </div>
        <div>
          <label htmlFor="diff-modified" className="block text-sm font-medium text-[#12345A] mb-1.5">
            Modified Text
          </label>
          <textarea
            id="diff-modified"
            rows={7}
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste revised text..."
            className="w-full p-3.5 rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm font-mono text-[#10243E] focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40"
          />
        </div>
      </div>

      {fallbackUsed && (
        <div role="status" className="p-3 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E]">
          Very large differing text detected—using fast line-index comparison to keep your browser responsive.
        </div>
      )}

      <div className="rounded-xl border border-[#DCE5F0] overflow-hidden">
        <div className="px-4 py-2.5 bg-[#F8FBFF] border-b border-[#DCE5F0] flex flex-wrap items-center justify-between gap-2 text-xs font-medium">
          <span className="text-[#12345A]">Line-by-Line Comparison</span>
          <div className="flex items-center gap-4 tabular-nums">
            <span className="text-[#047857]">+ {summary.added} added</span>
            <span className="text-[#B32D2A]">- {summary.removed} removed</span>
            <span className="text-[#5B708B]">{summary.unchanged} unchanged</span>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto font-mono text-xs sm:text-sm divide-y divide-[#F0F4F9] bg-white">
          {diff.length === 0 ? (
            <div className="p-6 text-center text-[#5B708B]">Enter text above to see differences.</div>
          ) : (
            diff.map((line, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 px-3 py-1.5 ${
                  line.type === 'added'
                    ? 'bg-[#ECFDF5] text-[#065F46]'
                    : line.type === 'removed'
                    ? 'bg-[#FEF2F2] text-[#991B1B]'
                    : 'text-[#233953]'
                }`}
              >
                <span className="w-8 shrink-0 text-right text-[#7E92AA] select-none tabular-nums">
                  {line.leftNum ?? ''}
                </span>
                <span className="w-8 shrink-0 text-right text-[#7E92AA] select-none tabular-nums">
                  {line.rightNum ?? ''}
                </span>
                <span className="w-4 shrink-0 font-bold select-none">
                  {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                </span>
                <span className="whitespace-pre-wrap break-words flex-1">
                  {line.text || ' '}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <ClearButton
          onClick={() => {
            setOriginal('');
            setModified('');
          }}
          disabled={!original && !modified}
        />
      </div>
    </div>
  );
}

// 7. Line Counter
const MAX_LINE_PREVIEW = 500;

export function LineCounterTool() {
  const [text, setText] = useState('');
  const [showNumbered, setShowNumbered] = useState(true);

  const stats = useMemo(() => {
    const lines = text === '' ? [] : text.split(/\r?\n/);
    const nonEmpty = lines.filter((l) => l.trim().length > 0);
    const blank = lines.length - nonEmpty.length;
    const longest = lines.reduce((max, l) => Math.max(max, l.length), 0);
    const avgWords =
      nonEmpty.length > 0
        ? (
            nonEmpty.reduce((sum, l) => sum + (l.trim() ? l.trim().split(/\s+/).length : 0), 0) /
            nonEmpty.length
          ).toFixed(1)
        : '0';

    return {
      lines,
      total: lines.length,
      nonEmpty: nonEmpty.length,
      blank,
      longest,
      avgWords,
    };
  }, [text]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatTile label="Total Lines" value={stats.total} />
        <StatTile label="Non-Empty" value={stats.nonEmpty} />
        <StatTile label="Blank Lines" value={stats.blank} />
        <StatTile label="Longest Line" value={`${stats.longest} ch`} />
        <StatTile label="Avg Words / Line" value={stats.avgWords} />
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <label htmlFor="line-counter-input" className="text-sm font-medium text-[#12345A]">
            Paste your lines
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                setText('First line item\nSecond line item\n\nFourth line after blank row\nFifth final line')
              }
              className="text-xs font-medium text-[#0C8588] hover:text-[#12345A] underline underline-offset-2"
            >
              Load sample lines
            </button>
            <label className="inline-flex items-center gap-2 text-xs text-[#39506B] cursor-pointer">
              <input
                type="checkbox"
                checked={showNumbered}
                onChange={(e) => setShowNumbered(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#12345A]"
              />
              <span>Show numbered preview</span>
            </label>
          </div>
        </div>
        <textarea
          id="line-counter-input"
          rows={7}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text, notes, or lists here to inspect line counts..."
          className="w-full p-3.5 rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm font-mono text-[#10243E] focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40"
        />
      </div>

      {showNumbered && stats.lines.length > 0 && (
        <div className="rounded-xl border border-[#DCE5F0] bg-[#F8FBFF] overflow-hidden">
          {stats.lines.length > MAX_LINE_PREVIEW && (
            <div className="px-3 py-2 bg-[#EEF6FB] border-b border-[#DCE5F0] text-xs text-[#39506B]">
              Showing first {MAX_LINE_PREVIEW} of {stats.lines.length.toLocaleString()} lines in preview. All lines are included in the counts above.
            </div>
          )}
          <div className="max-h-64 overflow-y-auto divide-y divide-[#EAEFF7] font-mono text-xs sm:text-sm">
            {stats.lines.slice(0, MAX_LINE_PREVIEW).map((line, i) => (
              <div key={i} className="flex items-start gap-3 px-3 py-1.5">
                <span className="w-8 shrink-0 text-right text-[#7E92AA] select-none tabular-nums">
                  {i + 1}
                </span>
                <span className="whitespace-pre-wrap break-words text-[#10243E]">
                  {line || <span className="text-[#93A7BF] italic">(blank line)</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <CopyButton
          value={`Total Lines: ${stats.total} | Non-Empty: ${stats.nonEmpty} | Blank: ${stats.blank}`}
          label="Copy Counts"
          disabled={stats.total === 0}
        />
        <ClearButton onClick={() => setText('')} disabled={!text} />
      </div>
    </div>
  );
}

// 8. Word Frequency Counter
const STOP_WORDS = new Set([
  'the', 'and', 'a', 'an', 'of', 'to', 'in', 'is', 'it', 'that', 'for', 'on', 'with',
  'as', 'at', 'by', 'from', 'or', 'are', 'was', 'be', 'this', 'which', 'but', 'not',
  'have', 'has', 'had', 'we', 'you', 'they', 'their', 'its', 'can', 'will', 'your',
]);

const SAMPLE_FREQUENCY =
  'Simple tools help you work smarter every day. Good tools save time, keep everyday work organized, and make writing clearer.';

export function WordFrequencyCounterTool() {
  const [text, setText] = useState(SAMPLE_FREQUENCY);
  const [ignoreStopWords, setIgnoreStopWords] = useState(true);
  const [minLength, setMinLength] = useState(2);

  const frequency = useMemo(() => {
    const rawTokens = text.toLowerCase().match(/[\p{L}\p{N}']+/gu) || [];
    const words = rawTokens
      .map((w) => w.replace(/^'+|'+$/g, ''))
      .filter((w) => {
        if (!w || w.length < minLength) return false;
        if (ignoreStopWords && STOP_WORDS.has(w)) return false;
        return true;
      });

    const counts = new Map<string, number>();
    for (const word of words) {
      counts.set(word, (counts.get(word) ?? 0) + 1);
    }

    const total = words.length;
    const rows = Array.from(counts.entries())
      .map(([word, count]) => ({
        word,
        count,
        percent: total > 0 ? ((count / total) * 100).toFixed(1) : '0.0',
      }))
      .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word));

    return { total, unique: rows.length, rows };
  }, [text, ignoreStopWords, minLength]);

  const exportCsv = () => {
    const csv = ['Word,Count,Share (%)']
      .concat(frequency.rows.map((r) => `"${r.word.replace(/"/g, '""')}",${r.count},${r.percent}`))
      .join('\n');
    downloadTextFile('word-frequency.csv', csv, 'text/csv;charset=utf-8');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#F8FBFF] border border-[#E2EAF4]">
        <label className="inline-flex items-center gap-2 text-sm text-[#12345A] cursor-pointer">
          <input
            type="checkbox"
            checked={ignoreStopWords}
            onChange={(e) => setIgnoreStopWords(e.target.checked)}
            className="w-4 h-4 accent-[#12345A]"
          />
          <span>Exclude common stop words (the, and, is...)</span>
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setText(SAMPLE_FREQUENCY)}
            className="text-xs font-medium text-[#0C8588] hover:text-[#12345A] underline underline-offset-2"
          >
            Load sample
          </button>
          <div className="flex items-center gap-2">
            <label htmlFor="min-word-len" className="text-xs font-medium text-[#5B708B]">
              Min word length:
            </label>
            <select
              id="min-word-len"
              value={minLength}
              onChange={(e) => setMinLength(Number(e.target.value))}
              className="h-9 px-2.5 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
            >
              <option value={1}>1+ chars</option>
              <option value={2}>2+ chars</option>
              <option value={3}>3+ chars</option>
              <option value={4}>4+ chars</option>
            </select>
          </div>
        </div>
      </div>

      <textarea
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Text for word frequency analysis"
        placeholder="Paste your article or draft here..."
        className="w-full p-4 rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm text-[#10243E] focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40"
      />

      <div className="rounded-xl border border-[#DCE5F0] overflow-hidden bg-white">
        <div className="px-4 py-2.5 bg-[#F8FBFF] border-b border-[#DCE5F0] flex flex-wrap items-center justify-between gap-2 text-xs text-[#4B617D] tabular-nums">
          <span>
            Showing <strong className="text-[#12345A]">{frequency.unique}</strong> unique words across{' '}
            <strong className="text-[#12345A]">{frequency.total}</strong> counted words
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={frequency.rows.length === 0}
              onClick={exportCsv}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#D4E0EE] bg-white text-xs font-medium text-[#12345A] hover:border-[#16C6C9] disabled:opacity-45"
            >
              <Download className="w-3.5 h-3.5 text-[#0FA7AA]" aria-hidden="true" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="max-h-72 overflow-y-auto">
          {frequency.rows.length === 0 ? (
            <div className="p-6 text-center text-sm text-[#5B708B]">
              Enter text above to view word frequency results.
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-[#FAFBFD] border-b border-[#E6EEF7] text-xs text-[#5B708B]">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Word</th>
                  <th className="px-4 py-2.5 font-medium text-right">Count</th>
                  <th className="px-4 py-2.5 font-medium text-right">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4F9]">
                {frequency.rows.slice(0, 60).map((row) => (
                  <tr key={row.word} className="hover:bg-[#F8FBFF]">
                    <td className="px-4 py-2 font-medium text-[#12345A]">{row.word}</td>
                    <td className="px-4 py-2 text-right font-mono tabular-nums text-[#39506B]">
                      {row.count}
                    </td>
                    <td className="px-4 py-2 text-right font-mono tabular-nums text-[#5B708B]">
                      {row.percent}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <ClearButton onClick={() => setText('')} disabled={!text} />
      </div>
    </div>
  );
}
