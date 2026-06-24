import Link from "next/link";
import { Check, ExternalLink } from "lucide-react";
import { udemyCourseUrl } from "@/content/content";
import { PixelPurchase } from "@/components/tracking/PixelPurchase";
import { GAPurchase } from "@/components/tracking/GAPurchase";

export const metadata = {
  title: "You're in. — SeekhoAI",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-6 py-16 text-ink">
      <PixelPurchase />
      <GAPurchase />
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <div className="grid size-20 place-items-center rounded-pill bg-gold/15 ring-2 ring-gold/40">
          <Check className="size-10 text-gold-700" strokeWidth={3} />
        </div>

        <div>
          <h1 className="font-display text-display-md font-semibold">
            You&apos;re <span className="text-gold-700">in.</span>
          </h1>
          <p className="mt-3 text-muted">
            Payment confirmed. We&apos;ve sent your receipt and access details by
            email. Open your course on Udemy below to get started.
          </p>
        </div>

        <a
          href={udemyCourseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-pill bg-gold px-6 py-3 font-semibold text-ink shadow-cta transition-all duration-200 ease-brand hover:bg-gold-600 hover:-translate-y-[1px]"
        >
          Open course on Udemy
          <ExternalLink className="size-4" />
        </a>

        <Link
          href="/"
          className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted-2 hover:text-muted"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
