"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { pricing, payments } from "@/content/content";
import { useCheckout } from "@/context/CheckoutContext";
import { useSectionView } from "@/lib/useSectionView";

const hasManualPayment = Boolean(
  payments.easypaisa.accountNumber || payments.jazzcash.accountNumber,
);

function formatPkr(n: number) {
  return `${n.toLocaleString("en-PK")} ${pricing.currency}`;
}

export function Pricing() {
  const { open: openCheckout } = useCheckout();
  const sectionRef = useSectionView("pricing", { extraEvent: "view_pricing" });

  return (
    <section
      id="pricing"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative bg-ink py-12 text-text-on-dark md:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 1200px" }}
    >
      {/* Gold glow accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-0 size-[40rem] rounded-full bg-gold/10 blur-3xl"
      />

      <div className="container-content relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow eyebrow-on-dark justify-center">{pricing.eyebrow}</p>
          <h2 className="mt-4 font-display text-display-lg font-semibold">
            {pricing.title}
          </h2>
        </Reveal>

        <Reveal stagger className="mx-auto mt-14 max-w-2xl">
          <RevealItem className="relative overflow-hidden rounded-xl border border-white/10 bg-teal-900/60 p-8 shadow-lg backdrop-blur-md md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-gold/20 blur-3xl"
            />

            <div className="relative flex flex-col items-center text-center">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl text-text-on-dark-muted line-through">
                  {formatPkr(pricing.priceAnchor)}
                </span>
                <span className="rounded-pill bg-gold/15 px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gold">
                  {pricing.discountLabel}
                </span>
              </div>

              <p className="mt-2 font-display text-display-xl font-semibold text-gold">
                {formatPkr(pricing.price)}
              </p>

              <p className="mt-3 max-w-sm text-sm text-text-on-dark-muted">
                {pricing.priceNote}
              </p>
              <p className="mt-1 text-sm text-text-on-dark-muted">
                {pricing.paymentNote}
              </p>

              <Button
                variant="primary"
                size="lg"
                className="mt-8"
                ctaLocation="pricing"
                ctaLabel={pricing.cta.label}
                onClick={() => openCheckout()}
              >
                {pricing.cta.label}
              </Button>
              {hasManualPayment && (
                <Link
                  href="/pay"
                  className="mt-3 text-sm text-text-on-dark-muted underline-offset-4 transition hover:text-gold hover:underline"
                >
                  Pay via JazzCash / Easypaisa instead →
                </Link>
              )}
              <p className="mt-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gold">
                {pricing.urgency}
              </p>

              <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {pricing.badges.map((badge) => (
                  <li
                    key={badge}
                    className="inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-text-on-dark-muted"
                  >
                    <Check
                      className="size-3 text-gold"
                      strokeWidth={2.5}
                    />
                    {badge}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="font-display text-xl font-semibold text-text-on-dark">
                {pricing.includesHeading}
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-8">
                {pricing.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-text-on-dark-muted"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-gold"
                      strokeWidth={2.5}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
