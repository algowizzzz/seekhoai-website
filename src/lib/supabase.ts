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
    global: {
      // Bypass Next.js's automatic fetch cache so reads always hit the DB.
      // Without this, listAll() can return rows from a long-cached response.
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
  return cached;
}

export type Purchase = {
  id: string;
  email: string;
  phone: string | null;
  amount: number;
  coupon_code: string | null;
  session_id: string;
  status: "pending" | "paid" | "failed";
  user_id: string | null;
  created_at: string;
};

/**
 * Ensures an auth.users row exists for the given email.
 * Returns the user_id (uuid) if found/created, or null if Supabase isn't configured.
 * Email is normalized to lowercase before look-up to avoid duplicates.
 */
export async function ensureAuthUser(email: string): Promise<string | null> {
  const sb = getSupabase();
  if (!sb) return null;

  const normalized = email.trim().toLowerCase();

  // Try to create. If the user already exists, fall back to lookup.
  const { data: created, error: createError } = await sb.auth.admin.createUser({
    email: normalized,
    email_confirm: true, // skip verification email; we trust the form input
  });

  if (created?.user?.id) return created.user.id;

  // Already-exists is fine — look the user up by listing and matching email.
  // listUsers is paginated (50/page default); we walk pages until found.
  if (createError) {
    const message = createError.message?.toLowerCase() ?? "";
    const alreadyExists =
      message.includes("already") ||
      message.includes("registered") ||
      message.includes("exists");

    if (alreadyExists) {
      try {
        for (let page = 1; page <= 50; page++) {
          const { data: list, error: listError } = await sb.auth.admin.listUsers({
            page,
            perPage: 100,
          });
          if (listError) {
            console.error("[auth] listUsers failed", listError);
            return null;
          }
          const match = list?.users?.find(
            (u) => (u.email ?? "").toLowerCase() === normalized,
          );
          if (match?.id) return match.id;
          if (!list?.users?.length || list.users.length < 100) break;
        }
      } catch (err) {
        console.error("[auth] ensureAuthUser lookup failed", err);
      }
    } else {
      console.error("[auth] createUser failed", createError);
    }
  }

  return null;
}

export type EmailSignup = {
  id: string;
  email: string;
  phone: string | null;
  source: string;
  user_id: string | null;
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
      phone: row.phone,
      amount: row.amount,
      coupon_code: row.coupon_code,
      session_id: row.session_id,
      status: row.status,
      user_id: row.user_id,
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

/**
 * Promote a pending purchase to "paid" once Stripe confirms via webhook.
 * Lookup is by Stripe checkout session id (stored in `session_id`).
 */
export async function markPurchasePaid(sessionId: string): Promise<void> {
  const sb = getSupabase();
  if (sb) {
    const { error } = await sb
      .from("purchases")
      .update({ status: "paid" })
      .eq("session_id", sessionId);
    if (error) throw new Error(`supabase mark paid: ${error.message}`);
    return;
  }
  const row = mem.purchases.find((p) => p.session_id === sessionId);
  if (row) row.status = "paid";
}

export async function insertEmailSignup(row: Omit<EmailSignup, "id" | "created_at">): Promise<void> {
  const sb = getSupabase();
  if (sb) {
    const { error } = await sb.from("email_signups").insert({
      email: row.email,
      phone: row.phone,
      source: row.source,
      user_id: row.user_id,
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
