import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownView } from "@/components/content/MarkdownView";
import { coverTintForSlug } from "@/lib/content/cover";
import {
  getAllWorkflows,
  getWorkflowBySlug,
  listWorkflowSlugs,
} from "@/lib/content";
import type { SamplerPass, WorkflowLora } from "@/lib/content/types";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return listWorkflowSlugs().map((slug) => ({ id: slug }));
}

function formatSampler(pass: SamplerPass | null): string {
  if (!pass) return "—";
  const bits = [
    pass.steps != null ? `steps ${pass.steps}` : null,
    pass.cfg != null ? `cfg ${pass.cfg}` : null,
    pass.sampler,
    pass.scheduler,
    pass.denoise != null ? `denoise ${pass.denoise}` : null,
    pass.size,
  ].filter(Boolean);
  return bits.join(" · ") || "—";
}

function LoraRows({ loras }: { loras: WorkflowLora[] }) {
  if (loras.length === 0) {
    return <p className="text-[13px] text-nf-muted">暂无 LoRA 记录</p>;
  }
  return (
    <ul className="space-y-2">
      {loras.map((lora) => (
        <li
          key={`${lora.name}-${lora.role ?? ""}`}
          className="rounded-lg bg-nf-bg px-3 py-2.5"
        >
          <p className="font-mono text-[13px] text-nf-text">{lora.name}</p>
          <p className="mt-1 text-[12px] text-nf-muted">
            权重 {lora.weight}
            {lora.role ? ` · ${lora.role}` : ""}
          </p>
          {lora.note ? (
            <p className="mt-1 text-[12px] text-nf-muted/80">{lora.note}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export default async function WorkflowDetailPage({ params }: PageProps) {
  const { id } = await params;
  const doc = getWorkflowBySlug(id);
  if (!doc) notFound();

  const { frontmatter, body, excerpt, slug } = doc;
  const tint = coverTintForSlug(slug);
  const styleTags = [frontmatter.style, ...frontmatter.styles_alt].filter(
    Boolean,
  );
  const recommendations = getAllWorkflows()
    .filter(
      (item) =>
        item.slug !== slug &&
        (item.frontmatter.style === frontmatter.style ||
          item.frontmatter.styles_alt.includes(frontmatter.style) ||
          frontmatter.styles_alt.includes(item.frontmatter.style)),
    )
    .slice(0, 3);

  const canDownload = Boolean(frontmatter.workflow_file);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-6 md:px-10">
      <div className="grid gap-6 lg:grid-cols-12">
        <section className="space-y-4 lg:col-span-7">
          <div
            className="relative h-[280px] overflow-hidden rounded-card border border-nf-border md:h-[420px]"
            style={{ backgroundColor: tint }}
          >
            {frontmatter.cover ? (
              <Image
                src={frontmatter.cover}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            ) : (
              <div className="flex h-full items-end p-6">
                <p className="text-sm text-nf-muted">封面待上传 · cover 为空</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {frontmatter.status ? (
              <span className="rounded-full border border-nf-border bg-nf-card px-3 py-1 text-[12px] text-nf-muted">
                {frontmatter.status}
              </span>
            ) : null}
            {styleTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex rounded-full border border-nf-accent bg-nf-card px-3 py-1.5 text-[13px] font-medium text-nf-text"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-nf-text">
            {frontmatter.title}
          </h1>
          {frontmatter.node_title ? (
            <p className="text-sm text-nf-muted">节点图 · {frontmatter.node_title}</p>
          ) : null}
          {excerpt ? (
            <p className="text-sm leading-6 text-nf-muted">{excerpt}</p>
          ) : null}

          {frontmatter.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-nf-border bg-nf-bg px-2 py-0.5 text-[11px] text-nf-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <MarkdownView source={body} />
        </section>

        <aside className="space-y-4 lg:col-span-5">
          <div className="space-y-3 rounded-card border border-nf-border bg-nf-card p-4">
            <h2 className="text-base font-bold text-nf-text">获取</h2>
            {canDownload ? (
              <a
                href={frontmatter.workflow_file}
                className="block w-full rounded-[10px] bg-nf-accent px-4 py-3 text-center text-sm font-bold text-nf-bg"
                download
              >
                下载工作流
              </a>
            ) : (
              <button
                type="button"
                disabled
                title="请先在 frontmatter 填写 workflow_file"
                className="w-full cursor-not-allowed rounded-[10px] bg-nf-accent/40 px-4 py-3 text-sm font-bold text-nf-bg"
              >
                下载工作流（待上传）
              </button>
            )}
            <p className="text-[12px] text-nf-muted">
              source id · {frontmatter.workflow_source_id || "—"}
            </p>
          </div>

          <div className="space-y-3 rounded-card border border-nf-border bg-nf-card p-4">
            <h2 className="text-base font-bold text-nf-text">模型</h2>
            <dl className="space-y-2 text-[13px]">
              <div className="flex justify-between gap-3">
                <dt className="text-nf-muted">UNET</dt>
                <dd className="max-w-[70%] truncate font-mono text-nf-text">
                  {frontmatter.base_model || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-nf-muted">CLIP</dt>
                <dd className="max-w-[70%] truncate font-mono text-nf-text">
                  {frontmatter.clip || "—"}
                  {frontmatter.clip_type ? ` (${frontmatter.clip_type})` : ""}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-nf-muted">VAE</dt>
                <dd className="max-w-[70%] truncate font-mono text-nf-text">
                  {frontmatter.vae || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-nf-muted">Negative</dt>
                <dd className="font-mono text-nf-text">
                  {frontmatter.negative || "—"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="space-y-3 rounded-card border border-nf-border bg-nf-card p-4">
            <h2 className="text-base font-bold text-nf-text">LoRA</h2>
            <LoraRows loras={frontmatter.loras} />
          </div>

          <div className="space-y-3 rounded-card border border-nf-border bg-nf-card p-4">
            <h2 className="text-base font-bold text-nf-text">采样</h2>
            <p className="text-[13px] text-nf-muted">
              Pass1 · {formatSampler(frontmatter.sampler_pass_1)}
            </p>
            <p className="text-[13px] text-nf-muted">
              Pass2 · {formatSampler(frontmatter.sampler_pass_2)}
            </p>
            {frontmatter.sampler_pass_2?.note ? (
              <p className="text-[12px] text-nf-muted/80">
                {frontmatter.sampler_pass_2.note}
              </p>
            ) : null}
          </div>

          <div className="space-y-2.5 rounded-card border border-nf-border bg-nf-card p-4">
            <h2 className="text-base font-bold text-nf-text">信息</h2>
            <p className="text-[13px] text-nf-muted">
              日期 · {frontmatter.date || "—"}
            </p>
            <p className="text-[13px] text-nf-muted">slug · {slug}</p>
          </div>
        </aside>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-nf-text">同风格推荐</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {recommendations.length > 0 ? (
            recommendations.map((item) => (
              <Link
                key={item.slug}
                href={`/workflows/${item.slug}`}
                className="w-72 shrink-0 overflow-hidden rounded-xl border border-nf-border bg-nf-card"
              >
                <div
                  className="relative h-28 w-full"
                  style={{ backgroundColor: coverTintForSlug(item.slug) }}
                >
                  {item.frontmatter.cover ? (
                    <Image
                      src={item.frontmatter.cover}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="288px"
                    />
                  ) : null}
                </div>
                <p className="p-3 text-[13px] font-medium text-nf-text">
                  {item.frontmatter.title}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-sm text-nf-muted">
              暂无其它同风格工作流。继续往 content/workflows 加 MD 即可出现在这里。
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
