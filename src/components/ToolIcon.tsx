import {
  AlignLeft,
  ArrowLeftRight,
  BarChart3,
  Cake,
  Calculator,
  CalendarRange,
  CaseSensitive,
  Clock,
  Code2,
  FileText,
  FolderKanban,
  GitCompareArrows,
  Globe,
  Hash,
  Link2,
  LinkIcon,
  ListFilter,
  ListOrdered,
  Palette,
  Percent,
  QrCode,
  Scale,
  Sparkles,
  Tag,
  Timer,
  Type,
  type LucideIcon,
} from 'lucide-react';
import type { ToolCategoryId } from '../data/tools';

const TOOL_ICON_MAP: Record<string, LucideIcon> = {
  'word-counter': FileText,
  'case-converter': CaseSensitive,
  'text-cleaner': Sparkles,
  'duplicate-line-remover': ListFilter,
  'character-counter': Hash,
  'text-diff-checker': GitCompareArrows,
  'line-counter': ListOrdered,
  'word-frequency-counter': BarChart3,
  'slug-generator': Link2,
  'url-encoder-decoder': LinkIcon,
  'html-entity-converter': Code2,
  'qr-code-generator': QrCode,
  'percentage-calculator': Percent,
  'discount-calculator': Tag,
  'age-calculator': Cake,
  'date-difference-calculator': CalendarRange,
  'unit-converter': Scale,
  'time-calculator': Clock,
  'lorem-ipsum-generator': AlignLeft,
  'reading-time-calculator': Timer,
  'text-reverser': ArrowLeftRight,
  'gradient-generator': Palette,
};

const CATEGORY_ICON_MAP: Record<ToolCategoryId, LucideIcon> = {
  'text-writing': Type,
  'web-internet': Globe,
  'everyday-calculators': Calculator,
  'file-productivity': FolderKanban,
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
