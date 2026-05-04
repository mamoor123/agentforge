"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search, Star, Crown, Flame, Check, ArrowRight, CreditCard,
  Shield, Zap, ChevronDown, Users, Loader2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { agents, formatUsers, PRICING_TIERS, type ListingTier } from "@/data/agents";

const tierColors: Record<ListingTier, string> = {
  basic: "border-[var(--border)]",
  featured: "border-amber-400/30 ring-1 ring-amber-400/10",
  spotlight: "border-rose-400/30 ring-1 ring-rose-400/10 shadow-[0_0_30px_rgba(251,113,133,0.08)]",
};

export default function ClaimPage() {
  const searchParams = useSearchParams();
  const preselectedTier = searchParams.get("tier") as ListingTier | null;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<ListingTier>(preselectedTier || "featured");
  const [step, setStep] = useState<"select" | "checkout" | "success">("select");
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
  });

  const filteredAgents = useMemo(() => {
    if (!searchQuery) return agents.slice(0, 20);
    const q = searchQuery.toLowerCase();
    return agents
      .filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.tagline.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      )
      .slice(0, 20);
  }, [searchQuery]);

  const agent = agents.find(a => a.id === selectedAgent);
  const tier = PRICING_TIERS.find(t => t.tier === selectedTier)!;
  const price = tier.price;

  function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);
    // Simulate Stripe checkout
    setTimeout(() => {
      setProcessing(false);
      setStep("success");
    }, 2000);
  }

  return (
    <div className="min-h-screen animated-gradient grid-pattern">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {["select", "checkout", "success"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === s
                  ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white"
                  : i < ["select", "checkout", "success"].indexOf(step)
                  ? "bg-emerald-400/20 text-emerald-400"
                  : "bg-white/5 text-[var(--text-secondary)]"
              }`}>
                {i < ["select", "checkout", "success"].indexOf(step) ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < 2 && (
                <div className={`w-12 h-0.5 ${
                  i < ["select", "checkout", "success"].indexOf(step) ? "bg-emerald-400/40" : "bg-white/10"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Agent & Tier */}
        {step === "select" && (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Claim & Upgrade Your Listing
              </h1>
              <p className="text-[var(--text-secondary)] text-lg">
                Get premium placement and reach more users
              </p>
            </div>

            {/* Agent Search */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-white mb-2">Find Your Agent</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                <input
                  type="text"
                  placeholder="Search by name, category, or keyword..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-white placeholder:text-[var(--text-secondary)] outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>

              {/* Agent list */}
              <div className="mt-3 max-h-64 overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--bg-card)] divide-y divide-[var(--border)]">
                {filteredAgents.map(a => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAgent(a.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-white/5 transition-colors ${
                      selectedAgent === a.id ? "bg-[var(--primary)]/10 border-l-2 border-l-[var(--primary)]" : ""
                    }`}
                  >
                    <span className="text-2xl flex-shrink-0">{a.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{a.name}</p>
                      <p className="text-xs text-[var(--text-secondary)] truncate">{a.category} · {a.tagline}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-white">{a.rating}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tier Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-white mb-3">Choose Your Tier</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PRICING_TIERS.map(t => {
                  const isSelected = selectedTier === t.tier;
                  return (
                    <button
                      key={t.tier}
                      onClick={() => setSelectedTier(t.tier)}
                      className={`relative rounded-xl p-5 text-left border transition-all ${
                        isSelected
                          ? tierColors[t.tier]
                          : "border-[var(--border)] hover:border-white/20"
                      } ${isSelected ? "bg-[var(--bg-card)]" : "bg-[var(--bg-card)]"}`}
                    >
                      {t.tier === "spotlight" && (
                        <div className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold">
                          BEST VALUE
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={t.tier === "spotlight" ? "text-rose-400" : t.tier === "featured" ? "text-amber-400" : "text-[var(--text-secondary)]"}>
                          {t.tier === "spotlight" ? <Flame className="w-5 h-5" /> : t.tier === "featured" ? <Star className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                        </span>
                        <span className="text-sm font-semibold text-white">{t.name}</span>
                      </div>
                      <p className="text-2xl font-bold text-white mb-2">
                        {t.price === 0 ? "Free" : `$${t.price}`}<span className="text-sm text-[var(--text-secondary)] font-normal">/mo</span>
                      </p>
                      <ul className="space-y-1.5">
                        {t.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                            <Check className="w-3 h-3 mt-0.5 flex-shrink-0 text-emerald-400" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      {isSelected && (
                        <div className="absolute top-3 right-3">
                          <div className="w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={() => selectedAgent && setStep("checkout")}
              disabled={!selectedAgent || selectedTier === "basic"}
              className="w-full py-3.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
            {selectedTier === "basic" && (
              <p className="text-center text-xs text-[var(--text-secondary)] mt-2">
                Basic tier is free — no payment needed. Select Featured or Spotlight to upgrade.
              </p>
            )}
          </div>
        )}

        {/* Step 2: Checkout */}
        {step === "checkout" && agent && (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-white mb-3">Complete Your Upgrade</h1>
              <p className="text-[var(--text-secondary)]">Secure checkout powered by Stripe</p>
            </div>

            {/* Order Summary */}
            <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6 mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">Order Summary</h2>
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[var(--border)]">
                <span className="text-3xl">{agent.icon}</span>
                <div>
                  <p className="font-medium text-white">{agent.name}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{agent.category}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[var(--text-secondary)]">{tier.name} Listing</span>
                <span className="text-white font-medium">${price}/mo</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                <span className="text-white font-semibold">Total</span>
                <span className="text-xl font-bold gradient-text">${price}/mo</span>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-white placeholder:text-[var(--text-secondary)] outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-white placeholder:text-[var(--text-secondary)] outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Acme AI Inc."
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-white placeholder:text-[var(--text-secondary)] outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>

              {/* Simulated Stripe card input */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Card Details</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]">
                  <CreditCard className="w-5 h-5 text-[var(--text-secondary)]" />
                  <span className="text-[var(--text-secondary)] text-sm">4242 4242 4242 4242 &nbsp; 12/28 &nbsp; 123</span>
                  <Shield className="w-4 h-4 text-emerald-400 ml-auto" />
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  This is a demo. No real payment will be processed.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep("select")}
                  className="px-6 py-3 border border-[var(--border)] text-[var(--text-secondary)] rounded-lg hover:bg-white/5 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay ${price}/mo
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Success */}
        {step === "success" && agent && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">You&apos;re All Set! 🎉</h1>
            <p className="text-[var(--text-secondary)] text-lg mb-2">
              <span className="text-white font-medium">{agent.name}</span> is now a{" "}
              <span className={selectedTier === "spotlight" ? "text-rose-400 font-medium" : "text-amber-400 font-medium"}>
                {tier.name}
              </span>{" "}
              listing on AgentForge.
            </p>
            <p className="text-[var(--text-secondary)] mb-8">
              Your upgrade will be live within 24 hours. You&apos;ll receive a confirmation email with next steps.
            </p>

            <div className="glow-border rounded-xl bg-[var(--bg-card)] p-6 mb-8 max-w-md mx-auto">
              <h3 className="text-sm font-medium text-white mb-4">What happens next:</h3>
              <ul className="space-y-3 text-left">
                {[
                  "Your listing will be reviewed and activated within 24 hours",
                  "You'll receive analytics access via email",
                  selectedTier === "spotlight" ? "Your agent will appear on the homepage" : "Your agent will be featured in category pages",
                  "Monthly billing starts today — cancel anytime",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                    <Check className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/agents/${agent.id}`}
                className="px-6 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                View Your Listing
              </Link>
              <Link
                href="/agents"
                className="px-6 py-3 border border-[var(--border)] text-[var(--text-secondary)] font-medium rounded-lg hover:bg-white/5 transition-colors"
              >
                Browse All Agents
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
