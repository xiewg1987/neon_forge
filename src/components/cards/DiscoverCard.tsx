import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import type { WorkflowItem } from "@/lib/data/workflows";
import type { PromptItem } from "@/lib/data/prompts";

type DiscoverCardProps = {
  kind: "工作流" | "提示词";
  title: string;
  href: string;
  coverTint: string;
  tags: string[];
  author?: string;
  stats?: string;
};

export function DiscoverCard({
  kind,
  title,
  href,
  coverTint,
  tags,
  author = "@neonforge",
  stats = "1.2k",
}: DiscoverCardProps) {
  return (
    <Link
      href={href}
      prefetch
      className="group block overflow-hidden rounded-card border border-nf-border bg-nf-card transition hover:border-nf-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nf-accent"
    >
      <div className="relative aspect-[4/5] w-full" style={{ backgroundColor: coverTint }}>
        <span
          className={
            kind === "工作流"
              ? "absolute bottom-3 right-3 rounded-full bg-nf-bg/90 px-2 py-1 text-[11px] font-bold text-nf-lime"
              : "absolute bottom-3 right-3 rounded-full bg-nf-bg/90 px-2 py-1 text-[11px] font-bold text-nf-accent"
          }
        >
          {kind}
        </span>
      </div>
      <div className="space-y-2.5 p-3">
        <h2 className="line-clamp-2 text-sm font-bold leading-5 text-nf-text group-hover:text-nf-accent">
          {title}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-nf-border bg-nf-bg px-1.5 py-0.5 text-[11px] text-nf-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-[12px] text-nf-muted">
          <span>{author}</span>
          <span className="inline-flex items-center gap-1">
            <FiDownload size={12} aria-hidden />
            {stats}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function workflowToDiscover(item: WorkflowItem): DiscoverCardProps {
  return {
    kind: "工作流",
    title: item.title,
    href: `/workflows/${item.id}`,
    coverTint: item.coverTint,
    tags: [item.style, item.lora],
    author: "@neonforge",
    stats: item.downloads,
  };
}

export function promptToDiscover(item: PromptItem, tint: string): DiscoverCardProps {
  return {
    kind: "提示词",
    title: item.title,
    href: "/prompts",
    coverTint: tint,
    tags: [item.style, item.skeleton[0]?.split(",")[0]?.trim() || "skeleton"],
    author: "@neonforge",
    stats: "860",
  };
}
