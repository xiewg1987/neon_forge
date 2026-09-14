"use client";

import { STYLE_LABELS, type StyleLabel } from "@/lib/data/styles";

export type SortTab = "推荐" | "热门" | "最新" | "关注";
export type KindFilter = "全部" | "工作流" | "提示词";

const SORT_TABS: SortTab[] = ["推荐", "热门", "最新", "关注"];
const KIND_CHIPS: KindFilter[] = ["全部", "工作流", "提示词"];

type DiscoverFiltersProps = {
  sort: SortTab;
  onSortChange: (next: SortTab) => void;
  kind: KindFilter;
  onKindChange: (next: KindFilter) => void;
  style: StyleLabel;
  onStyleChange: (next: StyleLabel) => void;
};

export function DiscoverFilters({
  sort,
  onSortChange,
  kind,
  onKindChange,
  style,
  onStyleChange,
}: DiscoverFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-6">
          {SORT_TABS.map((tab) => {
            const active = sort === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onSortChange(tab)}
                className={
                  active
                    ? "border-b-2 border-nf-text pb-1 text-[15px] font-bold text-nf-text"
                    : "pb-1 text-[15px] font-medium text-nf-muted hover:text-nf-text"
                }
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[13px] text-nf-muted">类型</span>
          {KIND_CHIPS.map((chip) => {
            const active = kind === chip;
            return (
              <button
                key={chip}
                type="button"
                onClick={() => onKindChange(chip)}
                className={
                  active
                    ? "rounded-full border border-nf-accent bg-nf-card px-3 py-1.5 text-[13px] font-medium text-nf-text"
                    : "rounded-full border border-nf-border bg-nf-card px-3 py-1.5 text-[13px] font-medium text-nf-muted hover:border-nf-muted"
                }
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {STYLE_LABELS.map((label) => {
          const selected = style === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onStyleChange(label)}
              className={
                selected
                  ? "rounded-full border border-nf-accent bg-nf-card px-3 py-1.5 text-[13px] font-medium text-nf-text"
                  : "rounded-full border border-nf-border bg-nf-card px-3 py-1.5 text-[13px] font-medium text-nf-muted hover:border-nf-muted"
              }
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
