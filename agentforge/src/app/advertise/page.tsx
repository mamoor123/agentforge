"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap, Star, Crown, Flame, Check, ArrowRight, Users, Globe,
  TrendingUp, Eye, Mail, BarChart3, Sparkles, Rocket, Shield
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import { PRICING_TIERS } from "@/data/agents";

const tierIcons: Record<string, React.ReactNode> = {
  basic: <Zap className="w-6 h-6" />,
  featured: <Star className="w-6 h-6" />,
  spotlight: <Flame className="w-6 h-6" />,
};

const tierGradients: Record<string, string> = {
  basic: "from-slate-500/20 to-slate-600/20",
  featured: "from-amber-500/20 to-amber-600/20",
  spotlight: "from-rose-500/20 to-pink-600/20",
};

const stats = [
  { label: "Monthly Visitors", value: "50K+", icon: <Eye className="w-5 h-5" /> },
  { label: "Agents Listed", value: "1,000+", icon: <Globe className="w-5 h-5" /> },
  { label: "Categories", value: "22", icon: <BarChart3 className="w-5 h-5" /> },
  { label: "Avg Rating", value: "4.5+", icon: <Star className="w-5 h-5" /> },
  { label: "Weekly Growth", value: "12%", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "Newsletter Subs", value: "5K+", icon: <Mail className="w-5 h-5" /> },
];

const testimonials = [
  {
    quote: "After upgrading to Spotlight, our signups increased 340% in the first week. Best ROI of any marketing channel.",
    name: "Sarah Chen",
    role: "VP Marketing, AI Startup",
    avatar: "👩‍💼"
  },
  {
    quote: "The Featured badge alone drove 2,000+ clicks to our product page. AgentForge's audience is exactly who we want.",
    name: "Marcus Rivera",
    role: "CEO, DevTools Co",
    avatar: "👨‍💻"
  },
];

export default function AdvertisePage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="min-h-screen animated-gradient grid-pattern">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="orb w-96 h-96 bg-amber-500 top-0 left-1/4" aria-hidden="true" />
        <div className="orb w-72 h-72 bg-rose-500 top-20 right-1/4" style={{ animationDelay: "-5s" }} aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/20 bg-amber-400/5 mb-8">
            <Sparkles className="w-4 h-4 text-amber-400" aria-hidden="true" />
            <span className="text-sm text-amber-400 font-medium">Premium Listings</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Put Your AI Agent</span>
            <br />
            <span className="gradient-text">In Front of 50K+ Buyers</span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
            AI companies are already spending on directories. Get premium placement on AgentForge and reach decision-makers actively looking for AI tools.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/claim"
              className="btn-shimmer px-8 py-3.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Crown className="w-5 h-5" />
              Get Featured Today
            </Link>
            <a
              href="#pricing"
              className="px-8 py-3.5 border border-[var(--border)] text-white font-medium rounded-lg hover:bg-white/5 transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-[var(--border)] bg-[var(--bg-card)]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-[var(--primary)] mb-2">
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-[var(--text-secondary)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Advertise */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Premium Listings Beat Ads
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Clean design, high intent traffic, zero spam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Old Way */}
            <div className="rounded-xl bg-[var(--bg-card)] p-8 border border-red-400/10">
              <h3 className="text-lg font-semibold text-red-400 mb-6 flex items-center gap-2">
                ❌ Traditional Ads
              </h3>
              <ul className="space-y-4">
                {[
                  "Looks spammy, kills user trust",
                  "Low CPM ($5) at low traffic",
                  "Banner blindness — users ignore them",
                  "Clutters the experience",
                  "Requires 200K+ visits to be worthwhile",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)]">
                    <span className="text-red-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* New Way */}
            <div className="rounded-xl bg-[var(--bg-card)] p-8 border border-emerald-400/10 ring-1 ring-emerald-400/10">
              <h3 className="text-lg font-semibold text-emerald-400 mb-6 flex items-center gap-2">
                ✅ Premium Listings
              </h3>
              <ul className="space-y-4">
                {[
                  "Clean, native design — feels organic",
                  "AI companies willingly pay $75-200/mo",
                  "High-intent visitors actively searching",
                  "Enhances the browsing experience",
                  "Works at any traffic level",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)]">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="pricing" className="py-20 relative">
        <div className="orb w-64 h-64 bg-purple-500 top-1/4 -left-32 opacity-20" aria-hidden="true" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-8">
              Choose the visibility level that matches your goals
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-3 p-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border)]">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white"
                    : "text-[var(--text-secondary)] hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "annual"
                    ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white"
                    : "text-[var(--text-secondary)] hover:text-white"
                }`}
              >
                Annual <span className="text-emerald-400 text-xs ml-1">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_TIERS.map((t) => {
              const isSpotlight = t.tier === "spotlight";
              const isFeatured = t.tier === "featured";
              const price = billingCycle === "annual" ? Math.round(t.price * 0.8) : t.price;

              return (
                <div
                  key={t.tier}
                  className={`relative rounded-xl bg-[var(--bg-card)] p-8 border transition-all ${
                    isSpotlight
                      ? "border-rose-400/30 ring-1 ring-rose-400/20 shadow-[0_0_40px_rgba(251,113,133,0.1)]"
                      : isFeatured
                      ? "border-amber-400/20 ring-1 ring-amber-400/10"
                      : "border-[var(--border)]"
                  }`}
                >
                  {isSpotlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold">
                      MOST POPULAR
                    </div>
                  )}

                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${tierGradients[t.tier]} mb-6`}>
                    <span className={isSpotlight ? "text-rose-400" : isFeatured ? "text-amber-400" : "text-[var(--text-secondary)]"}>
                      {tierIcons[t.tier]}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{t.name}</h3>

                  <div className="mb-6">
                    {t.price === 0 ? (
                      <span className="text-3xl font-bold text-white">Free</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold text-white">${price}</span>
                        <span className="text-[var(--text-secondary)]">/mo</span>
                        {billingCycle === "annual" && t.price > 0 && (
                          <span className="ml-2 text-sm text-[var(--text-secondary)] line-through">${t.price}</span>
                        )}
                      </>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {t.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          isSpotlight ? "text-rose-400" : isFeatured ? "text-amber-400" : "text-emerald-400"
                        }`} />
                        <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={t.price === 0 ? "/agents" : `/claim?tier=${t.tier}`}
                    className={`w-full py-3 rounded-lg font-medium transition-opacity flex items-center justify-center gap-2 ${
                      isSpotlight
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:opacity-90"
                        : isFeatured
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:opacity-90"
                        : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {t.price === 0 ? "Browse Agents" : "Get Started"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Sponsorship */}
      <section className="py-20 border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glow-border rounded-2xl bg-[var(--bg-card)] p-10 text-center relative overflow-hidden">
            <div className="orb w-48 h-48 bg-cyan-500 -top-20 -right-20 opacity-20" aria-hidden="true" />
            <div className="relative">
              <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                📬 Newsletter Sponsorships
              </h2>
              <p className="text-[var(--text-secondary)] text-lg mb-6 max-w-xl mx-auto">
                Reach 5,000+ AI enthusiasts every week. Sponsor our &quot;Top New AI Agents&quot; newsletter and get your product in front of builders, founders, and tech leaders.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="rounded-lg bg-white/5 p-4">
                  <p className="text-2xl font-bold text-white">5K+</p>
                  <p className="text-xs text-[var(--text-secondary)]">Subscribers</p>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <p className="text-2xl font-bold text-white">42%</p>
                  <p className="text-xs text-[var(--text-secondary)]">Open Rate</p>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <p className="text-2xl font-bold text-white">8%</p>
                  <p className="text-xs text-[var(--text-secondary)]">Click Rate</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">$500<span className="text-lg text-[var(--text-secondary)]">/week</span></p>
                  <p className="text-xs text-[var(--text-secondary)]">Solo sponsor slot</p>
                </div>
                <Link
                  href="mailto:advertise@agentforge.ai?subject=Newsletter%20Sponsorship"
                  className="btn-shimmer px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  Reserve a Slot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Sponsorships */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            🏷️ Category Sponsorships
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-10">
            Own an entire category. Your brand appears at the top of every page in your sponsored category.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {["Marketing", "Coding", "Creative", "Business"].map((cat) => (
              <div key={cat} className="flex items-center justify-between rounded-lg bg-[var(--bg-card)] p-4 border border-[var(--border)]">
                <span className="text-white font-medium">{cat}</span>
                <span className="text-sm text-[var(--text-secondary)]">$500/mo</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-[var(--text-secondary)]">
            Limited to 1 sponsor per category.{" "}
            <Link href="mailto:advertise@agentforge.ai?subject=Category%20Sponsorship" className="text-[var(--primary)] hover:underline">
              Contact us →
            </Link>
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Our Advertisers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glow-border rounded-xl bg-[var(--bg-card)] p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[var(--text-secondary)] mb-6 italic">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Projections */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            The Math Speaks for Itself
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-10">
            Revenue projections at 50K monthly visits
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl bg-[var(--bg-card)] p-6 border border-[var(--border)]">
              <p className="text-sm text-[var(--text-secondary)] mb-2">Ads Only</p>
              <p className="text-3xl font-bold text-white">$1,250</p>
              <p className="text-xs text-red-400 mt-1">Low UX impact</p>
            </div>
            <div className="rounded-xl bg-[var(--bg-card)] p-6 border border-[var(--border)]">
              <p className="text-sm text-[var(--text-secondary)] mb-2">Affiliate Only</p>
              <p className="text-3xl font-bold text-white">$3,000</p>
              <p className="text-xs text-amber-400 mt-1">Good passive income</p>
            </div>
            <div className="rounded-xl bg-[var(--bg-card)] p-6 border border-emerald-400/20 ring-1 ring-emerald-400/10">
              <p className="text-sm text-emerald-400 mb-2 font-medium">Premium + Affiliate</p>
              <p className="text-3xl font-bold text-white">$8-12K</p>
              <p className="text-xs text-emerald-400 mt-1">Best ROI + clean UX</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 border-y border-[var(--border)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glow-border rounded-2xl bg-[var(--bg-card)] p-12 relative overflow-hidden">
            <div className="orb w-48 h-48 bg-amber-500 -top-20 -right-20 opacity-20" aria-hidden="true" />
            <div className="orb w-32 h-32 bg-rose-500 -bottom-10 -left-10 opacity-20" aria-hidden="true" />
            <div className="relative">
              <Rocket className="w-12 h-12 text-amber-400 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Get More Visibility?
              </h2>
              <p className="text-[var(--text-secondary)] text-lg mb-8">
                Join the AI companies already winning on AgentForge. Self-serve checkout, live in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/claim"
                  className="btn-shimmer px-8 py-3.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Crown className="w-5 h-5" />
                  Claim Your Listing
                </Link>
                <a
                  href="mailto:advertise@agentforge.ai"
                  className="px-8 py-3.5 border border-[var(--border)] text-white font-medium rounded-lg hover:bg-white/5 transition-colors"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
