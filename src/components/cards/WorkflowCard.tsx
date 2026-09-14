import Link from "next/link";
import type { WorkflowItem } from "@/lib/data/workflows";

export function WorkflowCard({ item }: { item: WorkflowItem }) {
  const href = `/workflows/${item.id}`;

  return (
    <Link
      href={href}
      prefetch
      className="block overflow-hidden rounded-card border border-nf-border bg-nf-card transition hover:border-nf-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nf-accent"
    >
      <div
        className="relative h-44 w-full"
        style={{ backgroundColor: item.coverTint }}
      >
        <span className="absolute bottom-3 right-3 rounded-full bg-nf-bg px-2 py-1 text-[11px] font-bold text-nf-lime">
          工作流
        </span>
      </div>
      <div className="space-y-3 p-4">
        <h2 className="text-base font-bold text-nf-text">{item.title}</h2>
        <p className="text-[13px] text-nf-muted">主 LoRA · {item.lora}</p>
        <div className="flex gap-2">
          <span className="rounded-[10px] bg-nf-accent px-4 py-2.5 text-sm font-bold text-nf-bg">
            下载
          </span>
          <span className="rounded-[10px] border border-nf-border bg-nf-card px-4 py-2.5 text-sm font-medium text-nf-text">
            预览
          </span>
        </div>
      </div>
    </Link>
  );
}
