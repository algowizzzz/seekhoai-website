import type { Metadata } from "next";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Terms of Service | SeekhoAI",
  description:
    "The terms that govern your use of SeekhoAI courses and website.",
};

const LAST_UPDATED = "1 June 2026";
const CONTACT_EMAIL = "hello@seekhoai.pk";

export default function TermsPage() {
  return (
    <main className="relative">
      <Nav />

      <section className="relative bg-cream-2 pt-32 pb-16 md:pt-44 md:pb-20">
        <div className="container-content">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">Legal</p>
            <h1 className="mt-4 font-display text-display-xl font-semibold text-ink">
              Terms of <span className="text-gold-700">Service</span>
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
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
              use of SeekhoAI (the &ldquo;Service&rdquo;), including our website,
              free course, paid courses, and related communications. By signing
              up or making a purchase, you agree to these Terms.
            </p>

            <h2>1. Who we are</h2>
            <p>
              SeekhoAI is an online learning service offering AI courses to
              students worldwide, with a focus on learners in Pakistan. You can
              reach us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>

            <h2>2. Eligibility</h2>
            <p>
              You must be at least 18 years old (or have the consent of a parent or
              legal guardian) to use the Service.
            </p>

            <h2>3. Your account and access</h2>
            <ul>
              <li>
                You are responsible for keeping your login details and course
                access link confidential.
              </li>
              <li>
                Course access is granted to you personally; you may not share,
                resell, sublicense, or transfer access to another person.
              </li>
              <li>
                Paid course access includes lifetime access to the course you
                enrolled in and all future updates to that course.
              </li>
            </ul>

            <h2>4. Payments and pricing</h2>
            <ul>
              <li>
                The paid course is offered at <strong>999 PKR</strong> (down from
                4999 PKR), a single one-time payment.
              </li>
              <li>
                Payment is processed through Stripe, JazzCash, or Easypaisa.
              </li>
              <li>
                Prices may change in the future, but any change will not affect
                purchases already made.
              </li>
            </ul>

            <h2>5. Refunds</h2>
            <p>
              We offer a <strong>30-day money-back guarantee</strong> on paid
              courses. Full details are in our{" "}
              <a href="/refund">Refund Policy</a>.
            </p>

            <h2>6. Intellectual property</h2>
            <ul>
              <li>
                All course content — videos, slides, prompts, code, and written
                material — is owned by SeekhoAI or its instructors and is
                protected by copyright.
              </li>
              <li>
                You may use the content for your own learning. You may not
                download, redistribute, re-upload, or use the content to build a
                competing course.
              </li>
              <li>
                You retain ownership of anything you create using what you learn,
                including projects, businesses, and AI-generated work.
              </li>
            </ul>

            <h2>7. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Share your course access with anyone else.</li>
              <li>
                Scrape, copy, or republish course content on any other platform.
              </li>
              <li>
                Use the Service to harass, defame, or harm others, or for any
                unlawful purpose.
              </li>
              <li>
                Attempt to gain unauthorized access to our systems or another
                user&apos;s account.
              </li>
            </ul>
            <p>
              We may suspend or terminate access for breaches of these Terms,
              without refund where the breach is material.
            </p>

            <h2>8. Disclaimer of warranties</h2>
            <p>
              The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; basis. We do not guarantee specific income,
              employment, or career outcomes from completing any course. Results
              depend on your own effort and circumstances.
            </p>

            <h2>9. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, SeekhoAI will not be liable
              for indirect, incidental, or consequential damages arising from
              your use of the Service. Our total liability to you for any claim
              relating to the Service is limited to the amount you paid us in the
              twelve months before the claim.
            </p>

            <h2>10. Changes to the Service or these Terms</h2>
            <p>
              We may update the Service, course content, or these Terms from time
              to time. If we make a material change to the Terms, we will update
              the &ldquo;Last updated&rdquo; date and, where appropriate, notify
              you by email.
            </p>

            <h2>11. Governing law</h2>
            <p>
              These Terms are governed by the laws of the Islamic Republic of
              Pakistan. Any dispute will be subject to the exclusive jurisdiction
              of the courts of Karachi, Pakistan.
            </p>

            <h2>12. Contact</h2>
            <p>
              Questions about these Terms? Email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
