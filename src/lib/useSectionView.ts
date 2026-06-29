"use client";

import { useEffect, useRef } from "react";
import { track, session } from "@/lib/analytics";

// Observes a section element and fires `section_view` the first time
// at least 30% of it enters the viewport. Updates session state so abandonment
// events know which section the user was last looking at.
//
// For high-value sections (pricing, hero), pass `extraEvent` to also fire a
// named event like `view_pricing` (which is mapped to a Meta ViewContent).
export function useSectionView(
  sectionId: string,
  options?: { extraEvent?: string },
) {
  const ref = useRef<HTMLElement | null>(null);
  const seenRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seenRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            seenRef.current = true;
            session.recordSectionView(sectionId);
            track("section_view", {
              section_id: sectionId,
              time_to_view_ms: Math.round(performance.now()),
            });
            if (options?.extraEvent) {
              track(options.extraEvent, { section_id: sectionId });
            }
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: [0.3] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId, options?.extraEvent]);

  return ref;
}
