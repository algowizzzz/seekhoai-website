"use client";

import { usePathname } from "next/navigation";
import { GraduationCap, Instagram, Mail, Youtube } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { brand, footer } from "@/content/content";
import { Wordmark } from "@/components/ui/Wordmark";

const SOCIAL_ICONS: Record<
  "youtube" | "instagram" | "udemy" | "email",
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  youtube: Youtube,
  instagram: Instagram,
  udemy: GraduationCap,
  email: Mail,
};

export function Footer() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const resolveHref = (href: string) => {
    if (href.startsWith("#")) return onHome ? href : `/${href}`;
    return href;
  };
  return (
    <footer
      className="border-t border-white/10 bg-teal-900 text-text-on-dark"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 1200px" }}
    >
      <div className="container-content py-16 md:py-24">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <Wordmark tone="onDark" size="nav" />
            <p className="mt-3 max-w-xs text-sm text-text-on-dark-muted">{footer.tagline}</p>
            <ul className="mt-5 flex items-center gap-2">
              {footer.socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.kind];
                return (
                  <li key={s.kind}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      aria-label={s.label}
                      title={s.label}
                      className="inline-flex size-10 items-center justify-center rounded-pill border border-white/15 text-text-on-dark-muted transition-colors duration-200 hover:border-gold hover:text-gold"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          {footer.columns.map((col) => (
            <div key={col.heading} className="col-span-1">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-teal-300">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={resolveHref(link.href)}
                      className="text-sm text-text-on-dark-muted transition-colors duration-200 hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-text-on-dark-muted md:flex-row md:items-center">
          <p>{footer.copyright}</p>
          <p>{brand.domain}</p>
        </div>
      </div>
    </footer>
  );
}
