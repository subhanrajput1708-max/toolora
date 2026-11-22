import { useMemo, useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { ClearButton, CopyButton, StatTile } from './ToolSharedUI';

// 13. Percentage Calculator
export function PercentageCalculatorTool() {
  const [pctA, setPctA] = useState('15');
  const [ofB, setOfB] = useState('240');

  const [partX, setPartX] = useState('45');
  const [wholeY, setWholeY] = useState('180');

  const [fromVal, setFromVal] = useState('120');
  const [toVal, setToVal] = useState('150');

  const res1 = useMemo(() => {
    if (pctA.trim() === '' || ofB.trim() === '') return null;
    const a = Number(pctA);
    const b = Number(ofB);
    if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
    return (a / 100) * b;
  }, [pctA, ofB]);

  const res2 = useMemo(() => {
    if (partX.trim() === '' || wholeY.trim() === '') return null;
    const x = Number(partX);
    const y = Number(wholeY);
    if (!Number.isFinite(x) || !Number.isFinite(y) || y === 0) return null;
    return (x / y) * 100;
  }, [partX, wholeY]);

  const res3 = useMemo(() => {
    if (fromVal.trim() === '' || toVal.trim() === '') return null;
    const f = Number(fromVal);
    const t = Number(toVal);
    if (!Number.isFinite(f) || !Number.isFinite(t) || f === 0) return null;
    return ((t - f) / Math.abs(f)) * 100;
  }, [fromVal, toVal]);

  const fmt = (n: number | null) => {
    if (n === null) return '—';
    const clean = Object.is(n, -0) ? 0 : n;
    return Number.isInteger(clean) ? clean.toString() : Number(clean.toFixed(4)).toString();
  };

  const resetAll = () => {
    setPctA('15');
    setOfB('240');
    setPartX('45');
    setWholeY('180');
    setFromVal('120');
    setToVal('150');
  };

  return (
    <div className="space-y-5">
      {/* Mode 1 */}
      <div className="p-5 rounded-xl border border-[#DCE5F0] bg-[#F8FBFF] space-y-3">
        <h3 className="font-display text-sm font-semibold text-[#12345A]">
          1. What is X% of Y?
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#39506B]">
          <span>What is</span>
          <input
            type="number"
            aria-label="Percentage value X"
            value={pctA}
            onChange={(e) => setPctA(e.target.value)}
            className="w-28 h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white text-[#12345A] font-mono tabular-nums"
          />
          <span>% of</span>
          <input
            type="number"
            aria-label="Base number Y"
            value={ofB}
            onChange={(e) => setOfB(e.target.value)}
            className="w-32 h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white text-[#12345A] font-mono tabular-nums"
          />
          <span>=</span>
          <span className="px-3.5 py-2 rounded-lg bg-white border border-[#16C6C9] font-mono font-bold text-[#12345A] tabular-nums">
            {fmt(res1)}
          </span>
          <CopyButton value={res1 !== null ? fmt(res1) : ''} label="Copy" />
        </div>
      </div>

      {/* Mode 2 */}
      <div className="p-5 rounded-xl border border-[#DCE5F0] bg-[#F8FBFF] space-y-3">
        <h3 className="font-display text-sm font-semibold text-[#12345A]">
          2. X is what percent of Y?
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#39506B]">
          <input
            type="number"
            aria-label="Part value X"
            value={partX}
            onChange={(e) => setPartX(e.target.value)}
            className="w-28 h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white text-[#12345A] font-mono tabular-nums"
          />
          <span>is what % of</span>
          <input
            type="number"
            aria-label="Whole value Y"
            value={wholeY}
            onChange={(e) => setWholeY(e.target.value)}
            className="w-32 h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white text-[#12345A] font-mono tabular-nums"
          />
          <span>=</span>
          <span className="px-3.5 py-2 rounded-lg bg-white border border-[#16C6C9] font-mono font-bold text-[#12345A] tabular-nums">
            {res2 !== null ? `${fmt(res2)}%` : '—'}
          </span>
          <CopyButton value={res2 !== null ? `${fmt(res2)}%` : ''} label="Copy" />
        </div>
      </div>

      {/* Mode 3 */}
      <div className="p-5 rounded-xl border border-[#DCE5F0] bg-[#F8FBFF] space-y-3">
        <h3 className="font-display text-sm font-semibold text-[#12345A]">
          3. Percentage Increase or Decrease
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#39506B]">
          <span>From</span>
          <input
            type="number"
            aria-label="Starting value"
            value={fromVal}
            onChange={(e) => setFromVal(e.target.value)}
            className="w-28 h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white text-[#12345A] font-mono tabular-nums"
          />
          <span>to</span>
          <input
            type="number"
            aria-label="Ending value"
            value={toVal}
            onChange={(e) => setToVal(e.target.value)}
            className="w-28 h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white text-[#12345A] font-mono tabular-nums"
          />
          <span>=</span>
          <span className="px-3.5 py-2 rounded-lg bg-white border border-[#16C6C9] font-mono font-bold text-[#12345A] tabular-nums">
            {res3 !== null ? `${res3 > 0 ? '+' : ''}${fmt(res3)}%` : '—'}
          </span>
          <CopyButton
            value={res3 !== null ? `${res3 > 0 ? '+' : ''}${fmt(res3)}%` : ''}
            label="Copy"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <ClearButton onClick={resetAll} label="Reset Examples" />
      </div>
    </div>
  );
}

// 14. Discount Calculator
export function DiscountCalculatorTool() {
  const [price, setPrice] = useState('120');
  const [discountPct, setDiscountPct] = useState('25');
  const [taxPct, setTaxPct] = useState('0');
  const [currency, setCurrency] = useState('$');

  const calc = useMemo(() => {
    const rawP = price.trim() === '' ? 0 : Number(price);
    const rawD = discountPct.trim() === '' ? 0 : Number(discountPct);
    const rawT = taxPct.trim() === '' ? 0 : Number(taxPct);

    const hasNegative = rawP < 0 || rawD < 0 || rawT < 0;
    const discountOver100 = rawD > 100;

    const p = Math.max(0, Number.isFinite(rawP) ? rawP : 0);
    const d = Math.min(100, Math.max(0, Number.isFinite(rawD) ? rawD : 0));
    const t = Math.max(0, Number.isFinite(rawT) ? rawT : 0);

    const savings = p * (d / 100);
    const discounted = p - savings;
    const taxAmount = discounted * (t / 100);
    const finalPrice = discounted + taxAmount;

    return {
      savings: savings.toFixed(2),
      discounted: discounted.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
      warning: hasNegative
        ? 'Negative values were treated as 0.'
        : discountOver100
        ? 'Discount percentages above 100% are capped at 100%.'
        : '',
    };
  }, [price, discountPct, taxPct]);

  const summary = `Final Price: ${currency}${calc.finalPrice} | You Save: ${currency}${calc.savings} | After Discount: ${currency}${calc.discounted} | Tax: ${currency}${calc.taxAmount}`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="disc-currency" className="block text-sm font-medium text-[#12345A] mb-1.5">
            Currency
          </label>
          <select
            id="disc-currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            <option value="$">USD ($)</option>
            <option value="€">EUR (€)</option>
            <option value="£">GBP (£)</option>
            <option value="PKR ">PKR</option>
            <option value="₹">INR (₹)</option>
          </select>
        </div>

        <div>
          <label htmlFor="disc-price" className="block text-sm font-medium text-[#12345A] mb-1.5">
            Original Price
          </label>
          <input
            id="disc-price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm font-mono text-[#12345A] tabular-nums"
          />
        </div>

        <div>
          <label htmlFor="disc-pct" className="block text-sm font-medium text-[#12345A] mb-1.5">
            Discount (%)
          </label>
          <input
            id="disc-pct"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={discountPct}
            onChange={(e) => setDiscountPct(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm font-mono text-[#12345A] tabular-nums"
          />
        </div>

        <div>
          <label htmlFor="disc-tax" className="block text-sm font-medium text-[#12345A] mb-1.5">
            Sales Tax (%)
          </label>
          <input
            id="disc-tax"
            type="number"
            min="0"
            step="0.1"
            value={taxPct}
            onChange={(e) => setTaxPct(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm font-mono text-[#12345A] tabular-nums"
          />
        </div>
      </div>

      {calc.warning && (
        <div role="status" className="p-3 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E]">
          {calc.warning}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile label="Final Price" value={`${currency}${calc.finalPrice}`} />
        <StatTile label="You Save" value={`${currency}${calc.savings}`} />
        <StatTile label="After Discount" value={`${currency}${calc.discounted}`} />
        <StatTile label="Tax Amount" value={`${currency}${calc.taxAmount}`} />
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <CopyButton value={summary} label="Copy Breakdown" />
        <ClearButton
          onClick={() => {
            setPrice('120');
            setDiscountPct('25');
            setTaxPct('0');
          }}
          label="Reset"
        />
      </div>
    </div>
  );
}

// Helper: Parse YYYY-MM-DD strictly in UTC to avoid Daylight Saving Time 23h/25h off-by-one bugs
function parseUtcDateParts(dateStr: string): { year: number; month: number; day: number; ms: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const ms = Date.UTC(year, month, day);
  const check = new Date(ms);
  if (
    Number.isNaN(ms) ||
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month ||
    check.getUTCDate() !== day
  ) {
    return null;
  }
  return { year, month, day, ms };
}

function getLocalTodayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// 15. Age Calculator
export function AgeCalculatorTool() {
  const todayStr = getLocalTodayIso();
  const [birthDate, setBirthDate] = useState('1998-06-15');
  const [asOfDate, setAsOfDate] = useState(todayStr);

  const result = useMemo(() => {
    if (!birthDate || !asOfDate) return null;
    const dob = parseUtcDateParts(birthDate);
    const target = parseUtcDateParts(asOfDate);
    if (!dob || !target) return null;
    if (target.ms < dob.ms) {
      return { ok: false as const, error: 'Target date must be on or after the date of birth.' };
    }

    let years = target.year - dob.year;
    let months = target.month - dob.month;
    let days = target.day - dob.day;

    if (days < 0) {
      const prevMonthLastDay = new Date(Date.UTC(target.year, target.month, 0)).getUTCDate();
      days += prevMonthLastDay;
      months -= 1;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    const totalDays = Math.round((target.ms - dob.ms) / 86_400_000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    let nextBirthdayMs = Date.UTC(target.year, dob.month, dob.day);
    if (nextBirthdayMs < target.ms) {
      nextBirthdayMs = Date.UTC(target.year + 1, dob.month, dob.day);
    }
    const daysToNextBirthday = Math.round((nextBirthdayMs - target.ms) / 86_400_000);

    const birthWeekday = new Date(dob.ms).toLocaleDateString('en-US', {
      weekday: 'long',
      timeZone: 'UTC',
    });

    return {
      ok: true as const,
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      daysToNextBirthday,
      birthWeekday,
    };
  }, [birthDate, asOfDate]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="age-dob" className="block text-sm font-medium text-[#12345A] mb-1.5">
            Date of Birth
          </label>
          <input
            id="age-dob"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm text-[#12345A] tabular-nums"
          />
        </div>
        <div>
          <label htmlFor="age-as-of" className="block text-sm font-medium text-[#12345A] mb-1.5">
            Age at Date
          </label>
          <input
            id="age-as-of"
            type="date"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm text-[#12345A] tabular-nums"
          />
        </div>
      </div>

      {result && !result.ok && (
        <div role="alert" className="p-3.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-sm text-[#991B1B]">
          {result.error}
        </div>
      )}

      {result && result.ok && (
        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-[#DCE5F0] bg-[#F8FBFF]">
            <div className="text-xs font-medium text-[#5B708B]">Exact Age</div>
            <div className="mt-1 text-2xl sm:text-3xl font-display font-bold text-[#12345A] tabular-nums">
              {result.years} years, {result.months} months, {result.days} days
            </div>
            <div className="mt-1.5 text-sm text-[#4B617D]">
              Born on a <strong className="text-[#12345A]">{result.birthWeekday}</strong>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatTile label="Total Months" value={result.totalMonths.toLocaleString()} />
            <StatTile label="Total Weeks" value={result.totalWeeks.toLocaleString()} />
            <StatTile label="Total Days" value={result.totalDays.toLocaleString()} />
            <StatTile
              label="Next Birthday"
              value={result.daysToNextBirthday === 0 ? 'Today' : `${result.daysToNextBirthday} days`}
            />
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <CopyButton
              value={`Age: ${result.years} years, ${result.months} months, ${result.days} days (${result.totalDays.toLocaleString()} total days)`}
              label="Copy Age Summary"
            />
            <ClearButton
              onClick={() => {
                setBirthDate('1998-06-15');
                setAsOfDate(todayStr);
              }}
              label="Reset"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// 16. Date Difference Calculator
export function DateDifferenceCalculatorTool() {
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-12-31');
  const [includeEnd, setIncludeEnd] = useState(false);

  const stats = useMemo(() => {
    if (!startDate || !endDate) return null;
    const d1 = parseUtcDateParts(startDate);
    const d2 = parseUtcDateParts(endDate);
    if (!d1 || !d2) return null;

    const earlier = d1.ms <= d2.ms ? d1 : d2;
    const later = d1.ms <= d2.ms ? d2 : d1;

    const rawDays = Math.round((later.ms - earlier.ms) / 86_400_000);
    const totalDays = rawDays + (includeEnd ? 1 : 0);

    // O(1) weekday/weekend calculation across any date span
    const fullWeeks = Math.floor(totalDays / 7);
    const rem = totalDays % 7;
    let weekdays = fullWeeks * 5;
    let weekendDays = fullWeeks * 2;
    const startDow = new Date(earlier.ms).getUTCDay();
    for (let i = 0; i < rem; i++) {
      const dow = (startDow + i) % 7;
      if (dow === 0 || dow === 6) weekendDays++;
      else weekdays++;
    }

    const weeks = fullWeeks;
    const remDays = rem;

    // Advance effective end date by 1 day cleanly when includeEnd is checked so Dec 31 + 1 rolls to Jan 1
    const effectiveEnd = includeEnd
      ? new Date(later.ms + 86_400_000)
      : new Date(later.ms);

    let years = effectiveEnd.getUTCFullYear() - earlier.year;
    let months = effectiveEnd.getUTCMonth() - earlier.month;
    let days = effectiveEnd.getUTCDate() - earlier.day;
    if (days < 0) {
      days += new Date(Date.UTC(effectiveEnd.getUTCFullYear(), effectiveEnd.getUTCMonth(), 0)).getUTCDate();
      months -= 1;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    return {
      totalDays,
      weeks,
      remDays,
      weekdays,
      weekendDays,
      years,
      months,
      days,
      hours: totalDays * 24,
    };
  }, [startDate, endDate, includeEnd]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date-diff-start" className="block text-sm font-medium text-[#12345A] mb-1.5">
            Start Date
          </label>
          <input
            id="date-diff-start"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm text-[#12345A] tabular-nums"
          />
        </div>
        <div>
          <label htmlFor="date-diff-end" className="block text-sm font-medium text-[#12345A] mb-1.5">
            End Date
          </label>
          <input
            id="date-diff-end"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] focus:bg-white text-sm text-[#12345A] tabular-nums"
          />
        </div>
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-[#12345A] cursor-pointer">
        <input
          type="checkbox"
          checked={includeEnd}
          onChange={(e) => setIncludeEnd(e.target.checked)}
          className="w-4 h-4 accent-[#12345A]"
        />
        <span>Include end date (+1 day)</span>
      </label>

      {stats && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatTile
              label="Total Days"
              value={stats.totalDays.toLocaleString()}
              sublabel={`${stats.weeks} weeks, ${stats.remDays} days`}
            />
            <StatTile
              label="Calendar Span"
              value={`${stats.years}y ${stats.months}m ${stats.days}d`}
            />
            <StatTile label="Weekdays (Mon–Fri)" value={stats.weekdays.toLocaleString()} />
            <StatTile
              label="Weekend Days"
              value={stats.weekendDays.toLocaleString()}
              sublabel={`${stats.hours.toLocaleString()} hours`}
            />
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <CopyButton
              value={`${stats.totalDays.toLocaleString()} days (${stats.years}y ${stats.months}m ${stats.days}d) · ${stats.weekdays.toLocaleString()} weekdays`}
              label="Copy Duration"
            />
            <ClearButton
              onClick={() => {
                setStartDate('2026-01-01');
                setEndDate('2026-12-31');
                setIncludeEnd(false);
              }}
              label="Reset"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// 17. Unit Converter
type UnitCategory = 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'speed' | 'data' | 'time';

interface UnitDef {
  id: string;
  label: string;
  factor?: number; // relative to base unit
}

const UNIT_CATALOG: Record<UnitCategory, { name: string; units: UnitDef[] }> = {
  length: {
    name: 'Length',
    units: [
      { id: 'm', label: 'Meter (m)', factor: 1 },
      { id: 'km', label: 'Kilometer (km)', factor: 1000 },
      { id: 'cm', label: 'Centimeter (cm)', factor: 0.01 },
      { id: 'mm', label: 'Millimeter (mm)', factor: 0.001 },
      { id: 'mi', label: 'Mile (mi)', factor: 1609.344 },
      { id: 'yd', label: 'Yard (yd)', factor: 0.9144 },
      { id: 'ft', label: 'Foot (ft)', factor: 0.3048 },
      { id: 'in', label: 'Inch (in)', factor: 0.0254 },
    ],
  },
  weight: {
    name: 'Weight / Mass',
    units: [
      { id: 'kg', label: 'Kilogram (kg)', factor: 1 },
      { id: 'g', label: 'Gram (g)', factor: 0.001 },
      { id: 'mg', label: 'Milligram (mg)', factor: 0.000001 },
      { id: 'lb', label: 'Pound (lb)', factor: 0.45359237 },
      { id: 'oz', label: 'Ounce (oz)', factor: 0.0283495231 },
      { id: 't', label: 'Metric Ton (t)', factor: 1000 },
    ],
  },
  temperature: {
    name: 'Temperature',
    units: [
      { id: 'c', label: 'Celsius (°C)' },
      { id: 'f', label: 'Fahrenheit (°F)' },
      { id: 'k', label: 'Kelvin (K)' },
    ],
  },
  area: {
    name: 'Area',
    units: [
      { id: 'sqm', label: 'Square Meter (m²)', factor: 1 },
      { id: 'sqkm', label: 'Square Kilometer (km²)', factor: 1_000_000 },
      { id: 'sqft', label: 'Square Foot (ft²)', factor: 0.09290304 },
      { id: 'acre', label: 'Acre', factor: 4046.8564224 },
      { id: 'ha', label: 'Hectare (ha)', factor: 10000 },
    ],
  },
  volume: {
    name: 'Volume',
    units: [
      { id: 'l', label: 'Liter (L)', factor: 1 },
      { id: 'ml', label: 'Milliliter (mL)', factor: 0.001 },
      { id: 'gal', label: 'US Gallon (gal)', factor: 3.785411784 },
      { id: 'cup', label: 'US Cup', factor: 0.2365882365 },
      { id: 'floz', label: 'US Fluid Ounce', factor: 0.0295735296 },
    ],
  },
  speed: {
    name: 'Speed',
    units: [
      { id: 'kph', label: 'Kilometers/hour (km/h)', factor: 1 },
      { id: 'mph', label: 'Miles/hour (mph)', factor: 1.609344 },
      { id: 'mps', label: 'Meters/second (m/s)', factor: 3.6 },
      { id: 'knot', label: 'Knots (kn)', factor: 1.852 },
    ],
  },
  data: {
    name: 'Data Storage',
    units: [
      { id: 'b', label: 'Byte (B)', factor: 1 },
      { id: 'kb', label: 'Kilobyte (KB)', factor: 1024 },
      { id: 'mb', label: 'Megabyte (MB)', factor: 1024 ** 2 },
      { id: 'gb', label: 'Gigabyte (GB)', factor: 1024 ** 3 },
      { id: 'tb', label: 'Terabyte (TB)', factor: 1024 ** 4 },
    ],
  },
  time: {
    name: 'Time',
    units: [
      { id: 's', label: 'Second (s)', factor: 1 },
      { id: 'min', label: 'Minute (min)', factor: 60 },
      { id: 'hr', label: 'Hour (hr)', factor: 3600 },
      { id: 'day', label: 'Day', factor: 86400 },
      { id: 'wk', label: 'Week', factor: 604800 },
    ],
  },
};

function formatConvertedNumber(out: number): string {
  if (Math.abs(out) < 1e-12) return '0';
  if (Math.abs(out) > 0 && Math.abs(out) < 0.0001) {
    return Number(out.toPrecision(6)).toString();
  }
  return Number(out.toFixed(6)).toString();
}

export function UnitConverterTool() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [value, setValue] = useState('10');
  const [fromUnit, setFromUnit] = useState('km');
  const [toUnit, setToUnit] = useState('mi');

  const handleCategoryChange = (next: UnitCategory) => {
    setCategory(next);
    const list = UNIT_CATALOG[next].units;
    setFromUnit(list[0].id);
    setToUnit(list[1]?.id ?? list[0].id);
  };

  const { converted, tempNote } = useMemo(() => {
    const num = Number(value);
    if (!Number.isFinite(num) || value.trim() === '') return { converted: '', tempNote: '' };
    if (category === 'temperature') {
      let celsius = num;
      if (fromUnit === 'f') celsius = ((num - 32) * 5) / 9;
      else if (fromUnit === 'k') celsius = num - 273.15;

      let out = celsius;
      if (toUnit === 'f') out = (celsius * 9) / 5 + 32;
      else if (toUnit === 'k') out = celsius + 273.15;

      return {
        converted: formatConvertedNumber(out),
        tempNote:
          celsius < -273.15
            ? 'Note: This temperature is below physical absolute zero (−273.15 °C / 0 K).'
            : '',
      };
    }

    const units = UNIT_CATALOG[category].units;
    const fDef = units.find((u) => u.id === fromUnit) ?? units[0];
    const tDef = units.find((u) => u.id === toUnit) ?? units[0];
    const base = num * (fDef.factor ?? 1);
    const out = base / (tDef.factor ?? 1);
    return { converted: formatConvertedNumber(out), tempNote: '' };
  }, [category, value, fromUnit, toUnit]);

  const currentUnits = UNIT_CATALOG[category].units;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(UNIT_CATALOG) as UnitCategory[]).map((catKey) => (
          <button
            key={catKey}
            type="button"
            onClick={() => handleCategoryChange(catKey)}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              category === catKey
                ? 'bg-[#12345A] text-white'
                : 'bg-[#F8FBFF] border border-[#D4E0EE] text-[#39506B] hover:border-[#16C6C9]'
            }`}
          >
            {UNIT_CATALOG[catKey].name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end p-5 rounded-xl border border-[#DCE5F0] bg-[#F8FBFF]">
        <div className="space-y-2">
          <label htmlFor="unit-from-val" className="block text-xs font-medium text-[#5B708B]">
            From
          </label>
          <input
            id="unit-from-val"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-white text-base font-mono text-[#12345A] tabular-nums"
          />
          <select
            aria-label="From unit"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            {currentUnits.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => {
            setFromUnit(toUnit);
            setToUnit(fromUnit);
          }}
          aria-label="Swap units"
          className="h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-white text-[#12345A] hover:border-[#16C6C9] inline-flex items-center justify-center self-center md:self-end"
        >
          <ArrowLeftRight className="w-4 h-4 text-[#0FA7AA]" aria-hidden="true" />
        </button>

        <div className="space-y-2">
          <label htmlFor="unit-to-val" className="block text-xs font-medium text-[#5B708B]">
            To Result
          </label>
          <input
            id="unit-to-val"
            type="text"
            readOnly
            value={converted}
            placeholder="—"
            className="w-full h-11 px-3.5 rounded-lg border border-[#16C6C9] bg-white text-base font-mono font-bold text-[#12345A] tabular-nums"
          />
          <select
            aria-label="To unit"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            {currentUnits.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {tempNote && (
        <div role="status" className="p-3 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E]">
          {tempNote}
        </div>
      )}

      <div className="flex flex-wrap justify-end gap-2">
        <CopyButton value={converted} label="Copy Result" />
        <ClearButton
          onClick={() => {
            setCategory('length');
            setValue('10');
            setFromUnit('km');
            setToUnit('mi');
          }}
          label="Reset"
        />
      </div>
    </div>
  );
}

// 18. Time Calculator
export function TimeCalculatorTool() {
  const [tab, setTab] = useState<'math' | 'clock'>('math');

  // Duration Math state
  const [op, setOp] = useState<'add' | 'sub'>('add');
  const [h1, setH1] = useState('2');
  const [m1, setM1] = useState('45');
  const [s1, setS1] = useState('30');
  const [h2, setH2] = useState('1');
  const [m2, setM2] = useState('35');
  const [s2, setS2] = useState('45');

  // Clock span state
  const [startTime, setStartTime] = useState('09:15');
  const [endTime, setEndTime] = useState('17:45');
  const [overnight, setOvernight] = useState(false);

  const mathResult = useMemo(() => {
    const safeNum = (v: string) => Math.max(0, Number(v) || 0);
    const total1 = Math.round(safeNum(h1) * 3600 + safeNum(m1) * 60 + safeNum(s1));
    const total2 = Math.round(safeNum(h2) * 3600 + safeNum(m2) * 60 + safeNum(s2));
    const diff = op === 'add' ? total1 + total2 : total1 - total2;
    const sign = diff < 0 ? '-' : '';
    const abs = Math.abs(diff);
    const hrs = Math.floor(abs / 3600);
    const mins = Math.floor((abs % 3600) / 60);
    const secs = abs % 60;
    const pad = (n: number) => String(n).padStart(2, '0');

    return {
      formatted: `${sign}${pad(hrs)}:${pad(mins)}:${pad(secs)}`,
      decimalHours: (diff / 3600).toFixed(2),
      totalMinutes: (diff / 60).toFixed(1),
      totalSeconds: diff,
    };
  }, [op, h1, m1, s1, h2, m2, s2]);

  const clockResult = useMemo(() => {
    const [sh, sm] = startTime.split(':').map(Number);
    const [eh, em] = endTime.split(':').map(Number);
    if ([sh, sm, eh, em].some(Number.isNaN)) return null;
    const startMin = sh * 60 + sm;
    let endMin = eh * 60 + em;
    const wrappedNextDay = overnight || endMin < startMin;
    if (wrappedNextDay) {
      endMin += 24 * 60;
    }
    const diffMin = endMin - startMin;
    const hrs = Math.floor(diffMin / 60);
    const mins = diffMin % 60;
    return {
      formatted: `${hrs} hours, ${mins} minutes`,
      decimalHours: (diffMin / 60).toFixed(2),
      totalMinutes: diffMin,
      wrappedNextDay,
    };
  }, [startTime, endTime, overnight]);

  const resetCurrentTab = () => {
    if (tab === 'math') {
      setOp('add');
      setH1('2');
      setM1('45');
      setS1('30');
      setH2('1');
      setM2('35');
      setS2('45');
    } else {
      setStartTime('09:15');
      setEndTime('17:45');
      setOvernight(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="inline-flex p-1 rounded-lg bg-[#E6EEF7]">
        <button
          type="button"
          onClick={() => setTab('math')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            tab === 'math' ? 'bg-white text-[#12345A] shadow-xs' : 'text-[#4B617D]'
          }`}
        >
          Add / Subtract Durations
        </button>
        <button
          type="button"
          onClick={() => setTab('clock')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            tab === 'clock' ? 'bg-white text-[#12345A] shadow-xs' : 'text-[#4B617D]'
          }`}
        >
          Time Between Clock Times
        </button>
      </div>

      {tab === 'math' ? (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center p-5 rounded-xl border border-[#DCE5F0] bg-[#F8FBFF]">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label htmlFor="t1-h" className="block text-xs text-[#5B708B] mb-1">Hours</label>
                <input
                  id="t1-h"
                  type="number"
                  min="0"
                  value={h1}
                  onChange={(e) => setH1(e.target.value)}
                  className="w-full h-10 px-2.5 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm tabular-nums"
                />
              </div>
              <div>
                <label htmlFor="t1-m" className="block text-xs text-[#5B708B] mb-1">Minutes</label>
                <input
                  id="t1-m"
                  type="number"
                  min="0"
                  value={m1}
                  onChange={(e) => setM1(e.target.value)}
                  className="w-full h-10 px-2.5 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm tabular-nums"
                />
              </div>
              <div>
                <label htmlFor="t1-s" className="block text-xs text-[#5B708B] mb-1">Seconds</label>
                <input
                  id="t1-s"
                  type="number"
                  min="0"
                  value={s1}
                  onChange={(e) => setS1(e.target.value)}
                  className="w-full h-10 px-2.5 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm tabular-nums"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <select
                aria-label="Operation"
                value={op}
                onChange={(e) => setOp(e.target.value as 'add' | 'sub')}
                className="h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white font-semibold text-[#12345A]"
              >
                <option value="add">+ Add</option>
                <option value="sub">− Subtract</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label htmlFor="t2-h" className="block text-xs text-[#5B708B] mb-1">Hours</label>
                <input
                  id="t2-h"
                  type="number"
                  min="0"
                  value={h2}
                  onChange={(e) => setH2(e.target.value)}
                  className="w-full h-10 px-2.5 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm tabular-nums"
                />
              </div>
              <div>
                <label htmlFor="t2-m" className="block text-xs text-[#5B708B] mb-1">Minutes</label>
                <input
                  id="t2-m"
                  type="number"
                  min="0"
                  value={m2}
                  onChange={(e) => setM2(e.target.value)}
                  className="w-full h-10 px-2.5 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm tabular-nums"
                />
              </div>
              <div>
                <label htmlFor="t2-s" className="block text-xs text-[#5B708B] mb-1">Seconds</label>
                <input
                  id="t2-s"
                  type="number"
                  min="0"
                  value={s2}
                  onChange={(e) => setS2(e.target.value)}
                  className="w-full h-10 px-2.5 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm tabular-nums"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatTile label="Result (HH:MM:SS)" value={mathResult.formatted} />
            <StatTile label="Decimal Hours" value={mathResult.decimalHours} />
            <StatTile label="Total Minutes" value={mathResult.totalMinutes} />
            <StatTile label="Total Seconds" value={mathResult.totalSeconds.toLocaleString()} />
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <CopyButton
              value={`${mathResult.formatted} (${mathResult.decimalHours} decimal hrs)`}
              label="Copy Result"
            />
            <ClearButton onClick={resetCurrentTab} label="Reset" />
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="clock-start" className="block text-sm font-medium text-[#12345A] mb-1.5">
                Start Time
              </label>
              <input
                id="clock-start"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] text-sm text-[#12345A] tabular-nums"
              />
            </div>
            <div>
              <label htmlFor="clock-end" className="block text-sm font-medium text-[#12345A] mb-1.5">
                End Time
              </label>
              <input
                id="clock-end"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] text-sm text-[#12345A] tabular-nums"
              />
            </div>
          </div>

          <label className="inline-flex items-center gap-2 text-sm text-[#12345A] cursor-pointer">
            <input
              type="checkbox"
              checked={overnight}
              onChange={(e) => setOvernight(e.target.checked)}
              className="w-4 h-4 accent-[#12345A]"
            />
            <span>End time is on the next day</span>
          </label>

          {clockResult && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <StatTile
                  label="Elapsed Duration"
                  value={clockResult.formatted}
                  sublabel={clockResult.wrappedNextDay ? 'Crosses midnight (next day)' : 'Same calendar day'}
                />
                <StatTile label="Decimal Hours" value={`${clockResult.decimalHours} hrs`} />
                <StatTile label="Total Minutes" value={`${clockResult.totalMinutes} min`} />
              </div>

              <div className="flex flex-wrap justify-end gap-2">
                <CopyButton
                  value={`${clockResult.formatted} (${clockResult.decimalHours} hrs)`}
                  label="Copy Duration"
                />
                <ClearButton onClick={resetCurrentTab} label="Reset" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
