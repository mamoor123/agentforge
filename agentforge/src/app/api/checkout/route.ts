import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/checkout
 * Creates a Lemon Squeezy checkout session.
 *
 * In production, set these env vars:
 *   LEMONSQUEEZY_API_KEY=your_api_key
 *   LEMONSQUEEZY_STORE_ID=your_store_id
 *
 * Create products in Lemon Squeezy dashboard:
 *   - "Featured Listing" product with a $75/month variant
 *   - "Spotlight Listing" product with a $200/month variant
 *
 * Then put the variant IDs in:
 *   LS_FEATURED_VARIANT_ID=xxx
 *   LS_SPOTLIGHT_VARIANT_ID=xxx
 */

const LEMONSQUEEZY_API_KEY = process.env.LEMONSQUEEZY_API_KEY;
const LEMONSQUEEZY_STORE_ID = process.env.LEMONSQUEEZY_STORE_ID;

// Map tier names to Lemon Squeezy variant IDs
const TIER_VARIANT_MAP: Record<string, string> = {
  featured: process.env.LS_FEATURED_VARIANT_ID || "",
  spotlight: process.env.LS_SPOTLIGHT_VARIANT_ID || "",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { variantId, tier, email, name, customData } = body;

    // Resolve variant ID from tier name or direct ID
    const resolvedVariantId = variantId || TIER_VARIANT_MAP[tier];

    if (!resolvedVariantId) {
      return NextResponse.json(
        { error: "Invalid tier or variant ID" },
        { status: 400 }
      );
    }

    // If no API key configured, return a demo checkout URL
    if (!LEMONSQUEEZY_API_KEY || !LEMONSQUEEZY_STORE_ID) {
      // Demo mode: return a placeholder URL
      // In production, this will be a real Lemon Squeezy checkout URL
      const demoUrl = `https://demo.lemonsqueezy.com/checkout/buy/${resolvedVariantId}?embed=1&logo=0&desc=0`;
      return NextResponse.json({
        url: demoUrl,
        demo: true,
        message: "Set LEMONSQUEEZY_API_KEY and LEMONSQUEEZY_STORE_ID env vars for live checkouts",
      });
    }

    // Create checkout via Lemon Squeezy API
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${LEMONSQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            custom_price: null,
            product_options: {
              redirect_url: `${request.headers.get("origin") || "https://agentforge.ai"}/claim?success=1`,
              receipt_button_text: "Go to AgentForge",
              receipt_link_url: `${request.headers.get("origin") || "https://agentforge.ai"}/claim?success=1`,
              receipt_thank_you_note: "Thank you for upgrading your listing on AgentForge!",
            },
            checkout_options: {
              embed: true,
              logo: false,
              desc: false,
              discount: true,
            },
            checkout_data: {
              email: email || undefined,
              name: name || undefined,
              custom: customData || {},
            },
            preview: false,
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: String(LEMONSQUEEZY_STORE_ID),
              },
            },
            variant: {
              data: {
                type: "variants",
                id: String(resolvedVariantId),
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Lemon Squeezy API error:", error);
      return NextResponse.json(
        { error: "Failed to create checkout" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const checkoutUrl = data.data.attributes.url;

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
