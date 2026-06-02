# SeekhoAI — Email Templates

All automated emails sent from the system, grouped by lifecycle stage.

- **Source of truth in code:** [supabase/functions/send-emails/welcome-emails.ts](supabase/functions/send-emails/welcome-emails.ts), [lifecycle-emails.ts](supabase/functions/send-emails/lifecycle-emails.ts), [index.ts](supabase/functions/send-emails/index.ts).
- **Design:** light theme (white card on soft-cream page), single-column, ~600px max, large mobile-tappable orange CTA buttons. Modelled on Udemy / Udacity / Full Stack Academy patterns.
- **Brand constants used everywhere:** 4,999 PKR full price, 999 PKR sale price (80% off), JazzCash + Easypaisa payment, 30-day money-back guarantee, English-with-subtitles, lifetime access.
- **No USD pricing anywhere. No MASTER80 code.** The price drop IS the discount.
- Each email has both a plain-text version (shown below) and an HTML version. Both ship in every send.
- Every email also has **preview text** (the snippet next to the subject in Gmail/Apple Mail inbox), shown below subject.

---

## 1. Welcome Series

Seven emails fired immediately when a new free-course signup hits `/api/enroll/free` → `notify.welcomeSeries()` → Edge Function `kind: "welcome-series"`. Currently all fire at once; switch to a drip schedule by editing `handleWelcomeSeries` in `index.ts`.

The funnel intent: lead capture ad → `/free` landing → instant free-course delivery + nurture toward the **999 PKR Complete AI Bootcamp**. WhatsApp is the primary channel; email is the owned backup.

---

### 1.1 — Free course delivery (instant)

**Subject:** Your free GenAI course is ready
**Preview:** 14+ hours, 179 lectures — yours, free. Here's where to start.

```
Welcome to SeekhoAI.

Your free Introduction to GenAI course is ready right now.

▶ Open the course: https://www.udemy.com/course/generative-ai-chatgpt/?couponCode=CP260518SUMMX

14+ hours · 179 lectures · 23 sections · lifetime access.

What to do first:
1. Click the link above.
2. Start with Section 1 (Prompt Engineering basics).
3. Do the hands-on demo in lecture 4 — that's where it clicks.

Reply to this email any time if you get stuck. I read every one.

— Saad
Founder, SeekhoAI
```

---

### 1.2 — The 3 things every prompt needs

**Subject:** The 3 things every good prompt needs
**Preview:** One tip that immediately raises the quality of everything ChatGPT writes for you.

```
One thing most people miss about ChatGPT.

Most users type a question and hope. The people who get reliable, professional
output every time follow a simple structure:

Role + Context + Format

· Role — tell ChatGPT who it is ("You are a senior copywriter…")
· Context — give it the facts it needs
· Format — say exactly what shape you want back

Try it once today. The difference is night-and-day.

This is from Section 1 of your free course.
```

---

### 1.3 — Soft pitch: where the bootcamp picks up

**Subject:** If you're enjoying the free course…
**Preview:** Where the Complete AI Bootcamp picks up from where the free course ends.

```
The free course is the first chunk of what I teach. The Complete AI Bootcamp
picks up from there:

· MidJourney mastery — design artwork good enough to sell on Etsy
· Building AI agents with LangChain and LangGraph
· Vibe Coding — ship apps without writing code
· AI marketing and SEO that actually pull traffic

Normally 4,999 PKR. Right now, intro price: 999 PKR (80% off).
One-time payment. Lifetime access. 30-day money-back guarantee.
Pay with JazzCash or Easypaisa.

See the full curriculum: https://seekhoai.pk/#pricing
```

---

### 1.4 — Social proof: real students

**Subject:** 38,099 students later…
**Preview:** What people actually say after taking the course.

```
Real reviews from the 13,017 students who've left feedback on Udemy:

★★★★★ Ananya — 5 months ago
"Amazing, above expectations!"

★★★★★ Farhan — 9 months ago
"Well structured videos very helpful to understand."

★★★★★ Sabeena — 9 months ago
"Relevant and good content. BENEFICIAL!"

★★★★★ Junaid — 9 months ago
"The experience was so good."

38,099+ students · 13,017+ reviews · 4.5★ average · 100+ countries.
```

---

### 1.5 — Common questions

**Subject:** Common questions before enrolling
**Preview:** Refunds, time commitment, certificate, payment in PKR — answered.

```
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
```

---

### 1.6 — Risk reversal (30-day guarantee)

**Subject:** 30 days to decide
**Preview:** If the Complete AI Bootcamp isn't for you, you get every rupee back.

```
Enrolling in the bootcamp doesn't have to be a leap of faith. You get 30
full days to try the entire course.

If anything about it isn't right for you, email us and we send back every
rupee. No forms. No "why are you leaving" calls. Just a refund.

The worst-case is: you try the bootcamp for 30 days, decide it's not for
you, get your 999 PKR back, and walk away with whatever you learned. No risk.
```

---

### 1.7 — Last reminder / urgency

**Subject:** Intro price won't last forever
**Preview:** 999 PKR is the launch price. Going up as reviews accumulate.

```
The intro price for the Complete AI Bootcamp is 999 PKR (80% off the regular
4,999 PKR). It's an intro price for a reason — we're going to raise it as
reviews accumulate and we add more modules.

If you've been weighing it, this is the right time. If you're not, no worries
— I won't keep emailing you about this offer.

Lifetime access. 30-day money-back. JazzCash or Easypaisa.
```

---

## 2. Transactional

### 2.1 — Order confirmation

**Trigger:** Stripe `checkout.session.completed` webhook → `notify.orderConfirmation()`.

**Subject:** You're enrolled. Here's how to access the course.
**Preview:** Your Complete AI Bootcamp access link is ready.

```
Thank you for enrolling in the Complete AI Bootcamp.

Order summary
─────────────
Amount paid:  999 PKR
Order ID:     {sessionId}

Open your course
────────────────
https://www.udemy.com/course/complete-ai-bootcamp/

Use the email this was sent to. You have lifetime access — log in any time,
from any device.

What to do first:
1. Open the course at the link above.
2. Start with Module 1 (Foundational Prompt Engineering).
3. Plan ~3 hours per week. Most students finish in 4–6 weeks.

Stuck on access? Reply to this email and we'll fix it within 24 hours.

— Saad, Founder of SeekhoAI
```

---

### 2.2 — Pending cart (24h post-signup, no purchase)

**Trigger:** cron job, ~24h after `/free` signup if no purchase row exists.

**Subject:** Still thinking about it?
**Preview:** The Complete AI Bootcamp is still 999 PKR — and the free course is still yours.

```
You signed up yesterday for the free course but haven't picked up the full
bootcamp yet — totally fine, just checking in.

The Complete AI Bootcamp is still 999 PKR (was 4,999 PKR).
One-time payment. Lifetime access. 30-day money-back guarantee.

If you have questions about whether it's right for you, reply to this email.
I read every one.
```

---

## 3. Recurring

### 3.1 — Weekly newsletter (all signups)

**Trigger:** cron weekly.

**Subject:** This week at SeekhoAI
**Preview:** What's new in AI and inside the bootcamp.

Body is a template — edit `weeklyNewsletterEmail` in `lifecycle-emails.ts` each week before deploying.

---

### 3.2 — Weekly non-buyer nudge

**Trigger:** cron weekly, only to signups with no purchase row.

**Subject:** Quick check-in from SeekhoAI
**Preview:** 999 PKR intro price still live. No pressure.

```
The Complete AI Bootcamp is still open at the intro price: 999 PKR (was
4,999 PKR, 80% off).

Want to see what's inside before committing? Have a question? Just reply.
```

---

## 4. Admin notifications

These go to `adminEmail` in `src/content/content.ts` (currently `sa5425592@gmail.com`).

### 4.1 — New signup

**Subject:** New SeekhoAI signup — `{email}`

```
New free-course signup.

Email: {email}
Phone: {phone}
Source: {source}
```

### 4.2 — New purchase

**Subject:** New SeekhoAI purchase — `{email}` (999 PKR)

```
New paid enrolment.

Email:       {email}
Amount:      999 PKR
Session ID:  {sessionId}
```

---

## Design checklist (applied to every email)

- ✅ **Single column, ≤600px** — readable on every device, no horizontal scroll on mobile
- ✅ **Light background (#f5f3ef page, #ffffff card)** — high inbox compatibility; Gmail won't auto-invert
- ✅ **Preview text in `<head>`** — controls the inbox snippet, hidden in body
- ✅ **Large mobile-tappable CTAs** — 14px vertical padding, ≥44px tap target
- ✅ **One primary CTA per email** — no competing buttons
- ✅ **Plain-text version** — every email also ships a text alternative
- ✅ **Brand orange (#f97316) for accents/CTAs only** — body type stays high-contrast dark
- ✅ **All copy in English with subtitles framing** — no "in Urdu" claim (per spec)
- ✅ **All pricing in PKR** — no USD, no MASTER80 code path

## How to edit copy

1. Open the corresponding `.ts` file (`welcome-emails.ts` for the 7 welcome series, `lifecycle-emails.ts` for the others).
2. Edit the `subject`, `preview`, `text`, and `html` fields. Keep both in sync.
3. Run the Supabase Edge Function deploy: `npx supabase functions deploy send-emails`.
4. Trigger a test send via `/api/email` with the right `kind` payload (see `index.ts`).
