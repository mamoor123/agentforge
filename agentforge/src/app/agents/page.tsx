import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgentsList from "./AgentsList";
import { agents, categories } from "@/data/agents";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Browse AI Agents — AgentForge",
  description: `Discover and compare ${agents.length}+ AI agents across ${categories.length} categories. Find the perfect AI tool for marketing, coding, creative, data, and more.`,
  openGraph: {
    title: "Browse AI Agents — AgentForge",
    description: `Discover and compare ${agents.length}+ AI agents across ${categories.length} categories.`,
    images: ["/api/og?title=Browse+AI+Agents&subtitle=Discover+" + agents.length + "++agents+across+" + categories.length + "+categories"],
  },
};

export default async function AgentsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const category = typeof params.category === "string" ? params.category : "all";
  const price = typeof params.price === "string" ? params.price : "all";
  const sort = typeof params.sort === "string" ? params.sort : "popular";
  const page = typeof params.page === "string" ? parseInt(params.page) || 1 : 1;

  return (
    <div className="min-h-screen animated-gradient grid-pattern">
      <Navbar />
      <AgentsList
        initialQuery={q}
        initialCategory={category}
        initialPrice={price}
        initialSort={sort}
        initialPage={page}
      />
      <Footer />
    </div>
  );
}
