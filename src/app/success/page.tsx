// Landing page after a successful Stripe checkout.
// We don't trust the redirect alone — the source of truth for "paid" is the
// webhook. This page just shows a confirmation and points buyers at their
// course on Udemy.

import Link from "next/link";
import { Check, ExternalLink } from "lucide-react";
import { udemyCourseUrl } from "@/content/content";
import { PixelPurchase } from "@/components/tracking/PixelPurchase";

export const metadata = {
  title: "You're in. — SeekhoAI",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-base px-6 py-16 text-text-primary">
      <PixelPurchase />
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <div className="grid size-20 place-items-center rounded-full bg-accent-warm/15 ring-2 ring-accent-warm/40">
          <Check className="size-10 text-accent-warm" strokeWidth={3} />
        </div>

        <div>
          <h1 className="font-display text-3xl font-medium md:text-4xl">
            You're in.
          </h1>
          <p className="mt-3 text-text-secondary">
            Payment confirmed. We've sent your receipt and access details by
            email. Open your course on Udemy below to get started.
          </p>
        </div>

        <a
          href={udemyCourseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent-warm px-6 py-3 font-display font-medium text-black transition-transform duration-200 hover:scale-[1.02]"
        >
          Open course on Udemy
          <ExternalLink className="size-4" />
        </a>

        <Link
          href="/"
          className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-tertiary hover:text-text-secondary"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
