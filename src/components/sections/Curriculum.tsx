"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { curriculum } from "@/content/content";
import { useSectionView } from "@/lib/useSectionView";

export function Curriculum() {
  const sectionRef = useSectionView("curriculum");
  const items = curriculum.modules.map((m) => ({
    id: m.number,
    number: `MODULE ${m.number}`,
    title: m.title,
    body: (
      <div className="space-y-5">
        <p className="text-base text-muted md:text-lg">
          {m.description}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-2">
          <span>{m.hours}</span>
          <span aria-hidden className="text-muted-2/50">
            •
          </span>
          <span>{m.lessons}</span>
        </div>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 pt-1 md:grid-cols-2">
          {m.topics.map((topic) => (
            <li key={topic} className="flex items-start gap-3">
              <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-gold" />
              <span className="flex-1 text-base text-muted">
                {topic}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <section
      id="curriculum"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative bg-cream py-12 md:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 1200px" }}
    >
      <div className="container-content">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">THE CURRICULUM</p>
          <h2 className="mt-4 font-display text-display-lg font-semibold text-ink">
            {curriculum.title}
          </h2>
          <p className="mt-5 text-lg text-muted">{curriculum.subtitle}</p>
        </Reveal>

        <Reveal className="mt-16 md:mt-20">
          <Accordion items={items} defaultOpen="01" trackingName="curriculum" />
        </Reveal>
      </div>
    </section>
  );
}
