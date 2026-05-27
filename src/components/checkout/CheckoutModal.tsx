"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import confetti from "canvas-confetti";
import { EnrollmentForm } from "@/components/forms/EnrollmentForm";
import { SuccessState } from "./SuccessState";
import { springModal } from "@/lib/motion-presets";
import { useCheckout } from "@/context/CheckoutContext";
import { useCoupon, priceWithCoupon } from "@/context/CouponContext";
import { pricing } from "@/content/content";

export function CheckoutModal() {
  const { isOpen, mode, close } = useCheckout();
  const isFree = mode === "free";
  const { discountPct } = useCoupon();
  const { final } = priceWithCoupon(pricing.price, discountPct);
  const [success, setSuccess] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setSuccess(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const handleSuccess = (url?: string) => {
    setRedirectUrl(url);
    setSuccess(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.45 },
      colors: ["#ff6b35", "#ffb084", "#4a9eff", "#f5f2eb"],
    });
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.55 },
        colors: ["#ff6b35", "#ffb084"],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.55 },
        colors: ["#4a9eff", "#8fc4ff"],
      });
    }, 250);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 grid place-items-center bg-base/95 px-4 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={springModal}
            className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-y-auto overflow-x-hidden rounded-3xl border border-border-strong bg-elevated shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between bg-elevated/95 px-6 pb-3 pt-6 backdrop-blur-sm">
              <h2
                id="checkout-title"
                className="font-display text-2xl font-medium"
              >
                {success
                  ? "You're in."
                  : isFree
                    ? "Claim your free course"
                    : "Complete enrollment"}
              </h2>
              <button
                type="button"
                onClick={close}
                className="grid size-9 place-items-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:text-text-primary"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-3">
              {success ? (
                <SuccessState redirectUrl={redirectUrl} />
              ) : (
                <EnrollmentForm
                  mode={mode}
                  onSuccess={handleSuccess}
                  finalPrice={final}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
