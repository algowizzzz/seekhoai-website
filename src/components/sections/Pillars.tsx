"use client";

import { Reveal } from "@/components/motion/Reveal";
import { pillars } from "@/content/content";
import { PillarCard } from "./PillarCard";

export function Pillars() {
  return (
    <section id="pillars" className="relative bg-cream py-16 md:py-40">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">THE FOUR PILLARS</p>
          <h2 className="mt-4 font-display text-display-lg font-semibold text-ink">
            What you&apos;ll master.
          </h2>
          <p className="mt-5 text-lg text-muted">
            Four interlocking skill sets. Each one is enough to change your
            work. Together, they change your career.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-3 md:mt-20 md:grid-cols-2 md:gap-8">
          {pillars.map((p, index) => (
            <PillarCard
              key={p.id}
              id={p.id}
              title={p.title}
              description={p.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
