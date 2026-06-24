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
            className="size-3.5 fill-gold text-gold md:size-5"
            aria-hidden
          />
        ))}
      </div>
    );
  }
  const Icon = SINGLE_ICONS[icon];
  return (
    <div className="grid size-9 place-items-center rounded-md bg-gold-50 text-gold-700 md:size-12">
      <Icon className="size-4 md:size-6" />
    </div>
  );
}

export function UdemyShowcase() {
  return (
    <section
      id="udemy-showcase"
      className="relative bg-cream py-16 md:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 800px" }}
    >
      <div className="container-content">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{udemyShowcase.eyebrow}</p>
          <h2 className="mt-4 font-display text-display-lg font-semibold text-ink">
            {udemyShowcase.title}
          </h2>
          <p className="mt-5 text-base text-muted md:text-lg">
            {udemyShowcase.subtitle}
          </p>
        </Reveal>

        <Reveal className="mt-8 grid grid-cols-3 gap-3 md:mt-14 md:gap-6">
          {udemyShowcase.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-[color:var(--line)] bg-paper p-4 shadow-sm md:p-8"
            >
              <StatVisual icon={s.icon} />
              <p className="mt-3 font-display text-2xl font-semibold text-ink md:mt-5 md:text-5xl">
                {s.value}
              </p>
              <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-2 md:mt-3 md:text-sm">
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
            className="inline-flex items-center justify-center rounded-pill bg-gold px-7 py-3.5 font-sans text-base font-semibold text-ink shadow-cta transition-all duration-200 ease-brand hover:bg-gold-600 hover:-translate-y-[1px]"
          >
            {udemyShowcase.cta.label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
