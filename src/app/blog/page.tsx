import type { Metadata } from "next";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { blog } from "@/content/blog";
import articles from "@/content/articles.json";
import { Check } from "lucide-react";

const articleMap = articles as Record<string, unknown>;
const visiblePosts = blog.posts.filter((p) => p.slug && articleMap[p.slug]);

export const metadata: Metadata = {
  title: "Blog — Learn AI for Free | SeekhoAI",
  description:
    "100 free articles across 6 learning tracks — Prompt Engineering, AI Tools, AI Art, Vibe Coding, Business & Productivity, and Career.",
};

export default function BlogPage() {
  return (
    <main className="relative">
      <Nav />

      {/* Hero — dark ink */}
      <section className="hero-mesh relative isolate overflow-hidden pt-32 pb-16 md:pt-44 md:pb-20">
        <div aria-hidden className="hero-shaft" />
        <div className="container-content relative z-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow eyebrow-on-dark justify-center">{blog.hero.eyebrow}</p>
            <h1 className="mt-4 font-display text-display-xl font-semibold leading-[1.05] text-paper">
              {blog.hero.title}
            </h1>
            <p className="mt-5 text-lg text-text-on-dark-muted md:text-xl">
              {blog.hero.subtitle}
            </p>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <li className="inline-flex items-baseline gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-2">
                <span className="font-display text-base font-semibold text-gold">
                  {visiblePosts.length}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-text-on-dark-muted">
                  Articles
                </span>
              </li>
              <li className="inline-flex items-baseline gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-2">
                <span className="font-display text-base font-semibold text-gold">
                  {blog.categories.length}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-text-on-dark-muted">
                  Learning Tracks
                </span>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Tracks — cream */}
      <section className="relative bg-cream py-16 md:py-20">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">LEARNING TRACKS</p>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-ink">
              Six tracks. <span className="text-gold-700">One curriculum.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {blog.categories.map((c) => (
              <Reveal
                key={c.slug}
                className="relative h-full overflow-hidden rounded-lg border border-[color:var(--line)] bg-paper p-6 shadow-sm md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold text-ink md:text-3xl">
                    {c.name}
                  </h3>
                  <span className="shrink-0 rounded-pill border border-[color:var(--line-gold)] bg-gold-50 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gold-700">
                    {c.count} articles
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted md:text-base">
                  {c.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* All articles — cream-2 */}
      <section className="relative bg-cream-2 py-16 md:py-24">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">LATEST ARTICLES</p>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-ink">
              All {blog.posts.length} articles.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {blog.posts
              .filter((p) => p.slug && articleMap[p.slug])
              .map((p, i) => (
                <a
                  key={i}
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-lg border border-[color:var(--line)] bg-paper p-6 shadow-sm transition-all duration-200 ease-brand hover:-translate-y-[2px] hover:border-gold/40 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-teal-600">
                      {p.category}
                    </span>
                    <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted-2">
                      {p.date}
                    </span>
                  </div>
                  <h3 className="text-balance font-display text-xl font-semibold text-ink transition-colors duration-200 group-hover:text-gold-700">
                    {p.title}
                  </h3>
                </a>
              ))}
          </div>
        </div>
      </section>

      {/* CTA — dark ink */}
      <section className="relative overflow-hidden bg-ink py-20 text-text-on-dark md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-1/4 -z-0 size-[30rem] rounded-full bg-teal-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-0 -z-0 size-[30rem] rounded-full bg-gold/15 blur-3xl"
        />
        <div className="container-content relative z-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow eyebrow-on-dark justify-center">{blog.cta.eyebrow}</p>
            <h2 className="mt-4 font-display text-display-lg font-semibold">
              {blog.cta.title}
            </h2>
            <p className="mt-5 text-lg text-text-on-dark-muted">{blog.cta.body}</p>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {blog.cta.perks.map((perk) => (
                <li
                  key={perk}
                  className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-text-on-dark-muted"
                >
                  <Check
                    className="size-3 text-gold"
                    strokeWidth={2.5}
                  />
                  {perk}
                </li>
              ))}
            </ul>

            <a
              href={blog.cta.cta.href}
              className="mt-10 inline-flex items-center justify-center rounded-pill bg-gold px-7 py-3.5 font-sans text-base font-semibold text-ink shadow-cta transition-all duration-200 ease-brand hover:bg-gold-600 hover:-translate-y-[1px]"
            >
              {blog.cta.cta.label}
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
