import "server-only";

import path from "node:path";
import type { ContentKind } from "./types";

/** Repo-root `content/` directory (outside `src`). */
export function getContentRoot(): string {
  return path.join(process.cwd(), "content");
}

export function getContentDir(kind: ContentKind): string {
  return path.join(getContentRoot(), kind);
}

export function workflowFilePath(slug: string): string {
  return path.join(getContentDir("workflows"), `${slug}.md`);
}
