"use client";

export function TrustStrip() {
  return (
    <section
      aria-label="Instructor background"
      className="relative border-y border-[color:var(--line)] bg-cream-2"
    >
      <div className="container-content py-7 md:py-8">
        <p className="text-center text-lg leading-relaxed text-ink md:whitespace-nowrap md:text-xl">
          Taught on <strong className="font-semibold">Udemy</strong> by an
          instructor with a decade at{" "}
          <strong className="font-semibold">Deloitte</strong>,{" "}
          <strong className="font-semibold">PwC</strong>,{" "}
          <strong className="font-semibold">BMO</strong>, and{" "}
          <strong className="font-semibold">Microsoft</strong>.
        </p>
      </div>
    </section>
  );
}
