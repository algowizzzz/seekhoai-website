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

      <section className="relative pt-32 pb-16 md:pt-44 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-radial-warm opacity-30"
        />
        <div className="container-content">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">{blog.hero.eyebrow}</p>
            <h1 className="mt-4 font-display text-display-xl font-medium">
              {blog.hero.title}
            </h1>
            <p className="mt-5 text-lg text-text-secondary md:text-xl">
              {blog.hero.subtitle}
            </p>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <li className="inline-flex items-baseline gap-2 rounded-full border border-white/[0.08] bg-elevated/40 px-4 py-2 backdrop-blur-sm">
                <span className="font-display text-base font-semibold text-accent-warm">
                  {visiblePosts.length}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary">
                  Articles
                </span>
              </li>
              <li className="inline-flex items-baseline gap-2 rounded-full border border-white/[0.08] bg-elevated/40 px-4 py-2 backdrop-blur-sm">
                <span className="font-display text-base font-semibold text-accent-warm">
                  {blog.categories.length}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary">
                  Learning Tracks
                </span>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">[ LEARNING TRACKS ]</p>
            <h2 className="mt-4 font-display text-display-lg font-medium">
              Six tracks. One curriculum.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {blog.categories.map((c) => (
              <Reveal
                key={c.slug}
                className="relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-elevated/40 p-6 backdrop-blur-sm md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold text-text-primary md:text-2xl">
                    {c.name}
                  </h3>
                  <span className="shrink-0 rounded-full border border-accent-warm/30 bg-accent-warm/10 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-warm">
                    {c.count} articles
                  </span>
                </div>
                <p className="mt-3 text-sm text-text-secondary md:text-base">
                  {c.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">[ LATEST ARTICLES ]</p>
            <h2 className="mt-4 font-display text-display-lg font-medium">
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
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-white/[0.08] bg-elevated/40 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-accent-warm/40"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-warm">
                      {p.category}
                    </span>
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-text-tertiary">
                      {p.date}
                    </span>
                  </div>
                  <h3 className="text-balance font-display text-lg font-medium text-text-primary transition-colors duration-200 group-hover:text-accent-warm">
                    {p.title}
                  </h3>
                </a>
              ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-radial-warm opacity-40"
        />
        <div className="container-content">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">[ {blog.cta.eyebrow} ]</p>
            <h2 className="mt-4 font-display text-display-lg font-medium">
              {blog.cta.title}
            </h2>
            <p className="mt-5 text-lg text-text-secondary">{blog.cta.body}</p>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {blog.cta.perks.map((perk) => (
                <li
                  key={perk}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-elevated/40 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary"
                >
                  <Check
                    className="size-3 text-accent-warm"
                    strokeWidth={2.5}
                  />
                  {perk}
                </li>
              ))}
            </ul>

            <a
              href={blog.cta.cta.href}
              className="mt-10 inline-flex items-center justify-center rounded-full bg-accent-warm px-7 py-3.5 font-display text-base font-medium text-black transition-transform duration-200 hover:scale-[1.02]"
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
