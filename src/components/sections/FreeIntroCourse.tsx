import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { freeIntro } from "@/content/content";

export function FreeIntroCourse() {
  return (
    <section
      id="free-intro"
      className="relative bg-cream-2 py-12 md:py-24"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 800px" }}
    >
      <div className="container-content">
        <Reveal className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-xl border border-[color:var(--line-gold)] bg-paper p-8 shadow-lg md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-gold/20 blur-3xl"
            />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-pill border border-[color:var(--line-gold)] bg-gold-50 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gold-700">
                <Sparkles className="size-3" />
                {freeIntro.eyebrow}
              </span>

              <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.1] text-ink md:text-5xl lg:text-6xl">
                {freeIntro.title}
              </h2>

              <p className="mt-5 max-w-2xl text-lg text-muted">
                {freeIntro.subtitle}
              </p>

              <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-8">
                {freeIntro.bullets.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base text-muted"
                  >
                    <Check
                      className="mt-1 size-4 shrink-0 text-gold-700"
                      strokeWidth={2.5}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-8 flex flex-wrap items-center gap-3">
                {freeIntro.stats.map((s) => (
                  <li
                    key={s.label}
                    className="inline-flex items-baseline gap-2 rounded-pill border border-[color:var(--line)] bg-cream/60 px-4 py-2"
                  >
                    <span className="font-display text-base font-semibold text-ink">
                      {s.value}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-2">
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/free"
                  className="inline-flex items-center justify-center rounded-pill bg-gold px-7 py-3.5 font-sans text-base font-semibold text-ink shadow-cta transition-all duration-200 ease-brand hover:bg-gold-600 hover:-translate-y-[1px]"
                >
                  {freeIntro.cta.label}
                </Link>
                <p className="text-sm text-muted-2">
                  {freeIntro.footnote}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
