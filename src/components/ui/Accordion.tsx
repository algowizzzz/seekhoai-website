"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

interface AccordionItem {
  id: string;
  title: ReactNode;
  body: ReactNode;
  number?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: string | null;
  trackingName?: string;
}

export function Accordion({ items, className, defaultOpen = null, trackingName }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen);

  const handleToggle = (id: string, currentlyOpen: boolean) => {
    setOpenId(currentlyOpen ? null : id);
    if (!currentlyOpen && trackingName) {
      track("accordion_open", { accordion_name: trackingName, item_id: id });
    }
  };

  return (
    <div
      className={cn(
        "divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]",
        className,
      )}
    >
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => handleToggle(item.id, open)}
              aria-expanded={open}
              className="group flex w-full items-center gap-6 py-6 text-left transition-colors duration-200 hover:text-gold-700"
            >
              {item.number && (
                <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-muted-2 group-hover:text-gold-700">
                  {item.number}
                </span>
              )}
              <span className="flex-1 font-display text-2xl font-semibold text-ink md:text-3xl">
                {item.title}
              </span>
              <span
                aria-hidden
                className={cn(
                  "inline-flex size-9 shrink-0 items-center justify-center rounded-pill border border-[color:var(--line)] transition-all duration-200 ease-brand",
                  open
                    ? "rotate-45 border-gold bg-gold/10 text-gold-700"
                    : "text-muted group-hover:border-gold/60",
                )}
              >
                <Plus className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pl-0 md:pl-[5.5rem]">{item.body}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
