import { useMemo, useState } from 'react';
import { ClearButton, CopyButton, StatTile } from './ToolSharedUI';

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'PKR', symbol: 'PKR ' },
  { code: 'INR', symbol: '₹' },
] as const;

function formatNum(value: number, maxDecimals = 4): string {
  if (!Number.isFinite(value)) return '—';
  const rounded = Number(value.toFixed(maxDecimals));
  return rounded.toLocaleString('en-US', { maximumFractionDigits: maxDecimals });
}

function formatMoney(symbol: string, value: number): string {
  if (!Number.isFinite(value)) return '—';
  return `${symbol}${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function gcdInt(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

// =========================================================
// 1. Average Calculator
// =========================================================
export function AverageCalculatorTool() {
  const [rawInput, setRawInput] = useState('78, 85, 92, 85, 90, 88');

  const stats = useMemo(() => {
    const tokens = rawInput
      .split(/[\s,;]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    const nums: number[] = [];
    let ignored = 0;

    for (const token of tokens) {
      const parsed = Number(token);
      if (Number.isFinite(parsed)) {
        nums.push(parsed);
      } else {
        ignored++;
      }
    }

    if (nums.length === 0) {
      return { empty: true as const, ignored };
    }

    const sorted = [...nums].sort((a, b) => a - b);
    const sum = nums.reduce((acc, n) => acc + n, 0);
    const mean = sum / nums.length;
    const mid = Math.floor(sorted.length / 2);
    const median =
      sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    const freq = new Map<number, number>();
    let maxFreq = 0;
    for (const n of nums) {
      const next = (freq.get(n) ?? 0) + 1;
      freq.set(n, next);
      if (next > maxFreq) maxFreq = next;
    }
    const modeValues =
      maxFreq <= 1
        ? []
        : Array.from(freq.entries())
            .filter(([, c]) => c === maxFreq)
            .map(([val]) => val)
            .sort((a, b) => a - b);

    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const range = max - min;

    const modeLabel =
      modeValues.length === 0
        ? 'None (all unique)'
        : `${modeValues.map((v) => formatNum(v)).join(', ')} (${maxFreq}x)`;

    const summary = `Count: ${nums.length}\nSum: ${formatNum(sum)}\nMean (Average): ${formatNum(mean)}\nMedian: ${formatNum(median)}\nMode: ${modeLabel}\nMin: ${formatNum(min)}\nMax: ${formatNum(max)}\nRange: ${formatNum(range)}`;

    return {
      empty: false as const,
      count: nums.length,
      ignored,
      sum,
      mean,
      median,
      modeLabel,
      min,
      max,
      range,
      sorted,
      summary,
    };
  }, [rawInput]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="avg-input" className="block text-sm font-medium text-[#12345A]">
          Numbers (separated by commas, spaces, or new lines)
        </label>
        <textarea
          id="avg-input"
          rows={4}
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder="e.g. 12, 18, 24, 18, 30"
          className="w-full rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] p-4 font-mono text-sm text-[#10243E] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
        />
        {stats.ignored > 0 && (
          <p className="text-xs text-[#9A5B13]" role="status">
            Ignored {stats.ignored} non-numeric token{stats.ignored === 1 ? '' : 's'}.
          </p>
        )}
      </div>

      {stats.empty ? (
        <div className="rounded-xl border border-[#E2EAF4] bg-[#F8FBFF] p-6 text-center text-sm text-[#5B708B]">
          Enter at least one number above to calculate mean, median, mode, and range.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatTile label="Mean (Average)" value={formatNum(stats.mean)} />
            <StatTile label="Median" value={formatNum(stats.median)} />
            <StatTile label="Sum" value={formatNum(stats.sum)} />
            <StatTile label="Count" value={stats.count} />
            <StatTile label="Minimum" value={formatNum(stats.min)} />
            <StatTile label="Maximum" value={formatNum(stats.max)} />
            <StatTile label="Range" value={formatNum(stats.range)} />
            <StatTile label="Mode" value={stats.modeLabel} />
          </div>

          <div className="rounded-xl border border-[#E2EAF4] bg-[#F8FBFF] p-4 text-xs sm:text-sm text-[#39506B]">
            <span className="font-semibold text-[#12345A]">Sorted values: </span>
            <span className="font-mono break-words">
              {stats.sorted.slice(0, 60).map((n) => formatNum(n)).join(', ')}
              {stats.sorted.length > 60 ? ` ... (+${stats.sorted.length - 60} more)` : ''}
            </span>
          </div>
        </>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <CopyButton
          value={stats.empty ? '' : stats.summary}
          label="Copy Summary"
          disabled={stats.empty}
        />
        <ClearButton onClick={() => setRawInput('')} disabled={!rawInput} />
      </div>
    </div>
  );
}

// =========================================================
// 2. Ratio Calculator
// =========================================================
export function RatioCalculatorTool() {
  const [aStr, setAStr] = useState('1920');
  const [bStr, setBStr] = useState('1080');
  const [cStr, setCStr] = useState('1280');
  const [dStr, setDStr] = useState('');
  const [solveFor, setSolveFor] = useState<'D' | 'C'>('D');

  const computed = useMemo(() => {
    const a = Number(aStr);
    const b = Number(bStr);
    const validAB =
      aStr.trim() !== '' && bStr.trim() !== '' && Number.isFinite(a) && Number.isFinite(b);

    let simplifiedText = '—';
    let factorText = '—';
    if (validAB && a !== 0 && b !== 0) {
      const scale = 10000;
      const ai = Math.round(a * scale);
      const bi = Math.round(b * scale);
      const divisor = gcdInt(ai, bi);
      simplifiedText = `${ai / divisor} : ${bi / divisor}`;
      factorText = formatNum(a / b, 4);
    }

    let propResult: number | null = null;
    let propError = '';
    if (!validAB || a === 0 || b === 0) {
      propError = 'Enter non-zero values for A and B.';
    } else if (solveFor === 'D') {
      const c = Number(cStr);
      if (cStr.trim() !== '' && Number.isFinite(c)) {
        propResult = (b * c) / a;
      }
    } else {
      const d = Number(dStr);
      if (dStr.trim() !== '' && Number.isFinite(d)) {
        propResult = (a * d) / b;
      }
    }

    return {
      simplifiedText,
      factorText,
      propResult,
      propError,
    };
  }, [aStr, bStr, cStr, dStr, solveFor]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#5B708B]">
          Presets:
        </span>
        {[
          { label: '16:9 (1920×1080)', a: '1920', b: '1080', c: '1280' },
          { label: '4:3 (800×600)', a: '800', b: '600', c: '1024' },
          { label: '3:2 Photo', a: '3', b: '2', c: '1500' },
          { label: '1:1 Square', a: '1', b: '1', c: '512' },
        ].map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setAStr(p.a);
              setBStr(p.b);
              setCStr(p.c);
              setSolveFor('D');
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F8FBFF] border border-[#DCE5F0] text-[#12345A] hover:border-[#16C6C9]"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[#DCE5F0] bg-[#FAFBFD] p-5 space-y-4">
          <h3 className="font-display font-semibold text-base text-[#12345A]">
            1. Ratio A : B (Simplify)
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex-1 space-y-1">
              <label htmlFor="ratio-a" className="text-xs font-medium text-[#5B708B]">
                Value A
              </label>
              <input
                id="ratio-a"
                type="number"
                value={aStr}
                onChange={(e) => setAStr(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9]"
              />
            </div>
            <span className="font-bold text-lg text-[#12345A] pt-5">:</span>
            <div className="flex-1 space-y-1">
              <label htmlFor="ratio-b" className="text-xs font-medium text-[#5B708B]">
                Value B
              </label>
              <input
                id="ratio-b"
                type="number"
                value={bStr}
                onChange={(e) => setBStr(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatTile label="Simplified Ratio" value={computed.simplifiedText} />
            <StatTile label="A / B Quotient" value={computed.factorText} />
          </div>
          <CopyButton
            value={computed.simplifiedText === '—' ? '' : computed.simplifiedText}
            label="Copy Simplified Ratio"
          />
        </div>

        <div className="rounded-xl border border-[#DCE5F0] bg-[#FAFBFD] p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display font-semibold text-base text-[#12345A]">
              2. Proportion A : B = C : D
            </h3>
            <div className="inline-flex rounded-lg border border-[#D4E0EE] bg-white p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setSolveFor('D')}
                className={`px-2.5 py-1 rounded-md font-medium ${
                  solveFor === 'D' ? 'bg-[#12345A] text-white' : 'text-[#4B617D]'
                }`}
              >
                Solve D
              </button>
              <button
                type="button"
                onClick={() => setSolveFor('C')}
                className={`px-2.5 py-1 rounded-md font-medium ${
                  solveFor === 'C' ? 'bg-[#12345A] text-white' : 'text-[#4B617D]'
                }`}
              >
                Solve C
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 space-y-1">
              <label htmlFor="ratio-c" className="text-xs font-medium text-[#5B708B]">
                Value C {solveFor === 'C' ? '(Solved)' : ''}
              </label>
              <input
                id="ratio-c"
                type="number"
                readOnly={solveFor === 'C'}
                value={
                  solveFor === 'C'
                    ? computed.propResult !== null
                      ? String(Number(computed.propResult.toFixed(6)))
                      : ''
                    : cStr
                }
                onChange={(e) => setCStr(e.target.value)}
                className={`w-full h-11 px-3 rounded-lg border font-mono text-sm focus:outline-none ${
                  solveFor === 'C'
                    ? 'border-[#16C6C9] bg-[#EEF6FB] font-bold text-[#12345A]'
                    : 'border-[#D4E0EE] bg-white text-[#12345A] focus:border-[#16C6C9]'
                }`}
              />
            </div>
            <span className="font-bold text-lg text-[#12345A] pt-5">:</span>
            <div className="flex-1 space-y-1">
              <label htmlFor="ratio-d" className="text-xs font-medium text-[#5B708B]">
                Value D {solveFor === 'D' ? '(Solved)' : ''}
              </label>
              <input
                id="ratio-d"
                type="number"
                readOnly={solveFor === 'D'}
                value={
                  solveFor === 'D'
                    ? computed.propResult !== null
                      ? String(Number(computed.propResult.toFixed(6)))
                      : ''
                    : dStr
                }
                onChange={(e) => setDStr(e.target.value)}
                className={`w-full h-11 px-3 rounded-lg border font-mono text-sm focus:outline-none ${
                  solveFor === 'D'
                    ? 'border-[#16C6C9] bg-[#EEF6FB] font-bold text-[#12345A]'
                    : 'border-[#D4E0EE] bg-white text-[#12345A] focus:border-[#16C6C9]'
                }`}
              />
            </div>
          </div>

          {computed.propError ? (
            <p className="text-xs text-[#9A5B13]" role="alert">
              {computed.propError}
            </p>
          ) : (
            <div className="rounded-lg border border-[#E2EAF4] bg-white p-3 text-sm text-[#12345A]">
              <span className="text-[#5B708B]">Solved {solveFor} = </span>
              <span className="font-mono font-bold">
                {computed.propResult !== null ? formatNum(computed.propResult, 4) : '—'}
              </span>
            </div>
          )}

          <CopyButton
            value={computed.propResult !== null ? String(Number(computed.propResult.toFixed(4))) : ''}
            label={`Copy ${solveFor}`}
            disabled={computed.propResult === null}
          />
        </div>
      </div>
    </div>
  );
}

// =========================================================
// 3. Fraction & Percentage Converter
// =========================================================
export function FractionPercentageConverterTool() {
  const [mode, setMode] = useState<'fraction' | 'decimal' | 'percent'>('fraction');
  const [numStr, setNumStr] = useState('3');
  const [denStr, setDenStr] = useState('8');
  const [decStr, setDecStr] = useState('0.375');
  const [pctStr, setPctStr] = useState('37.5');

  const result = useMemo(() => {
    let decimal: number | null = null;
    let error = '';

    if (mode === 'fraction') {
      const n = Number(numStr);
      const d = Number(denStr);
      if (numStr.trim() === '' || denStr.trim() === '' || !Number.isFinite(n) || !Number.isFinite(d)) {
        error = 'Enter both numerator and denominator.';
      } else if (d === 0) {
        error = 'Denominator cannot be zero.';
      } else {
        decimal = n / d;
      }
    } else if (mode === 'decimal') {
      const v = Number(decStr);
      if (decStr.trim() === '' || !Number.isFinite(v)) {
        error = 'Enter a valid decimal number.';
      } else {
        decimal = v;
      }
    } else {
      const v = Number(pctStr);
      if (pctStr.trim() === '' || !Number.isFinite(v)) {
        error = 'Enter a valid percentage value.';
      } else {
        decimal = v / 100;
      }
    }

    if (decimal === null || !Number.isFinite(decimal)) {
      return { error, valid: false as const };
    }

    const sign = decimal < 0 ? -1 : 1;
    const absDec = Math.abs(decimal);

    let simpNum = 0;
    let simpDen = 1;
    if (mode === 'fraction' && Number.isInteger(Number(numStr)) && Number.isInteger(Number(denStr))) {
      const n = Math.trunc(Number(numStr));
      const d = Math.trunc(Number(denStr));
      const fSign = (n < 0 ? -1 : 1) * (d < 0 ? -1 : 1);
      const g = gcdInt(Math.abs(n), Math.abs(d));
      simpNum = fSign * (Math.abs(n) / g);
      simpDen = Math.abs(d) / g;
    } else {
      const scale = 1_000_000;
      const top = Math.round(absDec * scale);
      const g = gcdInt(top, scale);
      simpNum = sign * (top / g);
      simpDen = scale / g;
    }

    const whole = Math.trunc(simpNum / simpDen);
    const rem = Math.abs(simpNum % simpDen);
    const mixed =
      simpDen === 1
        ? String(simpNum)
        : whole !== 0
          ? `${whole} ${rem}/${simpDen}`
          : `${simpNum}/${simpDen}`;

    const percent = decimal * 100;

    return {
      valid: true as const,
      error: '',
      fraction: simpDen === 1 ? String(simpNum) : `${simpNum}/${simpDen}`,
      mixed,
      decimal: formatNum(decimal, 6),
      percent: `${formatNum(percent, 4)}%`,
    };
  }, [mode, numStr, denStr, decStr, pctStr]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: 'fraction', label: 'Start from Fraction' },
            { id: 'decimal', label: 'Start from Decimal' },
            { id: 'percent', label: 'Start from Percentage' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMode(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === tab.id
                ? 'bg-[#12345A] text-white'
                : 'bg-[#F8FBFF] border border-[#DCE5F0] text-[#39506B] hover:border-[#16C6C9]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[#DCE5F0] bg-[#FAFBFD] p-5">
        {mode === 'fraction' && (
          <div className="flex flex-wrap items-center gap-3 max-w-md">
            <div className="flex-1 min-w-[120px] space-y-1">
              <label htmlFor="fpc-num" className="text-xs font-medium text-[#5B708B]">
                Numerator
              </label>
              <input
                id="fpc-num"
                type="number"
                value={numStr}
                onChange={(e) => setNumStr(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9]"
              />
            </div>
            <span className="text-xl font-bold text-[#12345A] pt-5">/</span>
            <div className="flex-1 min-w-[120px] space-y-1">
              <label htmlFor="fpc-den" className="text-xs font-medium text-[#5B708B]">
                Denominator
              </label>
              <input
                id="fpc-den"
                type="number"
                value={denStr}
                onChange={(e) => setDenStr(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9]"
              />
            </div>
          </div>
        )}

        {mode === 'decimal' && (
          <div className="max-w-xs space-y-1">
            <label htmlFor="fpc-dec" className="text-xs font-medium text-[#5B708B]">
              Decimal Number
            </label>
            <input
              id="fpc-dec"
              type="number"
              step="any"
              value={decStr}
              onChange={(e) => setDecStr(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9]"
            />
          </div>
        )}

        {mode === 'percent' && (
          <div className="max-w-xs space-y-1">
            <label htmlFor="fpc-pct" className="text-xs font-medium text-[#5B708B]">
              Percentage (%)
            </label>
            <input
              id="fpc-pct"
              type="number"
              step="any"
              value={pctStr}
              onChange={(e) => setPctStr(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9]"
            />
          </div>
        )}
      </div>

      {result.error && (
        <p className="text-sm text-[#B42318] font-medium" role="alert">
          {result.error}
        </p>
      )}

      {result.valid && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatTile label="Simplified Fraction" value={result.fraction} />
            <StatTile label="Mixed Number" value={result.mixed} />
            <StatTile label="Decimal" value={result.decimal} />
            <StatTile label="Percentage" value={result.percent} />
          </div>
          <div className="flex flex-wrap gap-2.5">
            <CopyButton value={result.fraction} label="Copy Fraction" />
            <CopyButton value={result.decimal} label="Copy Decimal" />
            <CopyButton value={result.percent} label="Copy Percent" />
          </div>
        </>
      )}
    </div>
  );
}

// =========================================================
// 4. BMI Calculator
// =========================================================
export function BmiCalculatorTool() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [weightKg, setWeightKg] = useState('70');
  const [heightCm, setHeightCm] = useState('175');
  const [weightLbs, setWeightLbs] = useState('154');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('9');

  const computed = useMemo(() => {
    let bmi = 0;
    let heightMeters = 0;
    let valid = false;

    if (unitSystem === 'metric') {
      const w = Number(weightKg);
      const h = Number(heightCm);
      if (w > 0 && h > 0 && Number.isFinite(w) && Number.isFinite(h)) {
        heightMeters = h / 100;
        bmi = w / (heightMeters * heightMeters);
        valid = true;
      }
    } else {
      const w = Number(weightLbs);
      const ft = Number(heightFt) || 0;
      const inc = Number(heightIn) || 0;
      const totalInches = ft * 12 + inc;
      if (w > 0 && totalInches > 0 && Number.isFinite(w) && Number.isFinite(totalInches)) {
        heightMeters = totalInches * 0.0254;
        bmi = (703 * w) / (totalInches * totalInches);
        valid = true;
      }
    }

    if (!valid || !Number.isFinite(bmi)) {
      return { valid: false as const };
    }

    let category = 'Obesity';
    let badgeClass = 'bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]';
    if (bmi < 18.5) {
      category = 'Underweight';
      badgeClass = 'bg-[#EFF8FF] text-[#175CD3] border-[#B2DDFF]';
    } else if (bmi < 25) {
      category = 'Normal Weight';
      badgeClass = 'bg-[#ECFDF3] text-[#067647] border-[#ABEFC6]';
    } else if (bmi < 30) {
      category = 'Overweight';
      badgeClass = 'bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]';
    }

    const minKg = 18.5 * heightMeters * heightMeters;
    const maxKg = 24.9 * heightMeters * heightMeters;
    const healthyRange =
      unitSystem === 'metric'
        ? `${minKg.toFixed(1)} – ${maxKg.toFixed(1)} kg`
        : `${(minKg * 2.20462262).toFixed(1)} – ${(maxKg * 2.20462262).toFixed(1)} lbs`;

    const summary = `BMI: ${bmi.toFixed(1)} (${category})\nReference Healthy Weight Range for height: ${healthyRange}`;

    return {
      valid: true as const,
      bmi,
      category,
      badgeClass,
      healthyRange,
      summary,
    };
  }, [unitSystem, weightKg, heightCm, weightLbs, heightFt, heightIn]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setUnitSystem('metric')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            unitSystem === 'metric'
              ? 'bg-[#12345A] text-white'
              : 'bg-[#F8FBFF] border border-[#DCE5F0] text-[#39506B]'
          }`}
        >
          Metric (kg, cm)
        </button>
        <button
          type="button"
          onClick={() => setUnitSystem('imperial')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            unitSystem === 'imperial'
              ? 'bg-[#12345A] text-white'
              : 'bg-[#F8FBFF] border border-[#DCE5F0] text-[#39506B]'
          }`}
        >
          US Imperial (lbs, ft/in)
        </button>
      </div>

      {unitSystem === 'metric' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="bmi-kg" className="text-sm font-medium text-[#12345A]">
              Weight (kg)
            </label>
            <input
              id="bmi-kg"
              type="number"
              min="1"
              step="0.1"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] text-sm font-mono text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="bmi-cm" className="text-sm font-medium text-[#12345A]">
              Height (cm)
            </label>
            <input
              id="bmi-cm"
              type="number"
              min="1"
              step="0.5"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] text-sm font-mono text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="bmi-lbs" className="text-sm font-medium text-[#12345A]">
              Weight (lbs)
            </label>
            <input
              id="bmi-lbs"
              type="number"
              min="1"
              step="0.5"
              value={weightLbs}
              onChange={(e) => setWeightLbs(e.target.value)}
              className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] text-sm font-mono text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="bmi-ft" className="text-sm font-medium text-[#12345A]">
              Height (feet)
            </label>
            <input
              id="bmi-ft"
              type="number"
              min="1"
              max="8"
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
              className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] text-sm font-mono text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="bmi-in" className="text-sm font-medium text-[#12345A]">
              Height (inches)
            </label>
            <input
              id="bmi-in"
              type="number"
              min="0"
              max="11.9"
              step="0.5"
              value={heightIn}
              onChange={(e) => setHeightIn(e.target.value)}
              className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] text-sm font-mono text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
            />
          </div>
        </div>
      )}

      {computed.valid ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatTile label="Body Mass Index (BMI)" value={computed.bmi.toFixed(1)} />
            <div className={`rounded-lg border p-3.5 flex flex-col justify-center ${computed.badgeClass}`}>
              <div className="text-xs font-medium opacity-85">Adult WHO Category</div>
              <div className="mt-1 text-xl font-display font-bold">{computed.category}</div>
            </div>
            <StatTile
              label="Healthy Weight Reference"
              value={computed.healthyRange}
              sublabel="BMI 18.5 – 24.9"
            />
          </div>
          <CopyButton value={computed.summary} label="Copy BMI Summary" />
        </div>
      ) : (
        <p className="text-sm text-[#B42318]" role="alert">
          Enter positive height and weight values to compute BMI.
        </p>
      )}

      <p className="text-xs text-[#5B708B] bg-[#F8FBFF] border border-[#E2EAF4] rounded-lg p-3.5 leading-relaxed">
        Informational Note: Standard BMI is a general screening ratio based only on weight and height. It does not measure body fat percentage, muscle mass, age, or clinical health status. Consult a qualified healthcare provider for personal medical guidance.
      </p>
    </div>
  );
}

// =========================================================
// 5. Fuel & Trip Cost Calculator
// =========================================================
export function FuelTripCostCalculatorTool() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]['symbol']>('$');
  const [distance, setDistance] = useState('450');
  const [efficiency, setEfficiency] = useState('7.5');
  const [fuelPrice, setFuelPrice] = useState('1.65');
  const [passengers, setPassengers] = useState('2');
  const [roundTrip, setRoundTrip] = useState(false);

  const computed = useMemo(() => {
    const dRaw = Number(distance);
    const eff = Number(efficiency);
    const price = Number(fuelPrice);
    const ppl = Math.max(1, Math.floor(Number(passengers) || 1));

    if (!(dRaw >= 0 && eff > 0 && price >= 0) || !Number.isFinite(dRaw) || !Number.isFinite(eff) || !Number.isFinite(price)) {
      return null;
    }

    const effectiveDistance = roundTrip ? dRaw * 2 : dRaw;
    const fuelNeeded =
      unitSystem === 'metric' ? (effectiveDistance / 100) * eff : effectiveDistance / eff;
    const totalCost = fuelNeeded * price;
    const perPerson = totalCost / ppl;
    const costPer100 = effectiveDistance > 0 ? (totalCost / effectiveDistance) * 100 : 0;

    const volUnit = unitSystem === 'metric' ? 'L' : 'gal';
    const distUnit = unitSystem === 'metric' ? 'km' : 'miles';

    const summary = `Distance: ${formatNum(effectiveDistance, 1)} ${distUnit}${roundTrip ? ' (Round Trip)' : ''}\nFuel Needed: ${formatNum(fuelNeeded, 2)} ${volUnit}\nTotal Fuel Cost: ${formatMoney(currency, totalCost)}\nCost per Passenger (${ppl}): ${formatMoney(currency, perPerson)}`;

    return {
      effectiveDistance,
      fuelNeeded,
      totalCost,
      perPerson,
      costPer100,
      volUnit,
      distUnit,
      summary,
    };
  }, [unitSystem, currency, distance, efficiency, fuelPrice, passengers, roundTrip]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setUnitSystem('metric');
              setEfficiency('7.5');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              unitSystem === 'metric'
                ? 'bg-[#12345A] text-white'
                : 'bg-[#F8FBFF] border border-[#DCE5F0] text-[#39506B]'
            }`}
          >
            Metric (km, L/100km)
          </button>
          <button
            type="button"
            onClick={() => {
              setUnitSystem('imperial');
              setEfficiency('30');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              unitSystem === 'imperial'
                ? 'bg-[#12345A] text-white'
                : 'bg-[#F8FBFF] border border-[#DCE5F0] text-[#39506B]'
            }`}
          >
            US Imperial (miles, MPG)
          </button>
        </div>

        <select
          aria-label="Display currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as (typeof CURRENCIES)[number]['symbol'])}
          className="h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A]"
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.symbol}>
              {c.code} ({c.symbol.trim()})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="fuel-dist" className="text-sm font-medium text-[#12345A]">
            Trip Distance ({unitSystem === 'metric' ? 'km' : 'miles'})
          </label>
          <input
            id="fuel-dist"
            type="number"
            min="0"
            step="any"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="fuel-eff" className="text-sm font-medium text-[#12345A]">
            {unitSystem === 'metric' ? 'Consumption (L/100km)' : 'Efficiency (MPG)'}
          </label>
          <input
            id="fuel-eff"
            type="number"
            min="0.1"
            step="any"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="fuel-price" className="text-sm font-medium text-[#12345A]">
            Fuel Price (per {unitSystem === 'metric' ? 'Liter' : 'Gallon'})
          </label>
          <input
            id="fuel-price"
            type="number"
            min="0"
            step="0.01"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="fuel-ppl" className="text-sm font-medium text-[#12345A]">
            Passengers (Split)
          </label>
          <input
            id="fuel-ppl"
            type="number"
            min="1"
            max="50"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-[#39506B] cursor-pointer">
        <input
          type="checkbox"
          checked={roundTrip}
          onChange={(e) => setRoundTrip(e.target.checked)}
          className="w-4 h-4 accent-[#12345A]"
        />
        <span>Round trip (double the entered distance)</span>
      </label>

      {computed ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatTile label="Total Fuel Cost" value={formatMoney(currency, computed.totalCost)} />
            <StatTile
              label="Fuel Needed"
              value={`${formatNum(computed.fuelNeeded, 2)} ${computed.volUnit}`}
            />
            <StatTile label="Cost per Passenger" value={formatMoney(currency, computed.perPerson)} />
            <StatTile
              label={`Cost per 100 ${computed.distUnit}`}
              value={formatMoney(currency, computed.costPer100)}
            />
          </div>
          <CopyButton value={computed.summary} label="Copy Trip Cost Summary" />
        </div>
      ) : (
        <p className="text-sm text-[#B42318]" role="alert">
          Enter valid positive mileage/efficiency values to estimate fuel cost.
        </p>
      )}
    </div>
  );
}

// =========================================================
// 6. Tip Calculator
// =========================================================
export function TipCalculatorTool() {
  const [billStr, setBillStr] = useState('120');
  const [tipPctStr, setTipPctStr] = useState('15');
  const [peopleStr, setPeopleStr] = useState('4');
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]['symbol']>('$');
  const [roundUp, setRoundUp] = useState(false);

  const computed = useMemo(() => {
    const bill = Number(billStr);
    const tipPct = Number(tipPctStr);
    const people = Math.max(1, Math.min(100, Math.floor(Number(peopleStr) || 1)));

    if (
      billStr.trim() === '' ||
      tipPctStr.trim() === '' ||
      !Number.isFinite(bill) ||
      !Number.isFinite(tipPct) ||
      bill < 0 ||
      tipPct < 0
    ) {
      return null;
    }

    const tipAmount = bill * (tipPct / 100);
    let totalBill = bill + tipAmount;
    let perPerson = totalBill / people;
    if (roundUp) {
      perPerson = Math.ceil(perPerson);
      totalBill = perPerson * people;
    }
    const tipPerPerson = (totalBill - bill) / people;

    const summary = `Bill: ${formatMoney(currency, bill)}\nTip (${tipPct}%): ${formatMoney(currency, totalBill - bill)}\nTotal Bill: ${formatMoney(currency, totalBill)}\nPer Person (${people}): ${formatMoney(currency, perPerson)}`;

    return {
      tipAmount: totalBill - bill,
      totalBill,
      perPerson,
      tipPerPerson,
      people,
      summary,
    };
  }, [billStr, tipPctStr, peopleStr, currency, roundUp]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="tip-bill" className="text-sm font-medium text-[#12345A]">
            Bill Amount
          </label>
          <input
            id="tip-bill"
            type="number"
            min="0"
            step="0.01"
            value={billStr}
            onChange={(e) => setBillStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="tip-pct" className="text-sm font-medium text-[#12345A]">
            Tip Percentage (%)
          </label>
          <input
            id="tip-pct"
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={tipPctStr}
            onChange={(e) => setTipPctStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="tip-people" className="text-sm font-medium text-[#12345A]">
            Split Between (People)
          </label>
          <input
            id="tip-people"
            type="number"
            min="1"
            max="100"
            value={peopleStr}
            onChange={(e) => setPeopleStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="tip-curr" className="text-sm font-medium text-[#12345A]">
            Currency Symbol
          </label>
          <select
            id="tip-curr"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as (typeof CURRENCIES)[number]['symbol'])}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A]"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.symbol}>
                {c.code} ({c.symbol.trim()})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#5B708B]">Quick Tip:</span>
          {['10', '15', '18', '20', '25'].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => setTipPctStr(pct)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                tipPctStr === pct
                  ? 'bg-[#12345A] text-white'
                  : 'bg-[#F8FBFF] border border-[#DCE5F0] text-[#12345A] hover:border-[#16C6C9]'
              }`}
            >
              {pct}%
            </button>
          ))}
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-[#39506B] cursor-pointer">
          <input
            type="checkbox"
            checked={roundUp}
            onChange={(e) => setRoundUp(e.target.checked)}
            className="w-4 h-4 accent-[#12345A]"
          />
          <span>Round per-person total up to whole number</span>
        </label>
      </div>

      {computed ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatTile label="Total Bill" value={formatMoney(currency, computed.totalBill)} />
            <StatTile label="Tip Amount" value={formatMoney(currency, computed.tipAmount)} />
            <StatTile
              label={`Per Person (${computed.people})`}
              value={formatMoney(currency, computed.perPerson)}
            />
            <StatTile label="Tip Per Person" value={formatMoney(currency, computed.tipPerPerson)} />
          </div>
          <CopyButton value={computed.summary} label="Copy Bill Split" />
        </div>
      ) : (
        <p className="text-sm text-[#B42318]" role="alert">
          Enter a non-negative bill and tip percentage.
        </p>
      )}
    </div>
  );
}

// =========================================================
// 7. Loan EMI Calculator
// =========================================================
export function LoanEmiCalculatorTool() {
  const [principalStr, setPrincipalStr] = useState('25000');
  const [rateStr, setRateStr] = useState('6.5');
  const [termStr, setTermStr] = useState('5');
  const [termUnit, setTermUnit] = useState<'years' | 'months'>('years');
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]['symbol']>('$');

  const computed = useMemo(() => {
    const P = Number(principalStr);
    const annualRate = Number(rateStr);
    const termVal = Number(termStr);
    const months = Math.round(termUnit === 'years' ? termVal * 12 : termVal);

    if (
      !Number.isFinite(P) ||
      !Number.isFinite(annualRate) ||
      !Number.isFinite(months) ||
      P <= 0 ||
      annualRate < 0 ||
      months <= 0 ||
      months > 600
    ) {
      return null;
    }

    const r = annualRate / 100 / 12;
    const emi =
      r === 0 ? P / months : (P * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    const totalPayable = emi * months;
    const totalInterest = totalPayable - P;

    // Year-by-year amortization summary
    const yearly: Array<{ year: number; principalPaid: number; interestPaid: number; balance: number }> = [];
    let balance = P;
    let yrPrin = 0;
    let yrInt = 0;
    for (let m = 1; m <= months; m++) {
      const interestForMonth = balance * r;
      const principalForMonth = Math.min(balance, emi - interestForMonth);
      balance = Math.max(0, balance - principalForMonth);
      yrInt += interestForMonth;
      yrPrin += principalForMonth;
      if (m % 12 === 0 || m === months) {
        yearly.push({
          year: Math.ceil(m / 12),
          principalPaid: yrPrin,
          interestPaid: yrInt,
          balance,
        });
        yrPrin = 0;
        yrInt = 0;
      }
    }

    const interestShare = totalPayable > 0 ? (totalInterest / totalPayable) * 100 : 0;
    const summary = `Loan Principal: ${formatMoney(currency, P)}\nInterest Rate: ${annualRate}% APR\nTerm: ${months} months\nMonthly EMI: ${formatMoney(currency, emi)}\nTotal Interest: ${formatMoney(currency, totalInterest)}\nTotal Payable: ${formatMoney(currency, totalPayable)}`;

    return {
      emi,
      totalPayable,
      totalInterest,
      months,
      interestShare,
      yearly,
      summary,
    };
  }, [principalStr, rateStr, termStr, termUnit, currency]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="emi-principal" className="text-sm font-medium text-[#12345A]">
            Loan Principal
          </label>
          <input
            id="emi-principal"
            type="number"
            min="1"
            step="any"
            value={principalStr}
            onChange={(e) => setPrincipalStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="emi-rate" className="text-sm font-medium text-[#12345A]">
            Annual Interest Rate (%)
          </label>
          <input
            id="emi-rate"
            type="number"
            min="0"
            max="100"
            step="0.05"
            value={rateStr}
            onChange={(e) => setRateStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="emi-term" className="text-sm font-medium text-[#12345A]">
            Loan Term
          </label>
          <div className="flex gap-2">
            <input
              id="emi-term"
              type="number"
              min="1"
              max={termUnit === 'years' ? 50 : 600}
              value={termStr}
              onChange={(e) => setTermStr(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
            />
            <select
              aria-label="Term unit"
              value={termUnit}
              onChange={(e) => setTermUnit(e.target.value as 'years' | 'months')}
              className="h-11 px-2.5 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="emi-curr" className="text-sm font-medium text-[#12345A]">
            Currency
          </label>
          <select
            id="emi-curr"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as (typeof CURRENCIES)[number]['symbol'])}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.symbol}>
                {c.code} ({c.symbol.trim()})
              </option>
            ))}
          </select>
        </div>
      </div>

      {computed ? (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatTile
              label="Monthly Payment (EMI)"
              value={formatMoney(currency, computed.emi)}
              sublabel={`${computed.months} monthly payments`}
            />
            <StatTile
              label="Total Interest"
              value={formatMoney(currency, computed.totalInterest)}
              sublabel={`${computed.interestShare.toFixed(1)}% of total`}
            />
            <StatTile label="Total Repayment" value={formatMoney(currency, computed.totalPayable)} />
          </div>

          <div className="rounded-xl border border-[#DCE5F0] overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F8FBFF] border-b border-[#E2EAF4] text-[#5B708B]">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Year</th>
                  <th className="py-2.5 px-4 font-semibold">Principal Paid</th>
                  <th className="py-2.5 px-4 font-semibold">Interest Paid</th>
                  <th className="py-2.5 px-4 font-semibold">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4F9] font-mono tabular-nums text-[#12345A]">
                {computed.yearly.slice(0, 30).map((row) => (
                  <tr key={row.year}>
                    <td className="py-2 px-4 font-sans font-medium">Year {row.year}</td>
                    <td className="py-2 px-4">{formatMoney(currency, row.principalPaid)}</td>
                    <td className="py-2 px-4">{formatMoney(currency, row.interestPaid)}</td>
                    <td className="py-2 px-4">{formatMoney(currency, row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CopyButton value={computed.summary} label="Copy Loan Summary" />
        </div>
      ) : (
        <p className="text-sm text-[#B42318]" role="alert">
          Enter a positive loan principal, non-negative interest rate, and term between 1 and 600 months.
        </p>
      )}
    </div>
  );
}

// =========================================================
// 8. Compound Interest Calculator
// =========================================================
export function CompoundInterestCalculatorTool() {
  const [principalStr, setPrincipalStr] = useState('5000');
  const [monthlyAddStr, setMonthlyAddStr] = useState('150');
  const [rateStr, setRateStr] = useState('7');
  const [yearsStr, setYearsStr] = useState('10');
  const [compFreq, setCompFreq] = useState<1 | 4 | 12 | 365>(12);
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]['symbol']>('$');

  const computed = useMemo(() => {
    const P = Number(principalStr);
    const pmt = Number(monthlyAddStr) || 0;
    const annualRate = Number(rateStr);
    const years = Math.floor(Number(yearsStr));

    if (
      !Number.isFinite(P) ||
      !Number.isFinite(pmt) ||
      !Number.isFinite(annualRate) ||
      !Number.isFinite(years) ||
      P < 0 ||
      pmt < 0 ||
      annualRate < 0 ||
      years <= 0 ||
      years > 60
    ) {
      return null;
    }

    const r = annualRate / 100;
    // Simulate month by month cleanly using effective monthly rate matching selected compounding frequency
    const effectiveMonthlyRate = Math.pow(1 + r / compFreq, compFreq / 12) - 1;
    let balance = P;
    let totalContributions = P;
    const rows: Array<{ year: number; contributions: number; interest: number; balance: number }> = [];

    for (let y = 1; y <= years; y++) {
      for (let m = 1; m <= 12; m++) {
        balance = balance * (1 + effectiveMonthlyRate) + pmt;
        totalContributions += pmt;
      }
      rows.push({
        year: y,
        contributions: totalContributions,
        interest: balance - totalContributions,
        balance,
      });
    }

    const totalInterest = balance - totalContributions;
    const simpleInterestBaseline = totalContributions + P * r * years + (pmt * 12 * years * r * (years / 2));

    const summary = `Starting Principal: ${formatMoney(currency, P)}\nMonthly Contribution: ${formatMoney(currency, pmt)}\nRate: ${annualRate}% for ${years} years\nFuture Balance: ${formatMoney(currency, balance)}\nTotal Contributions: ${formatMoney(currency, totalContributions)}\nCompound Interest Earned: ${formatMoney(currency, totalInterest)}`;

    return {
      balance,
      totalContributions,
      totalInterest,
      simpleInterestBaseline,
      rows,
      summary,
    };
  }, [principalStr, monthlyAddStr, rateStr, yearsStr, compFreq, currency]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="ci-principal" className="text-sm font-medium text-[#12345A]">
            Initial Principal
          </label>
          <input
            id="ci-principal"
            type="number"
            min="0"
            step="any"
            value={principalStr}
            onChange={(e) => setPrincipalStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="ci-monthly" className="text-sm font-medium text-[#12345A]">
            Monthly Deposit
          </label>
          <input
            id="ci-monthly"
            type="number"
            min="0"
            step="any"
            value={monthlyAddStr}
            onChange={(e) => setMonthlyAddStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="ci-rate" className="text-sm font-medium text-[#12345A]">
            Annual Rate (%)
          </label>
          <input
            id="ci-rate"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={rateStr}
            onChange={(e) => setRateStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="ci-years" className="text-sm font-medium text-[#12345A]">
            Years (1–60)
          </label>
          <input
            id="ci-years"
            type="number"
            min="1"
            max="60"
            value={yearsStr}
            onChange={(e) => setYearsStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="ci-freq" className="text-sm font-medium text-[#12345A]">
            Compounding
          </label>
          <select
            id="ci-freq"
            value={compFreq}
            onChange={(e) => setCompFreq(Number(e.target.value) as 1 | 4 | 12 | 365)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            <option value={1}>Annually (1×/yr)</option>
            <option value={4}>Quarterly (4×/yr)</option>
            <option value={12}>Monthly (12×/yr)</option>
            <option value={365}>Daily (365×/yr)</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <select
          aria-label="Currency symbol"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as (typeof CURRENCIES)[number]['symbol'])}
          className="h-9 px-3 rounded-lg border border-[#D4E0EE] bg-white text-xs font-medium text-[#12345A]"
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.symbol}>
              Currency: {c.code}
            </option>
          ))}
        </select>
      </div>

      {computed ? (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatTile label="Future Value" value={formatMoney(currency, computed.balance)} />
            <StatTile
              label="Total Contributions"
              value={formatMoney(currency, computed.totalContributions)}
            />
            <StatTile
              label="Compound Interest"
              value={formatMoney(currency, computed.totalInterest)}
            />
            <StatTile
              label="Simple Interest Ref."
              value={formatMoney(currency, computed.simpleInterestBaseline)}
              sublabel="Without compounding"
            />
          </div>

          <div className="rounded-xl border border-[#DCE5F0] overflow-x-auto max-h-72 overflow-y-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F8FBFF] border-b border-[#E2EAF4] text-[#5B708B] sticky top-0">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Year</th>
                  <th className="py-2.5 px-4 font-semibold">Total Contributed</th>
                  <th className="py-2.5 px-4 font-semibold">Interest Earned</th>
                  <th className="py-2.5 px-4 font-semibold">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4F9] font-mono tabular-nums text-[#12345A]">
                {computed.rows.map((row) => (
                  <tr key={row.year}>
                    <td className="py-2 px-4 font-sans font-medium">Year {row.year}</td>
                    <td className="py-2 px-4">{formatMoney(currency, row.contributions)}</td>
                    <td className="py-2 px-4">{formatMoney(currency, row.interest)}</td>
                    <td className="py-2 px-4 font-semibold">{formatMoney(currency, row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CopyButton value={computed.summary} label="Copy Projection Summary" />
        </div>
      ) : (
        <p className="text-sm text-[#B42318]" role="alert">
          Enter valid non-negative numbers and a duration between 1 and 60 years.
        </p>
      )}
    </div>
  );
}

// =========================================================
// 9. Profit Margin Calculator
// =========================================================
export function ProfitMarginCalculatorTool() {
  const [mode, setMode] = useState<'revenue' | 'target-margin' | 'target-markup'>('revenue');
  const [costStr, setCostStr] = useState('40');
  const [priceOrPctStr, setPriceOrPctStr] = useState('60');
  const [qtyStr, setQtyStr] = useState('1');
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]['symbol']>('$');

  const computed = useMemo(() => {
    const cost = Number(costStr);
    const val = Number(priceOrPctStr);
    const qty = Math.max(1, Math.floor(Number(qtyStr) || 1));

    if (!Number.isFinite(cost) || !Number.isFinite(val) || cost < 0 || val < 0) {
      return { error: 'Enter valid non-negative inputs.', valid: false as const };
    }

    let unitPrice = 0;
    if (mode === 'revenue') {
      unitPrice = val;
    } else if (mode === 'target-margin') {
      if (val >= 100) {
        return {
          error: 'Target gross margin percentage must be strictly less than 100%.',
          valid: false as const,
        };
      }
      unitPrice = cost / (1 - val / 100);
    } else {
      unitPrice = cost * (1 + val / 100);
    }

    const unitProfit = unitPrice - cost;
    const marginPct = unitPrice > 0 ? (unitProfit / unitPrice) * 100 : 0;
    const markupPct = cost > 0 ? (unitProfit / cost) * 100 : 0;

    const totalCost = cost * qty;
    const totalRevenue = unitPrice * qty;
    const totalProfit = unitProfit * qty;

    const summary = `Cost: ${formatMoney(currency, totalCost)}\nRevenue: ${formatMoney(currency, totalRevenue)}\nGross Profit: ${formatMoney(currency, totalProfit)}\nGross Margin: ${marginPct.toFixed(2)}%\nMarkup: ${markupPct.toFixed(2)}%`;

    return {
      valid: true as const,
      error: '',
      unitPrice,
      unitProfit,
      marginPct,
      markupPct,
      totalCost,
      totalRevenue,
      totalProfit,
      qty,
      summary,
    };
  }, [mode, costStr, priceOrPctStr, qtyStr, currency]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: 'revenue', label: 'From Cost & Selling Price', defaultVal: '60' },
            { id: 'target-margin', label: 'From Cost & Target Margin %', defaultVal: '40' },
            { id: 'target-markup', label: 'From Cost & Target Markup %', defaultVal: '50' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setMode(tab.id);
              setPriceOrPctStr(tab.defaultVal);
            }}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium ${
              mode === tab.id
                ? 'bg-[#12345A] text-white'
                : 'bg-[#F8FBFF] border border-[#DCE5F0] text-[#39506B] hover:border-[#16C6C9]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="pm-cost" className="text-sm font-medium text-[#12345A]">
            Item Cost (per unit)
          </label>
          <input
            id="pm-cost"
            type="number"
            min="0"
            step="0.01"
            value={costStr}
            onChange={(e) => setCostStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="pm-val" className="text-sm font-medium text-[#12345A]">
            {mode === 'revenue'
              ? 'Selling Price (per unit)'
              : mode === 'target-margin'
                ? 'Target Margin (%)'
                : 'Target Markup (%)'}
          </label>
          <input
            id="pm-val"
            type="number"
            min="0"
            step="0.01"
            value={priceOrPctStr}
            onChange={(e) => setPriceOrPctStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="pm-qty" className="text-sm font-medium text-[#12345A]">
            Units / Quantity
          </label>
          <input
            id="pm-qty"
            type="number"
            min="1"
            value={qtyStr}
            onChange={(e) => setQtyStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="pm-curr" className="text-sm font-medium text-[#12345A]">
            Currency
          </label>
          <select
            id="pm-curr"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as (typeof CURRENCIES)[number]['symbol'])}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.symbol}>
                {c.code} ({c.symbol.trim()})
              </option>
            ))}
          </select>
        </div>
      </div>

      {computed.error && (
        <p className="text-sm text-[#B42318]" role="alert">
          {computed.error}
        </p>
      )}

      {computed.valid && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatTile
              label={computed.qty > 1 ? `Total Selling Revenue (${computed.qty})` : 'Selling Price'}
              value={formatMoney(currency, computed.totalRevenue)}
            />
            <StatTile
              label={computed.qty > 1 ? 'Total Gross Profit' : 'Gross Profit'}
              value={formatMoney(currency, computed.totalProfit)}
            />
            <StatTile label="Gross Margin %" value={`${computed.marginPct.toFixed(2)}%`} />
            <StatTile label="Markup %" value={`${computed.markupPct.toFixed(2)}%`} />
          </div>
          <CopyButton value={computed.summary} label="Copy Margin Breakdown" />
        </div>
      )}
    </div>
  );
}
