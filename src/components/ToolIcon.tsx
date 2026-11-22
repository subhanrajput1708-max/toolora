import {
  Activity,
  AlignLeft,
  ArrowDownUp,
  ArrowLeftRight,
  BarChart3,
  Binary,
  Braces,
  Cake,
  Calculator,
  CalendarClock,
  CalendarDays,
  CalendarPlus,
  CalendarRange,
  CaseSensitive,
  CheckSquare,
  Clock,
  Code2,
  Coins,
  Dices,
  Divide,
  Droplet,
  FileText,
  FolderKanban,
  Fuel,
  GitCompareArrows,
  Globe,
  HardDrive,
  Hash,
  Hourglass,
  KeyRound,
  Landmark,
  Link2,
  LinkIcon,
  ListChecks,
  ListFilter,
  ListOrdered,
  NotebookPen,
  Palette,
  Percent,
  PieChart,
  QrCode,
  Ruler,
  Scale,
  Sigma,
  Sparkles,
  Tag,
  Thermometer,
  Timer,
  TrendingUp,
  Type,
  Wallet,
  Weight,
  WrapText,
  type LucideIcon,
} from 'lucide-react';
import type { ToolCategoryId } from '../data/tools';

const TOOL_ICON_MAP: Record<string, LucideIcon> = {
  // Text & Formatting (12)
  'word-counter': FileText,
  'case-converter': CaseSensitive,
  'text-cleaner': Sparkles,
  'duplicate-line-remover': ListFilter,
  'character-counter': Hash,
  'text-diff-checker': GitCompareArrows,
  'line-counter': ListOrdered,
  'word-frequency-counter': BarChart3,
  'lorem-ipsum-generator': AlignLeft,
  'text-reverser': ArrowLeftRight,
  'line-break-formatter': WrapText,
  'list-sorter-randomizer': ArrowDownUp,

  // Calculators (7)
  'percentage-calculator': Percent,
  'reading-time-calculator': Timer,
  'average-calculator': Sigma,
  'ratio-calculator': PieChart,
  'fraction-percentage-converter': Divide,
  'bmi-calculator': Activity,
  'fuel-trip-cost-calculator': Fuel,

  // Finance Tools (5)
  'discount-calculator': Tag,
  'tip-calculator': Coins,
  'loan-emi-calculator': Landmark,
  'compound-interest-calculator': TrendingUp,
  'profit-margin-calculator': Wallet,

  // Date & Time Tools (6)
  'age-calculator': Cake,
  'date-difference-calculator': CalendarRange,
  'time-calculator': Clock,
  'add-days-to-date': CalendarPlus,
  'week-number-calculator': CalendarDays,
  'countdown-timer': Hourglass,

  // Conversion Tools (7)
  'unit-converter': Scale,
  'length-converter': Ruler,
  'weight-converter': Weight,
  'temperature-converter': Thermometer,
  'data-storage-converter': HardDrive,
  'color-converter': Droplet,
  'number-base-converter': Binary,

  // Productivity Tools (6)
  'pomodoro-timer': Timer,
  'stopwatch': Clock,
  'checklist-maker': CheckSquare,
  'simple-task-planner': ListChecks,
  'notes-formatter': NotebookPen,
  'random-number-generator': Dices,

  // Web & Developer Tools (7)
  'slug-generator': Link2,
  'url-encoder-decoder': LinkIcon,
  'html-entity-converter': Code2,
  'qr-code-generator': QrCode,
  'gradient-generator': Palette,
  'password-generator': KeyRound,
  'json-formatter-validator': Braces,
};

const CATEGORY_ICON_MAP: Record<ToolCategoryId, LucideIcon> = {
  'text-tools': Type,
  calculators: Calculator,
  'finance-tools': Wallet,
  'date-time-tools': CalendarClock,
  'conversion-tools': ArrowLeftRight,
  'productivity-tools': FolderKanban,
  'web-tools': Globe,
};

export function ToolIcon({
  slug,
  className = 'w-5 h-5',
}: {
  slug: string;
  className?: string;
}) {
  const Icon = TOOL_ICON_MAP[slug] ?? FileText;
  return <Icon className={className} aria-hidden="true" />;
}

export function CategoryIcon({
  categoryId,
  className = 'w-5 h-5',
}: {
  categoryId: ToolCategoryId;
  className?: string;
}) {
  const Icon = CATEGORY_ICON_MAP[categoryId] ?? FolderKanban;
  return <Icon className={className} aria-hidden="true" />;
}
