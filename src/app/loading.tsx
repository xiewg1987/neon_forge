export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-10 md:px-10">
      <div className="h-10 w-40 animate-pulse rounded-lg bg-nf-card" />
      <div className="mt-3 h-4 w-72 animate-pulse rounded bg-nf-card" />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-64 animate-pulse rounded-card border border-nf-border bg-nf-card"
          />
        ))}
      </div>
    </div>
  );
}
