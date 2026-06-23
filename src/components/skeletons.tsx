export function CollegeGridSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-panel">
          <div className="h-56 animate-pulse bg-slate-800/80" />
          <div className="space-y-4 p-5 sm:p-6">
            <div className="h-5 w-3/5 animate-pulse rounded-full bg-slate-800/80" />
            <div className="h-4 w-2/5 animate-pulse rounded-full bg-slate-800/80" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 animate-pulse rounded-2xl bg-slate-800/80" />
              <div className="h-16 animate-pulse rounded-2xl bg-slate-800/80" />
            </div>
            <div className="flex gap-2">
              <div className="h-10 w-28 animate-pulse rounded-full bg-slate-800/80" />
              <div className="h-10 w-28 animate-pulse rounded-full bg-slate-800/80" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="h-[28rem] animate-pulse rounded-[2rem] bg-slate-800/70" />
        <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-panel">
          <div className="h-6 w-2/3 animate-pulse rounded-full bg-slate-800/80" />
          <div className="h-4 w-1/2 animate-pulse rounded-full bg-slate-800/80" />
          <div className="space-y-3 pt-4">
            <div className="h-20 animate-pulse rounded-2xl bg-slate-800/80" />
            <div className="h-20 animate-pulse rounded-2xl bg-slate-800/80" />
            <div className="h-20 animate-pulse rounded-2xl bg-slate-800/80" />
          </div>
        </div>
      </div>
    </div>
  );
}