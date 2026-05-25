// All copy on the landing page reads from this file.
// Non-coders can safely edit strings here without touching component code.

export const brand = {
  name: "SeekhoAI",
  domain: "seekhoai.pk",
  course: "Complete AI Bootcamp",
  price: 499,
  priceAnchor: 799,
  studentsEnrolled: "24,318+",
  rating: "4.6",
  instructorName: "Saad A",
};

export const nav = {
  links: [
    { label: "Curriculum", href: "#curriculum" },
    { label: "Instructor", href: "#instructor" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Enroll Now", href: "#pricing" },
};

export const hero = {
  eyebrow: "[ AI BOOTCAMP · LEARN AT YOUR PACE ]",
  headline: {
    line1: "Master AI.",
    line2: "Build the future.",
    accent: "Starting today.",
  },
  sub: "Join 24,318+ students learning Prompt Engineering, ChatGPT, MidJourney, and Vibe Coding from one of the world's top-rated AI instructors. Self-paced. Lifetime access.",
  ctas: {
    primary: { label: "Enroll Now — $499", href: "#pricing" },
    secondary: { label: "Watch the trailer", href: "#trailer" },
  },
  emailForm: {
    placeholder: "you@example.com",
    submit: "Get the free first lesson →",
    success: "Check your inbox — your first lesson is on the way.",
  },
  trustStrip: {
    rating: "4.6 / 5",
    students: "24,318+ students",
    featured: "Featured on Udemy",
  },
};

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

export const whoFor = {
  title: "Built for ambitious learners.",
  groups: [
    {
      label: "Beginners",
      body: "You've heard about AI everywhere and you're tired of being on the sidelines. This bootcamp gives you a real foundation — no math, no jargon, just usable skill.",
      outcomes: [
        "Speak fluent AI without faking it",
        "Build your first real project",
        "Know which tool fits which job",
      ],
    },
    {
      label: "Professionals",
      body: "You want to use AI to be 3× better at your job. We focus on workflows: how to actually plug AI into the work you already do as a marketer, writer, designer, or analyst.",
      outcomes: [
        "Save 10+ hours a week on routine work",
        "Build custom GPTs for your team",
        "Automate the boring parts of your role",
      ],
    },
    {
      label: "Founders",
      body: "You want to ship products without a 10-person engineering team. Vibe Coding + AI workflows are how solo and small teams now compete with funded startups.",
      outcomes: [
        "Build and ship without hiring engineers",
        "Run lean using AI across product, design, and ops",
        "Validate ideas in days, not quarters",
      ],
    },
  ],
};

export const instructor = {
  name: "Saad A",
  title: "AI Expert Instructor · Founder, SeekhoAI",
  bio: "Saad is a Pakistani AI educator who has taught 24,318+ students worldwide on Udemy, holding a 4.6★ average rating across his courses. He's the founder of SeekhoAI and DeepLearnHQ, and has spent the last five years helping students and professionals across South Asia and beyond actually use AI — not just talk about it. He's built four AI products and writes about applied AI for working people.",
  stats: [
    { value: "24,318+", label: "students" },
    { value: "4.6★", label: "avg rating" },
    { value: "5+", label: "years teaching" },
    { value: "4", label: "AI products built" },
  ],
};

export const testimonials = [
  {
    quote:
      "This course completely transformed how I approach content creation. The prompt engineering techniques alone saved me 20+ hours per week. Highly recommend!",
    name: "Sarah Chen",
    role: "Marketing Director",
    location: "Tech Startup",
  },
  {
    quote:
      "MidJourney section was incredible! I'm now selling AI art on Etsy and making $2k+ monthly. The instructor's guidance on monetization was spot-on.",
    name: "Michael Rodriguez",
    role: "Freelance Designer",
    location: "Creative Agency",
  },
  {
    quote:
      "Vibe coding changed my perspective on programming. Building data visualizations with AI assistance made complex projects so much more manageable.",
    name: "Jennifer Park",
    role: "Business Analyst",
    location: "Fortune 500",
  },
  {
    quote:
      "Used ChatGPT techniques from this course to develop my startup's entire business plan. The AI automation strategies are worth 10x the course price.",
    name: "David Thompson",
    role: "Entrepreneur",
    location: "Startup Founder",
  },
  {
    quote:
      "SEO content creation has never been easier. My blog traffic increased 400% using the AI strategies taught in this comprehensive bootcamp.",
    name: "Lisa Wang",
    role: "Content Creator",
    location: "Digital Marketing",
  },
  {
    quote:
      "The advanced AI models section opened up so many possibilities. Now I'm leveraging multiple AI tools daily to accelerate my research projects.",
    name: "James Mitchell",
    role: "Data Scientist",
    location: "Healthcare Tech",
  },
];

export const pricing = {
  eyebrow: "THE COMPLETE BOOTCAMP",
  title: "GenAI and Prompt Engineering MasterClass",
  priceAnchor: 1499,
  price: 499,
  priceNote: "One-time payment • Lifetime access",
  cta: { label: "Enroll Now - Start Learning Today", action: "openCheckout" },
  badges: ["30-Day Money-Back", "Lifetime Access"],
  includesHeading: "Everything You Get:",
  includes: [
    "25+ Hours of Premium Content",
    "97+ In-Depth Video Lessons",
    "2000+ Real-World Prompts Library",
    "Hands-On Project Portfolio",
    "AI Art & MidJourney Mastery",
    "Vibe Coding Fundamentals",
    "Business AI Applications",
    "Lifetime Access to Updates",
    "Certificate of Completion",
    "Expert Community Access",
  ],
};

export const faq = [
  {
    q: "Is this for absolute beginners?",
    a: "Yes. Module 1 starts from zero — no math, no coding required. If you can use a web browser, you can take this course. We deliberately built the early modules so a complete beginner and a technical professional can both get value.",
  },
  {
    q: "How much time per week?",
    a: "Plan for about 3 hours per week. The whole bootcamp is self-paced — binge it in a weekend, stretch it over months, or come back to it whenever. Lifetime access means there's no deadline.",
  },
  {
    q: "What if I fall behind?",
    a: "There's no cohort and no deadline. The Complete AI Bootcamp is fully self-paced — you start when you want, you finish when you want, and you keep access for life.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes — 7-day no-questions-asked refund. Try the first two modules, and if the course isn't for you, email us within seven days for a full refund.",
  },
  {
    q: "Is the certificate recognized?",
    a: "You receive a verified SeekhoAI certificate of completion. It's not a university degree, but it works the way a great Udemy or Coursera certificate works — proof of skill that you can attach to a LinkedIn profile or résumé.",
  },
  {
    q: "Can I pay in PKR?",
    a: "Yes. Pakistani students can pay via JazzCash or Easypaisa in PKR — email us at hello@seekhoai.pk after enrollment and we'll send local payment instructions and a discount adjustment for currency differences.",
  },
  {
    q: "Do I need a powerful computer?",
    a: "No. Everything runs in the browser — ChatGPT, MidJourney, Cursor (which works on any modern laptop), and Claude. A basic laptop with a stable internet connection is all you need.",
  },
  {
    q: "What happens after I finish?",
    a: "Lifetime access stays. You keep the videos, prompt libraries, community, and every future update we ship — at no extra cost. Many students dip back in months later as new modules launch.",
  },
];

export const finalCTA = {
  title: "The future doesn't wait. Build with it.",
  body: "Join 24,318+ students. Master AI. Ship real work.",
  cta: { label: "Enroll Now — $499", action: "openCheckout" },
};

export const footer = {
  tagline: "Practical AI education for the people building tomorrow.",
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
        { label: "Terms", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Refund policy", href: "#" },
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

// Admin notification email — receives "new signup" and "new purchase" alerts.
export const adminEmail = "sa5425592@gmail.com";

// The single universal discount code.
export const discountCode = {
  code: "MASTER80",
  pct: 0.8,
};
