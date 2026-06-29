// Transactional + scheduled lifecycle emails.
//
//   orderConfirmationEmail() → fired immediately after a successful purchase
//   pendingCartEmail        → ~24h after free-course signup with no purchase
//   weeklyNewsletterEmail   → cron weekly broadcast to all signups
//   weeklyNonBuyerEmail     → cron weekly to non-buying signups
//
// Edit subjects and bodies below — both `text` and `html` send.

export type Email = {
  subject: string;
  preview?: string;
  text: string;
  html: string;
};

// ─── Brand constants ──────────────────────────────────────────────────────
const SITE_URL = "https://seekhoai.pk";
const PAID_URL = `${SITE_URL}/#pricing`;
const FREE_URL = `${SITE_URL}/free`;
const UDEMY_PAID_URL =
  "https://www.udemy.com/course/complete-ai-bootcamp/";

const PRICE_FULL = "4,999 PKR";
const PRICE_NOW = "999 PKR";
const PRICE_OFF = "80% off";

// ─── Shared light-theme email shell (mirrors welcome-emails.ts) ────────────
const wrap = (preview: string, inner: string) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>SeekhoAI</title>
</head>
<body style="margin:0;padding:0;background:#f6f3ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#07302e;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;color:#f6f3ec;font-size:1px;line-height:1px;">${preview}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f3ec;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:14px;box-shadow:0 1px 2px rgba(20,20,20,0.04);overflow:hidden;">
        <tr><td style="padding:24px 32px 0 32px;">
          <p style="margin:0;font-family:'Schibsted Grotesk','Inter',Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;letter-spacing:-0.03em;color:#07302e;line-height:1;">
            Seekho<span style="color:#b87a1f;font-weight:800;">&nbsp;AI</span>
          </p>
        </td></tr>
        <tr><td style="padding:24px 32px 32px 32px;">
          ${inner}
        </td></tr>
        <tr><td style="padding:24px 32px 28px 32px;background:#0a3a3c;">
          <p style="margin:0 0 8px;font-size:13px;color:#cfe5e1;line-height:1.6;">
            SeekhoAI · Pakistan's most-enrolled AI course · 38,099+ students worldwide
          </p>
          <p style="margin:0;font-size:12px;color:#7ab8b1;line-height:1.6;">
            <a href="${SITE_URL}" style="color:#f4b455;text-decoration:underline;">seekhoai.pk</a> ·
            Don't want these? Reply <strong style="color:#cfe5e1;">unsubscribe</strong>.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

const cta = (label: string, href: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 24px 0;">
    <tr><td style="border-radius:999px;background:#f4b455;">
      <a href="${href}" style="display:inline-block;padding:14px 28px;font-family:'Figtree','Inter',Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;color:#07302e;text-decoration:none;border-radius:999px;letter-spacing:-0.01em;">${label}</a>
    </td></tr>
  </table>`;

// ─── Order confirmation (transactional, on successful purchase) ────────────
export function orderConfirmationEmail(payload: {
  amount: number;
  couponCode: string | null; // kept for backwards-compat; ignored in copy
  sessionId: string;
}): Email {
  const { amount, sessionId } = payload;
  const amountStr = `${amount.toLocaleString("en-PK")} PKR`;

  return {
    subject: `You're enrolled. Here's how to access the course.`,
    preview: `Your Complete AI Bootcamp access link is ready.`,
    text: `Thank you for enrolling in the Complete AI Bootcamp.

Order summary
─────────────
Amount paid:  ${amountStr}
Order ID:     ${sessionId}

Open your course
────────────────
${UDEMY_PAID_URL}

Use the email this was sent to. You have lifetime access — log in any time, from any device.

What to do first
────────────────
1. Open the course at the link above.
2. Start with Module 1 (Foundational Prompt Engineering).
3. Plan ~3 hours per week. Most students finish in 4–6 weeks.

Stuck on access or anything else? Reply to this email and we'll fix it within 24 hours.

— Saad, Founder of SeekhoAI`,
    html: wrap(
      `Your Complete AI Bootcamp access link is ready.`,
      `
      <h1 style="margin:0 0 12px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:28px;line-height:1.2;font-weight:700;letter-spacing:-0.01em;color:#07302e;">
        You're enrolled.
      </h1>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#3a4f4c;">
        Thank you for joining the Complete AI Bootcamp. Your access is ready.
      </p>

      <div style="background:#efe9dd;border:1px solid #dedacf;border-radius:12px;padding:18px 22px;margin:0 0 24px;">
        <p style="margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#11716f;">Order summary</p>
        <table style="width:100%;font-size:14px;color:#07302e;">
          <tr><td style="padding:4px 0;color:#5d736f;">Amount paid</td><td style="padding:4px 0;text-align:right;color:#f4b455;font-weight:700;">${amountStr}</td></tr>
          <tr><td style="padding:4px 0;color:#5d736f;">Order ID</td><td style="padding:4px 0;text-align:right;font-family:Menlo,monospace;font-size:11px;color:#3a4f4c;">${sessionId}</td></tr>
        </table>
      </div>

      ${cta("Open your course →", UDEMY_PAID_URL)}

      <p style="margin:24px 0 8px;font-size:13px;font-weight:700;color:#11716f;text-transform:uppercase;letter-spacing:0.14em;">What to do first</p>
      <ol style="margin:0 0 24px;padding-left:20px;color:#3a4f4c;line-height:1.7;font-size:15px;">
        <li>Open the course at the link above.</li>
        <li>Start with <strong>Module 1</strong> — Foundational Prompt Engineering.</li>
        <li>Plan ~3 hours per week. Most students finish in 4–6 weeks.</li>
      </ol>

      <p style="margin:0 0 16px;font-size:14px;color:#5d736f;line-height:1.6;">
        Stuck on access? Reply to this email — we'll fix it within 24 hours.
      </p>
      <p style="margin:0;font-size:15px;color:#5d736f;">— Saad, Founder of SeekhoAI</p>
    `,
    ),
  };
}

// ─── Pending cart (sent ~24h after signup, no purchase) ───────────────────
export const pendingCartEmail: Email = {
  subject: `Still thinking about it?`,
  preview: `The Complete AI Bootcamp is still 999 PKR — and the free course is still yours.`,
  text: `You signed up yesterday for the free course but haven't picked up the full bootcamp yet — totally fine, just checking in.

The Complete AI Bootcamp is still ${PRICE_NOW} (was ${PRICE_FULL}).
One-time payment. Lifetime access. 30-day money-back guarantee.

If you have questions about whether it's right for you, reply to this email. I read every one.

${PAID_URL}

— Saad`,
  html: wrap(
    `The Complete AI Bootcamp is still 999 PKR — and the free course is still yours.`,
    `
    <h1 style="margin:0 0 16px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:24px;line-height:1.25;font-weight:700;color:#07302e;">
      Still thinking about it?
    </h1>
    <p style="margin:0 0 24px;font-size:16px;line-height:1.65;color:#3a4f4c;">
      You signed up yesterday but haven't picked up the full bootcamp yet — totally fine. Just checking in.
    </p>
    <div style="background:#efe9dd;border:1px solid #dedacf;border-radius:12px;padding:18px 22px;margin:0 0 24px;">
      <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#11716f;letter-spacing:0.14em;text-transform:uppercase;">Intro price still active</p>
      <p style="margin:0;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:26px;font-weight:700;color:#07302e;line-height:1.1;">
        <span style="color:#7e9490;font-weight:400;text-decoration:line-through;font-size:16px;">${PRICE_FULL}</span>
        &nbsp;${PRICE_NOW}
      </p>
      <p style="margin:8px 0 0;font-size:13px;color:#5d736f;">One-time · Lifetime access · 30-day money-back</p>
    </div>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3a4f4c;">
      Questions about whether the bootcamp is right for you? Just reply — I read every email.
    </p>
    ${cta("Enrol — " + PRICE_NOW + " →", PAID_URL)}
    <p style="margin:0;font-size:15px;color:#5d736f;">— Saad</p>
  `,
  ),
};

// ─── Weekly newsletter (sent weekly to ALL signups) ───────────────────────
// Edit the body each week before deploying.
export const weeklyNewsletterEmail: Email = {
  subject: `This week at SeekhoAI`,
  preview: `What's new in AI and inside the bootcamp.`,
  text: `Hi — your weekly update from SeekhoAI.

What's new this week:
· (Edit weeklyNewsletterEmail in lifecycle-emails.ts to write this week's body.)
· Drop links, tips, student spotlights, or quick lessons here.
· Keep it short — three to five bullet points is plenty.

If you haven't enrolled in the full bootcamp, intro price is still ${PRICE_NOW}.
${PAID_URL}

— Saad`,
  html: wrap(
    `What's new in AI and inside the bootcamp.`,
    `
    <h1 style="margin:0 0 12px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:22px;line-height:1.3;font-weight:700;color:#07302e;">
      This week at SeekhoAI
    </h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#3a4f4c;">
      Your weekly update from us. Here's what's new:
    </p>
    <ul style="margin:0 0 24px;padding-left:20px;color:#3a4f4c;line-height:1.75;font-size:15px;">
      <li>Edit <code style="background:#efe9dd;padding:2px 6px;border-radius:4px;font-size:13px;">weeklyNewsletterEmail</code> in <code style="background:#efe9dd;padding:2px 6px;border-radius:4px;font-size:13px;">lifecycle-emails.ts</code> to write this week's body.</li>
      <li>Drop links, tips, student spotlights, or quick lessons here.</li>
      <li>Keep it short — three to five bullet points is plenty.</li>
    </ul>
    <p style="margin:0 0 16px;font-size:14px;color:#5d736f;line-height:1.6;">
      Haven't enrolled yet? Intro price is still <strong>${PRICE_NOW}</strong>.
    </p>
    ${cta("See the bootcamp →", PAID_URL)}
    <p style="margin:0;font-size:15px;color:#5d736f;">— Saad</p>
  `,
  ),
};

// ─── Weekly non-buyer (sent weekly to free-course signups, no purchase) ────
export const weeklyNonBuyerEmail: Email = {
  subject: `Quick check-in from SeekhoAI`,
  preview: `999 PKR intro price still live. No pressure.`,
  text: `Quick check-in.

The Complete AI Bootcamp is still open at the intro price: ${PRICE_NOW} (was ${PRICE_FULL}, ${PRICE_OFF} off).

If you want to see what's inside before committing:
${PAID_URL}

Or reply with any question and I'll get back to you.

— Saad`,
  html: wrap(
    `999 PKR intro price still live. No pressure.`,
    `
    <h1 style="margin:0 0 16px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:22px;line-height:1.3;font-weight:700;color:#07302e;">
      Quick check-in.
    </h1>
    <p style="margin:0 0 20px;font-size:16px;line-height:1.65;color:#3a4f4c;">
      The Complete AI Bootcamp is still open at the intro price: <strong>${PRICE_NOW}</strong> (was ${PRICE_FULL}).
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:#5d736f;line-height:1.6;">
      Want to see what's inside before committing? Have a question? Just reply.
    </p>
    ${cta("See the bootcamp →", PAID_URL)}
    <p style="margin:0;font-size:15px;color:#5d736f;">— Saad</p>
  `,
  ),
};
