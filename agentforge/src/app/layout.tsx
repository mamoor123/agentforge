import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgentForge — The #1 AI Agent Marketplace",
  description: "Discover, deploy, and automate with 500+ AI agents. No code required. Join 120K+ users building the future of automation.",
  keywords: ["AI agents", "marketplace", "automation", "artificial intelligence", "no-code", "productivity"],
  openGraph: {
    title: "AgentForge — The #1 AI Agent Marketplace",
    description: "Discover, deploy, and automate with 500+ AI agents. No code required.",
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
