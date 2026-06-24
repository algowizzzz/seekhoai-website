import type { Metadata } from "next";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy | SeekhoAI",
  description:
    "How SeekhoAI collects, uses, and protects your information.",
};

const LAST_UPDATED = "1 June 2026";
const CONTACT_EMAIL = "hello@seekhoai.pk";

export default function PrivacyPage() {
  return (
    <main className="relative">
      <Nav />

      <section className="relative bg-cream-2 pt-32 pb-16 md:pt-44 md:pb-20">
        <div className="container-content">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">Legal</p>
            <h1 className="mt-4 font-display text-display-xl font-semibold text-ink">
              Privacy <span className="text-gold-700">Policy</span>
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
              This Privacy Policy explains what information SeekhoAI (&ldquo;we&rdquo;,
              &ldquo;our&rdquo;, or &ldquo;us&rdquo;) collects when you use our website,
              sign up for our free or paid courses, or interact with us on WhatsApp,
              and how that information is used and protected.
            </p>

            <h2>1. Information we collect</h2>
            <ul>
              <li>
                <strong>Information you give us:</strong> name, email address, and
                phone number when you sign up for the free course or enrol in the
                paid bootcamp.
              </li>
              <li>
                <strong>Payment information:</strong> handled by our payment
                processors (Stripe, JazzCash, Easypaisa). We do not store full
                card or wallet details on our servers.
              </li>
              <li>
                <strong>Communications:</strong> messages you send us by email or
                WhatsApp, and our responses.
              </li>
              <li>
                <strong>Usage data:</strong> pages visited, device type, approximate
                location (country/city), and referral source, collected through
                Google Analytics and the Meta Pixel.
              </li>
            </ul>

            <h2>2. How we use your information</h2>
            <ul>
              <li>Deliver the free course access link and paid course content.</li>
              <li>
                Send course-related messages, learning tips, and offers by email
                and WhatsApp (only where you have consented).
              </li>
              <li>Process payments and issue receipts.</li>
              <li>Improve the website, content, and ad performance.</li>
              <li>Respond to your questions and provide support.</li>
            </ul>

            <h2>3. Sharing with third parties</h2>
            <p>
              We share the minimum necessary information with the following service
              providers so that our service can function:
            </p>
            <ul>
              <li>
                <strong>Stripe, JazzCash, Easypaisa</strong> — payment processing.
              </li>
              <li>
                <strong>WhatsApp Business API provider</strong> — to send you the
                course access link and follow-up messages.
              </li>
              <li>
                <strong>Email provider</strong> — to send transactional and
                marketing emails.
              </li>
              <li>
                <strong>Google Analytics &amp; Meta Pixel</strong> — to measure
                website performance and ad effectiveness. These providers may set
                cookies on your device.
              </li>
            </ul>
            <p>
              We do not sell your personal information to anyone.
            </p>

            <h2>4. Cookies and tracking</h2>
            <p>
              We use cookies and similar technologies (including the Meta Pixel and
              Google Analytics) to understand how the site is used and to measure
              the performance of our ads. You can disable cookies in your browser
              settings; some site functionality may be affected.
            </p>

            <h2>5. Your rights</h2>
            <p>You can, at any time:</p>
            <ul>
              <li>Request a copy of the information we hold about you.</li>
              <li>Ask us to correct or delete your information.</li>
              <li>
                Unsubscribe from marketing emails (use the link at the bottom of
                any email) or WhatsApp messages (reply <strong>STOP</strong>).
              </li>
            </ul>
            <p>
              To exercise any of these rights, email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>

            <h2>6. How long we keep your information</h2>
            <p>
              We keep your information for as long as you have an active account or
              course access. If you ask us to delete your data, we will do so within
              30 days, except where we are legally required to keep certain
              records (for example, payment receipts for tax purposes).
            </p>

            <h2>7. Security</h2>
            <p>
              We use industry-standard measures to protect your information,
              including encrypted connections (HTTPS) and access controls. No
              system is perfectly secure, but we work to minimise risk.
            </p>

            <h2>8. Children</h2>
            <p>
              SeekhoAI is intended for users aged 18 and over. If you believe a
              child has provided us with personal information, please contact us
              and we will delete it.
            </p>

            <h2>9. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The &ldquo;Last
              updated&rdquo; date above will reflect the most recent change.
            </p>

            <h2>10. Contact us</h2>
            <p>
              Questions about privacy? Email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
