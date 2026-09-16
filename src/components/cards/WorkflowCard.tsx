import Image from "next/image";
import Link from "next/link";
import { coverTintForSlug } from "@/lib/content/cover";
import type { WorkflowListItem } from "@/lib/content/types";

export function WorkflowCard({ item }: { item: WorkflowListItem }) {
  const href = `/workflows/${item.slug}`;
  const tint = coverTintForSlug(item.slug);
  const loraLabel = item.primary_lora
    ? `${item.primary_lora.name.replace(/\.safetensors$/i, "")} · ${item.primary_lora.weight}`
    : item.base_model || "LoRA 待补";

  return (
    <Link
      href={href}
      prefetch
      className="block overflow-hidden rounded-card border border-nf-border bg-nf-card transition hover:border-nf-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nf-accent"
    >
      <div className="relative h-44 w-full" style={{ backgroundColor: tint }}>
        {item.cover ? (
          <Image
            src={item.cover}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : null}
        <span className="absolute bottom-3 right-3 rounded-full bg-nf-bg px-2 py-1 text-[11px] font-bold text-nf-lime">
          工作流
        </span>
        {item.status === "draft" ? (
          <span className="absolute left-3 top-3 rounded-full border border-nf-border bg-nf-bg/90 px-2 py-1 text-[11px] font-medium text-nf-muted">
            draft
          </span>
        ) : null}
      </div>
      <div className="space-y-3 p-4">
        <h2 className="text-base font-bold text-nf-text">{item.title}</h2>
        <p className="line-clamp-2 text-[13px] text-nf-muted">
          {item.excerpt || `主 LoRA · ${loraLabel}`}
        </p>
        <p className="truncate font-mono text-[12px] text-nf-muted">{loraLabel}</p>
        <div className="flex gap-2">
          <span className="rounded-[10px] bg-nf-accent px-4 py-2.5 text-sm font-bold text-nf-bg">
            查看
          </span>
          <span className="rounded-[10px] border border-nf-border bg-nf-card px-4 py-2.5 text-sm font-medium text-nf-text">
            {item.style}
          </span>
        </div>
      </div>
    </Link>
  );
}
