"use client";

import { useEffect } from "react";
import { pricing } from "@/content/content";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Drop this on the success page to fire the Meta `Purchase` event.
// Idempotent guard so a quick refresh doesn't double-count.
export function PixelPurchase() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof window.fbq !== "function") return;

    const key = "seekhoai_purchase_fired";
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* sessionStorage blocked — fire anyway */
    }

    window.fbq("track", "Purchase", {
      value: pricing.price,
      currency: pricing.currency,
    });
  }, []);

  return null;
}
