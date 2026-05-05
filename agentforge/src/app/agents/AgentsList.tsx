"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Fuse from "fuse.js";
import AgentCard from "@/components/AgentCard";
import { agents, categories } from "@/data/agents";

const PAGE_SIZE = 24;

// Fuse.js instance — configured for agent search with typo tolerance
const fuse = new Fuse(agents, {
  keys: [
    { name: "name", weight: 0.4 },
    { name: "tagline", weight: 0.25 },
    { name: "tags", weight: 0.2 },
    { name: "description", weight: 0.1 },
    { name: "creator", weight: 0.05 },
  ],
  threshold: 0.35,       // lower = stricter, 0.35 catches ~2 char typos
  distance: 200,          // how far a match can be from the start
  includeScore: true,
  minMatchCharLength: 2,
});

interface Props {
  initialQuery: string;
  initialCategory: string;
  initialPrice: string;
  initialSort: string;
  initialPage: number;
}

export default function AgentsList({
  initialQuery,
  initialCategory,
  initialPrice,
  initialSort,
  initialPage,
}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPrice, setSelectedPrice] = useState(initialPrice);
  const [sortBy, setSortBy] = useState(initialSort);
  const [page, setPage] = useState(initialPage);

  // Sync URL when filters change (so search engines can index filtered views)
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedPrice !== "all") params.set("price", selectedPrice);
    if (sortBy !== "popular") params.set("sort", sortBy);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    router.replace(`/agents${qs ? "?" + qs : ""}`, { scroll: false });
  }, [search, selectedCategory, selectedPrice, sortBy, page, router]);

  const filtered = useMemo(() => {
    // Start with fuzzy search if there's a query, otherwise all agents
    let result = search
      ? fuse.search(search).map((r) => r.item)
      : [...agents];

    if (selectedCategory !== "all") {
      result = result.filter((a) => a.categorySlug === selectedCategory);
    }

    if (selectedPrice !== "all") {
      result = result.filter((a) => a.price === selectedPrice);
    }

    if (sortBy === "popular") {
      result.sort((a, b) => b.users - a.users);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
    }

    return result;
  }, [search, selectedCategory, selectedPrice, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, selectedPrice, sortBy, search]);

  return (
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
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
          <input
            type="text"
            aria-label="Search agents"
            placeholder="Search agents..."
            className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-[var(--text-secondary)] outline-none focus:border-[var(--primary)] transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          aria-label="Filter by category"
          className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>

        <select
          aria-label="Filter by price"
          className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="Free">Free</option>
          <option value="Freemium">Freemium</option>
          <option value="Premium">Premium</option>
          <option value="Pay-as-you-go">Pay-as-you-go</option>
          <option value="Custom">Custom</option>
        </select>

        <select
          aria-label="Sort agents"
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
          <p className="text-[var(--text-secondary)]">
            Try a different search or filter
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            agent{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="flex items-center justify-center gap-2 mt-10"
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    p === page
                      ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white"
                      : "border border-[var(--border)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--primary)]"
                  }`}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
