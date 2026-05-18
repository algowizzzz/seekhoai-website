// Captures the purchase and persists to Supabase.
// Server-side responsibilities:
//   1. Validate the coupon code (don't trust client-sent amount).
//   2. Recompute the final price from the canonical base price + coupon.
//   3. Persist the purchase.
//   4. Notify the admin email.
//   5. Return the Udemy course URL so the client can redirect — no login required.
//
// To swap in real Stripe Checkout: see comments at end of this file.

import { NextResponse } from "next/server";
import { z } from "zod";
import { insertPurchase } from "@/lib/supabase";
import {
  discountCode,
  pricing,
  udemyCourseUrl,
} from "@/content/content";
import { notify } from "@/lib/notify";

const schema = z.object({
  email: z
    .string()
    .min(5)
    .regex(/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/, "invalid_email_format"),
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

  // Validate coupon server-side against the canonical list. We never trust the
  // client's claimed `amount` — we recompute it here.
  const rawCode = (parsed.data.couponCode ?? "").trim().toUpperCase();
  const couponValid = rawCode === discountCode.code;
  const appliedCode = couponValid ? discountCode.code : null;
  const appliedPct = couponValid ? discountCode.pct : 0;
  const amount = +(pricing.price * (1 - appliedPct)).toFixed(2);

  const sessionId = `mock_${crypto.randomUUID()}`;

  try {
    await insertPurchase({
      email: parsed.data.email,
      amount,
      coupon_code: appliedCode,
      session_id: sessionId,
    });
  } catch (err) {
    console.error("[checkout] persist failed", err);
    return NextResponse.json({ ok: false, error: "persist_failed" }, { status: 500 });
  }

  // Admin alert (best-effort; never block the response on failure)
  notify
    .adminPurchase({
      email: parsed.data.email,
      amount,
      couponCode: appliedCode,
      sessionId,
    })
    .catch(() => undefined);

  await new Promise((r) => setTimeout(r, 800));

  return NextResponse.json({
    ok: true,
    sessionId,
    amount,
    couponApplied: couponValid,
    redirectUrl: udemyCourseUrl,
  });
}
