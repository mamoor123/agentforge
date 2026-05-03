"use client";

import Link from "next/link";
import { Zap, Globe, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-dark)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">AgentForge</span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              The marketplace for AI agents. Discover, deploy, and build the future of automation.
            </p>
            <div className="flex gap-3">
              <a href="https://openclaw.ai" aria-label="Website" className="text-[var(--text-secondary)] hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="https://github.com" aria-label="GitHub" className="text-[var(--text-secondary)] hover:text-white transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/agents" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Browse Agents</Link></li>
              <li><Link href="/categories" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/agents" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/agents" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Submit Agent</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="https://docs.agentforge.ai" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Documentation</a></li>
              <li><a href="https://blog.agentforge.ai" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Blog</a></li>
              <li><a href="https://changelog.agentforge.ai" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Changelog</a></li>
              <li><a href="https://status.agentforge.ai" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="https://agentforge.ai/about" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">About</a></li>
              <li><a href="https://agentforge.ai/contact" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Contact</a></li>
              <li><a href="https://agentforge.ai/privacy" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Privacy</a></li>
              <li><a href="https://agentforge.ai/terms" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-secondary)]">
            © 2026 AgentForge. All rights reserved.
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Built with ⚡ for the AI agent revolution
          </p>
        </div>
      </div>
    </footer>
  );
}
