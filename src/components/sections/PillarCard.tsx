"use client";

import { motion } from "framer-motion";

interface Props {
  id: string;
  title: string;
  description: string;
  index: number;
}

export function PillarCard({ id, title, description, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative overflow-hidden rounded-lg border border-[color:var(--line)] bg-paper p-5 shadow-sm md:min-h-[320px] md:p-10"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-2 select-none font-display text-[90px] font-bold leading-none text-gold opacity-20 md:right-6 md:top-4 md:text-[200px] md:opacity-25"
      >
        {id}
      </span>

      <div className="relative z-10 flex h-full flex-col">
        <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-teal-600 md:text-xs">
          PILLAR {id}
        </span>

        <div className="mt-3 md:mt-auto md:pt-12">
          <h3 className="text-balance font-display text-2xl font-semibold text-ink md:text-4xl">
            {title}
          </h3>
          <p className="mt-2 text-sm text-muted md:mt-4 md:text-lg">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
