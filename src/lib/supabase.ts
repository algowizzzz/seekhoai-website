// Server-side Supabase client + in-memory fallback.
//
// To enable real persistence:
//   1. Create a Supabase project at https://supabase.com
//   2. Run supabase/schema.sql in the SQL editor (creates `purchases` and `email_signups`)
//   3. Add to .env.local (and Vercel Project Settings):
//        NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
//        SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...    ← service role, NOT anon
//
// If env vars are missing, data is kept in a process-local Map so dev still works
// (resets on every reload — adminpanel will show only what was inserted this session).

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  if (cached) return cached;
  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export type Purchase = {
  id: string;
  email: string;
  amount: number;
  coupon_code: string | null;
  session_id: string;
  created_at: string;
};

export type EmailSignup = {
  id: string;
  email: string;
  source: string;
  created_at: string;
};

type MemoryStore = {
  purchases: Purchase[];
  signups: EmailSignup[];
};

const globalForMem = globalThis as unknown as { __seekoaiMem?: MemoryStore };
const mem: MemoryStore =
  globalForMem.__seekoaiMem ??
  (globalForMem.__seekoaiMem = { purchases: [], signups: [] });

export async function insertPurchase(row: Omit<Purchase, "id" | "created_at">): Promise<void> {
  const sb = getSupabase();
  if (sb) {
    const { error } = await sb.from("purchases").insert({
      email: row.email,
      amount: row.amount,
      coupon_code: row.coupon_code,
      session_id: row.session_id,
    });
    if (error) throw new Error(`supabase insert purchase: ${error.message}`);
    return;
  }
  mem.purchases.unshift({
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    ...row,
  });
}

export async function insertEmailSignup(row: Omit<EmailSignup, "id" | "created_at">): Promise<void> {
  const sb = getSupabase();
  if (sb) {
    const { error } = await sb.from("email_signups").insert({
      email: row.email,
      source: row.source,
    });
    if (error && error.code !== "23505") {
      // 23505 = unique violation; ignore duplicate emails silently
      throw new Error(`supabase insert signup: ${error.message}`);
    }
    return;
  }
  if (!mem.signups.some((s) => s.email === row.email)) {
    mem.signups.unshift({
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      ...row,
    });
  }
}

export async function listAll(): Promise<{
  purchases: Purchase[];
  signups: EmailSignup[];
  usingSupabase: boolean;
}> {
  const sb = getSupabase();
  if (sb) {
    const [purchasesRes, signupsRes] = await Promise.all([
      sb.from("purchases").select("*").order("created_at", { ascending: false }).limit(500),
      sb.from("email_signups").select("*").order("created_at", { ascending: false }).limit(500),
    ]);
    if (purchasesRes.error) throw new Error(purchasesRes.error.message);
    if (signupsRes.error) throw new Error(signupsRes.error.message);
    return {
      purchases: (purchasesRes.data ?? []) as Purchase[],
      signups: (signupsRes.data ?? []) as EmailSignup[],
      usingSupabase: true,
    };
  }
  return { purchases: mem.purchases, signups: mem.signups, usingSupabase: false };
}
