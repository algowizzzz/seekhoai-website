import type { Metadata } from "next";
import { PayManual } from "./PayManual";

export const metadata: Metadata = {
  title: "Pay via JazzCash or Easypaisa — 999 PKR | SeekhoAI",
  description:
    "Transfer 999 PKR via JazzCash or Easypaisa, send your receipt on WhatsApp, and we unlock the Complete AI Bootcamp within 24 hours.",
};

export default function PayPage() {
  return <PayManual />;
}
