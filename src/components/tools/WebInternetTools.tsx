import { useEffect, useMemo, useState } from 'react';
import { ArrowLeftRight, Download } from 'lucide-react';
import QRCode from 'qrcode';
import { SITE_CONFIG } from '../../data/site';
import { ClearButton, CopyButton } from './ToolSharedUI';

// 9. URL Slug Generator
const SLUG_STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
]);

export function SlugGeneratorTool() {
  const [title, setTitle] = useState('How to Build Clean, Readable Website URLs in 2026');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [lowercase, setLowercase] = useState(true);
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [maxLengthStr, setMaxLengthStr] = useState('80');

  const maxLength = useMemo(() => {
    const parsed = Number(maxLengthStr);
    if (!Number.isFinite(parsed) || maxLengthStr.trim() === '') return 80;
    return Math.min(200, Math.max(10, Math.round(parsed)));
  }, [maxLengthStr]);

  const slug = useMemo(() => {
    let normalized = title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/['’]/g, '');

    if (lowercase) {
      normalized = normalized.toLowerCase();
    }

    let words = normalized
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (removeStopWords) {
      words = words.filter((w) => !SLUG_STOP_WORDS.has(w.toLowerCase()));
    }

    let joined = words.join(separator);
    if (maxLength > 0 && joined.length > maxLength) {
      joined = joined.slice(0, maxLength);
      if (joined.endsWith(separator)) {
        joined = joined.slice(0, -1);
      }
    }
    return joined;
  }, [title, separator, lowercase, removeStopWords, maxLength]);

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="slug-title-input" className="block text-sm font-medium text-[#12345A] mb-1.5">
          Article Title or Phrase
        </label>
        <input
          id="slug-title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a heading, product name, or page title..."
          className="w-full h-12 px-4 rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm sm:text-base text-[#10243E] focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-[#F8FBFF] border border-[#E2EAF4]">
        <div className="flex items-center gap-2">
          <label htmlFor="slug-sep" className="text-xs font-medium text-[#5B708B]">
            Separator:
          </label>
          <select
            id="slug-sep"
            value={separator}
            onChange={(e) => setSeparator(e.target.value as '-' | '_')}
            className="h-9 px-2.5 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            <option value="-">Hyphen (-)</option>
            <option value="_">Underscore (_)</option>
          </select>
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-[#12345A] cursor-pointer">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            className="w-4 h-4 accent-[#12345A]"
          />
          <span>Force lowercase</span>
        </label>

        <label className="inline-flex items-center gap-2 text-sm text-[#12345A] cursor-pointer">
          <input
            type="checkbox"
            checked={removeStopWords}
            onChange={(e) => setRemoveStopWords(e.target.checked)}
            className="w-4 h-4 accent-[#12345A]"
          />
          <span>Remove stop words</span>
        </label>

        <div className="flex items-center gap-2 ml-auto">
          <label htmlFor="slug-max-len" className="text-xs font-medium text-[#5B708B]">
            Max length:
          </label>
          <input
            id="slug-max-len"
            type="number"
            min={10}
            max={200}
            value={maxLengthStr}
            onChange={(e) => setMaxLengthStr(e.target.value)}
            onBlur={() => setMaxLengthStr(String(maxLength))}
            className="w-20 h-9 px-2.5 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A] tabular-nums"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl border border-[#DCE5F0] bg-[#F8FBFF] space-y-2">
        <div className="text-xs font-medium text-[#5B708B]">Generated Slug</div>
        <div className="font-mono text-base sm:text-lg font-semibold text-[#12345A] break-all">
          {slug || <span className="text-[#8DA2BA]">your-url-slug</span>}
        </div>
        <div className="text-xs text-[#5B708B] font-mono break-all">
          Preview: {SITE_CONFIG.domain}/{slug || 'your-url-slug'}/
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <CopyButton value={slug} label="Copy Slug" />
        <ClearButton onClick={() => setTitle('')} disabled={!title} />
      </div>
    </div>
  );
}

// 10. URL Encoder / Decoder
export function UrlEncoderDecoderTool() {
  const sampleUrl = `${SITE_CONFIG.domain}/tools/?q=word counter&category=text & writing`;
  const [input, setInput] = useState(sampleUrl);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [scope, setScope] = useState<'component' | 'full'>('component');

  const { output, error } = useMemo(() => {
    if (!input) return { output: '', error: '' };
    try {
      if (mode === 'encode') {
        return {
          output: scope === 'component' ? encodeURIComponent(input) : encodeURI(input),
          error: '',
        };
      }
      return {
        output: scope === 'component' ? decodeURIComponent(input) : decodeURI(input),
        error: '',
      };
    } catch {
      return {
        output: '',
        error: 'The input contains an invalid percent-encoded sequence that could not be decoded.',
      };
    }
  }, [input, mode, scope]);

  const parsedParams = useMemo(() => {
    try {
      const target = mode === 'decode' && output ? output : input;
      const idx = target.indexOf('?');
      if (idx === -1) return [];
      const params = new URLSearchParams(target.slice(idx + 1));
      return Array.from(params.entries());
    } catch {
      return [];
    }
  }, [input, output, mode]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#F8FBFF] border border-[#E2EAF4]">
        <div className="inline-flex p-1 rounded-lg bg-[#E6EEF7]">
          <button
            type="button"
            onClick={() => setMode('encode')}
            className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === 'encode' ? 'bg-white text-[#12345A] shadow-xs' : 'text-[#4B617D]'
            }`}
          >
            Encode URL
          </button>
          <button
            type="button"
            onClick={() => setMode('decode')}
            className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === 'decode' ? 'bg-white text-[#12345A] shadow-xs' : 'text-[#4B617D]'
            }`}
          >
            Decode URL
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setMode('encode');
              setInput(sampleUrl);
            }}
            className="text-xs font-medium text-[#0C8588] hover:text-[#12345A] underline underline-offset-2"
          >
            Load sample URL
          </button>
          <div className="flex items-center gap-2">
            <label htmlFor="url-scope" className="text-xs font-medium text-[#5B708B]">
              Handling:
            </label>
            <select
              id="url-scope"
              value={scope}
              onChange={(e) => setScope(e.target.value as 'component' | 'full')}
              className="h-9 px-2.5 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
            >
              <option value="component">Component (encodes :, /, ?, &amp;)</option>
              <option value="full">Full URI (keeps URL structure)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label htmlFor="url-input" className="block text-sm font-medium text-[#12345A] mb-1.5">
            Input
          </label>
          <textarea
            id="url-input"
            rows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text or URL here..."
            className="w-full p-3.5 rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm font-mono text-[#10243E] focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40"
          />
        </div>
        <div>
          <label htmlFor="url-output" className="block text-sm font-medium text-[#12345A] mb-1.5">
            {mode === 'encode' ? 'Encoded Output' : 'Decoded Output'}
          </label>
          <textarea
            id="url-output"
            rows={6}
            value={output}
            readOnly
            placeholder="Result appears here..."
            className="w-full p-3.5 rounded-xl border border-[#D4E0EE] bg-[#F8FBFF] text-sm font-mono text-[#10243E] focus:outline-none"
          />
        </div>
      </div>

      {error && (
        <div role="alert" className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#991B1B]">
          {error}
        </div>
      )}

      {parsedParams.length > 0 && (
        <div className="rounded-xl border border-[#DCE5F0] overflow-hidden bg-white">
          <div className="px-4 py-2 bg-[#F8FBFF] border-b border-[#DCE5F0] text-xs font-semibold text-[#12345A]">
            Detected Query String Parameters
          </div>
          <table className="w-full text-xs sm:text-sm text-left">
            <tbody className="divide-y divide-[#F0F4F9]">
              {parsedParams.map(([key, val], idx) => (
                <tr key={`${key}-${idx}`}>
                  <td className="px-4 py-2 font-mono font-medium text-[#12345A] w-1/3">{key}</td>
                  <td className="px-4 py-2 font-mono text-[#39506B] break-all">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          disabled={!output}
          onClick={() => {
            setInput(output);
            setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
          }}
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9] disabled:opacity-45"
        >
          <ArrowLeftRight className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
          <span>Swap &amp; Flip Mode</span>
        </button>
        <CopyButton value={output} label="Copy Output" />
        <ClearButton onClick={() => setInput('')} disabled={!input} />
      </div>
    </div>
  );
}

// 11. HTML Entity Converter
const NAMED_ENCODE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '©': '&copy;',
  '®': '&reg;',
  '™': '&trade;',
  '€': '&euro;',
  '£': '&pound;',
  '¥': '&yen;',
  '—': '&mdash;',
  '–': '&ndash;',
  ' ': '&nbsp;',
};

export function HtmlEntityConverterTool() {
  const [input, setInput] = useState('<div class="card">TooloraHub & Tools © 2026</div>');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodeSpaces, setEncodeSpaces] = useState(false);

  const output = useMemo(() => {
    if (!input) return '';
    if (mode === 'encode') {
      return input.replace(/[&<>"'©®™€£¥—– ]/g, (ch) => {
        if (ch === ' ' && !encodeSpaces) return ' ';
        return NAMED_ENCODE_MAP[ch] ?? ch;
      });
    }
    const textarea = document.createElement('textarea');
    textarea.innerHTML = input;
    return textarea.value;
  }, [input, mode, encodeSpaces]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#F8FBFF] border border-[#E2EAF4]">
        <div className="inline-flex p-1 rounded-lg bg-[#E6EEF7]">
          <button
            type="button"
            onClick={() => setMode('encode')}
            className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === 'encode' ? 'bg-white text-[#12345A] shadow-xs' : 'text-[#4B617D]'
            }`}
          >
            Encode to Entities
          </button>
          <button
            type="button"
            onClick={() => setMode('decode')}
            className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === 'decode' ? 'bg-white text-[#12345A] shadow-xs' : 'text-[#4B617D]'
            }`}
          >
            Decode to Text
          </button>
        </div>

        {mode === 'encode' && (
          <label className="inline-flex items-center gap-2 text-sm text-[#12345A] cursor-pointer">
            <input
              type="checkbox"
              checked={encodeSpaces}
              onChange={(e) => setEncodeSpaces(e.target.checked)}
              className="w-4 h-4 accent-[#12345A]"
            />
            <span>Convert spaces to &amp;nbsp;</span>
          </label>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label htmlFor="html-entity-input" className="block text-sm font-medium text-[#12345A] mb-1.5">
            Input
          </label>
          <textarea
            id="html-entity-input"
            rows={7}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste HTML markup or entity-encoded text..."
            className="w-full p-3.5 rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm font-mono text-[#10243E] focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40"
          />
        </div>
        <div>
          <label htmlFor="html-entity-output" className="block text-sm font-medium text-[#12345A] mb-1.5">
            Converted Output
          </label>
          <textarea
            id="html-entity-output"
            rows={7}
            value={output}
            readOnly
            placeholder="Converted result appears here..."
            className="w-full p-3.5 rounded-xl border border-[#D4E0EE] bg-[#F8FBFF] text-sm font-mono text-[#10243E] focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          disabled={!output}
          onClick={() => {
            setInput(output);
            setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
          }}
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9] disabled:opacity-45"
        >
          <ArrowLeftRight className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
          <span>Swap &amp; Flip Mode</span>
        </button>
        <CopyButton value={output} label="Copy Output" />
        <ClearButton onClick={() => setInput('')} disabled={!input} />
      </div>
    </div>
  );
}

// 12. QR Code Generator
function getRelativeLuminance(hex: string): number {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return 0;
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function QrCodeGeneratorTool() {
  const defaultQrUrl = `${SITE_CONFIG.domain}/`;
  const [content, setContent] = useState(defaultQrUrl);
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#12345A');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [pngUrl, setPngUrl] = useState('');
  const [svgMarkup, setSvgMarkup] = useState('');
  const [qrError, setQrError] = useState('');

  const lowContrast = useMemo(() => {
    const l1 = getRelativeLuminance(fgColor);
    const l2 = getRelativeLuminance(bgColor);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return ratio < 3;
  }, [fgColor, bgColor]);

  useEffect(() => {
    let active = true;
    const text = content.trim();
    if (!text) {
      setPngUrl('');
      setSvgMarkup('');
      setQrError('');
      return;
    }

    const opts = {
      width: size,
      margin: 2,
      errorCorrectionLevel: errorLevel,
      color: {
        dark: fgColor,
        light: bgColor,
      },
    };

    Promise.all([
      QRCode.toDataURL(text, opts),
      QRCode.toString(text, { ...opts, type: 'svg' }),
    ])
      .then(([dataUrl, svg]) => {
        if (!active) return;
        setPngUrl(dataUrl);
        setSvgMarkup(svg);
        setQrError('');
      })
      .catch(() => {
        if (!active) return;
        setPngUrl('');
        setSvgMarkup('');
        setQrError('Unable to encode the current text into a QR code. Try shortening the text.');
      });

    return () => {
      active = false;
    };
  }, [content, size, fgColor, bgColor, errorLevel]);

  const downloadPng = () => {
    if (!pngUrl) return;
    const anchor = document.createElement('a');
    anchor.href = pngUrl;
    anchor.download = 'toolorahub-qr-code.png';
    anchor.click();
  };

  const downloadSvg = () => {
    if (!svgMarkup) return;
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'toolorahub-qr-code.svg';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  const handleReset = () => {
    setContent(defaultQrUrl);
    setSize(256);
    setFgColor('#12345A');
    setBgColor('#FFFFFF');
    setErrorLevel('M');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-7 space-y-4">
        <div>
          <label htmlFor="qr-content" className="block text-sm font-medium text-[#12345A] mb-1.5">
            URL or Text Content
          </label>
          <textarea
            id="qr-content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`${SITE_CONFIG.domain}/ or any short text...`}
            className="w-full p-3.5 rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm text-[#10243E] focus:outline-none focus:ring-2 focus:ring-[#16C6C9]/40"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="qr-size" className="block text-xs font-medium text-[#5B708B] mb-1">
              Image Size ({size} × {size} px)
            </label>
            <input
              id="qr-size"
              type="range"
              min={160}
              max={512}
              step={16}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-[#12345A]"
            />
          </div>

          <div>
            <label htmlFor="qr-ecc" className="block text-xs font-medium text-[#5B708B] mb-1">
              Error Correction
            </label>
            <select
              id="qr-ecc"
              value={errorLevel}
              onChange={(e) => setErrorLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
              className="w-full h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
            >
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="qr-fg" className="block text-xs font-medium text-[#5B708B] mb-1">
              Foreground Color
            </label>
            <div className="flex items-center gap-2">
              <input
                id="qr-fg"
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-10 h-10 rounded-lg border border-[#D4E0EE] cursor-pointer p-0.5 bg-white"
              />
              <span className="font-mono text-xs text-[#39506B]">{fgColor.toUpperCase()}</span>
            </div>
          </div>

          <div>
            <label htmlFor="qr-bg" className="block text-xs font-medium text-[#5B708B] mb-1">
              Background Color
            </label>
            <div className="flex items-center gap-2">
              <input
                id="qr-bg"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 rounded-lg border border-[#D4E0EE] cursor-pointer p-0.5 bg-white"
              />
              <span className="font-mono text-xs text-[#39506B]">{bgColor.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {lowContrast && (
          <div role="status" className="p-3 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E]">
            Low contrast between foreground and background colors may prevent phone cameras from scanning this QR code reliably.
          </div>
        )}

        {qrError && (
          <div role="alert" className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#991B1B]">
            {qrError}
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          <ClearButton onClick={() => setContent('')} label="Clear Text" disabled={!content} />
          <ClearButton onClick={handleReset} label="Reset Defaults" />
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col items-center p-6 rounded-xl border border-[#DCE5F0] bg-[#F8FBFF] space-y-4">
        <div className="w-56 h-56 rounded-xl bg-white border border-[#DCE5F0] flex items-center justify-center p-3 overflow-hidden">
          {pngUrl ? (
            <img
              src={pngUrl}
              alt="Generated QR Code"
              width={size}
              height={size}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-xs text-[#6B809A] text-center">
              Enter a URL or text to generate a QR code
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 w-full">
          <button
            type="button"
            disabled={!pngUrl}
            onClick={downloadPng}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-[#12345A] text-white text-sm font-medium hover:bg-[#1A4678] disabled:opacity-45"
          >
            <Download className="w-4 h-4 text-[#16C6C9]" aria-hidden="true" />
            <span>Download PNG</span>
          </button>
          <button
            type="button"
            disabled={!svgMarkup}
            onClick={downloadSvg}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9] disabled:opacity-45"
          >
            <Download className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
            <span>Download SVG</span>
          </button>
        </div>
      </div>
    </div>
  );
}
