"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Loader2 } from "lucide-react";
import { hero } from "@/content/content";
import { cn } from "@/lib/cn";

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
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "hero" }),
      });
      const data = await res.json();
      if (data.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-full border border-accent-warm/40 bg-accent-warm/10 px-5 py-3 text-sm text-text-primary",
          className,
        )}
        role="status"
      >
        <Check className="size-4 text-accent-warm" />
        <span>{hero.emailForm.success}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("w-full max-w-xl", className)}>
      <div className="flex flex-col gap-2 rounded-full border border-border-subtle bg-subtle/80 p-1.5 backdrop-blur-sm focus-within:border-accent-warm-2 sm:flex-row">
        <label htmlFor="hero-email" className="sr-only">
          Email address
        </label>
        <input
          id="hero-email"
          type="email"
          autoComplete="email"
          placeholder={hero.emailForm.placeholder}
          {...register("email")}
          className="h-10 flex-1 bg-transparent px-4 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-accent-warm px-5 text-sm font-medium text-base transition-all duration-200 hover:bg-accent-warm-2 disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            hero.emailForm.submit
          )}
        </button>
      </div>
      {formState.errors.email && (
        <p className="mt-2 pl-5 text-xs text-red-400">{formState.errors.email.message}</p>
      )}
      {status === "error" && (
        <p className="mt-2 pl-5 text-xs text-red-400">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
