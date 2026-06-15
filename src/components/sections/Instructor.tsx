"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { instructor } from "@/content/content";
import { WithUdemyLinks } from "@/components/ui/UdemyLink";

export function Instructor() {
  return (
    <section
      id="instructor"
      className="relative py-12 md:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 1200px" }}
    >
      <div className="container-content">
        <Reveal className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <p className="eyebrow">[ YOUR INSTRUCTOR ]</p>
            <h2 className="mt-4 font-display text-display-lg font-medium">
              Meet {instructor.name}.
            </h2>
            <p className="mt-5 text-base text-accent-warm">{instructor.title}</p>
            <p className="mt-6 max-w-xl text-lg text-text-secondary">
              <WithUdemyLinks text={instructor.bio} />
            </p>

            <a
              href={instructor.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-warm underline-offset-4 hover:underline"
            >
              {instructor.cta.label}
            </a>

            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {instructor.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-tertiary">
                    {s.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-2xl font-medium text-text-primary md:text-3xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border-subtle bg-elevated">
              {instructor.photo ? (
                <>
                  <Image
                    src={instructor.photo}
                    alt={`${instructor.name} — founder of SeekhoAI`}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover object-top"
                    priority={false}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/70 via-base/0 to-base/0"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-text-tertiary">
                      FOUNDER
                    </p>
                    <p className="mt-1 font-display text-2xl text-text-primary">
                      {instructor.name}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(135deg,#1a2138_0%,#11172a_45%,#0a0e1a_100%)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(255,107,53,0.35),transparent_60%)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(74,158,255,0.18),transparent_60%)]"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-text-tertiary">
                      PORTRAIT · PLACEHOLDER
                    </p>
                    <p className="mt-1 font-display text-2xl">
                      {instructor.name}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
