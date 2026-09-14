"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const NAV = [
  { href: "/", label: "发现" },
  { href: "/workflows", label: "工作流" },
  { href: "/prompts", label: "提示词" },
  { href: "/models", label: "模型" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    for (const item of NAV) {
      router.prefetch(item.href);
    }
  }, [router]);

  return (
    <header className="relative z-50 border-b border-nf-border bg-nf-bg">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-6 py-4 md:gap-6 md:px-10">
        <div className="flex min-w-0 flex-1 items-center gap-4 md:gap-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo.svg"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-base font-bold tracking-wide text-nf-text">
              霓虹工坊
            </span>
          </Link>

          <nav className="relative z-10 hidden shrink-0 items-center gap-1 sm:flex">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch
                  className={
                    active
                      ? "rounded-lg bg-[#2A1A28] px-3 py-2 text-sm font-bold text-nf-accent"
                      : "rounded-lg px-3 py-2 text-sm font-medium text-[#CBD5E1] hover:text-nf-text"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <label className="hidden lg:block">
            <span className="sr-only">搜索</span>
            <input
              type="search"
              placeholder="搜索工作流、提示词、作者…"
              className="pointer-events-none h-9 w-56 rounded-lg border border-nf-border bg-nf-card px-3.5 text-sm text-nf-text placeholder:text-nf-muted outline-none xl:w-72"
              readOnly
              tabIndex={-1}
              aria-disabled="true"
            />
          </label>
          <button
            type="button"
            disabled
            title="即将推出"
            className="h-9 cursor-not-allowed rounded-[10px] bg-nf-accent px-3 text-sm font-bold text-nf-bg opacity-90 md:px-4"
          >
            上传
          </button>
          <button
            type="button"
            disabled
            title="即将推出"
            className="h-9 cursor-not-allowed rounded-[10px] border border-nf-border bg-transparent px-3 text-sm font-medium text-nf-text md:px-3.5"
          >
            登录
          </button>
        </div>
      </div>

      <nav className="relative z-10 flex gap-1 overflow-x-auto px-6 pb-3 sm:hidden md:px-10">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              className={
                active
                  ? "shrink-0 rounded-lg bg-[#2A1A28] px-3 py-1.5 text-sm font-bold text-nf-accent"
                  : "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-nf-muted"
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
