// Provider-agnostic outbound lead forwarder.
//
// On every free-course signup, we forward the lead payload to whatever URL
// the LEAD_WEBHOOK_URL env var points at. That URL can be:
//
//   - A Google Sheets Apps Script web-app webhook  → see scripts/lead-webhook.gs
//   - A Zapier / Make / n8n webhook URL
//   - The AiSensy / Wati / Interakt incoming-webhook endpoint
//   - Any HTTPS endpoint that accepts JSON POSTs
//
// The send is best-effort: if the webhook is down or env is missing, we
// log and move on — the signup still succeeds and the data still lands in
// Supabase. No user-facing failure mode.
//
// Optional auth: if LEAD_WEBHOOK_SECRET is set, we send it as
// `X-Webhook-Secret` so the receiving endpoint can verify the call.

export type LeadPayload = {
  name: string | null;
  email: string;
  phone: string | null;
  source: string;
  receivedAt: string;
  // The site URL the lead came from — useful when one webhook serves
  // multiple environments (staging vs prod) or multiple sites.
  site: string;
};

const TIMEOUT_MS = 5000;

export async function forwardLeadToWebhook(payload: LeadPayload): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "SeekhoAI-LeadWebhook/1.0",
  };
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  if (secret) headers["X-Webhook-Secret"] = secret;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  // Some receivers (Google Apps Script) can't read custom headers, so we
  // also embed the secret in the body. Header-reading providers can ignore
  // the body field; body-reading receivers can ignore the header.
  const bodyWithSecret = secret ? { ...payload, secret } : payload;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyWithSecret),
      signal: controller.signal,
    });
    if (!res.ok) {
      console.error(
        "[lead-webhook] non-2xx response",
        res.status,
        await res.text().catch(() => ""),
      );
    }
  } catch (err) {
    console.error("[lead-webhook] forward failed", err);
  } finally {
    clearTimeout(timeout);
  }
}
