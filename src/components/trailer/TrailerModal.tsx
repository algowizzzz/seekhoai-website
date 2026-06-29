"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useTrailer } from "@/context/TrailerContext";
import { track } from "@/lib/analytics";

const TRAILER_EMBED_URL =
  "https://www.youtube.com/embed/homKQ7wx9BY?autoplay=1&rel=0";

export function TrailerModal() {
  const { isOpen, close } = useTrailer();
  const openedAtRef = useRef(0);

  useEffect(() => {
    if (!isOpen) return;
    openedAtRef.current = performance.now();
    track("trailer_open", { source: "modal" });
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => {
      track("trailer_close", {
        watched_ms: Math.round(performance.now() - openedAtRef.current),
      });
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="trailer-title"
          className="fixed inset-0 z-50 grid place-items-center bg-ink/85 px-4 backdrop-blur-2xl"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative mx-4 w-full max-w-3xl rounded-lg border border-[color:var(--line)] bg-paper p-4 shadow-lg md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-pill border border-[color:var(--line)] bg-cream/80 text-muted backdrop-blur-sm transition-colors hover:text-ink hover:border-gold"
            >
              <X className="size-4" />
            </button>

            <h3
              id="trailer-title"
              className="mb-3 pr-12 font-display text-2xl font-semibold text-ink"
            >
              Course Trailer
            </h3>

            <div
              className="relative w-full overflow-hidden rounded-md"
              style={{ aspectRatio: "16 / 9" }}
            >
              <iframe
                className="absolute inset-0 h-full w-full"
                src={TRAILER_EMBED_URL}
                title="Prompt Engineering Bootcamp Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
