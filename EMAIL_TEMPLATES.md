# SeekhoAI — Email Templates

All automated emails sent from the system, grouped by lifecycle stage.

- Source of truth in code: [supabase/functions/send-emails/welcome-emails.ts](supabase/functions/send-emails/welcome-emails.ts), [lifecycle-emails.ts](supabase/functions/send-emails/lifecycle-emails.ts), [index.ts](supabase/functions/send-emails/index.ts).
- Variables used throughout: `MASTER80` (discount code), `$499` (full price), `$99.80` (80% off), checkout URL, Udemy course URL.
- Each email has both a plain-text and HTML version; the plain text is shown below.

---

## 1. Welcome Series (sent to every new signup)

All 7 fire immediately when someone submits the popup. Triggered by `/api/email` → `notify.welcomeSeries()` → Edge Function `kind: "welcome-series"`.

### Email 1 — Welcome + deliver the code

**Subject:** Your 80% off code: MASTER80

```
Welcome to SeekhoAI.

You're on the list — and your discount is active.

Use code MASTER80 at checkout for 80% off the Complete AI Bootcamp.
That's $99.80 instead of $499. One-time payment, lifetime access.

Enroll now: https://seekhoai-lake.vercel.app/#pricing

Talk soon,
Saad A
Founder, SeekhoAI
```

### Email 2 — What you'll actually learn

**Subject:** What you'll actually learn

```
Quick rundown of what's inside the Complete AI Bootcamp:

· Prompt Engineering — write prompts that ship production-quality output,
  not chatbot conversations.
· ChatGPT & Custom GPTs — build your own assistants for your workflow.
· MidJourney & Visual AI — brand-grade visuals from prompt to print.
· Vibe Coding — build real software with Cursor and Claude as co-pilots.

8 modules · 110+ video lessons · 2,000+ prompt library · capstone project
with written feedback.

Your MASTER80 code is still good for 80% off.

https://seekhoai-lake.vercel.app/#pricing
```

### Email 3 — Discount reminder

**Subject:** Your MASTER80 code is still active

```
Just a reminder — your 80% off code is still working.

MASTER80 → $99.80 (was $499)

No subscriptions, no upsells. Pay once, keep access forever, including every
future module we add.

Enroll: https://seekhoai-lake.vercel.app/#pricing
```

### Email 4 — Curriculum preview

**Subject:** A peek inside Module 1

```
Module 1 — Foundational Prompt Engineering — covers:

· Understanding how language models actually work
· The anatomy of a prompt that gets reliable output
· Advanced techniques: chain-of-thought, few-shot, role-prompting
· How to build a reusable prompt library you'll come back to
· ChatGPT best practices most users never learn

That's just module 1 of 8. Total: 28+ hours of video and 110+ lessons.

Reminder: MASTER80 = 80% off ($99.80).

https://seekhoai-lake.vercel.app/#pricing
```

### Email 5 — Social proof

**Subject:** What students are saying

```
A few words from people who've taken it:

"This course completely transformed how I approach content creation.
The prompt techniques alone saved me 20+ hours a week."
— Sarah Chen, Marketing Director

"The MidJourney section was incredible. I'm selling AI art on Etsy and
making $2k+ monthly."
— Michael Rodriguez, Freelance Designer

"Used ChatGPT techniques from this course to develop my entire startup
business plan. Worth 10x the price."
— David Thompson, Founder

24,318+ students · 4.6 average rating · 5+ years teaching.

MASTER80 is still active: https://seekhoai-lake.vercel.app/#pricing
```

### Email 6 — Objection handling / FAQ

**Subject:** Questions before you enroll?

```
A few of the most common questions we get:

Is this for absolute beginners?
Yes. Module 1 starts from zero — no math, no coding. If you can use a
browser, you can take this course.

How much time per week?
Plan for about 3 hours per week. Most students finish in 4-6 weeks.
Self-paced, no deadlines.

Do you offer refunds?
30-day money-back guarantee, no questions asked.

Is there a subscription?
No. One-time $99.80 (with code MASTER80). Lifetime access, including
future updates.

More questions? Reply to this email.

https://seekhoai-lake.vercel.app/#pricing
```

### Email 7 — Last call

**Subject:** Last reminder: MASTER80 won't last

```
One last note from me.

The MASTER80 code is still active right now. 80% off — $99.80 for lifetime
access to the full bootcamp.

If you've been weighing it, this is your reminder. If you're not ready,
that's fine too — no more emails about this offer.

https://seekhoai-lake.vercel.app/#pricing

— Saad
```

---

## 2. Order Confirmation (transactional)

Fires immediately after a successful purchase. Triggered by `/api/checkout` → `notify.orderConfirmation()` → Edge Function `kind: "order-confirmation"`.

Variables substituted at send time: `{amount}`, `{couponCode}`, `{sessionId}`.

**Subject:** You're enrolled. Here's how to access your course.

```
Thank you for enrolling in the Complete AI Bootcamp.

Order summary
─────────────
Amount paid:  ${amount}
Discount applied: {couponCode}        ← only shown when a coupon was used
Order ID:     {sessionId}

Access your course
──────────────────
https://www.udemy.com/course/complete-ai-bootcamp/

Click the link above and use the email this was sent to. You have lifetime
access — log in any time, from any device.

What to do next
───────────────
1. Open the course at the link above.
2. Start with Module 1 (Foundational Prompt Engineering).
3. Plan ~3 hours per week. Most students finish in 4-6 weeks.

If you can't access the course or anything looks wrong, just reply to this
email and we'll fix it within 24 hours.

— Saad A
Founder, SeekhoAI
```

---

## 3. Pending Cart (scheduled cron)

Runs **daily at 09:00 UTC** via pg_cron. Targets signups created 24–48h ago who have **no matching purchase**. Triggered by Edge Function `kind: "scheduled-pending-cart"`.

**Subject:** Still thinking about it?

```
You signed up yesterday but haven't enrolled yet — totally fine, just wanted
to make sure you didn't lose your discount.

Your code MASTER80 is still active.
$99.80 instead of $499. One-time payment. Lifetime access.

If you have questions about whether the course is right for you, just reply.
I read every email.

Otherwise: https://seekhoai-lake.vercel.app/#pricing

— Saad
```

---

## 4. Weekly Non-Buyer (scheduled cron)

Runs **Mondays at 09:00 UTC** via pg_cron. Targets signups created **≥7 days ago** who have no matching purchase. Triggered by Edge Function `kind: "scheduled-weekly-non-buyer"`.

By default re-fires every week to the same user. To make it one-shot, add a `last_marketing_email_at` column to `email_signups` and filter on it (TODO noted in code).

**Subject:** This week at SeekhoAI

```
Hi — a quick update from us.

The Complete AI Bootcamp is still open, and your MASTER80 code still works
(80% off → $99.80).

If you want to see what's inside before committing:
https://seekhoai-lake.vercel.app/#pricing

Or reply to this email with any question — I'll get back to you.

— Saad
```

---

## 5. Admin Alert: New Signup

Fires on every popup signup. Goes to `ADMIN_EMAIL` (set via Supabase function secret, currently `sa5425592@gmail.com`).

**Subject:** New SeekhoAI signup — {email}

```
A new user signed up.

Email:  {email}
Source: {source}              ← popup | hero | etc
Time:   {ISO timestamp}
```

---

## 6. Admin Alert: New Purchase

Fires on every successful checkout. Goes to `ADMIN_EMAIL`.

**Subject:** New SeekhoAI purchase — {email} (${amount})

```
A new purchase came through.

Email:    {email}
Amount:   ${amount}
Coupon:   {couponCode | "none"}
Session:  {sessionId}
Time:     {ISO timestamp}
```

---

## Editing copy

All subjects and bodies live in two files. Both `text` and `html` are sent in each message — the `text` block above is the plain-text version; the HTML version is a dark-themed wrapper with one accent-orange CTA button.

| Edit this file | To change these emails |
|---|---|
| [supabase/functions/send-emails/welcome-emails.ts](supabase/functions/send-emails/welcome-emails.ts) | Welcome series (emails 1–7) |
| [supabase/functions/send-emails/lifecycle-emails.ts](supabase/functions/send-emails/lifecycle-emails.ts) | Order confirmation, pending cart, weekly non-buyer |
| [supabase/functions/send-emails/index.ts](supabase/functions/send-emails/index.ts) | Admin signup + admin purchase alert formatting |

After editing, redeploy:

```
supabase functions deploy send-emails
```

---

## Triggers map

| Email | Where it's triggered | Edge Function kind |
|---|---|---|
| Welcome 1–7 | `/api/email` (popup submit) | `welcome-series` |
| Order confirmation | `/api/checkout` (purchase success) | `order-confirmation` |
| Pending cart | pg_cron daily 09:00 UTC | `scheduled-pending-cart` |
| Weekly non-buyer | pg_cron Monday 09:00 UTC | `scheduled-weekly-non-buyer` |
| Admin: signup | `/api/email` | `admin-signup` |
| Admin: purchase | `/api/checkout` | `admin-purchase` |

Cron setup SQL: [supabase/cron-emails.sql](supabase/cron-emails.sql).
