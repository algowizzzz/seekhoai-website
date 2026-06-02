// Welcome series sent to every new free-course signup.
// The funnel: ad → /free landing → email + WhatsApp → paid 999 PKR close.
// These emails are the email side of that funnel (WhatsApp is primary).
//
// Edit subjects and bodies below to swap copy. Both `text` and `html` send.

export type WelcomeEmail = {
  subject: string;
  preview: string; // shown next to subject in Gmail/Apple Mail inbox
  text: string;
  html: string;
};

// ─── Brand constants ──────────────────────────────────────────────────────
const SITE_URL = "https://seekhoai.pk";
const PAID_URL = `${SITE_URL}/#pricing`;
const FREE_COURSE_URL = `${SITE_URL}/free`;
const UDEMY_FREE_URL =
  "https://www.udemy.com/course/generative-ai-chatgpt/?couponCode=CP260518SUMMX";

const PRICE_FULL = "4,999 PKR";
const PRICE_NOW = "999 PKR";
const PRICE_OFF = "80% off";

// ─── Shared light-theme email shell ───────────────────────────────────────
const wrap = (preview: string, inner: string) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>SeekhoAI</title>
</head>
<body style="margin:0;padding:0;background:#f5f3ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1a1d2a;-webkit-font-smoothing:antialiased;">
  <!-- preview text -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;color:#f5f3ef;font-size:1px;line-height:1px;">${preview}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f5f3ef;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:14px;box-shadow:0 1px 2px rgba(20,20,20,0.04);overflow:hidden;">
        <!-- header -->
        <tr><td style="padding:24px 32px 0 32px;">
          <p style="margin:0;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:18px;font-weight:700;letter-spacing:-0.01em;color:#1a1d2a;">
            <span style="color:#f97316;">●</span>&nbsp; SeekhoAI
          </p>
        </td></tr>
        <!-- body -->
        <tr><td style="padding:24px 32px 32px 32px;">
          ${inner}
        </td></tr>
        <!-- footer -->
        <tr><td style="padding:20px 32px 28px 32px;border-top:1px solid #eeece6;background:#fafaf7;">
          <p style="margin:0 0 8px;font-size:13px;color:#6b6f7d;line-height:1.6;">
            SeekhoAI · Pakistan's most-enrolled AI course · 38,099+ students worldwide
          </p>
          <p style="margin:0;font-size:12px;color:#9aa0ad;line-height:1.6;">
            You're getting this because you signed up at <a href="${SITE_URL}" style="color:#9aa0ad;text-decoration:underline;">seekhoai.pk</a>.
            Don't want these? Just reply <strong>unsubscribe</strong>.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

// Primary CTA — large, mobile-tappable, brand orange
const cta = (label: string, href: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 24px 0;">
    <tr><td style="border-radius:999px;background:#f97316;">
      <a href="${href}" style="display:inline-block;padding:14px 28px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:999px;">${label}</a>
    </td></tr>
  </table>`;

// Secondary text link
const linkBtn = (label: string, href: string) =>
  `<a href="${href}" style="color:#f97316;font-weight:600;text-decoration:none;border-bottom:1px solid #f97316;padding-bottom:1px;">${label}</a>`;

export const welcomeEmails: WelcomeEmail[] = [
  // ─── 1. Welcome + free-course delivery ─────────────────────────────────
  {
    subject: `Your free GenAI course is ready`,
    preview: `14+ hours, 179 lectures — yours, free. Here's where to start.`,
    text: `Welcome to SeekhoAI.

Your free Introduction to GenAI course is ready right now.

▶ Open the course: ${UDEMY_FREE_URL}

14+ hours · 179 lectures · 23 sections · lifetime access.

What to do first:
1. Click the link above.
2. Start with Section 1 (Prompt Engineering basics).
3. Do the hands-on demo in lecture 4 — that's where it clicks.

Reply to this email any time if you get stuck. I read every one.

— Saad
Founder, SeekhoAI`,
    html: wrap(
      `14+ hours, 179 lectures — yours, free. Here's where to start.`,
      `
      <h1 style="margin:0 0 12px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:28px;line-height:1.2;font-weight:700;letter-spacing:-0.01em;color:#1a1d2a;">
        Your free course is ready.
      </h1>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#3d4250;">
        Welcome to SeekhoAI. Your <strong>Introduction to GenAI</strong> course on Udemy is unlocked and waiting for you.
      </p>
      ${cta("Open the course →", UDEMY_FREE_URL)}
      <div style="display:flex;gap:8px;margin:0 0 24px;font-size:13px;color:#6b6f7d;">
        <span>14+ hours</span><span style="color:#c4c8d2;">·</span>
        <span>179 lectures</span><span style="color:#c4c8d2;">·</span>
        <span>Lifetime access</span>
      </div>
      <p style="margin:24px 0 8px;font-size:14px;font-weight:600;color:#1a1d2a;text-transform:uppercase;letter-spacing:0.04em;">Start here</p>
      <ol style="margin:0 0 24px;padding-left:20px;color:#3d4250;line-height:1.7;font-size:15px;">
        <li>Open the course at the link above.</li>
        <li>Start with <strong>Section 1</strong> — Prompt Engineering basics.</li>
        <li>Do the hands-on demo in lecture 4. That's where it clicks.</li>
      </ol>
      <p style="margin:24px 0 8px;font-size:15px;line-height:1.6;color:#3d4250;">
        Stuck on anything? Just reply to this email. I read every one.
      </p>
      <p style="margin:0;font-size:15px;color:#6b6f7d;">— Saad, Founder of SeekhoAI</p>
    `,
    ),
  },

  // ─── 2. How AI is actually paying people (proof + outcomes) ────────────
  {
    subject: `The 3 things every good prompt needs`,
    preview: `One tip that immediately raises the quality of everything ChatGPT writes for you.`,
    text: `One thing most people miss about ChatGPT.

Most users type a question and hope. The people who get reliable, professional output every time follow a simple structure:

Role + Context + Format

· Role — tell ChatGPT who it is ("You are a senior copywriter…")
· Context — give it the facts it needs ("The product is a 999 PKR online AI course in Pakistan…")
· Format — say exactly what shape you want back ("Write 3 ad headlines, max 8 words each…")

Try it once today. The difference is night-and-day.

This is from Section 1 of your free course. Section 1, lecture 3 walks through 5 more examples.

Reopen the course: ${UDEMY_FREE_URL}

— Saad`,
    html: wrap(
      `One tip that immediately raises the quality of everything ChatGPT writes for you.`,
      `
      <h1 style="margin:0 0 16px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:24px;line-height:1.25;font-weight:700;color:#1a1d2a;">
        The 3 things every good prompt needs.
      </h1>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#3d4250;">
        Most users type a question into ChatGPT and hope. The ones who get reliable, professional output every time follow a simple structure:
      </p>
      <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:20px 24px;margin:20px 0 24px;">
        <p style="margin:0;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;color:#c2410c;letter-spacing:-0.01em;">
          Role + Context + Format
        </p>
      </div>
      <ul style="margin:0 0 24px;padding-left:0;list-style:none;color:#3d4250;font-size:15px;line-height:1.7;">
        <li style="padding:6px 0;"><strong style="color:#1a1d2a;">Role</strong> — tell ChatGPT who it is. <em style="color:#6b6f7d;">"You are a senior copywriter…"</em></li>
        <li style="padding:6px 0;"><strong style="color:#1a1d2a;">Context</strong> — give it the facts. <em style="color:#6b6f7d;">"The product is a 999 PKR AI course in Pakistan…"</em></li>
        <li style="padding:6px 0;"><strong style="color:#1a1d2a;">Format</strong> — say exactly what shape you want. <em style="color:#6b6f7d;">"Write 3 ad headlines, max 8 words each…"</em></li>
      </ul>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3d4250;">
        Try it on ChatGPT today. The difference is night-and-day.
      </p>
      <p style="margin:0 0 16px;font-size:14px;color:#6b6f7d;">
        This is from Section 1 of your free course — lecture 3 walks through 5 more examples.
      </p>
      ${cta("Reopen the course →", UDEMY_FREE_URL)}
      <p style="margin:0;font-size:15px;color:#6b6f7d;">— Saad</p>
    `,
    ),
  },

  // ─── 3. Soft pitch: the paid bootcamp goes deeper ───────────────────────
  {
    subject: `If you're enjoying the free course…`,
    preview: `Where the Complete AI Bootcamp picks up from where the free course ends.`,
    text: `Quick update — and a soft pitch.

The free course is the first chunk of what I teach. It covers what GenAI is, how to prompt well, and gives you a real foundation with ChatGPT.

The Complete AI Bootcamp picks up from there:

· MidJourney mastery — design artwork good enough to sell on Etsy
· Building AI agents with LangChain and LangGraph
· Vibe Coding — ship apps without writing code
· AI marketing and SEO that actually pull traffic
· 25+ hours of premium content · 97+ in-depth lessons · 2,000+ prompts

It's normally ${PRICE_FULL}. Right now, intro price: ${PRICE_NOW} (${PRICE_OFF}).

One-time payment. Lifetime access. 30-day money-back guarantee.
Pay with JazzCash or Easypaisa.

See the full curriculum: ${PAID_URL}

No pressure — the free course is yours regardless.

— Saad`,
    html: wrap(
      `Where the Complete AI Bootcamp picks up from where the free course ends.`,
      `
      <h1 style="margin:0 0 16px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:24px;line-height:1.25;font-weight:700;color:#1a1d2a;">
        Liking the free course?
      </h1>
      <p style="margin:0 0 20px;font-size:16px;line-height:1.65;color:#3d4250;">
        The free course covers what GenAI is and how to prompt well. The <strong>Complete AI Bootcamp</strong> picks up from there:
      </p>
      <table style="width:100%;border-collapse:separate;border-spacing:0;margin:0 0 24px;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #eeece6;font-size:15px;color:#3d4250;line-height:1.5;"><strong style="color:#1a1d2a;">MidJourney mastery</strong> — design artwork good enough to sell on Etsy.</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #eeece6;font-size:15px;color:#3d4250;line-height:1.5;"><strong style="color:#1a1d2a;">AI agents</strong> with LangChain and LangGraph.</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #eeece6;font-size:15px;color:#3d4250;line-height:1.5;"><strong style="color:#1a1d2a;">Vibe Coding</strong> — ship apps without writing code.</td></tr>
        <tr><td style="padding:10px 0;font-size:15px;color:#3d4250;line-height:1.5;"><strong style="color:#1a1d2a;">AI marketing &amp; SEO</strong> that actually pulls traffic.</td></tr>
      </table>
      <p style="margin:0 0 4px;font-size:14px;color:#6b6f7d;letter-spacing:0.04em;text-transform:uppercase;">Intro price</p>
      <p style="margin:0 0 4px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:30px;line-height:1.1;font-weight:700;color:#1a1d2a;">
        <span style="color:#9aa0ad;font-weight:400;text-decoration:line-through;font-size:18px;">${PRICE_FULL}</span>
        &nbsp;${PRICE_NOW}
      </p>
      <p style="margin:0 0 24px;font-size:13px;color:#6b6f7d;">One-time · Lifetime access · 30-day money-back · JazzCash &amp; Easypaisa</p>
      ${cta("See the full bootcamp →", PAID_URL)}
      <p style="margin:0;font-size:14px;color:#6b6f7d;">No pressure. The free course is yours either way.</p>
    `,
    ),
  },

  // ─── 4. Social proof from real students ────────────────────────────────
  {
    subject: `38,099 students later…`,
    preview: `What people actually say after taking the course.`,
    text: `Real reviews from the 13,017 students who've left feedback on Udemy:

★★★★★ Ananya — 5 months ago
"Amazing, above expectations!"

★★★★★ Farhan — 9 months ago
"Well structured videos very helpful to understand."

★★★★★ Sabeena — 9 months ago
"Relevant and good content. BENEFICIAL!"

★★★★★ Junaid — 9 months ago
"The experience was so good."

38,099+ students · 13,017+ reviews · 4.5★ average · 100+ countries.

If you want to go deeper than the free course, the Complete AI Bootcamp is ${PRICE_NOW} right now (was ${PRICE_FULL}).

${PAID_URL}

— Saad`,
    html: wrap(
      `What people actually say after taking the course.`,
      `
      <h1 style="margin:0 0 8px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:24px;line-height:1.25;font-weight:700;color:#1a1d2a;">
        38,099 students later.
      </h1>
      <p style="margin:0 0 24px;font-size:15px;color:#6b6f7d;">A few of the 13,017 reviews on Udemy:</p>

      ${[
        { name: "Ananya", when: "5 months ago", quote: "Amazing, above expectations!" },
        { name: "Farhan", when: "9 months ago", quote: "Well structured videos very helpful to understand." },
        { name: "Sabeena", when: "9 months ago", quote: "Relevant and good content. BENEFICIAL!" },
        { name: "Junaid", when: "9 months ago", quote: "The experience was so good." },
      ]
        .map(
          (r) => `
        <div style="border:1px solid #eeece6;border-radius:12px;padding:16px 20px;margin:0 0 12px;background:#fafaf7;">
          <p style="margin:0 0 8px;color:#f97316;font-size:14px;letter-spacing:0.06em;">★★★★★</p>
          <p style="margin:0 0 10px;font-size:15px;line-height:1.55;color:#1a1d2a;">"${r.quote}"</p>
          <p style="margin:0;font-size:13px;color:#6b6f7d;"><strong style="color:#1a1d2a;">${r.name}</strong> · ${r.when} · via Udemy</p>
        </div>`,
        )
        .join("")}

      <p style="margin:20px 0 24px;font-size:13px;color:#6b6f7d;letter-spacing:0.04em;text-transform:uppercase;">
        38,099+ students · 13,017+ reviews · 4.5★ · 100+ countries
      </p>
      ${cta("See the full bootcamp →", PAID_URL)}
    `,
    ),
  },

  // ─── 5. Objection handling / common questions ──────────────────────────
  {
    subject: `Common questions before enrolling`,
    preview: `Refunds, time commitment, certificate, payment in PKR — answered.`,
    text: `Five questions we get the most.

Is this for absolute beginners?
Yes. We start from zero — no maths, no coding background needed.

How much time per week?
Around 3 hours. Most students finish in 4–6 weeks at their own pace.

Can I pay in PKR?
Yes. JazzCash or Easypaisa, both work.

Do you offer refunds?
30-day money-back guarantee. No questions asked.

Is the course in Urdu?
The course is taught in English with subtitles, so it's easy to follow.

Anything else? Reply to this email.

The Complete AI Bootcamp: ${PRICE_NOW} (was ${PRICE_FULL}).
${PAID_URL}

— Saad`,
    html: wrap(
      `Refunds, time commitment, certificate, payment in PKR — answered.`,
      `
      <h1 style="margin:0 0 20px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:24px;line-height:1.25;font-weight:700;color:#1a1d2a;">
        Common questions before enrolling.
      </h1>

      ${[
        { q: "Is this for absolute beginners?", a: "Yes. We start from zero — no maths, no coding background needed." },
        { q: "How much time per week?", a: "Around 3 hours. Most students finish in 4–6 weeks at their own pace." },
        { q: "Can I pay in PKR?", a: "Yes. JazzCash or Easypaisa, both work." },
        { q: "Do you offer refunds?", a: "30-day money-back guarantee. No questions asked." },
        { q: "Is the course in Urdu?", a: "The course is taught in English with subtitles, so it's easy to follow." },
      ]
        .map(
          (it) => `
        <div style="margin:0 0 18px;padding-bottom:18px;border-bottom:1px solid #eeece6;">
          <p style="margin:0 0 6px;font-size:16px;font-weight:600;color:#1a1d2a;">${it.q}</p>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#3d4250;">${it.a}</p>
        </div>`,
        )
        .join("")}

      <p style="margin:20px 0 24px;font-size:15px;color:#3d4250;">
        Anything else? Just reply — I read every email.
      </p>
      ${cta("Enrol — " + PRICE_NOW + " →", PAID_URL)}
    `,
    ),
  },

  // ─── 6. 30-day guarantee + risk reversal ───────────────────────────────
  {
    subject: `30 days to decide`,
    preview: `If the Complete AI Bootcamp isn't for you, you get every rupee back.`,
    text: `One thing I want to make sure you know.

Enrolling in the Complete AI Bootcamp doesn't have to be a leap of faith. You get 30 days to try the entire course. If anything about it isn't right for you — anything at all — email us and we send back every rupee. No forms, no "why are you leaving?" calls. Just a refund.

The reason: I want students who'll actually use the material. If you're not getting value, you shouldn't be paying for it. Simple.

So this is the worst-case for you: you try the bootcamp for 30 days, decide it's not for you, get your 999 PKR back, and walk away with whatever you learned in those 30 days. No risk.

${PAID_URL}

— Saad`,
    html: wrap(
      `If the Complete AI Bootcamp isn't for you, you get every rupee back.`,
      `
      <h1 style="margin:0 0 16px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:26px;line-height:1.25;font-weight:700;color:#1a1d2a;">
        30 days to decide.
      </h1>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#3d4250;">
        Enrolling in the bootcamp doesn't have to be a leap of faith. You get <strong>30 full days</strong> to try the entire course.
      </p>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.65;color:#3d4250;">
        If anything about it isn't right for you, email us and we send back every rupee. No forms. No "why are you leaving" calls. Just a refund.
      </p>
      <div style="background:#fff7ed;border-left:3px solid #f97316;border-radius:6px;padding:18px 22px;margin:0 0 28px;">
        <p style="margin:0;font-size:15px;line-height:1.65;color:#1a1d2a;">
          The worst-case is: you try the bootcamp for 30 days, decide it's not for you, get your <strong>999 PKR</strong> back, and walk away with whatever you learned in that month. No risk.
        </p>
      </div>
      ${cta("Try the bootcamp →", PAID_URL)}
      <p style="margin:0;font-size:15px;color:#6b6f7d;">— Saad</p>
    `,
    ),
  },

  // ─── 7. Last reminder / urgency ────────────────────────────────────────
  {
    subject: `Intro price won't last forever`,
    preview: `999 PKR is the launch price. Going up as reviews accumulate.`,
    text: `Last email about the offer.

The intro price for the Complete AI Bootcamp is ${PRICE_NOW} (${PRICE_OFF} off the regular ${PRICE_FULL}). It's an intro price for a reason — we're going to raise it as reviews accumulate and we add more modules.

If you've been weighing it, this is the right time. If you're not, no worries — I won't keep emailing you about this offer.

${PAID_URL}

Lifetime access. 30-day money-back. JazzCash or Easypaisa.

— Saad`,
    html: wrap(
      `999 PKR is the launch price. Going up as reviews accumulate.`,
      `
      <h1 style="margin:0 0 16px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:26px;line-height:1.25;font-weight:700;color:#1a1d2a;">
        Intro price won't last forever.
      </h1>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#3d4250;">
        The Complete AI Bootcamp is at <strong>${PRICE_NOW}</strong> right now (${PRICE_OFF} off the regular ${PRICE_FULL}). It's an intro price for a reason — we're raising it as reviews accumulate and as we ship new modules.
      </p>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.65;color:#3d4250;">
        If you've been weighing it, this is the right time. If you're not, no worries — I won't keep emailing you about this offer.
      </p>
      ${cta("Enrol — " + PRICE_NOW + " →", PAID_URL)}
      <p style="margin:0 0 16px;font-size:13px;color:#6b6f7d;">
        Lifetime access · 30-day money-back · JazzCash / Easypaisa
      </p>
      <p style="margin:0;font-size:15px;color:#6b6f7d;">— Saad</p>
    `,
    ),
  },
];
