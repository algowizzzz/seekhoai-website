// 7-email welcome series sent to every new signup.
// All 7 fire at once on signup (per current schedule choice).
// Edit subjects and bodies below — that's the only file you need to touch
// when swapping copy. Both `text` and `html` are sent.

export type WelcomeEmail = {
  subject: string;
  text: string;
  html: string;
};

const CODE = "MASTER80";
const CHECKOUT_URL = "https://seekhoai-lake.vercel.app/#pricing";
const FULL_PRICE = "$499";
const DISCOUNTED_PRICE = "$99.80";

// Tiny shared HTML shell so every email feels like part of the same series.
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

// Reusable CTA button HTML
const cta = (label: string, href = CHECKOUT_URL) =>
  `<a href="${href}" style="display:inline-block;padding:14px 28px;background:#f97316;color:#000;font-weight:600;text-decoration:none;border-radius:999px;margin:8px 0 24px;">${label}</a>`;

export const welcomeEmails: WelcomeEmail[] = [
  // ─── 1. Welcome + deliver the code ─────────────────────────────────────
  {
    subject: `Your 80% off code: ${CODE}`,
    text: `Welcome to SeekhoAI.

You're on the list — and your discount is active.

Use code ${CODE} at checkout for 80% off the Complete AI Bootcamp.
That's ${DISCOUNTED_PRICE} instead of ${FULL_PRICE}. One-time payment, lifetime access.

Enroll now: ${CHECKOUT_URL}

Talk soon,
Saad A
Founder, SeekhoAI`,
    html: wrap(`
      <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;color:#fff;">Welcome to SeekhoAI.</h1>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#c2c8d3;">You're on the list — and your discount is active.</p>
      <div style="background:#0a0e1a;border:1px dashed #f97316;border-radius:12px;padding:20px;text-align:center;margin:24px 0;">
        <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#7a8290;">Your code</p>
        <p style="margin:0;font-family:'JetBrains Mono',Menlo,monospace;font-size:28px;font-weight:600;color:#f97316;letter-spacing:0.05em;">${CODE}</p>
        <p style="margin:8px 0 0;font-size:14px;color:#c2c8d3;">${DISCOUNTED_PRICE} instead of ${FULL_PRICE} · 80% off</p>
      </div>
      <p style="margin:0 0 8px;font-size:16px;line-height:1.6;color:#c2c8d3;">One-time payment. Lifetime access. No subscription.</p>
      ${cta("Enroll now →")}
      <p style="margin:0;font-size:14px;color:#7a8290;">— Saad A, Founder</p>
    `),
  },

  // ─── 2. What you'll actually learn ─────────────────────────────────────
  {
    subject: `What you'll actually learn`,
    text: `Quick rundown of what's inside the Complete AI Bootcamp:

· Prompt Engineering — write prompts that ship production-quality output, not chatbot conversations.
· ChatGPT & Custom GPTs — build your own assistants for your workflow.
· MidJourney & Visual AI — brand-grade visuals from prompt to print.
· Vibe Coding — build real software with Cursor and Claude as co-pilots.

8 modules · 110+ video lessons · 2,000+ prompt library · capstone project with written feedback.

Your ${CODE} code is still good for 80% off.

${CHECKOUT_URL}`,
    html: wrap(`
      <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#fff;">What you'll actually learn</h1>
      <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#c2c8d3;">Quick rundown of what's inside the bootcamp:</p>
      <ul style="margin:0 0 24px;padding:0;list-style:none;">
        <li style="padding:10px 0;border-bottom:1px solid #20242e;color:#e8eaed;line-height:1.5;"><strong style="color:#f97316;">Prompt Engineering</strong> — write prompts that ship production output, not chatbot conversations.</li>
        <li style="padding:10px 0;border-bottom:1px solid #20242e;color:#e8eaed;line-height:1.5;"><strong style="color:#f97316;">ChatGPT &amp; Custom GPTs</strong> — build your own assistants for your workflow.</li>
        <li style="padding:10px 0;border-bottom:1px solid #20242e;color:#e8eaed;line-height:1.5;"><strong style="color:#f97316;">MidJourney &amp; Visual AI</strong> — brand-grade visuals from prompt to print.</li>
        <li style="padding:10px 0;color:#e8eaed;line-height:1.5;"><strong style="color:#f97316;">Vibe Coding</strong> — build real software with Cursor and Claude as co-pilots.</li>
      </ul>
      <p style="margin:0 0 20px;font-size:14px;color:#7a8290;line-height:1.6;">8 modules · 110+ video lessons · 2,000+ prompt library · capstone with written feedback.</p>
      <p style="margin:0 0 8px;font-size:15px;color:#c2c8d3;">Your code <strong style="color:#f97316;font-family:'JetBrains Mono',Menlo,monospace;">${CODE}</strong> is still good for 80% off.</p>
      ${cta("See the curriculum →")}
    `),
  },

  // ─── 3. Discount reminder + framing ────────────────────────────────────
  {
    subject: `Your ${CODE} code is still active`,
    text: `Just a reminder — your 80% off code is still working.

${CODE} → ${DISCOUNTED_PRICE} (was ${FULL_PRICE})

No subscriptions, no upsells. Pay once, keep access forever, including every future module we add.

Enroll: ${CHECKOUT_URL}`,
    html: wrap(`
      <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#fff;">Your code is still active.</h1>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#c2c8d3;">No subscriptions, no upsells. Pay once, keep access forever — including every future module we add.</p>
      <div style="background:#0a0e1a;border:1px solid #20242e;border-radius:12px;padding:24px;text-align:center;margin:24px 0;">
        <p style="margin:0 0 6px;font-family:'JetBrains Mono',Menlo,monospace;font-size:24px;font-weight:600;color:#f97316;">${CODE}</p>
        <p style="margin:0;font-size:14px;color:#c2c8d3;">${DISCOUNTED_PRICE} · one-time · lifetime access</p>
      </div>
      ${cta("Claim 80% off →")}
    `),
  },

  // ─── 4. Curriculum preview / sample content ────────────────────────────
  {
    subject: `A peek inside Module 1`,
    text: `Module 1 — Foundational Prompt Engineering — covers:

· Understanding how language models actually work
· The anatomy of a prompt that gets reliable output
· Advanced techniques: chain-of-thought, few-shot, role-prompting
· How to build a reusable prompt library you'll come back to
· ChatGPT best practices most users never learn

That's just module 1 of 8. Total: 28+ hours of video and 110+ lessons.

Reminder: ${CODE} = 80% off ($99.80).

${CHECKOUT_URL}`,
    html: wrap(`
      <h1 style="margin:0 0 8px;font-size:24px;line-height:1.3;color:#fff;">A peek inside Module 1</h1>
      <p style="margin:0 0 20px;font-size:14px;color:#7a8290;letter-spacing:0.04em;">Foundational Prompt Engineering · 3 hours · 12 lessons</p>
      <ul style="margin:0 0 24px;padding-left:20px;color:#c2c8d3;line-height:1.8;">
        <li>Understanding how language models actually work</li>
        <li>The anatomy of a prompt that gets reliable output</li>
        <li>Advanced techniques: chain-of-thought, few-shot, role-prompting</li>
        <li>How to build a reusable prompt library you'll come back to</li>
        <li>ChatGPT best practices most users never learn</li>
      </ul>
      <p style="margin:0 0 24px;font-size:15px;color:#c2c8d3;">That's just module 1 of 8. Total: 28+ hours of video, 110+ lessons.</p>
      <p style="margin:0 0 8px;font-size:14px;color:#7a8290;">Your code <strong style="color:#f97316;font-family:'JetBrains Mono',Menlo,monospace;">${CODE}</strong> still works for 80% off.</p>
      ${cta("Start with Module 1 →")}
    `),
  },

  // ─── 5. Social proof ──────────────────────────────────────────────────
  {
    subject: `What students are saying`,
    text: `A few words from people who've taken it:

"This course completely transformed how I approach content creation. The prompt techniques alone saved me 20+ hours a week."
— Sarah Chen, Marketing Director

"The MidJourney section was incredible. I'm selling AI art on Etsy and making $2k+ monthly."
— Michael Rodriguez, Freelance Designer

"Used ChatGPT techniques from this course to develop my entire startup business plan. Worth 10x the price."
— David Thompson, Founder

38,099+ students · 13,017+ reviews · 4.5 average · 100+ countries.

${CODE} is still active: ${CHECKOUT_URL}`,
    html: wrap(`
      <h1 style="margin:0 0 24px;font-size:24px;line-height:1.3;color:#fff;">What students are saying</h1>
      <blockquote style="margin:0 0 20px;padding:16px 20px;border-left:3px solid #f97316;background:#0a0e1a;border-radius:8px;color:#e8eaed;font-style:italic;line-height:1.6;">
        "This course completely transformed how I approach content creation. The prompt techniques alone saved me 20+ hours a week."
        <footer style="margin-top:10px;font-style:normal;font-size:13px;color:#7a8290;">— Sarah Chen, Marketing Director</footer>
      </blockquote>
      <blockquote style="margin:0 0 20px;padding:16px 20px;border-left:3px solid #f97316;background:#0a0e1a;border-radius:8px;color:#e8eaed;font-style:italic;line-height:1.6;">
        "The MidJourney section was incredible. I'm selling AI art on Etsy and making $2k+ monthly."
        <footer style="margin-top:10px;font-style:normal;font-size:13px;color:#7a8290;">— Michael Rodriguez, Freelance Designer</footer>
      </blockquote>
      <blockquote style="margin:0 0 24px;padding:16px 20px;border-left:3px solid #f97316;background:#0a0e1a;border-radius:8px;color:#e8eaed;font-style:italic;line-height:1.6;">
        "Used ChatGPT techniques from this course to develop my entire startup business plan. Worth 10x the price."
        <footer style="margin-top:10px;font-style:normal;font-size:13px;color:#7a8290;">— David Thompson, Founder</footer>
      </blockquote>
      <p style="margin:0 0 8px;font-size:13px;color:#7a8290;letter-spacing:0.04em;">38,099+ students · 13,017+ reviews · 4.5 average · 100+ countries</p>
      ${cta("Join them →")}
    `),
  },

  // ─── 6. Objection handling / FAQ ──────────────────────────────────────
  {
    subject: `Questions before you enroll?`,
    text: `A few of the most common questions we get:

Is this for absolute beginners?
Yes. Module 1 starts from zero — no math, no coding. If you can use a browser, you can take this course.

How much time per week?
Plan for about 3 hours per week. Most students finish in 4-6 weeks. Self-paced, no deadlines.

Do you offer refunds?
30-day money-back guarantee, no questions asked.

Is there a subscription?
No. One-time ${DISCOUNTED_PRICE} (with code ${CODE}). Lifetime access, including future updates.

More questions? Reply to this email.

${CHECKOUT_URL}`,
    html: wrap(`
      <h1 style="margin:0 0 24px;font-size:24px;line-height:1.3;color:#fff;">Questions before you enroll?</h1>
      <div style="margin:0 0 20px;padding-bottom:20px;border-bottom:1px solid #20242e;">
        <p style="margin:0 0 6px;font-size:15px;font-weight:600;color:#fff;">Is this for absolute beginners?</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#c2c8d3;">Yes. Module 1 starts from zero — no math, no coding. If you can use a browser, you can take this course.</p>
      </div>
      <div style="margin:0 0 20px;padding-bottom:20px;border-bottom:1px solid #20242e;">
        <p style="margin:0 0 6px;font-size:15px;font-weight:600;color:#fff;">How much time per week?</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#c2c8d3;">Plan for about 3 hours per week. Most students finish in 4-6 weeks. Self-paced, no deadlines.</p>
      </div>
      <div style="margin:0 0 20px;padding-bottom:20px;border-bottom:1px solid #20242e;">
        <p style="margin:0 0 6px;font-size:15px;font-weight:600;color:#fff;">Do you offer refunds?</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#c2c8d3;">30-day money-back guarantee, no questions asked.</p>
      </div>
      <div style="margin:0 0 24px;">
        <p style="margin:0 0 6px;font-size:15px;font-weight:600;color:#fff;">Is there a subscription?</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#c2c8d3;">No. One-time <strong>${DISCOUNTED_PRICE}</strong> with code <strong style="color:#f97316;font-family:'JetBrains Mono',Menlo,monospace;">${CODE}</strong>. Lifetime access, including future updates.</p>
      </div>
      <p style="margin:0 0 16px;font-size:14px;color:#7a8290;">More questions? Just reply to this email.</p>
      ${cta("Enroll →")}
    `),
  },

  // ─── 7. Last call / scarcity ──────────────────────────────────────────
  {
    subject: `Last reminder: ${CODE} won't last`,
    text: `One last note from me.

The ${CODE} code is still active right now. 80% off — ${DISCOUNTED_PRICE} for lifetime access to the full bootcamp.

If you've been weighing it, this is your reminder. If you're not ready, that's fine too — no more emails about this offer.

${CHECKOUT_URL}

— Saad`,
    html: wrap(`
      <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#fff;">One last note from me.</h1>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#c2c8d3;">The <strong style="color:#f97316;font-family:'JetBrains Mono',Menlo,monospace;">${CODE}</strong> code is still active right now. 80% off — <strong>${DISCOUNTED_PRICE}</strong> for lifetime access to the full bootcamp.</p>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#c2c8d3;">If you've been weighing it, this is your reminder. If you're not ready, that's fine too — no more emails about this offer.</p>
      ${cta("Use my 80% off →")}
      <p style="margin:0;font-size:14px;color:#7a8290;">— Saad</p>
    `),
  },
];
