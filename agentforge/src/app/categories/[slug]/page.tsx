"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgentCard from "@/components/AgentCard";
import { categories, getAgentsByCategory } from "@/data/agents";

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = categories.find(c => c.slug === slug);
  const agentsList = getAgentsByCategory(slug);

  if (!category) {
    return (
      <div className="min-h-screen animated-gradient grid-pattern">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 pt-32 text-center">
          <p className="text-6xl mb-4">🤔</p>
          <h1 className="text-2xl font-bold text-white mb-2">Category not found</h1>
          <Link href="/categories" className="text-[var(--primary)] hover:underline">← Back to categories</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-gradient grid-pattern">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
          <Link href="/categories" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Categories
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{category.name}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <span className="text-5xl mb-4 block">{category.icon}</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {category.name} Agents
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            {category.description} • {agentsList.length} agents available
          </p>
        </div>

        {/* Agents */}
        {agentsList.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🏗️</p>
            <p className="text-xl text-white mb-2">Coming soon</p>
            <p className="text-[var(--text-secondary)]">Agents in this category are being reviewed</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentsList.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
