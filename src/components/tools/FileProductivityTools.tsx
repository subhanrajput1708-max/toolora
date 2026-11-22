import { useMemo, useState } from 'react';
import { ArrowLeftRight, Download, Plus, Trash2 } from 'lucide-react';
import { ClearButton, CopyButton, StatTile, downloadTextFile } from './ToolSharedUI';

// 19. Lorem Ipsum Generator
const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'ut',
  'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris',
  'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure',
  'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore',
  'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non',
  'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id',
  'est', 'laborum', 'curabitur', 'pretium', 'tincidunt', 'lacus', 'nulla', 'gravida', 'orci',
  'a', 'odio', 'nullam', 'varius', 'turpis', 'et', 'commodo', 'pharetra',
];

function buildSentence(wordCount: number, offset: number): string {
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(LOREM_WORDS[(offset + i) % LOREM_WORDS.length]);
  }
  const first = words[0];
  words[0] = first.charAt(0).toUpperCase() + first.slice(1);
  return `${words.join(' ')}.`;
}

export function LoremIpsumGeneratorTool() {
  const [unit, setUnit] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [countStr, setCountStr] = useState('3');
  const [startClassic, setStartClassic] = useState(true);
  const [wrapHtml, setWrapHtml] = useState(false);

  const count = useMemo(() => {
    const parsed = Number(countStr);
    if (!Number.isFinite(parsed) || countStr.trim() === '') return 3;
    return Math.min(50, Math.max(1, Math.round(parsed)));
  }, [countStr]);

  const generated = useMemo(() => {
    const safeCount = count;
    const classicSentence =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    if (unit === 'words') {
      const list: string[] = [];
      for (let i = 0; i < safeCount; i++) {
        list.push(LOREM_WORDS[i % LOREM_WORDS.length]);
      }
      if (startClassic && list.length >= 2) {
        list[0] = 'Lorem';
        list[1] = 'ipsum';
      }
      const text = list.join(' ');
      return wrapHtml ? `<p>${text}</p>` : text;
    }

    if (unit === 'sentences') {
      const sentences: string[] = [];
      for (let i = 0; i < safeCount; i++) {
        if (i === 0 && startClassic) {
          sentences.push(classicSentence);
        } else {
          sentences.push(buildSentence(12 + (i % 6), i * 11));
        }
      }
      const text = sentences.join(' ');
      return wrapHtml ? `<p>${text}</p>` : text;
    }

    const paragraphs: string[] = [];
    for (let p = 0; p < safeCount; p++) {
      const sents: string[] = [];
      for (let s = 0; s < 4; s++) {
        if (p === 0 && s === 0 && startClassic) {
          sents.push(classicSentence);
        } else {
          sents.push(buildSentence(11 + ((p + s) % 7), p * 23 + s * 9));
        }
      }
      const body = sents.join(' ');
      paragraphs.push(wrapHtml ? `<p>${body}</p>` : body);
    }
    return paragraphs.join('\n\n');
  }, [unit, count, startClassic, wrapHtml]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-[#F8FBFF] border border-[#E2EAF4]">
        <div className="flex items-center gap-2">
          <label htmlFor="lorem-count" className="text-xs font-medium text-[#5B708B]">
            Amount:
          </label>
          <input
            id="lorem-count"
            type="number"
            min={1}
            max={50}
            value={countStr}
            onChange={(e) => setCountStr(e.target.value)}
            onBlur={() => setCountStr(String(count))}
            className="w-20 h-9 px-2.5 rounded-lg border border-[#D4E0EE] bg-white text-sm font-mono text-[#12345A] tabular-nums"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="lorem-unit" className="text-xs font-medium text-[#5B708B]">
            Type:
          </label>
          <select
            id="lorem-unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as 'paragraphs' | 'sentences' | 'words')}
            className="h-9 px-2.5 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-[#12345A] cursor-pointer">
          <input
            type="checkbox"
            checked={startClassic}
            onChange={(e) => setStartClassic(e.target.checked)}
            className="w-4 h-4 accent-[#12345A]"
          />
          <span>Start with &ldquo;Lorem ipsum...&rdquo;</span>
        </label>

        <label className="inline-flex items-center gap-2 text-sm text-[#12345A] cursor-pointer">
          <input
            type="checkbox"
            checked={wrapHtml}
            onChange={(e) => setWrapHtml(e.target.checked)}
            className="w-4 h-4 accent-[#12345A]"
          />
          <span>Wrap with &lt;p&gt; tags</span>
        </label>
      </div>

      <textarea
        rows={9}
        value={generated}
        readOnly
        aria-label="Generated Lorem Ipsum placeholder text"
        className="w-full p-4 rounded-xl border border-[#D4E0EE] bg-[#F8FBFF] text-sm text-[#10243E] leading-relaxed focus:outline-none"
      />

      <div className="flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={() => downloadTextFile('lorem-ipsum.txt', generated)}
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9]"
        >
          <Download className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
          <span>Download .txt</span>
        </button>
        <CopyButton value={generated} label="Copy Placeholder Text" />
        <ClearButton
          onClick={() => {
            setUnit('paragraphs');
            setCountStr('3');
            setStartClassic(true);
            setWrapHtml(false);
          }}
          label="Reset"
        />
      </div>
    </div>
  );
}

// 20. Reading Time Calculator
const SAMPLE_ARTICLE =
  'Clear structure helps online readers scan faster and stay engaged. When your paragraphs are balanced and subheadings break up dense explanations, readers can follow complex topics effortlessly from introduction to conclusion.';

export function ReadingTimeCalculatorTool() {
  const [text, setText] = useState('');
  const [wpmStr, setWpmStr] = useState('200');

  const wpm = useMemo(() => {
    const parsed = Number(wpmStr);
    if (!Number.isFinite(parsed) || wpmStr.trim() === '') return 200;
    return Math.min(600, Math.max(60, Math.round(parsed)));
  }, [wpmStr]);

  const metrics = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const readMinutesFloat = words / wpm;
    const readSeconds = Math.ceil(readMinutesFloat * 60);
    const speakSeconds = Math.ceil((words / 130) * 60);

    const fmt = (totalSec: number) => {
      if (totalSec === 0) return '0 sec';
      const mins = Math.floor(totalSec / 60);
      const secs = totalSec % 60;
      if (mins === 0) return `${secs} sec`;
      return `${mins} min ${secs} sec`;
    };

    return {
      words,
      readFormatted: fmt(readSeconds),
      speakFormatted: fmt(speakSeconds),
      minutesRounded: Math.max(words > 0 ? 1 : 0, Math.round(readMinutesFloat)),
    };
  }, [text, wpm]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#F8FBFF] border border-[#E2EAF4]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-[#5B708B]">Reading Speed:</span>
          {[
            { label: 'Slow (150 WPM)', val: 150 },
            { label: 'Average (200 WPM)', val: 200 },
            { label: 'Fast (260 WPM)', val: 260 },
          ].map((preset) => (
            <button
              key={preset.val}
              type="button"
              onClick={() => setWpmStr(String(preset.val))}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                wpm === preset.val
                  ? 'bg-[#12345A] text-white'
                  : 'bg-white border border-[#D4E0EE] text-[#39506B] hover:border-[#16C6C9]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="custom-wpm" className="text-xs font-medium text-[#5B708B]">
            Custom WPM:
          </label>
          <input
            id="custom-wpm"
            type="number"
            min={60}
            max={600}
            value={wpmStr}
            onChange={(e) => setWpmStr(e.target.value)}
            onBlur={() => setWpmStr(String(wpm))}
            className="w-20 h-9 px-2.5 rounded-lg border border-[#D4E0EE] bg-white text-sm font-mono text-[#12345A] tabular-nums"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile label="Reading Time" value={metrics.readFormatted} sublabel={`at ${wpm} WPM`} />
        <StatTile label="Display Badge" value={`${metrics.minutesRounded} min read`} />
        <StatTile label="Speaking Time" value={metrics.speakFormatted} sublabel="at 130 WPM" />
        <StatTile label="Total Words" value={metrics.words.toLocaleString()} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="reading-time-input" className="text-sm font-medium text-[#12345A]">
            Article or script text
          </label>
          <button
            type="button"
            onClick={() => setText(SAMPLE_ARTICLE)}
            className="text-xs font-medium text-[#0C8588] hover:text-[#12345A] underline underline-offset-2"
          >
            Load sample text
          </button>
        </div>
        <textarea
          id="reading-time-input"
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your blog post, newsletter, or presentation script here..."
          className="w-full p-4 rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm sm:text-base text-[#10243E] focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40"
        />
      </div>

      <div className="flex justify-end gap-2">
        <CopyButton
          value={`Estimated reading time: ${metrics.readFormatted} (${metrics.words} words at ${wpm} WPM)`}
          label="Copy Estimate"
          disabled={metrics.words === 0}
        />
        <ClearButton onClick={() => setText('')} disabled={!text} />
      </div>
    </div>
  );
}

// 21. Text Reverser
export function TextReverserTool() {
  const [input, setInput] = useState('TooloraHub makes everyday digital tasks simpler.');
  const [mode, setMode] = useState<'chars' | 'words' | 'each-word' | 'lines'>('chars');

  const output = useMemo(() => {
    if (!input) return '';
    if (mode === 'chars') {
      return Array.from(input).reverse().join('');
    }
    if (mode === 'words') {
      const trimmed = input.trim();
      return trimmed ? trimmed.split(/\s+/).reverse().join(' ') : '';
    }
    if (mode === 'each-word') {
      return input.replace(/\S+/g, (word) => Array.from(word).reverse().join(''));
    }
    return input.split(/\r?\n/).reverse().join('\n');
  }, [input, mode]);

  const modes = [
    { id: 'chars', label: 'Reverse All Characters' },
    { id: 'words', label: 'Reverse Word Order' },
    { id: 'each-word', label: 'Flip Each Word' },
    { id: 'lines', label: 'Reverse Line Order' },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m.id
                ? 'bg-[#12345A] text-white'
                : 'bg-[#F8FBFF] border border-[#D4E0EE] text-[#39506B] hover:border-[#16C6C9]'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label htmlFor="reverser-input" className="block text-sm font-medium text-[#12345A] mb-1.5">
            Input Text
          </label>
          <textarea
            id="reverser-input"
            rows={7}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to reverse..."
            className="w-full p-3.5 rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm text-[#10243E] focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40"
          />
        </div>
        <div>
          <label htmlFor="reverser-output" className="block text-sm font-medium text-[#12345A] mb-1.5">
            Reversed Output
          </label>
          <textarea
            id="reverser-output"
            rows={7}
            value={output}
            readOnly
            placeholder="Reversed result appears here..."
            className="w-full p-3.5 rounded-xl border border-[#D4E0EE] bg-[#F8FBFF] text-sm text-[#10243E] focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <button
          type="button"
          disabled={!output}
          onClick={() => setInput(output)}
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9] disabled:opacity-45"
        >
          <ArrowLeftRight className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
          <span>Use Output as Input</span>
        </button>
        <CopyButton value={output} label="Copy Reversed Text" />
        <ClearButton onClick={() => setInput('')} disabled={!input} />
      </div>
    </div>
  );
}

// 22. Gradient Generator
interface ColorStop {
  id: number;
  color: string;
  position: number;
}

const PRESET_GRADIENTS = [
  { name: 'Navy to Teal', angle: 135, stops: ['#12345A', '#16C6C9'] },
  { name: 'Slate Dawn', angle: 120, stops: ['#1E3A5F', '#4A90B8', '#DCEEF8'] },
  { name: 'Deep Ocean', angle: 145, stops: ['#0F2540', '#1B5E8A', '#22D3EE'] },
  { name: 'Warm Sunset', angle: 135, stops: ['#F97316', '#EC4899'] },
];

export function GradientGeneratorTool() {
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<ColorStop[]>([
    { id: 1, color: '#12345A', position: 0 },
    { id: 2, color: '#16C6C9', position: 100 },
  ]);

  const sortedStops = useMemo(
    () => [...stops].sort((a, b) => a.position - b.position),
    [stops]
  );

  const cssValue = useMemo(() => {
    const stopStr = sortedStops.map((s) => `${s.color} ${s.position}%`).join(', ');
    if (type === 'linear') {
      return `linear-gradient(${angle}deg, ${stopStr})`;
    }
    return `radial-gradient(circle, ${stopStr})`;
  }, [type, angle, sortedStops]);

  const fullCssRule = `background: ${cssValue};`;

  const addStop = () => {
    if (stops.length >= 5) return;
    setStops((prev) => [
      ...prev,
      { id: Date.now(), color: '#38BDF8', position: 50 },
    ]);
  };

  const removeStop = (id: number) => {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((s) => s.id !== id));
  };

  const updateStop = (id: number, patch: Partial<ColorStop>) => {
    setStops((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const resetGradient = () => {
    setType('linear');
    setAngle(135);
    setStops([
      { id: 1, color: '#12345A', position: 0 },
      { id: 2, color: '#16C6C9', position: 100 },
    ]);
  };

  const downloadPng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let grad: CanvasGradient;
    if (type === 'linear') {
      const rad = ((angle - 90) * Math.PI) / 180;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const len = Math.sqrt(cx * cx + cy * cy);
      grad = ctx.createLinearGradient(
        cx - Math.cos(rad) * len,
        cy - Math.sin(rad) * len,
        cx + Math.cos(rad) * len,
        cy + Math.sin(rad) * len
      );
    } else {
      grad = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );
    }

    for (const stop of sortedStops) {
      grad.addColorStop(stop.position / 100, stop.color);
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const anchor = document.createElement('a');
    anchor.href = canvas.toDataURL('image/png');
    anchor.download = 'toolorahub-gradient.png';
    anchor.click();
  };

  return (
    <div className="space-y-6">
      <div
        className="w-full h-56 sm:h-64 rounded-xl border border-[#DCE5F0]"
        style={{ background: cssValue }}
        role="img"
        aria-label={`Live CSS ${type} gradient preview`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex p-1 rounded-lg bg-[#E6EEF7]">
              <button
                type="button"
                onClick={() => setType('linear')}
                className={`px-3.5 py-1.5 rounded-md text-sm font-medium ${
                  type === 'linear' ? 'bg-white text-[#12345A] shadow-xs' : 'text-[#4B617D]'
                }`}
              >
                Linear
              </button>
              <button
                type="button"
                onClick={() => setType('radial')}
                className={`px-3.5 py-1.5 rounded-md text-sm font-medium ${
                  type === 'radial' ? 'bg-white text-[#12345A] shadow-xs' : 'text-[#4B617D]'
                }`}
              >
                Radial
              </button>
            </div>

            {type === 'linear' && (
              <div className="flex items-center gap-3 flex-1 min-w-[180px]">
                <label htmlFor="grad-angle" className="text-xs font-medium text-[#5B708B] whitespace-nowrap">
                  Angle: <span className="font-mono text-[#12345A] tabular-nums">{angle}°</span>
                </label>
                <input
                  id="grad-angle"
                  type="range"
                  min={0}
                  max={360}
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full accent-[#12345A]"
                />
              </div>
            )}
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#12345A]">Color Stops</span>
              <button
                type="button"
                onClick={addStop}
                disabled={stops.length >= 5}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#D4E0EE] bg-white text-xs font-medium text-[#12345A] hover:border-[#16C6C9] disabled:opacity-45"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Add Stop</span>
              </button>
            </div>

            {stops.map((stop, idx) => (
              <div
                key={stop.id}
                className="flex items-center gap-3 p-2.5 rounded-lg border border-[#E2EAF4] bg-[#F8FBFF]"
              >
                <input
                  type="color"
                  aria-label={`Color stop ${idx + 1} hex`}
                  value={stop.color}
                  onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                  className="w-9 h-9 rounded border border-[#D4E0EE] bg-white cursor-pointer p-0.5"
                />
                <span className="font-mono text-xs text-[#12345A] w-16">
                  {stop.color.toUpperCase()}
                </span>
                <input
                  type="range"
                  aria-label={`Color stop ${idx + 1} position percentage`}
                  min={0}
                  max={100}
                  value={stop.position}
                  onChange={(e) => updateStop(stop.id, { position: Number(e.target.value) })}
                  className="flex-1 accent-[#12345A]"
                />
                <span className="font-mono text-xs text-[#5B708B] w-10 text-right tabular-nums">
                  {stop.position}%
                </span>
                <button
                  type="button"
                  onClick={() => removeStop(stop.id)}
                  disabled={stops.length <= 2}
                  aria-label={`Remove color stop ${idx + 1}`}
                  className="p-1.5 text-[#7E92AA] hover:text-[#B32D2A] disabled:opacity-35"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <span className="block text-sm font-medium text-[#12345A] mb-2">Presets</span>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_GRADIENTS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setType('linear');
                    setAngle(preset.angle);
                    setStops(
                      preset.stops.map((c, idx) => ({
                        id: Date.now() + idx,
                        color: c,
                        position: Math.round((idx / (preset.stops.length - 1)) * 100),
                      }))
                    );
                  }}
                  className="flex items-center gap-2.5 p-2 rounded-lg border border-[#D4E0EE] bg-white text-xs font-medium text-[#12345A] hover:border-[#16C6C9]"
                >
                  <span
                    className="w-6 h-6 rounded border border-[#E2EAF4] shrink-0"
                    style={{
                      background: `linear-gradient(${preset.angle}deg, ${preset.stops.join(', ')})`,
                    }}
                  />
                  <span className="truncate">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#DCE5F0] bg-[#F8FBFF] space-y-2">
            <div className="text-xs font-medium text-[#5B708B]">Generated CSS</div>
            <pre className="font-mono text-xs sm:text-sm text-[#12345A] whitespace-pre-wrap break-all">
              {fullCssRule}
            </pre>
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={downloadPng}
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9]"
            >
              <Download className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
              <span>Download PNG</span>
            </button>
            <CopyButton value={fullCssRule} label="Copy CSS" />
            <ClearButton onClick={resetGradient} label="Reset" />
          </div>
        </div>
      </div>
    </div>
  );
}
