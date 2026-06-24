"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Loader2, LogIn, LogOut, ShieldAlert } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { getBrowserSupabase } from "@/lib/supabase-browser";
import { adminEmail } from "@/content/content";

type AuthState =
  | { status: "loading" }
  | { status: "no-supabase" }
  | { status: "signed-out" }
  | { status: "unauthorized"; email: string }
  | { status: "authorized"; email: string };

export function AdminAuthGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    const sb = getBrowserSupabase();
    if (!sb) {
      setState({ status: "no-supabase" });
      return;
    }

    const resolve = (session: Session | null) => {
      if (!session) return setState({ status: "signed-out" });
      const email = session.user.email ?? "";
      if (email.toLowerCase() === adminEmail.toLowerCase()) {
        setState({ status: "authorized", email });
      } else {
        setState({ status: "unauthorized", email });
      }
    };

    sb.auth.getSession().then(({ data }) => resolve(data.session));
    const { data: sub } = sb.auth.onAuthStateChange((_event, session) =>
      resolve(session),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    const sb = getBrowserSupabase();
    if (!sb) return;
    await sb.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          typeof window !== "undefined" ? `${window.location.origin}/adminpanel` : undefined,
      },
    });
  };

  const signOut = async () => {
    const sb = getBrowserSupabase();
    if (!sb) return;
    await sb.auth.signOut();
  };

  if (state.status === "loading") {
    return (
      <AdminShell>
        <div className="flex flex-col items-center gap-3 text-muted-2">
          <Loader2 className="size-6 animate-spin" />
          <p className="text-xs font-bold uppercase tracking-[0.14em]">
            Checking session…
          </p>
        </div>
      </AdminShell>
    );
  }

  if (state.status === "no-supabase") {
    return (
      <AdminShell>
        <div className="max-w-md text-center">
          <ShieldAlert className="mx-auto size-10 text-gold-700" />
          <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
            Supabase auth not configured
          </h2>
          <p className="mt-3 text-sm text-muted">
            Set <code className="font-mono text-gold-700">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="font-mono text-gold-700">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in your env, then enable
            the Google provider in your Supabase project (Authentication →
            Providers → Google) to lock this page down.
          </p>
        </div>
      </AdminShell>
    );
  }

  if (state.status === "signed-out") {
    return (
      <AdminShell>
        <div className="w-full max-w-sm rounded-xl border border-[color:var(--line)] bg-paper p-8 text-center shadow-sm">
          <p className="eyebrow justify-center">Admin</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink">Sign in to continue</h2>
          <p className="mt-2 text-sm text-muted">
            Only <span className="font-mono text-gold-700">{adminEmail}</span> can access this dashboard.
          </p>
          <button
            type="button"
            onClick={signIn}
            className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-pill bg-gold font-semibold text-ink shadow-cta transition-all duration-200 ease-brand hover:bg-gold-600 hover:-translate-y-[1px]"
          >
            <LogIn className="size-4" />
            Sign in with Google
          </button>
        </div>
      </AdminShell>
    );
  }

  if (state.status === "unauthorized") {
    return (
      <AdminShell>
        <div className="w-full max-w-md rounded-xl border border-[color:var(--line)] bg-paper p-8 text-center shadow-sm">
          <ShieldAlert className="mx-auto size-10 text-red-500" />
          <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
            Not authorized
          </h2>
          <p className="mt-2 text-sm text-muted">
            <span className="font-mono">{state.email}</span> isn&apos;t allowed on
            this dashboard. Only <span className="font-mono text-gold-700">{adminEmail}</span>{" "}
            has access.
          </p>
          <button
            type="button"
            onClick={signOut}
            className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-pill border border-[color:var(--line)] px-4 text-sm text-ink hover:border-gold"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      </AdminShell>
    );
  }

  return (
    <>
      <div className="border-b border-[color:var(--line)] bg-cream/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 md:px-8">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted-2">
            Signed in as <span className="text-gold-700">{state.email}</span>
          </p>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex h-8 items-center gap-2 rounded-pill border border-[color:var(--line)] px-3 text-xs text-muted hover:border-gold hover:text-ink"
          >
            <LogOut className="size-3" />
            Sign out
          </button>
        </div>
      </div>
      {children}
    </>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative grid min-h-screen place-items-center bg-cream px-4 text-ink">
      {children}
    </main>
  );
}
