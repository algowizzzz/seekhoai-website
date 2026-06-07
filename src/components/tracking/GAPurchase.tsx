"use client";

import { useEffect } from "react";
import { pricing, brand } from "@/content/content";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Fires the GA4 `purchase` ecommerce event on /success.
// Idempotent: a session-storage flag prevents double-fires on quick refresh.
export function GAPurchase() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;

    const key = "seekhoai_ga_purchase_fired";
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* sessionStorage blocked — fire anyway */
    }

    window.gtag("event", "purchase", {
      transaction_id: `seekhoai-${Date.now()}`,
      value: pricing.price,
      currency: pricing.currency,
      items: [
        {
          item_id: "complete-ai-bootcamp",
          item_name: brand.course,
          price: pricing.price,
          quantity: 1,
        },
      ],
    });
  }, []);

  return null;
}
