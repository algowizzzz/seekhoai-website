// Transactional + scheduled lifecycle emails.
//
//   order-confirmation  → fired immediately after a successful purchase
//   pending-cart        → fired ~24h after signup if user hasn't purchased
//   weekly-non-buyer    → fired weekly to non-buying signups (cron)
//
// Edit subjects and bodies below to swap copy. Both `text` and `html` are sent.

export type Email = { subject: string; text: string; html: string };

const CODE = "MASTER80";
const CHECKOUT_URL = "https://seekhoai-lake.vercel.app/#pricing";
const UDEMY_URL = "https://www.udemy.com/course/complete-ai-bootcamp/";
const FULL_PRICE = "$499";
const DISCOUNTED_PRICE = "$99.80";

const wrap = (inner: string) => `<!doctype html>
<html><body style="margin:0;padding:0;background:#0a0e1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#e8eaed;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0a0e1a;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;background:#11151f;border:1px solid #20242e;border-radius:16px;padding:32px;">
        <tr><td>
          <p style="margin:0 0 24px;font-family:'JetBrains Mono',Menlo,monospace;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#f97316;">SeekhoAI</p>
          ${inner}
          <hr style="border:none;border-top:1px solid #20242e;margin:32px 0 16px;">
          <p style="margin:0;font-size:12px;color:#7a8290;line-height:1.6;">
            Got this by mistake? Just reply with "unsubscribe" and we'll remove you. <br>
            SeekhoAI · Complete AI Bootcamp · seekhoai.pk
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

const cta = (label: string, href: string) =>
  `<a href="${href}" style="display:inline-block;padding:14px 28px;background:#f97316;color:#000;font-weight:600;text-decoration:none;border-radius:999px;margin:8px 0 24px;">${label}</a>`;

// ─── Order confirmation (transactional, sent on purchase) ──────────────
export function orderConfirmationEmail(payload: {
  amount: number;
  couponCode: string | null;
  sessionId: string;
}): Email {
  const { amount, couponCode, sessionId } = payload;
  const amountStr = `$${amount.toFixed(2)}`;
  const couponLine = couponCode
    ? `Discount applied: ${couponCode}\n`
    : "";

  return {
    subject: `You're enrolled. Here's how to access your course.`,
    text: `Thank you for enrolling in the Complete AI Bootcamp.

Order summary
─────────────
Amount paid:  ${amountStr}
${couponLine}Order ID:     ${sessionId}

Access your course
──────────────────
${UDEMY_URL}

Click the link above and use the email this was sent to. You have lifetime access — log in any time, from any device.

What to do next
───────────────
1. Open the course at the link above.
2. Start with Module 1 (Foundational Prompt Engineering).
3. Plan ~3 hours per week. Most students finish in 4-6 weeks.

If you can't access the course or anything looks wrong, just reply to this email and we'll fix it within 24 hours.

— Saad A
Founder, SeekhoAI`,
    html: wrap(`
      <h1 style="margin:0 0 8px;font-size:26px;line-height:1.3;color:#fff;">You're enrolled.</h1>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#c2c8d3;">Thank you for joining the Complete AI Bootcamp. Your access is ready.</p>

      <div style="background:#0a0e1a;border:1px solid #20242e;border-radius:12px;padding:20px;margin:0 0 24px;">
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#7a8290;">Order summary</p>
        <table style="width:100%;font-size:14px;color:#e8eaed;">
          <tr><td style="padding:4px 0;color:#7a8290;">Amount paid</td><td style="padding:4px 0;text-align:right;color:#f97316;font-weight:600;">${amountStr}</td></tr>
          ${couponCode ? `<tr><td style="padding:4px 0;color:#7a8290;">Discount applied</td><td style="padding:4px 0;text-align:right;font-family:'JetBrains Mono',Menlo,monospace;">${couponCode}</td></tr>` : ""}
          <tr><td style="padding:4px 0;color:#7a8290;">Order ID</td><td style="padding:4px 0;text-align:right;font-family:'JetBrains Mono',Menlo,monospace;font-size:11px;color:#c2c8d3;">${sessionId}</td></tr>
        </table>
      </div>

      <p style="margin:0 0 8px;font-size:14px;letter-spacing:0.08em;text-transform:uppercase;color:#7a8290;">Access your course</p>
      ${cta("Open the course →", UDEMY_URL)}

      <p style="margin:24px 0 12px;font-size:14px;color:#7a8290;letter-spacing:0.08em;text-transform:uppercase;">What to do next</p>
      <ol style="margin:0 0 24px;padding-left:20px;color:#c2c8d3;line-height:1.8;">
        <li>Open the course at the link above.</li>
        <li>Start with Module 1 (Foundational Prompt Engineering).</li>
        <li>Plan ~3 hours per week. Most students finish in 4-6 weeks.</li>
      </ol>

      <p style="margin:0 0 8px;font-size:14px;color:#7a8290;line-height:1.6;">If anything looks wrong, just reply to this email. We respond within 24 hours.</p>
      <p style="margin:24px 0 0;font-size:14px;color:#7a8290;">— Saad A, Founder</p>
    `),
  };
}

// ─── Pending cart (sent ~24h after signup, no purchase) ────────────────
export const pendingCartEmail: Email = {
  subject: `Still thinking about it?`,
  text: `You signed up yesterday but haven't enrolled yet — totally fine, just wanted to make sure you didn't lose your discount.

Your code ${CODE} is still active.
${DISCOUNTED_PRICE} instead of ${FULL_PRICE}. One-time payment. Lifetime access.

If you have questions about whether the course is right for you, just reply. I read every email.

Otherwise: ${CHECKOUT_URL}

— Saad`,
  html: wrap(`
    <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#fff;">Still thinking about it?</h1>
    <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#c2c8d3;">You signed up yesterday but haven't enrolled yet — totally fine. Just wanted to make sure you didn't lose your discount.</p>
    <div style="background:#0a0e1a;border:1px dashed #f97316;border-radius:12px;padding:20px;text-align:center;margin:0 0 24px;">
      <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#7a8290;">Your code is still active</p>
      <p style="margin:0;font-family:'JetBrains Mono',Menlo,monospace;font-size:28px;font-weight:600;color:#f97316;">${CODE}</p>
      <p style="margin:8px 0 0;font-size:14px;color:#c2c8d3;">${DISCOUNTED_PRICE} · one-time · lifetime access</p>
    </div>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#c2c8d3;">Have questions about whether the course is right for you? Just reply — I read every email.</p>
    ${cta("Enroll now →", CHECKOUT_URL)}
    <p style="margin:0;font-size:14px;color:#7a8290;">— Saad</p>
  `),
};

// ─── Weekly newsletter (sent weekly to ALL signups, buyers + non-buyers) ─
// Edit subject/body here to change the weekly broadcast. Redeploy after.
export const weeklyNewsletterEmail: Email = {
  subject: `This week at SeekhoAI`,
  text: `Hi — your weekly update from SeekhoAI.

We're here to keep you up to date on what's happening in AI and inside the
Complete AI Bootcamp.

What's new this week:
· (Edit weeklyNewsletterEmail in lifecycle-emails.ts to write this week's body)
· Drop links, tips, student spotlights, or quick lessons here.
· Keep it short — three to five bullet points is plenty.

If you haven't enrolled yet, your MASTER80 code still works.
${CHECKOUT_URL}

— Saad`,
  html: wrap(`
    <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;color:#fff;">This week at SeekhoAI</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#c2c8d3;">Your weekly update from us. Here's what's new:</p>
    <ul style="margin:0 0 24px;padding-left:20px;color:#c2c8d3;line-height:1.7;">
      <li>Edit <code>weeklyNewsletterEmail</code> in <code>lifecycle-emails.ts</code> to write this week's body.</li>
      <li>Drop links, tips, student spotlights, or quick lessons here.</li>
      <li>Keep it short — three to five bullet points is plenty.</li>
    </ul>
    <p style="margin:0 0 24px;font-size:14px;color:#7a8290;line-height:1.6;">Haven't enrolled yet? Your <strong style="color:#f97316;font-family:'JetBrains Mono',Menlo,monospace;">${CODE}</strong> code still works.</p>
    ${cta("See the curriculum →", CHECKOUT_URL)}
    <p style="margin:0;font-size:14px;color:#7a8290;">— Saad</p>
  `),
};

// ─── Weekly non-buyer (sent weekly to non-buying signups) ──────────────
export const weeklyNonBuyerEmail: Email = {
  subject: `This week at SeekhoAI`,
  text: `Hi — a quick update from us.

The Complete AI Bootcamp is still open, and your ${CODE} code still works (80% off → ${DISCOUNTED_PRICE}).

If you want to see what's inside before committing:
${CHECKOUT_URL}

Or reply to this email with any question — I'll get back to you.

— Saad`,
  html: wrap(`
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#fff;">This week at SeekhoAI</h1>
    <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#c2c8d3;">A quick check-in.</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#c2c8d3;">The Complete AI Bootcamp is still open, and your code <strong style="color:#f97316;font-family:'JetBrains Mono',Menlo,monospace;">${CODE}</strong> still works — 80% off, brings it to <strong>${DISCOUNTED_PRICE}</strong> for lifetime access.</p>
    <p style="margin:0 0 24px;font-size:14px;color:#7a8290;line-height:1.6;">Have a question about whether it's right for you? Just reply.</p>
    ${cta("See the curriculum →", CHECKOUT_URL)}
    <p style="margin:0;font-size:14px;color:#7a8290;">— Saad</p>
  `),
};
