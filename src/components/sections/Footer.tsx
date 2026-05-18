"use client";

import { usePathname } from "next/navigation";
import { brand, footer } from "@/content/content";

export function Footer() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const resolveHref = (href: string) => {
    if (href.startsWith("#")) return onHome ? href : `/${href}`;
    return href;
  };
  return (
    <footer
      className="border-t border-border-subtle bg-base"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 1200px" }}
    >
      <div className="container-content py-16 md:py-24">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <p className="font-display text-2xl font-medium">{brand.name}</p>
            <p className="mt-3 max-w-xs text-sm text-text-secondary">{footer.tagline}</p>
          </div>
          {footer.columns.map((col) => (
            <div key={col.heading} className="col-span-1">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-tertiary">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={resolveHref(link.href)}
                      className="text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border-subtle pt-6 text-xs text-text-tertiary md:flex-row md:items-center">
          <p>{footer.copyright}</p>
          <p>{brand.domain}</p>
        </div>
      </div>
    </footer>
  );
}
