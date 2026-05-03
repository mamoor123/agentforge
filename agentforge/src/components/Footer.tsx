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
              <a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer" aria-label="Website" className="text-[var(--text-secondary)] hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="https://github.com/mamoor123/agentforge" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[var(--text-secondary)] hover:text-white transition-colors">
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
              <li><Link href="/agents?sort=newest" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">New Agents</Link></li>
              <li><a href="https://github.com/mamoor123/agentforge/issues/new" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Submit Agent</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="https://github.com/mamoor123/agentforge" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://github.com/mamoor123/agentforge/issues" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Report Issue</a></li>
              <li><a href="https://github.com/mamoor123/agentforge/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Documentation</a></li>
              <li><a href="https://github.com/mamoor123/agentforge/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">License (MIT)</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="https://github.com/mamoor123/agentforge#readme" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">About</a></li>
              <li><a href="https://github.com/mamoor123/agentforge/issues/new" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Contact</a></li>
              <li><a href="https://github.com/mamoor123/agentforge/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Privacy</a></li>
              <li><a href="https://github.com/mamoor123/agentforge/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Terms</a></li>
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
