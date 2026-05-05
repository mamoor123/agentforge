"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AgentCard from "@/components/AgentCard";
import type { Agent } from "@/data/agents";

const PAGE_SIZE = 24;

interface Props {
  agents: Agent[];
}

export default function CategoryAgentList({ agents }: Props) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(agents.length / PAGE_SIZE);
  const paginated = agents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (agents.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-4">🏗️</p>
        <p className="text-xl text-white mb-2">Coming soon</p>
        <p className="text-[var(--text-secondary)]">Agents in this category are being reviewed</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-[var(--text-secondary)] mb-6">
        Showing {(page - 1) * PAGE_SIZE + 1}–
        {Math.min(page * PAGE_SIZE, agents.length)} of {agents.length}
        agent{agents.length !== 1 ? "s" : ""}
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
  );
}
