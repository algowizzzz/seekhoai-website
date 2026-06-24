"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { learnings } from "@/content/content";

export function Learnings() {
  const items = learnings.items.map((it) => ({
    id: it.id,
    number: `0${parseInt(it.id, 10)}`.slice(-2),
    title: it.title,
    body: <p className="text-base leading-relaxed text-muted md:text-lg">{it.body}</p>,
  }));

  return (
    <section
      id="learnings"
      className="relative bg-cream py-12 md:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 1200px" }}
    >
      <div className="container-content">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{learnings.eyebrow}</p>
          <h2 className="mt-4 font-display text-display-lg font-semibold text-ink">
            {learnings.title}
          </h2>
          <p className="mt-5 text-lg text-muted">{learnings.intro}</p>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <Accordion items={items} defaultOpen="01" />
        </Reveal>
      </div>
    </section>
  );
}
