import type { MetadataRoute } from "next";
import { getAllEssays } from "@/lib/essays";
import { siteConfig, topicDescriptions } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/essays", "/topics", "/about", "/newsletter", "/reading-list", "/now", "/editorial-policy", "/privacy"].map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: new Date() }));
  const topics = Object.keys(topicDescriptions).map((topic) => ({
    url: `${siteConfig.url}/topics/${topic.toLowerCase().replaceAll(" ", "-")}`,
    lastModified: new Date(),
  }));
  return [...pages, ...topics, ...getAllEssays().map((essay) => ({ url: `${siteConfig.url}/essays/${essay.slug}`, lastModified: new Date(essay.updated) }))];
}
