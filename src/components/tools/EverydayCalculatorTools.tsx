import { useMemo, useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { CopyButton, StatTile } from './ToolSharedUI';

// 13. Percentage Calculator
export function PercentageCalculatorTool() {
  const [pctA, setPctA] = useState('15');
  const [ofB, setOfB] = useState('240');

  const [partX, setPartX] = useState('45');
  const [wholeY, setWholeY] = useState('180');

  const [fromVal, setFromVal] = useState('120');
  const [toVal, setToVal] = useState('150');

  const res1 = useMemo(() => {
    const a = Number(pctA);
    const b = Number(ofB);
    if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
    return (a / 100) * b;
  }, [pctA, ofB]);

  const res2 = useMemo(() => {
    const x = Number(partX);
    const y = Number(wholeY);
    if (!Number.isFinite(x) || !Number.isFinite(y) || y === 0) return null;
    return (x / y) * 100;
  }, [partX, wholeY]);

  const res3 = useMemo(() => {
    const f = Number(fromVal);
    const t = Number(toVal);
    if (!Number.isFinite(f) || !Number.isFinite(t) || f === 0) return null;
    return ((t - f) / Math.abs(f)) * 100;
  }, [fromVal, toVal]);

  const fmt = (n: number | null) =>
    n === null ? '—' : Number.isInteger(n) ? n.toString() : Number(n.toFixed(4)).toString();

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
    const p = Math.max(0, Number(price) || 0);
    const d = Math.min(100, Math.max(0, Number(discountPct) || 0));
    const t = Math.max(0, Number(taxPct) || 0);

    const savings = p * (d / 100);
    const discounted = p - savings;
    const taxAmount = discounted * (t / 100);
    const finalPrice = discounted + taxAmount;

    return {
      savings: savings.toFixed(2),
      discounted: discounted.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
    };
  }, [price, discountPct, taxPct]);

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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile label="Final Price" value={`${currency}${calc.finalPrice}`} />
        <StatTile label="You Save" value={`${currency}${calc.savings}`} />
        <StatTile label="After Discount" value={`${currency}${calc.discounted}`} />
        <StatTile label="Tax Amount" value={`${currency}${calc.taxAmount}`} />
      </div>
    </div>
  );
}

// 15. Age Calculator
export function AgeCalculatorTool() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [birthDate, setBirthDate] = useState('1998-06-15');
  const [asOfDate, setAsOfDate] = useState(todayStr);

  const result = useMemo(() => {
    if (!birthDate || !asOfDate) return null;
    const dob = new Date(`${birthDate}T00:00:00`);
    const target = new Date(`${asOfDate}T00:00:00`);
    if (Number.isNaN(dob.getTime()) || Number.isNaN(target.getTime())) return null;
    if (target < dob) {
      return { ok: false as const, error: 'Target date must be on or after the date of birth.' };
    }

    let years = target.getFullYear() - dob.getFullYear();
    let months = target.getMonth() - dob.getMonth();
    let days = target.getDate() - dob.getDate();

    if (days < 0) {
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
      months -= 1;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    const totalDays = Math.floor((target.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    let nextBirthday = new Date(target.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBirthday < target) {
      nextBirthday = new Date(target.getFullYear() + 1, dob.getMonth(), dob.getDate());
    }
    const daysToNextBirthday = Math.ceil(
      (nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      ok: true as const,
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      daysToNextBirthday,
      birthWeekday: dob.toLocaleDateString('en-US', { weekday: 'long' }),
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
    const d1 = new Date(`${startDate}T00:00:00`);
    const d2 = new Date(`${endDate}T00:00:00`);
    if (Number.isNaN(d1.getTime()) || Number.isNaN(d2.getTime())) return null;

    const earlier = d1 <= d2 ? d1 : d2;
    const later = d1 <= d2 ? d2 : d1;

    const rawDays = Math.round((later.getTime() - earlier.getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = rawDays + (includeEnd ? 1 : 0);

    let weekdays = 0;
    let weekendDays = 0;
    const cursor = new Date(earlier);
    const limit = includeEnd ? rawDays + 1 : rawDays;
    for (let i = 0; i < limit; i++) {
      const day = cursor.getDay();
      if (day === 0 || day === 6) weekendDays++;
      else weekdays++;
      cursor.setDate(cursor.getDate() + 1);
    }

    const weeks = Math.floor(totalDays / 7);
    const remDays = totalDays % 7;

    let years = later.getFullYear() - earlier.getFullYear();
    let months = later.getMonth() - earlier.getMonth();
    let days = later.getDate() - earlier.getDate() + (includeEnd ? 1 : 0);
    if (days < 0) {
      days += new Date(later.getFullYear(), later.getMonth(), 0).getDate();
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

  const converted = useMemo(() => {
    const num = Number(value);
    if (!Number.isFinite(num) || value.trim() === '') return '';
    if (category === 'temperature') {
      let celsius = num;
      if (fromUnit === 'f') celsius = ((num - 32) * 5) / 9;
      else if (fromUnit === 'k') celsius = num - 273.15;

      let out = celsius;
      if (toUnit === 'f') out = (celsius * 9) / 5 + 32;
      else if (toUnit === 'k') out = celsius + 273.15;
      return Number(out.toFixed(6)).toString();
    }

    const units = UNIT_CATALOG[category].units;
    const fDef = units.find((u) => u.id === fromUnit) ?? units[0];
    const tDef = units.find((u) => u.id === toUnit) ?? units[0];
    const base = num * (fDef.factor ?? 1);
    const out = base / (tDef.factor ?? 1);
    return Number(out.toFixed(6)).toString();
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

      <div className="flex justify-end">
        <CopyButton value={converted} label="Copy Result" />
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
    const total1 = (Number(h1) || 0) * 3600 + (Number(m1) || 0) * 60 + (Number(s1) || 0);
    const total2 = (Number(h2) || 0) * 3600 + (Number(m2) || 0) * 60 + (Number(s2) || 0);
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
    if (overnight || endMin < startMin) {
      endMin += 24 * 60;
    }
    const diffMin = endMin - startMin;
    const hrs = Math.floor(diffMin / 60);
    const mins = diffMin % 60;
    return {
      formatted: `${hrs} hours, ${mins} minutes`,
      decimalHours: (diffMin / 60).toFixed(2),
      totalMinutes: diffMin,
    };
  }, [startTime, endTime, overnight]);

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
                <label className="block text-xs text-[#5B708B] mb-1">Hours</label>
                <input
                  type="number"
                  min="0"
                  value={h1}
                  onChange={(e) => setH1(e.target.value)}
                  className="w-full h-10 px-2.5 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs text-[#5B708B] mb-1">Minutes</label>
                <input
                  type="number"
                  min="0"
                  value={m1}
                  onChange={(e) => setM1(e.target.value)}
                  className="w-full h-10 px-2.5 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs text-[#5B708B] mb-1">Seconds</label>
                <input
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
                <label className="block text-xs text-[#5B708B] mb-1">Hours</label>
                <input
                  type="number"
                  min="0"
                  value={h2}
                  onChange={(e) => setH2(e.target.value)}
                  className="w-full h-10 px-2.5 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs text-[#5B708B] mb-1">Minutes</label>
                <input
                  type="number"
                  min="0"
                  value={m2}
                  onChange={(e) => setM2(e.target.value)}
                  className="w-full h-10 px-2.5 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs text-[#5B708B] mb-1">Seconds</label>
                <input
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <StatTile label="Elapsed Duration" value={clockResult.formatted} />
              <StatTile label="Decimal Hours" value={`${clockResult.decimalHours} hrs`} />
              <StatTile label="Total Minutes" value={`${clockResult.totalMinutes} min`} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
