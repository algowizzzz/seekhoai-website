"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Check, MessageCircle, Star, StarHalf } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { brand, instructor, testimonialSection } from "@/content/content";

const FREE_COURSE_BULLETS = [
  "What generative AI really is, explained without the jargon.",
  "The three things every good prompt needs to get reliable output.",
  "Hands-on demos with ChatGPT, Custom GPTs, and more.",
  "How to tell when AI is the right tool for a task — and when it isn't.",
];

const FREE_COURSE_STATS = [
  { value: "14h 33m", label: "Total length" },
  { value: "179", label: "Lectures" },
  { value: "23", label: "Sections" },
];

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function fireLeadEvent() {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
}

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
          className="size-4 fill-accent-warm text-accent-warm"
          strokeWidth={1.5}
        />
      ))}
      {hasHalf && (
        <StarHalf
          className="size-4 fill-accent-warm text-accent-warm"
          strokeWidth={1.5}
        />
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star
          key={`e-${i}`}
          className="size-4 text-accent-warm/30"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string }
  | { status: "success" };

export function FreeLanding() {
  const formRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<FormState>({ status: "idle" });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const phone = (fd.get("phone") as string)?.trim();
    const consent = fd.get("consent") === "on";

    if (!name || !email || !phone) {
      setState({ status: "error", message: "Please fill in all three fields." });
      return;
    }
    if (!consent) {
      setState({
        status: "error",
        message: "Please tick the WhatsApp consent box so we can send your access link.",
      });
      return;
    }

    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/enroll/free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setState({
          status: "error",
          message: "Something went wrong. Please try again in a moment.",
        });
        return;
      }
      fireLeadEvent();
      setState({ status: "success" });
    } catch {
      setState({
        status: "error",
        message: "Network error. Please try again.",
      });
    }
  }

  return (
    <main className="relative bg-base">
      {/* Minimal top bar — logo only (per spec: no nav on /free) */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="container-content flex h-16 items-center md:h-20">
          <Link
            href="/"
            className="font-display text-xl font-medium tracking-tight"
          >
            {brand.name}
          </Link>
        </div>
      </header>

      {/* Hero + signup form */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-radial-warm opacity-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-radial-cool opacity-30"
        />

        <div className="container-content pb-20 pt-28 md:pb-32 md:pt-36">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12 lg:gap-20">
            <div className="md:col-span-7">
              <p className="eyebrow text-accent-warm">FREE · NO CARD REQUIRED</p>
              <h1 className="mt-4 font-display text-display-xl font-medium leading-[1.05]">
                Free 14-hour GenAI course —
                <br />
                <span className="text-accent-warm">start learning AI today.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-text-secondary">
                The full Introduction to GenAI course on Udemy, free. Over 14
                hours and 179 lectures that take you from zero to your first
                useful AI workflows. English with subtitles. Lifetime access.
              </p>

              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-text-secondary">
                <li>14h 33m</li>
                <li aria-hidden className="text-text-tertiary">·</li>
                <li>179 lectures</li>
                <li aria-hidden className="text-text-tertiary">·</li>
                <li>23 sections</li>
                <li aria-hidden className="text-text-tertiary">·</li>
                <li>38,099+ students</li>
              </ul>
            </div>

            <div className="md:col-span-5" ref={formRef} id="signup">
              <div className="rounded-3xl border border-border-strong bg-elevated/70 p-6 backdrop-blur-md md:p-8">
                {state.status === "success" ? (
                  <SuccessPanel />
                ) : (
                  <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <div>
                      <p className="font-display text-2xl font-medium">
                        Get free access
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">
                        Your access link comes straight to you on WhatsApp.
                      </p>
                    </div>

                    <Field
                      name="name"
                      label="Full name"
                      placeholder="Ahmed Khan"
                      autoComplete="name"
                    />
                    <Field
                      name="email"
                      label="Email"
                      placeholder="you@example.com"
                      type="email"
                      autoComplete="email"
                    />
                    <Field
                      name="phone"
                      label="WhatsApp number"
                      placeholder="+92 300 1234567"
                      type="tel"
                      autoComplete="tel"
                    />

                    <label className="flex items-start gap-3 text-sm text-text-secondary">
                      <input
                        type="checkbox"
                        name="consent"
                        defaultChecked
                        className="mt-1 size-4 rounded border-border-strong bg-base text-accent-warm focus:ring-accent-warm"
                      />
                      <span>
                        Send my course access + updates on WhatsApp.
                      </span>
                    </label>

                    <Button
                      type="submit"
                      variant="warm"
                      size="lg"
                      disabled={state.status === "submitting"}
                    >
                      {state.status === "submitting"
                        ? "Sending…"
                        : "Get free access"}
                    </Button>

                    {state.status === "error" && (
                      <p
                        role="alert"
                        className="text-sm text-accent-warm-2"
                      >
                        {state.message}
                      </p>
                    )}

                    <p className="text-center text-xs text-text-tertiary">
                      No spam. Unsubscribe any time.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 md:py-24">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">[ WHAT&apos;S INSIDE ]</p>
            <h2 className="mt-4 font-display text-display-lg font-medium">
              Here&apos;s what the free course covers.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <Reveal stagger className="md:col-span-7">
              <ul className="space-y-4">
                {FREE_COURSE_BULLETS.map((b) => (
                  <RevealItem
                    key={b}
                    className="flex items-start gap-3 text-base leading-relaxed text-text-primary md:text-lg"
                  >
                    <Check
                      className="mt-1 size-5 shrink-0 text-accent-warm"
                      strokeWidth={2.5}
                    />
                    <span>{b}</span>
                  </RevealItem>
                ))}
              </ul>
            </Reveal>

            <Reveal className="md:col-span-5">
              <dl className="grid grid-cols-3 gap-4">
                {FREE_COURSE_STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border-subtle bg-elevated/40 p-5 text-center"
                  >
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-text-tertiary">
                      {s.label}
                    </dt>
                    <dd className="mt-2 font-display text-xl font-medium text-text-primary md:text-2xl">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Proof — real reviews */}
      <section className="py-16 md:py-24">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">[ STUDENT VOICES ]</p>
            <h2 className="mt-4 font-display text-display-lg font-medium">
              Real students. Real reviews.
            </h2>
            <p className="mt-5 text-lg text-text-secondary">
              {testimonialSection.intro}
            </p>
          </Reveal>

          <Reveal
            stagger
            className="mt-12 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 lg:gap-8"
          >
            {testimonialSection.reviews.map((r, i) => (
              <RevealItem
                key={i}
                className="flex flex-col gap-4 rounded-3xl border border-border-subtle bg-elevated/40 p-7 backdrop-blur-sm md:p-8"
              >
                {typeof r.rating === "number" && <Stars count={r.rating} />}
                <p className="text-base leading-relaxed text-text-primary md:text-lg">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="mt-auto flex items-baseline justify-between gap-4 border-t border-border-subtle pt-4">
                  <div>
                    <p className="font-medium text-text-primary">{r.name}</p>
                    <p className="mt-0.5 text-sm text-text-secondary">
                      via Udemy
                    </p>
                  </div>
                  {r.when && (
                    <p className="text-sm text-text-tertiary">{r.when}</p>
                  )}
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Instructor blurb */}
      <section className="py-16 md:py-24">
        <div className="container-content">
          <Reveal className="mx-auto max-w-3xl">
            <p className="eyebrow">[ YOUR INSTRUCTOR ]</p>
            <h2 className="mt-4 font-display text-display-md font-medium">
              {instructor.title}
            </h2>
            <p className="mt-6 text-lg text-text-secondary">{instructor.bio}</p>
            <a
              href={instructor.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent-warm underline-offset-4 hover:underline"
            >
              {instructor.cta.label}
            </a>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-radial-warm opacity-50"
        />
        <div className="container-content">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-display-lg font-medium">
              Start free. Today.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-text-secondary">
              Your access link comes straight to you on WhatsApp the moment you
              sign up. No card. No catch.
            </p>
            <Button
              type="button"
              variant="warm"
              size="lg"
              className="mt-8"
              onClick={scrollToForm}
            >
              Get free access
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Minimal footer — legal links only (required for Meta ad approval) */}
      <footer className="border-t border-border-subtle py-10">
        <div className="container-content flex flex-col items-center justify-between gap-4 text-sm text-text-secondary md:flex-row">
          <p>© 2026 {brand.name}. All rights reserved.</p>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/privacy" className="hover:text-accent-warm">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-accent-warm">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/refund" className="hover:text-accent-warm">
                Refund
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-text-tertiary">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="h-11 rounded-xl border border-border-strong bg-base px-4 text-base text-text-primary placeholder-text-tertiary focus:border-accent-warm focus:outline-none focus:ring-2 focus:ring-accent-warm/30"
      />
    </label>
  );
}

function SuccessPanel() {
  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      <div className="inline-flex size-12 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
        <MessageCircle className="size-6" strokeWidth={2} />
      </div>
      <p className="font-display text-2xl font-medium">
        Check your WhatsApp.
      </p>
      <p className="text-sm text-text-secondary">
        Your free course is on its way. If you don&apos;t see it within a
        minute, also check your email inbox.
      </p>
    </div>
  );
}
