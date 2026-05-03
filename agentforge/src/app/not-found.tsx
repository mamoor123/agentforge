import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen animated-gradient grid-pattern">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-32 text-center">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="text-3xl font-bold text-white mb-2">Page not found</h1>
        <p className="text-[var(--text-secondary)] mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity inline-block"
        >
          Back to home
        </Link>
      </div>
      <Footer />
    </div>
  );
}
