"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { nav, brand } from "@/content/content";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
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
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-base/70 backdrop-blur-xl shadow-[0_1px_0_0_var(--border-subtle)]"
          : "bg-transparent",
      )}
    >
      <div className="container-content flex h-16 items-center justify-between md:h-20">
        <a
          href={onHome ? "#hero" : "/"}
          className="font-display text-xl font-medium tracking-tight"
        >
          {brand.name}
        </a>

        <Button variant="primary" size="sm" onClick={() => openCheckout()}>
          {nav.cta.label}
        </Button>
      </div>
    </motion.nav>
  );
}
