import { createClient } from "@/lib/supabase/server";
import type { ListingTier } from "@/data/agents";

/**
 * Fetch active listing overrides from Supabase.
 * Returns a map of agent_id → tier for agents with paid listings.
 */
export async function getListingOverrides(): Promise<Record<string, ListingTier>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("listings")
      .select("agent_id, tier")
      .eq("status", "active");

    if (error || !data) return {};

    const overrides: Record<string, ListingTier> = {};
    for (const row of data) {
      overrides[row.agent_id] = row.tier as ListingTier;
    }
    return overrides;
  } catch {
    return {};
  }
}

/**
 * Get the effective tier for an agent.
 * Checks Supabase listings first, falls back to hardcoded tier.
 */
export async function getEffectiveTier(
  agentId: string,
  fallback: ListingTier = "basic"
): Promise<ListingTier> {
  const overrides = await getListingOverrides();
  return overrides[agentId] || fallback;
}
