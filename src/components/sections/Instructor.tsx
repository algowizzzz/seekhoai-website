"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { instructor } from "@/content/content";
import { WithUdemyLinks } from "@/components/ui/UdemyLink";

export function Instructor() {
  return (
    <section
      id="instructor"
      className="relative bg-ink py-12 text-text-on-dark md:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 1200px" }}
    >
      {/* Soft teal glow in the corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 -z-0 size-96 rounded-full bg-teal-500/20 blur-3xl"
      />

      <div className="container-content relative z-10">
        <Reveal className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <p className="eyebrow eyebrow-on-dark">YOUR INSTRUCTOR</p>
            <h2 className="mt-4 font-display text-display-lg font-semibold">
              Meet <span className="text-gold">{instructor.name}</span>.
            </h2>
            <p className="mt-5 text-base text-gold">{instructor.title}</p>
            <p className="mt-6 max-w-xl text-lg text-text-on-dark-muted">
              <WithUdemyLinks text={instructor.bio} />
            </p>

            <a
              href={instructor.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold underline-offset-4 hover:underline"
            >
              {instructor.cta.label}
            </a>

            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {instructor.stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-teal-300">
                    {s.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-2xl font-semibold text-text-on-dark md:text-3xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-white/10 bg-teal-900 shadow-lg">
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
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-ink/0"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-teal-300">
                      FOUNDER
                    </p>
                    <p className="mt-1 font-display text-2xl font-semibold text-text-on-dark">
                      {instructor.name}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(135deg,#0a3a3c_0%,#0c494b_45%,#07302e_100%)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(244,180,85,0.25),transparent_60%)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(122,184,177,0.18),transparent_60%)]"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-teal-300">
                      PORTRAIT · PLACEHOLDER
                    </p>
                    <p className="mt-1 font-display text-2xl font-semibold">
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
