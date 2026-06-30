"use client";

import { motion } from "framer-motion";
import { hero } from "@/content/content";
import { Button } from "@/components/ui/Button";
import { YouTubeFacade } from "./YouTubeFacade";
import { useCheckout } from "@/context/CheckoutContext";

const TRAILER_VIDEO_ID = "homKQ7wx9BY";

export function Hero() {
  const { open: openCheckout } = useCheckout();
  return (
    <section
      id="hero"
      className="hero-mesh relative isolate flex min-h-[100svh] items-center"
    >
      {/* Diagonal light shaft (echoes the logo poster) */}
      <div aria-hidden className="hero-shaft" />

      <div className="container-content relative z-20 pt-28 md:pt-32">
        <p className="eyebrow eyebrow-on-dark">{hero.eyebrow}</p>

        {/* h1 is the LCP candidate — paint immediately, no fade-in. */}
        <h1 className="mt-6 max-w-4xl font-display text-display-xl font-semibold text-paper">
          <span className="block">{hero.headline.line1}</span>
          <span className="block">{hero.headline.line2}</span>
          {hero.headline.accent && (
            <span className="block text-gold">
              {hero.headline.accent}
            </span>
          )}
        </h1>

        <p className="mt-8 max-w-2xl text-base text-text-on-dark-muted md:text-lg">
          {hero.sub}
        </p>

        <ul className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-xs uppercase tracking-[0.16em] text-text-on-dark-muted md:text-sm">
          <li>{hero.trustStrip.students}</li>
          <li aria-hidden className="text-teal-300/60">·</li>
          <li>{hero.trustStrip.rating}</li>
          <li aria-hidden className="text-teal-300/60">·</li>
          <li>{hero.trustStrip.featured}</li>
        </ul>

        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button
            variant="primary"
            size="lg"
            ctaLocation="hero"
            ctaLabel={hero.ctas.primary.label}
            onClick={() => openCheckout()}
          >
            {hero.ctas.primary.label}
          </Button>
          <a
            href={hero.ctas.secondary.href}
            data-cta-location="hero"
            data-cta-label={hero.ctas.secondary.label}
            className="text-sm text-text-on-dark-muted underline-offset-4 transition hover:text-gold hover:underline"
          >
            {hero.ctas.secondary.label}
          </a>
        </div>

        {/* Trailer is below the fold on mobile. Fade in after hydration. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 mx-auto w-full max-w-4xl overflow-hidden rounded-lg border border-white/10 bg-black/30 shadow-lg md:mt-16"
          style={{ aspectRatio: "16 / 9" }}
        >
          <YouTubeFacade
            videoId={TRAILER_VIDEO_ID}
            title="Complete AI Bootcamp — Course Trailer"
          />
        </motion.div>
      </div>
    </section>
  );
}
