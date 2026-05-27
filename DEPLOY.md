# Deploy to Vercel

This project is configured for **zero-config Vercel deploys**. Push to `main` and your site is live.

## First-time setup

1. Push the repo to GitHub (see `README.md` "Push to GitHub").
2. Go to **[vercel.com](https://vercel.com) → New Project**.
3. **Import** the `seekhoai-landing` GitHub repo.
4. Framework preset auto-detects **Next.js**. Leave all defaults.
5. **Environment variables:** none required for the mock build.
6. Click **Deploy**.

That's it. Vercel will give you a `*.vercel.app` URL within ~2 minutes.

## Subsequent deploys

- Pushes to `main` auto-deploy to production.
- Pushes to any other branch get a unique preview URL.
- Pull requests on GitHub get a preview URL posted as a comment.

## Connecting `seekhoai.pk`

1. In your Vercel project → **Settings → Domains**.
2. Add `seekhoai.pk` and `www.seekhoai.pk`.
3. Vercel shows you DNS records — paste them into your domain registrar (PKDomains, GoDaddy, etc.).
4. DNS propagation usually takes 5–30 minutes.

## Environment variables

Required for purchase/email persistence + admin panel:

| Variable | Used by | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | server | Supabase → Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | server | Supabase → Settings → API → `service_role` key (secret) |

Required for real Stripe payments (paid course):

| Variable | Used by | Notes |
|---|---|---|
| `STRIPE_SECRET_KEY` | `/api/checkout`, `/api/stripe/webhook` | Stripe Dashboard → Developers → API keys → `sk_test_...` / `sk_live_...` |
| `STRIPE_PRICE_ID` | `/api/checkout` | Stripe Dashboard → Products → your product → Price → `price_...`. Used when no coupon is applied. |
| `STRIPE_WEBHOOK_SECRET` | `/api/stripe/webhook` | Stripe Dashboard → Developers → Webhooks → endpoint → Signing secret `whsec_...`. Webhook endpoint: `https://<your-domain>/api/stripe/webhook`, event: `checkout.session.completed`. |
| `NEXT_PUBLIC_SITE_URL` | `/api/checkout` success/cancel URLs | e.g. `https://seekhoai.pk` (no trailing slash) |

Stripe local-dev tip: run `stripe listen --forward-to localhost:3000/api/stripe/webhook` and use the printed `whsec_...` as `STRIPE_WEBHOOK_SECRET` while developing.

Optional:

| Variable | Used by | Notes |
|---|---|---|
| `RESEND_API_KEY` | `/api/email` | Resend / Mailchimp / etc. |

After adding env vars, trigger a redeploy (Vercel → Deployments → ⋮ → Redeploy).

## Supabase setup (one-time)

1. Create a project at [supabase.com](https://supabase.com) (free tier is fine).
2. Open **SQL Editor** → **New query** → paste the contents of [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
3. Go to **Settings → API**:
   - Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy **service_role** secret → `SUPABASE_SERVICE_ROLE_KEY`
4. Paste both into Vercel env vars (Production + Preview + Development) and redeploy.

Until you do this, the app runs in **in-memory mode** — checkout/signups work but data resets on every server restart.

## Admin panel

Visit `/adminpanel` to see captured emails and purchases. CSV export included.

> **⚠️ This panel is currently public — anyone with the URL can read your data.** Add auth before going to production. See `src/app/api/admin/data/route.ts` for where to add a check.

## Verifying the deploy

Once live, check:

- [ ] Hero 3D scene loads and rotates
- [ ] Mouse movement parallaxes the knot and particles
- [ ] Email form submits and shows a success state
- [ ] "Enroll Now" buttons open the checkout modal
- [ ] Mock payment shows confetti + success state
- [ ] Discount popup appears after ~35 seconds (or scroll 60%, or mouse exits top)
- [ ] Claiming `AI20` updates the price to **$399.20** everywhere
- [ ] Refresh — discount persists (session-scoped)
- [ ] Close the tab and reopen — discount and popup reset
