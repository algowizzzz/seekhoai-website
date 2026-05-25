// Captures email signups (hero form + popup) and persists to Supabase.
// On success it also:
//  - fires the welcome email series (7 emails) via Supabase Edge Function
//  - notifies the admin email so we can act on it
//
// See src/lib/supabase.ts for env-var setup.

import { NextResponse } from "next/server";
import { z } from "zod";
import { ensureAuthUser, insertEmailSignup } from "@/lib/supabase";
import { discountCode } from "@/content/content";
import { notify } from "@/lib/notify";

// Strict format: must contain @ and a TLD of ≥2 letters.
// Phone optional — if provided, must have ≥7 digits after stripping formatting.
const schema = z.object({
  email: z
    .string()
    .min(5)
    .regex(/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/, "invalid_email_format"),
  phone: z
    .string()
    .max(40)
    .optional()
    .refine(
      (v) => !v || v.replace(/[\s+\-()]/g, "").replace(/\D/g, "").length >= 7,
      "invalid_phone_format",
    ),
  source: z.string().max(40).optional(),
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
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const { email } = parsed.data;
  const phone = parsed.data.phone ?? null;
  const source = parsed.data.source ?? "hero";

  // Get/create Supabase Auth user so signups link to a stable identity.
  // Non-fatal if it fails — we still save the signup row.
  let userId: string | null = null;
  try {
    userId = await ensureAuthUser(email);
  } catch (err) {
    console.error("[email] ensureAuthUser failed", err);
  }

  try {
    await insertEmailSignup({ email, phone, source, user_id: userId });
  } catch (err) {
    console.error("[email] persist failed", err);
    return NextResponse.json({ ok: false, error: "persist_failed" }, { status: 500 });
  }

  // Fire admin alert + welcome series (best-effort; never block the response on failure)
  await Promise.allSettled([
    notify.adminSignup({ email, phone, source }),
    notify.welcomeSeries({ email, source }),
  ]);

  return NextResponse.json({
    ok: true,
    couponCode: discountCode.code,
    discountPct: discountCode.pct,
  });
}
