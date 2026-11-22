import { useMemo, useState } from 'react';
import { Download, Shuffle } from 'lucide-react';
import { ClearButton, CopyButton, StatTile, downloadTextFile } from './ToolSharedUI';

type LineBreakMode =
  | 'join-single'
  | 'join-all'
  | 'double-space'
  | 'sentence-per-line'
  | 'wrap-width';

export function LineBreakFormatterTool() {
  const [input, setInput] = useState(
    'Online tools work best when text\nwraps cleanly without unexpected\nbreaks in the middle of sentences.\n\nKeep paragraphs easy to read! Clear formatting saves time daily.'
  );
  const [mode, setMode] = useState<LineBreakMode>('join-single');
  const [wrapWidth, setWrapWidth] = useState(72);

  const formatted = useMemo(() => {
    const normalized = input.replace(/\r\n/g, '\n');
    if (!normalized.trim()) return '';

    switch (mode) {
      case 'join-single': {
        const blocks = normalized.split(/\n\s*\n+/);
        return blocks
          .map((block) =>
            block
              .split('\n')
              .map((line) => line.trim())
              .filter(Boolean)
              .join(' ')
              .replace(/[ \t]{2,}/g, ' ')
          )
          .filter(Boolean)
          .join('\n\n');
      }
      case 'join-all':
        return normalized
          .replace(/\n+/g, ' ')
          .replace(/[ \t]{2,}/g, ' ')
          .trim();
      case 'double-space':
        return normalized
          .split(/\n+/)
          .map((line) => line.trim())
          .filter(Boolean)
          .join('\n\n');
      case 'sentence-per-line': {
        const flat = normalized
          .replace(/\n+/g, ' ')
          .replace(/[ \t]{2,}/g, ' ')
          .trim();
        return flat.replace(/([.!?])\s+(?=[^\s])/g, '$1\n');
      }
      case 'wrap-width': {
        const maxCol = Math.min(120, Math.max(20, Math.floor(wrapWidth) || 72));
        const paragraphs = normalized.split(/\n\s*\n+/);
        return paragraphs
          .map((para) => {
            const words = para.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
            const lines: string[] = [];
            let current = '';
            for (const word of words) {
              if (!current) {
                current = word;
              } else if (current.length + 1 + word.length <= maxCol) {
                current += ` ${word}`;
              } else {
                lines.push(current);
                current = word;
              }
            }
            if (current) lines.push(current);
            return lines.join('\n');
          })
          .filter(Boolean)
          .join('\n\n');
      }
    }
  }, [input, mode, wrapWidth]);

  const inputLines = input ? input.replace(/\r\n/g, '\n').split('\n').length : 0;
  const outputLines = formatted ? formatted.split('\n').length : 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: 'join-single', label: 'Join Single Breaks' },
            { id: 'join-all', label: 'Join All Breaks' },
            { id: 'double-space', label: 'Double-Space Paragraphs' },
            { id: 'sentence-per-line', label: 'One Sentence Per Line' },
            { id: 'wrap-width', label: 'Wrap to Fixed Width' },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setMode(item.id)}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === item.id
                ? 'bg-[#12345A] text-white'
                : 'bg-[#F8FBFF] border border-[#DCE5F0] text-[#39506B] hover:border-[#16C6C9]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {mode === 'wrap-width' && (
        <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-lg bg-[#F8FBFF] border border-[#E2EAF4]">
          <label htmlFor="wrap-width-input" className="text-sm font-medium text-[#12345A]">
            Max Line Width (characters):
          </label>
          <input
            id="wrap-width-input"
            type="range"
            min={30}
            max={120}
            value={wrapWidth}
            onChange={(e) => setWrapWidth(Number(e.target.value))}
            className="w-44 accent-[#12345A]"
          />
          <input
            type="number"
            min={20}
            max={120}
            value={wrapWidth}
            onChange={(e) => setWrapWidth(Math.min(120, Math.max(20, Number(e.target.value) || 72)))}
            aria-label="Wrap width in characters"
            className="w-20 h-9 px-2.5 rounded-lg border border-[#D4E0EE] bg-white text-sm font-mono text-[#12345A] tabular-nums"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#5B708B]">
            <label htmlFor="lbf-input" className="font-medium text-[#12345A] text-sm">
              Original Text
            </label>
            <span className="tabular-nums">{inputLines} lines</span>
          </div>
          <textarea
            id="lbf-input"
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text with awkward line breaks..."
            className="w-full rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] p-4 text-sm text-[#10243E] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#5B708B]">
            <label htmlFor="lbf-output" className="font-medium text-[#12345A] text-sm">
              Formatted Output
            </label>
            <span className="tabular-nums">{outputLines} lines</span>
          </div>
          <textarea
            id="lbf-output"
            rows={10}
            readOnly
            value={formatted}
            placeholder="Formatted text appears here..."
            className="w-full rounded-xl border border-[#D4E0EE] bg-[#F8FBFF] p-4 text-sm text-[#10243E] focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <CopyButton value={formatted} label="Copy Formatted Text" />
          <button
            type="button"
            onClick={() => downloadTextFile('formatted-text.txt', formatted)}
            disabled={!formatted}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9] disabled:opacity-45"
          >
            <Download className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
            <span>Download .txt</span>
          </button>
        </div>
        <ClearButton onClick={() => setInput('')} disabled={!input} />
      </div>
    </div>
  );
}

type ListOrderMode =
  | 'alpha-asc'
  | 'alpha-desc'
  | 'num-asc'
  | 'num-desc'
  | 'len-asc'
  | 'shuffle'
  | 'original';

type ListPrefixMode = 'none' | 'numbered' | 'bullets';

function secureRandomIndex(maxExclusive: number): number {
  if (maxExclusive <= 1) return 0;
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    const limit = Math.floor(0xffffffff / maxExclusive) * maxExclusive;
    let rand = 0;
    do {
      window.crypto.getRandomValues(arr);
      rand = arr[0];
    } while (rand >= limit);
    return rand % maxExclusive;
  }
  return Math.floor(Math.random() * maxExclusive);
}

export function ListSorterRandomizerTool() {
  const [input, setInput] = useState('Zebra\nApple\nMango\nBanana\nCherry');
  const [orderMode, setOrderMode] = useState<ListOrderMode>('alpha-asc');
  const [prefixMode, setPrefixMode] = useState<ListPrefixMode>('none');
  const [trimItems, setTrimItems] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const result = useMemo(() => {
    void shuffleSeed;
    let lines = input.replace(/\r\n/g, '\n').split('\n');
    if (trimItems) lines = lines.map((l) => l.trim());
    if (removeEmpty) lines = lines.filter((l) => l.length > 0);

    const items = [...lines];
    if (orderMode === 'alpha-asc') {
      items.sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: caseSensitive ? 'variant' : 'base', numeric: true })
      );
    } else if (orderMode === 'alpha-desc') {
      items.sort((a, b) =>
        b.localeCompare(a, undefined, { sensitivity: caseSensitive ? 'variant' : 'base', numeric: true })
      );
    } else if (orderMode === 'num-asc' || orderMode === 'num-desc') {
      const parseNum = (s: string) => {
        const n = Number(s.replace(/,/g, ''));
        return Number.isFinite(n) ? n : null;
      };
      items.sort((a, b) => {
        const na = parseNum(a);
        const nb = parseNum(b);
        if (na !== null && nb !== null) {
          return orderMode === 'num-asc' ? na - nb : nb - na;
        }
        if (na !== null) return -1;
        if (nb !== null) return 1;
        return a.localeCompare(b);
      });
    } else if (orderMode === 'len-asc') {
      items.sort((a, b) => a.length - b.length || a.localeCompare(b));
    } else if (orderMode === 'shuffle') {
      for (let i = items.length - 1; i > 0; i--) {
        const j = secureRandomIndex(i + 1);
        const tmp = items[i];
        items[i] = items[j];
        items[j] = tmp;
      }
    }

    const formattedLines = items.map((item, idx) => {
      if (prefixMode === 'numbered') return `${idx + 1}. ${item}`;
      if (prefixMode === 'bullets') return `- ${item}`;
      return item;
    });

    return {
      count: items.length,
      text: formattedLines.join('\n'),
    };
  }, [input, orderMode, prefixMode, trimItems, removeEmpty, caseSensitive, shuffleSeed]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F8FBFF] border border-[#E2EAF4] rounded-xl p-4">
        <div className="space-y-2">
          <label htmlFor="lsr-order" className="block text-xs font-semibold uppercase tracking-wider text-[#5B708B]">
            Ordering Mode
          </label>
          <div className="flex items-center gap-2">
            <select
              id="lsr-order"
              value={orderMode}
              onChange={(e) => setOrderMode(e.target.value as ListOrderMode)}
              className="flex-1 h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] focus:outline-none focus:border-[#16C6C9]"
            >
              <option value="alpha-asc">Alphabetical (A → Z)</option>
              <option value="alpha-desc">Reverse Alphabetical (Z → A)</option>
              <option value="num-asc">Numeric (Low → High)</option>
              <option value="num-desc">Numeric (High → Low)</option>
              <option value="len-asc">Length (Shortest → Longest)</option>
              <option value="shuffle">Randomize / Shuffle</option>
              <option value="original">Keep Original Order</option>
            </select>
            {orderMode === 'shuffle' && (
              <button
                type="button"
                onClick={() => setShuffleSeed((s) => s + 1)}
                className="inline-flex items-center gap-1.5 h-10 px-3 rounded-lg bg-[#12345A] text-white text-xs font-semibold hover:bg-[#1A4678] shrink-0"
              >
                <Shuffle className="w-3.5 h-3.5 text-[#16C6C9]" aria-hidden="true" />
                <span>Shuffle Again</span>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="lsr-prefix" className="block text-xs font-semibold uppercase tracking-wider text-[#5B708B]">
            Line Formatting
          </label>
          <select
            id="lsr-prefix"
            value={prefixMode}
            onChange={(e) => setPrefixMode(e.target.value as ListPrefixMode)}
            className="w-full h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] focus:outline-none focus:border-[#16C6C9]"
          >
            <option value="none">Plain Lines</option>
            <option value="numbered">Numbered List (1. 2. 3.)</option>
            <option value="bullets">Markdown Bullets (- Item)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-[#39506B]">
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={trimItems}
            onChange={(e) => setTrimItems(e.target.checked)}
            className="w-4 h-4 accent-[#12345A]"
          />
          <span>Trim spaces</span>
        </label>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={removeEmpty}
            onChange={(e) => setRemoveEmpty(e.target.checked)}
            className="w-4 h-4 accent-[#12345A]"
          />
          <span>Remove blank lines</span>
        </label>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="w-4 h-4 accent-[#12345A]"
          />
          <span>Case sensitive sort</span>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="lsr-input" className="text-sm font-medium text-[#12345A]">
            Input List (one item per line)
          </label>
          <textarea
            id="lsr-input"
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter one item per line..."
            className="w-full rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] p-4 text-sm text-[#10243E] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="lsr-output" className="text-sm font-medium text-[#12345A]">
              Sorted / Shuffled Output
            </label>
            <span className="text-xs text-[#5B708B] tabular-nums">{result.count} items</span>
          </div>
          <textarea
            id="lsr-output"
            rows={10}
            readOnly
            value={result.text}
            className="w-full rounded-xl border border-[#D4E0EE] bg-[#F8FBFF] p-4 text-sm text-[#10243E] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatTile label="Output Items" value={result.count} />
        <StatTile label="Active Mode" value={orderMode === 'shuffle' ? 'Random' : orderMode.toUpperCase()} />
        <StatTile label="Prefix" value={prefixMode === 'none' ? 'Plain' : prefixMode} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2.5">
          <CopyButton value={result.text} label="Copy List" />
          <button
            type="button"
            onClick={() => downloadTextFile('sorted-list.txt', result.text)}
            disabled={!result.text}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9] disabled:opacity-45"
          >
            <Download className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
            <span>Download .txt</span>
          </button>
        </div>
        <ClearButton onClick={() => setInput('')} disabled={!input} />
      </div>
    </div>
  );
}
