import type { StyleLabel } from "./styles";

export type WorkflowItem = {
  id: string;
  title: string;
  style: StyleLabel;
  lora: string;
  weight: string;
  coverTint: string;
  keywords: string[];
  summary: string;
  intro: string;
  updatedAt: string;
  downloads: string;
  author: string;
  relatedPromptId?: string;
  relatedModelIds: string[];
};

export const workflows: WorkflowItem[] = [
  {
    id: "guofeng-ink",
    title: "ZIT·国风水墨丹青",
    style: "国风",
    lora: "ink-wash-v2",
    weight: "0.6–0.8",
    coverTint: "#292E38",
    keywords: ["ink wash", "rice paper", "mist mountains", "scholar figure"],
    summary: "水墨山水与文人气韵的 ComfyUI 图。",
    intro: "偏写意水墨，适合横构图山水与人物点景。",
    updatedAt: "2026-02-18",
    downloads: "860",
    author: "NeonForge / 待补",
    relatedModelIds: ["ink-wash-v2"],
  },
  {
    id: "xianxia-makeup",
    title: "ZIT·古风仙侠定妆",
    style: "古风",
    lora: "xianxia-makeup",
    weight: "0.7–0.9",
    coverTint: "#3A2E48",
    keywords: ["xianxia makeup", "flowing hanfu", "immortal aura"],
    summary: "仙侠定妆与飘带光感节点图。",
    intro: "强调妆面与服饰层次，适合半身人像。",
    updatedAt: "2026-02-21",
    downloads: "1.1k",
    author: "NeonForge / 待补",
    relatedModelIds: ["fairyland"],
  },
  {
    id: "glam-contour",
    title: "ZIT·欧美立体浓妆",
    style: "欧美",
    lora: "glam-contour",
    weight: "0.65–0.85",
    coverTint: "#332838",
    keywords: ["glam contour", "smoky eye", "studio key light"],
    summary: "棚拍浓妆与硬光轮廓。",
    intro: "适合美妆广告与封面人像。",
    updatedAt: "2026-03-01",
    downloads: "720",
    author: "NeonForge / 待补",
    relatedModelIds: ["lumacore"],
  },
  {
    id: "soft-jp",
    title: "ZIT·日系清新软萌",
    style: "日式",
    lora: "soft-jp-v3",
    weight: "0.6–0.8",
    coverTint: "#2E3A30",
    keywords: ["soft jp aesthetic", "pastel tones", "bokeh"],
    summary: "日系清新软光人像流程。",
    intro: "浅景深与柔光，适合日常写真感。",
    updatedAt: "2026-02-28",
    downloads: "940",
    author: "NeonForge / 待补",
    relatedModelIds: ["softbloom"],
  },
  {
    id: "cyber-neon",
    title: "ZIT·赛博霓虹街头",
    style: "赛博朋克",
    lora: "Cybercore",
    weight: "0.8–1.0",
    coverTint: "#331F38",
    keywords: ["霓虹", "机械义体", "雨夜街头", "反射"],
    summary: "可下载的 ComfyUI 工作流，雨夜霓虹街头与机械义体氛围。",
    intro:
      "可下载的 ComfyUI 工作流，面向雨夜霓虹街头与机械义体氛围。图中已串好采样、放大与基础 Control，导入后改种子与主 LoRA 权重即可出图。\n\n建议搭配 Cybercore（0.8–1.0）与赛博提示词骨架：霓虹招牌、湿沥青反射、义体高光、冷暖撞色。适合角色立绘、街景氛围与短片分镜底图。\n\n节点偏轻量，消费级显卡可跑；想更锐的边与更脏的雨雾，可在末级加轻度锐化或噪点，不必重搭整图。",
    updatedAt: "2026-03-12",
    downloads: "1.2k",
    author: "NeonForge / 待补",
    relatedPromptId: "cyber-neon",
    relatedModelIds: ["cybercore", "realistic-snapshot"],
  },
  {
    id: "epic-fantasy",
    title: "ZIT·奇幻魔幻史诗",
    style: "奇幻/魔幻",
    lora: "epic-fantasy",
    weight: "0.7–0.9",
    coverTint: "#2A2438",
    keywords: ["epic fantasy", "dragon silhouette", "volumetric rays"],
    summary: "史诗奇幻光雾与远景构图。",
    intro: "适合宽景奇幻场景与龙影剪影。",
    updatedAt: "2026-03-05",
    downloads: "680",
    author: "NeonForge / 待补",
    relatedModelIds: ["fairyland"],
  },
];

export function getWorkflowById(id: string) {
  return workflows.find((item) => item.id === id);
}

export function getWorkflowsByStyle(style: StyleLabel | "全部") {
  if (style === "全部") return workflows;
  return workflows.filter((item) => item.style === style);
}
