import { cn } from "@/lib/cn";

interface WordmarkProps {
  /** Visual variant. `auto` uses cream-section colors (ink + gold). `onDark` flips to white + gold for dark backgrounds. */
  tone?: "auto" | "onDark";
  /** Render as the larger hero/poster variant. Default is nav-sized. */
  size?: "nav" | "hero";
  className?: string;
}

export function Wordmark({ tone = "auto", size = "nav", className }: WordmarkProps) {
  const seekho = tone === "onDark" ? "text-paper" : "text-ink";

  const sizeClasses =
    size === "hero"
      ? "text-[clamp(1.75rem,4vw,3rem)] leading-none"
      : "text-[1.35rem] md:text-[1.5rem] leading-none";

  return (
    <span
      className={cn(
        "inline-flex items-baseline font-display tracking-[-0.03em]",
        sizeClasses,
        className,
      )}
      aria-label="Seekho AI"
    >
      <span className={cn(seekho, "font-semibold")}>Seekho</span>
      <span className="ml-1.5 font-extrabold text-gold">AI</span>
    </span>
  );
}
