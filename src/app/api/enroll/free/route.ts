// Free-course signup. Captures Name + Email + Phone, links a Supabase auth
// user, persists to email_signups, forwards the lead to LEAD_WEBHOOK_URL
// (Google Sheets / Zapier / AiSensy / etc.), fires admin + welcome emails,
// and returns the Udemy enroll URL.

import { NextResponse } from "next/server";
import { z } from "zod";
import { ensureAuthUser, insertEmailSignup } from "@/lib/supabase";
import { freeIntro, brand } from "@/content/content";
import { notify } from "@/lib/notify";
import { forwardLeadToWebhook } from "@/lib/lead-webhook";

const schema = z.object({
  email: z
    .string()
    .min(5)
    .regex(/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/, "invalid_email_format"),
  phone: z.string().nullable().optional(),
  name: z.string().max(120).nullable().optional(),
});

const SOURCE = "free_course";

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
  const name = parsed.data.name?.toString().trim() || null;

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
      name,
      source: SOURCE,
      user_id: userId,
    });
  } catch (err) {
    console.error("[enroll/free] persist failed", err);
    return NextResponse.json({ ok: false, error: "persist_failed" }, { status: 500 });
  }

  // Best-effort: forward to outbound webhook + fire emails. None of these
  // block the response — the lead is already safe in Supabase.
  Promise.allSettled([
    forwardLeadToWebhook({
      name,
      email,
      phone,
      source: SOURCE,
      receivedAt: new Date().toISOString(),
      site: `https://${brand.domain}`,
    }),
    notify.welcomeSeries({ email, source: SOURCE }),
    notify.adminSignup({ email, phone, source: SOURCE }),
  ]).catch(() => undefined);

  return NextResponse.json({
    ok: true,
    redirectUrl: freeIntro.enrollUrl,
  });
}
