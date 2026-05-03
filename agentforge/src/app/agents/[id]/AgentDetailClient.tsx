"use client";

import { Star, Users, ExternalLink, Shield, Zap, Clock } from "lucide-react";
import type { Agent } from "@/data/agents";
import { formatUsers } from "@/data/agents";

interface Props {
  agent: Agent;
  priceColor: string;
}

export default function AgentDetailClient({ agent, priceColor }: Props) {
  return (
    <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6 mb-6 sticky top-24">
      {/* Price */}
      <div className="flex items-center justify-between mb-4">
        <span className={`text-sm font-medium px-3 py-1 rounded-full border ${priceColor}`}>
          {agent.price}
        </span>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
          <span className="font-semibold text-white">{agent.rating}</span>
          <span className="sr-only">out of 5 stars</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-lg bg-white/5 p-3 text-center">
          <Users className="w-4 h-4 text-[var(--text-secondary)] mx-auto mb-1" aria-hidden="true" />
          <p className="text-sm font-medium text-white">{formatUsers(agent.users)}</p>
          <p className="text-xs text-[var(--text-secondary)]">Users</p>
        </div>
        <div className="rounded-lg bg-white/5 p-3 text-center">
          <Clock className="w-4 h-4 text-[var(--text-secondary)] mx-auto mb-1" aria-hidden="true" />
          <p className="text-sm font-medium text-white">24/7</p>
          <p className="text-xs text-[var(--text-secondary)]">Uptime</p>
        </div>
      </div>

      {/* CTA */}
      <a
        href={agent.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full btn-shimmer py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mb-3"
      >
        <Zap className="w-4 h-4" aria-hidden="true" />
        Try {agent.name}
      </a>
      <a
        href={agent.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3 border border-[var(--border)] text-[var(--text-secondary)] font-medium rounded-lg hover:bg-white/5 hover:text-white transition-colors flex items-center justify-center gap-2"
      >
        <ExternalLink className="w-4 h-4" aria-hidden="true" />
        Visit Website
      </a>

      {/* Trust */}
      <div className="mt-6 pt-6 border-t border-[var(--border)]">
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-2">
          <Shield className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          <span>Verified by AgentForge</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <Zap className="w-4 h-4 text-amber-400" aria-hidden="true" />
          <span>One-click deployment</span>
        </div>
      </div>
    </div>
  );
}
