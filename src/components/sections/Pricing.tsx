"use client";

import { Check } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { pricing } from "@/content/content";
import { useCheckout } from "@/context/CheckoutContext";

function formatPkr(n: number) {
  return `${n.toLocaleString("en-PK")} ${pricing.currency}`;
}

export function Pricing() {
  const { open: openCheckout } = useCheckout();

  return (
    <section
      id="pricing"
      className="relative py-12 md:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 1200px" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-warm opacity-40"
      />

      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">[ {pricing.eyebrow} ]</p>
          <h2 className="mt-4 font-display text-display-lg font-medium">
            {pricing.title}
          </h2>
        </Reveal>

        <Reveal stagger className="mx-auto mt-14 max-w-2xl">
          <RevealItem className="relative overflow-hidden rounded-3xl border border-border-strong bg-elevated p-8 backdrop-blur-md md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-accent-warm/20 blur-3xl"
            />

            <div className="relative flex flex-col items-center text-center">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl text-text-tertiary line-through">
                  {formatPkr(pricing.priceAnchor)}
                </span>
                <span className="rounded-full bg-accent-warm/15 px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-warm">
                  {pricing.discountLabel}
                </span>
              </div>

              <p className="mt-2 font-display text-display-xl font-medium text-accent-warm">
                {formatPkr(pricing.price)}
              </p>

              <p className="mt-3 max-w-sm text-sm text-text-secondary">
                {pricing.priceNote}
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                {pricing.paymentNote}
              </p>

              <Button
                variant="warm"
                size="lg"
                className="mt-8"
                onClick={() => openCheckout()}
              >
                {pricing.cta.label}
              </Button>
              <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-warm">
                {pricing.urgency}
              </p>

              <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {pricing.badges.map((badge) => (
                  <li
                    key={badge}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-elevated/40 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary"
                  >
                    <Check
                      className="size-3 text-accent-warm"
                      strokeWidth={2.5}
                    />
                    {badge}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 border-t border-border-subtle pt-8">
              <p className="font-display text-lg font-medium text-text-primary">
                {pricing.includesHeading}
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-8">
                {pricing.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-text-secondary"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent-warm"
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
