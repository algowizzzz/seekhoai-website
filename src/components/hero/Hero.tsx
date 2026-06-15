"use client";

import { motion } from "framer-motion";
import { hero } from "@/content/content";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "./HeroBackground";
import { YouTubeFacade } from "./YouTubeFacade";
import { useCheckout } from "@/context/CheckoutContext";

const TRAILER_VIDEO_ID = "homKQ7wx9BY";

export function Hero() {
  const { open: openCheckout } = useCheckout();
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-base"
    >
      <HeroBackground />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(10,14,26,0.2),rgba(10,14,26,0.85)_70%)]"
      />

      <div className="container-content relative z-20 pt-28 md:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-xs uppercase tracking-[0.18em] text-accent-warm"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl font-display text-display-xl font-medium"
        >
          <span className="block">{hero.headline.line1}</span>
          <span className="block">{hero.headline.line2}</span>
          {hero.headline.accent && (
            <span className="block text-accent-warm">
              {hero.headline.accent}
            </span>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 max-w-2xl text-base text-text-secondary md:text-lg"
        >
          {hero.sub}
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-text-secondary md:text-sm"
        >
          <li>{hero.trustStrip.students}</li>
          <li aria-hidden className="text-text-tertiary">
            ·
          </li>
          <li>{hero.trustStrip.rating}</li>
          <li aria-hidden className="text-text-tertiary">
            ·
          </li>
          <li>{hero.trustStrip.featured}</li>
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <Button variant="warm" size="lg" onClick={() => openCheckout()}>
            {hero.ctas.primary.label}
          </Button>
          <a
            href={hero.ctas.secondary.href}
            className="text-sm text-text-secondary underline-offset-4 transition hover:text-accent-warm hover:underline"
          >
            {hero.ctas.secondary.label}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/[0.10] bg-elevated/40 shadow-2xl"
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
