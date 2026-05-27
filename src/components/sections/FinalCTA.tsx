"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { finalCTA, pricing } from "@/content/content";
import { useCoupon, priceWithCoupon } from "@/context/CouponContext";
import { useCheckout } from "@/context/CheckoutContext";

export function FinalCTA() {
  const { open: openCheckout } = useCheckout();
  const { applied, discountPct } = useCoupon();
  const { formatted } = priceWithCoupon(pricing.price, discountPct);
  const label = applied ? `Enroll Now — ${formatted}` : finalCTA.cta.label;

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
          <div className="mt-10 flex justify-center">
            <Button variant="warm" size="lg" onClick={() => openCheckout()}>
              {label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
