"use client";

import { WorkflowCard } from "@/components/cards/WorkflowCard";
import { FilterableList } from "@/components/filters/FilterableList";
import { workflows } from "@/lib/data/workflows";

export default function WorkflowsPage() {
  return (
    <FilterableList
      title="工作流"
      subtitle="可下载的 ComfyUI 图，按风格逛"
      items={workflows}
      gridClassName="grid grid-cols-1 gap-5 md:grid-cols-2"
      renderItem={(item) => <WorkflowCard key={item.id} item={item} />}
    />
  );
}
