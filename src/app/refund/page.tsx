import type { Metadata } from "next";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Refund Policy | SeekhoAI",
  description:
    "Our 30-day money-back guarantee on paid SeekhoAI courses.",
};

const LAST_UPDATED = "1 June 2026";
const CONTACT_EMAIL = "hello@seekhoai.pk";

export default function RefundPage() {
  return (
    <main className="relative">
      <Nav />

      <section className="relative bg-cream-2 pt-32 pb-16 md:pt-44 md:pb-20">
        <div className="container-content">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">Legal</p>
            <h1 className="mt-4 font-display text-display-xl font-semibold text-ink">
              Refund <span className="text-gold-700">Policy</span>
            </h1>
            <p className="mt-5 text-base text-muted">
              Last updated: {LAST_UPDATED}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream pb-24 pt-16">
        <div className="container-content">
          <Reveal className="legal-prose mx-auto max-w-3xl">
            <h2>30-day money-back guarantee</h2>
            <p>
              We want you to feel confident enrolling in the SeekhoAI Complete AI
              Bootcamp. If the course isn&apos;t the right fit for you, you can
              request a full refund within <strong>30 days of purchase</strong>,
              no questions asked.
            </p>

            <h2>How to request a refund</h2>
            <ol>
              <li>
                Email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> from the
                email address you used to enrol.
              </li>
              <li>
                Use the subject line <strong>&ldquo;Refund request&rdquo;</strong>.
              </li>
              <li>
                Include your order/transaction reference (from your receipt) if
                you have it. If you don&apos;t, just include your full name and
                the date of purchase.
              </li>
            </ol>
            <p>
              You do not need to give a reason. You will not be asked to justify
              your decision.
            </p>

            <h2>Processing time</h2>
            <p>
              We aim to process refund requests within{" "}
              <strong>5 business days</strong> of receiving your email. The
              refund will be issued back to the original payment method
              (Stripe / JazzCash / Easypaisa). Depending on your bank or wallet,
              it can take an additional 5–10 business days for the funds to
              appear in your account.
            </p>

            <h2>Once a refund is issued</h2>
            <ul>
              <li>
                Your access to the paid course will be revoked.
              </li>
              <li>
                The free course remains available to you — your free access is
                not affected.
              </li>
              <li>
                You are welcome to re-enrol later at the price available at that
                time.
              </li>
            </ul>

            <h2>Exceptions</h2>
            <p>
              The 30-day guarantee covers normal use of the course. We may
              decline a refund only in narrow cases of clear abuse — for example,
              if multiple refunds are requested across multiple accounts created
              by the same person, or where access has been shared or
              redistributed in breach of our{" "}
              <a href="/terms">Terms of Service</a>.
            </p>

            <h2>Free course</h2>
            <p>
              The free course is, of course, free. There is nothing to refund.
              You can stop receiving emails or WhatsApp messages from us at any
              time by replying <strong>STOP</strong> on WhatsApp or using the
              unsubscribe link in any email.
            </p>

            <h2>Questions</h2>
            <p>
              If anything about this policy is unclear, email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> before you
              enrol — we&apos;re happy to answer.
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
