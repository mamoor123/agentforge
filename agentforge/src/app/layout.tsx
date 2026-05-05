import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { agentStats, formatTotalUsers } from "@/data/agents";

const inter = Inter({ subsets: ["latin"] });

const desc = `Discover, deploy, and automate with ${agentStats.totalAgents}+ AI agents. No code required. Join ${formatTotalUsers(agentStats.totalUsers)} users building the future of automation.`;

export const metadata: Metadata = {
  title: "AgentForge — The #1 AI Agent Marketplace",
  description: desc,
  keywords: ["AI agents", "marketplace", "automation", "artificial intelligence", "no-code", "productivity"],
  openGraph: {
    title: "AgentForge — The #1 AI Agent Marketplace",
    description: desc,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://assets.lemonsqueezy.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
