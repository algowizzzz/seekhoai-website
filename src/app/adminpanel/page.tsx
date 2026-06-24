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
    <main className="min-h-screen bg-cream text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="mt-2 font-display text-display-md font-semibold">
              SeekhoAI <span className="text-gold-700">Dashboard</span>
            </h1>
            <p className="mt-2 text-sm text-muted">
              Captured emails and purchases.{" "}
              {data?.usingSupabase ? (
                <span className="text-gold-700">Connected to Supabase.</span>
              ) : (
                <span className="text-muted-2">
                  In-memory mode — connect Supabase to persist.
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={load}
              className="inline-flex h-10 items-center gap-2 rounded-pill border border-[color:var(--line)] bg-paper px-4 text-sm text-ink transition-colors hover:border-gold"
            >
              <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex h-10 items-center gap-2 rounded-pill bg-gold px-4 text-sm font-semibold text-ink shadow-cta transition-all duration-200 ease-brand hover:bg-gold-600 hover:-translate-y-[1px]"
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

        <section className="mt-8 rounded-xl border border-[color:var(--line)] bg-paper shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[color:var(--line)] px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
            <div className="flex gap-1 rounded-pill bg-cream-2 p-1">
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
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search email, coupon, source…"
                className="h-10 w-full rounded-pill border border-[color:var(--line)] bg-cream/60 pl-9 pr-4 text-sm text-ink placeholder:text-muted-2 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 md:w-80"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading && !data ? (
              <div className="px-6 py-16 text-center text-muted-2">Loading…</div>
            ) : tab === "purchases" ? (
              <PurchasesTable rows={filteredPurchases} />
            ) : (
              <SignupsTable rows={filteredSignups} />
            )}
          </div>
        </section>

        {data?.error && (
          <p className="mt-6 text-sm text-red-600">Error: {data.error}</p>
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
    <div className="rounded-xl border border-[color:var(--line)] bg-paper p-6 shadow-sm">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted-2">
        {label}
      </p>
      <p
        className={`mt-3 font-display text-4xl font-semibold ${
          tint === "warm" ? "text-gold-700" : "text-teal-700"
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
      className={`inline-flex h-9 items-center gap-2 rounded-pill px-4 text-sm font-semibold transition-colors ${
        active
          ? "bg-gold text-ink shadow-cta"
          : "text-muted hover:text-ink"
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
      <thead className="bg-cream-2/60 text-left text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted-2">
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
            className="border-t border-[color:var(--line)] hover:bg-cream-2/40"
          >
            <Td className="text-ink">{p.email}</Td>
            <Td className="font-semibold text-gold-700">
              ${Number(p.amount).toFixed(2)}
            </Td>
            <Td>{p.coupon_code ?? "—"}</Td>
            <Td className="font-mono text-xs text-muted-2">
              {p.session_id.slice(0, 20)}…
            </Td>
            <Td className="text-muted">{formatDate(p.created_at)}</Td>
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
      <thead className="bg-cream-2/60 text-left text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted-2">
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
            className="border-t border-[color:var(--line)] hover:bg-cream-2/40"
          >
            <Td className="text-ink">{s.email}</Td>
            <Td className="font-mono text-xs text-muted">
              {s.phone ?? "—"}
            </Td>
            <Td>{s.source}</Td>
            <Td className="text-muted">{formatDate(s.created_at)}</Td>
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
    <div className="px-6 py-16 text-center text-muted-2">{label}</div>
  );
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}
