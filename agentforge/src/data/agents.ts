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

// ─── Categories ──────────────────────────────────────────────────────────────

export const categories = [
  { name: "Marketing", slug: "marketing", icon: "📢", count: 89, description: "Automate content, ads, SEO & social media" },
  { name: "Coding", slug: "coding", icon: "💻", count: 71, description: "Code review, debugging, deployment & more" },
  { name: "Business", slug: "business", icon: "📊", count: 68, description: "CRM, invoicing, email & operations" },
  { name: "Creative", slug: "creative", icon: "🎨", count: 64, description: "Design, video, music & content creation" },
  { name: "Data", slug: "data", icon: "📈", count: 74, description: "Analytics, scraping, visualization & insights" },
  { name: "Productivity", slug: "productivity", icon: "⚡", count: 58, description: "Task management, scheduling & automation" },
  { name: "Education", slug: "education", icon: "📚", count: 39, description: "Tutoring, research, writing & learning" },
  { name: "Health", slug: "health", icon: "🏥", count: 43, description: "Fitness, nutrition, wellness & tracking" },
  { name: "Sales", slug: "sales", icon: "💼", count: 44, description: "Lead gen, outreach, pipeline & closing" },
  { name: "Customer Support", slug: "support", icon: "🎧", count: 53, description: "Chatbots, helpdesk & ticket automation" },
  { name: "AI & ML", slug: "ai-ml", icon: "🤖", count: 57, description: "LLMs, model APIs, training & AI infrastructure" },
  { name: "Finance", slug: "finance", icon: "💰", count: 42, description: "Accounting, investing, crypto & financial analysis" },
  { name: "HR & Recruiting", slug: "hr", icon: "👥", count: 39, description: "Hiring, onboarding, payroll & people management" },
  { name: "Legal", slug: "legal", icon: "⚖️", count: 42, description: "Contracts, compliance, legal research & IP" },
  { name: "E-commerce", slug: "ecommerce", icon: "🛒", count: 28, description: "Online stores, product listings, inventory & fulfillment" },
  { name: "Voice AI", slug: "voice-ai", icon: "🎙️", count: 33, description: "Text-to-speech, voice cloning, speech recognition & voice agents" },
  { name: "Cybersecurity", slug: "cybersecurity", icon: "🔒", count: 29, description: "Security scanning, vulnerability detection & threat protection" },
  { name: "Research & Knowledge", slug: "research", icon: "🔬", count: 29, description: "AI search, academic research, document analysis & knowledge management" },
  { name: "DevOps & Infrastructure", slug: "devops", icon: "🚀", count: 40, description: "Deployment, monitoring, CI/CD & cloud infrastructure" },
  { name: "Gaming", slug: "gaming", icon: "🎮", count: 18, description: "AI NPCs, game asset generation & game development tools" },
  { name: "Real Estate", slug: "real-estate", icon: "🏠", count: 17, description: "Property search, valuation, staging & real estate automation" },
  { name: "Logistics & Supply Chain", slug: "logistics", icon: "📦", count: 23, description: "Shipping, inventory, order tracking & supply chain optimization" },
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

export function searchAgents(query: string): Agent[] {
  const q = query.toLowerCase();
  return agents.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.tagline.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.category.toLowerCase().includes(q)
  );
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
