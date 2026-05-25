"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, RefreshCw, Search, ShoppingCart, Mail } from "lucide-react";
import type { Purchase, EmailSignup } from "@/lib/supabase";
import { AdminAuthGate } from "./AdminAuthGate";

type ApiResponse = {
  ok: boolean;
  purchases?: Purchase[];
  signups?: EmailSignup[];
  usingSupabase?: boolean;
  error?: string;
};

type Tab = "purchases" | "signups";

export default function AdminPanelPage() {
  return (
    <AdminAuthGate>
      <AdminPanel />
    </AdminAuthGate>
  );
}

function AdminPanel() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("purchases");
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/data", { cache: "no-store" });
      const json: ApiResponse = await res.json();
      setData(json);
    } catch {
      setData({ ok: false, error: "Network error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const purchases = useMemo(() => data?.purchases ?? [], [data]);
  const signups = useMemo(() => data?.signups ?? [], [data]);

  const stats = useMemo(() => {
    const revenue = purchases.reduce((sum, p) => sum + Number(p.amount ?? 0), 0);
    return {
      purchaseCount: purchases.length,
      signupCount: signups.length,
      revenue,
    };
  }, [purchases, signups]);

  const filteredPurchases = useMemo(() => {
    if (!query.trim()) return purchases;
    const q = query.toLowerCase();
    return purchases.filter(
      (p) =>
        p.email.toLowerCase().includes(q) ||
        (p.coupon_code ?? "").toLowerCase().includes(q) ||
        p.session_id.toLowerCase().includes(q),
    );
  }, [purchases, query]);

  const filteredSignups = useMemo(() => {
    if (!query.trim()) return signups;
    const q = query.toLowerCase();
    return signups.filter(
      (s) =>
        s.email.toLowerCase().includes(q) ||
        (s.phone ?? "").toLowerCase().includes(q) ||
        s.source.toLowerCase().includes(q),
    );
  }, [signups, query]);

  const exportCsv = () => {
    const rows = tab === "purchases" ? filteredPurchases : filteredSignups;
    if (rows.length === 0) return;
    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(","),
      ...rows.map((r) =>
        headers
          .map((h) => {
            const v = (r as Record<string, unknown>)[h];
            const s = v == null ? "" : String(v);
            return `"${s.replace(/"/g, '""')}"`;
          })
          .join(","),
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-base text-text-primary">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-warm opacity-20"
      />

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="mt-2 font-display text-display-md font-medium">
              SeekhoAI Dashboard
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Captured emails and purchases.{" "}
              {data?.usingSupabase ? (
                <span className="text-accent-warm">Connected to Supabase.</span>
              ) : (
                <span className="text-text-tertiary">
                  In-memory mode — connect Supabase to persist.
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={load}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border-subtle bg-subtle/60 px-4 text-sm text-text-primary transition-colors hover:border-border-strong"
            >
              <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-accent-warm px-4 text-sm font-medium text-base transition-colors hover:bg-accent-warm-2"
            >
              <Download className="size-4" />
              Export CSV
            </button>
          </div>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard
            label="Total purchases"
            value={stats.purchaseCount.toLocaleString()}
            tint="warm"
          />
          <StatCard
            label="Revenue"
            value={`$${stats.revenue.toFixed(2)}`}
            tint="warm"
          />
          <StatCard
            label="Email signups"
            value={stats.signupCount.toLocaleString()}
            tint="cool"
          />
        </section>

        <section className="mt-8 rounded-3xl border border-border-strong bg-elevated">
          <div className="flex flex-col gap-3 border-b border-border-subtle px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
            <div className="flex gap-1 rounded-full bg-subtle/60 p-1">
              <TabBtn
                active={tab === "purchases"}
                onClick={() => setTab("purchases")}
                icon={<ShoppingCart className="size-4" />}
                label={`Purchases (${purchases.length})`}
              />
              <TabBtn
                active={tab === "signups"}
                onClick={() => setTab("signups")}
                icon={<Mail className="size-4" />}
                label={`Signups (${signups.length})`}
              />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search email, coupon, source…"
                className="h-10 w-full rounded-full border border-border-subtle bg-subtle/60 pl-9 pr-4 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-warm focus:outline-none md:w-80"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading && !data ? (
              <div className="px-6 py-16 text-center text-text-tertiary">Loading…</div>
            ) : tab === "purchases" ? (
              <PurchasesTable rows={filteredPurchases} />
            ) : (
              <SignupsTable rows={filteredSignups} />
            )}
          </div>
        </section>

        {data?.error && (
          <p className="mt-6 text-sm text-red-400">Error: {data.error}</p>
        )}
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  tint,
}: {
  label: string;
  value: string;
  tint: "warm" | "cool";
}) {
  return (
    <div className="rounded-3xl border border-border-strong bg-elevated p-6">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-tertiary">
        {label}
      </p>
      <p
        className={`mt-3 font-display text-4xl font-medium ${
          tint === "warm" ? "text-accent-warm" : "text-accent-cool"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm transition-colors ${
        active
          ? "bg-accent-warm text-base"
          : "text-text-secondary hover:text-text-primary"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function PurchasesTable({ rows }: { rows: Purchase[] }) {
  if (rows.length === 0) {
    return <EmptyRow label="No purchases yet." />;
  }
  return (
    <table className="w-full text-sm">
      <thead className="bg-subtle/40 text-left font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-tertiary">
        <tr>
          <Th>Email</Th>
          <Th>Amount</Th>
          <Th>Coupon</Th>
          <Th>Session</Th>
          <Th>Date</Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((p) => (
          <tr
            key={p.id}
            className="border-t border-border-subtle/60 hover:bg-subtle/30"
          >
            <Td className="text-text-primary">{p.email}</Td>
            <Td className="font-medium text-accent-warm">
              ${Number(p.amount).toFixed(2)}
            </Td>
            <Td>{p.coupon_code ?? "—"}</Td>
            <Td className="font-mono text-xs text-text-tertiary">
              {p.session_id.slice(0, 20)}…
            </Td>
            <Td className="text-text-secondary">{formatDate(p.created_at)}</Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SignupsTable({ rows }: { rows: EmailSignup[] }) {
  if (rows.length === 0) {
    return <EmptyRow label="No email signups yet." />;
  }
  return (
    <table className="w-full text-sm">
      <thead className="bg-subtle/40 text-left font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-tertiary">
        <tr>
          <Th>Email</Th>
          <Th>Phone</Th>
          <Th>Source</Th>
          <Th>Date</Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((s) => (
          <tr
            key={s.id}
            className="border-t border-border-subtle/60 hover:bg-subtle/30"
          >
            <Td className="text-text-primary">{s.email}</Td>
            <Td className="font-mono text-xs text-text-secondary">
              {s.phone ?? "—"}
            </Td>
            <Td>{s.source}</Td>
            <Td className="text-text-secondary">{formatDate(s.created_at)}</Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 md:px-6">{children}</th>;
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3 md:px-6 ${className}`}>{children}</td>;
}

function EmptyRow({ label }: { label: string }) {
  return (
    <div className="px-6 py-16 text-center text-text-tertiary">{label}</div>
  );
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}
