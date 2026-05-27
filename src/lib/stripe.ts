// Server-side Stripe client. Reads STRIPE_SECRET_KEY from env.
//
// To enable real payments:
//   1. Create a Stripe account at https://stripe.com
//   2. Create a Product + Price for the Complete AI Bootcamp ($499 one-off).
//   3. Add to .env.local (and Vercel Project Settings):
//        STRIPE_SECRET_KEY=sk_test_...            ← server-only
//        STRIPE_PRICE_ID=price_...                ← the recurring/one-off price id
//        STRIPE_WEBHOOK_SECRET=whsec_...          ← from `stripe listen` or dashboard webhook
//        NEXT_PUBLIC_SITE_URL=https://seekhoai.pk ← for success/cancel redirects
//
// If STRIPE_SECRET_KEY is missing, getStripe() returns null and the checkout
// API responds with a clear "not_configured" error so dev still works without
// breaking the build.

import Stripe from "stripe";

let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (cached) return cached;
  cached = new Stripe(key, {
    // Pin to a recent stable API version; Stripe rolls these forward but
    // pinning avoids silent behavior changes on minor SDK upgrades.
    apiVersion: "2026-05-27.dahlia",
  });
  return cached;
}

export function getStripePriceId(): string | null {
  return process.env.STRIPE_PRICE_ID ?? null;
}

export function getStripeWebhookSecret(): string | null {
  return process.env.STRIPE_WEBHOOK_SECRET ?? null;
}

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
    "http://localhost:3000"
  );
}
