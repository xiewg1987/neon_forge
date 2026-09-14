import Image from "next/image";
import Link from "next/link";

export function DiscoverBanner() {
  return (
    <section className="rounded-[20px] border border-nf-border bg-[#12131A]">
      <div className="flex flex-col items-center gap-8 px-6 py-9 md:flex-row md:justify-between md:gap-6 md:px-10 md:py-9 lg:px-10">
        <div className="flex w-full max-w-xl flex-col gap-[18px] md:max-w-none md:flex-1">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#3F3F4A] bg-nf-card px-3 py-1.5">
            <span className="text-xs font-bold text-nf-lime">+</span>
            <span className="text-xs font-medium text-nf-lime">
              每日更新 · ComfyUI 工作流与提示词市集
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight text-nf-text md:text-[40px] md:leading-[48px]">
            从一张好图，到可下载的工作流。
          </h1>

          <p className="max-w-xl text-[15px] leading-6 text-nf-muted">
            霓虹工坊把生成图、Prompt 与节点图捆在一起。刷灵感、一键下载，或把你的工作流挂上霓虹市集。
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
            <Link
              href="/workflows"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-nf-accent to-nf-lime px-5 py-3 text-sm font-bold text-nf-bg"
            >
              浏览精选
              <span aria-hidden>↗</span>
            </Link>
            <button
              type="button"
              disabled
              title="即将推出"
              className="rounded-full border border-slate-500 bg-nf-bg/35 px-[18px] py-3 text-sm font-medium text-nf-text opacity-80"
            >
              上传工作流
            </button>
            <button
              type="button"
              disabled
              title="即将推出"
              className="rounded-full border border-nf-lime bg-transparent px-[18px] py-3 text-sm font-medium text-nf-lime opacity-80"
            >
              节点图示意
            </button>
          </div>
        </div>

        <div className="relative w-full max-w-[520px] shrink-0 md:w-[46%] lg:w-[520px]">
          <Image
            src="/home/banner-visual.png"
            alt="叠卡示意：工作流与提示词预览"
            width={1040}
            height={600}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
