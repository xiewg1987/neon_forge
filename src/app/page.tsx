"use client";

import { useMemo, useState } from "react";
import {
  DiscoverCard,
  promptToDiscover,
  workflowToDiscover,
} from "@/components/cards/DiscoverCard";
import {
  DiscoverFilters,
  type KindFilter,
  type SortTab,
} from "@/components/home/DiscoverFilters";
import { DiscoverBanner } from "@/components/home/DiscoverBanner";
import { prompts } from "@/lib/data/prompts";
import { STYLE_LABELS, type StyleLabel } from "@/lib/data/styles";
import { workflows } from "@/lib/data/workflows";

const PROMPT_TINTS = [
  "#292E38",
  "#3A2E48",
  "#332838",
  "#2E3A30",
  "#331F38",
  "#2A2438",
];

export default function DiscoverPage() {
  const [sort, setSort] = useState<SortTab>("推荐");
  const [kind, setKind] = useState<KindFilter>("全部");
  const [style, setStyle] = useState<StyleLabel>(STYLE_LABELS[0]);

  const feed = useMemo(() => {
    const wf = workflows.map(workflowToDiscover);
    const pr = prompts.map((item, index) =>
      promptToDiscover(item, PROMPT_TINTS[index % PROMPT_TINTS.length]),
    );

    let mixed = [...wf, ...pr];

    if (kind === "工作流") mixed = mixed.filter((item) => item.kind === "工作流");
    if (kind === "提示词") mixed = mixed.filter((item) => item.kind === "提示词");

    mixed = mixed.filter((item) => item.tags.includes(style));

    if (sort === "最新") mixed = [...mixed].reverse();
    if (sort === "热门") {
      mixed = [...mixed].sort((a, b) => {
        const av = Number.parseFloat((a.stats || "0").replace("k", "")) || 0;
        const bv = Number.parseFloat((b.stats || "0").replace("k", "")) || 0;
        return bv - av;
      });
    }

    return mixed;
  }, [kind, sort, style]);

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6 px-6 py-4 md:px-10 md:py-4">
      <DiscoverBanner />

      <DiscoverFilters
        sort={sort}
        onSortChange={setSort}
        kind={kind}
        onKindChange={setKind}
        style={style}
        onStyleChange={setStyle}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {feed.map((item) => (
          <DiscoverCard key={`${item.kind}-${item.title}`} {...item} />
        ))}
      </div>
    </div>
  );
}
