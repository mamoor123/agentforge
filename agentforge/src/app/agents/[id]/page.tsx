"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Users, ExternalLink, Shield, Zap, Clock, Check, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgentCard from "@/components/AgentCard";
import { getAgentById, agents } from "@/data/agents";

export default function AgentDetailPage() {
  const params = useParams();
  const agent = getAgentById(params.id as string);

  if (!agent) {
    return (
      <div className="min-h-screen animated-gradient grid-pattern">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 pt-32 text-center">
          <p className="text-6xl mb-4">🤔</p>
          <h1 className="text-2xl font-bold text-white mb-2">Agent not found</h1>
          <p className="text-[var(--text-secondary)] mb-6">This agent doesn&apos;t exist or has been removed.</p>
          <Link href="/agents" className="text-[var(--primary)] hover:underline">← Back to agents</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = agents
    .filter(a => a.categorySlug === agent.categorySlug && a.id !== agent.id)
    .slice(0, 3);

  const priceColor = agent.price === "Free"
    ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
    : agent.price === "Freemium"
    ? "text-blue-400 bg-blue-400/10 border-blue-400/20"
    : agent.price === "Pay-as-you-go"
    ? "text-purple-400 bg-purple-400/10 border-purple-400/20"
    : "text-amber-400 bg-amber-400/10 border-amber-400/20";

  return (
    <div className="min-h-screen animated-gradient grid-pattern">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
          <Link href="/agents" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Agents
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/categories/${agent.categorySlug}`} className="hover:text-white transition-colors">
            {agent.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{agent.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <div className="text-5xl">{agent.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{agent.name}</h1>
                  {agent.new && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                      NEW
                    </span>
                  )}
                </div>
                <p className="text-lg text-[var(--text-secondary)]">{agent.tagline}</p>
                <p className="text-sm text-[var(--text-secondary)] mt-1">by {agent.creator}</p>
              </div>
            </div>

            {/* Description */}
            <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6 mb-6">
              <h2 className="text-lg font-semibold text-white mb-3">About</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">{agent.description}</p>
            </div>

            {/* Features */}
            <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">Key Features</h2>
              <ul className="space-y-3">
                {agent.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[var(--primary)]" />
                    </div>
                    <span className="text-[var(--text-secondary)]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6 mb-6">
              <h2 className="text-lg font-semibold text-white mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {agent.tags.map(tag => (
                  <span key={tag} className="text-sm px-3 py-1 rounded-lg bg-white/5 text-[var(--text-secondary)] border border-[var(--border)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Deploy Card */}
            <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6 mb-6 sticky top-24">
              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm font-medium px-3 py-1 rounded-full border ${priceColor}`}>
                  {agent.price}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-semibold text-white">{agent.rating}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-lg bg-white/5 p-3 text-center">
                  <Users className="w-4 h-4 text-[var(--text-secondary)] mx-auto mb-1" />
                  <p className="text-sm font-medium text-white">{agent.users}</p>
                  <p className="text-xs text-[var(--text-secondary)]">Users</p>
                </div>
                <div className="rounded-lg bg-white/5 p-3 text-center">
                  <Clock className="w-4 h-4 text-[var(--text-secondary)] mx-auto mb-1" />
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
                <Zap className="w-4 h-4" />
                Visit {agent.name}
              </a>
              <a
                href={agent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 border border-[var(--border)] text-white font-medium rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Website
              </a>

              {/* Trust */}
              <div className="mt-6 pt-6 border-t border-[var(--border)]">
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Verified by AgentForge</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>One-click deployment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Agents */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              More in {agent.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(a => (
                <AgentCard key={a.id} agent={a} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
