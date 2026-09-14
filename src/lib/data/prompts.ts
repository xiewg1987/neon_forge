import type { StyleLabel } from "./styles";

export type PromptItem = {
  id: string;
  title: string;
  style: StyleLabel;
  skeleton: string[];
};

export const prompts: PromptItem[] = [
  {
    id: "guofeng-ink",
    title: "ZIT·国风水墨丹青",
    style: "国风",
    skeleton: [
      "ink wash, rice paper, mist mountains",
      "scholar figure, soft grain, muted ink",
      "negative prompt: modern, neon, plastic",
    ],
  },
  {
    id: "xianxia-makeup",
    title: "ZIT·古风仙侠定妆",
    style: "古风",
    skeleton: [
      "xianxia makeup, flowing hanfu, immortal aura",
      "soft rim light, jade ornaments, misty peaks",
      "negative: modern clothes, neon, plastic skin",
    ],
  },
  {
    id: "glam-contour",
    title: "ZIT·欧美立体浓妆",
    style: "欧美",
    skeleton: [
      "glam contour, smoky eye, studio key light",
      "Vogue editorial, sharp cheekbones, satin skin",
      "negative: flat lighting, anime, oversharpen",
    ],
  },
  {
    id: "soft-jp",
    title: "ZIT·日系清新软萌",
    style: "日式",
    skeleton: [
      "soft jp aesthetic, pastel tones, cute smile",
      "bokeh background, airy daylight, gentle blush",
      "negative: heavy makeup, cyberpunk, gothic",
    ],
  },
  {
    id: "cyber-neon",
    title: "ZIT·赛博霓虹街头",
    style: "赛博朋克",
    skeleton: [
      "neon street, cyberpunk rain, chromatic glow",
      "night city reflections, wet asphalt, holograms",
      "negative: daylight, pastoral, ink wash",
    ],
  },
  {
    id: "epic-fantasy",
    title: "ZIT·奇幻魔幻史诗",
    style: "奇幻/魔幻",
    skeleton: [
      "epic fantasy, dragon silhouette, volumetric rays",
      "dramatic sky, ancient ruins, cinematic scale",
      "negative: modern city, selfie, flat color",
    ],
  },
  {
    id: "anime-chibi",
    title: "ZIT·二次元萌系立绘",
    style: "二次元",
    skeleton: [
      "anime illustration, clean lineart, cel shading",
      "character sheet pose, glossy eyes, soft bloom",
      "negative: photoreal, muddy colors, blur",
    ],
  },
  {
    id: "photo-studio",
    title: "ZIT·写实摄影棚拍",
    style: "写实摄影",
    skeleton: [
      "photoreal portrait, 85mm, softbox lighting",
      "natural skin texture, shallow DOF, studio gray",
      "negative: anime, plastic skin, heavy filters",
    ],
  },
  {
    id: "kids-candy",
    title: "ZIT·儿童萌系软糖",
    style: "儿童/萌系",
    skeleton: [
      "chibi kid, candy colors, soft lighting",
      "playful pose, fluffy props, warm highlights",
      "negative: horror, dark gothic, adult fashion",
    ],
  },
  {
    id: "gothic",
    title: "ZIT·暗黑哥特肖像",
    style: "暗黑/哥特",
    skeleton: [
      "gothic portrait, candlelight, black lace",
      "moody shadows, pale skin, velvet backdrop",
      "negative: pastel cute, neon cyber, daytime",
    ],
  },
  {
    id: "mecha",
    title: "ZIT·科技科幻机甲",
    style: "科技/科幻",
    skeleton: [
      "mecha armor, HUD overlays, cold metal",
      "sci-fi hangar, blue rim light, hard edges",
      "negative: fantasy magic, soft pastel, ink",
    ],
  },
  {
    id: "republic-film",
    title: "ZIT·民国复古胶片",
    style: "民国/复古",
    skeleton: [
      "1930s shanghai, film grain, cheongsam",
      "warm tungsten, soft vignette, street café",
      "negative: neon cyber, anime, HDR glow",
    ],
  },
];

export function getPromptById(id: string) {
  return prompts.find((item) => item.id === id);
}
