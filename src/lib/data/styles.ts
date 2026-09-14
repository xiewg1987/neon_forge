export const STYLE_LABELS = [
  "国风",
  "古风",
  "欧美",
  "日式",
  "赛博朋克",
  "奇幻/魔幻",
  "二次元",
  "写实摄影",
  "儿童/萌系",
  "暗黑/哥特",
  "科技/科幻",
  "民国/复古",
] as const;

export type StyleLabel = (typeof STYLE_LABELS)[number];

export const STYLE_FILTERS = ["全部", ...STYLE_LABELS] as const;

export type StyleFilter = (typeof STYLE_FILTERS)[number];
