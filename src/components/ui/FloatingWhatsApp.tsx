"use client";

import { MessageCircle } from "lucide-react";
import { whatsapp } from "@/content/content";

function buildHref() {
  const cleaned = whatsapp.number.replace(/\D/g, "");
  const text = encodeURIComponent(whatsapp.message);
  return `https://wa.me/${cleaned}?text=${text}`;
}

export function FloatingWhatsApp() {
  return (
    <a
      href={buildHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-pill bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 ease-brand hover:-translate-y-[1px] hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 md:bottom-7 md:right-7"
    >
      <MessageCircle className="size-5" strokeWidth={2} />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
