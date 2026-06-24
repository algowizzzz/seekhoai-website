"use client";

import { Check } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { whoFor } from "@/content/content";

export function WhoFor() {
  return (
    <section className="relative bg-cream-2 py-12 md:py-32">
      <div className="container-content">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">WHO THIS IS FOR</p>
          <h2 className="mt-4 font-display text-display-lg font-semibold text-ink">
            {whoFor.title}
          </h2>
          <p className="mt-5 text-lg text-muted">{whoFor.intro}</p>
        </Reveal>

        <Reveal stagger className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
          {whoFor.groups.map((g) => (
            <RevealItem
              key={g.label}
              className="flex flex-col gap-5 rounded-lg border border-[color:var(--line)] bg-paper p-8 shadow-sm"
            >
              <p className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-teal-600">
                {g.label}
              </p>
              <p className="text-muted">{g.body}</p>
              <ul className="mt-auto space-y-2 border-t border-[color:var(--line)] pt-5">
                {g.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-gold-700"
                      strokeWidth={2.5}
                    />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
