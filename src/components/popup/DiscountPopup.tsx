"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, X } from "lucide-react";
import confetti from "canvas-confetti";
import { popup, discountCode } from "@/content/content";
import { useCoupon } from "@/context/CouponContext";
import { usePopupTriggers } from "./usePopupTriggers";
import { Button } from "@/components/ui/Button";
import { springModal } from "@/lib/motion-presets";

const CouponScene = dynamic(
  () => import("./CouponScene").then((m) => m.CouponScene),
  { ssr: false, loading: () => null },
);

// Strict email schema + optional phone. If phone is provided, it must contain
// at least 7 digits (after stripping +/space/dashes/parens).
const popupSchema = z.object({
  email: z
    .string()
    .min(5, popup.emailInvalid)
    .regex(/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/, popup.emailInvalid),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || v.replace(/[\s+\-()]/g, "").replace(/\D/g, "").length >= 7,
      popup.phoneInvalid,
    ),
});

type PopupForm = z.infer<typeof popupSchema>;

export function DiscountPopup() {
  const { shouldShow, onDismiss, onClaim } = usePopupTriggers();
  const [open, setOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { apply } = useCoupon();
  const titleId = "discount-popup-title";
  const formRef = useRef<HTMLFormElement>(null);
  const successButtonRef = useRef<HTMLButtonElement>(null);

  const { register, handleSubmit, formState, reset } = useForm<PopupForm>({
    resolver: zodResolver(popupSchema),
  });

  const handleDismiss = () => {
    setOpen(false);
    onDismiss();
    setTimeout(() => {
      setSubmitState("idle");
      reset();
    }, 300);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    if (shouldShow) setOpen(true);
  }, [shouldShow]);

  // Body lock + Escape
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onSubmit = async (values: PopupForm) => {
    setSubmitState("loading");
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          phone: values.phone || undefined,
          source: "popup",
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setSubmitState("error");
        return;
      }

      // Apply the coupon client-side so pricing reflects it immediately
      apply(discountCode.code, discountCode.pct);
      onClaim();
      setSubmitState("success");

      // Confetti from the form
      if (formRef.current) {
        const rect = formRef.current.getBoundingClientRect();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          },
          colors: ["#ff6b35", "#ffb084", "#f5f2eb"],
        });
      }

      // Focus the "continue" button after success
      setTimeout(() => successButtonRef.current?.focus(), 100);
    } catch {
      setSubmitState("error");
    }
  };

  const handleContinueToPricing = () => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById("pricing");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setSubmitState("idle");
      reset();
    }, 350);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="discount-popup"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.35 }}
          className="fixed inset-0 z-[60] grid place-items-center bg-base/95 px-4 backdrop-blur-2xl"
          onClick={handleDismiss}
        >
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
            transition={reducedMotion ? { duration: 0.18 } : springModal}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-3xl border border-border-strong bg-elevated shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-none sticky top-0 z-20 h-0">
              <button
                type="button"
                onClick={handleDismiss}
                className="pointer-events-auto absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-border-subtle bg-base/60 text-text-secondary backdrop-blur-sm transition-colors hover:text-text-primary"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col">
              <div className="px-6 pt-4 md:px-10 md:pt-6">
                <p className="eyebrow">[ {popup.eyebrow} ]</p>
                <h2
                  id={titleId}
                  className="mt-3 font-display text-display-md font-medium"
                >
                  {submitState === "success" ? popup.successTitle : popup.title}
                </h2>
              </div>

              <div className="mt-4 px-4 md:mt-6 md:px-10">
                <CouponScene reducedMotion={reducedMotion} />
              </div>

              <div className="mt-4 px-6 md:mt-6 md:px-10">
                {submitState === "success" ? (
                  <p className="text-base text-text-secondary md:text-lg">
                    {popup.successBody}
                  </p>
                ) : (
                  <p className="text-base text-text-secondary md:text-lg">
                    {popup.bodyBefore}{" "}
                    <span className="font-mono font-medium text-accent-warm">
                      {popup.code}
                    </span>{" "}
                    {popup.bodyAfter}{" "}
                    <span className="font-medium text-text-primary">
                      {popup.bodyEnd}
                    </span>
                  </p>
                )}
              </div>

              <div className="sticky bottom-0 mt-4 bg-elevated/95 px-6 pb-4 pt-3 backdrop-blur-sm md:static md:mt-6 md:bg-transparent md:px-10 md:pb-8 md:pt-0 md:backdrop-blur-none">
                {submitState === "success" ? (
                  <>
                    <div className="mb-4 flex items-center justify-center gap-3 rounded-full border border-accent-warm/40 bg-accent-warm/10 px-5 py-3 text-sm text-text-primary">
                      <Check className="size-4 text-accent-warm" />
                      <span>
                        Discount applied · code{" "}
                        <span className="font-mono font-medium text-accent-warm">
                          {discountCode.code}
                        </span>
                      </span>
                    </div>
                    <Button
                      ref={successButtonRef}
                      variant="warm"
                      size="lg"
                      className="w-full"
                      onClick={handleContinueToPricing}
                    >
                      See discounted pricing →
                    </Button>
                  </>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                  >
                    <label htmlFor="popup-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="popup-email"
                      type="email"
                      autoComplete="email"
                      placeholder={popup.emailPlaceholder}
                      {...register("email")}
                      disabled={submitState === "loading"}
                      className="block h-11 w-full rounded-2xl border border-border-subtle bg-subtle/80 px-4 text-sm text-text-primary placeholder:text-text-tertiary backdrop-blur-sm focus:border-accent-warm-2 focus:outline-none disabled:opacity-60"
                    />
                    {formState.errors.email && (
                      <p className="mt-2 pl-5 text-xs text-red-400">
                        {formState.errors.email.message}
                      </p>
                    )}

                    <label htmlFor="popup-phone" className="sr-only">
                      Phone number
                    </label>
                    <input
                      id="popup-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder={popup.phonePlaceholder}
                      {...register("phone")}
                      disabled={submitState === "loading"}
                      className="mt-2 block h-11 w-full rounded-2xl border border-border-subtle bg-subtle/80 px-4 text-sm text-text-primary placeholder:text-text-tertiary backdrop-blur-sm focus:border-accent-warm-2 focus:outline-none disabled:opacity-60"
                    />
                    {formState.errors.phone && (
                      <p className="mt-2 pl-5 text-xs text-red-400">
                        {formState.errors.phone.message}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitState === "loading"}
                      className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-accent-warm px-5 text-sm font-medium text-base transition-all duration-200 hover:bg-accent-warm-2 disabled:opacity-70"
                    >
                      {submitState === "loading" ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        popup.primaryCta
                      )}
                    </button>
                    {submitState === "error" && (
                      <p className="mt-2 pl-5 text-xs text-red-400">
                        Something went wrong. Please try again.
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={handleDismiss}
                      className="mx-auto mt-3 block text-sm text-text-tertiary transition-colors hover:text-text-secondary"
                    >
                      {popup.dismissCta}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
