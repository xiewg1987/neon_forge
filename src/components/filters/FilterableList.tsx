"use client";

import { useMemo, useState, type ReactNode } from "react";
import { StyleChips } from "@/components/filters/StyleChips";
import type { StyleFilter } from "@/lib/data/styles";

type FilterableListProps<T extends { id: string; style: string }> = {
  title: string;
  subtitle: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  gridClassName: string;
  extraFilters?: ReactNode;
  defaultStyle?: StyleFilter;
};

export function FilterableList<T extends { id: string; style: string }>({
  title,
  subtitle,
  items,
  renderItem,
  gridClassName,
  extraFilters,
  defaultStyle = "全部",
}: FilterableListProps<T>) {
  const [style, setStyle] = useState<StyleFilter>(defaultStyle);

  const filtered = useMemo(() => {
    if (style === "全部") return items;
    return items.filter((item) => item.style === style);
  }, [items, style]);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-8 md:px-10">
      <header className="mb-6">
        <h1 className="text-4xl font-bold tracking-tight text-nf-text">{title}</h1>
        <p className="mt-2 text-sm text-nf-muted">{subtitle}</p>
      </header>

      {extraFilters ? <div className="mb-3">{extraFilters}</div> : null}
      <StyleChips value={style} onChange={setStyle} className="mb-8" />

      <div className={gridClassName}>
        {filtered.map((item) => (
          <div key={item.id}>{renderItem(item)}</div>
        ))}
      </div>
    </div>
  );
}
