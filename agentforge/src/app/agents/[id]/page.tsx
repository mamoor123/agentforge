import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgentCard from "@/components/AgentCard";
import { getAgentById, agents, formatUsers, getPriceColorBorder } from "@/data/agents";
import AgentDetailClient from "./AgentDetailClient";
import AffiliateTracker from "@/components/AffiliateTracker";

export function generateStaticParams() {
  return agents.map((agent) => ({ id: agent.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  const agent = getAgentById(id);
  if (!agent) return { title: "Agent Not Found — AgentForge" };
  return {
    title: `${agent.name} — AI Agent | AgentForge`,
    description: agent.tagline,
    openGraph: {
      title: `${agent.name} — AI Agent`,
      description: agent.description,
      type: "website",
    },
  };
}

export async function generateJsonLd({ params }: { params: { id: string } }) {
  const { id } = await params;
  const agent = getAgentById(id);
  if (!agent) return null;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": agent.name,
    "description": agent.description,
    "url": agent.url,
    "applicationCategory": agent.category,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": agent.rating,
      "bestRating": 5,
      "ratingCount": Math.max(agent.users, 1),
    },
    "offers": {
      "@type": "Offer",
      "price": agent.price === "Free" ? "0" : undefined,
      "priceCurrency": "USD",
    },
  };
}

export default async function AgentDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const agent = getAgentById(id);
  const jsonLd = agent ? await generateJsonLd({ params: { id } }) : null;

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

  const priceColor = getPriceColorBorder(agent.price);

  return (
    <div className="min-h-screen animated-gradient grid-pattern">
      <Navbar />
      <AffiliateTracker agentId={agent.id} />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
          <Link href="/agents" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Agents
          </Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <Link href={`/categories/${agent.categorySlug}`} className="hover:text-white transition-colors">
            {agent.category}
          </Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <span className="text-white" aria-current="page">{agent.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <div className="text-5xl" aria-hidden="true">{agent.icon}</div>
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
                      <span className="w-3 h-3 text-[var(--primary)] flex items-center justify-center text-xs">✓</span>
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
            <AgentDetailClient agent={agent} priceColor={priceColor} />
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
