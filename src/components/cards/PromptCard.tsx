"use client";

import type { PromptItem } from "@/lib/data/prompts";

export function PromptCard({ item }: { item: PromptItem }) {
  const text = item.skeleton.join("\n");

  return (
    <article className="flex flex-col gap-3 rounded-card border border-nf-border bg-nf-card p-4 transition hover:border-nf-accent/40">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base font-bold text-nf-text">{item.title}</h2>
        <span className="shrink-0 rounded-full bg-nf-bg px-2 py-1 text-[11px] font-bold text-nf-lime">
          提示词
        </span>
      </div>
      <div className="rounded-[10px] border border-nf-border/80 bg-nf-bg/70 p-3 font-mono text-xs leading-[18px] text-nf-muted">
        {item.skeleton.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-[10px] bg-nf-accent px-4 py-2.5 text-sm font-bold text-nf-bg"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(text);
            } catch {
              // clipboard may be blocked in insecure contexts
            }
          }}
        >
          复制
        </button>
        <button
          type="button"
          title="详情页即将推出"
          className="rounded-[10px] border border-nf-border px-4 py-2.5 text-sm font-medium text-nf-muted"
        >
          查看
        </button>
      </div>
    </article>
  );
}
