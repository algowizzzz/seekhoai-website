"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "warm" | "dark" | "ghostOnDark";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
}

// `primary` / `warm` are aliases: solid gold CTA, ink text, gold-tinted shadow.
// `dark` is the inverse: solid ink button on cream sections (rare).
// `ghost` is the cream-section secondary — transparent, ink text, hairline border.
// `ghostOnDark` is the dark-section secondary — translucent white, white text.
const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gold text-ink shadow-cta hover:bg-gold-600 hover:-translate-y-[1px]",
  warm:
    "bg-gold text-ink shadow-cta hover:bg-gold-600 hover:-translate-y-[1px]",
  dark:
    "bg-ink text-paper hover:bg-teal-900 shadow-lg",
  ghost:
    "bg-paper/60 text-ink border border-[color:var(--line)] hover:bg-paper hover:border-[color:var(--line-gold)]",
  ghostOnDark:
    "bg-white/5 text-paper border border-[color:var(--line-on-dark-strong)] hover:bg-white/10 hover:border-gold/60",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-14 px-9 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    icon,
    iconRight,
    loading,
    children,
    disabled,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill font-semibold tracking-tight transition-all duration-200 ease-brand will-change-transform",
        "active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {loading ? (
        <span
          aria-hidden
          className="inline-block size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : (
        icon
      )}
      <span>{children}</span>
      {!loading && iconRight}
    </button>
  );
});
