import type { Metadata } from "next";
import { Roboto_Slab, Manrope, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const slab = Roboto_Slab({
  variable: "--font-slab",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

const hanken = Manrope({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Playfair_Display({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://devora-psi.vercel.app";

const TITLE = "Zeeshan Khan — Freelance Software Engineer";
const DESCRIPTION =
  "Solo software builder shipping working POS, booking, ERP and WhatsApp bot systems for small businesses. Every product on this portfolio is a live interactive demo — open one and use it.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Zeeshan Khan",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Zeeshan Khan",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${slab.variable} ${hanken.variable} ${cinzel.variable} ${jetbrains.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
