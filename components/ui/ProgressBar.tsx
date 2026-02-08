'use client';

import { cn } from '@/lib/cn';

type ProgressBarProps = {
  value: number;
  className?: string;
};

export default function ProgressBar({ value, className }: ProgressBarProps) {
  return (
    <div className={cn('h-2 w-full rounded-full bg-slate-800/70', className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300 transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
