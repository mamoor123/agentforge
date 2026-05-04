"use client";

import { useEffect } from "react";

/**
 * Tracks affiliate link clicks on agent detail pages.
 * Adds UTM parameters and logs clicks for analytics.
 * Replace the tracking endpoint with your real analytics backend.
 */
export default function AffiliateTracker({ agentId }: { agentId: string }) {
  useEffect(() => {
    function handleClick(e: Event) {
      const target = e.target as HTMLElement;
      const link = target.closest("a[data-affiliate='true']") as HTMLAnchorElement | null;
      if (!link) return;

      const id = link.getAttribute("data-agent-id") || agentId;
      const url = new URL(link.href);

      // Add UTM tracking params
      url.searchParams.set("utm_source", "agentforge");
      url.searchParams.set("utm_medium", "directory");
      url.searchParams.set("utm_campaign", "agent_listing");
      url.searchParams.set("utm_content", id);

      link.href = url.toString();

      // Log the click (replace with your analytics endpoint)
      try {
        const clicks = JSON.parse(localStorage.getItem("af_affiliate_clicks") || "[]");
        clicks.push({
          agentId: id,
          timestamp: new Date().toISOString(),
          url: url.toString(),
        });
        // Keep last 100 clicks
        if (clicks.length > 100) clicks.splice(0, clicks.length - 100);
        localStorage.setItem("af_affiliate_clicks", JSON.stringify(clicks));
      } catch {
        // silent fail
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [agentId]);

  return null;
}
