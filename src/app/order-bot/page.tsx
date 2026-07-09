import type { Metadata } from "next";
import OrderBotDemo from "./OrderBotDemo";

export const metadata: Metadata = {
  title: "WhatsApp Order Bot demo — Zeeshan Khan",
  description:
    "A bot that takes customer orders 24/7 on WhatsApp — try placing one in the phone-frame demo. Every order lands on the owner dashboard beside it.",
};

export default function Page() {
  return <OrderBotDemo />;
}
