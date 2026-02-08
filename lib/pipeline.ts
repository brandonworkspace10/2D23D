export type PipelineStatus = 'pending' | 'processing' | 'complete' | 'error';

export type ValidationStatus = 'good' | 'warn' | 'bad';

export type StageId =
  | 'upload'
  | 'background'
  | 'reconstruction'
  | 'cleanup'
  | 'export'
  | 'video';

export type ImagePreview = {
  id: string;
  label: string;
  status: ValidationStatus;
};

export type ValidationItem = {
  id: string;
  label: string;
  status: ValidationStatus;
  detail: string;
};

export type UploadNodeData = {
  status: PipelineStatus;
  progress: number;
  images: ImagePreview[];
  validations: ValidationItem[];
  message: string;
};

export type BackgroundNodeData = {
  status: PipelineStatus;
  progress: number;
  beforeLabel: string;
  afterLabel: string;
  notes: string[];
};

export type ReconstructionNodeData = {
  status: PipelineStatus;
  progress: number;
  steps: { label: string; done: boolean }[];
  statusTag: string;
};

export type CleanupNodeData = {
  status: PipelineStatus;
  progress: number;
  settings: { label: string; value: string }[];
  note: string;
};

export type ExportNodeData = {
  status: PipelineStatus;
  progress: number;
  formats: string[];
  embedSnippet: string;
};

export type VideoNodeData = {
  status: PipelineStatus;
  progress: number;
  templates: string[];
  note: string;
};
