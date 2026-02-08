'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  MarkerType,
  useEdgesState,
  useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';

import UploadNode from '@/components/nodes/UploadNode';
import BackgroundRemovalNode from '@/components/nodes/BackgroundRemovalNode';
import ReconstructionNode from '@/components/nodes/ReconstructionNode';
import CleanupNode from '@/components/nodes/CleanupNode';
import ExportNode from '@/components/nodes/ExportNode';
import VideoNode from '@/components/nodes/VideoNode';
import Button from '@/components/ui/Button';
import { PipelineStatus, StageId } from '@/lib/pipeline';

const stageOrder: StageId[] = [
  'upload',
  'background',
  'reconstruction',
  'cleanup',
  'export',
  'video'
];

const baseNodes = [
  {
    id: 'upload',
    type: 'upload',
    position: { x: 0, y: 40 },
    data: {
      status: 'processing',
      progress: 0,
      message: 'Waiting for images',
      images: [
        { id: 'front', label: 'Front', status: 'good' },
        { id: 'angle1', label: 'Angle', status: 'good' },
        { id: 'side', label: 'Side', status: 'warn' },
        { id: 'angle2', label: 'Angle', status: 'good' },
        { id: 'back', label: 'Back', status: 'good' },
        { id: 'detail', label: 'Detail', status: 'good' }
      ],
      validations: [
        {
          id: 'resolution',
          label: 'Resolution',
          status: 'good',
          detail: '2400px+'
        },
        {
          id: 'angles',
          label: 'Angle coverage',
          status: 'good',
          detail: '5/6'
        },
        {
          id: 'blur',
          label: 'Blur risk',
          status: 'warn',
          detail: '1 image'
        }
      ]
    }
  },
  {
    id: 'background',
    type: 'background',
    position: { x: 340, y: 40 },
    data: {
      status: 'pending',
      progress: 0,
      beforeLabel: 'Before',
      afterLabel: 'After',
      notes: ['Auto mask + trim', 'White backdrop', 'Shadow preserved']
    }
  },
  {
    id: 'reconstruction',
    type: 'reconstruction',
    position: { x: 680, y: 40 },
    data: {
      status: 'pending',
      progress: 0,
      statusTag: 'Draft mesh ready',
      steps: [
        { label: 'Camera alignment', done: false },
        { label: 'Sparse point cloud', done: false },
        { label: 'Dense mesh build', done: false }
      ]
    }
  },
  {
    id: 'cleanup',
    type: 'cleanup',
    position: { x: 1020, y: 40 },
    data: {
      status: 'pending',
      progress: 0,
      note: 'Decimation target: 40k tris',
      settings: [
        { label: 'Hole filling', value: 'Standard' },
        { label: 'Noise removal', value: 'Medium' },
        { label: 'Scale normalize', value: 'Auto' }
      ]
    }
  },
  {
    id: 'export',
    type: 'export',
    position: { x: 1360, y: -80 },
    data: {
      status: 'pending',
      progress: 0,
      formats: ['GLB', 'USDZ', 'MP4'],
      embedSnippet: '<model-viewer src="/model.glb" autoplay camera-controls />'
    }
  },
  {
    id: 'video',
    type: 'video',
    position: { x: 1360, y: 180 },
    data: {
      status: 'pending',
      progress: 0,
      note: 'Draft preview at 25%',
      templates: ['Studio spin', 'Hero orbit', 'Macro sweep']
    }
  }
];

const baseEdges = [
  {
    id: 'e-upload-bg',
    source: 'upload',
    target: 'background',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-bg-recon',
    source: 'background',
    target: 'reconstruction',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-recon-clean',
    source: 'reconstruction',
    target: 'cleanup',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-clean-export',
    source: 'cleanup',
    target: 'export',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-clean-video',
    source: 'cleanup',
    target: 'video',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed }
  }
];

export default function PipelinePage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(baseNodes);
  const [edges, _setEdges, onEdgesChange] = useEdgesState(baseEdges);
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [errorStage, setErrorStage] = useState<StageId | null>(null);

  const nodeTypes = useMemo(
    () => ({
      upload: UploadNode,
      background: BackgroundRemovalNode,
      reconstruction: ReconstructionNode,
      cleanup: CleanupNode,
      export: ExportNode,
      video: VideoNode
    }),
    []
  );

  const resetPipeline = useCallback(() => {
    setCurrentStage(0);
    setProgress(0);
    setIsRunning(true);
    setErrorStage(null);
  }, []);

  const simulateError = useCallback(() => {
    setErrorStage('cleanup');
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (currentStage >= stageOrder.length - 1) {
          const next = Math.min(100, prev + 8);
          if (next >= 100) {
            setIsRunning(false);
          }
          return next;
        }

        if (prev >= 100) {
          setCurrentStage((stage) => Math.min(stage + 1, stageOrder.length - 1));
          return 0;
        }

        return Math.min(100, prev + 8);
      });
    }, 700);

    return () => clearInterval(interval);
  }, [currentStage, isRunning]);

  useEffect(() => {
    setNodes((current) =>
      current.map((node) => {
        const stageIndex = stageOrder.indexOf(node.id as StageId);
        const isError = errorStage === node.id;
        const isCurrent = stageIndex === currentStage;
        const isComplete = stageIndex < currentStage;

        let status: PipelineStatus = 'pending';
        if (isError) status = 'error';
        else if (isComplete) status = 'complete';
        else if (isCurrent) status = isRunning ? 'processing' : 'complete';

        const stageProgress = status === 'processing' ? progress : status === 'complete' ? 100 : 0;

        const updatedData = {
          ...node.data,
          status,
          progress: stageProgress
        } as any;

        if (node.id === 'upload') {
          updatedData.message = status === 'complete' ? '6 images validated' : 'Waiting for images';
        }

        if (node.id === 'reconstruction') {
          updatedData.steps = updatedData.steps.map((step: any, index: number) => ({
            ...step,
            done: stageProgress > (index + 1) * 28
          }));
          updatedData.statusTag =
            status === 'complete'
              ? 'Draft mesh ready'
              : status === 'processing'
                ? 'Building dense mesh'
                : 'Awaiting cutouts';
        }

        if (node.id === 'cleanup') {
          updatedData.note =
            status === 'complete' ? 'Mesh optimized for web' : 'Decimation target: 40k tris';
        }

        if (node.id === 'export') {
          updatedData.embedSnippet =
            status === 'complete'
              ? '<model-viewer src="/model.glb" camera-controls auto-rotate />'
              : '<model-viewer src="/draft.glb" camera-controls />';
        }

        if (node.id === 'video') {
          updatedData.note =
            status === 'complete' ? 'Ready to render HD' : 'Draft preview at 25%';
        }

        return {
          ...node,
          data: updatedData
        };
      })
    );
  }, [currentStage, errorStage, isRunning, progress, setNodes]);

  return (
    <div className="min-h-screen px-8 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Pipeline Studio
          </p>
          <h1 className="font-display text-3xl text-slate-100">
            2D-to-3D Product Conversion
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-400">
            Live pipeline orchestration for commerce-grade 3D assets. Each node mirrors a
            backend stage with status, previews, and controls.
          </p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetPipeline}>
              Restart mock
            </Button>
            <Button variant="ghost" onClick={simulateError}>
              Inject error
            </Button>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-slate-500" /> Pending
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-400" /> Processing
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Complete
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-rose-400" /> Error
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 h-[70vh] max-w-6xl rounded-3xl border border-slate-800/80 bg-dot-grid canvas-glow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          nodeTypes={nodeTypes}
          className="rounded-3xl"
        >
          <Background color="rgba(148, 163, 184, 0.2)" gap={28} size={1} />
          <MiniMap
            nodeColor={() => 'rgba(96, 165, 250, 0.8)'}
            maskColor="rgba(15, 23, 42, 0.6)"
          />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
