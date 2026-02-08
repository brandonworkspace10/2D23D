'use client';

import { Handle, NodeProps, Position } from 'reactflow';
import NodeCard from '@/components/NodeCard';
import Button from '@/components/ui/Button';
import { CleanupNodeData } from '@/lib/pipeline';

export default function CleanupNode({ data }: NodeProps<CleanupNodeData>) {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <NodeCard
        title="Cleanup"
        subtitle="Mesh polish"
        status={data.status}
        progress={data.progress}
        icon={<span>🛠️</span>}
        footer={
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">{data.note}</span>
            <Button size="sm" variant="outline">
              Advanced
            </Button>
          </div>
        }
      >
        <div className="grid gap-2">
          {data.settings.map((setting) => (
            <div
              key={setting.label}
              className="flex items-center justify-between rounded-lg border border-slate-800/70 bg-slate-900/60 px-2 py-1 text-[11px]"
            >
              <span className="text-slate-300">{setting.label}</span>
              <span className="text-slate-400">{setting.value}</span>
            </div>
          ))}
        </div>
      </NodeCard>
    </div>
  );
}
