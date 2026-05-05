import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryAgentList from "./CategoryAgentList";
import { categories, getAgentsByCategorySorted } from "@/data/agents";

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find(c => c.slug === slug);
  if (!category) return { title: "Category Not Found — AgentForge" };
  return {
    title: `${category.name} AI Agents — AgentForge`,
    description: `${category.description}. Browse ${category.count}+ AI agents in the ${category.name} category.`,
    openGraph: {
      title: `${category.name} AI Agents`,
      description: category.description,
      images: [`/api/og?title=${encodeURIComponent(category.name + " Agents")}&subtitle=${encodeURIComponent(category.count + "+ AI agents")}`],
    },
  };
}

export default async function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const category = categories.find(c => c.slug === slug);
  const agentsList = getAgentsByCategorySorted(slug);

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
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
          <Link href="/categories" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Categories
          </Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <span className="text-white" aria-current="page">{category.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <span className="text-5xl mb-4 block" aria-hidden="true">{category.icon}</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {category.name} Agents
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            {category.description} • {agentsList.length} agents available
          </p>
        </div>

        {/* Paginated agent list (client component) */}
        <CategoryAgentList agents={agentsList} />
      </div>

      <Footer />
    </div>
  );
}
