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

// Resolves the absolute site URL used for Stripe success_url / cancel_url.
// Priority:
//   1. NEXT_PUBLIC_SITE_URL  — explicit override, supports custom domains
//      (e.g. https://seekhoai.pk in prod, http://localhost:3000 in dev).
//   2. VERCEL_URL            — auto-injected on every Vercel deployment,
//      e.g. "seekhoai-lake.vercel.app". We prepend https:// since this
//      var omits the scheme.
//   3. http://localhost:3000 — last-ditch local dev fallback.
//
// We validate with `new URL()` and only return values that parse to an
// absolute URL with an http(s) scheme. Stripe rejects relative or
// scheme-less URLs with a generic "Not a valid URL" error, so we'd rather
// surface a typo here than have it die deep inside the SDK.
export function getSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : undefined,
    "http://localhost:3000",
  ];

  for (const raw of candidates) {
    if (!raw) continue;
    const cleaned = raw.trim().replace(/\/+$/, "");
    try {
      const parsed = new URL(cleaned);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return cleaned;
      }
    } catch {
      // Try next candidate.
    }
  }
  // Should never reach here — localhost is always valid — but TypeScript
  // wants a definite return.
  return "http://localhost:3000";
}
