export default function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl bg-[var(--bg-card)] p-6 animate-pulse border border-[var(--border)]">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-white/10" />
            <div className="w-16 h-5 rounded-full bg-white/10" />
          </div>
          <div className="w-32 h-5 rounded bg-white/10 mb-2" />
          <div className="w-full h-4 rounded bg-white/10 mb-1" />
          <div className="w-3/4 h-4 rounded bg-white/10 mb-4" />
          <div className="flex gap-2 mb-4">
            <div className="w-16 h-5 rounded-md bg-white/10" />
            <div className="w-20 h-5 rounded-md bg-white/10" />
          </div>
          <div className="border-t border-[var(--border)] pt-4 flex justify-between">
            <div className="flex gap-3">
              <div className="w-12 h-4 rounded bg-white/10" />
              <div className="w-16 h-4 rounded bg-white/10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
