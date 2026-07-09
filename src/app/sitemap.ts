import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://devora-psi.vercel.app";

const ROUTES = [
  { path: "/", priority: 1.0 },
  { path: "/software", priority: 0.9 },
  { path: "/pos", priority: 0.7 },
  { path: "/money-tracker", priority: 0.7 },
  { path: "/order-bot", priority: 0.7 },
  { path: "/booking", priority: 0.7 },
  { path: "/erp", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
