// All copy on the landing page reads from this file.
// Non-coders can safely edit strings here without touching component code.

export const brand = {
  name: "SeekhoAI",
  domain: "seekhoai.pk",
  course: "Complete AI Bootcamp",
  price: 999,
  priceAnchor: 4999,
  currency: "PKR",
  studentsEnrolled: "38,099+",
  rating: "4.5",
  instructorName: "Saad A",
};

// Single primary CTA used everywhere on the site (per spec F12).
export const primaryCtaLabel = "Enrol Now — 999 PKR";

// Trust strip rendered as a full-width band just below the hero (spec F2).
export const trustStrip = {
  lead: "Taught on Udemy",
  body:
    "the world's largest learning marketplace — by an instructor with a decade across Deloitte, PwC, BMO, and Microsoft.",
  employers: ["Deloitte", "PwC", "BMO", "Microsoft"],
};

export const nav = {
  links: [],
  cta: { label: primaryCtaLabel, href: "#pricing" },
};

export const hero = {
  eyebrow: "PAKISTAN'S MOST-ENROLLED AI COURSE",
  headline: {
    line1: "Learn AI skills people",
    line2: "actually get paid for.",
    accent: "",
  },
  sub: "ChatGPT, MidJourney, AI agents, and the workflows that save you hours every week — with English subtitles throughout. Self-paced, lifetime access. No experience, no maths, no jargon.",
  ctas: {
    primary: { label: primaryCtaLabel, href: "#pricing" },
    secondary: { label: "Not ready? Start with the free course →", href: "/free" },
  },
  emailForm: {
    placeholder: "you@example.com",
    submit: "Get the free first lesson →",
    success: "Check your inbox — your first lesson is on the way.",
  },
  trustStrip: {
    rating: "4.5★ average",
    students: "38,099+ students · 13,017+ reviews",
    featured: "Learners in 100+ countries",
  },
};

// Six outcome-led accordions that replace the old 10-pillar + 8-module split.
// Title shows by default; body expands. (Spec F4 + Part B "What You'll Learn".)
export const learnings = {
  eyebrow: "WHAT YOU'LL LEARN",
  title: "Skills that turn into income and saved time.",
  intro:
    "This isn't a tour of features. Every section ends with something you can do, sell, or automate.",
  items: [
    {
      id: "01",
      title: "Write prompts that actually work.",
      body: "Most people type a request and hope. You'll learn the structure behind reliable, professional output every time — the difference between a toy and a tool.",
    },
    {
      id: "02",
      title: "Create and sell AI art.",
      body: "Use MidJourney to produce artwork good enough to sell, then put it to work on Etsy and print-on-demand platforms as a real income stream.",
    },
    {
      id: "03",
      title: "Automate your busywork.",
      body: "Email, content, customer support, marketing follow-ups — you'll hand the repetitive work to AI and get your hours back.",
    },
    {
      id: "04",
      title: "Build products without a developer.",
      body: "Through Vibe Coding, you'll turn ideas into working apps, dashboards, and data projects — even if you've never written code.",
    },
    {
      id: "05",
      title: "Pull traffic with AI marketing and SEO.",
      body: "Generate search-optimized content and run campaigns that actually bring people in, without an agency.",
    },
    {
      id: "06",
      title: "Build your own AI agents.",
      body: "When you're ready to go advanced, you'll create LangChain and LangGraph agents that handle real, multi-step workflows on their own.",
    },
  ],
};

// Legacy 10-pillar list — kept for any historical reference, no longer rendered.
export const pillars = [
  {
    id: "01",
    title: "Prompt Engineering Mastery",
    description:
      "Learn advanced prompt techniques with ChatGPT 4 & MidJourney for high-quality content creation.",
  },
  {
    id: "02",
    title: "Business Productivity with AI",
    description:
      "Optimize operations, save time, and reduce costs using cutting-edge AI tools.",
  },
  {
    id: "03",
    title: "AI-Driven SEO & Marketing",
    description:
      "Generate SEO-optimized blog posts and affiliate content with ChatGPT automation.",
  },
  {
    id: "04",
    title: "Creative & Digital Products",
    description:
      "Use MidJourney to create, publish, and sell artwork on Etsy and print-on-demand platforms.",
  },
  {
    id: "05",
    title: "Build a Startup with AI",
    description:
      "Develop MVP code, business strategy, operations, HR, and legal plans using ChatGPT.",
  },
  {
    id: "06",
    title: "Email Automation & Engagement",
    description:
      "Automate newsletters, customer support, and marketing campaigns effectively.",
  },
  {
    id: "07",
    title: "Career Development Tools",
    description:
      "Let ChatGPT assist with resumes, cover letters, and interview preparation.",
  },
  {
    id: "08",
    title: "Social Media & Campaigns",
    description:
      "Create engaging campaigns with ChatGPT and MidJourney content creation.",
  },
  {
    id: "09",
    title: "Vibe Coding & Data Projects",
    description:
      "Modern approach to coding: manage data, build GUIs, and visualize insights with ChatGPT support.",
  },
  {
    id: "10",
    title: "AI Agents and Automation",
    description:
      "Build sophisticated AI agents using LangChain and LangGraph for complex workflows and intelligent task orchestration.",
  },
];

export const curriculum = {
  title: "Complete Curriculum",
  subtitle:
    "Most students finish in 4–6 weeks at ~3 hours/week. You set the pace.",
  modules: [
    {
      number: "01",
      title: "Foundational Prompt Engineering",
      description:
        "Master core principles, prompt strategies, and scalable structures with ChatGPT.",
      hours: "3 hours",
      lessons: "12 lessons",
      topics: [
        "Understanding AI Language Models",
        "Prompt Engineering Fundamentals",
        "Advanced Prompting Techniques",
        "ChatGPT Best Practices",
        "Scalable Prompt Structures",
      ],
    },
    {
      number: "02",
      title: "Advanced AI Model Exploration",
      description:
        "Hands-on experience with Bing AI, Gemini, Claude, DALL-E, and Perplexity AI.",
      hours: "2.5 hours",
      lessons: "10 lessons",
      topics: [
        "Bing AI Integration",
        "Google Gemini Workflows",
        "Claude for Complex Tasks",
        "DALL-E Image Generation",
        "Perplexity AI Research",
      ],
    },
    {
      number: "03",
      title: "MidJourney for AI Art Mastery",
      description:
        "Create, market, and monetize AI art from basics to advanced parameters.",
      hours: "4 hours",
      lessons: "15 lessons",
      topics: [
        "MidJourney Fundamentals",
        "Advanced Parameters & Styles",
        "Commercial Art Creation",
        "Print-on-Demand Setup",
        "Digital Product Marketing",
      ],
    },
    {
      number: "04",
      title: "Real-World Projects & Applications",
      description:
        "Build ebooks, blog content, startup ideas, and marketing campaigns.",
      hours: "5 hours",
      lessons: "18 lessons",
      topics: [
        "eBook Creation Pipeline",
        "SEO Blog Content Generation",
        "Startup Ideation Process",
        "Email Marketing Automation",
        "Social Media Campaign Design",
      ],
    },
    {
      number: "05",
      title: "Vibe Coding & Data Visualization",
      description:
        "Modern coding approach: build apps, automate tasks, visualize data with AI.",
      hours: "4.5 hours",
      lessons: "16 lessons",
      topics: [
        "AI-Assisted Development",
        "Interactive App Building",
        "Task Automation Scripts",
        "Data Visualization Techniques",
        "GUI Development with AI",
      ],
    },
    {
      number: "06",
      title: "AI Business & Productivity Tools",
      description:
        "Leverage ChatGPT for SEO, affiliate marketing, and productivity optimization.",
      hours: "3.5 hours",
      lessons: "14 lessons",
      topics: [
        "SEO Content Strategy",
        "Affiliate Marketing Systems",
        "Business Process Automation",
        "Customer Service AI",
        "Productivity Workflows",
      ],
    },
    {
      number: "07",
      title: "Creative Projects & Monetization",
      description:
        "Create coloring books, digital products, and marketable assets.",
      hours: "3 hours",
      lessons: "12 lessons",
      topics: [
        "Coloring Book Production",
        "Digital Asset Creation",
        "Etsy Store Optimization",
        "Product Photography with AI",
        "Sales Funnel Development",
      ],
    },
    {
      number: "08",
      title: "AI Agents & Automation",
      description:
        "Build intelligent AI agents using LangChain and LangGraph for complex workflows and automation.",
      hours: "3.5 hours",
      lessons: "13 lessons",
      topics: [
        "LangChain Framework Fundamentals",
        "LangGraph Multi-Agent Systems",
        "Agent Workflow Design",
        "Memory & State Management",
        "Tool Integration & Custom Actions",
      ],
    },
  ],
};

export const freeIntro = {
  eyebrow: "FREE — NO CARD REQUIRED",
  title: "Introduction to GenAI",
  subtitle:
    "A full free Udemy course that takes you from zero to your first useful AI workflows. Sign up with your email — we'll send your free access link and lifetime access stays.",
  bullets: [
    "What generative AI actually is — without the jargon",
    "The 3 things every prompt needs to get reliable output",
    "Hands-on demos: ChatGPT, Custom GPTs, and more",
    "How to know when AI is the right tool for a task (and when it's not)",
  ],
  stats: [
    { value: "14h 33m", label: "Total length" },
    { value: "179", label: "Lectures" },
    { value: "23", label: "Sections" },
  ],
  cta: {
    label: "Sign up — start the free course →",
    href: "#free-enroll",
  },
  // The Udemy URL with the free coupon — handed to users after they sign up.
  // Kept here so non-coders can rotate the coupon without touching API code.
  enrollUrl:
    "https://www.udemy.com/course/generative-ai-chatgpt/?couponCode=CP260518SUMMX",
  footnote:
    "Liked it? Continue with the Complete AI Bootcamp — 4999 → 999 PKR (80% off).",
};

export const whoFor = {
  title: "Built for where you are right now.",
  intro:
    "Whatever your starting point, this course meets you there and takes you somewhere useful.",
  groups: [
    {
      label: "Beginners",
      body: "You've heard about AI everywhere and you're tired of watching from the sidelines. This gives you a real foundation — no maths, no jargon, just skills you can use this week.",
      outcomes: [
        "Speak about AI confidently instead of faking it",
        "Build your first real project",
        "Finally know which tool fits which job",
      ],
    },
    {
      label: "Professionals",
      body: "You don't want theory — you want to be noticeably better at the job you already do. We focus on workflows: how to actually plug AI into your work as a marketer, writer, designer, or analyst.",
      outcomes: [
        "Save 10+ hours a week on routine tasks",
        "Build custom GPTs for your team",
        "Automate the parts of your role you've always disliked",
      ],
    },
    {
      label: "Founders & Freelancers",
      body: "You want to ship and earn without a big team behind you. AI workflows are how solo operators now compete with funded startups.",
      outcomes: [
        "Build and launch without hiring engineers",
        "Package AI services clients will pay for",
        "Validate ideas in days instead of months",
      ],
    },
  ],
};

export const instructor = {
  name: "Saad Ahmed",
  title:
    "A decade at Deloitte, PwC, BMO, and Microsoft — and 38,099+ students taught.",
  bio: "Meet Saad Ahmed, the founder of SeekhoAI. His background is in data science, business, and finance, and his entire focus is on helping people use AI rather than just talk about it. Students across more than a hundred countries have taken his courses and left over 13,000 reviews at a 4.5-star average. When you enrol, you're learning from someone who has both done the work at Fortune 500 scale and taught it to tens of thousands of beginners.",
  cta: {
    label: "See Saad's Udemy profile →",
    href: "https://www.udemy.com/user/saad-ahmed-434/",
  },
  stats: [
    { value: "38,099+", label: "students" },
    { value: "13,017+", label: "reviews" },
    { value: "4.5★", label: "avg rating" },
    { value: "100+", label: "countries" },
  ],
};

export const testimonialSection = {
  eyebrow: "[ STUDENT VOICES ]",
  title: "Real students. Real reviews.",
  intro:
    "These come straight from the 13,017+ reviews on Udemy — unedited, from people who took the course.",
  ctaLabel: "See all reviews on Udemy →",
  ctaHref: "https://www.udemy.com/user/saad-ahmed-434/",
  stats: [
    { value: "38,099+", label: "students" },
    { value: "13,017+", label: "reviews" },
    { value: "4.5★", label: "average" },
    { value: "100+", label: "countries" },
  ],
  // Real reviews from Saad's Udemy course. Each can be a text quote, an image screenshot, or both.
  // To add a screenshot: drop the PNG into /public/reviews/ and set `src: "/reviews/<file>.png"`.
  reviews: [
    {
      name: "Ananya",
      quote: "Amazing, above expectations!",
      rating: 5,
      when: "5 months ago",
    },
    {
      name: "Farhan",
      quote: "Well structured videos very helpful to understand.",
      rating: 5,
      when: "9 months ago",
    },
    {
      name: "Sabeena",
      quote: "Relevant and good content. BENEFICIAL!",
      rating: 5,
      when: "9 months ago",
    },
    {
      name: "Junaid",
      quote: "The experience was so good.",
      rating: 5,
      when: "9 months ago",
    },
    {
      name: "Luis",
      quote: "Great course. Lots of information and very easy to get through.",
      rating: 4.5,
      when: "2 years ago",
    },
    {
      name: "Sujoy",
      quote: "Great learning and share… These are very useful.",
      rating: 4,
      when: "1 year ago",
    },
  ] as {
    name: string;
    quote?: string;
    rating?: number;
    when?: string;
    src?: string;
    alt?: string;
    location?: string;
  }[],
};

export const pricing = {
  eyebrow: "THE COMPLETE BOOTCAMP",
  title: "The Complete AI Bootcamp",
  currency: "PKR",
  priceAnchor: 4999,
  price: 999,
  discountLabel: "80% off",
  priceNote: "One-time payment. Lifetime access. 30-day money-back guarantee.",
  paymentNote: "Pay easily with JazzCash or Easypaisa.",
  urgency: "Intro price — going up soon.",
  cta: { label: primaryCtaLabel, action: "openCheckout" },
  badges: ["30-day money-back", "Lifetime access", "JazzCash / Easypaisa"],
  includesHeading: "Here's everything you get:",
  includes: [
    "25+ hours of premium content",
    "97+ in-depth video lessons",
    "2000+ real-world prompts library",
    "Full AI art and MidJourney mastery",
    "Vibe Coding fundamentals",
    "Business AI applications",
    "Certificate of completion",
    "Lifetime access to every future update",
  ],
};

export const faq = [
  {
    q: "Is this for absolute beginners?",
    a: "Yes. There's no maths and no coding background required — we start from zero and build up.",
  },
  {
    q: "How much time per week?",
    a: "Around three hours. Most students finish in four to six weeks, but it's fully self-paced, so you set the speed.",
  },
  {
    q: "What if I fall behind?",
    a: "Nothing is lost. You have lifetime access, so you can pick it back up whenever life allows.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes — a 30-day money-back guarantee. If the course isn't right for you, you get your money back, no hassle.",
  },
  {
    q: "Is the certificate recognized?",
    a: "You'll earn a certificate of completion you can add to LinkedIn and share with employers.",
  },
  {
    q: "Can I pay in PKR?",
    a: "Yes. You can pay easily with JazzCash or Easypaisa.",
  },
  {
    q: "Do I need a powerful computer?",
    a: "No. Everything runs in the browser — a basic laptop, or even a phone, works for most of the lessons.",
  },
  {
    q: "Is the course in Urdu?",
    a: "The course is taught in English with subtitles, so it's easy to follow.",
  },
  {
    q: "What happens after I finish?",
    a: "You keep lifetime access and all future updates, plus a spot in the student community.",
  },
];

export const finalCTA = {
  title: "Start learning AI today.",
  body: "Join more than 38,099 students. Enrol in the full bootcamp for 999 PKR — or start free if you're not ready yet.",
  cta: { label: primaryCtaLabel, action: "openCheckout" },
  secondary: { label: "Start with the free course →", href: "/free" },
};

export const footer = {
  tagline: "Practical AI education for the people building tomorrow.",
  socials: [
    {
      kind: "youtube" as const,
      label: "YouTube",
      href: "https://youtube.com/@deeplearnhq",
    },
    {
      kind: "instagram" as const,
      label: "Instagram",
      href: "https://www.instagram.com/deeplearnhq.ca",
    },
    {
      kind: "udemy" as const,
      label: "Udemy",
      href: "https://www.udemy.com/user/saad-ahmed-434/",
    },
    {
      kind: "email" as const,
      label: "Email",
      href: "mailto:saadahmed@deeplearnhq.ca",
    },
  ],
  columns: [
    {
      heading: "Course",
      links: [
        { label: "Curriculum", href: "#curriculum" },
        { label: "Pricing", href: "#pricing" },
        { label: "Enroll", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "#instructor" },
        { label: "DeepLearnHQ", href: "#" },
        { label: "Contact", href: "mailto:hello@seekhoai.pk" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Free first lesson", href: "#hero" },
        { label: "Prompt library", href: "#" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
        { label: "Refund policy", href: "/refund" },
      ],
    },
  ],
  copyright: "© 2026 SeekhoAI. All rights reserved.",
};

export const popup = {
  eyebrow: "WAIT — BEFORE YOU GO",
  title: "Get 80% off the Complete AI Bootcamp",
  bodyBefore: "Drop your email and we'll send code",
  code: "MASTER80",
  bodyAfter:
    "for 80% off — just $99.80 instead of $499.",
  discountedDisplay: "$99.80",
  bodyEnd: "One-time payment. Lifetime access.",
  primaryCta: "Send me my 80% off code →",
  dismissCta: "No thanks, I'll pay full price",
  successTitle: "Code unlocked. Check your inbox.",
  successBody:
    "Your discount has already been applied below. Use code MASTER80 at checkout if you need it again.",
  emailPlaceholder: "you@example.com",
  emailInvalid: "Please enter a valid email (must include @ and a domain).",
  phonePlaceholder: "Phone (optional, e.g. +92 300 1234567)",
  phoneInvalid: "Phone looks off — use digits, spaces, +, or leave blank.",
  cardEyebrow: "EXCLUSIVE OFFER",
  cardHero: "80% OFF",
  cardCodeLabel: "Use code",
};

// Where to send buyers after a successful checkout. Replace with the real
// Udemy course URL once available.
export const udemyCourseUrl =
  "https://www.udemy.com/course/complete-ai-bootcamp/";

// Udemy social-proof section. Edit numbers + cards here, swap icon
// placeholders for screenshots by changing the `image` field on each card
// (drop a PNG into /public/udemy/ and set `image: "/udemy/profile.png"`).
export const udemyShowcase = {
  eyebrow: "TRUSTED ON UDEMY",
  title: "Top-rated by students worldwide.",
  subtitle:
    "Saad teaches AI on Udemy, the world's largest learning marketplace. Students from over a hundred countries have enrolled.",
  stats: [
    { value: "39,341", label: "Students enrolled", icon: "users" as const },
    { value: "13,017+", label: "Reviews", icon: "quote" as const },
    { value: "4.5", label: "Average rating", icon: "stars" as const },
  ],
  instructorUrl: "https://www.udemy.com/user/saad-ahmed-434/",
  cta: {
    label: "Visit my Udemy profile →",
    href: "https://www.udemy.com/user/saad-ahmed-434/",
  },
};

// Admin notification email — receives "new signup" and "new purchase" alerts.
export const adminEmail = "sa5425592@gmail.com";

// MASTER80 path retired per spec — the 4999 → 999 PKR price IS the discount.
// Kept as no-op so legacy callers don't crash; code can never match.
export const discountCode = {
  code: "__DISABLED__",
  pct: 0,
};

// Floating WhatsApp click-to-chat (spec F13 + T6).
// Number is formatted for display; wa.me link strips non-digits automatically.
export const whatsapp = {
  number: "+92 337 7223246",
  message: "Hi! I'm interested in the SeekhoAI AI course. Can you tell me more?",
};

// Payment rails for the 999 PKR close.
// The Easypaisa account is the destination customers transfer to in the
// WhatsApp follow-up — NOT shown on public pages. Use only inside the
// WhatsApp message sequence (Funnel M3 / M4) and on the post-checkout
// payment instructions screen, where appropriate.
export const payments = {
  easypaisa: {
    accountNumber: "03322497026",
    accountTitle: "SeekhoAI", // TODO: confirm registered account title with Maaz
  },
  jazzcash: {
    accountNumber: "", // TODO: ask Maaz if a separate JazzCash account is needed
    accountTitle: "",
  },
};
