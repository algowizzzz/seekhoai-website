// Supabase Edge Function: send-emails
//
// Single endpoint that dispatches outbound email by `kind`:
//   - "welcome-series"   → blast all 7 welcome emails to the new signup
//   - "admin-signup"     → notify admin that someone signed up
//   - "admin-purchase"   → notify admin that someone purchased
//
// DEPLOY:
//   supabase functions deploy send-emails --project-ref <your-ref>
//
// REQUIRED SECRETS (set in Supabase Dashboard → Edge Functions → send-emails → Secrets):
//   SMTP_HOST       e.g. smtp.gmail.com
//   SMTP_PORT       e.g. 465
//   SMTP_USERNAME   your full email
//   SMTP_PASSWORD   app password (Gmail) or SMTP password
//   FROM_EMAIL      who emails come "from", e.g. SeekhoAI <hello@seekhoai.pk>
//   ADMIN_EMAIL     e.g. sa5425592@gmail.com
//
// CALL FROM SERVER:
//   POST {SUPABASE_URL}/functions/v1/send-emails
//   Authorization: Bearer {SERVICE_ROLE_KEY}
//   Body: { kind: "welcome-series", email: "...", source: "popup" }

import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
import { welcomeEmails } from "./welcome-emails.ts";

const SMTP_HOST = Deno.env.get("SMTP_HOST") ?? "";
const SMTP_PORT = Number(Deno.env.get("SMTP_PORT") ?? "465");
const SMTP_USERNAME = Deno.env.get("SMTP_USERNAME") ?? "";
const SMTP_PASSWORD = Deno.env.get("SMTP_PASSWORD") ?? "";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "SeekhoAI <hello@seekhoai.pk>";
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") ?? "sa5425592@gmail.com";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

async function makeClient(): Promise<SMTPClient> {
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

async function sendOne(
  to: string,
  subject: string,
  text: string,
  html: string,
): Promise<void> {
  const client = await makeClient();
  try {
    await client.send({
      from: FROM_EMAIL,
      to,
      subject,
      content: text,
      html,
    });
  } finally {
    await client.close();
  }
}

// ── Handlers per kind ────────────────────────────────────────────────────

async function handleWelcomeSeries(email: string): Promise<void> {
  // All 7 fire at once per the chosen strategy. Sequential to avoid SMTP
  // rate limits; if your provider supports it you can Promise.all() these.
  for (const e of welcomeEmails) {
    try {
      await sendOne(email, e.subject, e.text, e.html);
    } catch (err) {
      console.error("[welcome-series] send failed", e.subject, err);
    }
  }
}

async function handleAdminSignup(
  email: string,
  source: string,
): Promise<void> {
  const subject = `New SeekhoAI signup — ${email}`;
  const text = `A new user signed up.

Email:  ${email}
Source: ${source}
Time:   ${new Date().toISOString()}`;
  const html = `<h2>New SeekhoAI signup</h2>
<table>
  <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
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
  try {
    switch (kind) {
      case "welcome-series": {
        const email = String(body.email ?? "");
        if (!email) throw new Error("missing_email");
        await handleWelcomeSeries(email);
        break;
      }
      case "admin-signup": {
        const email = String(body.email ?? "");
        const source = String(body.source ?? "unknown");
        if (!email) throw new Error("missing_email");
        await handleAdminSignup(email, source);
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

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
});
