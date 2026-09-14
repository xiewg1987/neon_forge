"use client";

import { useMemo, useState } from "react";
import { ModelCard } from "@/components/cards/ModelCard";
import { StyleChips } from "@/components/filters/StyleChips";
import { models, type ModelType } from "@/lib/data/models";
import type { StyleFilter } from "@/lib/data/styles";

const TYPE_TABS: Array<"全部" | ModelType> = ["全部", "LoRA", "Checkpoint"];

export default function ModelsPage() {
  const [style, setStyle] = useState<StyleFilter>("全部");
  const [type, setType] = useState<"全部" | ModelType>("全部");

  const filtered = useMemo(() => {
    return models.filter((item) => {
      const styleOk = style === "全部" || item.style === style;
      const typeOk = type === "全部" || item.type === type;
      return styleOk && typeOk;
    });
  }, [style, type]);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-8 md:px-10">
      <header className="mb-6">
        <h1 className="text-4xl font-bold tracking-tight text-nf-text">模型</h1>
        <p className="mt-2 text-sm text-nf-muted">
          LoRA / Checkpoint，按风格搭配提示词与工作流
        </p>
      </header>

      <div className="mb-3 flex flex-wrap gap-2">
        {TYPE_TABS.map((tab) => {
          const selected = type === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setType(tab)}
              className={
                selected
                  ? "rounded-lg border border-nf-accent bg-nf-card px-3 py-1.5 font-mono text-xs font-medium text-nf-text"
                  : "rounded-lg border border-nf-border bg-nf-card px-3 py-1.5 font-mono text-xs font-medium text-nf-muted"
              }
            >
              {tab}
            </button>
          );
        })}
      </div>

      <StyleChips value={style} onChange={setStyle} className="mb-8" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => (
          <ModelCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
