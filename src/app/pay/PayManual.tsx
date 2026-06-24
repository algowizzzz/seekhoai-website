"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Wordmark } from "@/components/ui/Wordmark";
import { brand, payments, whatsapp, pricing } from "@/content/content";

function buildWhatsappReceiptLink() {
  const cleaned = whatsapp.number.replace(/\D/g, "");
  const text = encodeURIComponent(payments.receiptMessage);
  return `https://wa.me/${cleaned}?text=${text}`;
}

type Provider = {
  key: "jazzcash" | "easypaisa";
  name: string;
  accountNumber: string;
  accountTitle: string;
  steps: string[];
};

function activeProviders(): Provider[] {
  const out: Provider[] = [];
  if (payments.jazzcash.accountNumber) {
    out.push({
      key: "jazzcash",
      name: "JazzCash",
      accountNumber: payments.jazzcash.accountNumber,
      accountTitle: payments.jazzcash.accountTitle,
      steps: [
        "Open your JazzCash app or dial *786#.",
        "Choose Send Money or Mobile Account Transfer.",
        `Enter the account number above and transfer ${pricing.price.toLocaleString("en-PK")} PKR.`,
        "Take a screenshot of the confirmation page.",
      ],
    });
  }
  if (payments.easypaisa.accountNumber) {
    out.push({
      key: "easypaisa",
      name: "Easypaisa",
      accountNumber: payments.easypaisa.accountNumber,
      accountTitle: payments.easypaisa.accountTitle,
      steps: [
        "Open your Easypaisa app or dial *786#.",
        "Choose Send Money or Mobile Account Transfer.",
        `Enter the account number above and transfer ${pricing.price.toLocaleString("en-PK")} PKR.`,
        "Take a screenshot of the confirmation page.",
      ],
    });
  }
  return out;
}

export function PayManual() {
  const providers = activeProviders();
  const whatsappHref = buildWhatsappReceiptLink();

  return (
    <main className="relative bg-cream">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="container-content flex h-16 items-center md:h-20">
          <Link href="/" className="inline-flex items-center transition-opacity hover:opacity-80">
            <Wordmark tone="auto" size="nav" />
          </Link>
        </div>
      </header>

      {/* Hero — dark ink */}
      <section className="hero-mesh relative isolate overflow-hidden">
        <div aria-hidden className="hero-shaft" />
        <div className="container-content relative z-10 pt-32 pb-12 md:pt-40 md:pb-16">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow eyebrow-on-dark justify-center">PAY IN PKR</p>
            <h1 className="mt-4 font-display text-display-xl font-semibold leading-[1.05] text-paper">
              Pay <span className="text-gold">999 PKR</span> via{" "}
              {providers.length > 1
                ? "JazzCash or Easypaisa"
                : providers[0]?.name ?? "JazzCash or Easypaisa"}
              .
            </h1>
            <p className="mt-5 text-lg text-text-on-dark-muted">
              Transfer the fee to the account below, send your receipt on
              WhatsApp, and we&apos;ll unlock your Complete AI Bootcamp access
              within 24 hours. Usually much faster.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Provider cards — cream */}
      <section className="bg-cream pb-12 pt-12 md:pb-16 md:pt-16">
        <div className="container-content">
          {providers.length === 0 ? (
            <Reveal className="mx-auto max-w-2xl rounded-xl border border-[color:var(--line)] bg-paper p-8 text-center shadow-sm">
              <p className="font-display text-2xl font-semibold text-ink">
                Payment details coming soon.
              </p>
              <p className="mt-3 text-muted">
                We&apos;re setting up our JazzCash and Easypaisa accounts.
                Message us on WhatsApp and we&apos;ll help you enrol right away.
              </p>
            </Reveal>
          ) : (
            <div
              className={
                providers.length === 1
                  ? "mx-auto max-w-2xl"
                  : "mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8"
              }
            >
              {providers.map((p) => (
                <ProviderCard key={p.key} provider={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* After paying — cream-2 with WhatsApp CTA */}
      <section className="bg-cream-2 py-12 md:py-20">
        <div className="container-content">
          <Reveal className="mx-auto max-w-3xl rounded-xl border border-[color:var(--line)] bg-paper p-8 shadow-sm md:p-12">
            <p className="eyebrow">AFTER YOU&apos;VE PAID</p>
            <h2 className="mt-4 font-display text-display-md font-semibold text-ink">
              Send us your receipt on WhatsApp.
            </h2>
            <p className="mt-5 text-lg text-muted">
              Take a screenshot of the JazzCash / Easypaisa confirmation, then
              click below — WhatsApp opens with everything ready. Just attach
              your screenshot and send.
            </p>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-pill bg-[#25D366] px-7 py-4 font-semibold text-white shadow-lg transition-all duration-200 ease-brand hover:-translate-y-[1px] hover:bg-[#1ebe5d]"
            >
              <MessageCircle className="size-5" strokeWidth={2} />
              Send my receipt on WhatsApp
            </a>

            <p className="mt-6 text-sm text-muted-2">
              We confirm receipt and unlock your access within 24 hours
              (usually within an hour during business hours, PKT).
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[color:var(--line)] bg-cream py-10">
        <div className="container-content text-center">
          <p className="text-sm text-muted">
            Prefer to pay with a card?{" "}
            <Link
              href="/#pricing"
              className="font-semibold text-gold-700 underline-offset-4 hover:underline"
            >
              Use the card checkout instead →
            </Link>
          </p>
          <p className="mt-4 text-xs text-muted-2">
            30-day money-back guarantee · One-time payment · Lifetime access
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-teal-900 py-8 text-text-on-dark-muted">
        <div className="container-content flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          <p>© 2026 {brand.name}. All rights reserved.</p>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/privacy" className="hover:text-gold">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-gold">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/refund" className="hover:text-gold">
                Refund
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
}

function ProviderCard({ provider }: { provider: Provider }) {
  const [copied, setCopied] = useState(false);

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(provider.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — silently no-op */
    }
  }

  return (
    <Reveal className="flex h-full flex-col gap-6 rounded-xl border border-[color:var(--line)] bg-paper p-8 shadow-sm md:p-10">
      <div>
        <p className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-teal-600">
          {provider.name}
        </p>
        <p className="mt-3 font-display text-2xl font-semibold text-ink md:text-3xl">
          {provider.accountTitle || "—"}
        </p>
      </div>

      <div className="rounded-md border border-[color:var(--line)] bg-cream/60 p-5">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-2">
          Account number
        </p>
        <div className="mt-2 flex items-center gap-3">
          <p className="flex-1 font-mono text-xl font-semibold tracking-wide text-ink md:text-2xl">
            {provider.accountNumber}
          </p>
          <button
            type="button"
            onClick={copyNumber}
            aria-label={`Copy ${provider.name} account number`}
            className="inline-flex items-center gap-1.5 rounded-pill border border-[color:var(--line)] bg-paper px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-gold hover:text-gold-700"
          >
            {copied ? (
              <>
                <Check className="size-3.5" strokeWidth={2.5} /> Copied
              </>
            ) : (
              <>
                <Copy className="size-3.5" /> Copy
              </>
            )}
          </button>
        </div>
      </div>

      <div>
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-2">
          How to pay
        </p>
        <ol className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted md:text-base">
          {provider.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-pill bg-gold/15 text-[0.65rem] font-bold text-gold-700">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
