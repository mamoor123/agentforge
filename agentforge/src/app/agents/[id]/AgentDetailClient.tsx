"use client";

import { Star, Users, ExternalLink, Shield, Zap, Clock, Crown, Flame, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Agent } from "@/data/agents";
import { formatUsers, getListingTier, getAffiliateUrl } from "@/data/agents";

interface Props {
  agent: Agent;
  priceColor: string;
}

export default function AgentDetailClient({ agent, priceColor }: Props) {
  const tier = getListingTier(agent);
  const affiliateUrl = getAffiliateUrl(agent);
  const isSpotlight = tier === "spotlight";
  const isFeatured = tier === "featured";

  return (
    <div className={`glow-border rounded-xl bg-[var(--bg-card)] p-6 mb-6 sticky top-24 ${
      isSpotlight ? "ring-1 ring-rose-400/30 shadow-[0_0_40px_rgba(251,113,133,0.12)]" : ""
    } ${isFeatured ? "ring-1 ring-amber-400/20" : ""}`}>
      {/* Tier Badge */}
      {isSpotlight && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-rose-400/10 border border-rose-400/20">
          <Flame className="w-4 h-4 text-rose-400" aria-hidden="true" />
          <span className="text-sm font-semibold text-rose-400">Spotlight Agent</span>
        </div>
      )}
      {isFeatured && !isSpotlight && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-amber-400/10 border border-amber-400/20">
          <Crown className="w-4 h-4 text-amber-400" aria-hidden="true" />
          <span className="text-sm font-semibold text-amber-400">Featured Agent</span>
        </div>
      )}

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

      {/* CTA — Affiliate tracked links */}
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-affiliate="true"
        data-agent-id={agent.id}
        className="w-full btn-shimmer py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mb-3"
      >
        <Zap className="w-4 h-4" aria-hidden="true" />
        Try {agent.name}
      </a>
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-affiliate="true"
        data-agent-id={agent.id}
        className="w-full py-3 border border-[var(--border)] text-[var(--text-secondary)] font-medium rounded-lg hover:bg-white/5 hover:text-white transition-colors flex items-center justify-center gap-2"
      >
        <ExternalLink className="w-4 h-4" aria-hidden="true" />
        Visit Website
      </a>

      {/* Claim Listing CTA */}
      {tier === "basic" && (
        <Link
          href={`/claim/${agent.id}`}
          className="mt-3 w-full py-2.5 border border-dashed border-amber-400/30 text-amber-400 text-sm font-medium rounded-lg hover:bg-amber-400/5 hover:border-amber-400/50 transition-all flex items-center justify-center gap-2"
        >
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          Claim & Upgrade Listing
        </Link>
      )}

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
