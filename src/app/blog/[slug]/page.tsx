import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { blog } from "@/content/blog";
import articles from "@/content/articles.json";

type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; text: string }
  | { type: "img"; src: string; alt?: string; caption?: string };

type Section = {
  heading: { level: 2 | 3; text: string } | null;
  blocks: Block[];
};

type Article = {
  title: string;
  date: string;
  author: string;
  readTime: string;
  sections: Section[];
  bodyText: string;
  slug: string;
  url: string;
};

const articleMap = articles as Record<string, Article>;

export function generateStaticParams() {
  return Object.keys(articleMap).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const a = articleMap[params.slug];
  if (!a) return { title: "Article Not Found | SeekhoAI" };
  return {
    title: `${a.title} | SeekhoAI`,
    description: a.sections[0]?.blocks.find((b) => b.type === "p")?.text?.slice(0, 200),
  };
}

function findCategoryForSlug(slug: string): string | undefined {
  return blog.posts.find((p) => p.slug === slug)?.category;
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-base leading-relaxed text-text-secondary md:text-lg">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2.5 inline-block size-1.5 shrink-0 rounded-full bg-accent-warm-2" />
              <span className="flex-1 text-base text-text-secondary md:text-lg">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2.5 list-decimal pl-6">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="text-base text-text-secondary md:text-lg marker:text-accent-warm"
            >
              {item}
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-accent-warm pl-5 text-lg italic text-text-primary md:text-xl">
          {block.text}
        </blockquote>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-xl border border-white/[0.08] bg-elevated/60 p-4 font-mono text-sm text-text-primary">
          <code>{block.text}</code>
        </pre>
      );
    case "img":
      return (
        <figure className="my-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt || ""}
            className="w-full rounded-2xl border border-white/[0.08]"
            loading="lazy"
          />
          {block.caption ? (
            <figcaption className="mt-3 text-center font-mono text-xs uppercase tracking-[0.16em] text-text-tertiary">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
  }
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = articleMap[params.slug];
  if (!article) notFound();

  const category = findCategoryForSlug(params.slug);
  const related = blog.posts
    .filter(
      (p) =>
        p.slug &&
        p.slug !== params.slug &&
        p.category === category &&
        articleMap[p.slug],
    )
    .slice(0, 3);

  return (
    <main className="relative">
      <Nav />

      <article className="relative pt-28 pb-20 md:pt-36 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-radial-warm opacity-30"
        />

        <div className="container-content">
          <Reveal className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/blog"
                className="font-mono text-xs uppercase tracking-[0.18em] text-accent-warm transition-opacity duration-200 hover:opacity-80"
              >
                ← All articles
              </a>
              {category ? (
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary">
                  · {category}
                </span>
              ) : null}
            </div>

            <h1 className="mt-6 text-balance font-display text-display-lg font-medium md:text-display-xl">
              {article.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-text-tertiary">
              {article.author ? <span>{article.author}</span> : null}
              {article.date ? (
                <>
                  <span aria-hidden className="text-text-tertiary/40">
                    •
                  </span>
                  <span>{article.date}</span>
                </>
              ) : null}
              {article.readTime ? (
                <>
                  <span aria-hidden className="text-text-tertiary/40">
                    •
                  </span>
                  <span>{article.readTime}</span>
                </>
              ) : null}
            </div>
          </Reveal>

          <div className="mx-auto mt-12 max-w-3xl space-y-10 md:mt-16">
            {article.sections.map((section, i) => (
              <section key={i} className="space-y-5">
                {section.heading ? (
                  section.heading.level === 2 ? (
                    <h2 className="font-display text-3xl font-semibold text-text-primary md:text-4xl">
                      {section.heading.text}
                    </h2>
                  ) : (
                    <h3 className="font-display text-2xl font-semibold text-text-primary md:text-3xl">
                      {section.heading.text}
                    </h3>
                  )
                ) : null}
                {section.blocks.map((block, j) => (
                  <BlockRenderer key={j} block={block} />
                ))}
              </section>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="relative border-t border-border-subtle py-16 md:py-24">
          <div className="container-content">
            <Reveal className="max-w-3xl">
              <p className="eyebrow">[ KEEP READING ]</p>
              <h2 className="mt-4 font-display text-display-lg font-medium">
                More in {category}.
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-3">
              {related.map((p) => (
                <a
                  key={p.slug}
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
      ) : null}

      <Footer />
    </main>
  );
}
