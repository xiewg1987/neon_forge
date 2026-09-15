import matter from "gray-matter";
import type {
  SamplerPass,
  WorkflowFrontmatter,
  WorkflowLora,
} from "./types";

export type ParsedMarkdown = {
  data: Record<string, unknown>;
  body: string;
};

/** Split YAML frontmatter + markdown body. Pure; no filesystem. */
export function parseMarkdown(raw: string): ParsedMarkdown {
  const { data, content } = matter(raw);
  return {
    data: (data ?? {}) as Record<string, unknown>,
    body: content.replace(/^\uFEFF?/, "").trimStart(),
  };
}

function asString(value: unknown, fallback = ""): string {
  if (value == null) return fallback;
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => asString(item)).filter(Boolean);
}

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return fallback;
}

function asLora(value: unknown): WorkflowLora | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const name = asString(row.name);
  if (!name) return null;
  const lora: WorkflowLora = {
    name,
    weight: asNumber(row.weight, 0),
  };
  const role = asString(row.role);
  const note = asString(row.note);
  if (role) lora.role = role;
  if (note) lora.note = note;
  return lora;
}

function asLoras(value: unknown): WorkflowLora[] {
  if (!Array.isArray(value)) return [];
  return value.map(asLora).filter((item): item is WorkflowLora => item != null);
}

function asSamplerPass(value: unknown): SamplerPass | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const pass: SamplerPass = {};
  if (row.steps != null) pass.steps = asNumber(row.steps);
  if (row.cfg != null) pass.cfg = asNumber(row.cfg);
  if (row.sampler != null) pass.sampler = asString(row.sampler);
  if (row.scheduler != null) pass.scheduler = asString(row.scheduler);
  if (row.denoise != null) pass.denoise = asNumber(row.denoise);
  if (row.size != null) pass.size = asString(row.size);
  if (row.seed_mode != null) pass.seed_mode = asString(row.seed_mode);
  if (row.note != null) pass.note = asString(row.note);
  return pass;
}

/**
 * Coerce raw frontmatter into a stable WorkflowFrontmatter shape.
 * Missing fields get empty defaults so callers don't need null checks everywhere.
 */
export function normalizeWorkflowFrontmatter(
  data: Record<string, unknown>,
  fallbackSlug = "",
): WorkflowFrontmatter {
  const slug = asString(data.slug, fallbackSlug);
  return {
    title: asString(data.title, slug || "Untitled"),
    slug,
    type: asString(data.type, "workflow"),
    style: asString(data.style),
    styles_alt: asStringArray(data.styles_alt),
    tags: asStringArray(data.tags),
    node_title: asString(data.node_title),
    status: asString(data.status, "draft"),
    cover: asString(data.cover),
    gallery: asStringArray(data.gallery),
    workflow_file: asString(data.workflow_file),
    workflow_source_id: asString(data.workflow_source_id),
    base_model: asString(data.base_model),
    clip: asString(data.clip),
    clip_type: asString(data.clip_type),
    vae: asString(data.vae),
    loras: asLoras(data.loras),
    sampler_pass_1: asSamplerPass(data.sampler_pass_1),
    sampler_pass_2: asSamplerPass(data.sampler_pass_2),
    negative: asString(data.negative),
    date: asString(data.date),
  };
}

/**
 * First usable plain-text paragraph from markdown body (skips headings / quotes / tables / code).
 */
export function excerptFromBody(body: string, maxLen = 160): string {
  const lines = body.split(/\r?\n/);
  const chunks: string[] = [];
  let inFence = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (!trimmed) {
      if (chunks.length > 0) break;
      continue;
    }
    if (
      trimmed.startsWith("#") ||
      trimmed.startsWith("|") ||
      trimmed.startsWith(">") ||
      trimmed.startsWith("- [") ||
      trimmed.startsWith("* [") ||
      /^[-*]\s/.test(trimmed) ||
      /^\d+\.\s/.test(trimmed)
    ) {
      continue;
    }
    chunks.push(trimmed.replace(/\*\*?|__|`/g, ""));
    if (chunks.join(" ").length >= maxLen) break;
  }

  const text = chunks.join(" ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen - 1).trimEnd()}…`;
}
