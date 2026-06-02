import type { Metadata } from "next";
import { FreeLanding } from "./FreeLanding";

export const metadata: Metadata = {
  title: "Free 14-Hour GenAI Course — Start Learning AI Today | SeekhoAI",
  description:
    "Get a full 14-hour Introduction to GenAI course free. ChatGPT, prompts, real demos. No card needed. Sign up and your access link comes straight to you.",
  openGraph: {
    title: "Free 14-Hour GenAI Course — SeekhoAI",
    description:
      "Start free: 14+ hours, 179 lectures, lifetime access. No card needed.",
    type: "website",
  },
};

export default function FreePage() {
  return <FreeLanding />;
}
