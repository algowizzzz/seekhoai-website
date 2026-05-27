"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { pricing } from "@/content/content";
import { useCoupon, priceWithCoupon } from "@/context/CouponContext";
import type { CheckoutMode } from "@/context/CheckoutContext";

const schema = z.object({
  email: z
    .string()
    .min(5, "Enter a valid email")
    .regex(
      /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email (must include @ and a domain)",
    ),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || /^[+()\d\s-]{6,20}$/.test(v), {
      message: "Use digits, spaces, +, ( ) or -",
    }),
});

export type EnrollmentFormValues = z.infer<typeof schema>;

interface Props {
  mode: CheckoutMode;
  onSuccess: (redirectUrl?: string) => void;
  finalPrice: number;
}

export function EnrollmentForm({ mode, onSuccess, finalPrice }: Props) {
  const { code, applied, discountPct } = useCoupon();
  const discount = pricing.price - finalPrice;
  const totalLabel = priceWithCoupon(pricing.price, discountPct).formatted;

  const isFree = mode === "free";
  const submitLabel = isFree
    ? "Get free access →"
    : applied
      ? `Continue to payment — ${totalLabel}`
      : `Continue to payment — $${pricing.price}`;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnrollmentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", phone: "" },
  });

  const onSubmit = async (values: EnrollmentFormValues) => {
    const endpoint = isFree ? "/api/enroll/free" : "/api/checkout";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          phone: values.phone?.trim() || null,
          couponCode: isFree ? null : code,
        }),
      });
      const data = await res.json();
      if (!data.ok) return;

      // Paid: server returns a Stripe Checkout URL — hard-redirect to it.
      // Free: server returns the Udemy enroll URL — let the modal show success first.
      if (!isFree && data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }
      onSuccess(data.redirectUrl as string | undefined);
    } catch {
      /* swallow */
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 pb-8">
      <div className="rounded-2xl border border-border-subtle bg-base/40 p-4 text-sm">
        <div className="flex items-center justify-between text-text-secondary">
          <span>{isFree ? "Introduction to GenAI" : "Complete AI Bootcamp"}</span>
          <span className="font-medium">
            {isFree ? "Free" : `$${pricing.price.toFixed(2)}`}
          </span>
        </div>
        {!isFree && applied && (
          <div className="mt-2 flex items-center justify-between">
            <span className="text-text-secondary">Discount ({code})</span>
            <span className="font-medium text-accent-warm">
              −${discount.toFixed(2)}
            </span>
          </div>
        )}
        <div className="mt-3 flex items-baseline justify-between border-t border-white/10 pt-3">
          <span className="font-medium text-text-primary">Total</span>
          <span className="font-bold text-2xl text-accent-warm md:text-3xl">
            {isFree ? "Free" : totalLabel}
          </span>
        </div>
      </div>

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Phone (optional)"
        type="tel"
        autoComplete="tel"
        placeholder="+92 300 1234567"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <div className="sticky bottom-0 -mx-6 mt-6 bg-elevated/95 px-6 pb-4 pt-3 backdrop-blur-sm md:static md:mx-0 md:bg-transparent md:px-0 md:pb-0 md:pt-0 md:backdrop-blur-none">
        <Button
          type="submit"
          variant="warm"
          size="lg"
          className="w-full font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {isFree ? "Setting up…" : "Redirecting to Stripe…"}
            </>
          ) : (
            submitLabel
          )}
        </Button>

        <p className="mt-3 text-center font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-tertiary">
          {isFree
            ? "No card required — just your email"
            : "Secure checkout via Stripe"}
        </p>
      </div>
    </form>
  );
}
