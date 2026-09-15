/**
 * Smoke check for content MD → JSON (no Next runtime / server-only).
 * Run: node scripts/smoke-content.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(
  root,
  "content/workflows/dunhuang-apsara-rembrandt.md",
);

const raw = fs.readFileSync(file, "utf8");
const { data, content } = matter(raw);

const required = [
  "title",
  "slug",
  "type",
  "style",
  "styles_alt",
  "tags",
  "node_title",
  "status",
  "cover",
  "gallery",
  "workflow_file",
  "workflow_source_id",
  "base_model",
  "clip",
  "clip_type",
  "vae",
  "loras",
  "sampler_pass_1",
  "sampler_pass_2",
  "negative",
  "date",
];

const missing = required.filter((key) => !(key in data));
if (missing.length) {
  console.error("Missing frontmatter keys:", missing);
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      title: data.title,
      slug: data.slug,
      style: data.style,
      styles_alt: data.styles_alt,
      tags: data.tags,
      loras: data.loras?.length,
      sampler_pass_1: data.sampler_pass_1,
      bodyChars: content.trim().length,
      bodyPreview: content.trim().slice(0, 60),
    },
    null,
    2,
  ),
);
