"use client";

import { Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { freeIntro } from "@/content/content";

export function FreeIntroCourse() {
  return (
    <section
      id="free-intro"
      className="relative py-24 md:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 800px" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-warm opacity-25"
      />

      <div className="container-content">
        <Reveal className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-accent-warm/30 bg-elevated/60 p-8 backdrop-blur-md md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent-warm/15 blur-3xl"
            />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-warm/40 bg-accent-warm/10 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-warm">
                <Sparkles className="size-3" />
                {freeIntro.eyebrow}
              </span>

              <h2 className="mt-5 font-display text-display-lg font-medium md:text-display-xl">
                {freeIntro.title}
              </h2>

              <p className="mt-5 max-w-2xl text-lg text-text-secondary">
                {freeIntro.subtitle}
              </p>

              <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-8">
                {freeIntro.bullets.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base text-text-secondary"
                  >
                    <Check
                      className="mt-1 size-4 shrink-0 text-accent-warm"
                      strokeWidth={2.5}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-8 flex flex-wrap items-center gap-3">
                {freeIntro.stats.map((s) => (
                  <li
                    key={s.label}
                    className="inline-flex items-baseline gap-2 rounded-full border border-white/[0.08] bg-base/40 px-4 py-2 backdrop-blur-sm"
                  >
                    <span className="font-display text-base font-semibold text-accent-warm">
                      {s.value}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-text-tertiary">
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a
                  href={freeIntro.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-accent-warm px-7 py-3.5 font-display text-base font-medium text-black transition-transform duration-200 hover:scale-[1.02]"
                >
                  {freeIntro.cta.label}
                </a>
                <p className="text-sm text-text-tertiary">
                  {freeIntro.footnote}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
