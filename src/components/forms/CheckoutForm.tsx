"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { pricing } from "@/content/content";
import { useCoupon, priceWithCoupon } from "@/context/CouponContext";

const schema = z.object({
  email: z
    .string()
    .min(5, "Enter a valid email")
    .regex(
      /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email (must include @ and a domain)",
    ),
  cardName: z.string().min(2, "Required"),
  cardNumber: z
    .string()
    .min(15, "Enter a card number")
    .regex(/^[\d\s]+$/, "Digits only"),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, "MM/YY"),
  cvc: z.string().regex(/^\d{3,4}$/, "3–4 digits"),
});

export type CheckoutFormValues = z.infer<typeof schema>;

interface Props {
  onSuccess: (redirectUrl?: string) => void;
  finalPrice: number;
}

export function CheckoutForm({ onSuccess, finalPrice }: Props) {
  const { code, applied, discountPct } = useCoupon();
  const discount = pricing.price - finalPrice;
  const totalLabel = priceWithCoupon(pricing.price, discountPct).formatted;
  const payLabel = applied ? `Pay ${totalLabel}` : `Pay $${pricing.price}`;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      cardNumber: "4242 4242 4242 4242",
      expiry: "12/29",
      cvc: "123",
    },
  });

  const cardNumberValue = watch("cardNumber");

  const onSubmit = async (values: CheckoutFormValues) => {
    // Mock 1.8s combined: 800ms here + 1000ms server
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          couponCode: code,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        await new Promise((r) => setTimeout(r, 400));
        onSuccess(data.redirectUrl as string | undefined);
      }
    } catch {
      /* swallow — mock */
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 pb-8">
      <div className="rounded-2xl border border-border-subtle bg-base/40 p-4 text-sm">
        <div className="flex items-center justify-between text-text-secondary">
          <span>Complete AI Bootcamp</span>
          <span className="font-medium">${pricing.price.toFixed(2)}</span>
        </div>
        {applied && (
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
            {totalLabel}
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
        label="Name on card"
        autoComplete="cc-name"
        placeholder="Saad A"
        error={errors.cardName?.message}
        {...register("cardName")}
      />

      <Input
        label="Card number"
        inputMode="numeric"
        autoComplete="cc-number"
        value={cardNumberValue}
        onChange={(e) => {
          const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
          const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
          setValue("cardNumber", formatted, { shouldValidate: true });
        }}
        placeholder="4242 4242 4242 4242"
        error={errors.cardNumber?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Expiry"
          inputMode="numeric"
          autoComplete="cc-exp"
          placeholder="MM/YY"
          maxLength={5}
          error={errors.expiry?.message}
          {...register("expiry", {
            onChange: (e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
              const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
              setValue("expiry", formatted, { shouldValidate: false });
            },
          })}
        />
        <Input
          label="CVC"
          inputMode="numeric"
          autoComplete="cc-csc"
          placeholder="123"
          maxLength={4}
          error={errors.cvc?.message}
          {...register("cvc")}
        />
      </div>

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
              Processing…
            </>
          ) : (
            payLabel
          )}
        </Button>

        <p className="mt-3 text-center font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-tertiary">
          Demo mode — no real payment processed
        </p>
      </div>
    </form>
  );
}
