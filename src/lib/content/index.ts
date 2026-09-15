import "server-only";

/**
 * Public content API for Server Components / Route Handlers.
 * Reads markdown under the repo `content` folder (frontmatter + body).
 * No database, no crypto.
 */

export type {
  ContentKind,
  ContentStatus,
  SamplerPass,
  WorkflowDocument,
  WorkflowFrontmatter,
  WorkflowListItem,
  WorkflowLora,
} from "./types";

export {
  excerptFromBody,
  normalizeWorkflowFrontmatter,
  parseMarkdown,
} from "./parse";

export { getContentDir, getContentRoot, workflowFilePath } from "./paths";

export {
  getAllWorkflows,
  getWorkflowBySlug,
  listWorkflowSlugs,
  listWorkflows,
  readWorkflowFile,
} from "./workflows";
