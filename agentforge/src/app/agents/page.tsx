"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgentCard from "@/components/AgentCard";
import { agents, categories } from "@/data/agents";

export default function AgentsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const filtered = useMemo(() => {
    let result = [...agents];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.tagline.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory !== "all") {
      result = result.filter(a => a.categorySlug === selectedCategory);
    }

    // Price
    if (selectedPrice !== "all") {
      result = result.filter(a => a.price === selectedPrice);
    }

    // Sort
    if (sortBy === "popular") {
      result.sort((a, b) => parseFloat(b.users) - parseFloat(a.users));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
    }

    return result;
  }, [search, selectedCategory, selectedPrice, sortBy]);

  return (
    <div className="min-h-screen animated-gradient grid-pattern">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Browse Agents
          </h1>
          <p className="text-[var(--text-secondary)]">
            {agents.length} agents available • Find the perfect AI assistant
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search agents..."
              className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-[var(--text-secondary)] outline-none focus:border-[var(--primary)] transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category */}
          <select
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.slug} value={cat.slug}>{cat.icon} {cat.name}</option>
            ))}
          </select>

          {/* Price */}
          <select
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="Free">Free</option>
            <option value="Freemium">Freemium</option>
            <option value="Premium">Premium</option>
          </select>

          {/* Sort */}
          <select
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-xl text-white mb-2">No agents found</p>
            <p className="text-[var(--text-secondary)]">Try a different search or filter</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Showing {filtered.length} agent{filtered.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
