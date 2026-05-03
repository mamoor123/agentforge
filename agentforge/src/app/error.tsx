"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen animated-gradient grid-pattern flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-6xl mb-4">⚠️</p>
        <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
        <p className="text-[var(--text-secondary)] mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
