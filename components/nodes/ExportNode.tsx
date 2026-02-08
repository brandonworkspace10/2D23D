'use client';

import { Handle, NodeProps, Position } from 'reactflow';
import NodeCard from '@/components/NodeCard';
import Button from '@/components/ui/Button';
import { ExportNodeData } from '@/lib/pipeline';

export default function ExportNode({ data }: NodeProps<ExportNodeData>) {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <NodeCard
        title="Export"
        subtitle="Store-ready"
        status={data.status}
        progress={data.progress}
        icon={<span>📦</span>}
        footer={
          <div className="space-y-2">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Embed snippet
            </div>
            <div className="rounded-lg border border-slate-800/70 bg-slate-950/80 px-2 py-2 font-mono text-[10px] text-slate-400">
              {data.embedSnippet}
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap gap-2">
          {data.formats.map((format) => (
            <Button key={format} size="sm" variant="outline">
              {format}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">Download bundle</Button>
          <Button size="sm" variant="ghost">
            Copy link
          </Button>
        </div>
      </NodeCard>
    </div>
  );
}
