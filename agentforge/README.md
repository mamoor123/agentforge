# ⚡ AgentForge — The #1 AI Agent Marketplace

> Discover, deploy, and automate with 500+ AI agents. No code required.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 What is AgentForge?

AgentForge is a curated marketplace for AI agents. Find the perfect AI tool for any task — marketing, coding, business, creative, data, productivity, education, health, sales, or customer support.

### Features

- 🔍 **Search & Filter** — Find agents by category, price, rating, or keyword
- 📊 **166+ Real AI Agents** — Curated from the best tools in the ecosystem
- 🎨 **Beautiful UI** — Dark theme, gradient animations, responsive design
- ⚡ **Fast** — Built with Next.js 16 and Turbopack
- 🆓 **Free to deploy** — Host on Vercel for $0

## 📦 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Hosting:** Vercel (free tier)

## 🏃 Quick Start

```bash
# Clone
git clone https://github.com/mamoor123/agentforge.git
cd agentforge

# Install
npm install

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy to Vercel

```bash
npx vercel
```

Or click the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mamoor123/agentforge)

## 📁 Project Structure

```
agentforge/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── agents/
│   │   │   ├── page.tsx          # Browse all agents
│   │   │   └── [id]/page.tsx     # Agent detail
│   │   ├── categories/
│   │   │   ├── page.tsx          # All categories
│   │   │   └── [slug]/page.tsx   # Category detail
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AgentCard.tsx
│   │   └── CategoryCard.tsx
│   └── data/
│       └── agents.ts             # Agent database (166 agents)
└── public/
```

## 🤝 Contributing

Want to add your AI agent? Submit a PR or open an issue!

## 📄 License

MIT

---

Built with ⚡ for the AI agent revolution
