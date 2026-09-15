/** Shared content document types (server-side MD → JSON). */

export type ContentKind = "workflows" | "prompts" | "models";

export type ContentStatus = "draft" | "published" | "archived" | (string & {});

export type WorkflowLora = {
  name: string;
  weight: number;
  role?: string;
  note?: string;
};

export type SamplerPass = {
  steps?: number;
  cfg?: number;
  sampler?: string;
  scheduler?: string;
  denoise?: number;
  size?: string;
  seed_mode?: string;
  note?: string;
};

export type WorkflowFrontmatter = {
  title: string;
  slug: string;
  type: string;
  style: string;
  styles_alt: string[];
  tags: string[];
  node_title: string;
  status: ContentStatus;
  cover: string;
  gallery: string[];
  workflow_file: string;
  workflow_source_id: string;
  base_model: string;
  clip: string;
  clip_type: string;
  vae: string;
  loras: WorkflowLora[];
  sampler_pass_1: SamplerPass | null;
  sampler_pass_2: SamplerPass | null;
  negative: string;
  date: string;
};

/** Full document for detail pages. */
export type WorkflowDocument = {
  kind: "workflow";
  slug: string;
  /** Absolute filesystem path to the source .md */
  filePath: string;
  frontmatter: WorkflowFrontmatter;
  /** Markdown body without frontmatter */
  body: string;
  /** Plain-text teaser derived from body (first meaningful paragraph) */
  excerpt: string;
};

/** Compact JSON for list / cards / filters. */
export type WorkflowListItem = {
  slug: string;
  title: string;
  node_title: string;
  style: string;
  styles_alt: string[];
  tags: string[];
  status: ContentStatus;
  cover: string;
  gallery: string[];
  date: string;
  base_model: string;
  primary_lora: WorkflowLora | null;
  excerpt: string;
};
