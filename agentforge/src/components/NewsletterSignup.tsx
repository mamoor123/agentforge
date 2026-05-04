"use client";

import { useState } from "react";
import { Mail, Check, Loader2, Sparkles } from "lucide-react";

export default function NewsletterSignup({ variant = "default" }: { variant?: "default" | "inline" | "hero" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    // Simulate API call — replace with real newsletter backend (Beehiiv, ConvertKit, etc.)
    await new Promise(resolve => setTimeout(resolve, 1200));
    setStatus("success");
    setEmail("");

    // Reset after 4s
    setTimeout(() => setStatus("idle"), 4000);
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="flex-1 px-3 py-2 text-sm rounded-lg bg-white/5 border border-[var(--border)] text-white placeholder:text-[var(--text-secondary)] outline-none focus:border-[var(--primary)] transition-colors"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : status === "success" ? <Check className="w-4 h-4" /> : "Subscribe"}
        </button>
      </form>
    );
  }

  if (variant === "hero") {
    return (
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-rose-500 rounded-xl opacity-30 group-hover:opacity-50 blur transition" />
          <div className="relative flex items-center bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
            <Mail className="w-5 h-5 text-amber-400 ml-4" />
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Get weekly AI agent picks..."
              className="flex-1 bg-transparent px-4 py-3.5 text-white placeholder:text-[var(--text-secondary)] outline-none"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="mr-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : status === "success" ? "Subscribed!" : "Subscribe"}
            </button>
          </div>
        </form>
        <p className="text-xs text-[var(--text-secondary)] mt-2 text-center">
          Join 5,000+ subscribers. Free weekly newsletter. Unsubscribe anytime.
        </p>
      </div>
    );
  }

  // Default — full CTA block
  return (
    <div className="glow-border rounded-xl bg-[var(--bg-card)] p-8 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-400/10 mb-4">
        <Mail className="w-6 h-6 text-amber-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">
        📬 Weekly AI Agent Picks
      </h3>
      <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-md mx-auto">
        Get the top new AI agents delivered to your inbox every Thursday. Curated by humans, not algorithms.
      </p>
      {status === "success" ? (
        <div className="flex items-center justify-center gap-2 text-emerald-400">
          <Check className="w-5 h-5" />
          <span className="font-medium">You&apos;re in! Check your inbox.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-[var(--border)] text-white placeholder:text-[var(--text-secondary)] outline-none focus:border-[var(--primary)] transition-colors"
            disabled={status === "loading"}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
          >
            {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Subscribe
          </button>
        </form>
      )}
      <p className="text-xs text-[var(--text-secondary)] mt-3">
        5,000+ subscribers · 42% open rate · Free forever
      </p>
    </div>
  );
}
