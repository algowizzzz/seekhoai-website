"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ExternalLink } from "lucide-react";
import { udemyCourseUrl } from "@/content/content";

interface Props {
  redirectUrl?: string;
}

export function SuccessState({ redirectUrl }: Props) {
  const target = redirectUrl || udemyCourseUrl;
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const id = setInterval(() => setSecondsLeft((n) => Math.max(0, n - 1)), 1000);
    const t = setTimeout(() => {
      window.location.href = target;
    }, 5000);
    return () => {
      clearInterval(id);
      clearTimeout(t);
    };
  }, [target]);

  return (
    <div className="flex flex-col items-center gap-6 px-6 py-10 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 14, stiffness: 200 }}
        className="grid size-20 place-items-center rounded-full bg-accent-warm/15 ring-2 ring-accent-warm/40"
      >
        <Check className="size-10 text-accent-warm" strokeWidth={3} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <h3 className="font-display text-3xl font-medium">You're in.</h3>
        <p className="mt-2 max-w-sm text-text-secondary">
          Redirecting you to your course on Udemy in {secondsLeft}s.
        </p>
      </motion.div>

      <motion.a
        href={target}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="inline-flex items-center gap-2 rounded-full bg-accent-warm px-6 py-3 font-display font-medium text-black transition-transform duration-200 hover:scale-[1.02]"
      >
        Open course now
        <ExternalLink className="size-4" />
      </motion.a>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-tertiary"
      >
        [ Demo mode — no real payment processed ]
      </motion.p>
    </div>
  );
}
