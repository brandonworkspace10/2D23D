'use client';

import { Handle, NodeProps, Position } from 'reactflow';
import NodeCard from '@/components/NodeCard';
import Button from '@/components/ui/Button';
import { VideoNodeData } from '@/lib/pipeline';

export default function VideoNode({ data }: NodeProps<VideoNodeData>) {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <NodeCard
        title="Video"
        subtitle="Social-ready"
        status={data.status}
        progress={data.progress}
        icon={<span>🎬</span>}
        footer={
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">{data.note}</span>
            <Button size="sm" variant="outline">
              Render
            </Button>
          </div>
        }
      >
        <div className="rounded-xl border border-slate-800/70 bg-gradient-to-br from-slate-900/80 to-slate-950/70 p-3">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
            Preview
          </div>
          <div className="mt-3 h-20 rounded-lg border border-dashed border-purple-400/40 bg-gradient-to-br from-purple-500/10 to-pink-400/10" />
        </div>
        <div className="flex flex-wrap gap-2">
          {data.templates.map((template) => (
            <Button key={template} size="sm" variant="ghost">
              {template}
            </Button>
          ))}
        </div>
      </NodeCard>
    </div>
  );
}
