"use client";

import { STYLE_FILTERS, type StyleFilter } from "@/lib/data/styles";

type StyleChipsProps = {
  value: StyleFilter;
  onChange: (next: StyleFilter) => void;
  className?: string;
};

export function StyleChips({ value, onChange, className = "" }: StyleChipsProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {STYLE_FILTERS.map((label) => {
        const selected = value === label;
        return (
          <button
            key={label}
            type="button"
            onClick={() => onChange(label)}
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
  );
}
