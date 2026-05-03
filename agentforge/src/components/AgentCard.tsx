"use client";

import Link from "next/link";
import { Star, Users, ArrowRight } from "lucide-react";
import { Agent } from "@/data/agents";

export default function AgentCard({ agent }: { agent: Agent }) {
  const priceColor = agent.price === "Free"
    ? "text-emerald-400 bg-emerald-400/10"
    : agent.price === "Freemium"
    ? "text-blue-400 bg-blue-400/10"
    : agent.price === "Pay-as-you-go"
    ? "text-purple-400 bg-purple-400/10"
    : "text-amber-400 bg-amber-400/10";

  return (
    <Link
      href={`/agents/${agent.id}`}
      className="card-interactive glow-border rounded-xl bg-[var(--bg-card)] p-6 h-full flex flex-col group"
      aria-label={`${agent.name} — ${agent.tagline}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl" aria-hidden="true">{agent.icon}</div>
        <div className="flex items-center gap-2">
          {agent.new && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400">
              NEW
            </span>
          )}
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priceColor}`}>
            {agent.price}
          </span>
        </div>
      </div>

      {/* Name & Tagline */}
      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[var(--primary)] transition-colors">
        {agent.name}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2 flex-1">
        {agent.tagline}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {agent.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-[var(--text-secondary)]">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="text-sm font-medium text-white">{agent.rating}</span>
            <span className="sr-only">rating</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[var(--text-secondary)]" aria-hidden="true" />
            <span className="text-sm text-[var(--text-secondary)]">{agent.users}</span>
            <span className="sr-only">users</span>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all" aria-hidden="true" />
      </div>
    </Link>
  );
}
