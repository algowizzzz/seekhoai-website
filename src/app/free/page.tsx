import type { Metadata } from "next";
import { FreeLanding } from "./FreeLanding";

export const metadata: Metadata = {
  title: "Free 2-Hour Intro to GenAI & ChatGPT — Start Today | SeekhoAI",
  description:
    "A focused 2-hour intro to GenAI and ChatGPT. Free. No card needed. Sign up and your access link comes straight to you.",
  openGraph: {
    title: "Free Intro to GenAI & ChatGPT — SeekhoAI",
    description:
      "Start free: 2 hours, lifetime access, no card needed.",
    type: "website",
  },
};

export default function FreePage() {
  return <FreeLanding />;
}
