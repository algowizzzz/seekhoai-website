// Central analytics wrapper. Every custom event in the app goes through `track()`.
// Fires GA4 (gtag) and Meta Pixel where applicable, with the same payload shape.
// Safe to call before scripts load — calls are queued by gtag/fbq themselves.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

// Map of our internal event names → Meta Pixel standard events.
// Internal name is the source of truth; this just mirrors high-value events to Meta.
const META_STANDARD_EVENTS: Record<string, string> = {
  purchase: "Purchase",
  begin_checkout: "InitiateCheckout",
  generate_lead: "Lead",
  view_pricing: "ViewContent",
  whatsapp_click: "Contact",
  trailer_play: "ViewContent",
};

const DEBUG_KEY = "seekhoai_analytics_debug";

function isDebug() {
  if (typeof window === "undefined") return false;
  if (new URLSearchParams(window.location.search).has("analytics_debug")) {
    try {
      sessionStorage.setItem(DEBUG_KEY, "1");
    } catch {
      /* sessionStorage blocked */
    }
    return true;
  }
  try {
    return sessionStorage.getItem(DEBUG_KEY) === "1";
  } catch {
    return false;
  }
}

export function track(event: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  const cleaned: AnalyticsParams = {};
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    cleaned[k] = v;
  }
  if (isDebug()) cleaned.debug_mode = true;

  try {
    window.gtag?.("event", event, cleaned);
  } catch {
    /* swallow */
  }

  try {
    const metaEvent = META_STANDARD_EVENTS[event];
    if (metaEvent) {
      window.fbq?.("track", metaEvent, cleaned);
    } else {
      window.fbq?.("trackCustom", event, cleaned);
    }
  } catch {
    /* swallow */
  }

  if (isDebug()) {
    // eslint-disable-next-line no-console
    console.log("[analytics]", event, cleaned);
  }
}

// Sets a sticky GA4 user property — value rides along on every subsequent event
// in this session. Use for landing page, utm_source, device class, etc.
export function setUserProperties(props: AnalyticsParams) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("set", "user_properties", props);
  } catch {
    /* swallow */
  }
}

// Session-scoped state we attach to abandonment events so we know what
// the user was doing when they left. Updated by trackers throughout the session.
const sessionState = {
  maxScrollPct: 0,
  lastSectionSeen: "",
  ctaClicks: 0,
  pageLoadedAt: typeof performance !== "undefined" ? performance.now() : 0,
};

export const session = {
  recordScroll(pct: number) {
    if (pct > sessionState.maxScrollPct) sessionState.maxScrollPct = pct;
  },
  recordSectionView(id: string) {
    sessionState.lastSectionSeen = id;
  },
  recordCtaClick() {
    sessionState.ctaClicks += 1;
  },
  snapshot() {
    const now = typeof performance !== "undefined" ? performance.now() : 0;
    return {
      max_scroll_pct: Math.round(sessionState.maxScrollPct),
      last_section_seen: sessionState.lastSectionSeen || "(none)",
      cta_clicks_in_session: sessionState.ctaClicks,
      time_on_page_ms: Math.round(now - sessionState.pageLoadedAt),
    };
  },
};
