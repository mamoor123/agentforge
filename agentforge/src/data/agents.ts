export interface Agent {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  categorySlug: string;
  icon: string;
  rating: number;
  users: string;
  price: "Free" | "Freemium" | "Premium";
  featured: boolean;
  new: boolean;
  tags: string[];
  creator: string;
  deployUrl?: string;
  features: string[];
}

export const categories = [
  { name: "Marketing", slug: "marketing", icon: "📢", count: 127, description: "Automate content, ads, SEO & social media" },
  { name: "Coding", slug: "coding", icon: "💻", count: 98, description: "Code review, debugging, deployment & more" },
  { name: "Business", slug: "business", icon: "📊", count: 84, description: "CRM, invoicing, email & operations" },
  { name: "Creative", slug: "creative", icon: "🎨", count: 73, description: "Design, video, music & content creation" },
  { name: "Data", slug: "data", icon: "📈", count: 65, description: "Analytics, scraping, visualization & insights" },
  { name: "Productivity", slug: "productivity", icon: "⚡", count: 91, description: "Task management, scheduling & automation" },
  { name: "Education", slug: "education", icon: "📚", count: 52, description: "Tutoring, research, writing & learning" },
  { name: "Health", slug: "health", icon: "🏥", count: 41, description: "Fitness, nutrition, wellness & tracking" },
];

export const agents: Agent[] = [
  {
    id: "content-king",
    name: "ContentKing",
    tagline: "Writes viral social media posts in seconds",
    description: "An AI agent that analyzes trending content across platforms and generates high-engagement posts tailored to your brand voice. Supports Twitter/X, LinkedIn, Instagram, and TikTok scripts.",
    category: "Marketing",
    categorySlug: "marketing",
    icon: "👑",
    rating: 4.9,
    users: "45.2K",
    price: "Freemium",
    featured: true,
    new: false,
    tags: ["social media", "content", "copywriting", "viral"],
    creator: "AgentForge Team",
    features: [
      "Analyzes 10K+ trending posts daily",
      "Adapts to your brand voice",
      "Multi-platform optimization",
      "A/B test variations",
      "Best time-to-post suggestions"
    ]
  },
  {
    id: "code-surgeon",
    name: "CodeSurgeon",
    tagline: "Reviews, debugs & optimizes your codebase",
    description: "A senior-level AI code reviewer that catches bugs, suggests optimizations, and ensures best practices. Supports 20+ languages and integrates with GitHub.",
    category: "Coding",
    categorySlug: "coding",
    icon: "🔬",
    rating: 4.8,
    users: "38.7K",
    price: "Freemium",
    featured: true,
    new: false,
    tags: ["code review", "debugging", "GitHub", "optimization"],
    creator: "DevForge Labs",
    features: [
      "Pull request reviews with inline comments",
      "Security vulnerability detection",
      "Performance optimization suggestions",
      "Auto-fix for common patterns",
      "Supports 20+ languages"
    ]
  },
  {
    id: "invoicely",
    name: "Invoicely",
    tagline: "Generate, send & track invoices automatically",
    description: "An autonomous billing agent that creates professional invoices, sends payment reminders, tracks outstanding payments, and syncs with your accounting tools.",
    category: "Business",
    categorySlug: "business",
    icon: "💰",
    rating: 4.7,
    users: "22.1K",
    price: "Freemium",
    featured: true,
    new: false,
    tags: ["invoicing", "billing", "accounting", "payments"],
    creator: "BizAutomate",
    features: [
      "Auto-generate from contracts/emails",
      "Payment reminder sequences",
      "Multi-currency support",
      "Accounting tool sync",
      "Revenue analytics dashboard"
    ]
  },
  {
    id: "pixel-ai",
    name: "PixelAI",
    tagline: "Design stunning graphics with one prompt",
    description: "A creative AI agent that generates social media graphics, banners, logos, and presentations. Understands design principles and brand guidelines.",
    category: "Creative",
    categorySlug: "creative",
    icon: "🎯",
    rating: 4.8,
    users: "31.5K",
    price: "Freemium",
    featured: true,
    new: false,
    tags: ["design", "graphics", "branding", "social media"],
    creator: "CreativeStack",
    features: [
      "Brand-aware design generation",
      "Template library with 500+ layouts",
      "Auto-resize for all platforms",
      "Style consistency engine",
      "Export in all formats (PNG, SVG, PDF)"
    ]
  },
  {
    id: "data-whisperer",
    name: "DataWhisperer",
    tagline: "Turns raw data into actionable insights",
    description: "Upload any dataset and get instant analysis, visualizations, and natural language insights. Supports CSV, JSON, Excel, SQL databases, and APIs.",
    category: "Data",
    categorySlug: "data",
    icon: "🔮",
    rating: 4.6,
    users: "18.9K",
    price: "Free",
    featured: true,
    new: false,
    tags: ["analytics", "visualization", "data science", "insights"],
    creator: "DataLab AI",
    features: [
      "Natural language data queries",
      "Auto-generated charts & dashboards",
      "Anomaly detection",
      "Export reports as PDF/PPT",
      "Connect to live databases"
    ]
  },
  {
    id: "meeting-mind",
    name: "MeetingMind",
    tagline: "Joins meetings, takes notes, creates action items",
    description: "An AI meeting assistant that joins your calls, transcribes in real-time, summarizes key points, and automatically creates tasks in your project management tool.",
    category: "Productivity",
    categorySlug: "productivity",
    icon: "🧠",
    rating: 4.9,
    users: "52.3K",
    price: "Freemium",
    featured: true,
    new: false,
    tags: ["meetings", "transcription", "notes", "productivity"],
    creator: "FlowState AI",
    features: [
      "Real-time transcription & summary",
      "Auto action item extraction",
      "Integrates with Notion, Asana, Jira",
      "Meeting analytics & trends",
      "Speaker identification"
    ]
  },
  {
    id: "tutor-ai",
    name: "TutorAI",
    tagline: "Personalized learning paths for any subject",
    description: "An adaptive learning agent that creates custom study plans, generates practice problems, explains concepts in your learning style, and tracks your progress.",
    category: "Education",
    categorySlug: "education",
    icon: "🎓",
    rating: 4.7,
    users: "28.6K",
    price: "Free",
    featured: false,
    new: true,
    tags: ["learning", "tutoring", "study", "education"],
    creator: "EduMind",
    features: [
      "Adaptive difficulty levels",
      "Multi-modal explanations (text, visual, audio)",
      "Progress tracking & weak area detection",
      "Spaced repetition scheduling",
      "Supports 30+ subjects"
    ]
  },
  {
    id: "seo-ninja",
    name: "SEONinja",
    tagline: "Dominate search rankings with AI-powered SEO",
    description: "An SEO automation agent that researches keywords, optimizes content, monitors rankings, and builds backlink strategies. Saves 20+ hours per week.",
    category: "Marketing",
    categorySlug: "marketing",
    icon: "🥷",
    rating: 4.8,
    users: "34.1K",
    price: "Premium",
    featured: false,
    new: false,
    tags: ["SEO", "keywords", "content optimization", "rankings"],
    creator: "RankBoost",
    features: [
      "Keyword research & difficulty analysis",
      "Content optimization suggestions",
      "Competitor gap analysis",
      "Backlink opportunity finder",
      "Weekly ranking reports"
    ]
  },
  {
    id: "email-genius",
    name: "EmailGenius",
    tagline: "Crafts emails that get replies",
    description: "An AI email agent that writes cold emails, follow-ups, and newsletters that actually get opened and replied to. Learns from your best-performing emails.",
    category: "Business",
    categorySlug: "business",
    icon: "📧",
    rating: 4.6,
    users: "19.8K",
    price: "Freemium",
    featured: false,
    new: false,
    tags: ["email", "cold outreach", "copywriting", "sales"],
    creator: "OutreachAI",
    features: [
      "Personalized cold email generation",
      "A/B test subject lines",
      "Follow-up sequence automation",
      "Open/reply rate analytics",
      "CRM integration"
    ]
  },
  {
    id: "fitness-coach",
    name: "FitCoach AI",
    tagline: "Your personal AI fitness & nutrition coach",
    description: "A comprehensive health agent that creates workout plans, tracks nutrition from food photos, monitors progress, and adapts plans based on your results.",
    category: "Health",
    categorySlug: "health",
    icon: "💪",
    rating: 4.7,
    users: "41.2K",
    price: "Freemium",
    featured: false,
    new: true,
    tags: ["fitness", "nutrition", "workout", "health"],
    creator: "FitTech AI",
    features: [
      "Photo-based calorie tracking",
      "Custom workout plan generation",
      "Progress photos & measurements tracking",
      "Adaptive difficulty",
      "Integration with wearables"
    ]
  },
  {
    id: "api-builder",
    name: "APIBuilder",
    tagline: "Design & deploy APIs in minutes, not days",
    description: "An AI agent that designs REST APIs from natural language descriptions, generates documentation, creates SDKs, and deploys to production with one click.",
    category: "Coding",
    categorySlug: "coding",
    icon: "🔌",
    rating: 4.5,
    users: "15.3K",
    price: "Free",
    featured: false,
    new: true,
    tags: ["API", "backend", "REST", "deployment"],
    creator: "StackForge",
    features: [
      "Natural language to API",
      "Auto-generated OpenAPI docs",
      "Client SDK generation (JS, Python, Go)",
      "One-click deployment",
      "Built-in rate limiting & auth"
    ]
  },
  {
    id: "brand-voice",
    name: "BrandVoice",
    tagline: "Maintains consistent brand voice across all channels",
    description: "A brand consistency agent that learns your tone, vocabulary, and messaging guidelines, then reviews and rewrites all content to match your brand perfectly.",
    category: "Marketing",
    categorySlug: "marketing",
    icon: "🎨",
    rating: 4.6,
    users: "16.7K",
    price: "Premium",
    featured: false,
    new: false,
    tags: ["branding", "tone of voice", "content", "consistency"],
    creator: "BrandMind",
    features: [
      "Brand voice profile creation",
      "Content review & rewriting",
      "Tone consistency scoring",
      "Style guide generation",
      "Multi-channel optimization"
    ]
  },
  {
    id: "video-creator",
    name: "VideoCreator AI",
    tagline: "Turn text into engaging short-form videos",
    description: "An AI video production agent that creates TikTok, Reels, and Shorts from text prompts. Includes AI voiceover, captions, transitions, and stock footage.",
    category: "Creative",
    categorySlug: "creative",
    icon: "🎬",
    rating: 4.8,
    users: "37.4K",
    price: "Freemium",
    featured: false,
    new: false,
    tags: ["video", "TikTok", "Reels", "content creation"],
    creator: "VidForge",
    features: [
      "Text-to-video generation",
      "AI voiceover with 100+ voices",
      "Auto-captions & subtitles",
      "Trending template library",
      "One-click multi-platform export"
    ]
  },
  {
    id: "lead-finder",
    name: "LeadFinder",
    tagline: "Finds & qualifies leads while you sleep",
    description: "An autonomous lead generation agent that searches the web, enriches contact data, scores leads based on your ICP, and delivers warm prospects to your inbox.",
    category: "Business",
    categorySlug: "business",
    icon: "🎯",
    rating: 4.5,
    users: "12.8K",
    price: "Premium",
    featured: false,
    new: false,
    tags: ["lead generation", "sales", "prospecting", "CRM"],
    creator: "SalesForge",
    features: [
      "ICP-based lead scoring",
      "Contact enrichment from 50+ sources",
      "Automated outreach sequences",
      "CRM auto-sync",
      "Daily lead digest emails"
    ]
  },
  {
    id: "research-assistant",
    name: "ResearchAssistant",
    tagline: "Deep research on any topic in minutes",
    description: "An AI research agent that searches academic papers, news, reports, and web sources to compile comprehensive research briefs with citations.",
    category: "Data",
    categorySlug: "data",
    icon: "🔍",
    rating: 4.7,
    users: "25.1K",
    price: "Free",
    featured: false,
    new: false,
    tags: ["research", "academic", "analysis", "reports"],
    creator: "DeepSearch AI",
    features: [
      "Multi-source research synthesis",
      "Academic paper analysis",
      "Citation management",
      "Executive summary generation",
      "Competitive intelligence reports"
    ]
  },
  {
    id: "slack-bot-pro",
    name: "SlackBot Pro",
    tagline: "Your team's AI assistant inside Slack",
    description: "A Slack-native AI agent that answers questions, summarizes channels, manages tasks, schedules meetings, and automates repetitive team workflows.",
    category: "Productivity",
    categorySlug: "productivity",
    icon: "💬",
    rating: 4.8,
    users: "44.6K",
    price: "Freemium",
    featured: false,
    new: false,
    tags: ["Slack", "team", "automation", "assistant"],
    creator: "WorkFlow AI",
    features: [
      "Channel summarization",
      "Natural language task creation",
      "Meeting scheduling assistant",
      "Custom workflow automation",
      "Knowledge base search"
    ]
  },
];

export function getAgentsByCategory(slug: string): Agent[] {
  return agents.filter(a => a.categorySlug === slug);
}

export function getFeaturedAgents(): Agent[] {
  return agents.filter(a => a.featured);
}

export function getNewAgents(): Agent[] {
  return agents.filter(a => a.new);
}

export function getAgentById(id: string): Agent | undefined {
  return agents.find(a => a.id === id);
}

export function searchAgents(query: string): Agent[] {
  const q = query.toLowerCase();
  return agents.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.tagline.toLowerCase().includes(q) ||
    a.tags.some(t => t.toLowerCase().includes(q)) ||
    a.category.toLowerCase().includes(q)
  );
}
