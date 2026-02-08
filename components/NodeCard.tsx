'use client';

import type React from 'react';
import { PipelineStatus } from '@/lib/pipeline';
import StatusPill from '@/components/ui/StatusPill';
import ProgressBar from '@/components/ui/ProgressBar';

type NodeCardProps = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  status: PipelineStatus;
  progress?: number;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function NodeCard({
  title,
  subtitle,
  icon,
  status,
  progress = 0,
  children,
  footer
}: NodeCardProps) {
  return (
    <div className="w-[280px] rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 shadow-[0_20px_45px_rgba(2,6,23,0.6)] backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800/80 bg-slate-900/80 text-lg">
            {icon}
          </div>
          <div>
            <div className="font-display text-sm uppercase tracking-[0.2em] text-slate-200">
              {title}
            </div>
            {subtitle ? (
              <div className="text-xs text-slate-400">{subtitle}</div>
            ) : null}
          </div>
        </div>
        <StatusPill status={status} />
      </div>
      {status === 'processing' ? (
        <div className="mt-3 space-y-2">
          <div className="text-[11px] uppercase tracking-[0.2em] text-blue-200">
            Live progress
          </div>
          <ProgressBar value={progress} />
        </div>
      ) : null}
      <div className="mt-3 space-y-3 text-xs text-slate-300">{children}</div>
      {footer ? (
        <div className="mt-4 border-t border-slate-800/70 pt-3 text-xs text-slate-300">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
