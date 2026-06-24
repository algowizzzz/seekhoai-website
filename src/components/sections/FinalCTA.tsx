"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { finalCTA } from "@/content/content";
import { useCheckout } from "@/context/CheckoutContext";

export function FinalCTA() {
  const { open: openCheckout } = useCheckout();

  return (
    <section
      className="relative overflow-hidden bg-ink py-16 text-text-on-dark md:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 1200px" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 -z-0 size-[30rem] rounded-full bg-teal-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 -z-0 size-[30rem] rounded-full bg-gold/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="container-content relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-display-lg font-semibold md:text-display-xl">
            {finalCTA.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-text-on-dark-muted">
            {finalCTA.body}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="primary" size="lg" onClick={() => openCheckout()}>
              {finalCTA.cta.label}
            </Button>
            <a
              href={finalCTA.secondary.href}
              className="text-sm text-text-on-dark-muted underline-offset-4 transition hover:text-gold hover:underline"
            >
              {finalCTA.secondary.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
