"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg-dark)]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">AgentForge</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/agents" className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm font-medium">
              Browse Agents
            </Link>
            <Link href="/categories" className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm font-medium">
              Categories
            </Link>
            {isHome ? (
              <a href="#featured" className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm font-medium">
                Featured
              </a>
            ) : (
              <Link href="/#featured" className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm font-medium">
                Featured
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/mamoor123/agentforge/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-lg hover:opacity-90 transition-opacity"
            >
              Submit Agent
            </a>
          </div>

          {/* Mobile menu */}
          <button
            type="button"
            className="md:hidden text-[var(--text-secondary)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border)]">
            <div className="flex flex-col gap-3">
              <Link href="/agents" className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm py-2" onClick={() => setMobileOpen(false)}>
                Browse Agents
              </Link>
              <Link href="/categories" className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm py-2" onClick={() => setMobileOpen(false)}>
                Categories
              </Link>
              <a
                href="https://github.com/mamoor123/agentforge/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer mt-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-lg text-center"
              >
                Submit Agent
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
