"use client";

import { Quote } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { testimonials } from "@/content/content";

export function Testimonials() {
  return (
    <section
      className="relative py-24 md:py-40"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 1200px" }}
    >
      <div className="container-content">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">[ STUDENT VOICES ]</p>
          <h2 className="mt-4 font-display text-display-lg font-medium">
            Real students. Real results.
          </h2>
        </Reveal>

        <Reveal stagger className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 lg:gap-8">
          {testimonials.map((t, i) => (
            <RevealItem
              key={i}
              className="flex flex-col gap-6 rounded-3xl border border-border-subtle bg-elevated/40 p-8 backdrop-blur-sm md:p-10"
            >
              <Quote className="size-6 text-accent-warm" />
              <p className="text-lg leading-relaxed text-text-primary">"{t.quote}"</p>
              <div className="mt-auto border-t border-border-subtle pt-5">
                <p className="font-medium text-text-primary">{t.name}</p>
                <p className="mt-0.5 text-sm text-text-secondary">
                  {t.role} · {t.location}
                </p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
