'use client';

import { Handle, NodeProps, Position } from 'reactflow';
import NodeCard from '@/components/NodeCard';
import Button from '@/components/ui/Button';
import Tooltip from '@/components/ui/Tooltip';
import { UploadNodeData, ValidationStatus } from '@/lib/pipeline';
import { cn } from '@/lib/cn';

const badgeStyles: Record<ValidationStatus, string> = {
  good: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
  warn: 'border-amber-400/40 bg-amber-500/10 text-amber-200',
  bad: 'border-rose-400/40 bg-rose-500/10 text-rose-200'
};

export default function UploadNode({ data }: NodeProps<UploadNodeData>) {
  return (
    <div>
      <Handle type="source" position={Position.Right} />
      <NodeCard
        title="Upload"
        subtitle="Input + validation"
        status={data.status}
        progress={data.progress}
        icon={<span>⬆️</span>}
        footer={
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              {data.message}
            </span>
            <Button size="sm">Add images</Button>
          </div>
        }
      >
        <div className="flex gap-2">
          {data.images.map((image) => (
            <Tooltip key={image.id} label={`${image.label} angle`}> 
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    'h-10 w-10 rounded-lg border border-slate-800/70 bg-gradient-to-br from-slate-800/80 to-slate-900/80',
                    image.status === 'bad' && 'border-rose-400/60',
                    image.status === 'warn' && 'border-amber-400/60'
                  )}
                />
                <span className="text-[10px] text-slate-400">{image.label}</span>
              </div>
            </Tooltip>
          ))}
        </div>
        <div className="space-y-2">
          {data.validations.map((item) => (
            <div
              key={item.id}
              className={cn(
                'flex items-center justify-between rounded-lg border px-2 py-1 text-[11px]',
                badgeStyles[item.status]
              )}
            >
              <span>{item.label}</span>
              <span className="text-slate-200/80">{item.detail}</span>
            </div>
          ))}
        </div>
      </NodeCard>
    </div>
  );
}
