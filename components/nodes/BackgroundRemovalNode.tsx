'use client';

import { Handle, NodeProps, Position } from 'reactflow';
import NodeCard from '@/components/NodeCard';
import Button from '@/components/ui/Button';
import { BackgroundNodeData } from '@/lib/pipeline';

export default function BackgroundRemovalNode({ data }: NodeProps<BackgroundNodeData>) {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <NodeCard
        title="Background"
        subtitle="Clean cutouts"
        status={data.status}
        progress={data.progress}
        icon={<span>🧼</span>}
        footer={
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Edge refinement: Auto</span>
            <Button size="sm" variant="outline">
              Tweak edges
            </Button>
          </div>
        }
      >
        <div className="relative h-24 overflow-hidden rounded-xl border border-slate-800/70 bg-slate-900/70">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700/70 to-slate-950/60" />
          <div className="absolute inset-y-0 left-0 w-1/2 border-r border-slate-800/70 bg-slate-900/60" />
          <div className="absolute inset-y-0 left-1/2 flex w-1/2 items-center justify-center">
            <div className="h-full w-0.5 bg-blue-300/70" />
          </div>
          <div className="absolute bottom-2 left-2 rounded-full bg-slate-950/70 px-2 py-1 text-[10px] text-slate-200">
            {data.beforeLabel}
          </div>
          <div className="absolute bottom-2 right-2 rounded-full bg-slate-950/70 px-2 py-1 text-[10px] text-slate-200">
            {data.afterLabel}
          </div>
        </div>
        <div className="space-y-1 text-[11px] text-slate-400">
          {data.notes.map((note) => (
            <div key={note}>• {note}</div>
          ))}
        </div>
      </NodeCard>
    </div>
  );
}
