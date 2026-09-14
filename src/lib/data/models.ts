import type { StyleLabel } from "./styles";

export type ModelType = "LoRA" | "Checkpoint";

export type ModelItem = {
  id: string;
  name: string;
  type: ModelType;
  weight: string;
  style: StyleLabel;
  coverTint: string;
};

export const models: ModelItem[] = [
  {
    id: "fairyland",
    name: "Fairyland",
    type: "LoRA",
    weight: "0.7–0.9",
    style: "奇幻/魔幻",
    coverTint: "#332E48",
  },
  {
    id: "dunhuang",
    name: "DunHuang",
    type: "LoRA",
    weight: "0.6–0.85",
    style: "国风",
    coverTint: "#473348",
  },
  {
    id: "anime-manga",
    name: "二次元漫画",
    type: "LoRA",
    weight: "0.7–0.9",
    style: "二次元",
    coverTint: "#382E3A",
  },
  {
    id: "lumacore",
    name: "lumacore",
    type: "LoRA",
    weight: "0.65–0.85",
    style: "欧美",
    coverTint: "#2E3842",
  },
  {
    id: "cybercore",
    name: "Cybercore",
    type: "LoRA",
    weight: "0.7–0.9",
    style: "赛博朋克",
    coverTint: "#331F38",
  },
  {
    id: "realistic-snapshot",
    name: "Realistic Snapshot",
    type: "Checkpoint",
    weight: "底座模型",
    style: "写实摄影",
    coverTint: "#2E3A33",
  },
  {
    id: "ink-wash-v2",
    name: "ink-wash-v2",
    type: "LoRA",
    weight: "0.6–0.8",
    style: "国风",
    coverTint: "#292E38",
  },
  {
    id: "softbloom",
    name: "SoftBloom · 待补",
    type: "LoRA",
    weight: "待补",
    style: "日式",
    coverTint: "#3A2E3D",
  },
];

export function getModelById(id: string) {
  return models.find((item) => item.id === id);
}
