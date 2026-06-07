import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CouponProvider } from "@/context/CouponContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { TrailerProvider } from "@/context/TrailerContext";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { TrailerModal } from "@/components/trailer/TrailerModal";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { MetaPixel } from "@/components/tracking/MetaPixel";
import { GoogleAnalytics } from "@/components/tracking/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seekhoai.pk"),
  title: "SeekhoAI — Complete AI Bootcamp | Master AI. Build the future.",
  description:
    "Join 38,099+ students learning Prompt Engineering, ChatGPT, MidJourney, and Vibe Coding. Self-paced. Lifetime access. From one of the world's top-rated AI instructors.",
  keywords: [
    "AI course",
    "Prompt Engineering",
    "ChatGPT",
    "MidJourney",
    "Vibe Coding",
    "AI Bootcamp",
    "SeekhoAI",
    "learn AI Pakistan",
  ],
  authors: [{ name: "SeekhoAI" }],
  openGraph: {
    title: "SeekhoAI — Complete AI Bootcamp",
    description:
      "Master Prompt Engineering, ChatGPT, MidJourney & Vibe Coding. 38,099+ students. Lifetime access.",
    type: "website",
    url: "https://seekhoai.pk",
    siteName: "SeekhoAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "SeekhoAI — Complete AI Bootcamp",
    description:
      "Master Prompt Engineering, ChatGPT, MidJourney & Vibe Coding. 38,099+ students.",
  },
  // Meta Business Manager domain verification (Brand Safety → Domains).
  // Renders <meta name="facebook-domain-verification" content="..."> in <head>.
  verification: {
    other: {
      "facebook-domain-verification": "eopi0b6ae0qy8wz7ytd5mmoneiowvn",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${mono.variable}`}>
      <body className="bg-base text-text-primary">
        <MetaPixel />
        <GoogleAnalytics />
        <CouponProvider>
          <CheckoutProvider>
            <TrailerProvider>
              {children}
              <CheckoutModal />
              <TrailerModal />
              <FloatingWhatsApp />
            </TrailerProvider>
          </CheckoutProvider>
        </CouponProvider>
      </body>
    </html>
  );
}
