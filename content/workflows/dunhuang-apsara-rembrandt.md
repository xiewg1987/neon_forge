---
title: ZIT·敦煌飞天斜光定妆
slug: dunhuang-apsara-rembrandt
type: workflow
style: 古风
styles_alt: [国风, 奇幻/魔幻]
tags: [敦煌, 飞天, 斜光, 定妆, Rembrandt, 壁画]
node_title: 敦煌飞天·斜光定妆
status: draft
cover: "https://ik.imagekit.io/mgfraphpo/Dunhuang_Flying%20Fairies_Slanting_Light_Setting?updatedAt=1789547231338"
gallery: []
workflow_file: ""
workflow_source_id: "345366c8-4bc2-4684-a9fb-e3855736f640"
base_model: z_image_turbo_int8_convrot.safetensors
clip: qwen_3_4b.safetensors
clip_type: lumina2
vae: z_image_turbo.safetensors
loras:
  - name: Velatrix.safetensors
    weight: 0.65
    role: 主风格（采样链）
    note: 黑金赛博变体建议 0.55～0.65
  - name: skin texture style zib v2.1.safetensors
    weight: 0.2
    role: 精修链·皮肤
  - name: 888_DunHuang_ZIB.safetensors
    weight: 0.4
    role: 精修链·敦煌
    note: 反弹琵琶可调 0.45～0.55 或 0.25～0.35；黑金赛博请关闭
  - name: rim_lighting_slider.safetensors
    weight: 0.9
    role: 轮廓光（可选）
    note: 图中常旁路 mode=4；多数变体建议关闭
sampler_pass_1:
  steps: 8
  cfg: 1
  sampler: euler
  scheduler: simple
  denoise: 1.0
  size: 1024x1024
  seed_mode: randomize
sampler_pass_2:
  steps: 6
  cfg: 1
  sampler: euler
  scheduler: simple
  denoise: 0.3
  note: 以 Pass1 Latent 做低降噪精修
negative: zero_out
date: 2026-09-14
---

敦煌壁画飞天气质的唐风美人定妆肖像：赭石 / 青绿 / 朱红 + 金箔，Rembrandt 左前斜光与庙宇体积光；Z-Image Turbo 双采样，8 步出图后再 denoise 0.3 精修。

> ComfyUI 双采样 · 图内 **3 套提示词变体** · 默认接「斜光定妆」

## 管线

```text
UNET ──┬── (可选 Rim 0.9) ── Velatrix 0.65 ──► KSampler Pass1 ──► Preview
       │                              ▲              │
       │                         CLIP+ / ZeroNeg     │ latent
       └── Skin 0.2 ── DunHuang 0.4 ──────────► KSampler Pass2 ──► Save + Compare
```

## 提示词变体

### A. 敦煌飞天·斜光定妆（默认）

```text
Dunhuang mural inspired Tang fantasy beauty, flying apsara vibe, elegant East Asian face, long flowing black hair with ornate golden hair ornaments, silk ribbons and cascading sleeves,

rich ochre, turquoise, mineral green and vermilion palette, gold leaf accents, ancient fresco texture mixed with cinematic CG Unreal Engine 5 / Octane render, stylized 3D not photoreal,

Rembrandt key light from front-left about 45 degrees, soft volumetric god rays through temple dust, warm candle fill, high-contrast chiaroscuro, sacred calm atmosphere, no harsh backlight,

portrait, upper body, looking at camera, ornate Dunhuang cave background softly blurred, highly detailed face, sharp focus
```

DunHuang 精修约 0.4；Rim 建议关。

### B. 反弹琵琶·动势飘带

```text
Dunhuang flying apsara inspired Tang fantasy beauty, classic reverse-pipa pose, playing pipa behind the back, dynamic but elegant body twist, long cascading silk ribbons and wide sleeves flowing in the air, ornate golden hair ornaments, turquoise and vermilion layered silk, gold leaf jewelry accents,

rich Dunhuang mural color palette with mineral pigments, fresco texture mixed with cinematic CG Unreal Engine 5 / Octane render, stylized 3D character not photoreal skin, clean PBR fabrics with soft specular highlights on gold and silk,

Rembrandt key light from front-left about 45 degrees, soft volumetric god rays, warm temple dust in the light beams, cool blue fill in shadows, high-contrast chiaroscuro, no strong rim light, no backlight halo behind the head,

three-quarter upper body, implied cloth motion without motion blur, sacred graceful expression, highly detailed face, sharp focus, masterpiece composition
```

DunHuang 多用 `0.45～0.55`，弱化时 `0.25～0.35`；Rim 建议关。

### C. 黑金赛博·霓虹斜光

```text
East Asian young woman, contemporary cyber-Tang beauty, modern fashion not ancient costume, sleek black bob or high sleek ponytail with subtle metallic hair clips, no hanfu, no Tang bun,

modern makeup: flawless base, sharp winged eyeliner, soft smoky outer corner, clean brows, gradient soft-red lips, subtle highlighter on cheekbones, tiny gold glitter accents near eyes,

black-and-gold modern outfit: tailored black blazer or techwear jacket with gold hardware, silk camisole, minimalist gold jewelry, neon city bokeh background,

cinematic CG Unreal Engine 5 / Octane render, stylized 3D character not photoreal skin, sharp metal and fabric specular highlights,

Rembrandt key light from front-left about 45°, magenta-cyan neon fill kept secondary, soft volumetric haze, high-contrast chiaroscuro, no strong rim light, no backlight halo behind head,

portrait upper body, looking at camera, cool confident expression, highly detailed face, sharp focus
```

DunHuang **关**，Rim **关**，Velatrix `0.55～0.65`。

## 使用注意

- 负面走 **ZeroOut**，不是普通 negative prompt
- `rim_lighting_slider` 常为旁路；需要轮廓光再手动打开并降权
- 换变体时改 CLIP 文本，并按上表开关 DunHuang / Rim / Velatrix
- 依赖自定义节点：`SaveImageAdvanced`、`ImageCompare`
