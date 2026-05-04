import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

/**
 * POST /api/webhooks/lemonsqueezy
 * Handles Lemon Squeezy webhook events.
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
 * Set env var:
 *   LEMONSQUEEZY_WEBHOOK_SECRET=your_signing_secret
 */

const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

function verifyWebhookSignature(payload: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) return true; // Skip verification in dev
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  const digest = hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
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

    switch (meta?.event_name) {
      case "order_created": {
        // Payment successful
        const orderId = data?.id;
        const customerEmail = data?.attributes?.user_email;
        const total = data?.attributes?.total;
        const customData = data?.attributes?.first_order_item?.custom_data;

        console.log(`[Order Created] #${orderId} - $${total / 100} from ${customerEmail}`);

        // TODO: Store in your database
        // await db.upgradeListing({
        //   agentId: customData?.agent_id,
        //   tier: customData?.tier,
        //   orderId,
        //   email: customerEmail,
        //   status: "active",
        // });

        break;
      }

      case "subscription_created": {
        // New subscription
        const subId = data?.id;
        const status = data?.attributes?.status;
        const variantId = data?.attributes?.variant_id;
        const customerEmail = data?.attributes?.user_email;

        console.log(`[Subscription Created] ${subId} - Status: ${status}`);

        // TODO: Activate premium listing
        // await db.activateSubscription(subId, variantId, customerEmail);

        break;
      }

      case "subscription_updated": {
        // Subscription changed (upgrade/downgrade)
        const subId = data?.id;
        const status = data?.attributes?.status;
        const variantId = data?.attributes?.variant_id;

        console.log(`[Subscription Updated] ${subId} - Status: ${status}, Variant: ${variantId}`);

        // TODO: Update listing tier
        // await db.updateSubscription(subId, variantId, status);

        break;
      }

      case "subscription_cancelled": {
        // Subscription cancelled
        const subId = data?.id;

        console.log(`[Subscription Cancelled] ${subId}`);

        // TODO: Downgrade listing to basic
        // await db.cancelSubscription(subId);

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
