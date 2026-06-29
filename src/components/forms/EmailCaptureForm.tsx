"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Loader2 } from "lucide-react";
import { hero } from "@/content/content";
import { cn } from "@/lib/cn";
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
});

type FormValues = z.infer<typeof schema>;

export function EmailCaptureForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formTracking = useFormTracking("email_capture_hero");
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    formTracking.markSubmitted();
    setStatus("loading");
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "hero" }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
        track("generate_lead", { source: "email_capture_hero" });
      } else {
        setStatus("error");
        track("form_submit_failed", { form_name: "email_capture_hero", status: res.status });
      }
    } catch (err) {
      setStatus("error");
      track("form_submit_failed", {
        form_name: "email_capture_hero",
        error: String(err).slice(0, 200),
      });
    }
  };

  const onInvalid = (errs: typeof formState.errors) => {
    for (const [field, e] of Object.entries(errs)) {
      if (e) formTracking.trackValidationError(field, String(e.type ?? "invalid"));
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-pill border border-gold/40 bg-gold-50 px-5 py-3 text-sm text-ink",
          className,
        )}
        role="status"
      >
        <Check className="size-4 text-gold-700" />
        <span>{hero.emailForm.success}</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      onFocus={formTracking.onFocus}
      onBlur={formTracking.onBlur}
      className={cn("w-full max-w-xl", className)}
    >
      <div className="flex flex-col gap-2 rounded-pill border border-[color:var(--line)] bg-paper p-1.5 focus-within:border-gold sm:flex-row">
        <label htmlFor="hero-email" className="sr-only">
          Email address
        </label>
        <input
          id="hero-email"
          type="email"
          autoComplete="email"
          placeholder={hero.emailForm.placeholder}
          {...register("email")}
          className="h-10 flex-1 bg-transparent px-4 text-sm text-ink placeholder:text-muted-2 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-pill bg-gold px-5 text-sm font-semibold text-ink shadow-cta transition-all duration-200 ease-brand hover:bg-gold-600 disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            hero.emailForm.submit
          )}
        </button>
      </div>
      {formState.errors.email && (
        <p className="mt-2 pl-5 text-xs text-red-600">{formState.errors.email.message}</p>
      )}
      {status === "error" && (
        <p className="mt-2 pl-5 text-xs text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
