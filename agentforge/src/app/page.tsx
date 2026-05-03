"use client";

import { useState } from "react";
import { Search, ArrowRight, Sparkles, Zap, Users, Star, Globe, Rocket } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgentCard from "@/components/AgentCard";
import CategoryCard from "@/components/CategoryCard";
import { agents, categories, getFeaturedAgents } from "@/data/agents";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const featured = getFeaturedAgents();

  return (
    <div className="min-h-screen animated-gradient grid-pattern">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Orbs */}
        <div className="orb w-96 h-96 bg-indigo-500 top-0 left-1/4" aria-hidden="true" />
        <div className="orb w-72 h-72 bg-cyan-500 top-20 right-1/4" style={{ animationDelay: "-5s" }} aria-hidden="true" />
        <div className="orb w-64 h-64 bg-purple-500 bottom-0 left-1/3" style={{ animationDelay: "-10s" }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] mb-8">
            <Sparkles className="w-4 h-4 text-amber-400" aria-hidden="true" />
            <span className="text-sm text-[var(--text-secondary)]">
              <span className="text-white font-medium">2,500+</span> AI agents deployed this week
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">Discover AI Agents</span>
            <br />
            <span className="gradient-text">That Actually Work</span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
            The #1 marketplace for AI agents. Find, deploy, and automate anything — no code required. Join 120K+ users building the future.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <form
              className="relative group"
              onSubmit={(e) => {
                e.preventDefault();
                const target = searchQuery ? `/agents?q=${encodeURIComponent(searchQuery)}` : "/agents";
                window.location.href = target;
              }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-xl opacity-30 group-hover:opacity-50 blur transition" />
              <div className="relative flex items-center bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
                <Search className="w-5 h-5 text-[var(--text-secondary)] ml-4" aria-hidden="true" />
                <label htmlFor="hero-search" className="sr-only">Search AI agents</label>
                <input
                  id="hero-search"
                  type="text"
                  placeholder="Search 500+ AI agents... (e.g. 'social media', 'code review', 'invoicing')"
                  className="flex-1 bg-transparent px-4 py-4 text-white placeholder:text-[var(--text-secondary)] outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="mr-2 px-5 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-ring" aria-hidden="true" />
              <span><span className="text-white font-medium">500+</span> agents</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" aria-hidden="true" />
              <span><span className="text-white font-medium">120K+</span> users</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span><span className="text-white font-medium">4.8</span> avg rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" aria-hidden="true" />
              <span><span className="text-white font-medium">50+</span> countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Browse by Category
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Find the perfect agent for your workflow
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map(cat => (
              <CategoryCard key={cat.slug} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section id="featured" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                🔥 Featured Agents
              </h2>
              <p className="text-[var(--text-secondary)] text-lg">
                Hand-picked by our team. Proven by thousands of users.
              </p>
            </div>
            <Link
              href="/agents"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:text-white transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:text-white transition-colors"
            >
              View all agents <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              From discovery to deployment in 60 seconds
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-8 h-8" />,
                title: "Discover",
                description: "Browse 500+ AI agents across 10 categories. Filter by rating, price, and use case.",
                step: "01"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Deploy",
                description: "One-click deployment. No API keys, no code, no configuration. It just works.",
                step: "02"
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Automate",
                description: "Your agent works 24/7. Monitor performance, tweak settings, and scale effortlessly.",
                step: "03"
              }
            ].map((item, i) => (
              <div key={i} className="relative glow-border rounded-xl bg-[var(--bg-card)] p-8 text-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold text-[var(--primary)] bg-[var(--bg-dark)] px-3 py-1 rounded-full border border-[var(--border)]">
                  STEP {item.step}
                </div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 text-[var(--primary)] mb-6">
                  <span aria-hidden="true">{item.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-[var(--text-secondary)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Loved by Teams Worldwide
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "AgentForge saved our marketing team 30+ hours per week. The ContentKing agent alone replaced 3 tools we were paying for.",
                name: "Sarah Chen",
                role: "Head of Marketing, TechCorp",
                avatar: "👩‍💼"
              },
              {
                quote: "I was skeptical about AI agents, but CodeSurgeon caught bugs our senior devs missed. Now it's part of every PR review.",
                name: "Marcus Rivera",
                role: "CTO, StartupXYZ",
                avatar: "👨‍💻"
              },
              {
                quote: "We deployed 5 agents across our company in one afternoon. No coding, no IT tickets. Just results.",
                name: "Aisha Patel",
                role: "COO, GrowthLab",
                avatar: "👩‍🔬"
              }
            ].map((t, i) => (
              <div key={i} className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[var(--text-secondary)] mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glow-border rounded-2xl bg-[var(--bg-card)] p-12 relative overflow-hidden">
            <div className="orb w-48 h-48 bg-indigo-500 -top-20 -right-20 opacity-20" aria-hidden="true" />
            <div className="orb w-32 h-32 bg-cyan-500 -bottom-10 -left-10 opacity-20" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Automate?
              </h2>
              <p className="text-[var(--text-secondary)] text-lg mb-8">
                Join 120,000+ users who are saving time with AI agents. Free to start.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/agents"
                  className="btn-shimmer px-8 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  Browse Agents
                </Link>
                <a
                  href="/agents"
                  className="px-8 py-3 border border-[var(--border)] text-white font-medium rounded-lg hover:bg-white/5 transition-colors"
                >
                  Submit Your Agent
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
