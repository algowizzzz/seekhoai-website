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
import { useFormTracking } from "@/lib/useFormTracking";
import { track } from "@/lib/analytics";

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

function formatPkr(amount: number) {
  return `${amount.toLocaleString("en-PK")} ${pricing.currency}`;
}

export function EnrollmentForm({ mode, onSuccess, finalPrice }: Props) {
  const { code, applied, discountPct } = useCoupon();
  const discount = pricing.price - finalPrice;
  const totalLabel = priceWithCoupon(pricing.price, discountPct).formatted;

  const isFree = mode === "free";
  const submitLabel = isFree
    ? "Get free access →"
    : `Continue to payment — ${applied ? totalLabel : formatPkr(pricing.price)}`;

  const formName = isFree ? "enroll_free" : "enroll_paid";
  const formTracking = useFormTracking(formName);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnrollmentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", phone: "" },
  });

  const onSubmit = async (values: EnrollmentFormValues) => {
    formTracking.markSubmitted();
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
      if (!data.ok) {
        track("form_submit_failed", { form_name: formName, status: res.status });
        return;
      }

      if (isFree) {
        track("generate_lead", { source: "enroll_free", coupon_code: code || null });
      } else {
        track("checkout_started", {
          value: finalPrice,
          currency: pricing.currency,
          coupon_code: code || null,
          discount_pct: discountPct,
        });
      }

      if (!isFree && data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }
      onSuccess(data.redirectUrl as string | undefined);
    } catch (err) {
      track("form_submit_failed", {
        form_name: formName,
        error: String(err).slice(0, 200),
      });
    }
  };

  const onInvalid = (errs: typeof errors) => {
    for (const [field, e] of Object.entries(errs)) {
      if (e) formTracking.trackValidationError(field, String(e.type ?? "invalid"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      onFocus={formTracking.onFocus}
      onBlur={formTracking.onBlur}
      className="space-y-4 px-6 pb-8"
    >
      <div className="rounded-md border border-[color:var(--line)] bg-cream-2/60 p-4 text-sm">
        <div className="flex items-center justify-between text-muted">
          <span>{isFree ? "Introduction to GenAI" : "Complete AI Bootcamp"}</span>
          <span className="font-semibold text-ink">
            {isFree ? "Free" : formatPkr(pricing.price)}
          </span>
        </div>
        {!isFree && applied && (
          <div className="mt-2 flex items-center justify-between">
            <span className="text-muted">Discount ({code})</span>
            <span className="font-semibold text-gold-700">
              −{formatPkr(discount)}
            </span>
          </div>
        )}
        <div className="mt-3 flex items-baseline justify-between border-t border-[color:var(--line)] pt-3">
          <span className="font-semibold text-ink">Total</span>
          <span className="font-display text-2xl font-semibold text-gold-700 md:text-3xl">
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

      <div className="sticky bottom-0 -mx-6 mt-6 bg-paper/95 px-6 pb-4 pt-3 backdrop-blur-sm md:static md:mx-0 md:bg-transparent md:px-0 md:pb-0 md:pt-0 md:backdrop-blur-none">
        <Button
          type="submit"
          variant="primary"
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

        <p className="mt-3 text-center text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted-2">
          {isFree
            ? "No card required — just your email"
            : "Secure checkout via Stripe"}
        </p>
      </div>
    </form>
  );
}
