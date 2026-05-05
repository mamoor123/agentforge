import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <div className="min-h-screen animated-gradient grid-pattern">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-10 w-64 bg-white/5 rounded-lg animate-pulse mb-3" />
          <div className="h-5 w-96 bg-white/5 rounded-lg animate-pulse" />
        </div>

        {/* Filter skeleton */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 h-11 bg-white/5 rounded-lg animate-pulse" />
          <div className="w-48 h-11 bg-white/5 rounded-lg animate-pulse" />
          <div className="w-40 h-11 bg-white/5 rounded-lg animate-pulse" />
          <div className="w-44 h-11 bg-white/5 rounded-lg animate-pulse" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 rounded-lg animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
              <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-white/5 rounded-full animate-pulse" />
                <div className="h-6 w-20 bg-white/5 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
