import type { Metadata } from "next";
import ErpDemo from "./ErpDemo";

export const metadata: Metadata = {
  title: "ERP demo",
  description:
    "Inventory, sales, customers and purchase-order workflow for a small mart — one back office, live and interactive.",
};

export default function Page() {
  return <ErpDemo />;
}
