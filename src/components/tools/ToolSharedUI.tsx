import { useState } from 'react';
import { Check, Copy, RotateCcw } from 'lucide-react';

export function CopyButton({
  value,
  label = 'Copy Result',
  className = '',
  disabled = false,
}: {
  value: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value || disabled) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={disabled || !value}
      className={`inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-lg text-sm font-medium transition-colors duration-150 whitespace-nowrap disabled:opacity-45 disabled:cursor-not-allowed ${
        copied
          ? 'bg-[#0C8588] text-white'
          : 'bg-[#12345A] text-white hover:bg-[#1A4678]'
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" aria-hidden="true" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 text-[#16C6C9]" aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

export function ClearButton({
  onClick,
  label = 'Clear',
  disabled = false,
}: {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-lg border border-[#D4E0EE] bg-white text-sm font-medium text-[#39506B] hover:border-[#12345A] hover:text-[#12345A] transition-colors duration-150 whitespace-nowrap disabled:opacity-45 disabled:cursor-not-allowed"
    >
      <RotateCcw className="w-4 h-4" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

export function StatTile({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string | number;
  sublabel?: string;
}) {
  return (
    <div className="bg-[#F8FBFF] border border-[#E2EAF4] rounded-lg p-3.5">
      <div className="text-xs font-medium text-[#5B708B]">{label}</div>
      <div className="mt-1 text-2xl font-display font-bold text-[#12345A] tabular-nums">
        {value}
      </div>
      {sublabel && <div className="mt-0.5 text-xs text-[#6B809A] tabular-nums">{sublabel}</div>}
    </div>
  );
}

export function downloadTextFile(filename: string, content: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}
