'use client';

import type React from 'react';
import { cn } from '@/lib/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md';
};

export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70',
        size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
        variant === 'primary' &&
          'bg-blue-500/80 text-white shadow-glow hover:bg-blue-400/90',
        variant === 'outline' &&
          'border border-slate-700/70 bg-slate-900/70 text-slate-100 hover:border-blue-400/60',
        variant === 'ghost' && 'text-slate-200 hover:bg-slate-800/60',
        className
      )}
      {...props}
    />
  );
}
