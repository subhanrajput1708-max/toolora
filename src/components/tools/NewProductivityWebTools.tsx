import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckSquare,
  Download,
  Flag,
  Pause,
  Play,
  Plus,
  RefreshCw,
  RotateCcw,
  SkipForward,
  Square,
  Trash2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ClearButton, CopyButton, StatTile, downloadTextFile } from './ToolSharedUI';

function playTone() {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    [587.33, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.001, now + i * 0.16);
      gain.gain.exponentialRampToValueAtTime(0.14, now + i * 0.16 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.16 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.16);
      osc.stop(now + i * 0.16 + 0.38);
    });
    setTimeout(() => {
      void ctx.close().catch(() => undefined);
    }, 1000);
  } catch {
    // Ignore restricted audio contexts
  }
}

// =========================================================
// 1. Pomodoro Timer
// =========================================================
type PomodoroPhase = 'focus' | 'short' | 'long';

export function PomodoroTimerTool() {
  const [durations, setDurations] = useState<Record<PomodoroPhase, number>>({
    focus: 25,
    short: 5,
    long: 15,
  });
  const [phase, setPhase] = useState<PomodoroPhase>('focus');
  const [remainingMs, setRemainingMs] = useState(25 * 60_000);
  const [running, setRunning] = useState(false);
  const [completedFocus, setCompletedFocus] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const endRef = useRef<number>(0);

  const phaseTotalMs = durations[phase] * 60_000;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      const left = Math.max(0, endRef.current - Date.now());
      setRemainingMs(left);
      if (left <= 0) {
        setRunning(false);
        if (soundOn) playTone();
        if (phase === 'focus') {
          setCompletedFocus((c) => c + 1);
        }
      }
    }, 150);
    return () => window.clearInterval(id);
  }, [running, soundOn, phase]);

  const switchPhase = (next: PomodoroPhase) => {
    setRunning(false);
    setPhase(next);
    setRemainingMs(durations[next] * 60_000);
  };

  const toggleRun = () => {
    if (running) {
      setRemainingMs(Math.max(0, endRef.current - Date.now()));
      setRunning(false);
      return;
    }
    const base = remainingMs <= 0 ? phaseTotalMs : remainingMs;
    if (remainingMs <= 0) setRemainingMs(phaseTotalMs);
    endRef.current = Date.now() + base;
    setRunning(true);
  };

  const updateDuration = (target: PomodoroPhase, mins: number) => {
    const clamped = Math.max(1, Math.min(90, Math.round(mins) || 1));
    setDurations((prev) => ({ ...prev, [target]: clamped }));
    if (target === phase && !running) {
      setRemainingMs(clamped * 60_000);
    }
  };

  const totalSec = Math.ceil(remainingMs / 1000);
  const mm = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const ss = String(totalSec % 60).padStart(2, '0');
  const pct = phaseTotalMs > 0 ? Math.max(0, Math.min(100, (remainingMs / phaseTotalMs) * 100)) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: 'focus', label: `Focus (${durations.focus}m)` },
            { id: 'short', label: `Short Break (${durations.short}m)` },
            { id: 'long', label: `Long Break (${durations.long}m)` },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => switchPhase(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              phase === tab.id
                ? 'bg-[#12345A] text-white'
                : 'bg-[#F8FBFF] border border-[#DCE5F0] text-[#39506B] hover:border-[#16C6C9]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[#DCE5F0] bg-[#FAFBFD] p-6 sm:p-8 text-center space-y-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#0C8588]">
          {phase === 'focus' ? 'Focus Session' : phase === 'short' ? 'Short Break' : 'Long Break'}
        </div>
        <div className="font-mono font-bold text-5xl sm:text-6xl text-[#12345A] tabular-nums">
          {mm}:{ss}
        </div>
        <div className="max-w-md mx-auto h-2.5 rounded-full bg-[#E2EAF4] overflow-hidden">
          <div className="h-full bg-[#16C6C9] transition-all duration-150" style={{ width: `${pct}%` }} />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={toggleRun}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678]"
          >
            {running ? <Pause className="w-4 h-4 text-[#16C6C9]" /> : <Play className="w-4 h-4 text-[#16C6C9]" />}
            <span>{running ? 'Pause' : 'Start'}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              setRemainingMs(phaseTotalMs);
            }}
            className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl border border-[#D4E0EE] bg-white text-sm font-medium text-[#39506B] hover:border-[#12345A]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={() => switchPhase(phase === 'focus' ? 'short' : 'focus')}
            className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9]"
          >
            <SkipForward className="w-4 h-4 text-[#0FA7AA]" />
            <span>Next Phase</span>
          </button>
          <button
            type="button"
            onClick={() => setSoundOn((s) => !s)}
            className="inline-flex items-center gap-1.5 h-11 px-3.5 rounded-xl border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-[#0FA7AA]" /> : <VolumeX className="w-4 h-4 text-[#5B708B]" />}
            <span>{soundOn ? 'Sound On' : 'Muted'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
        <div>
          <label htmlFor="pomo-focus" className="text-xs font-medium text-[#5B708B]">
            Focus (min)
          </label>
          <input
            id="pomo-focus"
            type="number"
            min={1}
            max={90}
            value={durations.focus}
            onChange={(e) => updateDuration('focus', Number(e.target.value))}
            className="mt-1 w-full h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm text-[#12345A]"
          />
        </div>
        <div>
          <label htmlFor="pomo-short" className="text-xs font-medium text-[#5B708B]">
            Short Break (min)
          </label>
          <input
            id="pomo-short"
            type="number"
            min={1}
            max={90}
            value={durations.short}
            onChange={(e) => updateDuration('short', Number(e.target.value))}
            className="mt-1 w-full h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm text-[#12345A]"
          />
        </div>
        <div>
          <label htmlFor="pomo-long" className="text-xs font-medium text-[#5B708B]">
            Long Break (min)
          </label>
          <input
            id="pomo-long"
            type="number"
            min={1}
            max={90}
            value={durations.long}
            onChange={(e) => updateDuration('long', Number(e.target.value))}
            className="mt-1 w-full h-10 px-3 rounded-lg border border-[#D4E0EE] bg-white font-mono text-sm text-[#12345A]"
          />
        </div>
        <StatTile label="Completed Focus Cycles" value={completedFocus} />
      </div>
    </div>
  );
}

// =========================================================
// 2. Online Stopwatch
// =========================================================
function formatStopwatchMs(ms: number): string {
  const safe = Math.max(0, Math.floor(ms));
  const centis = String(Math.floor((safe % 1000) / 10)).padStart(2, '0');
  const totalSec = Math.floor(safe / 1000);
  const secs = String(totalSec % 60).padStart(2, '0');
  const mins = String(Math.floor(totalSec / 60) % 60).padStart(2, '0');
  const hrs = Math.floor(totalSec / 3600);
  return hrs > 0 ? `${String(hrs).padStart(2, '0')}:${mins}:${secs}.${centis}` : `${mins}:${secs}.${centis}`;
}

export function StopwatchTool() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<Array<{ num: number; lapMs: number; totalMs: number }>>([]);

  const baseElapsedRef = useRef(0);
  const startedAtRef = useRef(0);
  const lastLapTotalRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setElapsedMs(baseElapsedRef.current + (performance.now() - startedAtRef.current));
    }, 30);
    return () => window.clearInterval(id);
  }, [running]);

  const handleStartPause = () => {
    if (running) {
      const current = baseElapsedRef.current + (performance.now() - startedAtRef.current);
      baseElapsedRef.current = current;
      setElapsedMs(current);
      setRunning(false);
    } else {
      startedAtRef.current = performance.now();
      setRunning(true);
    }
  };

  const handleLap = () => {
    const current = running
      ? baseElapsedRef.current + (performance.now() - startedAtRef.current)
      : elapsedMs;
    const lapMs = current - lastLapTotalRef.current;
    lastLapTotalRef.current = current;
    setLaps((prev) => [{ num: prev.length + 1, lapMs, totalMs: current }, ...prev]);
  };

  const handleReset = () => {
    setRunning(false);
    baseElapsedRef.current = 0;
    lastLapTotalRef.current = 0;
    setElapsedMs(0);
    setLaps([]);
  };

  const fastestMs = laps.length >= 2 ? Math.min(...laps.map((l) => l.lapMs)) : null;
  const slowestMs = laps.length >= 2 ? Math.max(...laps.map((l) => l.lapMs)) : null;

  const lapsSummary = [...laps]
    .reverse()
    .map((l) => `Lap ${l.num}: ${formatStopwatchMs(l.lapMs)} (Total ${formatStopwatchMs(l.totalMs)})`)
    .join('\n');

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#DCE5F0] bg-[#FAFBFD] p-6 sm:p-8 text-center space-y-5">
        <div className="font-mono font-bold text-5xl sm:text-6xl text-[#12345A] tabular-nums">
          {formatStopwatchMs(elapsedMs)}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleStartPause}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678]"
          >
            {running ? <Pause className="w-4 h-4 text-[#16C6C9]" /> : <Play className="w-4 h-4 text-[#16C6C9]" />}
            <span>{running ? 'Pause' : elapsedMs > 0 ? 'Resume' : 'Start'}</span>
          </button>

          <button
            type="button"
            onClick={handleLap}
            disabled={!running && elapsedMs === 0}
            className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl border border-[#C8D7E8] bg-white text-sm font-semibold text-[#12345A] hover:border-[#16C6C9] disabled:opacity-45"
          >
            <Flag className="w-4 h-4 text-[#0FA7AA]" />
            <span>Lap</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={elapsedMs === 0 && laps.length === 0}
            className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl border border-[#D4E0EE] bg-white text-sm font-medium text-[#39506B] hover:border-[#12345A] disabled:opacity-45"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {laps.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-base text-[#12345A]">
              Lap Splits ({laps.length})
            </h3>
            <CopyButton value={lapsSummary} label="Copy Laps" className="h-9 px-3 text-xs" />
          </div>
          <div className="rounded-xl border border-[#DCE5F0] overflow-x-auto max-h-64 overflow-y-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F8FBFF] border-b border-[#E2EAF4] text-[#5B708B] sticky top-0">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Lap</th>
                  <th className="py-2.5 px-4 font-semibold">Split Time</th>
                  <th className="py-2.5 px-4 font-semibold">Total Elapsed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4F9] font-mono tabular-nums text-[#12345A]">
                {laps.map((l) => (
                  <tr key={l.num}>
                    <td className="py-2 px-4 font-sans font-medium">
                      Lap {l.num}
                      {fastestMs !== null && l.lapMs === fastestMs && (
                        <span className="ml-2 text-[11px] font-semibold text-[#067647]">Fastest</span>
                      )}
                      {slowestMs !== null && l.lapMs === slowestMs && slowestMs !== fastestMs && (
                        <span className="ml-2 text-[11px] font-semibold text-[#B42318]">Slowest</span>
                      )}
                    </td>
                    <td className="py-2 px-4">{formatStopwatchMs(l.lapMs)}</td>
                    <td className="py-2 px-4 text-[#4B617D]">{formatStopwatchMs(l.totalMs)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================
// 3. Checklist Maker
// =========================================================
export function ChecklistMakerTool() {
  const [items, setItems] = useState<Array<{ id: string; text: string; done: boolean }>>([
    { id: 'c1', text: 'Review final draft for clarity', done: true },
    { id: 'c2', text: 'Verify links and mobile responsiveness', done: false },
    { id: 'c3', text: 'Export or share final files', done: false },
  ]);
  const [newText, setNewText] = useState('');
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newText.trim();
    if (!trimmed) return;
    setItems((prev) => [
      ...prev,
      { id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, text: trimmed, done: false },
    ]);
    setNewText('');
  };

  const addBulk = () => {
    const lines = bulkText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) return;
    setItems((prev) => [
      ...prev,
      ...lines.map((text, idx) => ({
        id: `cb-${Date.now()}-${idx}`,
        text,
        done: false,
      })),
    ]);
    setBulkText('');
    setBulkOpen(false);
  };

  const doneCount = items.filter((i) => i.done).length;
  const pct = items.length > 0 ? Math.round((doneCount / items.length) * 100) : 0;
  const markdownExport = items.map((i) => `- [${i.done ? 'x' : ' '}] ${i.text}`).join('\n');

  return (
    <div className="space-y-5">
      <form onSubmit={addItem} className="flex flex-col sm:flex-row gap-2.5">
        <label htmlFor="chk-new" className="sr-only">
          New checklist item
        </label>
        <input
          id="chk-new"
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Add a checklist item..."
          className="flex-1 h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] text-sm text-[#10243E] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!newText.trim()}
            className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678] disabled:opacity-45"
          >
            <Plus className="w-4 h-4 text-[#16C6C9]" />
            <span>Add Item</span>
          </button>
          <button
            type="button"
            onClick={() => setBulkOpen((b) => !b)}
            className="h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9]"
          >
            Bulk Paste
          </button>
        </div>
      </form>

      {bulkOpen && (
        <div className="rounded-xl border border-[#DCE5F0] bg-[#F8FBFF] p-4 space-y-3">
          <label htmlFor="chk-bulk" className="block text-xs font-semibold text-[#12345A]">
            Paste multiple items (one per line)
          </label>
          <textarea
            id="chk-bulk"
            rows={4}
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            placeholder="Item 1&#10;Item 2&#10;Item 3"
            className="w-full rounded-lg border border-[#D4E0EE] bg-white p-3 text-sm text-[#10243E] focus:outline-none focus:border-[#16C6C9]"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={addBulk}
              className="px-4 py-2 rounded-lg bg-[#12345A] text-white text-xs font-semibold"
            >
              Add Lines
            </button>
            <button
              type="button"
              onClick={() => setBulkOpen(false)}
              className="px-3 py-2 rounded-lg border border-[#D4E0EE] bg-white text-xs text-[#4B617D]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-[#E2EAF4] bg-[#F8FBFF] p-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-[#12345A]">
          <span>Progress</span>
          <span className="tabular-nums">
            {doneCount} / {items.length} completed ({pct}%)
          </span>
        </div>
        <div className="h-2 rounded-full bg-[#DCE5F0] overflow-hidden">
          <div className="h-full bg-[#16C6C9] transition-all duration-150" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {items.length > 0 ? (
        <ul className="divide-y divide-[#EEF3F9] rounded-xl border border-[#DCE5F0] bg-white">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <button
                type="button"
                onClick={() =>
                  setItems((prev) =>
                    prev.map((x) => (x.id === item.id ? { ...x, done: !x.done } : x))
                  )
                }
                className="flex items-center gap-3 text-left flex-1 min-w-0"
              >
                {item.done ? (
                  <CheckSquare className="w-5 h-5 text-[#0FA7AA] shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-[#8BA0BA] shrink-0" />
                )}
                <span
                  className={`text-sm break-words ${
                    item.done ? 'line-through text-[#7B8FA8]' : 'text-[#12345A] font-medium'
                  }`}
                >
                  {item.text}
                </span>
              </button>
              <button
                type="button"
                aria-label={`Delete ${item.text}`}
                onClick={() => setItems((prev) => prev.filter((x) => x.id !== item.id))}
                className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-[#7B8FA8] hover:text-[#B42318] hover:bg-[#FEF3F2]"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-[#E2EAF4] bg-[#FAFBFD] p-6 text-center text-sm text-[#5B708B]">
          Your checklist is empty. Add items above to start.
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <CopyButton value={markdownExport} label="Copy Markdown Checklist" disabled={items.length === 0} />
          <button
            type="button"
            onClick={() => downloadTextFile('checklist.txt', markdownExport)}
            disabled={items.length === 0}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9] disabled:opacity-45"
          >
            <Download className="w-4 h-4 text-[#0FA7AA]" />
            <span>Download .txt</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setItems((prev) => prev.filter((i) => !i.done))}
            disabled={doneCount === 0}
            className="h-10 px-3.5 rounded-lg border border-[#D4E0EE] bg-white text-xs font-medium text-[#39506B] disabled:opacity-45"
          >
            Clear Completed
          </button>
          <ClearButton onClick={() => setItems([])} label="Clear All" disabled={items.length === 0} />
        </div>
      </div>
    </div>
  );
}

// =========================================================
// 4. Simple Task Planner
// =========================================================
type TaskPriority = 'high' | 'medium' | 'low';

export function SimpleTaskPlannerTool() {
  const [tasks, setTasks] = useState<Array<{ id: string; title: string; priority: TaskPriority; done: boolean }>>([
    { id: 't1', title: 'Finalize weekly sprint report', priority: 'high', done: false },
    { id: 't2', title: 'Reply to support emails', priority: 'medium', done: false },
    { id: 't3', title: 'Organize project bookmarks', priority: 'low', done: true },
  ]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      { id: `tp-${Date.now()}`, title: trimmed, priority, done: false },
      ...prev,
    ]);
    setTitle('');
  };

  const sortByPriority = () => {
    const rank: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 };
    setTasks((prev) =>
      [...prev].sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1;
        return rank[a.priority] - rank[b.priority];
      })
    );
  };

  const visibleTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.done).length;
  const highActiveCount = tasks.filter((t) => !t.done && t.priority === 'high').length;

  const planExport = tasks
    .map((t) => `[${t.priority.toUpperCase()}] [${t.done ? 'x' : ' '}] ${t.title}`)
    .join('\n');

  const priorityBadge = (p: TaskPriority) =>
    p === 'high'
      ? 'bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]'
      : p === 'medium'
        ? 'bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]'
        : 'bg-[#EEF6FB] text-[#12345A] border-[#C8D7E8]';

  return (
    <div className="space-y-5">
      <form onSubmit={addTask} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
        <div className="sm:col-span-7">
          <label htmlFor="tp-title" className="sr-only">
            Task description
          </label>
          <input
            id="tp-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task for today..."
            className="w-full h-11 px-3.5 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] text-sm text-[#10243E] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="tp-prio" className="sr-only">
            Priority
          </label>
          <select
            id="tp-prio"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-white text-sm text-[#12345A]"
          >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={!title.trim()}
          className="sm:col-span-2 inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-lg bg-[#12345A] text-white text-sm font-semibold hover:bg-[#1A4678] disabled:opacity-45"
        >
          <Plus className="w-4 h-4 text-[#16C6C9]" />
          <span>Add Task</span>
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {(['all', 'active', 'done'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize ${
                filter === f
                  ? 'bg-[#12345A] text-white'
                  : 'bg-[#F8FBFF] border border-[#DCE5F0] text-[#39506B]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-[#4B617D]">
          <span>
            {activeCount} active ({highActiveCount} high)
          </span>
          <button
            type="button"
            onClick={sortByPriority}
            className="font-semibold text-[#12345A] hover:text-[#0C8588] underline underline-offset-2"
          >
            Sort by Priority
          </button>
        </div>
      </div>

      {visibleTasks.length > 0 ? (
        <ul className="divide-y divide-[#EEF3F9] rounded-xl border border-[#DCE5F0] bg-white">
          {visibleTasks.map((task) => (
            <li key={task.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <button
                type="button"
                onClick={() =>
                  setTasks((prev) =>
                    prev.map((x) => (x.id === task.id ? { ...x, done: !x.done } : x))
                  )
                }
                className="flex items-center gap-3 text-left flex-1 min-w-[200px]"
              >
                {task.done ? (
                  <CheckSquare className="w-5 h-5 text-[#0FA7AA] shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-[#8BA0BA] shrink-0" />
                )}
                <span className={`text-sm ${task.done ? 'line-through text-[#7B8FA8]' : 'text-[#12345A] font-medium'}`}>
                  {task.title}
                </span>
              </button>

              <div className="flex items-center gap-2">
                <select
                  aria-label={`Priority for ${task.title}`}
                  value={task.priority}
                  onChange={(e) =>
                    setTasks((prev) =>
                      prev.map((x) =>
                        x.id === task.id ? { ...x, priority: e.target.value as TaskPriority } : x
                      )
                    )
                  }
                  className={`px-2 py-1 rounded-md border text-xs font-semibold capitalize ${priorityBadge(task.priority)}`}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button
                  type="button"
                  aria-label={`Remove ${task.title}`}
                  onClick={() => setTasks((prev) => prev.filter((x) => x.id !== task.id))}
                  className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-[#7B8FA8] hover:text-[#B42318] hover:bg-[#FEF3F2]"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-[#E2EAF4] bg-[#FAFBFD] p-6 text-center text-sm text-[#5B708B]">
          No tasks match the current filter.
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <CopyButton value={planExport} label="Copy Plan" disabled={tasks.length === 0} />
          <button
            type="button"
            onClick={() => downloadTextFile('daily-plan.txt', planExport)}
            disabled={tasks.length === 0}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9] disabled:opacity-45"
          >
            <Download className="w-4 h-4 text-[#0FA7AA]" />
            <span>Download .txt</span>
          </button>
        </div>
        <ClearButton onClick={() => setTasks([])} label="Clear All" disabled={tasks.length === 0} />
      </div>
    </div>
  );
}

// =========================================================
// 5. Notes Formatter
// =========================================================
type NotesStyle = 'bullets' | 'numbered' | 'checklist' | 'blockquote' | 'paragraphs';

export function NotesFormatterTool() {
  const [input, setInput] = useState(
    '* Review client feedback notes\n- Update pricing summary table\n1. Share draft link before Friday\n• Confirm QA sign-off'
  );
  const [style, setStyle] = useState<NotesStyle>('bullets');
  const [capitalizeFirst, setCapitalizeFirst] = useState(true);

  const output = useMemo(() => {
    const cleanLines = input
      .replace(/\r\n/g, '\n')
      .split('\n')
      .map((line) =>
        line
          .trim()
          .replace(/^([-*•>]|\d+[.)]|-\s*\[[ xX]\])\s*/, '')
          .replace(/\s+/g, ' ')
          .trim()
      )
      .filter(Boolean)
      .map((line) => (capitalizeFirst ? line.charAt(0).toUpperCase() + line.slice(1) : line));

    if (cleanLines.length === 0) return '';

    switch (style) {
      case 'bullets':
        return cleanLines.map((l) => `- ${l}`).join('\n');
      case 'numbered':
        return cleanLines.map((l, idx) => `${idx + 1}. ${l}`).join('\n');
      case 'checklist':
        return cleanLines.map((l) => `- [ ] ${l}`).join('\n');
      case 'blockquote':
        return cleanLines.map((l) => `> ${l}`).join('\n');
      case 'paragraphs':
        return cleanLines.join('\n\n');
    }
  }, [input, style, capitalizeFirst]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: 'bullets', label: 'Markdown Bullets (-)' },
            { id: 'numbered', label: 'Numbered List (1.)' },
            { id: 'checklist', label: 'Task Checklist (- [ ])' },
            { id: 'blockquote', label: 'Blockquotes (>)' },
            { id: 'paragraphs', label: 'Clean Paragraphs' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStyle(tab.id)}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium ${
              style === tab.id
                ? 'bg-[#12345A] text-white'
                : 'bg-[#F8FBFF] border border-[#DCE5F0] text-[#39506B] hover:border-[#16C6C9]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-[#39506B] cursor-pointer">
        <input
          type="checkbox"
          checked={capitalizeFirst}
          onChange={(e) => setCapitalizeFirst(e.target.checked)}
          className="w-4 h-4 accent-[#12345A]"
        />
        <span>Capitalize first letter of each note line</span>
      </label>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="nf-input" className="text-sm font-medium text-[#12345A]">
            Raw Notes
          </label>
          <textarea
            id="nf-input"
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste unformatted meeting notes..."
            className="w-full rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] p-4 text-sm text-[#10243E] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="nf-output" className="text-sm font-medium text-[#12345A]">
            Formatted Notes
          </label>
          <textarea
            id="nf-output"
            rows={10}
            readOnly
            value={output}
            className="w-full rounded-xl border border-[#D4E0EE] bg-[#F8FBFF] p-4 font-mono text-sm text-[#10243E] focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2.5">
          <CopyButton value={output} label="Copy Notes" />
          <button
            type="button"
            onClick={() => downloadTextFile('formatted-notes.md', output)}
            disabled={!output}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9] disabled:opacity-45"
          >
            <Download className="w-4 h-4 text-[#0FA7AA]" />
            <span>Download .md</span>
          </button>
        </div>
        <ClearButton onClick={() => setInput('')} disabled={!input} />
      </div>
    </div>
  );
}

// =========================================================
// 6. Random Number Generator
// =========================================================
function cryptoIntInRange(min: number, max: number): number {
  const span = max - min + 1;
  if (span <= 1) return min;
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues && span <= 0xffffffff) {
    const arr = new Uint32Array(1);
    const limit = Math.floor(0xffffffff / span) * span;
    let r = 0;
    do {
      window.crypto.getRandomValues(arr);
      r = arr[0];
    } while (r >= limit);
    return min + (r % span);
  }
  return min + Math.floor(Math.random() * span);
}

export function RandomNumberGeneratorTool() {
  const [minStr, setMinStr] = useState('1');
  const [maxStr, setMaxStr] = useState('100');
  const [countStr, setCountStr] = useState('5');
  const [unique, setUnique] = useState(true);
  const [sortAsc, setSortAsc] = useState(false);
  const [rollTick, setRollTick] = useState(0);

  const generated = useMemo(() => {
    void rollTick;
    const min = Math.trunc(Number(minStr));
    const max = Math.trunc(Number(maxStr));
    const count = Math.max(1, Math.min(100, Math.trunc(Number(countStr) || 1)));

    if (!Number.isFinite(min) || !Number.isFinite(max) || min > max) {
      return { error: 'Ensure Minimum is less than or equal to Maximum.', numbers: [] as number[] };
    }

    const span = max - min + 1;
    if (unique && count > span) {
      return {
        error: `Cannot generate ${count} unique integers across only ${span} available values (${min} to ${max}).`,
        numbers: [] as number[],
      };
    }

    const picked: number[] = [];
    if (unique) {
      if (span <= 10_000) {
        const pool = Array.from({ length: span }, (_, idx) => min + idx);
        for (let i = 0; i < count; i++) {
          const j = cryptoIntInRange(i, pool.length - 1);
          const tmp = pool[i];
          pool[i] = pool[j];
          pool[j] = tmp;
          picked.push(pool[i]);
        }
      } else {
        const seen = new Set<number>();
        while (picked.length < count) {
          const candidate = cryptoIntInRange(min, max);
          if (!seen.has(candidate)) {
            seen.add(candidate);
            picked.push(candidate);
          }
        }
      }
    } else {
      for (let i = 0; i < count; i++) {
        picked.push(cryptoIntInRange(min, max));
      }
    }

    if (sortAsc) picked.sort((a, b) => a - b);

    return { error: '', numbers: picked };
  }, [minStr, maxStr, countStr, unique, sortAsc, rollTick]);

  const resultString = generated.numbers.join(', ');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Coin Flip (1–2)', min: '1', max: '2', count: '1' },
          { label: 'Dice D6 (1–6)', min: '1', max: '6', count: '1' },
          { label: '1 to 100', min: '1', max: '100', count: '1' },
          { label: '6 Unique (1–49)', min: '1', max: '49', count: '6' },
        ].map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setMinStr(p.min);
              setMaxStr(p.max);
              setCountStr(p.count);
              setRollTick((t) => t + 1);
            }}
            className="px-3 py-1.5 rounded-lg border border-[#DCE5F0] bg-[#F8FBFF] text-xs font-semibold text-[#12345A] hover:border-[#16C6C9]"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="rng-min" className="text-sm font-medium text-[#12345A]">
            Minimum
          </label>
          <input
            id="rng-min"
            type="number"
            value={minStr}
            onChange={(e) => setMinStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A]"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="rng-max" className="text-sm font-medium text-[#12345A]">
            Maximum
          </label>
          <input
            id="rng-max"
            type="number"
            value={maxStr}
            onChange={(e) => setMaxStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A]"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="rng-count" className="text-sm font-medium text-[#12345A]">
            Quantity (1–100)
          </label>
          <input
            id="rng-count"
            type="number"
            min={1}
            max={100}
            value={countStr}
            onChange={(e) => setCountStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-[#D4E0EE] bg-[#FAFBFD] font-mono text-sm text-[#12345A]"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-5 text-sm text-[#39506B]">
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={unique}
            onChange={(e) => setUnique(e.target.checked)}
            className="w-4 h-4 accent-[#12345A]"
          />
          <span>Unique numbers only (no duplicates)</span>
        </label>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={sortAsc}
            onChange={(e) => setSortAsc(e.target.checked)}
            className="w-4 h-4 accent-[#12345A]"
          />
          <span>Sort ascending</span>
        </label>
      </div>

      {generated.error ? (
        <p className="text-sm font-medium text-[#B42318]" role="alert">
          {generated.error}
        </p>
      ) : (
        <div className="rounded-2xl border border-[#DCE5F0] bg-[#F8FBFF] p-5 space-y-4">
          <div className="flex flex-wrap gap-2.5">
            {generated.numbers.map((num, idx) => (
              <span
                key={`${idx}-${num}`}
                className="min-w-[3.2rem] px-3.5 py-2 rounded-xl bg-white border border-[#C8D7E8] font-mono font-bold text-xl text-[#12345A] text-center tabular-nums"
              >
                {num}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setRollTick((t) => t + 1)}
              className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-[#16C6C9] text-[#0C233D] font-display font-bold text-sm hover:bg-[#3FD8DA]"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate Numbers</span>
            </button>
            <CopyButton value={resultString} label="Copy Results" />
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================
// 7. Password Generator (Web Crypto)
// =========================================================
const AMBIGUOUS_CHARS = new Set(['0', 'O', 'o', '1', 'l', 'I']);

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [regenTick, setRegenTick] = useState(0);

  const generated = useMemo(() => {
    void regenTick;
    const filterPool = (str: string) =>
      excludeAmbiguous ? [...str].filter((c) => !AMBIGUOUS_CHARS.has(c)).join('') : str;

    const pools: string[] = [];
    if (useUpper) pools.push(filterPool('ABCDEFGHIJKLMNOPQRSTUVWXYZ'));
    if (useLower) pools.push(filterPool('abcdefghijklmnopqrstuvwxyz'));
    if (useDigits) pools.push(filterPool('0123456789'));
    if (useSymbols) pools.push('!@#$%^&*()-_=+[]{};:,.?');

    const activePools = pools.filter((p) => p.length > 0);
    const fullAlphabet = activePools.join('');
    if (!fullAlphabet) {
      return { password: '', entropyBits: 0, strength: 'Select at least one character set' };
    }

    const chars: string[] = [];
    for (const pool of activePools) {
      if (chars.length < length) {
        chars.push(pool[cryptoIntInRange(0, pool.length - 1)]);
      }
    }
    while (chars.length < length) {
      chars.push(fullAlphabet[cryptoIntInRange(0, fullAlphabet.length - 1)]);
    }

    // Fisher-Yates shuffle
    for (let i = chars.length - 1; i > 0; i--) {
      const j = cryptoIntInRange(0, i);
      const tmp = chars[i];
      chars[i] = chars[j];
      chars[j] = tmp;
    }

    const password = chars.join('');
    const entropyBits = Math.round(length * Math.log2(fullAlphabet.length));
    const strength =
      entropyBits >= 90 ? 'Very Strong' : entropyBits >= 65 ? 'Strong' : entropyBits >= 45 ? 'Moderate' : 'Basic';

    return { password, entropyBits, strength };
  }, [length, useUpper, useLower, useDigits, useSymbols, excludeAmbiguous, regenTick]);

  const togglePool = (currentVal: boolean, setter: (v: boolean) => void) => {
    const activeCount = [useUpper, useLower, useDigits, useSymbols].filter(Boolean).length;
    if (currentVal && activeCount <= 1) return; // keep at least one enabled
    setter(!currentVal);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#DCE5F0] bg-[#F8FBFF] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="font-mono font-bold text-lg sm:text-2xl text-[#12345A] break-all select-all bg-white border border-[#D4E0EE] rounded-xl px-4 py-3 flex-1">
            {generated.password}
          </div>
          <div className="flex gap-2 shrink-0">
            <CopyButton value={generated.password} label="Copy Password" className="h-12" />
            <button
              type="button"
              onClick={() => setRegenTick((t) => t + 1)}
              aria-label="Generate new password"
              className="inline-flex items-center justify-center gap-1.5 h-12 px-4 rounded-lg border border-[#C8D7E8] bg-white text-sm font-semibold text-[#12345A] hover:border-[#16C6C9]"
            >
              <RefreshCw className="w-4 h-4 text-[#0FA7AA]" />
              <span>Regenerate</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatTile label="Password Strength" value={generated.strength} />
          <StatTile label="Estimated Entropy" value={`${generated.entropyBits} bits`} />
          <StatTile label="Length" value={`${length} chars`} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <label htmlFor="pw-len" className="text-sm font-medium text-[#12345A]">
            Password Length: <span className="font-mono font-bold">{length}</span>
          </label>
          <input
            id="pw-len"
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-56 accent-[#12345A]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-[#39506B]">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useUpper}
              onChange={() => togglePool(useUpper, setUseUpper)}
              className="w-4 h-4 accent-[#12345A]"
            />
            <span>Uppercase (A–Z)</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useLower}
              onChange={() => togglePool(useLower, setUseLower)}
              className="w-4 h-4 accent-[#12345A]"
            />
            <span>Lowercase (a–z)</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useDigits}
              onChange={() => togglePool(useDigits, setUseDigits)}
              className="w-4 h-4 accent-[#12345A]"
            />
            <span>Numbers (0–9)</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={() => togglePool(useSymbols, setUseSymbols)}
              className="w-4 h-4 accent-[#12345A]"
            />
            <span>Symbols (!@#$...)</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer sm:col-span-2">
            <input
              type="checkbox"
              checked={excludeAmbiguous}
              onChange={(e) => setExcludeAmbiguous(e.target.checked)}
              className="w-4 h-4 accent-[#12345A]"
            />
            <span>Exclude ambiguous characters (0, O, o, 1, l, I)</span>
          </label>
        </div>
      </div>

      <p className="text-xs text-[#5B708B]">
        Generated 100% locally in your browser using <code className="font-mono">window.crypto.getRandomValues</code>. Nothing is sent or stored anywhere.
      </p>
    </div>
  );
}

// =========================================================
// 8. JSON Formatter & Validator
// =========================================================
function sortJsonKeysDeep(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortJsonKeysDeep);
  }
  if (value !== null && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(record).sort((a, b) => a.localeCompare(b))) {
      sorted[key] = sortJsonKeysDeep(record[key]);
    }
    return sorted;
  }
  return value;
}

export function JsonFormatterValidatorTool() {
  const [input, setInput] = useState(
    '{"site":"TooloraHub","free":true,"toolsCount":50,"categories":["Text","Calculators","Finance","Date & Time","Conversions","Productivity","Web"]}'
  );
  const [mode, setMode] = useState<'beautify2' | 'beautify4' | 'minify'>('beautify2');
  const [sortKeys, setSortKeys] = useState(false);

  const parsedResult = useMemo(() => {
    if (!input.trim()) {
      return { status: 'empty' as const, output: '', error: '', keysCount: 0 };
    }
    try {
      const parsed = JSON.parse(input) as unknown;
      const normalized = sortKeys ? sortJsonKeysDeep(parsed) : parsed;
      const output =
        mode === 'minify'
          ? JSON.stringify(normalized)
          : JSON.stringify(normalized, null, mode === 'beautify4' ? 4 : 2);
      const keysCount =
        parsed && typeof parsed === 'object'
          ? Array.isArray(parsed)
            ? parsed.length
            : Object.keys(parsed).length
          : 1;
      return { status: 'valid' as const, output, error: '', keysCount };
    } catch (err: unknown) {
      return {
        status: 'invalid' as const,
        output: '',
        error: err instanceof Error ? err.message : 'Invalid JSON syntax.',
        keysCount: 0,
      };
    }
  }, [input, mode, sortKeys]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'beautify2', label: 'Beautify (2 spaces)' },
              { id: 'beautify4', label: 'Beautify (4 spaces)' },
              { id: 'minify', label: 'Minify JSON' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id)}
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

        <label className="inline-flex items-center gap-2 text-sm text-[#39506B] cursor-pointer">
          <input
            type="checkbox"
            checked={sortKeys}
            onChange={(e) => setSortKeys(e.target.checked)}
            className="w-4 h-4 accent-[#12345A]"
          />
          <span>Sort Object Keys (A–Z)</span>
        </label>
      </div>

      {parsedResult.status === 'valid' && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#ECFDF3] border border-[#ABEFC6] text-xs font-semibold text-[#067647]">
          Valid JSON · Top-level entries: {parsedResult.keysCount}
        </div>
      )}

      {parsedResult.status === 'invalid' && (
        <div
          role="alert"
          className="rounded-xl border border-[#FECDCA] bg-[#FEF3F2] px-4 py-3 text-xs sm:text-sm font-mono text-[#B42318]"
        >
          JSON Syntax Error: {parsedResult.error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="json-in" className="text-sm font-medium text-[#12345A]">
            Input JSON
          </label>
          <textarea
            id="json-in"
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"example": true}'
            spellCheck={false}
            className="w-full rounded-xl border border-[#D4E0EE] bg-[#FAFBFD] p-4 font-mono text-xs sm:text-sm text-[#10243E] focus:outline-none focus:border-[#16C6C9] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="json-out" className="text-sm font-medium text-[#12345A]">
            Formatted Output
          </label>
          <textarea
            id="json-out"
            rows={12}
            readOnly
            value={parsedResult.output}
            spellCheck={false}
            placeholder="Valid formatted JSON appears here..."
            className="w-full rounded-xl border border-[#D4E0EE] bg-[#F8FBFF] p-4 font-mono text-xs sm:text-sm text-[#10243E] focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2.5">
          <CopyButton value={parsedResult.output} label="Copy JSON" disabled={!parsedResult.output} />
          <button
            type="button"
            onClick={() => downloadTextFile('formatted.json', parsedResult.output, 'application/json;charset=utf-8')}
            disabled={!parsedResult.output}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#12345A] hover:border-[#16C6C9] disabled:opacity-45"
          >
            <Download className="w-4 h-4 text-[#0FA7AA]" />
            <span>Download .json</span>
          </button>
        </div>
        <ClearButton onClick={() => setInput('')} disabled={!input} />
      </div>
    </div>
  );
}
