"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { nav } from "@/content/content";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { useCheckout } from "@/context/CheckoutContext";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { open: openCheckout } = useCheckout();
  const pathname = usePathname();
  const onHome = pathname === "/";

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 80);
  });

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-cream/85 backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_0_0_var(--border-subtle)]"
          : "bg-cream/30 backdrop-blur-md",
      )}
    >
      <div className="container-content flex h-16 items-center justify-between md:h-[72px]">
        <a
          href={onHome ? "#hero" : "/"}
          className="inline-flex items-center transition-opacity hover:opacity-80"
        >
          <Wordmark tone="auto" size="nav" />
        </a>

        <Button
          variant="primary"
          size="sm"
          ctaLocation="nav"
          ctaLabel={nav.cta.label}
          onClick={() => openCheckout()}
        >
          {nav.cta.label}
        </Button>
      </div>
    </motion.nav>
  );
}
