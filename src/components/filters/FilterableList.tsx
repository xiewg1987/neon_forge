"use client";

import { useMemo, useState, type ReactNode } from "react";
import { StyleChips } from "@/components/filters/StyleChips";
import type { StyleFilter } from "@/lib/data/styles";

type StyleAware = {
  style: string;
  styles_alt?: string[];
  id?: string;
  slug?: string;
};

type FilterableListProps<T extends StyleAware> = {
  title: string;
  subtitle: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  gridClassName: string;
  extraFilters?: ReactNode;
  defaultStyle?: StyleFilter;
};

function itemKey<T extends StyleAware>(item: T, index: number): string {
  return item.id || item.slug || String(index);
}

function matchesStyle<T extends StyleAware>(item: T, style: StyleFilter): boolean {
  if (style === "全部") return true;
  if (item.style === style) return true;
  return Boolean(item.styles_alt?.includes(style));
}

export function FilterableList<T extends StyleAware>({
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
    return items.filter((item) => matchesStyle(item, style));
  }, [items, style]);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-8 md:px-10">
      <header className="mb-6">
        <h1 className="text-4xl font-bold tracking-tight text-nf-text">{title}</h1>
        <p className="mt-2 text-sm text-nf-muted">{subtitle}</p>
      </header>

      {extraFilters ? <div className="mb-3">{extraFilters}</div> : null}
      <StyleChips value={style} onChange={setStyle} className="mb-8" />

      {filtered.length === 0 ? (
        <p className="text-sm text-nf-muted">该风格下暂无条目。可切换筛选或补充 content 下的 MD。</p>
      ) : (
        <div className={gridClassName}>
          {filtered.map((item, index) => (
            <div key={itemKey(item, index)}>{renderItem(item)}</div>
          ))}
        </div>
      )}
    </div>
  );
}
