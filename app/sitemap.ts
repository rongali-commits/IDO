import type { MetadataRoute } from "next";
import { getAllEssays } from "@/lib/essays";
import { siteConfig, topicDescriptions } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const essays = getAllEssays();
  const pages = ["", "/essays", "/topics", siteConfig.authorPath, "/newsletter", "/reading-list", "/editorial-policy", "/privacy"].map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: new Date() }));
  const topics = Object.keys(topicDescriptions).filter((topic) => essays.some((essay) => essay.topic === topic)).map((topic) => ({
    url: `${siteConfig.url}/topics/${topic.toLowerCase().replaceAll(" ", "-")}`,
    lastModified: new Date(),
  }));
  return [...pages, ...topics, ...essays.map((essay) => ({ url: `${siteConfig.url}/essays/${essay.slug}`, lastModified: new Date(essay.updated) }))];
}
