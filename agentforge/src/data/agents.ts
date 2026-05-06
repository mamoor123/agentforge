import Fuse from "fuse.js";
import agentsData from "./agents.json";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ListingTier = "basic" | "featured" | "spotlight";

export interface Agent {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  categorySlug: string;
  icon: string;
  rating: number;
  users: number;
  price: string;
  featured: boolean;
  new: boolean;
  tags: string[];
  creator: string;
  url: string;
  features: string[];
  listingTier?: ListingTier;
  affiliateUrl?: string;
}

// ─── Pricing tiers ───────────────────────────────────────────────────────────

export const PRICING_TIERS: {
  tier: ListingTier;
  name: string;
  price: number;
  badge: string;
  color: string;
  features: string[];
}[] = [
  {
    tier: "basic",
    name: "Basic",
    price: 0,
    badge: "",
    color: "",
    features: [
      "Standard listing in category pages",
      "Basic agent profile",
      "Search visibility",
    ],
  },
  {
    tier: "featured",
    name: "Featured",
    price: 75,
    badge: "⭐ Featured",
    color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    features: [
      "Top placement in category pages",
      "Featured badge on card & profile",
      "Enhanced description with rich media",
      "Priority in search results",
      "Monthly analytics report",
    ],
  },
  {
    tier: "spotlight",
    name: "Spotlight",
    price: 200,
    badge: "🔥 Spotlight",
    color: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    features: [
      "Homepage spotlight placement",
      "Top of all category pages",
      "Spotlight badge with glow effect",
      "Priority search ranking",
      "Featured in weekly newsletter",
      "Dedicated social media shoutout",
      "Weekly analytics dashboard",
    ],
  },
];

// ─── Agents (loaded from JSON) ───────────────────────────────────────────────

// Cast the imported JSON to the typed array.
// The JSON file is the single source of truth — edit agents.json to add/remove/update agents.
export const agents: Agent[] = agentsData as Agent[];

// Assign listing tiers based on curated spotlight/featured IDs
const spotlightIds = ["midjourney", "chatgpt", "cursor", "jasper"];
const featuredIds = [
  "claude", "copilot", "notion-ai", "zapier-ai",
  "elevenlabs", "sora", "manus", "replit",
];

agents.forEach((a) => {
  if (spotlightIds.includes(a.id)) a.listingTier = "spotlight";
  else if (featuredIds.includes(a.id)) a.listingTier = "featured";
  else a.listingTier = a.listingTier || "basic";
});

// ─── Categories (counts auto-computed from agents) ───────────────────────────

const CATEGORIES_BASE = [
  { name: "Marketing", slug: "marketing", icon: "📢", description: "Automate content, ads, SEO & social media" },
  { name: "Coding", slug: "coding", icon: "💻", description: "Code review, debugging, deployment & more" },
  { name: "Business", slug: "business", icon: "📊", description: "CRM, invoicing, email & operations" },
  { name: "Creative", slug: "creative", icon: "🎨", description: "Design, video, music & content creation" },
  { name: "Data", slug: "data", icon: "📈", description: "Analytics, scraping, visualization & insights" },
  { name: "Productivity", slug: "productivity", icon: "⚡", description: "Task management, scheduling & automation" },
  { name: "Education", slug: "education", icon: "📚", description: "Tutoring, research, writing & learning" },
  { name: "Health", slug: "health", icon: "🏥", description: "Fitness, nutrition, wellness & tracking" },
  { name: "Sales", slug: "sales", icon: "💼", description: "Lead gen, outreach, pipeline & closing" },
  { name: "Customer Support", slug: "support", icon: "🎧", description: "Chatbots, helpdesk & ticket automation" },
  { name: "AI & ML", slug: "ai-ml", icon: "🤖", description: "LLMs, model APIs, training & AI infrastructure" },
  { name: "Finance", slug: "finance", icon: "💰", description: "Accounting, investing, crypto & financial analysis" },
  { name: "HR & Recruiting", slug: "hr", icon: "👥", description: "Hiring, onboarding, payroll & people management" },
  { name: "Legal", slug: "legal", icon: "⚖️", description: "Contracts, compliance, legal research & IP" },
  { name: "E-commerce", slug: "ecommerce", icon: "🛒", description: "Online stores, product listings, inventory & fulfillment" },
  { name: "Voice AI", slug: "voice-ai", icon: "🎙️", description: "Text-to-speech, voice cloning, speech recognition & voice agents" },
  { name: "Cybersecurity", slug: "cybersecurity", icon: "🔒", description: "Security scanning, vulnerability detection & threat protection" },
  { name: "Research & Knowledge", slug: "research", icon: "🔬", description: "AI search, academic research, document analysis & knowledge management" },
  { name: "DevOps & Infrastructure", slug: "devops", icon: "🚀", description: "Deployment, monitoring, CI/CD & cloud infrastructure" },
  { name: "Gaming", slug: "gaming", icon: "🎮", description: "AI NPCs, game asset generation & game development tools" },
  { name: "Real Estate", slug: "real-estate", icon: "🏠", description: "Property search, valuation, staging & real estate automation" },
  { name: "Logistics & Supply Chain", slug: "logistics", icon: "📦", description: "Shipping, inventory, order tracking & supply chain optimization" },
] as const;

export const categories = CATEGORIES_BASE.map((cat) => ({
  ...cat,
  count: agents.filter((a) => a.categorySlug === cat.slug).length,
}));

// ─── Derived stats (computed from actual data) ──────────────────────────────

function computeStats() {
  const totalAgents = agents.length;
  const totalUsers = agents.reduce((sum, a) => sum + a.users, 0);
  const avgRating = parseFloat(
    (agents.reduce((sum, a) => sum + a.rating, 0) / agents.length).toFixed(1)
  );
  const categoryCount = categories.length;
  return { totalAgents, totalUsers, avgRating, categoryCount } as const;
}

export const agentStats = computeStats();

/** Format total users for display: 123400 → "123K+" */
export function formatTotalUsers(n: number): string {
  if (n >= 1_000_000)
    return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + "M+";
  if (n >= 1_000) return Math.round(n / 1_000) + "K+";
  return n.toString();
}

/** Compute per-category agent counts from actual data. */
export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  agents.forEach((a) => {
    counts[a.categorySlug] = (counts[a.categorySlug] || 0) + 1;
  });
  return counts;
}

// ─── Helper functions ────────────────────────────────────────────────────────

export function getFeaturedAgents(): Agent[] {
  return agents.filter((a) => a.featured);
}

export function getNewAgents(): Agent[] {
  return agents.filter((a) => a.new);
}

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

export function formatUsers(n: number): string {
  if (n >= 1_000_000)
    return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + "M+";
  if (n >= 1_000)
    return (n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 0) + "K+";
  return n.toString();
}

// Fuse.js instance for server-side fuzzy search
const serverFuse = new Fuse(agents, {
  keys: [
    { name: "name", weight: 0.4 },
    { name: "tagline", weight: 0.25 },
    { name: "tags", weight: 0.2 },
    { name: "description", weight: 0.1 },
    { name: "creator", weight: 0.05 },
  ],
  threshold: 0.35,
  distance: 200,
  includeScore: true,
  minMatchCharLength: 2,
});

export function searchAgents(query: string): Agent[] {
  if (!query.trim()) return agents;
  return serverFuse.search(query).map((r) => r.item);
}

export function getListingTier(agent: Agent): ListingTier {
  return agent.listingTier || "basic";
}

export function getSpotlightAgents(): Agent[] {
  return agents.filter((a) => a.listingTier === "spotlight");
}

export function getFeaturedListingAgents(): Agent[] {
  return agents.filter((a) => a.listingTier === "featured");
}

export function getAffiliateUrl(agent: Agent): string {
  return agent.affiliateUrl || agent.url;
}

export function getPriceColor(price: string): string {
  if (price === "Free" || price.startsWith("Free"))
    return "text-emerald-400 bg-emerald-400/10";
  if (price === "Freemium") return "text-blue-400 bg-blue-400/10";
  if (
    price === "Pay-as-you-go" ||
    price === "Custom" ||
    price.startsWith("From")
  )
    return "text-purple-400 bg-purple-400/10";
  return "text-amber-400 bg-amber-400/10";
}

export function getPriceTextColor(price: string): string {
  if (price === "Free" || price.startsWith("Free"))
    return "text-emerald-400";
  if (price === "Freemium") return "text-blue-400";
  if (
    price === "Pay-as-you-go" ||
    price === "Custom" ||
    price.startsWith("From")
  )
    return "text-purple-400";
  return "text-amber-400";
}

export function getPriceColorBorder(price: string): string {
  if (price === "Free" || price.startsWith("Free"))
    return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
  if (price === "Freemium")
    return "text-blue-400 bg-blue-400/10 border-blue-400/20";
  if (
    price === "Pay-as-you-go" ||
    price === "Custom" ||
    price.startsWith("From")
  )
    return "text-purple-400 bg-purple-400/10 border-purple-400/20";
  return "text-amber-400 bg-amber-400/10 border-amber-400/20";
}

export function getAgentsByCategory(slug: string): Agent[] {
  return agents.filter((a) => a.categorySlug === slug);
}

export function getAgentsByCategorySorted(slug: string): Agent[] {
  const tierOrder: Record<ListingTier, number> = {
    spotlight: 0,
    featured: 1,
    basic: 2,
  };
  return agents
    .filter((a) => a.categorySlug === slug)
    .sort(
      (a, b) =>
        (tierOrder[getListingTier(a)] ?? 2) -
        (tierOrder[getListingTier(b)] ?? 2)
    );
}

// ─── Supabase listing overrides (server-side) ────────────────────────────────
// Server components should query the `listings` table for real-time tier data.
// Use `getListingOverrides()` from "@/lib/listings" for the authoritative tier.
// The hardcoded spotlight/featured IDs above serve as the static fallback
// for SSG pages and the client-side search index.
