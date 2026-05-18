// ─── seekhoai.pk → articles.json scraper ─────────────────────────────────
//
// HOW TO USE:
// 1. Open https://seekhoai.pk in Chrome (any page).
// 2. Open DevTools (F12) → Console tab.
// 3. Paste this ENTIRE file's contents into the console and press Enter.
// 4. A small panel will appear top-right showing live progress.
// 5. When it finishes (~7-12 min), it will auto-download `articles.json`.
// 6. Drop `articles.json` into the project root and let me know.
//
// You can stop anytime by closing the tab. Already-scraped articles are
// kept in localStorage so re-running will skip them.
// ───────────────────────────────────────────────────────────────────────────

(async () => {
  const SLUGS = [
    "what-is-prompt-engineering-complete-guide",
    "how-to-write-better-chatgpt-prompts",
    "zero-shot-vs-few-shot-prompting-explained",
    "role-prompting-technique-guide",
    "prompt-engineering-mistakes-beginners",
    "system-prompts-explained-guide",
    "prompt-chaining-complex-tasks",
    "ai-temperature-top-p-settings-explained",
    "get-ai-follow-instructions-perfectly",
    "prompt-engineering-vs-coding",
    "best-ai-writing-tools-compared",
    "best-free-ai-image-generators-compared",
    "how-to-use-chatgpt-beginners-guide",
    "how-to-use-claude-ai-beginners-tutorial",
    "how-to-use-google-gemini-ai-guide",
    "how-to-use-perplexity-ai-research",
    "how-to-use-notion-ai-productivity",
    "how-to-use-canva-ai-magic-studio",
    "how-to-use-grammarly-ai-writing",
    "best-free-ai-tools-no-signup",
    "best-free-ai-tools-writing",
    "free-ai-tools-students",
    "free-ai-tools-small-business",
    "best-free-ai-chatbots-alternatives",
    "free-ai-tools-graphic-design",
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
    "vibe-coding-build-apps-without-code",
    "build-website-using-ai-without-coding",
    "build-app-with-ai-no-coding",
    "ai-coding-tools-absolute-beginners",
    "use-ai-learn-programming-scratch",
    "build-portfolio-website-ai-one-hour",
    "build-ai-chatbot-business-no-code",
    "automate-tasks-python-ai-beginner",
    "github-copilot-vs-cursor-ai-comparison",
    "best-no-code-ai-tools-building-projects",
    "bolt-lovable-replit-ai-ship-products",
    "automate-repetitive-tasks-ai",
    "zapier-ai-automate-workflow",
    "ai-tools-email-automation",
    "ai-meeting-notes-summaries",
    "ai-customer-service-automation-small-business",
    "best-ai-tools-small-business-owners",
    "use-ai-market-research-free",
    "ai-business-plan-generator-guide",
    "ai-social-media-marketing-guide",
    "ai-ecommerce-tools-boost-sales",
    "use-ai-more-productive-work",
    "ai-tools-save-10-hours-week",
    "use-ai-write-reports-faster",
    "ai-tools-presentations-slide-decks",
    "use-ai-data-analysis-without-coding",
    "ai-productivity-stack-replace-apps",
    "ai-tools-every-freelancer-2025",
    "use-ai-get-more-freelance-clients",
    "best-ai-tools-upwork-fiverr",
    "ai-freelance-writing-earn-more",
    "price-ai-powered-freelance-services",
    "top-ai-skills-to-learn-2025",
    "prompt-engineering-career-salary-outlook",
    "learn-ai-without-technical-background",
    "ai-skills-career-growth-2025",
    "what-are-ai-agents-beginners-guide",
    "build-first-ai-agent-no-coding",
    "ai-agents-vs-chatbots-difference",
    "make-money-with-ai-proven-methods",
    "ai-side-hustles-no-experience",
    "start-freelance-business-ai-tools",
    "start-ai-automation-agency-guide",
    "ai-passive-income-ideas",
    "make-money-chatgpt-real-ways",
    "use-ai-tools-student-without-cheating",
    "best-ai-study-tools-college-students",
    "use-chatgpt-write-better-essays",
    "ai-tools-academic-research-citations",
    "use-ai-learn-new-language-faster",
  ];

  const STORAGE_KEY = "seekhoai_scraped_articles_v1";
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

  // ── UI panel ─────────────────────────────────────────────────────────
  const panel = document.createElement("div");
  panel.style.cssText =
    "position:fixed;top:12px;right:12px;width:340px;max-height:80vh;overflow:auto;" +
    "background:#0a0e1a;color:#fff;padding:14px 16px;border-radius:12px;z-index:2147483647;" +
    "font:13px/1.5 system-ui,sans-serif;box-shadow:0 8px 32px rgba(0,0,0,.5);border:1px solid #333;";
  panel.innerHTML =
    '<div style="font-weight:600;margin-bottom:6px">SeekhoAI Scraper</div>' +
    '<div id="seekhoai-status" style="opacity:.8">Starting…</div>' +
    '<div id="seekhoai-progress" style="margin-top:8px;background:#1a1f2e;height:6px;border-radius:3px;overflow:hidden"><div id="seekhoai-bar" style="height:100%;background:#f97316;width:0%"></div></div>' +
    '<div id="seekhoai-log" style="margin-top:10px;max-height:300px;overflow:auto;font:11px/1.4 ui-monospace,monospace;opacity:.7"></div>';
  document.body.appendChild(panel);
  const status = panel.querySelector("#seekhoai-status");
  const bar = panel.querySelector("#seekhoai-bar");
  const logEl = panel.querySelector("#seekhoai-log");
  const log = (msg, ok = true) => {
    const line = document.createElement("div");
    line.textContent = (ok ? "✓ " : "✗ ") + msg;
    line.style.color = ok ? "#10b981" : "#ef4444";
    logEl.appendChild(line);
    logEl.scrollTop = logEl.scrollHeight;
  };

  // ── Hidden iframe for SPA rendering ─────────────────────────────────
  const iframe = document.createElement("iframe");
  iframe.style.cssText =
    "position:fixed;bottom:12px;left:12px;width:480px;height:320px;border:1px solid #333;border-radius:8px;z-index:2147483646;background:#fff;opacity:.5;";
  document.body.appendChild(iframe);

  const loadInIframe = (path) =>
    new Promise((resolve) => {
      let resolved = false;
      const done = () => {
        if (resolved) return;
        resolved = true;
        resolve();
      };
      iframe.onload = () => setTimeout(done, 500);
      setTimeout(done, 8000); // hard timeout
      iframe.src = path;
    });

  const waitForArticle = async (maxMs = 12000) => {
    const start = Date.now();
    while (Date.now() - start < maxMs) {
      const doc = iframe.contentDocument;
      if (doc) {
        const h1 = doc.querySelector("h1");
        const body =
          doc.querySelector("article") ||
          doc.querySelector('[class*="prose"]') ||
          doc.querySelector("main");
        if (h1 && body && body.innerText.trim().length > 400) {
          return { doc, h1, body };
        }
      }
      await wait(300);
    }
    return null;
  };

  // ── Scrape one article from the iframe DOM ──────────────────────────
  const scrapeArticle = (h1, body) => {
    const title = h1.innerText.trim();

    // Walk article body and extract structured content
    const sections = [];
    let current = { heading: null, blocks: [] };
    const push = () => {
      if (current.heading || current.blocks.length) sections.push(current);
      current = { heading: null, blocks: [] };
    };

    const allowedTags = new Set([
      "H1","H2","H3","H4","P","UL","OL","LI","BLOCKQUOTE","PRE","CODE","FIGURE","IMG",
    ]);

    // Find the most likely body container
    const walker = body.cloneNode(true);
    // Strip nav/footer/sidebar/etc.
    walker
      .querySelectorAll("nav, footer, aside, script, style, button, form")
      .forEach((n) => n.remove());

    const flatten = (node) => {
      for (const child of node.children) {
        const tag = child.tagName;
        if (tag === "H2" || tag === "H3") {
          push();
          current.heading = { level: tag === "H2" ? 2 : 3, text: child.innerText.trim() };
        } else if (tag === "P") {
          const text = child.innerText.trim();
          if (text) current.blocks.push({ type: "p", text });
        } else if (tag === "UL" || tag === "OL") {
          const items = Array.from(child.querySelectorAll(":scope > li")).map((li) =>
            li.innerText.trim(),
          ).filter(Boolean);
          if (items.length) current.blocks.push({ type: tag === "UL" ? "ul" : "ol", items });
        } else if (tag === "BLOCKQUOTE") {
          const text = child.innerText.trim();
          if (text) current.blocks.push({ type: "quote", text });
        } else if (tag === "PRE") {
          current.blocks.push({ type: "code", text: child.innerText });
        } else if (tag === "FIGURE" || tag === "IMG") {
          const img = tag === "IMG" ? child : child.querySelector("img");
          if (img && img.src) {
            const caption = child.querySelector("figcaption")?.innerText.trim() || "";
            current.blocks.push({ type: "img", src: img.src, alt: img.alt || "", caption });
          }
        } else if (child.children.length && !allowedTags.has(tag)) {
          flatten(child);
        }
      }
    };
    flatten(walker);
    push();

    // Pull metadata: date, author, read time, category
    const text = body.innerText;
    const readTimeMatch = text.match(/(\d+)\s*min\s*read/i);
    const dateMatch = body.querySelector("time")?.innerText.trim() ||
      text.match(/[A-Z][a-z]+\s+\d{1,2},?\s+\d{4}/)?.[0] || "";
    const authorEl = Array.from(body.querySelectorAll("*"))
      .find((el) => /by\s+saad/i.test(el.innerText) && el.innerText.length < 200);
    const author = authorEl ? authorEl.innerText.replace(/^by\s+/i, "").trim() : "Saad A";

    return {
      title,
      date: dateMatch || "",
      author,
      readTime: readTimeMatch ? `${readTimeMatch[1]} min read` : "",
      sections,
      bodyText: body.innerText, // raw fallback
    };
  };

  // ── Main loop ────────────────────────────────────────────────────────
  let idx = 0;
  for (const slug of SLUGS) {
    idx++;
    bar.style.width = `${Math.round((idx / SLUGS.length) * 100)}%`;
    status.textContent = `Scraping ${idx}/${SLUGS.length}: ${slug}`;

    if (saved[slug]) {
      log(`${slug} (cached)`);
      continue;
    }

    try {
      await loadInIframe(`/blog/${slug}`);
      const found = await waitForArticle();
      if (!found) {
        log(`${slug} — content didn't render`, false);
        continue;
      }
      const data = scrapeArticle(found.h1, found.body);
      data.slug = slug;
      data.url = `https://seekhoai.pk/blog/${slug}`;
      saved[slug] = data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      log(`${slug} (${data.sections.length} sections, ${data.bodyText.length} chars)`);
    } catch (e) {
      log(`${slug} — ${e.message}`, false);
    }
  }

  status.textContent = `Done. Scraped ${Object.keys(saved).length} of ${SLUGS.length} articles.`;
  bar.style.background = "#10b981";

  // ── Download JSON ────────────────────────────────────────────────────
  const blob = new Blob([JSON.stringify(saved, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "articles.json";
  a.textContent = "↓ Download articles.json";
  a.style.cssText =
    "display:block;margin-top:12px;padding:10px 14px;background:#f97316;color:#000;text-align:center;border-radius:8px;font-weight:600;text-decoration:none;";
  panel.appendChild(a);
  // Auto-trigger download too
  a.click();

  // Cleanup hint
  const hint = document.createElement("div");
  hint.style.cssText = "margin-top:10px;font-size:11px;opacity:.6";
  hint.innerHTML =
    "Drop <code>articles.json</code> into the project root, then tell Claude it's ready.<br>" +
    "Re-run anytime — already-scraped articles are cached.";
  panel.appendChild(hint);

  console.log("[SeekhoAI scraper] Done. Articles:", saved);
})();
