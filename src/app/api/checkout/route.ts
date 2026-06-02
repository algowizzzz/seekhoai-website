// Creates a Stripe Checkout Session for the paid Complete AI Bootcamp.
//
// Responsibilities:
//   1. Validate the coupon code server-side (don't trust client-sent amount).
//   2. Recompute the final price from the canonical base price + coupon.
//   3. Create a Stripe Checkout Session with that amount.
//   4. Persist a "pending" purchase row keyed by the Stripe session id.
//   5. Return the Stripe-hosted checkout URL; the client redirects to it.
//
// Fulfillment happens in /api/stripe/webhook on `checkout.session.completed`,
// which flips the purchase row to status="paid" and fires the confirmation
// + admin notification emails.

import { NextResponse } from "next/server";
import { z } from "zod";
import { ensureAuthUser, insertPurchase } from "@/lib/supabase";
import { pricing, brand } from "@/content/content";
import { getStripe, getStripePriceId, getSiteUrl } from "@/lib/stripe";

const schema = z.object({
  email: z
    .string()
    .min(5)
    .regex(/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/, "invalid_email_format"),
  phone: z.string().nullable().optional(),
  // Accepted for backwards-compat with old clients; ignored — single PKR price.
  couponCode: z.string().nullable().optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    // Surface the misconfig clearly so dev sees it immediately rather than
    // getting a confusing redirect-to-nothing.
    return NextResponse.json(
      { ok: false, error: "stripe_not_configured" },
      { status: 500 },
    );
  }

  const email = parsed.data.email.trim().toLowerCase();
  const phone = parsed.data.phone?.toString().trim() || null;

  // Single PKR price. No coupon path; the 4999→999 IS the discount.
  const amount = pricing.price;
  const amountSubunits = Math.round(amount * 100);

  // Use a configured STRIPE_PRICE_ID when one exists (Stripe Dashboard owns
  // the canonical price); otherwise inline price_data in PKR.
  const stripePriceId = getStripePriceId();
  const siteUrl = getSiteUrl();

  let session: Awaited<ReturnType<typeof stripe.checkout.sessions.create>>;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        !stripePriceId
          ? {
              quantity: 1,
              price_data: {
                currency: "pkr",
                unit_amount: amountSubunits,
                product_data: {
                  name: brand.course,
                },
              },
            }
          : { quantity: 1, price: stripePriceId },
      ],
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?checkout=cancelled`,
      metadata: {
        email,
        phone: phone ?? "",
      },
    });
  } catch (err) {
    console.error("[checkout] stripe session create failed", err);
    return NextResponse.json(
      { ok: false, error: "stripe_session_failed" },
      { status: 502 },
    );
  }

  if (!session.url) {
    return NextResponse.json(
      { ok: false, error: "stripe_no_redirect_url" },
      { status: 502 },
    );
  }

  // Link the buyer to a stable identity in Supabase Auth.
  let userId: string | null = null;
  try {
    userId = await ensureAuthUser(email);
  } catch (err) {
    console.error("[checkout] ensureAuthUser failed", err);
  }

  // Persist a pending row keyed by the Stripe session id. The webhook will
  // flip status to "paid" once Stripe confirms the payment.
  try {
    await insertPurchase({
      email,
      phone,
      amount,
      coupon_code: null,
      session_id: session.id,
      status: "pending",
      user_id: userId,
    });
  } catch (err) {
    // Log but don't block the redirect — the webhook can still create the
    // row on `checkout.session.completed` if persistence here failed.
    console.error("[checkout] pending persist failed", err);
  }

  return NextResponse.json({
    ok: true,
    sessionId: session.id,
    amount,
    redirectUrl: session.url,
  });
}
