"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { finalCTA } from "@/content/content";
import { useCheckout } from "@/context/CheckoutContext";

export function FinalCTA() {
  const { open: openCheckout } = useCheckout();

  return (
    <section
      className="relative overflow-hidden py-16 md:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 1200px" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-warm opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-cool opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
      />

      <div className="container-content">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-display-lg font-medium md:text-display-xl">
            {finalCTA.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">
            {finalCTA.body}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="warm" size="lg" onClick={() => openCheckout()}>
              {finalCTA.cta.label}
            </Button>
            <a
              href={finalCTA.secondary.href}
              className="text-sm text-text-secondary underline-offset-4 transition hover:text-accent-warm hover:underline"
            >
              {finalCTA.secondary.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
