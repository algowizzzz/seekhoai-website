-- ─── Email automation cron jobs ──────────────────────────────────────────
-- Run this once in the Supabase SQL Editor.
-- https://supabase.com/dashboard → project → SQL Editor → New query → paste → Run.
--
-- BEFORE RUNNING: replace every occurrence of <YOUR_SERVICE_ROLE_KEY> below
-- with your actual service role key from
--   Project Settings → API → service_role (secret).
--
-- It schedules three cron jobs that call the send-emails Edge Function:
--   1. pending-cart       — runs daily at 09:00 UTC, signups 24-48h old with no purchase
--   2. weekly-newsletter  — runs Thursdays at 09:00 UTC, broadcast to ALL signups
--   3. weekly-non-buyer   — runs Mondays at 09:00 UTC, signups >=7d old with no purchase
-- ─────────────────────────────────────────────────────────────────────────

-- 1. Enable the extensions needed to call HTTP endpoints from Postgres on a schedule.
create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

-- 2. Pending-cart job — daily at 09:00 UTC
--    Finds signups from 24-48h ago with no purchase, sends pending-cart email.
select cron.schedule(
  'send-pending-cart-emails',
  '0 9 * * *',
  $$
    select net.http_post(
      url := 'https://jcpuvegugiilirlpnxuu.supabase.co/functions/v1/send-emails',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer <YOUR_SERVICE_ROLE_KEY>'  -- replace before running
      ),
      body := jsonb_build_object('kind', 'scheduled-pending-cart')
    );
  $$
);

-- 3. Weekly newsletter (broadcast to ALL signups) — Thursdays at 09:00 UTC
--    Sends the weekly newsletter to every email in email_signups.
select cron.schedule(
  'send-weekly-newsletter-emails',
  '0 9 * * 4',
  $$
    select net.http_post(
      url := 'https://jcpuvegugiilirlpnxuu.supabase.co/functions/v1/send-emails',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer <YOUR_SERVICE_ROLE_KEY>'  -- replace before running
      ),
      body := jsonb_build_object('kind', 'scheduled-weekly-newsletter')
    );
  $$
);

-- 4. Weekly-non-buyer job — Mondays at 09:00 UTC
--    Finds signups >=7d old with no purchase, sends weekly nudge.
select cron.schedule(
  'send-weekly-non-buyer-emails',
  '0 9 * * 1',
  $$
    select net.http_post(
      url := 'https://jcpuvegugiilirlpnxuu.supabase.co/functions/v1/send-emails',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer <YOUR_SERVICE_ROLE_KEY>'  -- replace before running
      ),
      body := jsonb_build_object('kind', 'scheduled-weekly-non-buyer')
    );
  $$
);

-- ─── Useful queries while debugging ──────────────────────────────────────
--
-- List all scheduled jobs:
--   select * from cron.job;
--
-- See recent runs:
--   select * from cron.job_run_details order by start_time desc limit 20;
--
-- Manually trigger one now (for testing):
--   select net.http_post(
--     url := 'https://jcpuvegugiilirlpnxuu.supabase.co/functions/v1/send-emails',
--     headers := jsonb_build_object(
--       'Content-Type', 'application/json',
--       'Authorization', 'Bearer <YOUR_SERVICE_ROLE_KEY>'  -- replace before running
--     ),
--     body := jsonb_build_object('kind', 'scheduled-pending-cart')
--   );
--
-- Delete a job:
--   select cron.unschedule('send-pending-cart-emails');
