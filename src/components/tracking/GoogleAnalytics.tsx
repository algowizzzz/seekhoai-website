"use client";

import Script from "next/script";

// Google Analytics 4 sitewide loader.
// Reads NEXT_PUBLIC_GA_MEASUREMENT_ID at build time; renders nothing if
// unset (so dev environments without an ID don't fire stray hits).
//
// Enhanced measurement (auto pageviews on SPA route changes, scroll depth,
// outbound clicks, file downloads) is configured in the GA4 web stream
// settings — not here. This file just initializes gtag with the ID.
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: true });`}
      </Script>
    </>
  );
}
