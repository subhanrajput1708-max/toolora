import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { CopyButton, StatTile } from './ToolSharedUI';

const MS_PER_DAY = 86_400_000;

function parseIsoUtc(dateStr: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr.trim());
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]) - 1;
  const d = Number(match[3]);
  const utc = new Date(Date.UTC(y, m, d));
  if (utc.getUTCFullYear() !== y || utc.getUTCMonth() !== m || utc.getUTCDate() !== d) return null;
  return utc;
}

function formatUtcIso(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatUtcHuman(d: Date): string {
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function getTodayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function playFinishChime() {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.001, now + i * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.14, now + i * 0.14 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.14 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.14);
      osc.stop(now + i * 0.14 + 0.38);
    });
    setTimeout(() => {
      void ctx.close().catch(() => undefined);
    }, 1200);
  } catch {
    // Ignore audio context restrictions
  }
}

function formatSignificant(value: number, decimals = 6): string {
  if (!Number.isFinite(value)) return '—';
  if (value === 0) return '0';
  const abs = Math.abs(value);
  if (abs >= 1e15 || (abs > 0 && abs < 1e-6)) {
    return value.toExponential(4);
  }
  return Number(value.toFixed(decimals)).toLocaleString('en-US', {
    maximumFractionDigits: decimals,
  });
}

// =========================================================
// 1. Add/Subtract Days Calculator
// =========================================================
export function AddDaysToDateTool() {
  const [startDate, setStartDate] = useState(getTodayIso);
  const [operation, setOperation] = useState<'add' | 'sub'>('add');
  const [amountStr, setAmountStr] = useState('30');
  const [unit, setUnit] = useState<'days' | 'weeks' | 'months' | 'years' | 'business'>('days');

  const computed = useMemo(() => {
    const start = parseIsoUtc(startDate);
    const amountRaw = Math.floor(Number(amountStr));
    if (!start || !Number.isFinite(amountRaw) || amountRaw < 0 || amountRaw > 50_000) {
      return null;
    }

    const dir = operation === 'add' ? 1 : -1;
    let target = new Date(start.getTime());

    if (unit === 'days') {
      target = new Date(start.getTime() + dir * amountRaw * MS_PER_DAY);
    } else if (unit === 'weeks') {
      target = new Date(start.getTime() + dir * amountRaw * 7 * MS_PER_DAY);
    } else if (unit === 'months' || unit === 'years') {
      const y = start.getUTCFullYear();
      const m = start.getUTCMonth();
      const d = start.getUTCDate();
      const monthOffset = unit === 'years' ? dir * amountRaw * 12 : dir * amountRaw;
      const tmp = new Date(Date.UTC(y, m + monthOffset, 1));
      const daysInTargetMonth = new Date(
        Date.UTC(tmp.getUTCFullYear(), tmp.getUTCMonth() + 1, 0)
      ).getUTCDate();
      target = new Date(
        Date.UTC(tmp.getUTCFullYear(), tmp.getUTCMonth(), Math.min(d, daysInTargetMonth))
      );
    } else {
      let remaining = amountRaw;
      let cursor = start.getTime();
      while (remaining > 0) {
        cursor += dir * MS_PER_DAY;
        const dow = new Date(cursor).getUTCDay();
        if (dow !== 0 && dow !== 6) {
          remaining--;
        }
      }
      target = new Date(cursor);
    }

    const calendarDiffDays = Math.round((target.getTime() - start.getTime()) / MS_PER_DAY);
    const iso = formatUtcIso(target);
    const human = formatUtcHuman(target);

    return {
      iso,
      human,
      weekday: target.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' }),
      calendarDiffDays,
    };
  }, [startDate, operation, amountStr, unit]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="add-days-start" className="text-sm font-medium text-[#12345A]">
            Start Date
          </label>
          <input
            id="add-days-start"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="add-days-op" className="text-sm font-medium text-[#12345A]">
            Operation
          </label>
          <select
            id="add-days-op"
            value={operation}
            onChange={(e) => setOperation(e.target.value as 'add' | 'sub')}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            <option value="add">Add (+)</option>
            <option value="sub">Subtract (-)</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="add-days-amount" className="text-sm font-medium text-[#12345A]">
            Quantity
          </label>
          <input
            id="add-days-amount"
            type="number"
            min="0"
            max="50000"
            value={amountStr}
            onChange={(e) => setAmountStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="add-days-unit" className="text-sm font-medium text-[#12345A]">
            Time Unit
          </label>
          <select
            id="add-days-unit"
            value={unit}
            onChange={(e) =>
              setUnit(e.target.value as 'days' | 'weeks' | 'months' | 'years' | 'business')
            }
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            <option value="days">Calendar Days</option>
            <option value="business">Business Days (Mon–Fri)</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[7, 14, 30, 60, 90, 180].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => {
              setAmountStr(String(d));
              setUnit('days');
            }}
            className="px-3 py-1.5 rounded-lg border border-[#DCE5F0] bg-[#F8FBFF] text-xs font-medium text-[#12345A] hover:border-[#16C6C9]"
          >
            {operation === 'add' ? '+' : '-'}
            {d} days
          </button>
        ))}
      </div>

      {computed ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-[#DCE5F0] bg-[#F8FBFF] p-5">
            <div className="text-xs font-medium text-[#5B708B]">Resulting Calendar Date</div>
            <div className="mt-1 font-display font-bold text-2xl sm:text-3xl text-[#12345A]">
              {computed.human}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatTile label="ISO Date (YYYY-MM-DD)" value={computed.iso} />
            <StatTile label="Day of Week" value={computed.weekday} />
            <StatTile
              label="Calendar Days Offset"
              value={`${computed.calendarDiffDays >= 0 ? '+' : ''}${computed.calendarDiffDays} days`}
            />
          </div>
          <CopyButton value={`${computed.human} (${computed.iso})`} label="Copy Resulting Date" />
        </div>
      ) : (
        <p className="text-sm text-[#B42318]" role="alert">
          Enter a valid start date and quantity between 0 and 50,000.
        </p>
      )}
    </div>
  );
}

// =========================================================
// 2. Week Number Calculator
// =========================================================
export function WeekNumberCalculatorTool() {
  const [dateStr, setDateStr] = useState(getTodayIso);

  const info = useMemo(() => {
    const utc = parseIsoUtc(dateStr);
    if (!utc) return null;

    const year = utc.getUTCFullYear();
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const totalDaysInYear = isLeap ? 366 : 365;
    const jan1 = new Date(Date.UTC(year, 0, 1));
    const dayOfYear = Math.round((utc.getTime() - jan1.getTime()) / MS_PER_DAY) + 1;
    const daysLeft = totalDaysInYear - dayOfYear;
    const quarter = Math.floor(utc.getUTCMonth() / 3) + 1;

    // ISO-8601 week calculation
    const dayNum = utc.getUTCDay() || 7; // Mon=1..Sun=7
    const thursday = new Date(utc.getTime());
    thursday.setUTCDate(utc.getUTCDate() + 4 - dayNum);
    const isoYear = thursday.getUTCFullYear();
    const yearStart = new Date(Date.UTC(isoYear, 0, 1));
    const isoWeek = Math.ceil(((thursday.getTime() - yearStart.getTime()) / MS_PER_DAY + 1) / 7);

    // Week span Monday..Sunday
    const monday = new Date(utc.getTime() - (dayNum - 1) * MS_PER_DAY);
    const sunday = new Date(monday.getTime() + 6 * MS_PER_DAY);

    const spanText = `${formatUtcIso(monday)} to ${formatUtcIso(sunday)}`;
    const summary = `Date: ${formatUtcIso(utc)}\nISO Week: Week ${isoWeek} of ${isoYear}\nWeek Span (Mon–Sun): ${spanText}\nDay of Year: ${dayOfYear} of ${totalDaysInYear} (${daysLeft} remaining)\nQuarter: Q${quarter}`;

    return {
      isoWeek,
      isoYear,
      spanText,
      dayOfYear,
      totalDaysInYear,
      daysLeft,
      quarter,
      isLeap,
      weekday: utc.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' }),
      summary,
    };
  }, [dateStr]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-1.5">
          <label htmlFor="wn-date" className="text-sm font-medium text-[#12345A]">
            Select Calendar Date
          </label>
          <input
            id="wn-date"
            type="date"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <button
          type="button"
          onClick={() => setDateStr(getTodayIso())}
          className="h-11 px-4 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9]"
        >
          Jump to Today
        </button>
      </div>

      {info ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatTile
              label="ISO-8601 Week Number"
              value={`Week ${info.isoWeek}`}
              sublabel={`ISO Year ${info.isoYear}`}
            />
            <StatTile
              label="Day of Year"
              value={`${info.dayOfYear} / ${info.totalDaysInYear}`}
              sublabel={`${info.daysLeft} days left`}
            />
            <StatTile label="Weekday" value={info.weekday} />
            <StatTile
              label="Quarter & Year Type"
              value={`Q${info.quarter}`}
              sublabel={info.isLeap ? 'Leap Year (366d)' : 'Standard Year (365d)'}
            />
          </div>

          <div className="rounded-xl border border-[#DCE5F0] bg-[#F8FBFF] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
            <span className="text-[#4B617D]">Week {info.isoWeek} Span (Monday – Sunday):</span>
            <span className="font-mono font-semibold text-[#12345A]">{info.spanText}</span>
          </div>

          <CopyButton value={info.summary} label="Copy Calendar Summary" />
        </div>
      ) : (
        <p className="text-sm text-[#B42318]" role="alert">
          Select a valid calendar date.
        </p>
      )}
    </div>
  );
}

// =========================================================
// 3. Countdown Timer
// =========================================================
export function CountdownTimerTool() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const initialMs = Math.max(1000, (hours * 3600 + minutes * 60 + seconds) * 1000);
  const [totalMs, setTotalMs] = useState(300_000);
  const [remainingMs, setRemainingMs] = useState(300_000);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const endTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      const left = Math.max(0, endTimeRef.current - Date.now());
      setRemainingMs(left);
      if (left <= 0) {
        setRunning(false);
        setFinished(true);
        if (soundOn) playFinishChime();
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [running, soundOn]);

  const applyDuration = (hrs: number, mins: number, secs: number) => {
    const ms = Math.max(1000, (hrs * 3600 + mins * 60 + secs) * 1000);
    setHours(hrs);
    setMinutes(mins);
    setSeconds(secs);
    setRunning(false);
    setFinished(false);
    setTotalMs(ms);
    setRemainingMs(ms);
  };

  const handleStartPause = () => {
    if (running) {
      setRemainingMs(Math.max(0, endTimeRef.current - Date.now()));
      setRunning(false);
      return;
    }
    const base = remainingMs <= 0 ? initialMs : remainingMs;
    if (remainingMs <= 0) {
      setTotalMs(initialMs);
      setRemainingMs(initialMs);
    }
    setFinished(false);
    endTimeRef.current = Date.now() + base;
    setRunning(true);
  };

  const handleReset = () => {
    setRunning(false);
    setFinished(false);
    setTotalMs(initialMs);
    setRemainingMs(initialMs);
  };

  const handleAddMinute = () => {
    const extra = 60_000;
    setTotalMs((t) => t + extra);
    setRemainingMs((r) => r + extra);
    if (running) {
      endTimeRef.current += extra;
    }
    setFinished(false);
  };

  const secCeil = Math.ceil(remainingMs / 1000);
  const dispH = String(Math.floor(secCeil / 3600)).padStart(2, '0');
  const dispM = String(Math.floor((secCeil % 3600) / 60)).padStart(2, '0');
  const dispS = String(secCeil % 60).padStart(2, '0');
  const pct = totalMs > 0 ? Math.max(0, Math.min(100, (remainingMs / totalMs) * 100)) : 0;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#DCE5F0] bg-[#FAFBFD] p-6 sm:p-8 text-center space-y-5">
        <div className="font-mono font-bold text-5xl sm:text-6xl text-[#12345A] tracking-tight tabular-nums">
          {dispH}:{dispM}:{dispS}
        </div>

        <div className="max-w-md mx-auto h-2.5 rounded-full bg-[#E2EAF4] overflow-hidden">
          <div
            className="h-full bg-[#16C6C9] transition-all duration-150"
            style={{ width: `${pct}%` }}
          />
        </div>

        {finished && (
          <div
            role="status"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#ECFDF3] border border-[#ABEFC6] text-sm font-semibold text-[#067647]"
          >
            Countdown Complete!
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleStartPause}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678] transition-colors"
          >
            {running ? <Pause className="w-4 h-4 text-[#16C6C9]" /> : <Play className="w-4 h-4 text-[#16C6C9]" />}
            <span>{running ? 'Pause' : remainingMs > 0 && remainingMs < totalMs ? 'Resume' : 'Start Timer'}</span>
          </button>

          <button
            type="button"
            onClick={handleAddMinute}
            className="h-11 px-4 rounded-xl border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9]"
          >
            +1 min
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl border border-[#D4E0EE] bg-white text-sm font-medium text-[#39506B] hover:border-[#12345A]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={() => setSoundOn((s) => !s)}
            aria-label={soundOn ? 'Mute finish chime' : 'Enable finish chime'}
            className="inline-flex items-center gap-1.5 h-11 px-3.5 rounded-xl border border-[#D4E0EE] bg-white text-sm text-[#12345A] hover:border-[#16C6C9]"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-[#0FA7AA]" /> : <VolumeX className="w-4 h-4 text-[#5B708B]" />}
            <span>{soundOn ? 'Sound On' : 'Muted'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#5B708B]">
            Presets:
          </span>
          {[
            { label: '1 min', h: 0, m: 1, s: 0 },
            { label: '3 min', h: 0, m: 3, s: 0 },
            { label: '5 min', h: 0, m: 5, s: 0 },
            { label: '10 min', h: 0, m: 10, s: 0 },
            { label: '15 min', h: 0, m: 15, s: 0 },
            { label: '30 min', h: 0, m: 30, s: 0 },
          ].map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => applyDuration(p.h, p.m, p.s)}
              className="px-3 py-1.5 rounded-lg border border-[#DCE5F0] bg-white text-xs font-semibold text-[#12345A] hover:border-[#16C6C9]"
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-md">
          <div>
            <label htmlFor="ct-hr" className="text-xs font-medium text-[#5B708B]">
              Hours
            </label>
            <input
              id="ct-hr"
              type="number"
              min={0}
              max={99}
              disabled={running}
              value={hours}
              onChange={(e) => applyDuration(Math.max(0, Math.min(99, Number(e.target.value) || 0)), minutes, seconds)}
              className="mt-1 w-full h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm text-[#12345A] disabled:opacity-60"
            />
          </div>
          <div>
            <label htmlFor="ct-min" className="text-xs font-medium text-[#5B708B]">
              Minutes
            </label>
            <input
              id="ct-min"
              type="number"
              min={0}
              max={59}
              disabled={running}
              value={minutes}
              onChange={(e) => applyDuration(hours, Math.max(0, Math.min(59, Number(e.target.value) || 0)), seconds)}
              className="mt-1 w-full h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm text-[#12345A] disabled:opacity-60"
            />
          </div>
          <div>
            <label htmlFor="ct-sec" className="text-xs font-medium text-[#5B708B]">
              Seconds
            </label>
            <input
              id="ct-sec"
              type="number"
              min={0}
              max={59}
              disabled={running}
              value={seconds}
              onChange={(e) => applyDuration(hours, minutes, Math.max(0, Math.min(59, Number(e.target.value) || 0)))}
              className="mt-1 w-full h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm text-[#12345A] disabled:opacity-60"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================
// 4. Length Converter (Simultaneous Multi-Unit)
// =========================================================
const LENGTH_UNITS = [
  { id: 'mm', label: 'Millimeters (mm)', toMeters: 0.001 },
  { id: 'cm', label: 'Centimeters (cm)', toMeters: 0.01 },
  { id: 'm', label: 'Meters (m)', toMeters: 1 },
  { id: 'km', label: 'Kilometers (km)', toMeters: 1000 },
  { id: 'in', label: 'Inches (in)', toMeters: 0.0254 },
  { id: 'ft', label: 'Feet (ft)', toMeters: 0.3048 },
  { id: 'yd', label: 'Yards (yd)', toMeters: 0.9144 },
  { id: 'mi', label: 'Miles (mi)', toMeters: 1609.344 },
  { id: 'nmi', label: 'Nautical Miles (nmi)', toMeters: 1852 },
] as const;

export function LengthConverterTool() {
  const [valueStr, setValueStr] = useState('100');
  const [fromId, setFromId] = useState<(typeof LENGTH_UNITS)[number]['id']>('cm');

  const rows = useMemo(() => {
    const val = Number(valueStr);
    const valid = valueStr.trim() !== '' && Number.isFinite(val);
    const src = LENGTH_UNITS.find((u) => u.id === fromId) ?? LENGTH_UNITS[1];
    const meters = valid ? val * src.toMeters : null;

    return LENGTH_UNITS.map((u) => {
      const converted = meters !== null ? meters / u.toMeters : null;
      return {
        ...u,
        formatted: converted !== null ? formatSignificant(converted, 6) : '—',
        raw: converted !== null ? String(Number(converted.toFixed(6))) : '',
      };
    });
  }, [valueStr, fromId]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="len-val" className="text-sm font-medium text-[#12345A]">
            Value
          </label>
          <input
            id="len-val"
            type="number"
            step="any"
            value={valueStr}
            onChange={(e) => setValueStr(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="len-unit" className="text-sm font-medium text-[#12345A]">
            Input Unit
          </label>
          <select
            id="len-unit"
            value={fromId}
            onChange={(e) => setFromId(e.target.value as (typeof LENGTH_UNITS)[number]['id'])}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            {LENGTH_UNITS.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {rows.map((row) => (
          <div
            key={row.id}
            className={`rounded-xl border p-4 flex items-center justify-between gap-3 ${
              row.id === fromId ? 'border-[#16C6C9] bg-[#EEF6FB]' : 'border-[#E2EAF4] bg-[#F8FBFF]'
            }`}
          >
            <div className="min-w-0">
              <div className="text-xs font-medium text-[#5B708B]">{row.label}</div>
              <div className="mt-1 font-mono font-bold text-lg text-[#12345A] truncate tabular-nums">
                {row.formatted}
              </div>
            </div>
            <CopyButton value={row.raw} label="Copy" className="h-8 px-2.5 text-xs shrink-0" disabled={!row.raw} />
          </div>
        ))}
      </div>
    </div>
  );
}

// =========================================================
// 5. Weight Converter (Simultaneous Multi-Unit)
// =========================================================
const WEIGHT_UNITS = [
  { id: 'mg', label: 'Milligrams (mg)', toGrams: 0.001 },
  { id: 'g', label: 'Grams (g)', toGrams: 1 },
  { id: 'kg', label: 'Kilograms (kg)', toGrams: 1000 },
  { id: 't', label: 'Metric Tons (t)', toGrams: 1_000_000 },
  { id: 'oz', label: 'Ounces (oz)', toGrams: 28.349523125 },
  { id: 'lb', label: 'Pounds (lbs)', toGrams: 453.59237 },
  { id: 'st', label: 'Stone (UK)', toGrams: 6350.29318 },
] as const;

export function WeightConverterTool() {
  const [valueStr, setValueStr] = useState('1');
  const [fromId, setFromId] = useState<(typeof WEIGHT_UNITS)[number]['id']>('kg');

  const rows = useMemo(() => {
    const val = Number(valueStr);
    const valid = valueStr.trim() !== '' && Number.isFinite(val);
    const src = WEIGHT_UNITS.find((u) => u.id === fromId) ?? WEIGHT_UNITS[2];
    const grams = valid ? val * src.toGrams : null;

    return WEIGHT_UNITS.map((u) => {
      const converted = grams !== null ? grams / u.toGrams : null;
      return {
        ...u,
        formatted: converted !== null ? formatSignificant(converted, 6) : '—',
        raw: converted !== null ? String(Number(converted.toFixed(6))) : '',
      };
    });
  }, [valueStr, fromId]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="wt-val" className="text-sm font-medium text-[#12345A]">
            Value
          </label>
          <input
            id="wt-val"
            type="number"
            step="any"
            value={valueStr}
            onChange={(e) => setValueStr(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="wt-unit" className="text-sm font-medium text-[#12345A]">
            Input Unit
          </label>
          <select
            id="wt-unit"
            value={fromId}
            onChange={(e) => setFromId(e.target.value as (typeof WEIGHT_UNITS)[number]['id'])}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            {WEIGHT_UNITS.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {rows.map((row) => (
          <div
            key={row.id}
            className={`rounded-xl border p-4 flex items-center justify-between gap-3 ${
              row.id === fromId ? 'border-[#16C6C9] bg-[#EEF6FB]' : 'border-[#E2EAF4] bg-[#F8FBFF]'
            }`}
          >
            <div className="min-w-0">
              <div className="text-xs font-medium text-[#5B708B]">{row.label}</div>
              <div className="mt-1 font-mono font-bold text-lg text-[#12345A] truncate tabular-nums">
                {row.formatted}
              </div>
            </div>
            <CopyButton value={row.raw} label="Copy" className="h-8 px-2.5 text-xs shrink-0" disabled={!row.raw} />
          </div>
        ))}
      </div>
    </div>
  );
}

// =========================================================
// 6. Temperature Converter
// =========================================================
export function TemperatureConverterTool() {
  const [valueStr, setValueStr] = useState('25');
  const [scale, setScale] = useState<'C' | 'F' | 'K'>('C');

  const computed = useMemo(() => {
    const val = Number(valueStr);
    if (valueStr.trim() === '' || !Number.isFinite(val)) return null;
    const c = scale === 'C' ? val : scale === 'F' ? ((val - 32) * 5) / 9 : val - 273.15;
    const f = (c * 9) / 5 + 32;
    const k = c + 273.15;
    return {
      c,
      f,
      k,
      belowAbsoluteZero: k < 0,
    };
  }, [valueStr, scale]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="tmp-val" className="text-sm font-medium text-[#12345A]">
            Temperature Value
          </label>
          <input
            id="tmp-val"
            type="number"
            step="any"
            value={valueStr}
            onChange={(e) => setValueStr(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="tmp-scale" className="text-sm font-medium text-[#12345A]">
            Input Scale
          </label>
          <select
            id="tmp-scale"
            value={scale}
            onChange={(e) => setScale(e.target.value as 'C' | 'F' | 'K')}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
            <option value="K">Kelvin (K)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Water Freezes (0 °C)', v: '0', s: 'C' as const },
          { label: 'Equal Point (-40°)', v: '-40', s: 'C' as const },
          { label: 'Body Temp (98.6 °F)', v: '98.6', s: 'F' as const },
          { label: 'Water Boils (100 °C)', v: '100', s: 'C' as const },
          { label: 'Absolute Zero (0 K)', v: '0', s: 'K' as const },
        ].map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setValueStr(p.v);
              setScale(p.s);
            }}
            className="px-3 py-1.5 rounded-lg border border-[#DCE5F0] bg-[#F8FBFF] text-xs font-medium text-[#12345A] hover:border-[#16C6C9]"
          >
            {p.label}
          </button>
        ))}
      </div>

      {computed && computed.belowAbsoluteZero && (
        <p className="text-xs font-medium text-[#9A5B13]" role="status">
          Note: Input drops below physical Absolute Zero (-273.15 °C / 0 K). Mathematical equivalents shown below.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { code: 'C', title: 'Celsius (°C)', val: computed ? `${formatSignificant(computed.c, 4)} °C` : '—', copy: computed ? `${Number(computed.c.toFixed(4))}` : '' },
          { code: 'F', title: 'Fahrenheit (°F)', val: computed ? `${formatSignificant(computed.f, 4)} °F` : '—', copy: computed ? `${Number(computed.f.toFixed(4))}` : '' },
          { code: 'K', title: 'Kelvin (K)', val: computed ? `${formatSignificant(computed.k, 4)} K` : '—', copy: computed ? `${Number(computed.k.toFixed(4))}` : '' },
        ].map((item) => (
          <div key={item.code} className="rounded-xl border border-[#DCE5F0] bg-[#F8FBFF] p-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-medium text-[#5B708B]">{item.title}</div>
              <div className="mt-1 font-mono font-bold text-2xl text-[#12345A] tabular-nums">
                {item.val}
              </div>
            </div>
            <CopyButton value={item.copy} label="Copy" className="h-8 px-2.5 text-xs" disabled={!item.copy} />
          </div>
        ))}
      </div>
    </div>
  );
}

// =========================================================
// 7. Data Storage Converter
// =========================================================
export function DataStorageConverterTool() {
  const [valueStr, setValueStr] = useState('1');
  const [unitIdx, setUnitIdx] = useState(4); // GB default
  const [standard, setStandard] = useState<'binary' | 'decimal'>('binary');

  const rows = useMemo(() => {
    const base = standard === 'binary' ? 1024 : 1000;
    const units = [
      { id: 'bit', label: 'Bits (b)', bytesFactor: 1 / 8 },
      { id: 'B', label: 'Bytes (B)', bytesFactor: 1 },
      { id: 'KB', label: standard === 'binary' ? 'Kibibytes (KiB)' : 'Kilobytes (KB)', bytesFactor: base },
      { id: 'MB', label: standard === 'binary' ? 'Mebibytes (MiB)' : 'Megabytes (MB)', bytesFactor: Math.pow(base, 2) },
      { id: 'GB', label: standard === 'binary' ? 'Gibibytes (GiB)' : 'Gigabytes (GB)', bytesFactor: Math.pow(base, 3) },
      { id: 'TB', label: standard === 'binary' ? 'Tebibytes (TiB)' : 'Terabytes (TB)', bytesFactor: Math.pow(base, 4) },
      { id: 'PB', label: standard === 'binary' ? 'Pebibytes (PiB)' : 'Petabytes (PB)', bytesFactor: Math.pow(base, 5) },
    ];

    const val = Number(valueStr);
    const valid = valueStr.trim() !== '' && Number.isFinite(val) && val >= 0;
    const src = units[unitIdx] ?? units[4];
    const bytes = valid ? val * src.bytesFactor : null;

    return units.map((u, idx) => {
      const converted = bytes !== null ? bytes / u.bytesFactor : null;
      return {
        ...u,
        idx,
        formatted: converted !== null ? formatSignificant(converted, 6) : '—',
        raw: converted !== null ? String(Number(converted.toFixed(6))) : '',
      };
    });
  }, [valueStr, unitIdx, standard]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStandard('binary')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            standard === 'binary'
              ? 'bg-[#12345A] text-white'
              : 'bg-[#F8FBFF] border border-[#DCE5F0] text-[#39506B]'
          }`}
        >
          Binary IEC (1024)
        </button>
        <button
          type="button"
          onClick={() => setStandard('decimal')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            standard === 'decimal'
              ? 'bg-[#12345A] text-white'
              : 'bg-[#F8FBFF] border border-[#DCE5F0] text-[#39506B]'
          }`}
        >
          Decimal SI (1000)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="ds-val" className="text-sm font-medium text-[#12345A]">
            Size Value
          </label>
          <input
            id="ds-val"
            type="number"
            min="0"
            step="any"
            value={valueStr}
            onChange={(e) => setValueStr(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="ds-unit" className="text-sm font-medium text-[#12345A]">
            Input Unit
          </label>
          <select
            id="ds-unit"
            value={unitIdx}
            onChange={(e) => setUnitIdx(Number(e.target.value))}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            {rows.map((u) => (
              <option key={u.id} value={u.idx}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {rows.map((row) => (
          <div
            key={row.id}
            className={`rounded-xl border p-4 flex items-center justify-between gap-3 ${
              row.idx === unitIdx ? 'border-[#16C6C9] bg-[#EEF6FB]' : 'border-[#E2EAF4] bg-[#F8FBFF]'
            }`}
          >
            <div className="min-w-0">
              <div className="text-xs font-medium text-[#5B708B]">{row.label}</div>
              <div className="mt-1 font-mono font-bold text-lg text-[#12345A] truncate tabular-nums">
                {row.formatted}
              </div>
            </div>
            <CopyButton value={row.raw} label="Copy" className="h-8 px-2.5 text-xs shrink-0" disabled={!row.raw} />
          </div>
        ))}
      </div>
    </div>
  );
}

// =========================================================
// 8. Color Converter (HEX / RGB / HSL + WCAG Contrast)
// =========================================================
function clampChannel(n: number, max: number): number {
  return Math.max(0, Math.min(max, Math.round(n)));
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => clampChannel(x, 255).toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const sn = clampChannel(s, 100) / 100;
  const ln = clampChannel(l, 100) / 100;
  const hn = ((h % 360) + 360) % 360 / 360;

  if (sn === 0) {
    const v = Math.round(ln * 255);
    return { r: v, g: v, b: v };
  }

  const hue2rgb = (p: number, q: number, tInput: number) => {
    let t = tInput;
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  return {
    r: Math.round(hue2rgb(p, q, hn + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, hn) * 255),
    b: Math.round(hue2rgb(p, q, hn - 1 / 3) * 255),
  };
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function ColorConverterTool() {
  const [rgb, setRgb] = useState({ r: 22, g: 198, b: 201 });
  const [hexInput, setHexInput] = useState('#16C6C9');

  const hex = useMemo(() => rgbToHex(rgb.r, rgb.g, rgb.b), [rgb]);
  const hsl = useMemo(() => rgbToHsl(rgb.r, rgb.g, rgb.b), [rgb]);

  const handleHexChange = (raw: string) => {
    setHexInput(raw);
    const cleaned = raw.trim().replace(/^#/, '');
    if (/^[0-9A-Fa-f]{3}$/.test(cleaned)) {
      const r = parseInt(cleaned[0] + cleaned[0], 16);
      const g = parseInt(cleaned[1] + cleaned[1], 16);
      const b = parseInt(cleaned[2] + cleaned[2], 16);
      setRgb({ r, g, b });
    } else if (/^[0-9A-Fa-f]{6}$/.test(cleaned)) {
      const r = parseInt(cleaned.slice(0, 2), 16);
      const g = parseInt(cleaned.slice(2, 4), 16);
      const b = parseInt(cleaned.slice(4, 6), 16);
      setRgb({ r, g, b });
    }
  };

  const updateFromRgb = (next: { r: number; g: number; b: number }) => {
    const clean = {
      r: clampChannel(next.r, 255),
      g: clampChannel(next.g, 255),
      b: clampChannel(next.b, 255),
    };
    setRgb(clean);
    setHexInput(rgbToHex(clean.r, clean.g, clean.b));
  };

  const updateFromHsl = (next: { h: number; s: number; l: number }) => {
    const converted = hslToRgb(next.h, next.s, next.l);
    setRgb(converted);
    setHexInput(rgbToHex(converted.r, converted.g, converted.b));
  };

  const lum = relativeLuminance(rgb.r, rgb.g, rgb.b);
  const contrastWhite = (1.0 + 0.05) / (lum + 0.05);
  const lumInk = relativeLuminance(16, 36, 62);
  const contrastDark = (Math.max(lum, lumInk) + 0.05) / (Math.min(lum, lumInk) + 0.05);

  const rgbCss = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslCss = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        <div
          className="md:col-span-5 h-40 rounded-2xl border border-[#DCE5F0] flex flex-col justify-between p-4 shadow-xs"
          style={{ backgroundColor: hex }}
        >
          <span className="inline-block self-start px-2.5 py-1 rounded-md bg-white/90 text-[#10243E] font-mono text-xs font-semibold">
            {hex}
          </span>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="px-2 py-1 rounded bg-black/25 text-white">
              vs White: {contrastWhite.toFixed(2)}:1
            </span>
            <span className="px-2 py-1 rounded bg-white/85 text-[#10243E]">
              vs Dark Ink: {contrastDark.toFixed(2)}:1
            </span>
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="clr-hex" className="text-sm font-medium text-[#12345A]">
              HEX Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                aria-label="Color picker"
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                className="w-11 h-11 rounded-lg border border-[#D4E0EE] cursor-pointer bg-white p-0.5 shrink-0"
              />
              <input
                id="clr-hex"
                type="text"
                value={hexInput}
                onChange={(e) => handleHexChange(e.target.value)}
                placeholder="#16C6C9"
                className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-sm font-medium text-[#12345A] block">Quick Copy Formats</span>
            <div className="flex flex-wrap gap-2">
              <CopyButton value={hex} label="HEX" className="h-11 px-3 text-xs" />
              <CopyButton value={rgbCss} label="RGB" className="h-11 px-3 text-xs" />
              <CopyButton value={hslCss} label="HSL" className="h-11 px-3 text-xs" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl border border-[#DCE5F0] bg-[#FAFBFD] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-sm text-[#12345A]">RGB Channels</h3>
            <code className="font-mono text-xs text-[#0C8588]">{rgbCss}</code>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {(['r', 'g', 'b'] as const).map((ch) => (
              <div key={ch}>
                <label htmlFor={`clr-${ch}`} className="text-xs font-medium text-[#5B708B] uppercase">
                  {ch} (0–255)
                </label>
                <input
                  id={`clr-${ch}`}
                  type="number"
                  min={0}
                  max={255}
                  value={rgb[ch]}
                  onChange={(e) => updateFromRgb({ ...rgb, [ch]: Number(e.target.value) || 0 })}
                  className="mt-1 w-full h-10 px-2.5 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm text-[#12345A]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#DCE5F0] bg-[#FAFBFD] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-sm text-[#12345A]">HSL Channels</h3>
            <code className="font-mono text-xs text-[#0C8588]">{hslCss}</code>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="clr-h" className="text-xs font-medium text-[#5B708B]">
                Hue (0–360°)
              </label>
              <input
                id="clr-h"
                type="number"
                min={0}
                max={360}
                value={hsl.h}
                onChange={(e) => updateFromHsl({ ...hsl, h: Number(e.target.value) || 0 })}
                className="mt-1 w-full h-10 px-2.5 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm text-[#12345A]"
              />
            </div>
            <div>
              <label htmlFor="clr-s" className="text-xs font-medium text-[#5B708B]">
                Sat (0–100%)
              </label>
              <input
                id="clr-s"
                type="number"
                min={0}
                max={100}
                value={hsl.s}
                onChange={(e) => updateFromHsl({ ...hsl, s: Number(e.target.value) || 0 })}
                className="mt-1 w-full h-10 px-2.5 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm text-[#12345A]"
              />
            </div>
            <div>
              <label htmlFor="clr-l" className="text-xs font-medium text-[#5B708B]">
                Light (0–100%)
              </label>
              <input
                id="clr-l"
                type="number"
                min={0}
                max={100}
                value={hsl.l}
                onChange={(e) => updateFromHsl({ ...hsl, l: Number(e.target.value) || 0 })}
                className="mt-1 w-full h-10 px-2.5 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm text-[#12345A]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <StatTile
          label="WCAG Contrast vs White (#FFFFFF)"
          value={`${contrastWhite.toFixed(2)}:1`}
          sublabel={contrastWhite >= 7 ? 'Passes AAA & AA' : contrastWhite >= 4.5 ? 'Passes AA Normal' : 'Large text / fail AA'}
        />
        <StatTile
          label="WCAG Contrast vs Dark Ink (#10243E)"
          value={`${contrastDark.toFixed(2)}:1`}
          sublabel={contrastDark >= 7 ? 'Passes AAA & AA' : contrastDark >= 4.5 ? 'Passes AA Normal' : 'Large text / fail AA'}
        />
      </div>
    </div>
  );
}

// =========================================================
// 9. Number Base Converter (BigInt Binary / Octal / Dec / Hex)
// =========================================================
function parseBigIntInBase(raw: string, base: 2 | 8 | 10 | 16): bigint | null {
  let cleaned = raw.trim().replace(/[\s_]+/g, '');
  if (!cleaned) return null;
  if (base === 2 && /^0[bB]/.test(cleaned)) cleaned = cleaned.slice(2);
  if (base === 8 && /^0[oO]/.test(cleaned)) cleaned = cleaned.slice(2);
  if (base === 16 && /^0[xX]/.test(cleaned)) cleaned = cleaned.slice(2);
  if (!cleaned) return null;

  const patterns: Record<2 | 8 | 10 | 16, RegExp> = {
    2: /^[01]+$/,
    8: /^[0-7]+$/,
    10: /^[0-9]+$/,
    16: /^[0-9a-fA-F]+$/,
  };
  if (!patterns[base].test(cleaned)) return null;

  const prefix = base === 2 ? '0b' : base === 8 ? '0o' : base === 16 ? '0x' : '';
  try {
    return BigInt(`${prefix}${cleaned}`);
  } catch {
    return null;
  }
}

export function NumberBaseConverterTool() {
  const [input, setInput] = useState('255');
  const [fromBase, setFromBase] = useState<2 | 8 | 10 | 16>(10);
  const [groupBinary, setGroupBinary] = useState(true);

  const parsed = useMemo(() => {
    if (!input.trim()) return { empty: true as const, value: null };
    const value = parseBigIntInBase(input, fromBase);
    return { empty: false as const, value };
  }, [input, fromBase]);

  const formattedBinary = useMemo(() => {
    if (parsed.value === null) return '—';
    const raw = parsed.value.toString(2);
    if (!groupBinary) return raw;
    const padLen = Math.ceil(raw.length / 4) * 4;
    const padded = raw.padStart(padLen, '0');
    return padded.match(/.{1,4}/g)?.join(' ') ?? raw;
  }, [parsed.value, groupBinary]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-4 space-y-1.5">
          <label htmlFor="nb-base" className="text-sm font-medium text-[#12345A]">
            Input Base
          </label>
          <select
            id="nb-base"
            value={fromBase}
            onChange={(e) => setFromBase(Number(e.target.value) as 2 | 8 | 10 | 16)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            <option value={10}>Decimal (Base 10)</option>
            <option value={2}>Binary (Base 2)</option>
            <option value={8}>Octal (Base 8)</option>
            <option value={16}>Hexadecimal (Base 16)</option>
          </select>
        </div>

        <div className="sm:col-span-8 space-y-1.5">
          <label htmlFor="nb-val" className="text-sm font-medium text-[#12345A]">
            Non-Negative Integer Value
          </label>
          <input
            id="nb-val"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter integer..."
            className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-[#39506B] cursor-pointer">
        <input
          type="checkbox"
          checked={groupBinary}
          onChange={(e) => setGroupBinary(e.target.checked)}
          className="w-4 h-4 accent-[#12345A]"
        />
        <span>Group binary digits into 4-bit nibbles</span>
      </label>

      {!parsed.empty && parsed.value === null && (
        <p className="text-sm font-medium text-[#B42318]" role="alert">
          Invalid digit for Base {fromBase}. Enter valid digits only (0–1 for Binary, 0–7 for Octal, 0–9 for Decimal, or 0–9/A–F for Hex).
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: 'Binary (Base 2)', val: formattedBinary, raw: parsed.value !== null ? parsed.value.toString(2) : '' },
          { label: 'Octal (Base 8)', val: parsed.value !== null ? parsed.value.toString(8) : '—', raw: parsed.value !== null ? parsed.value.toString(8) : '' },
          { label: 'Decimal (Base 10)', val: parsed.value !== null ? parsed.value.toString(10) : '—', raw: parsed.value !== null ? parsed.value.toString(10) : '' },
          { label: 'Hexadecimal (Base 16)', val: parsed.value !== null ? parsed.value.toString(16).toUpperCase() : '—', raw: parsed.value !== null ? parsed.value.toString(16).toUpperCase() : '' },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-[#E2EAF4] bg-[#F8FBFF] p-4 flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="text-xs font-medium text-[#5B708B]">{item.label}</div>
              <div className="mt-1 font-mono font-bold text-base sm:text-lg text-[#12345A] break-all tabular-nums">
                {item.val}
              </div>
            </div>
            <CopyButton value={item.raw} label="Copy" className="h-8 px-2.5 text-xs shrink-0" disabled={!item.raw} />
          </div>
        ))}
      </div>
    </div>
  );
}
