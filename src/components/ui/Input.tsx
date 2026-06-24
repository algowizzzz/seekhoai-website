"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hideLabel?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hideLabel = false, id, className, ...rest },
  ref,
) {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted",
            hideLabel && "sr-only",
          )}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "h-11 w-full rounded-pill border border-[color:var(--line)] bg-paper px-5 text-ink placeholder:text-muted-2",
          "transition-colors duration-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30",
          error && "border-red-500/60 focus:border-red-500 focus:ring-red-200",
          className,
        )}
        aria-invalid={error ? "true" : "false"}
        {...rest}
      />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
});
