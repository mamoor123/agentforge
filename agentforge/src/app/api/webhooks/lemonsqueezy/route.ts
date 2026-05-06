import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

/**
 * POST /api/webhooks/lemonsqueezy
 * Handles Lemon Squeezy webhook events and persists data to Supabase.
 *
 * Set this URL in your Lemon Squeezy dashboard:
 *   Settings > Webhooks > Add endpoint
 *   URL: https://your-domain.com/api/webhooks/lemonsqueezy
 *
 * Select events:
 *   - order_created
 *   - subscription_created
 *   - subscription_updated
 *   - subscription_cancelled
 *
 * Required env vars:
 *   LEMONSQUEEZY_WEBHOOK_SECRET=your_signing_secret
 *   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
 */

const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

/**
 * Create a Supabase client with the service role key for admin access.
 * Webhooks have no user session, so we need the service role key
 * to bypass RLS and write directly to the database.
 */
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function verifyWebhookSignature(payload: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) return true; // Skip verification in dev
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  const digest = hmac.update(payload).digest("hex");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(digest)
    );
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-signature") || "";

    // Verify webhook signature
    if (WEBHOOK_SECRET && !verifyWebhookSignature(body, signature)) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);
    const { meta, data } = event;

    console.log(`[Lemon Squeezy] Event: ${meta?.event_name}`, {
      id: data?.id,
      type: data?.type,
    });

    const supabase = getSupabaseAdmin();

    switch (meta?.event_name) {
      case "order_created":
      case "subscription_created": {
        // Extract custom data (passed from checkout)
        const customData =
          data?.attributes?.custom_data ||
          data?.attributes?.first_order_item?.custom_data ||
          {};

        const agentId = customData.agent_id;
        const tier = customData.tier || "basic";
        const customerEmail =
          data?.attributes?.user_email ||
          data?.attributes?.customer_email ||
          customData.email;

        if (!agentId) {
          console.warn("[Webhook] No agent_id in custom_data, skipping");
          break;
        }

        // Upsert listing
        const { data: listing, error: listingError } = await supabase
          .from("listings")
          .upsert(
            {
              agent_id: agentId,
              tier,
              email: customerEmail,
              name: customData.name || null,
              status: "active",
              updated_at: new Date().toISOString(),
            },
            { onConflict: "agent_id" }
          )
          .select("id")
          .single();

        if (listingError) {
          console.error("[Webhook] Failed to upsert listing:", listingError);
          break;
        }

        // Insert subscription record
        const lsId = meta?.event_name === "subscription_created"
          ? String(data?.id)
          : String(data?.id); // order ID for one-time payments

        const { error: subError } = await supabase
          .from("subscriptions")
          .upsert(
            {
              listing_id: listing.id,
              lemon_squeezy_id: lsId,
              variant_id: data?.attributes?.variant_id
                ? String(data.attributes.variant_id)
                : null,
              status: data?.attributes?.status || "active",
              customer_email: customerEmail,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "lemon_squeezy_id" }
          );

        if (subError) {
          console.error("[Webhook] Failed to upsert subscription:", subError);
        }

        console.log(
          `[Webhook] Listing activated: agent=${agentId}, tier=${tier}, listing=${listing.id}`
        );
        break;
      }

      case "subscription_updated": {
        const subId = String(data?.id);
        const status = data?.attributes?.status;
        const variantId = data?.attributes?.variant_id
          ? String(data.attributes.variant_id)
          : null;

        // Update subscription record
        const { error: updateError } = await supabase
          .from("subscriptions")
          .update({
            status,
            variant_id: variantId,
            updated_at: new Date().toISOString(),
          })
          .eq("lemon_squeezy_id", subId);

        if (updateError) {
          console.error("[Webhook] Failed to update subscription:", updateError);
        }

        console.log(`[Webhook] Subscription updated: ${subId}, status=${status}`);
        break;
      }

      case "subscription_cancelled": {
        const subId = String(data?.id);

        // Find the subscription to get its listing_id
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("listing_id")
          .eq("lemon_squeezy_id", subId)
          .single();

        if (subscription) {
          // Mark the listing as cancelled
          const { error: cancelError } = await supabase
            .from("listings")
            .update({
              status: "cancelled",
              updated_at: new Date().toISOString(),
            })
            .eq("id", subscription.listing_id);

          if (cancelError) {
            console.error("[Webhook] Failed to cancel listing:", cancelError);
          }

          // Update subscription status too
          await supabase
            .from("subscriptions")
            .update({
              status: "cancelled",
              updated_at: new Date().toISOString(),
            })
            .eq("lemon_squeezy_id", subId);

          console.log(`[Webhook] Subscription cancelled: ${subId}, listing=${subscription.listing_id}`);
        } else {
          console.warn(`[Webhook] Subscription not found for cancellation: ${subId}`);
        }
        break;
      }

      default:
        console.log(`[Unhandled event] ${meta?.event_name}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
