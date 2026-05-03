<div align="center">

# ⚡ AgentForge

### The #1 AI Agent Marketplace

**Discover, compare, and deploy 700+ AI agents across 22 categories.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

<br />

[![GitHub stars](https://img.shields.io/github/stars/mamoor123/agentforge?style=social)](https://github.com/mamoor123/agentforge/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/mamoor123/agentforge?style=social)](https://github.com/mamoor123/agentforge/network/members)

<br />

<img src="https://raw.githubusercontent.com/mamoor123/agentforge/main/agentforge/public/screenshot.png" alt="AgentForge Screenshot" width="800" />

</div>

---

## 🤔 What is AgentForge?

AgentForge is a **curated marketplace** for AI agents. Instead of hunting across dozens of websites to find the right AI tool, AgentForge puts them all in one place — searchable, comparable, and organized.

**Think of it as the "Product Hunt" for AI agents.**

### Why AgentForge?

- 🔍 **700+ real AI agents** — not stubs, real tools with real descriptions
- 📊 **22 categories** — Marketing, Coding, Business, Creative, Data, Productivity, Education, Health, Sales, Customer Support, AI & ML, Finance, HR & Recruiting, Legal, E-commerce, Voice AI, Cybersecurity, Research & Knowledge, DevOps & Infrastructure, Gaming, Real Estate, Logistics & Supply Chain
- 🎨 **Beautiful dark UI** — gradient animations, responsive design, modern aesthetics
- ⚡ **Lightning fast** — Next.js 16 + Turbopack = instant page loads
- 🆓 **100% free to deploy** — host on Vercel for $0
- 🔍 **Smart search** — find agents by name, tag, category, or keyword
- 📱 **Mobile responsive** — works perfectly on any device

---

## 📊 Agent Database

| Category | Agents | Examples |
|----------|--------|----------|
| 📢 **Marketing** | 67 | Jasper, Copy.ai, Surfer SEO, SEMrush, HubSpot AI |
| 📊 **Business** | 56 | Zapier, n8n, Notion AI, Make, Salesforce Einstein |
| 💻 **Coding** | 51 | Cursor, Claude Code, GitHub Copilot, Windsurf, Replit Agent |
| 📈 **Data** | 49 | ChatGPT, Claude, Gemini, DeepSeek, Julius |
| 🎨 **Creative** | 47 | Midjourney, DALL·E 3, Runway, Suno, Canva AI |
| ⚡ **Productivity** | 41 | OpenClaw, Reclaim AI, Todoist AI, Otter.ai, Magical |
| 🤖 **AI & ML** | 41 | Hugging Face, LangChain, Replicate, Ollama, vLLM |
| 🏥 **Health** | 31 | Cal AI, WHOOP, Noom, Fitbod |
| 🎧 **Customer Support** | 31 | Intercom Fin, Zendesk AI, Freshdesk, Crisp, Tidio |
| ⚖️ **Legal** | 30 | Harvey AI, Ironclad, Spellbook, Luminance, Casetext |
| 👥 **HR & Recruiting** | 28 | Greenhouse, Lever, Ashby, Deel, Remote |
| 💼 **Sales** | 27 | Apollo.io, Clay, Gong, Outreach, Instantly |
| 💰 **Finance** | 27 | Plaid, Brex, Ramp, Mercury, CoinGecko |
| 📚 **Education** | 26 | Khanmigo, Duolingo Max, Quizlet AI |
| 🚀 **DevOps & Infrastructure** | 26 | Deployment, monitoring, CI/CD & cloud infrastructure |
| 🔬 **Research & Knowledge** | 25 | Perplexity, Consensus, Elicit |
| 🎙️ **Voice AI** | 23 | ElevenLabs, text-to-speech, voice cloning, speech recognition |
| 🛒 **E-commerce** | 23 | Shopify Magic, Jungle Scout, Prisync, Gorgias |
| 📦 **Logistics & Supply Chain** | 15 | Shipping, inventory, order tracking & supply chain optimization |
| 🔒 **Cybersecurity** | 15 | Security scanning, vulnerability detection & threat protection |
| 🎮 **Gaming** | 13 | AI NPCs, game asset generation & game development tools |
| 🏠 **Real Estate** | 11 | Property search, valuation, staging & real estate automation |

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/mamoor123/agentforge.git
cd agentforge/agentforge

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🌐 Deploy to Vercel

One-click deploy — no configuration needed:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mamoor123/agentforge)

Or use the CLI:

```bash
npx vercel
```

---

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Lucide React** | Beautiful icons |
| **Vercel** | Hosting & deployment |

---

## 📁 Project Structure

```
agentforge/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # 🏠 Landing page
│   │   ├── agents/
│   │   │   ├── page.tsx                # 📋 Browse all agents
│   │   │   └── [id]/page.tsx           # 📄 Agent detail page
│   │   ├── categories/
│   │   │   ├── page.tsx                # 📂 All categories
│   │   │   └── [slug]/page.tsx         # 📂 Category detail
│   │   ├── layout.tsx                  # 🎨 Root layout
│   │   └── globals.css                 # 💅 Global styles
│   ├── components/
│   │   ├── Navbar.tsx                  # 🧭 Navigation bar
│   │   ├── Footer.tsx                  # 🦶 Footer
│   │   ├── AgentCard.tsx               # 🃏 Agent card component
│   │   └── CategoryCard.tsx            # 📦 Category card
│   └── data/
│       └── agents.ts                   # 🗄️ Agent database (700+ agents)
├── public/                             # 🖼️ Static assets
├── package.json                        # 📋 Dependencies
├── tailwind.config.ts                  # 🎨 Tailwind config
└── tsconfig.json                       # ⚙️ TypeScript config
```

---

## 🎯 Features

### For Users
- 🔍 **Smart Search** — Find agents by name, description, tags, or category
- 📊 **Category Browsing** — Explore 22 curated categories
- ⭐ **Featured Agents** — Hand-picked top agents highlighted on homepage
- 🆕 **New Agents** — Recently added tools marked with a badge
- 💰 **Price Filters** — Free, Freemium, Premium, Pay-as-you-go
- 📱 **Responsive** — Works on desktop, tablet, and mobile

### For Developers
- ⚡ **Fast** — Built with Next.js 16 and Turbopack
- 🎨 **Beautiful UI** — Dark theme with gradient animations
- 🧩 **Modular** — Clean component architecture
- 📝 **TypeScript** — Fully typed for reliability
- 🎭 **Framer Motion** — Smooth page transitions
- 🔧 **Easy to extend** — Add new agents by editing one file

---

## 🤝 Contributing

Want to add your AI agent? We'd love that!

### Option 1: Submit an Issue
[Open an issue](https://github.com/mamoor123/agentforge/issues/new) with:
- Agent name
- Website URL
- Category
- Brief description

### Option 2: Submit a PR
1. Fork the repo
2. Add your agent to `src/data/agents.ts`
3. Submit a pull request

### Agent Data Structure

```typescript
{
  id: "your-agent",
  name: "Your Agent",
  tagline: "One-line description",
  description: "Longer description of what it does...",
  category: "Marketing",
  categorySlug: "marketing",
  icon: "🚀",
  rating: 4.5,
  users: "100K+",
  price: "Freemium",
  featured: false,
  new: true,
  tags: ["tag1", "tag2", "tag3"],
  creator: "Your Company",
  url: "https://youragent.com",
  features: ["Feature 1", "Feature 2", "Feature 3"]
}
```

---

## 🗺️ Roadmap

- [ ] 🔐 User accounts & authentication
- [ ] ⭐ User reviews & ratings
- [ ] 🔄 Agent comparison tool
- [ ] 📊 Agent performance metrics
- [ ] 💬 "Try it" live demo integration
- [ ] 📧 Newsletter with new agents
- [ ] 🏷️ Agent submission form
- [ ] 📈 Trending agents section
- [ ] 🔔 Price drop alerts
- [ ] 🌍 Multi-language support

---

## 📈 Stats

| Metric | Value |
|--------|-------|
| 🤖 Total Agents | **700+** |
| 📂 Categories | **22** |
| ⭐ Avg Rating | **4.5+** |
| 🆓 Free Agents | **50+** |
| 🌍 Countries | **50+** |

---

## 🙏 Acknowledgements

Built with amazing open-source tools:

- [Next.js](https://nextjs.org) — The React framework
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS
- [Lucide](https://lucide.dev) — Beautiful icons
- [Framer Motion](https://framer.com/motion) — Animations
- [Vercel](https://vercel.com) — Hosting

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with ⚡ for the AI agent revolution**

[⭐ Star this repo](https://github.com/mamoor123/agentforge) · [🐛 Report a bug](https://github.com/mamoor123/agentforge/issues) · [💡 Request a feature](https://github.com/mamoor123/agentforge/issues)

</div>
