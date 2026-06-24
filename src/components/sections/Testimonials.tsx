"use client";

import Image from "next/image";
import { Star, StarHalf } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { testimonialSection } from "@/content/content";

function Stars({ count }: { count: number }) {
  const full = Math.floor(count);
  const hasHalf = count - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: full }).map((_, i) => (
        <Star
          key={`f-${i}`}
          className="size-4 fill-gold text-gold"
          strokeWidth={1.5}
        />
      ))}
      {hasHalf && (
        <StarHalf
          className="size-4 fill-gold text-gold"
          strokeWidth={1.5}
        />
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star
          key={`e-${i}`}
          className="size-4 text-gold/30"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const { eyebrow, title, intro, reviews } = testimonialSection;

  return (
    <section
      className="relative bg-cream py-12 md:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 1100px" }}
    >
      <div className="container-content">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-4 font-display text-display-lg font-semibold text-ink">
            {title}
          </h2>
          <p className="mt-5 text-lg text-muted">{intro}</p>
        </Reveal>

        {reviews.length > 0 && (
          <Reveal
            stagger
            className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:gap-8"
          >
            {reviews.map((r, i) => (
              <RevealItem
                key={i}
                className="flex flex-col gap-5 rounded-lg border border-[color:var(--line)] bg-paper p-8 shadow-sm md:p-10"
              >
                {r.src ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-cream-2">
                    <Image
                      src={r.src}
                      alt={r.alt ?? `Udemy review from ${r.name}`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <>
                    {r.rating ? <Stars count={r.rating} /> : null}
                    <p className="text-lg leading-relaxed text-ink italic md:text-xl">
                      &ldquo;{r.quote}&rdquo;
                    </p>
                  </>
                )}
                <div className="mt-auto flex items-baseline justify-between gap-4 border-t border-[color:var(--line)] pt-5">
                  <div>
                    <p className="font-semibold text-ink">{r.name}</p>
                    <p className="mt-0.5 text-sm text-muted">
                      {r.location ? `${r.location} · ` : ""}via Udemy
                    </p>
                  </div>
                  {r.when && (
                    <p className="text-sm text-muted-2">{r.when}</p>
                  )}
                </div>
              </RevealItem>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
