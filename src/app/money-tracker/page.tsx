import type { Metadata } from "next";
import MoneyTrackerDemo from "./MoneyTrackerDemo";

export const metadata: Metadata = {
  title: "Money Tracker demo — Zeeshan Khan",
  description:
    "Income, expenses and monthly budgets for a small business — reference implementation you can try live in the browser.",
};

export default function Page() {
  return <MoneyTrackerDemo />;
}
