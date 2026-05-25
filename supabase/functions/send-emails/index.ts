// Supabase Edge Function: send-emails
//
// Single endpoint that dispatches outbound email by `kind`:
//
//   Customer-facing transactional/lifecycle:
//     "welcome-series"             → 7-email welcome blast on new signup
//     "order-confirmation"         → fires immediately after a purchase
//
//   Admin notifications:
//     "admin-signup"               → notify admin that someone signed up
//     "admin-purchase"             → notify admin that someone purchased
//
//   Scheduled / cron-driven (server queries DB then sends to qualifying users):
//     "scheduled-pending-cart"      → signups 24-48h old with no purchase
//     "scheduled-weekly-newsletter" → broadcast to ALL signups (buyers + non-buyers)
//     "scheduled-weekly-non-buyer"  → signups >=7d old with no purchase
//
// DEPLOY:
//   supabase functions deploy send-emails --project-ref <your-ref>
//
// REQUIRED SECRETS (Supabase Dashboard → Edge Functions → send-emails → Secrets):
//   SMTP_HOST       e.g. smtp.gmail.com
//   SMTP_PORT       e.g. 465
//   SMTP_USERNAME   your full email
//   SMTP_PASSWORD   app password (Gmail) or SMTP password
//   FROM_EMAIL      who emails come "from", e.g. SeekhoAI <hello@seekhoai.pk>
//   ADMIN_EMAIL     e.g. sa5425592@gmail.com
//   SUPABASE_URL    auto-injected for scheduled queries
//   SUPABASE_SERVICE_ROLE_KEY  auto-injected for scheduled queries
//
// CALL FROM SERVER:
//   POST {SUPABASE_URL}/functions/v1/send-emails
//   Authorization: Bearer {SERVICE_ROLE_KEY}
//   Body: { kind: "...", ...payload }

import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { welcomeEmails } from "./welcome-emails.ts";
import {
  orderConfirmationEmail,
  pendingCartEmail,
  weeklyNewsletterEmail,
  weeklyNonBuyerEmail,
} from "./lifecycle-emails.ts";

const SMTP_HOST = Deno.env.get("SMTP_HOST") ?? "";
const SMTP_PORT = Number(Deno.env.get("SMTP_PORT") ?? "465");
const SMTP_USERNAME = Deno.env.get("SMTP_USERNAME") ?? "";
const SMTP_PASSWORD = Deno.env.get("SMTP_PASSWORD") ?? "";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "SeekhoAI <hello@seekhoai.pk>";
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") ?? "sa5425592@gmail.com";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function makeSmtp(): SMTPClient {
  if (!SMTP_HOST || !SMTP_USERNAME || !SMTP_PASSWORD) {
    throw new Error(
      "SMTP env vars not set. Configure SMTP_HOST/PORT/USERNAME/PASSWORD in function Secrets.",
    );
  }
  return new SMTPClient({
    connection: {
      hostname: SMTP_HOST,
      port: SMTP_PORT,
      tls: SMTP_PORT === 465,
      auth: { username: SMTP_USERNAME, password: SMTP_PASSWORD },
    },
  });
}

// Strip whitespace between tags so quoted-printable encoding doesn't leak
// stray "=20" sequences into the rendered email body.
function minifyHtml(html: string): string {
  return html
    .replace(/>\s+</g, "><")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n+/g, "\n")
    .trim();
}

async function sendOne(
  to: string,
  subject: string,
  text: string,
  html: string,
): Promise<void> {
  const client = makeSmtp();
  try {
    await client.send({
      from: FROM_EMAIL,
      to,
      subject,
      content: text,
      html: minifyHtml(html),
    });
  } finally {
    await client.close();
  }
}

function db() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing");
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// ── Customer-facing handlers ─────────────────────────────────────────────

async function handleWelcomeSeries(email: string): Promise<void> {
  for (const e of welcomeEmails) {
    try {
      await sendOne(email, e.subject, e.text, e.html);
    } catch (err) {
      console.error("[welcome-series] failed", e.subject, err);
    }
  }
}

async function handleOrderConfirmation(payload: {
  email: string;
  amount: number;
  couponCode: string | null;
  sessionId: string;
}): Promise<void> {
  const e = orderConfirmationEmail({
    amount: payload.amount,
    couponCode: payload.couponCode,
    sessionId: payload.sessionId,
  });
  await sendOne(payload.email, e.subject, e.text, e.html);
}

// ── Admin handlers ───────────────────────────────────────────────────────

async function handleAdminSignup(
  email: string,
  phone: string | null,
  source: string,
): Promise<void> {
  const subject = `New SeekhoAI signup — ${email}`;
  const phoneLine = phone ? `Phone:  ${phone}\n` : "";
  const text = `A new user signed up.\n\nEmail:  ${email}\n${phoneLine}Source: ${source}\nTime:   ${new Date().toISOString()}`;
  const html = `<h2>New SeekhoAI signup</h2>
<table>
  <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
  ${phone ? `<tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>` : ""}
  <tr><td><strong>Source:</strong></td><td>${source}</td></tr>
  <tr><td><strong>Time:</strong></td><td>${new Date().toISOString()}</td></tr>
</table>`;
  await sendOne(ADMIN_EMAIL, subject, text, html);
}

async function handleAdminPurchase(payload: {
  email: string;
  amount: number;
  couponCode: string | null;
  sessionId: string;
}): Promise<void> {
  const { email, amount, couponCode, sessionId } = payload;
  const subject = `New SeekhoAI purchase — ${email} ($${amount})`;
  const text = `A new purchase came through.

Email:    ${email}
Amount:   $${amount}
Coupon:   ${couponCode ?? "none"}
Session:  ${sessionId}
Time:     ${new Date().toISOString()}`;
  const html = `<h2>New SeekhoAI purchase</h2>
<table>
  <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
  <tr><td><strong>Amount:</strong></td><td>$${amount}</td></tr>
  <tr><td><strong>Coupon:</strong></td><td>${couponCode ?? "none"}</td></tr>
  <tr><td><strong>Session:</strong></td><td>${sessionId}</td></tr>
  <tr><td><strong>Time:</strong></td><td>${new Date().toISOString()}</td></tr>
</table>`;
  await sendOne(ADMIN_EMAIL, subject, text, html);
}

// ── Scheduled handlers — query DB, find qualifying users, send ────────────

/**
 * Find signups created 24-48h ago that have NO matching purchase email,
 * and send each one the pending-cart email.
 * Intended to run hourly (or daily) via pg_cron.
 */
async function handleScheduledPendingCart(): Promise<{ sent: number }> {
  const sb = db();
  const now = Date.now();
  const cutoffOldIso = new Date(now - 48 * 60 * 60 * 1000).toISOString();
  const cutoffNewIso = new Date(now - 24 * 60 * 60 * 1000).toISOString();

  const { data: signups, error } = await sb
    .from("email_signups")
    .select("email,created_at")
    .gte("created_at", cutoffOldIso)
    .lte("created_at", cutoffNewIso);
  if (error) throw new Error(`pending-cart query failed: ${error.message}`);

  if (!signups || signups.length === 0) return { sent: 0 };

  // Cross-check against purchases
  const emails = signups.map((s) => s.email);
  const { data: buyers, error: buyersErr } = await sb
    .from("purchases")
    .select("email")
    .in("email", emails);
  if (buyersErr) throw new Error(`pending-cart buyers query: ${buyersErr.message}`);

  const buyerSet = new Set((buyers ?? []).map((b) => b.email));
  const nonBuyers = signups.filter((s) => !buyerSet.has(s.email));

  let sent = 0;
  for (const s of nonBuyers) {
    try {
      await sendOne(
        s.email,
        pendingCartEmail.subject,
        pendingCartEmail.text,
        pendingCartEmail.html,
      );
      sent++;
    } catch (err) {
      console.error("[pending-cart] failed", s.email, err);
    }
  }
  return { sent };
}

/**
 * Send the weekly newsletter to EVERY signup (buyers + non-buyers).
 * Intended to run weekly (e.g. Monday 09:00 UTC) via pg_cron.
 */
async function handleScheduledWeeklyNewsletter(): Promise<{ sent: number }> {
  const sb = db();

  const { data: signups, error } = await sb
    .from("email_signups")
    .select("email");
  if (error) throw new Error(`weekly newsletter query failed: ${error.message}`);

  if (!signups || signups.length === 0) return { sent: 0 };

  let sent = 0;
  for (const s of signups) {
    try {
      await sendOne(
        s.email,
        weeklyNewsletterEmail.subject,
        weeklyNewsletterEmail.text,
        weeklyNewsletterEmail.html,
      );
      sent++;
    } catch (err) {
      console.error("[weekly-newsletter] failed", s.email, err);
    }
  }
  return { sent };
}

/**
 * Find signups created >=7 days ago that have NO matching purchase email,
 * and send each one the weekly-non-buyer email.
 * Intended to run weekly (e.g. Monday 9am) via pg_cron.
 *
 * Note: this re-sends to the same non-buyer every week. If you want one-shot
 * behavior, add a `last_marketing_email_at` column to email_signups and
 * filter rows where it's null or older than 6 days.
 */
async function handleScheduledWeeklyNonBuyer(): Promise<{ sent: number }> {
  const sb = db();
  const cutoffIso = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data: signups, error } = await sb
    .from("email_signups")
    .select("email,created_at")
    .lte("created_at", cutoffIso);
  if (error) throw new Error(`weekly query failed: ${error.message}`);

  if (!signups || signups.length === 0) return { sent: 0 };

  const emails = signups.map((s) => s.email);
  const { data: buyers, error: buyersErr } = await sb
    .from("purchases")
    .select("email")
    .in("email", emails);
  if (buyersErr) throw new Error(`weekly buyers query: ${buyersErr.message}`);

  const buyerSet = new Set((buyers ?? []).map((b) => b.email));
  const nonBuyers = signups.filter((s) => !buyerSet.has(s.email));

  let sent = 0;
  for (const s of nonBuyers) {
    try {
      await sendOne(
        s.email,
        weeklyNonBuyerEmail.subject,
        weeklyNonBuyerEmail.text,
        weeklyNonBuyerEmail.html,
      );
      sent++;
    } catch (err) {
      console.error("[weekly-non-buyer] failed", s.email, err);
    }
  }
  return { sent };
}

// ── Server ──────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders() });
  }
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }

  const kind = String(body.kind ?? "");
  let extra: Record<string, unknown> = {};

  try {
    switch (kind) {
      case "welcome-series": {
        const email = String(body.email ?? "");
        if (!email) throw new Error("missing_email");
        await handleWelcomeSeries(email);
        break;
      }
      case "order-confirmation": {
        await handleOrderConfirmation({
          email: String(body.email ?? ""),
          amount: Number(body.amount ?? 0),
          couponCode: (body.couponCode as string | null) ?? null,
          sessionId: String(body.sessionId ?? ""),
        });
        break;
      }
      case "admin-signup": {
        const email = String(body.email ?? "");
        const phone = (body.phone as string | null) ?? null;
        const source = String(body.source ?? "unknown");
        if (!email) throw new Error("missing_email");
        await handleAdminSignup(email, phone, source);
        break;
      }
      case "admin-purchase": {
        await handleAdminPurchase({
          email: String(body.email ?? ""),
          amount: Number(body.amount ?? 0),
          couponCode: (body.couponCode as string | null) ?? null,
          sessionId: String(body.sessionId ?? ""),
        });
        break;
      }
      case "scheduled-pending-cart": {
        extra = await handleScheduledPendingCart();
        break;
      }
      case "scheduled-weekly-newsletter": {
        extra = await handleScheduledWeeklyNewsletter();
        break;
      }
      case "scheduled-weekly-non-buyer": {
        extra = await handleScheduledWeeklyNonBuyer();
        break;
      }
      default:
        return new Response(JSON.stringify({ error: "unknown_kind" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders() },
        });
    }
  } catch (err) {
    console.error("[send-emails] failed", kind, err);
    return new Response(
      JSON.stringify({ error: "send_failed", detail: String(err) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      },
    );
  }

  return new Response(JSON.stringify({ ok: true, ...extra }), {
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
});
