import Link from "next/link";
import type { ModelItem } from "@/lib/data/models";

export function ModelCard({ item }: { item: ModelItem }) {
  return (
    <article className="overflow-hidden rounded-card border border-nf-border bg-nf-card transition hover:border-nf-accent/40">
      <div className="h-44 w-full" style={{ backgroundColor: item.coverTint }} />
      <div className="space-y-2 p-3">
        <h2 className="text-[15px] font-bold text-nf-text">{item.name}</h2>
        <p className="text-xs text-nf-muted">
          {item.type} · 建议权重 {item.weight}
        </p>
        <span className="inline-flex rounded-full border border-nf-border bg-nf-bg px-2 py-0.5 text-[11px] font-medium text-nf-muted">
          {item.style}
        </span>
        <div className="flex flex-wrap gap-2 pt-1">
          <Link
            href="/workflows"
            prefetch
            className="rounded-lg bg-nf-accent px-2.5 py-2 text-xs font-bold text-nf-bg"
          >
            搭配工作流
          </Link>
          <button
            type="button"
            title="详情页即将推出"
            className="rounded-lg border border-nf-border px-2.5 py-2 text-xs font-medium text-nf-muted"
          >
            查看
          </button>
        </div>
      </div>
    </article>
  );
}
