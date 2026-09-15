import "server-only";

import fs from "node:fs";
import path from "node:path";
import { getContentDir, workflowFilePath } from "./paths";
import {
  excerptFromBody,
  normalizeWorkflowFrontmatter,
  parseMarkdown,
} from "./parse";
import type { WorkflowDocument, WorkflowListItem } from "./types";

function isMarkdownFile(name: string): boolean {
  return name.endsWith(".md") && !name.startsWith("_");
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/i, "");
}

function toListItem(doc: WorkflowDocument): WorkflowListItem {
  const { frontmatter, excerpt } = doc;
  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    node_title: frontmatter.node_title,
    style: frontmatter.style,
    styles_alt: frontmatter.styles_alt,
    tags: frontmatter.tags,
    status: frontmatter.status,
    cover: frontmatter.cover,
    gallery: frontmatter.gallery,
    date: frontmatter.date,
    base_model: frontmatter.base_model,
    primary_lora: frontmatter.loras[0] ?? null,
    excerpt,
  };
}

function sortByDateDesc(a: WorkflowListItem, b: WorkflowListItem): number {
  return (b.date || "").localeCompare(a.date || "");
}

/** Parse a workflow .md file from disk into a full document. */
export function readWorkflowFile(filePath: string): WorkflowDocument {
  const raw = fs.readFileSync(filePath, "utf8");
  const fallbackSlug = slugFromFilename(path.basename(filePath));
  const { data, body } = parseMarkdown(raw);
  const frontmatter = normalizeWorkflowFrontmatter(data, fallbackSlug);

  if (!frontmatter.slug) {
    frontmatter.slug = fallbackSlug;
  }

  return {
    kind: "workflow",
    slug: frontmatter.slug,
    filePath,
    frontmatter,
    body,
    excerpt: excerptFromBody(body),
  };
}

/** All workflow slugs under `content/workflows/*.md` (filename stem). */
export function listWorkflowSlugs(): string[] {
  const dir = getContentDir("workflows");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter(isMarkdownFile)
    .map(slugFromFilename)
    .sort();
}

/** Full documents for every workflow MD file. */
export function getAllWorkflows(): WorkflowDocument[] {
  const dir = getContentDir("workflows");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter(isMarkdownFile)
    .map((name) => readWorkflowFile(path.join(dir, name)))
    .sort((a, b) =>
      (b.frontmatter.date || "").localeCompare(a.frontmatter.date || ""),
    );
}

/** Compact list JSON for index / filters / cards. */
export function listWorkflows(options?: {
  /** When true, include `status: draft` (default true for local/dev). */
  includeDrafts?: boolean;
}): WorkflowListItem[] {
  const includeDrafts = options?.includeDrafts ?? true;
  return getAllWorkflows()
    .map(toListItem)
    .filter((item) => includeDrafts || item.status === "published")
    .sort(sortByDateDesc);
}

/** Detail document by frontmatter `slug` (falls back to filename). */
export function getWorkflowBySlug(slug: string): WorkflowDocument | null {
  if (!slug) return null;

  const direct = workflowFilePath(slug);
  if (fs.existsSync(direct)) {
    return readWorkflowFile(direct);
  }

  // Slug may differ from filename — scan once.
  for (const doc of getAllWorkflows()) {
    if (doc.slug === slug || doc.frontmatter.slug === slug) return doc;
  }
  return null;
}
