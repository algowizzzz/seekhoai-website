"use client";

import { useEffect } from "react";
import { track, setUserProperties, session } from "@/lib/analytics";

const SCROLL_BUCKETS = [25, 50, 75, 90, 100] as const;
const SESSION_KEY = "seekhoai_session_attribution";

type SessionAttribution = {
  landing_page: string;
  referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

function captureSessionAttribution(): SessionAttribution {
  // Persisted once per browser session so it rides on every event,
  // even after the user navigates to /pay or /success.
  try {
    const cached = sessionStorage.getItem(SESSION_KEY);
    if (cached) return JSON.parse(cached) as SessionAttribution;
  } catch {
    /* sessionStorage blocked */
  }

  const params = new URLSearchParams(window.location.search);
  const attribution: SessionAttribution = {
    landing_page: window.location.pathname + window.location.search,
    referrer: document.referrer || "(direct)",
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_term: params.get("utm_term") || undefined,
    utm_content: params.get("utm_content") || undefined,
  };

  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(attribution));
  } catch {
    /* sessionStorage blocked */
  }
  return attribution;
}

function deviceClass() {
  const ua = navigator.userAgent;
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobile|Android|iPhone/i.test(ua)) return "mobile";
  return "desktop";
}

function connectionType() {
  // @ts-expect-error — non-standard but widely available
  const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  return c?.effectiveType || "unknown";
}

export function SessionTracker() {
  useEffect(() => {
    const attribution = captureSessionAttribution();

    setUserProperties({
      ...attribution,
      device_class: deviceClass(),
      connection_type: connectionType(),
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
    });

    const firedBuckets = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const total = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const pct = Math.min(100, Math.round((window.scrollY / total) * 100));
      session.recordScroll(pct);

      for (const bucket of SCROLL_BUCKETS) {
        if (pct >= bucket && !firedBuckets.has(bucket)) {
          firedBuckets.add(bucket);
          track("scroll_depth", { depth_pct: bucket });
        }
      }
    };

    let exitIntentFired = false;
    const onMouseLeave = (e: MouseEvent) => {
      if (exitIntentFired) return;
      if (e.clientY > 0) return;
      if (deviceClass() !== "desktop") return;
      exitIntentFired = true;
      track("exit_intent", session.snapshot());
    };

    let unloadFired = false;
    const fireUnload = (reason: "hidden" | "pagehide") => {
      if (unloadFired) return;
      unloadFired = true;
      track("page_unload", { unload_reason: reason, ...session.snapshot() });
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") fireUnload("hidden");
    };
    const onPageHide = () => fireUnload("pagehide");

    const onError = (e: ErrorEvent) => {
      track("exception", {
        description: `${e.message} @ ${e.filename}:${e.lineno}:${e.colno}`,
        fatal: false,
      });
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      track("exception", {
        description: `unhandled rejection: ${String(e.reason).slice(0, 200)}`,
        fatal: false,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
