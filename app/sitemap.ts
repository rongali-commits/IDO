import type { MetadataRoute } from "next";
import { getAllEssays } from "@/lib/essays";
import { siteConfig } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/essays", "/topics", "/about", "/newsletter", "/reading-list", "/now", "/editorial-policy", "/privacy"].map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: new Date() }));
  return [...pages, ...getAllEssays().map((essay) => ({ url: `${siteConfig.url}/essays/${essay.slug}`, lastModified: new Date(essay.date) }))];
}
