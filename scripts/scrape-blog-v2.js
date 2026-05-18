// ─── seekhoai.pk scraper v2 — re-scrapes incomplete articles ─────────────
//
// HOW TO USE:
// 1. Open https://seekhoai.pk in Chrome.
// 2. F12 → Console. Type `allow pasting` and press Enter.
// 3. Paste THIS ENTIRE FILE. Press Enter.
// 4. Wait ~5-8 min for the 34 incomplete articles to re-scrape.
// 5. Auto-downloads `articles-fixed.json` (only the re-scraped ones).
// 6. Drop it into the project root and tell me.
//
// This v2 fixes the timing issue: it waits for content to STABILIZE
// before scraping, so the full body is captured.
// ───────────────────────────────────────────────────────────────────────────

(async () => {
  // Slugs that came out incomplete from v1
  const SLUGS = [
    "get-ai-follow-instructions-perfectly",
    "best-free-ai-image-generators-compared",
    "how-to-use-google-gemini-ai-guide",
    "how-to-use-notion-ai-productivity",
    "free-ai-tools-students",
    "free-ai-tools-small-business",
    "free-ai-tools-graphic-design",
    "bolt-lovable-replit-ai-ship-products",
    "use-ai-market-research-free",
    "ai-business-plan-generator-guide",
    "how-to-use-chatgpt-beginners-guide",
    "how-to-use-claude-ai-beginners-tutorial",
    "how-to-use-perplexity-ai-research",
    "how-to-use-canva-ai-magic-studio",
    "how-to-use-grammarly-ai-writing",
    "best-free-ai-tools-no-signup",
    "best-free-ai-tools-writing",
    "best-free-ai-chatbots-alternatives",
    "how-to-use-midjourney-beginners-tutorial",
    "midjourney-prompts-professional-guide",
    "how-to-use-dalle-create-ai-images",
    "ai-art-beginners-tutorial",
    "ai-tools-social-media-graphics",
    "make-money-with-ai-art-midjourney",
    "sell-ai-art-etsy-guide",
    "ai-print-on-demand-business-guide",
    "how-to-create-ai-videos-beginners",
    "ai-tools-youtube-creators",
    "faceless-youtube-channel-ai",
    "ai-tools-email-automation",
    "ai-meeting-notes-summaries",
    "ai-tools-presentations-slide-decks",
    "ai-tools-every-freelancer-2025",
    "best-ai-tools-upwork-fiverr",
  ];

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // ── UI ──
  const panel = document.createElement("div");
  panel.style.cssText =
    "position:fixed;top:12px;right:12px;width:360px;max-height:80vh;overflow:auto;" +
    "background:#0a0e1a;color:#fff;padding:14px 16px;border-radius:12px;z-index:2147483647;" +
    "font:13px/1.5 system-ui,sans-serif;box-shadow:0 8px 32px rgba(0,0,0,.5);border:1px solid #333;";
  panel.innerHTML =
    '<div style="font-weight:600">SeekhoAI Scraper v2</div>' +
    '<div id="ss-status" style="opacity:.8;margin-top:4px">Starting…</div>' +
    '<div style="margin-top:8px;background:#1a1f2e;height:6px;border-radius:3px;overflow:hidden"><div id="ss-bar" style="height:100%;background:#f97316;width:0%"></div></div>' +
    '<div id="ss-log" style="margin-top:10px;max-height:340px;overflow:auto;font:11px/1.4 ui-monospace,monospace;opacity:.85"></div>';
  document.body.appendChild(panel);
  const status = panel.querySelector("#ss-status");
  const bar = panel.querySelector("#ss-bar");
  const logEl = panel.querySelector("#ss-log");
  const log = (msg, ok = true) => {
    const line = document.createElement("div");
    line.textContent = (ok ? "✓ " : "✗ ") + msg;
    line.style.color = ok ? "#10b981" : "#ef4444";
    logEl.appendChild(line);
    logEl.scrollTop = logEl.scrollHeight;
  };

  // ── Iframe ──
  const iframe = document.createElement("iframe");
  iframe.style.cssText =
    "position:fixed;bottom:12px;left:12px;width:520px;height:360px;border:1px solid #333;border-radius:8px;z-index:2147483646;background:#fff;opacity:.5;";
  document.body.appendChild(iframe);

  const loadInIframe = (path) =>
    new Promise((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        resolve();
      };
      iframe.onload = () => setTimeout(finish, 600);
      setTimeout(finish, 10000);
      iframe.src = `about:blank`; // force reset so SPA re-renders fully
      setTimeout(() => (iframe.src = path), 100);
    });

  // Wait for content to STABILIZE: text length stops changing for 1.5s
  const waitForStable = async (slug, maxMs = 25000) => {
    const start = Date.now();
    let lastLen = 0;
    let stableSince = 0;

    while (Date.now() - start < maxMs) {
      const doc = iframe.contentDocument;
      if (!doc) {
        await wait(300);
        continue;
      }
      // Verify we're on the right URL
      const url = doc.location && doc.location.pathname;
      if (url && !url.includes(slug)) {
        await wait(300);
        continue;
      }
      const text = (doc.body && doc.body.innerText) || "";
      if (text.length > 0 && text.length === lastLen) {
        if (!stableSince) stableSince = Date.now();
        if (Date.now() - stableSince > 1500) return doc;
      } else {
        lastLen = text.length;
        stableSince = 0;
      }
      await wait(300);
    }
    return iframe.contentDocument; // best-effort fallback
  };

  // Pick the element with the most descendant <p> + <h2> + <h3> tags (= the real body)
  const findBestBody = (doc) => {
    const candidates = doc.querySelectorAll("article, main, div, section");
    let best = null;
    let bestScore = 0;
    for (const el of candidates) {
      // Skip nav/footer
      if (el.closest("nav, footer, header")) continue;
      const ps = el.querySelectorAll(":scope p").length;
      const hs = el.querySelectorAll(":scope h2, :scope h3").length;
      const score = ps * 1 + hs * 3;
      if (score > bestScore) {
        bestScore = score;
        best = el;
      }
    }
    return best;
  };

  const scrapeArticle = (doc) => {
    const h1 = doc.querySelector("h1");
    if (!h1) return null;
    const title = h1.innerText.trim();

    const body = findBestBody(doc);
    if (!body) return null;

    const walker = body.cloneNode(true);
    walker
      .querySelectorAll("nav, footer, aside, script, style, button, form")
      .forEach((n) => n.remove());

    const sections = [];
    let current = { heading: null, blocks: [] };
    const push = () => {
      if (current.heading || current.blocks.length) sections.push(current);
      current = { heading: null, blocks: [] };
    };

    const flatten = (node) => {
      for (const child of node.children) {
        const tag = child.tagName;
        if (tag === "H2" || tag === "H3") {
          push();
          current.heading = {
            level: tag === "H2" ? 2 : 3,
            text: child.innerText.trim(),
          };
        } else if (tag === "P") {
          const t = child.innerText.trim();
          if (t) current.blocks.push({ type: "p", text: t });
        } else if (tag === "UL" || tag === "OL") {
          const items = Array.from(child.querySelectorAll(":scope > li"))
            .map((li) => li.innerText.trim())
            .filter(Boolean);
          if (items.length)
            current.blocks.push({ type: tag === "UL" ? "ul" : "ol", items });
        } else if (tag === "BLOCKQUOTE") {
          const t = child.innerText.trim();
          if (t) current.blocks.push({ type: "quote", text: t });
        } else if (tag === "PRE") {
          current.blocks.push({ type: "code", text: child.innerText });
        } else if (tag === "FIGURE" || tag === "IMG") {
          const img = tag === "IMG" ? child : child.querySelector("img");
          if (img && img.src)
            current.blocks.push({
              type: "img",
              src: img.src,
              alt: img.alt || "",
              caption:
                (child.querySelector &&
                  child.querySelector("figcaption")?.innerText.trim()) ||
                "",
            });
        } else if (child.children.length) {
          flatten(child);
        }
      }
    };
    flatten(walker);
    push();

    const text = doc.body.innerText;
    const readTimeMatch = text.match(/(\d+)\s*min\s*read/i);
    const dateMatch =
      doc.querySelector("time")?.innerText?.trim() ||
      text.match(/[A-Z][a-z]+\s+\d{1,2},?\s+\d{4}/)?.[0] ||
      "";

    return {
      title,
      date: dateMatch,
      author: "Saad A",
      readTime: readTimeMatch ? `${readTimeMatch[1]} min read` : "",
      sections,
      bodyText: body.innerText,
    };
  };

  // ── Main ──
  const results = {};
  let idx = 0;
  for (const slug of SLUGS) {
    idx++;
    bar.style.width = `${Math.round((idx / SLUGS.length) * 100)}%`;
    status.textContent = `Scraping ${idx}/${SLUGS.length}: ${slug}`;
    try {
      await loadInIframe(`/blog/${slug}`);
      const doc = await waitForStable(slug);
      if (!doc) {
        log(`${slug} — page never stabilized`, false);
        continue;
      }
      const data = scrapeArticle(doc);
      if (!data || data.sections.length < 5 || data.bodyText.length < 2000) {
        log(
          `${slug} — still incomplete (${data?.sections.length || 0} sections, ${data?.bodyText.length || 0} chars)`,
          false,
        );
        if (data) {
          data.slug = slug;
          data.url = `https://seekhoai.pk/blog/${slug}`;
          results[slug] = data; // save anyway in case it's the best we can do
        }
        continue;
      }
      data.slug = slug;
      data.url = `https://seekhoai.pk/blog/${slug}`;
      results[slug] = data;
      log(`${slug} (${data.sections.length} sections, ${data.bodyText.length} chars)`);
    } catch (e) {
      log(`${slug} — ${e.message}`, false);
    }
  }

  status.textContent = `Done. Re-scraped ${Object.keys(results).length} of ${SLUGS.length}.`;
  bar.style.background = "#10b981";

  // ── Download ──
  const blob = new Blob([JSON.stringify(results, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "articles-fixed.json";
  a.click();

  const hint = document.createElement("div");
  hint.style.cssText = "margin-top:10px;font-size:11px;opacity:.7";
  hint.innerHTML =
    "Drop <code>articles-fixed.json</code> into the project root, then tell Claude it's ready.";
  panel.appendChild(hint);

  console.log("[v2] Done:", results);
})();
