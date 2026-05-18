-- Run this in your Supabase project's SQL editor.
-- https://supabase.com/dashboard → your project → SQL Editor → New query → paste → Run.

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  amount numeric(10, 2) not null,
  coupon_code text,
  session_id text not null,
  created_at timestamptz not null default now()
);

create index if not exists purchases_created_at_idx on public.purchases (created_at desc);
create index if not exists purchases_email_idx on public.purchases (email);

create table if not exists public.email_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'hero',
  created_at timestamptz not null default now()
);

create index if not exists email_signups_created_at_idx on public.email_signups (created_at desc);

-- Row Level Security: we use the service role key on the server, which bypasses RLS,
-- but we still enable RLS so the anon key can't read this from a browser.
alter table public.purchases enable row level security;
alter table public.email_signups enable row level security;
