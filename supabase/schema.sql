-- Run this in your Supabase project's SQL editor.
-- https://supabase.com/dashboard → your project → SQL Editor → New query → paste → Run.

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  phone text,
  amount numeric(10, 2) not null,
  coupon_code text,
  session_id text not null,
  status text not null default 'pending',
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.purchases
  add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table public.purchases
  add column if not exists phone text;
alter table public.purchases
  add column if not exists status text not null default 'pending';
create unique index if not exists purchases_session_id_uidx on public.purchases (session_id);

create index if not exists purchases_created_at_idx on public.purchases (created_at desc);
create index if not exists purchases_email_idx on public.purchases (email);

create table if not exists public.email_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  phone text,
  source text not null default 'hero',
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

-- If the table already exists from an older schema, add the new columns:
alter table public.email_signups
  add column if not exists phone text;
alter table public.email_signups
  add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table public.email_signups
  add column if not exists name text;

create index if not exists email_signups_created_at_idx on public.email_signups (created_at desc);

-- Row Level Security: we use the service role key on the server, which bypasses RLS,
-- but we still enable RLS so the anon key can't read this from a browser.
alter table public.purchases enable row level security;
alter table public.email_signups enable row level security;
