"use client";

import { Check } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { whoFor } from "@/content/content";

export function WhoFor() {
  return (
    <section className="relative py-12 md:py-32">
      <div className="container-content">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">[ WHO THIS IS FOR ]</p>
          <h2 className="mt-4 font-display text-display-lg font-medium">{whoFor.title}</h2>
        </Reveal>

        <Reveal stagger className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
          {whoFor.groups.map((g) => (
            <RevealItem
              key={g.label}
              className="flex flex-col gap-5 rounded-3xl border border-border-subtle bg-elevated/40 p-8 backdrop-blur-sm"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-warm">
                {g.label}
              </p>
              <p className="text-text-secondary">{g.body}</p>
              <ul className="mt-auto space-y-2 border-t border-border-subtle pt-5">
                {g.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-sm text-text-primary">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent-warm"
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
