export const dynamic = "force-dynamic";
import { revoraPages } from "@/lib/revora-content";
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { ARTICLES } from "@/lib/journal";

const ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.7, changeFrequency: "monthly" },
  { path: "/book-pickup", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "monthly" },
  ...ARTICLES.map(a => ({path: `/blog/${a.slug}`, priority: 0.6, changeFrequency: "monthly" as const})),
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.5, changeFrequency: "yearly" },
  { path: "/business", priority: 0.5, changeFrequency: "monthly" },
  // Contact also carries the coverage section, so it changes with the zone list.
  { path: "/contact", priority: 0.8, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Preserve the established sitemap when the optional campaign feed is offline.
  const pages = await revoraPages().catch(() => []);
  const lastModified = new Date();
  return [...ROUTES, ...pages.map(p => ({path: "/insights/" + p.slug, priority: 0.6, changeFrequency: "monthly" as const}))].map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
