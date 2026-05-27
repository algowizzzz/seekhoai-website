"use client";

import { Quote, Star, Users } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { udemyShowcase } from "@/content/content";

const SINGLE_ICONS: Record<
  "users" | "quote",
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  users: Users,
  quote: Quote,
};

function StatVisual({ icon }: { icon: "users" | "quote" | "stars" }) {
  if (icon === "stars") {
    return (
      <div
        className="flex h-9 items-center gap-0.5 md:h-12 md:gap-1"
        aria-label="5 star rating"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className="size-3.5 fill-accent-warm text-accent-warm md:size-5"
            aria-hidden
          />
        ))}
      </div>
    );
  }
  const Icon = SINGLE_ICONS[icon];
  return (
    <div className="grid size-9 place-items-center rounded-xl bg-accent-warm/15 text-accent-warm md:size-12">
      <Icon className="size-4 md:size-6" />
    </div>
  );
}

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
              <StatVisual icon={s.icon} />
              <p className="mt-3 font-display text-2xl font-medium text-accent-warm md:mt-5 md:text-5xl">
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
