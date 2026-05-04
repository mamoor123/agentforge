"use client";

import { useState, useMemo } from "react";
import { Search, Star, Users, ArrowRight, X, Plus } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { agents, formatUsers, getPriceTextColor } from "@/data/agents";

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const selectedAgents = useMemo(
    () => agents.filter(a => selected.includes(a.id)),
    [selected]
  );

  const searchResults = useMemo(() => {
    if (!search) return [];
    const q = search.toLowerCase();
    return agents
      .filter(a =>
        (a.name.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q))) &&
        !selected.includes(a.id)
      )
      .slice(0, 5);
  }, [search, selected]);

  const addAgent = (id: string) => {
    if (selected.length < 4) {
      setSelected([...selected, id]);
      setSearch("");
    }
  };

  const removeAgent = (id: string) => {
    setSelected(selected.filter(s => s !== id));
  };

  return (
    <div className="min-h-screen animated-gradient grid-pattern">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Compare Agents
          </h1>
          <p className="text-[var(--text-secondary)]">
            Select up to 4 agents to compare side by side
          </p>
        </div>

        {/* Search to add */}
        {selected.length < 4 && (
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search agents to add..."
              className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-[var(--text-secondary)] outline-none focus:border-[var(--primary)]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg overflow-hidden shadow-xl">
                {searchResults.map(agent => (
                  <button
                    key={agent.id}
                    onClick={() => addAgent(agent.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                  >
                    <span className="text-2xl">{agent.icon}</span>
                    <div className="flex-1">
                      <p className="text-white font-medium">{agent.name}</p>
                      <p className="text-sm text-[var(--text-secondary)]">{agent.tagline}</p>
                    </div>
                    <Plus className="w-4 h-4 text-[var(--text-secondary)]" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Selected agents chips */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {selectedAgents.map(agent => (
              <div
                key={agent.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border)]"
              >
                <span>{agent.icon}</span>
                <span className="text-white text-sm">{agent.name}</span>
                <button onClick={() => removeAgent(agent.id)} className="text-[var(--text-secondary)] hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Comparison table */}
        {selectedAgents.length >= 2 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-4 px-4 text-[var(--text-secondary)] text-sm font-medium w-40">Feature</th>
                  {selectedAgents.map(agent => (
                    <th key={agent.id} className="text-center py-4 px-4">
                      <div className="text-3xl mb-2">{agent.icon}</div>
                      <Link href={`/agents/${agent.id}`} className="text-white font-semibold hover:text-[var(--primary)] transition-colors">
                        {agent.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Rating", render: (a: typeof agents[0]) => (
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-white font-medium">{a.rating}</span>
                    </div>
                  )},
                  { label: "Users", render: (a: typeof agents[0]) => (
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-4 h-4 text-[var(--text-secondary)]" />
                      <span className="text-white">{formatUsers(a.users)}</span>
                    </div>
                  )},
                  { label: "Price", render: (a: typeof agents[0]) => {
                    const color = getPriceTextColor(a.price);
                    return <span className={`font-medium ${color}`}>{a.price}</span>;
                  }},
                  { label: "Category", render: (a: typeof agents[0]) => <span className="text-[var(--text-secondary)]">{a.category}</span> },
                  { label: "Creator", render: (a: typeof agents[0]) => <span className="text-[var(--text-secondary)]">{a.creator}</span> },
                  { label: "Features", render: (a: typeof agents[0]) => (
                    <ul className="text-left space-y-1">
                      {a.features.slice(0, 5).map((f, i) => (
                        <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-1.5">
                          <span className="text-[var(--primary)] mt-0.5">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  )},
                  { label: "Tags", render: (a: typeof agents[0]) => (
                    <div className="flex flex-wrap gap-1 justify-center">
                      {a.tags.map(t => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-[var(--text-secondary)]">{t}</span>
                      ))}
                    </div>
                  )},
                ].map(({ label, render }) => (
                  <tr key={label} className="border-b border-[var(--border)]">
                    <td className="py-4 px-4 text-[var(--text-secondary)] text-sm font-medium">{label}</td>
                    {selectedAgents.map(agent => (
                      <td key={agent.id} className="py-4 px-4 text-center">{render(agent)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">⚖️</p>
            <p className="text-xl text-white mb-2">Select at least 2 agents to compare</p>
            <p className="text-[var(--text-secondary)]">Use the search above to add agents</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
