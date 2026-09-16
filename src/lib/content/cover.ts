/** Stable placeholder cover colors when frontmatter.cover is empty. */
const COVER_TINTS = [
  "#292E38",
  "#3A2E48",
  "#332838",
  "#2E3A30",
  "#331F38",
  "#2A2438",
  "#2E1F33",
  "#291F2E",
] as const;

export function coverTintForSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % COVER_TINTS.length;
  }
  return COVER_TINTS[hash] ?? COVER_TINTS[0];
}
