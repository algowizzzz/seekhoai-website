"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Check, MessageCircle, Star, StarHalf } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { brand, instructor, testimonialSection } from "@/content/content";
import { track } from "@/lib/analytics";
import { useFormTracking } from "@/lib/useFormTracking";

const FREE_COURSE_BULLETS = [
  "What generative AI really is, explained without the jargon.",
  "The three things every good prompt needs to get reliable output.",
  "Hands-on demos with ChatGPT, Custom GPTs, and more.",
  "How to tell when AI is the right tool for a task — and when it isn't.",
];

const FREE_COURSE_STATS = [
  { value: "2 hours", label: "Total length" },
  { value: "GenAI + ChatGPT", label: "Focus" },
  { value: "Lifetime", label: "Access" },
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

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string }
  | { status: "success" };

export function FreeLanding() {
  const formRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<FormState>({ status: "idle" });
  const formTracking = useFormTracking("enroll_free_landing");

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
      formTracking.trackValidationError("required_fields", "missing");
      return;
    }
    if (!consent) {
      setState({
        status: "error",
        message: "Please tick the WhatsApp consent box so we can send your access link.",
      });
      formTracking.trackValidationError("consent", "unchecked");
      return;
    }

    formTracking.markSubmitted();
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
        track("form_submit_failed", { form_name: "enroll_free_landing", status: res.status });
        return;
      }
      fireLeadEvent();
      track("generate_lead", { source: "enroll_free_landing" });
      setState({ status: "success" });
    } catch (err) {
      setState({
        status: "error",
        message: "Network error. Please try again.",
      });
      track("form_submit_failed", {
        form_name: "enroll_free_landing",
        error: String(err).slice(0, 200),
      });
    }
  }

  return (
    <main className="relative bg-cream">
      {/* Minimal top bar — logo only */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="container-content flex h-16 items-center md:h-20">
          <Link href="/" className="inline-flex items-center transition-opacity hover:opacity-80">
            <Wordmark tone="auto" size="nav" />
          </Link>
        </div>
      </header>

      {/* Hero — dark ink */}
      <section className="hero-mesh relative isolate overflow-hidden">
        <div aria-hidden className="hero-shaft" />

        <div className="container-content relative z-10 pb-20 pt-28 md:pb-32 md:pt-36">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12 lg:gap-20">
            <div className="md:col-span-7">
              <p className="eyebrow eyebrow-on-dark">FREE · NO CARD REQUIRED</p>
              <h1 className="mt-4 font-display text-display-xl font-semibold leading-[1.05] text-paper">
                Free 2-hour intro to GenAI &amp; ChatGPT —
                <br />
                <span className="text-gold">start learning AI today.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-text-on-dark-muted">
                A focused intro to GenAI and ChatGPT. Covers what AI really
                is, how prompts work, and how to use ChatGPT for real
                workflows. English with subtitles. Lifetime access.
              </p>

              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.16em] text-text-on-dark-muted">
                <li>2 hours</li>
                <li aria-hidden className="text-teal-300/60">·</li>
                <li>GenAI + ChatGPT</li>
                <li aria-hidden className="text-teal-300/60">·</li>
                <li>Lifetime access</li>
                <li aria-hidden className="text-teal-300/60">·</li>
                <li>38,099+ students</li>
              </ul>
            </div>

            <div className="md:col-span-5" ref={formRef} id="signup">
              <div className="rounded-xl border border-white/15 bg-paper p-6 shadow-lg md:p-8">
                {state.status === "success" ? (
                  <SuccessPanel />
                ) : (
                  <form
                    onSubmit={onSubmit}
                    onFocus={formTracking.onFocus}
                    onBlur={formTracking.onBlur}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <p className="font-display text-2xl font-semibold text-ink">
                        Get free access
                      </p>
                      <p className="mt-1 text-sm text-muted">
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

                    <label className="flex items-start gap-3 text-sm text-muted">
                      <input
                        type="checkbox"
                        name="consent"
                        defaultChecked
                        className="mt-1 size-4 rounded border-[color:var(--line)] bg-paper text-gold focus:ring-gold"
                      />
                      <span>
                        Send my course access + updates on WhatsApp.
                      </span>
                    </label>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={state.status === "submitting"}
                    >
                      {state.status === "submitting"
                        ? "Sending…"
                        : "Get free access"}
                    </Button>

                    {state.status === "error" && (
                      <p role="alert" className="text-sm text-red-600">
                        {state.message}
                      </p>
                    )}

                    <p className="text-center text-xs text-muted-2">
                      No spam. Unsubscribe any time.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you get — cream */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">WHAT&apos;S INSIDE</p>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-ink">
              Here&apos;s what the free course covers.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <Reveal stagger className="md:col-span-7">
              <ul className="space-y-4">
                {FREE_COURSE_BULLETS.map((b) => (
                  <RevealItem
                    key={b}
                    className="flex items-start gap-3 text-base leading-relaxed text-ink md:text-lg"
                  >
                    <Check
                      className="mt-1 size-5 shrink-0 text-gold-700"
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
                    className="rounded-md border border-[color:var(--line)] bg-paper p-5 text-center shadow-sm"
                  >
                    <dt className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-2">
                      {s.label}
                    </dt>
                    <dd className="mt-2 font-display text-xl font-semibold text-ink md:text-2xl">
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
      <section className="bg-cream-2 py-16 md:py-24">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">STUDENT VOICES</p>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-ink">
              Real students. Real reviews.
            </h2>
            <p className="mt-5 text-lg text-muted">
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
                className="flex flex-col gap-4 rounded-lg border border-[color:var(--line)] bg-paper p-7 shadow-sm md:p-8"
              >
                {typeof r.rating === "number" && <Stars count={r.rating} />}
                <p className="text-lg leading-relaxed text-ink italic md:text-xl">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="mt-auto flex items-baseline justify-between gap-4 border-t border-[color:var(--line)] pt-4">
                  <div>
                    <p className="font-semibold text-ink">{r.name}</p>
                    <p className="mt-0.5 text-sm text-muted">
                      via Udemy
                    </p>
                  </div>
                  {r.when && (
                    <p className="text-sm text-muted-2">{r.when}</p>
                  )}
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Instructor blurb */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container-content">
          <Reveal className="mx-auto max-w-3xl">
            <p className="eyebrow">YOUR INSTRUCTOR</p>
            <h2 className="mt-4 font-display text-display-md font-semibold text-ink">
              {instructor.title}
            </h2>
            <p className="mt-6 text-lg text-muted">{instructor.bio}</p>
            <a
              href={instructor.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 underline-offset-4 hover:underline"
            >
              {instructor.cta.label}
            </a>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA — dark ink */}
      <section className="relative overflow-hidden bg-ink py-20 text-text-on-dark md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-1/4 -z-0 size-[30rem] rounded-full bg-teal-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-0 -z-0 size-[30rem] rounded-full bg-gold/15 blur-3xl"
        />
        <div className="container-content relative z-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-display-lg font-semibold">
              Start free. <span className="text-gold">Today.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-text-on-dark-muted">
              Your access link comes straight to you on WhatsApp the moment you
              sign up. No card. No catch.
            </p>
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="mt-8"
              ctaLocation="free_closing"
              ctaLabel="Get free access"
              onClick={scrollToForm}
            >
              Get free access
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="border-t border-white/10 bg-teal-900 py-10 text-text-on-dark-muted">
        <div className="container-content flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          <p>© 2026 {brand.name}. All rights reserved.</p>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/privacy" className="hover:text-gold">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-gold">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/refund" className="hover:text-gold">
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
      <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-2">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="h-11 rounded-md border border-[color:var(--line)] bg-cream/40 px-4 text-base text-ink placeholder:text-muted-2 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
      />
    </label>
  );
}

function SuccessPanel() {
  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      <div className="inline-flex size-12 items-center justify-center rounded-pill bg-[#25D366]/15 text-[#25D366]">
        <MessageCircle className="size-6" strokeWidth={2} />
      </div>
      <p className="font-display text-2xl font-semibold text-ink">
        Check your WhatsApp.
      </p>
      <p className="text-sm text-muted">
        Your free course is on its way. If you don&apos;t see it within a
        minute, also check your email inbox.
      </p>
    </div>
  );
}
