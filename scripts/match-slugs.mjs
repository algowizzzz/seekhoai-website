// One-shot helper: matches the 100 blog post titles in src/content/blog.ts
// against the 86 real sitemap slugs from seekhoai.pk and writes blog.ts
// back with each post's `slug` set (or null when no match could be found).

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const blogTsPath = join(__dirname, "..", "src", "content", "blog.ts");
const slugsPath = process.env.TEMP
  ? join(process.env.TEMP, "slugs.txt")
  : "/tmp/slugs.txt";

const slugs = readFileSync(slugsPath, "utf8")
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean);

const STOP = new Set([
  "a","an","the","to","of","for","in","on","at","by","with","from","that",
  "this","these","those","is","are","be","been","do","does","how","what",
  "why","when","where","which","who","whom","whose","i","you","your","my",
  "our","we","they","them","it","its","or","and","but","so","as","than",
  "into","onto","without","using","use","get","make","ways",
]);

function tokens(s) {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t && !STOP.has(t));
}

function score(titleTokens, slug) {
  const slugSet = new Set(slug.split("-").filter(Boolean));
  let matched = 0;
  for (const t of titleTokens) {
    if (slugSet.has(t)) matched++;
    else {
      // partial: any slug token starts with title token (or vice versa) and len >= 4
      for (const st of slugSet) {
        if (t.length < 4) continue;
        if (st.startsWith(t) || t.startsWith(st)) {
          matched += 0.7;
          break;
        }
      }
    }
  }
  const lenPenalty = Math.abs(titleTokens.length - slugSet.size) * 0.05;
  return matched / Math.max(titleTokens.length, 1) - lenPenalty;
}

function bestSlug(title) {
  const tt = tokens(title);
  let best = null;
  let bestScore = 0.4; // threshold
  for (const s of slugs) {
    const sc = score(tt, s);
    if (sc > bestScore) {
      bestScore = sc;
      best = s;
    }
  }
  return best;
}

const blogTs = readFileSync(blogTsPath, "utf8");
const postRegex = /\{\s*title:\s*"([^"]+)",\s*date:\s*"([^"]+)",\s*category:\s*"([^"]+)"(?:,\s*slug:\s*(?:"[^"]*"|null))?\s*\}/g;

const matches = [];
let updated = blogTs.replace(postRegex, (m, title, date, category) => {
  const s = bestSlug(title);
  matches.push({ title, slug: s });
  const slugField = s ? `"${s}"` : "null";
  return `{ title: "${title}", date: "${date}", category: "${category}", slug: ${slugField} }`;
});

writeFileSync(blogTsPath, updated);

const matched = matches.filter((m) => m.slug);
const unmatched = matches.filter((m) => !m.slug);
console.log(`Matched: ${matched.length}/${matches.length}`);
console.log(`Unmatched titles:`);
for (const u of unmatched) console.log(`  - ${u.title}`);

// Also check: which sitemap slugs were never used?
const usedSlugs = new Set(matched.map((m) => m.slug));
const unusedSlugs = slugs.filter((s) => !usedSlugs.has(s));
console.log(`\nSitemap slugs never matched (${unusedSlugs.length}):`);
for (const s of unusedSlugs) console.log(`  - ${s}`);
