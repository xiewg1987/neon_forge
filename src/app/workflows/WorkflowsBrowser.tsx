"use client";

import { WorkflowCard } from "@/components/cards/WorkflowCard";
import { FilterableList } from "@/components/filters/FilterableList";
import type { WorkflowListItem } from "@/lib/content/types";

export function WorkflowsBrowser({ items }: { items: WorkflowListItem[] }) {
  return (
    <FilterableList
      title="工作流"
      subtitle="从 content/workflows 读取的 ComfyUI 图，按风格逛"
      items={items}
      gridClassName="columns-1 gap-5 sm:columns-2 lg:columns-4"
      itemClassName="mb-5 break-inside-avoid"
      renderItem={(item) => <WorkflowCard item={item} />}
    />
  );
}
