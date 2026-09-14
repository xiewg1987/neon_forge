import Link from "next/link";
import { notFound } from "next/navigation";
import { getModelById } from "@/lib/data/models";
import { getPromptById } from "@/lib/data/prompts";
import { getWorkflowById, workflows } from "@/lib/data/workflows";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return workflows.map((item) => ({ id: item.id }));
}

export default async function WorkflowDetailPage({ params }: PageProps) {
  const { id } = await params;
  const workflow = getWorkflowById(id);
  if (!workflow) notFound();

  const relatedPrompt = workflow.relatedPromptId
    ? getPromptById(workflow.relatedPromptId)
    : undefined;
  const relatedModels = workflow.relatedModelIds
    .map((modelId) => getModelById(modelId))
    .filter(Boolean);
  const recommendations = workflows
    .filter((item) => item.style === workflow.style && item.id !== workflow.id)
    .slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-6 md:px-10">
      <div className="grid gap-6 lg:grid-cols-12">
        <section className="space-y-4 lg:col-span-7">
          <div
            className="h-[280px] rounded-card border border-nf-border md:h-[420px]"
            style={{ backgroundColor: workflow.coverTint }}
          />
          <h1 className="text-3xl font-bold tracking-tight text-nf-text">
            {workflow.title}
          </h1>
          <span className="inline-flex rounded-full border border-nf-accent bg-nf-card px-3 py-1.5 text-[13px] font-medium text-nf-text">
            {workflow.style}
          </span>
          <div className="space-y-3 text-sm leading-6 whitespace-pre-line text-nf-muted">
            {workflow.intro}
          </div>
          <div className="rounded-[10px] border border-nf-border/80 bg-nf-bg/70 p-3 font-mono text-[13px] leading-5 text-nf-muted">
            {workflow.keywords.join(" · ")}
          </div>
          <div className="flex flex-wrap items-center gap-2 rounded-[10px] border border-nf-border bg-nf-card px-3.5 py-3">
            <span className="text-xs font-medium text-nf-muted">主 LoRA</span>
            <span className="font-mono text-sm font-medium text-nf-text">
              {workflow.lora} {workflow.weight}
            </span>
          </div>
        </section>

        <aside className="space-y-4 lg:col-span-5">
          <div className="space-y-3 rounded-card border border-nf-border bg-nf-card p-4">
            <h2 className="text-base font-bold text-nf-text">获取</h2>
            <button
              type="button"
              className="w-full rounded-[10px] bg-nf-accent px-4 py-3 text-sm font-bold text-nf-bg"
            >
              下载工作流
            </button>
            <button
              type="button"
              className="w-full rounded-[10px] border border-nf-border bg-nf-bg px-4 py-3 text-sm font-medium text-nf-text"
            >
              复制提示词
            </button>
          </div>

          <div className="space-y-3 rounded-card border border-nf-border bg-nf-card p-4">
            <h2 className="text-base font-bold text-nf-text">搭配</h2>
            {relatedPrompt ? (
              <Link
                href="/prompts"
                className="flex items-center justify-between rounded-lg bg-nf-bg px-3 py-2.5 text-sm text-nf-text"
              >
                <span>提示词 · {relatedPrompt.title}</span>
                <span className="text-xs font-medium text-nf-accent">查看</span>
              </Link>
            ) : null}
            {relatedModels.map((model) =>
              model ? (
                <Link
                  key={model.id}
                  href="/models"
                  className="flex items-center justify-between rounded-lg bg-nf-bg px-3 py-2.5 text-sm text-nf-text"
                >
                  <span>模型 · {model.name}</span>
                  <span className="text-xs font-medium text-nf-accent">查看</span>
                </Link>
              ) : null,
            )}
          </div>

          <div className="space-y-2.5 rounded-card border border-nf-border bg-nf-card p-4">
            <h2 className="text-base font-bold text-nf-text">信息</h2>
            <p className="text-[13px] text-nf-muted">
              更新时间 · {workflow.updatedAt}
            </p>
            <p className="text-[13px] text-nf-muted">
              下载次数 · {workflow.downloads}
            </p>
            <p className="text-[13px] text-nf-muted">作者 · {workflow.author}</p>
          </div>
        </aside>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-nf-text">同风格推荐</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {recommendations.length > 0 ? (
            recommendations.map((item) => (
              <Link
                key={item.id}
                href={`/workflows/${item.id}`}
                className="w-72 shrink-0 overflow-hidden rounded-xl border border-nf-border bg-nf-card"
              >
                <div
                  className="h-28 w-full"
                  style={{ backgroundColor: item.coverTint }}
                />
                <p className="p-3 text-[13px] font-medium text-nf-text">
                  {item.title}
                </p>
              </Link>
            ))
          ) : (
            <>
              {["霓虹雨巷", "义体肖像", "反射夜景"].map((name, index) => (
                <div
                  key={name}
                  className="w-72 shrink-0 overflow-hidden rounded-xl border border-nf-border bg-nf-card"
                >
                  <div
                    className="h-28 w-full"
                    style={{
                      backgroundColor: ["#2E1F33", "#291F2E", "#382838"][index],
                    }}
                  />
                  <p className="p-3 text-[13px] font-medium text-nf-text">
                    ZIT·{name}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
