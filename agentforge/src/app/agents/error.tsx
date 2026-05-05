"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen animated-gradient grid-pattern">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 text-center">
        <p className="text-6xl mb-4">😵</p>
        <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
        <p className="text-[var(--text-secondary)] mb-8">
          We couldn&apos;t load the agents. Please try again.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 border border-[var(--border)] text-[var(--text-secondary)] font-medium rounded-lg hover:text-white hover:border-[var(--primary)] transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
