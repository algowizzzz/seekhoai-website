"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { hero } from "@/content/content";
import { Button } from "@/components/ui/Button";
import { EmailCaptureForm } from "@/components/forms/EmailCaptureForm";
import { HeroBackground } from "./HeroBackground";
import { WithUdemyLinks } from "@/components/ui/UdemyLink";
import { useCheckout } from "@/context/CheckoutContext";

const TRAILER_EMBED_URL =
  "https://www.youtube.com/embed/homKQ7wx9BY?rel=0";

export function Hero() {
  const { open: openCheckout } = useCheckout();
  return (
    <section id="hero" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-base">
      {/* Background: mesh gradient + animated SVG blobs + drifting particles */}
      <HeroBackground />

      {/* Dark gradient mask behind text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(10,14,26,0.2),rgba(10,14,26,0.85)_70%)]"
      />

      <div className="container-content relative z-20 pt-28 md:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary"
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
          <span className="block text-accent-warm">{hero.headline.accent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 max-w-2xl text-base text-text-secondary md:text-lg"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10"
        >
          <Button variant="warm" size="lg" onClick={openCheckout}>
            {hero.ctas.primary.label}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/[0.10] bg-elevated/40 shadow-2xl"
          style={{ aspectRatio: "16 / 9" }}
        >
          <iframe
            className="h-full w-full"
            src={TRAILER_EMBED_URL}
            title="Complete AI Bootcamp — Course Trailer"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-8"
        >
          <EmailCaptureForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-secondary md:mt-16"
        >
          <span className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className="size-4 fill-accent-warm text-accent-warm"
                aria-hidden
              />
            ))}
          </span>
          <span>
            <strong className="text-text-primary">{hero.trustStrip.rating}</strong> ·{" "}
            {hero.trustStrip.students} ·{" "}
            <WithUdemyLinks text={hero.trustStrip.featured} />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
