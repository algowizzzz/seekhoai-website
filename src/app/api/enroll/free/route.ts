// Free-course signup. No payment — just captures email + optional phone,
// links a Supabase auth user, fires admin + welcome emails, and returns the
// Udemy enroll URL (with the free coupon baked in) for the client to redirect.

import { NextResponse } from "next/server";
import { z } from "zod";
import { ensureAuthUser, insertEmailSignup } from "@/lib/supabase";
import { freeIntro } from "@/content/content";
import { notify } from "@/lib/notify";

const schema = z.object({
  email: z
    .string()
    .min(5)
    .regex(/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/, "invalid_email_format"),
  phone: z.string().nullable().optional(),
  // Optional today. The /free page collects this; persistence will pick it
  // up once the email_signups table grows a `name` column.
  name: z.string().max(120).nullable().optional(),
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

  const email = parsed.data.email.trim().toLowerCase();
  const phone = parsed.data.phone?.toString().trim() || null;

  let userId: string | null = null;
  try {
    userId = await ensureAuthUser(email);
  } catch (err) {
    console.error("[enroll/free] ensureAuthUser failed", err);
  }

  try {
    await insertEmailSignup({
      email,
      phone,
      source: "free_course",
      user_id: userId,
    });
  } catch (err) {
    console.error("[enroll/free] persist failed", err);
    return NextResponse.json({ ok: false, error: "persist_failed" }, { status: 500 });
  }

  // Best-effort: never block the response on email side effects.
  Promise.allSettled([
    notify.welcomeSeries({ email, source: "free_course" }),
    notify.adminSignup({ email, phone, source: "free_course" }),
  ]).catch(() => undefined);

  return NextResponse.json({
    ok: true,
    redirectUrl: freeIntro.enrollUrl,
  });
}
