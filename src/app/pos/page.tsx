import type { Metadata } from "next";
import POSDemo from "./POSDemo";

export const metadata: Metadata = {
  title: "Point of Sale demo — Zeeshan Khan",
  description:
    "Live restaurant point-of-sale demo — register, sales log and dashboard. Ring up an order, take payment, print a receipt, watch the numbers update.",
};

export default function Page() {
  return <POSDemo />;
}
