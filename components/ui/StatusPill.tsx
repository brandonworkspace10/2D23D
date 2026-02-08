'use client';

import { PipelineStatus } from '@/lib/pipeline';
import { cn } from '@/lib/cn';

type StatusPillProps = {
  status: PipelineStatus;
  className?: string;
};

const STATUS_STYLES: Record<PipelineStatus, string> = {
  pending: 'border-slate-700/70 bg-slate-900/60 text-slate-400',
  processing: 'border-blue-400/60 bg-blue-500/20 text-blue-200 animate-pulse',
  complete: 'border-emerald-400/60 bg-emerald-500/15 text-emerald-200',
  error: 'border-rose-400/70 bg-rose-500/15 text-rose-200'
};

const STATUS_LABELS: Record<PipelineStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  complete: 'Complete',
  error: 'Error'
};

export default function StatusPill({ status, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.2em]',
        STATUS_STYLES[status],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {STATUS_LABELS[status]}
    </span>
  );
}
