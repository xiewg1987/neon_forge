---
title: ZIT·敦煌飞天斜光定妆
slug: dunhuang-apsara-rembrandt
type: workflow
style: 古风
styles_alt: [国风, 奇幻/魔幻]
tags: [敦煌, 飞天, 斜光, 定妆, Rembrandt, 壁画]
node_title: 敦煌飞天·斜光定妆
status: draft

# —— 资源占位：上传后填入 ——
cover: ""          # 例: /covers/dunhuang-apsara-rembrandt.png
gallery: []        # 例: ["/gallery/dunhuang-01.png", "/gallery/dunhuang-02.png"]
workflow_file: ""  # 例: /files/workflows/dunhuang-apsara-rembrandt.json
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
    note: 反弹琵琶变体可调 0.45～0.55 或 0.25～0.35；黑金赛博请关闭
  - name: rim_lighting_slider.safetensors
    weight: 0.9
    role: 轮廓光（可选）
    note: 当前图中该节点为静音/旁路(mode=4)；笔记建议多数变体关闭 Rim

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

# 敦煌飞天·斜光定妆

> ComfyUI 双采样工作流：Z-Image Turbo + 敦煌/皮肤 LoRA 精修 +（可选）轮廓光。  
> 图内笔记含 **3 套提示词变体**；当前 CLIP 编码接的是「斜光定妆」主提示词。

## 资源（待上传）

| 用途 | 字段 | 路径（占位） |
|------|------|----------------|
| 封面图 | `cover` | `<!-- TODO: cover url -->` |
| 效果图集 | `gallery` | `<!-- TODO: gallery urls -->` |
| 工作流 JSON | `workflow_file` | `<!-- TODO: workflow json url -->` |
| 对比图（Pass1 vs Pass2） | — | `<!-- TODO: compare image url -->` |

## 一句话说明

敦煌壁画飞天气质的唐风美人定妆肖像：赭石 / 青绿 / 朱红 + 金箔，Rembrandt 左前斜光，庙宇体积光；先 8 步出图，再 6 步 denoise 0.3 精修。

## 模型与 LoRA

| 类型 | 文件名 | 权重 / 设置 |
|------|--------|-------------|
| UNET | `z_image_turbo_int8_convrot.safetensors` | default |
| CLIP | `qwen_3_4b.safetensors` | type=`lumina2` |
| VAE | `z_image_turbo.safetensors` | — |
| LoRA | `Velatrix.safetensors` | **0.65**（接主采样） |
| LoRA | `skin texture style zib v2.1.safetensors` | **0.2**（精修链） |
| LoRA | `888_DunHuang_ZIB.safetensors` | **0.4**（精修链） |
| LoRA | `rim_lighting_slider.safetensors` | 0.9（图中常旁路；笔记多建议关） |

## 管线拆解

```text
UNET ──┬── (可选 Rim 0.9) ── Velatrix 0.65 ──► KSampler Pass1 ──► VAEDecode ──► Preview
       │                              ▲              │
       │                         CLIP+ / ZeroNeg     │ latent
       │                              │              ▼
       └── Skin 0.2 ── DunHuang 0.4 ──────────► KSampler Pass2 ──► VAEDecode ──► Save + Compare
```

1. **EmptyLatentImage**：1024 × 1024，batch 1  
2. **CLIPTextEncode**：正面提示词（见下「变体 A」）  
3. **ConditioningZeroOut**：负面条件清零（配合 CFG=1）  
4. **KSampler Pass1**：seed 可随机；steps 8 / cfg 1 / euler / simple / denoise 1  
5. **VAEDecode + PreviewImage**：看初稿  
6. **KSampler Pass2**：承接 Pass1 latent；steps 6 / cfg 1 / euler / simple / **denoise 0.3**；模型走 Skin→DunHuang 链  
7. **SaveImageAdvanced**：PNG 8-bit sRGB，前缀 `ComfyUI`  
8. **ImageCompare**：初稿 vs 精修对照  

## 采样参数速查

| | Pass1（出图） | Pass2（精修） |
|--|---------------|---------------|
| steps | 8 | 6 |
| cfg | 1 | 1 |
| sampler | euler | euler |
| scheduler | simple | simple |
| denoise | 1.0 | 0.3 |

## 提示词变体

### A. 敦煌飞天·斜光定妆（当前工作流默认）

```text
Dunhuang mural inspired Tang fantasy beauty, flying apsara vibe, elegant East Asian face, long flowing black hair with ornate golden hair ornaments, silk ribbons and cascading sleeves,

rich ochre, turquoise, mineral green and vermilion palette, gold leaf accents, ancient fresco texture mixed with cinematic CG Unreal Engine 5 / Octane render, stylized 3D not photoreal,

Rembrandt key light from front-left about 45 degrees, soft volumetric god rays through temple dust, warm candle fill, high-contrast chiaroscuro, sacred calm atmosphere, no harsh backlight,

portrait, upper body, looking at camera, ornate Dunhuang cave background softly blurred, highly detailed face, sharp focus
```

**LoRA 建议：** DunHuang 精修链约 0.4；Rim 建议关。

### B. 反弹琵琶·动势飘带

```text
Dunhuang flying apsara inspired Tang fantasy beauty, classic reverse-pipa pose, playing pipa behind the back, dynamic but elegant body twist, long cascading silk ribbons and wide sleeves flowing in the air, ornate golden hair ornaments, turquoise and vermilion layered silk, gold leaf jewelry accents,

rich Dunhuang mural color palette with mineral pigments, fresco texture mixed with cinematic CG Unreal Engine 5 / Octane render, stylized 3D character not photoreal skin, clean PBR fabrics with soft specular highlights on gold and silk,

Rembrandt key light from front-left about 45 degrees, soft volumetric god rays, warm temple dust in the light beams, cool blue fill in shadows, high-contrast chiaroscuro, no strong rim light, no backlight halo behind the head,

three-quarter upper body, implied cloth motion without motion blur, sacred graceful expression, highly detailed face, sharp focus, masterpiece composition
```

**LoRA 建议：** 3/5 场景 DunHuang `0.45～0.55`；4 用 `0.25～0.35`。Rim 都建议关。

### C. 黑金赛博·霓虹斜光

```text
East Asian young woman, contemporary cyber-Tang beauty, modern fashion not ancient costume, sleek black bob or high sleek ponytail with subtle metallic hair clips, no hanfu, no Tang bun,

modern makeup: flawless base, sharp winged eyeliner, soft smoky outer corner, clean brows, gradient soft-red lips, subtle highlighter on cheekbones, tiny gold glitter accents near eyes,

black-and-gold modern outfit: tailored black blazer or techwear jacket with gold hardware, silk camisole, minimalist gold jewelry, neon city bokeh background,

cinematic CG Unreal Engine 5 / Octane render, stylized 3D character not photoreal skin, sharp metal and fabric specular highlights,

Rembrandt key light from front-left about 45°, magenta-cyan neon fill kept secondary, soft volumetric haze, high-contrast chiaroscuro, no strong rim light, no backlight halo behind head,

portrait upper body, looking at camera, cool confident expression, highly detailed face, sharp focus
```

**LoRA 建议：** DunHuang **关**，Rim **关**，Velatrix `0.55～0.65`。

## 关键词骨架（站点卡片用）

敦煌、飞天、壁画矿物色、金箔、斜光体积光、定妆半身、UE5/Octane 风格化三维

## 使用注意

- 负面走 **ZeroOut**，不要当普通 negative prompt 图理解  
- 图中 `rim_lighting_slider` 节点当前为 **mode=4（旁路）**；需要轮廓光再手动打开并降权试  
- 换变体 B/C 时：改 CLIP 文本，并按上表开关 DunHuang / Rim / Velatrix  
- 依赖自定义节点：`SaveImageAdvanced`、`ImageCompare`（以及现有 LoRA/UNET 加载器）

## 待补清单

- [ ] 上传封面 → 写入 `cover`  
- [ ] 上传效果图 / 对比图 → 写入 `gallery`  
- [ ] 上传工作流 JSON → 写入 `workflow_file`  
- [ ] 确认线上模型下载名是否与本地文件名一致  
