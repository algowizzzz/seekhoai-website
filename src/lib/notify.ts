// Thin wrapper that calls our Supabase Edge Function for any outbound email.
// The Edge Function handles SMTP via Deno + decides which template to send.
//
// Env vars needed (set in Vercel + .env.local):
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY     (server-side only — bypasses RLS, lets us invoke functions)
//
// Edge function endpoint (set up in supabase/functions/send-emails/):
//   POST {SUPABASE_URL}/functions/v1/send-emails
//   Authorization: Bearer {SERVICE_ROLE_KEY}
//   Body: { kind: "welcome-series" | "admin-signup" | "admin-purchase", ... }

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function callEdgeFunction(body: Record<string, unknown>): Promise<void> {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    // Dev mode without Supabase configured — just log to console
    console.log("[notify] (no Supabase configured) would send:", body);
    return;
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/send-emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[notify] edge function failed", res.status, text);
    }
  } catch (err) {
    console.error("[notify] edge function error", err);
  }
}

export const notify = {
  /** Send the 7-email welcome series to a new signup. All 7 fire at once. */
  welcomeSeries(payload: { email: string; source: string }) {
    return callEdgeFunction({ kind: "welcome-series", ...payload });
  },
  /** Notify the admin email of a new signup. */
  adminSignup(payload: { email: string; source: string }) {
    return callEdgeFunction({ kind: "admin-signup", ...payload });
  },
  /** Notify the admin email of a new purchase. */
  adminPurchase(payload: {
    email: string;
    amount: number;
    couponCode: string | null;
    sessionId: string;
  }) {
    return callEdgeFunction({ kind: "admin-purchase", ...payload });
  },
};
