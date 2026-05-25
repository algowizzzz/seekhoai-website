"use client";

import { Reveal } from "@/components/motion/Reveal";
import { udemyShowcase } from "@/content/content";

export function UdemyShowcase() {
  return (
    <section
      id="udemy-showcase"
      className="relative py-16 md:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 800px" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-warm opacity-25"
      />

      <div className="container-content">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">[ {udemyShowcase.eyebrow} ]</p>
          <h2 className="mt-4 font-display text-display-lg font-medium">
            {udemyShowcase.title}
          </h2>
          <p className="mt-5 text-base text-text-secondary md:text-lg">
            {udemyShowcase.subtitle}
          </p>
        </Reveal>

        {/* Stats row — 3 columns, condensed on mobile */}
        <Reveal className="mt-8 grid grid-cols-3 gap-3 md:mt-14 md:gap-6">
          {udemyShowcase.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/[0.08] bg-elevated/40 p-4 backdrop-blur-sm md:p-8"
            >
              <p className="font-display text-2xl font-medium text-accent-warm md:text-5xl">
                {s.value}
              </p>
              <p className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-text-tertiary md:mt-3 md:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-10 md:mt-14">
          <a
            href={udemyShowcase.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-accent-warm px-7 py-3.5 font-display text-base font-medium text-black transition-transform duration-200 hover:scale-[1.02]"
          >
            {udemyShowcase.cta.label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
