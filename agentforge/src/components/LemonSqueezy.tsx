"use client";

import { useEffect, useCallback, ReactNode } from "react";

declare global {
  interface Window {
    createLemonSqueezy?: () => void;
    LemonSqueezy?: {
      Setup: (options: { eventHandler: (event: LSQEvent) => void }) => void;
      Refresh: () => void;
    };
  }
}

interface LSQEvent {
  event: string;
  data?: {
    checkout?: {
      id: string;
      url: string;
    };
    customer?: {
      email: string;
      name: string;
    };
    order?: {
      id: string;
      total: number;
      status: string;
      identifier: string;
    };
  };
}

interface LemonSqueezyButtonProps {
  checkoutUrl: string;
  children: ReactNode;
  className?: string;
  onSuccess?: (data: LSQEvent["data"]) => void;
}

/**
 * Lemon Squeezy checkout button component.
 * Opens a checkout overlay when clicked.
 *
 * Usage:
 *   <LemonSqueezyButton checkoutUrl="https://your-store.lemonsqueezy.com/checkout/buy/xxx">
 *     Pay Now
 *   </LemonSqueezyButton>
 */
export function LemonSqueezyButton({ checkoutUrl, children, className, onSuccess }: LemonSqueezyButtonProps) {
  useEffect(() => {
    // Load lemon.js script
    if (!document.querySelector('script[src*="lemonsqueezy"]')) {
      const script = document.createElement("script");
      script.src = "https://assets.lemonsqueezy.com/lemon.js";
      script.defer = true;
      document.head.appendChild(script);
    }

    // Initialize once loaded
    const interval = setInterval(() => {
      if (window.createLemonSqueezy) {
        window.createLemonSqueezy();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Set up event handler
    const interval = setInterval(() => {
      if (window.LemonSqueezy) {
        window.LemonSqueezy.Setup({
          eventHandler: (event: LSQEvent) => {
            if (event.event === "Checkout.Success" && onSuccess) {
              onSuccess(event.data);
            }
          },
        });
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onSuccess]);

  return (
    <a
      href={checkoutUrl}
      className={`lemonsqueezy-button ${className || ""}`}
    >
      {children}
    </a>
  );
}

/**
 * Hook to create a Lemon Squeezy checkout URL via our API.
 * Returns a function that opens the checkout overlay.
 */
export function useLemonSqueezyCheckout() {
  const createCheckout = useCallback(async ({
    variantId,
    tier,
    email,
    name,
    customData,
  }: {
    variantId: string;
    tier?: string;
    email?: string;
    name?: string;
    customData?: Record<string, string>;
  }) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variantId, tier, email, name, customData }),
    });

    if (!res.ok) {
      throw new Error("Failed to create checkout");
    }

    const { url } = await res.json();
    return url;
  }, []);

  return { createCheckout };
}
