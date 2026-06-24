"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  videoId: string;
  title: string;
  posterSrc?: string;
}

export function YouTubeFacade({ videoId, title, posterSrc }: Props) {
  const [activated, setActivated] = useState(false);
  const [preconnected, setPreconnected] = useState(false);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    return () => {
      for (const el of linksRef.current) {
        el.remove();
      }
      linksRef.current = [];
    };
  }, []);

  const handlePreconnect = () => {
    if (preconnected) return;
    setPreconnected(true);
    for (const href of [
      "https://www.youtube-nocookie.com",
      "https://www.google.com",
      "https://googleads.g.doubleclick.net",
      "https://static.doubleclick.net",
    ]) {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = href;
      document.head.appendChild(link);
      linksRef.current.push(link as unknown as HTMLAnchorElement);
    }
  };

  const poster =
    posterSrc ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (activated) {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      onMouseEnter={handlePreconnect}
      onFocus={handlePreconnect}
      aria-label={`Play video: ${title}`}
      className="group relative h-full w-full overflow-hidden bg-teal-900"
    >
      <Image
        src={poster}
        alt=""
        fill
        sizes="(min-width: 768px) 640px, 100vw"
        loading="lazy"
        className="object-cover"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 grid place-items-center"
      >
        <span className="grid size-16 place-items-center rounded-pill bg-gold shadow-cta transition-transform duration-200 ease-brand group-hover:scale-105 md:size-20">
          <Play
            className="ml-1 size-7 fill-ink text-ink md:size-9"
            strokeWidth={0}
          />
        </span>
      </span>
    </button>
  );
}
