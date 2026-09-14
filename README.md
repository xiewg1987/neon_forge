# 霓虹工坊 / NeonForge

暗色霓虹风的 ComfyUI 工作流、提示词与模型发现站前端骨架。对照 Figma 信息架构，静态页面 + mock 数据，不含登录 / 上传 / 后端。

## 技术栈

- Next.js（App Router）
- TypeScript
- Tailwind CSS v4
- pnpm

## 启动

```bash
pnpm install
pnpm dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

## 路由

| 路径 | 说明 |
| --- | --- |
| `/` | 发现（综合） |
| `/workflows` | 工作流列表 |
| `/prompts` | 提示词列表 |
| `/models` | 模型库 |
| `/workflows/[id]` | 工作流详情（示例：`/workflows/cyber-neon`） |

## 设计 token

| Token | 色值 |
| --- | --- |
| bg | `#0F0F13` |
| card | `#1A1A22` |
| border | `#2A2A35` |
| accent | `#F472B6` |
| lime | `#A3E635` |
| text | `#F8FAFC` |
| muted | `#94A3B8` |

定义见 `src/app/globals.css`（`--nf-*` / Tailwind `nf-*`）。

## 说明

- 上传 / 登录按钮为禁用态（即将推出）
- 筛选与卡片均为前端静态交互
- 请保留仓库中既有的 affinity / 设计相关目录（若存在）
