'use client';

import type React from 'react';
import { cn } from '@/lib/cn';

type TooltipProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export default function Tooltip({ label, children, className }: TooltipProps) {
  return (
    <span className={cn('relative inline-flex group', className)}>
      {children}
      <span
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-slate-700/60 bg-slate-900/90 px-2 py-1 text-[10px] text-slate-200 opacity-0 transition group-hover:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}
