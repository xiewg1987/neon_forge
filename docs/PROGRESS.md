# NeonForge 进度与下一步

> 更新于 2026-09-16 · 分支 `feat/workflow`

## 一句话结论

工作流列表与详情已改读 `content/workflows/*.md`（替换 mock）。发现页仍用 mock；封面 / `workflow_file` 仍为空占位。下一刀建议：**发现页纳入 MD 工作流**，或补样例封面与下载文件。

---

## 已完成

### 产品 / 设计

- [x] 品牌与色板（`nf-*` token）
- [x] Figma 多页：发现 / 工作流 / 提示词 / 模型 / 详情（Figwright）
- [x] 顶栏统一为 GitHub 外链（Figma + 代码）；Banner「在 GitHub 查看」
- [x] 发现页切图：`public/brand/logo.svg`、`public/home/banner-visual.png`

### 前端路由与 UI

| 路由 | 状态 |
|------|------|
| `/` 发现 | 可用：Banner、筛选、卡片网格（**仍 mock**） |
| `/workflows` | **已接 MD**：`listWorkflows()` |
| `/prompts` | 可用：列表（mock） |
| `/models` | 可用：列表（mock） |
| `/workflows/[id]` | **已接 MD**：`id` = frontmatter `slug`（例：`/workflows/dunhuang-apsara-rembrandt`） |

- [x] 全站 `SiteHeader`（Logo、导航、搜索占位、`react-icons` GitHub）
- [x] 发现 Banner / Filters / DiscoverCard
- [x] Workflow / Prompt / Model 卡片组件
- [x] 无登录、无上传、无数据库（有意为之）

### 内容管线

- [x] `src/lib/content/`：读 MD，解析 frontmatter + 正文
- [x] API：`listWorkflows` / `getWorkflowBySlug` / `getAllWorkflows` 等
- [x] 样例：`content/workflows/dunhuang-apsara-rembrandt.md`
- [x] `/workflows` + `/workflows/[id]` 已接线；详情含 LoRA / 采样 / 模型侧栏 + 轻量 Markdown 正文
- [x] 依赖：`gray-matter`、`server-only`；冒烟脚本 `scripts/smoke-content.mjs`
- [ ] `data/*.models.json` 未接到详情「模型下载」
- [ ] `src/lib/data/workflows.ts` mock 仍被发现页使用（可并存）

### 明确不做 / 已推迟

- 登录、上传、账号体系
- 数据库
- AES / 加密下载（约定以后再加）
- 整页静态 Banner 导出

---

## 当前缺口（按优先级）

1. **发现页数据源**  
   - `/` 仍混 mock 工作流 + 提示词；应合并 `listWorkflows()`，提示词可继续 mock

2. **资源占位补齐**  
   - 样例 MD 的 `cover` / `gallery` / `workflow_file` 仍为空  
   - 填入后卡片封面与「下载工作流」即可用

3. **提示词 / 模型内容约定**  
   - 仅有 `content/workflows/`；prompts / models 解析器未建  
   - `data/*.models.json` 可挂到详情侧栏

4. **工程卫生**  
   - README 仍偏旧（上传/登录描述）  
   - 可选：`.gitignore` 加 `tmp/`  
   - mock `workflows.ts` 在发现页迁走后可删或降级

---

## 建议下一步（执行顺序）

### P1 — 发现页

1. `/` feed 工作流改为 `listWorkflows()`（Client 页可经 Server 传 props 或小 API）
2. 明确 draft：本地显示 / 生产可隐藏

### P2 — 资源与下载

3. 上传封面与 workflow JSON，写入 frontmatter  
4. 详情接 `data/{slug}.models.json` 下载链接

### P3 — 扩面 / 以后

5. `content/prompts`、`content/models` 约定与解析  
6. AES、登录、真实搜索

---

## 关键路径速查

```
content/workflows/*.md     ← 工作流内容源（列表/详情已读）
data/*.models.json         ← 模型下载元数据（旁路，未接）
src/lib/content/           ← 解析
src/lib/data/              ← 发现页 / 提示词 / 模型 mock
src/app/workflows/         ← 已接 MD
public/brand|home/         ← 切图资产
```

## 本地验证

```bash
pnpm dev
# 列表 http://localhost:3000/workflows
# 详情 http://localhost:3000/workflows/dunhuang-apsara-rembrandt
node scripts/smoke-content.mjs
```

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-09-16 | 初版：汇总骨架与 content 待接线 |
| 2026-09-16 | P0 完成：工作流列表/详情接 MD，更新缺口为发现页与资源占位 |
