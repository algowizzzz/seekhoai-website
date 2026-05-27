// Stripe webhook handler — fulfillment for paid enrollments.
//
// Stripe POSTs here on `checkout.session.completed` (configure in the Stripe
// Dashboard or via `stripe listen --forward-to localhost:3000/api/stripe/webhook`).
// We verify the signature using STRIPE_WEBHOOK_SECRET, then flip the matching
// purchase row to "paid" and fire confirmation + admin emails.
//
// IMPORTANT: this route reads the raw request body for signature verification,
// so we must NOT use Next's automatic JSON parsing. We use `req.text()` instead
// and disable any body parsing config.

import { NextResponse } from "next/server";
import type Stripe from "stripe";
import {
  ensureAuthUser,
  insertPurchase,
  markPurchasePaid,
} from "@/lib/supabase";
import {
  getStripe,
  getStripeWebhookSecret,
} from "@/lib/stripe";
import { notify } from "@/lib/notify";

export const runtime = "nodejs";
// Stripe webhook bodies must be read raw for signature verification.
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const stripe = getStripe();
  const whSecret = getStripeWebhookSecret();
  if (!stripe || !whSecret) {
    return NextResponse.json(
      { ok: false, error: "stripe_not_configured" },
      { status: 500 },
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { ok: false, error: "missing_signature" },
      { status: 400 },
    );
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, whSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    console.error("[stripe/webhook] signature verify failed", message);
    return NextResponse.json(
      { ok: false, error: "invalid_signature" },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const sessionId = session.id;
    const email =
      session.customer_details?.email ??
      session.customer_email ??
      session.metadata?.email ??
      null;
    const phone = session.metadata?.phone || null;
    const couponCode = session.metadata?.coupon_code || null;
    const amount = (session.amount_total ?? 0) / 100;

    if (!email) {
      console.error("[stripe/webhook] no email on completed session", sessionId);
      return NextResponse.json({ ok: false, error: "no_email" }, { status: 200 });
    }

    // Try to flip the existing pending row. If it doesn't exist (e.g. the
    // pre-redirect insert failed), create one now so we still have a record.
    try {
      await markPurchasePaid(sessionId);
    } catch (err) {
      console.error("[stripe/webhook] markPaid failed; will try insert", err);
      try {
        const userId = await ensureAuthUser(email);
        await insertPurchase({
          email,
          phone,
          amount,
          coupon_code: couponCode,
          session_id: sessionId,
          status: "paid",
          user_id: userId,
        });
      } catch (insertErr) {
        console.error("[stripe/webhook] insert fallback failed", insertErr);
      }
    }

    Promise.allSettled([
      notify.orderConfirmation({
        email,
        amount,
        couponCode,
        sessionId,
      }),
      notify.adminPurchase({
        email,
        amount,
        couponCode,
        sessionId,
      }),
    ]).catch(() => undefined);
  }

  return NextResponse.json({ ok: true, received: true });
}
