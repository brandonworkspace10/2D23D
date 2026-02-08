'use client';

import { Handle, NodeProps, Position } from 'reactflow';
import NodeCard from '@/components/NodeCard';
import Button from '@/components/ui/Button';
import { ReconstructionNodeData } from '@/lib/pipeline';
import { cn } from '@/lib/cn';

export default function ReconstructionNode({ data }: NodeProps<ReconstructionNodeData>) {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <NodeCard
        title="3D Build"
        subtitle="Reconstruction"
        status={data.status}
        progress={data.progress}
        icon={<span>🧠</span>}
        footer={
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">{data.statusTag}</span>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost">
                Wireframe
              </Button>
              <Button size="sm" variant="outline">
                Textured
              </Button>
            </div>
          </div>
        }
      >
        <div className="rounded-xl border border-slate-800/70 bg-gradient-to-br from-slate-900/80 to-slate-950/70 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Live viewer
            </span>
            <span className="text-[10px] text-slate-500">Drag to rotate</span>
          </div>
          <div className="mt-3 h-24 rounded-lg border border-dashed border-blue-400/40 bg-gradient-to-br from-blue-500/10 to-cyan-300/10" />
        </div>
        <div className="space-y-2">
          {data.steps.map((step) => (
            <div
              key={step.label}
              className={cn(
                'flex items-center justify-between rounded-lg border px-2 py-1 text-[11px]',
                step.done
                  ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
                  : 'border-slate-800/70 bg-slate-900/60 text-slate-400'
              )}
            >
              <span>{step.label}</span>
              <span>{step.done ? 'Done' : 'Queued'}</span>
            </div>
          ))}
        </div>
      </NodeCard>
    </div>
  );
}
