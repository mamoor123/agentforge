"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  name: string;
  slug: string;
  icon: string;
  count: number;
  description: string;
}

export default function CategoryCard({ name, slug, icon, count, description }: Props) {
  return (
    <Link
      href={`/categories/${slug}`}
      className="card-interactive glow-border rounded-xl bg-[var(--bg-card)] p-6 group"
      aria-label={`${name} — ${count} agents — ${description}`}
    >
      <div className="text-3xl mb-3" aria-hidden="true">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[var(--primary)] transition-colors">
        {name}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] mb-3">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--text-secondary)]">
          {count} agents
        </span>
        <ArrowRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all" aria-hidden="true" />
      </div>
    </Link>
  );
}
