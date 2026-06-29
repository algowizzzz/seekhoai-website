"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { faq } from "@/content/content";
import { WithUdemyLinks } from "@/components/ui/UdemyLink";
import { useSectionView } from "@/lib/useSectionView";

export function FAQ() {
  const sectionRef = useSectionView("faq");
  const items = faq.map((f, i) => ({
    id: `faq-${i}`,
    title: f.q,
    body: (
      <p className="text-base text-muted">
        <WithUdemyLinks text={f.a} />
      </p>
    ),
  }));

  return (
    <section
      id="faq"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative bg-cream py-12 md:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 1200px" }}
    >
      <div className="container-content">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 font-display text-display-lg font-semibold text-ink">
            Questions, answered.
          </h2>
        </Reveal>

        <Reveal className="mx-auto mt-16 max-w-3xl md:mt-20">
          <Accordion items={items} trackingName="faq" />
        </Reveal>
      </div>
    </section>
  );
}
