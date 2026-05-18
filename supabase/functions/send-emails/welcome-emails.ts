// 7-email welcome series sent to every new signup.
// Edit the subjects and bodies below — that's all you need to do to swap copy.
// Both `text` and `html` are sent; HTML clients will see html, plain-text fallback otherwise.

export type WelcomeEmail = {
  subject: string;
  text: string;
  html: string;
};

const code = "MASTER80";
const checkoutUrl = "https://seekhoai.pk/#pricing"; // change to your real URL

export const welcomeEmails: WelcomeEmail[] = [
  {
    subject: "Welcome to SeekhoAI — your 80% discount inside",
    text: `Thanks for signing up.

Use code ${code} at checkout for 80% off the Complete AI Bootcamp ($99.80 instead of $499). Lifetime access, no recurring fees.

Enroll: ${checkoutUrl}

— Saad`,
    html: `<p>Thanks for signing up.</p>
<p>Use code <strong>${code}</strong> at checkout for <strong>80% off</strong> the Complete AI Bootcamp ($99.80 instead of $499). Lifetime access, no recurring fees.</p>
<p><a href="${checkoutUrl}">Enroll now →</a></p>
<p>— Saad</p>`,
  },
  {
    subject: "Email 2 — Replace this subject",
    text: `Placeholder email #2. Edit supabase/functions/send-emails/welcome-emails.ts to replace.`,
    html: `<p>Placeholder email #2. Edit <code>supabase/functions/send-emails/welcome-emails.ts</code> to replace.</p>`,
  },
  {
    subject: "Email 3 — Replace this subject",
    text: `Placeholder email #3.`,
    html: `<p>Placeholder email #3.</p>`,
  },
  {
    subject: "Email 4 — Replace this subject",
    text: `Placeholder email #4.`,
    html: `<p>Placeholder email #4.</p>`,
  },
  {
    subject: "Email 5 — Replace this subject",
    text: `Placeholder email #5.`,
    html: `<p>Placeholder email #5.</p>`,
  },
  {
    subject: "Email 6 — Replace this subject",
    text: `Placeholder email #6.`,
    html: `<p>Placeholder email #6.</p>`,
  },
  {
    subject: "Email 7 — Final reminder: Your 80% off code expires soon",
    text: `Last call.

Code ${code} is still active. 80% off the Complete AI Bootcamp.

${checkoutUrl}

— Saad`,
    html: `<p>Last call.</p>
<p>Code <strong>${code}</strong> is still active. 80% off the Complete AI Bootcamp.</p>
<p><a href="${checkoutUrl}">Enroll now →</a></p>
<p>— Saad</p>`,
  },
];
