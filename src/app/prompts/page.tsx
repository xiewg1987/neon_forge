"use client";

import { PromptCard } from "@/components/cards/PromptCard";
import { FilterableList } from "@/components/filters/FilterableList";
import { prompts } from "@/lib/data/prompts";

export default function PromptsPage() {
  return (
    <FilterableList
      title="提示词"
      subtitle="按风格复制可用的提示词骨架"
      items={prompts}
      gridClassName="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
      renderItem={(item) => <PromptCard key={item.id} item={item} />}
    />
  );
}
