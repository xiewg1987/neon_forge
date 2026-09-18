---
title: 写实·深海巨物尺度压迫
slug: abyssal-colossal-scale
type: workflow
style: 写实摄影
styles_alt: [奇幻/魔幻, 暗黑/哥特]
tags: [巨物, 深海, 北海巨妖, 尺度参照, 长焦压缩, 负空间, Krea2]
node_title: 深海巨物·尺度压迫
status: draft
cover: ""
gallery: []
workflow_file: ""
workflow_source_id: ""
base_model: ""
clip: ""
clip_type: ""
vae: ""
loras: []
sampler_pass_1: null
sampler_pass_2: null
negative: ""
date: 2026-09-16
---

远超现实的深海 / 北海巨物：公里级体量数据、人类尺度蜂窝纹理、长焦空间压缩、远景同平面极小参照物；强制 10%～40% 环境负空间，写实纪录片摄影质感。

> Krea2 巨物规则 · **2 套提示词变体** · 默认「深海巨物」· 对照「北海巨妖与船」

## 提示词变体

### A. 深海巨物（默认）

```text
A jaw-dropping photorealistic cinematic wide shot of a colossal abyssal armored leviathan rising through black mid-ocean water, occupying exactly 72% of the composition. Captured with a 700mm super telephoto lens from a submerged extreme far distance at a slight low angle, the intense spatial compression flattens the abyss into a surreal plane of crushing pressure and reveals the creature’s entire 9,500-meter-long form—ridged cranial crest, vast lateral fins, and a coiling abyssal tail—fully contained within the frame as one continuous silhouette. The upper-right 28% of the canvas is strictly reserved as pure negative space, a vast empty column of ink-dark seawater and drifting marine snow that isolates the beast’s scale against infinite depth. The hide is a mind-bending hyper-dense macro-texture composed of tens of millions of normal human-sized iridescent scales, barnacle-like dermal plates, glowing bioluminescent pores, and scarred mucous seams that resolve into dizzying honeycomb grids of living armor. Far below on the same extreme distant focal plane, a real-world Nimitz-class aircraft carrier near the creature’s ventral shadow occupies less than 0.08% of the frame, reduced to a microscopic pale speck and forging a devastating semantic conflict between naval might and oceanic gigantism. Cold cyan bioluminescence and faint surface light shafts pierce suspended silt, gritty cinematic blue-black color grading, deep atmospheric haze, absolute masterpiece, 8k resolution, ultra-detailed documentary photography.
```

占画约 72%，负空间约 28%；航母远景同平面；禁 UE5 / CG。

### B. 北海巨妖与船

```text
A harrowing photorealistic cinematic wide shot of a colossal North Sea kraken-like tentacled behemoth erupting from a storm-thrashed cold ocean, occupying exactly 68% of the composition. Captured with a 600mm super telephoto lens from a shipboard extreme far distance at eye level, the intense spatial compression strips away depth and locks the entire terrifying silhouette into one flattened plane—a mountainous cephalopod mass with a 4,200-meter-wide mantle, countless writhing arms spanning nearly 18 kilometers tip to tip, and a barnacle-crusted head crest rising into gale-torn spray. The left and top-left 32% of the canvas is strictly reserved as pure negative space for a vast empty slate of wind-scoured grey sky and unbroken black-green swells, maximizing isolation and dread. The creature’s rubbery hide is a hyper-dense macro-texture of tens of millions of normal human-sized suction cups, wet ridged flesh folds, scarred keratin patches, and salt-crusted dermal pores resolving into a dizzying honeycomb of living organic detail. On the same extreme distant focal plane near the base of one descending arm, a real-world wooden three-masted sailing ship occupies less than 0.06% of the frame, reduced to a few pale pixels and forging a devastating semantic conflict between fragile seamanship and abyssal gigantism. Harsh overcast North Atlantic light, freezing sea mist, high-contrast cinematic color grading of iron greys and deep teal, absolute masterpiece, 8k resolution, ultra-detailed documentary photography.
```

占画约 68%，负空间约 32%；木帆船远景同平面；风暴北海光色。

## 使用注意

- 遵循 Krea2 巨怪规则：夸张尺寸、微观人类尺度堆叠、参照物禁止近景、强制负空间
- 提示词禁止 UE5 / 3D render / CG；只用 photorealistic / cinematic / 8k
- 换变体只改 CLIP 文本：A 深渊冷青，B 北海风暴灰绿
- 底模 / LoRA / 采样参数待对接 ComfyUI 图后写入 frontmatter
