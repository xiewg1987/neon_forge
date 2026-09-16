import type { ReactNode } from "react";

type MarkdownViewProps = {
  source: string;
  className?: string;
};

function inlineFormat(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(
        <strong key={key} className="font-semibold text-nf-text">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      parts.push(
        <code
          key={key}
          className="rounded bg-nf-bg px-1 py-0.5 font-mono text-[12px] text-nf-lime"
        >
          {token.slice(1, -1)}
        </code>,
      );
    }
    key += 1;
    last = match.index + token.length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/**
 * Minimal markdown renderer for workflow bodies (no extra deps).
 * Covers headings, paragraphs, quotes, lists, fenced code, and pipe tables.
 */
export function MarkdownView({ source, className }: MarkdownViewProps) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const line = lines[i] ?? "";
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !(lines[i] ?? "").trim().startsWith("```")) {
        codeLines.push(lines[i] ?? "");
        i += 1;
      }
      i += 1;
      blocks.push(
        <pre
          key={blockKey++}
          className="overflow-x-auto rounded-[10px] border border-nf-border bg-nf-bg/80 p-3 font-mono text-[12px] leading-5 text-nf-muted"
          data-lang={lang || undefined}
        >
          <code>{codeLines.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    if (trimmed.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && (lines[i] ?? "").trim().startsWith("|")) {
        tableLines.push((lines[i] ?? "").trim());
        i += 1;
      }
      const rows = tableLines
        .filter((row) => !/^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(row))
        .map((row) =>
          row
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((cell) => cell.trim()),
        );
      if (rows.length > 0) {
        const [head, ...body] = rows;
        blocks.push(
          <div key={blockKey++} className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b border-nf-border text-nf-muted">
                  {head?.map((cell) => (
                    <th key={cell} className="px-2 py-2 font-medium">
                      {inlineFormat(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row) => (
                  <tr key={row.join("|")} className="border-b border-nf-border/60">
                    {row.map((cell, cellIndex) => (
                      <td key={`${cell}-${cellIndex}`} className="px-2 py-2 text-nf-text">
                        {inlineFormat(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        );
      }
      continue;
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(trimmed);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2];
      const shared = "font-bold tracking-tight text-nf-text";
      if (level === 1) {
        blocks.push(
          <h2 key={blockKey++} className={`mt-2 text-2xl ${shared}`}>
            {inlineFormat(text)}
          </h2>,
        );
      } else if (level === 2) {
        blocks.push(
          <h3 key={blockKey++} className={`mt-4 text-lg ${shared}`}>
            {inlineFormat(text)}
          </h3>,
        );
      } else {
        blocks.push(
          <h4 key={blockKey++} className={`mt-3 text-base ${shared}`}>
            {inlineFormat(text)}
          </h4>,
        );
      }
      i += 1;
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && (lines[i] ?? "").trim().startsWith(">")) {
        quoteLines.push((lines[i] ?? "").trim().replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push(
        <blockquote
          key={blockKey++}
          className="rounded-[10px] border-l-2 border-nf-accent bg-nf-card/60 px-4 py-3 text-sm leading-6 text-nf-muted"
        >
          {inlineFormat(quoteLines.join(" "))}
        </blockquote>,
      );
      continue;
    }

    if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      const ordered = /^\d+\.\s+/.test(trimmed);
      while (
        i < lines.length &&
        (/^[-*]\s+/.test((lines[i] ?? "").trim()) ||
          /^\d+\.\s+/.test((lines[i] ?? "").trim()))
      ) {
        items.push(
          (lines[i] ?? "")
            .trim()
            .replace(/^[-*]\s+/, "")
            .replace(/^\d+\.\s+/, ""),
        );
        i += 1;
      }
      const ListTag = ordered ? "ol" : "ul";
      blocks.push(
        <ListTag
          key={blockKey++}
          className={
            ordered
              ? "list-decimal space-y-1.5 pl-5 text-sm leading-6 text-nf-muted"
              : "list-disc space-y-1.5 pl-5 text-sm leading-6 text-nf-muted"
          }
        >
          {items.map((item) => (
            <li key={item}>{inlineFormat(item)}</li>
          ))}
        </ListTag>,
      );
      continue;
    }

    const para: string[] = [trimmed];
    i += 1;
    while (i < lines.length) {
      const next = (lines[i] ?? "").trim();
      if (
        !next ||
        next.startsWith("#") ||
        next.startsWith(">") ||
        next.startsWith("|") ||
        next.startsWith("```") ||
        /^[-*]\s+/.test(next) ||
        /^\d+\.\s+/.test(next)
      ) {
        break;
      }
      para.push(next);
      i += 1;
    }
    blocks.push(
      <p key={blockKey++} className="text-sm leading-6 text-nf-muted">
        {inlineFormat(para.join(" "))}
      </p>,
    );
  }

  return <div className={`space-y-3 ${className ?? ""}`}>{blocks}</div>;
}
