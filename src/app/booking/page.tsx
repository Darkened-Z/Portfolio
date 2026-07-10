import type { Metadata } from "next";
import BookingDemo from "./BookingDemo";

export const metadata: Metadata = {
  title: "Booking System demo",
  description:
    "Real-time salon bookings — customers self-serve, the system blocks double-bookings, the owner watches a week calendar fill up.",
};

export default function Page() {
  return <BookingDemo />;
}
