import type { MetadataRoute } from "next";
import { getAllEssays } from "@/lib/essays";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const essays = getAllEssays().map((essay) => ({
    url: `https://noerong.com/essays/${essay.slug}`,
    lastModified: new Date(essay.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const projectPages = products.map((product) => ({
    url: `https://noerong.com/projects/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: product.stage === "Production" ? 0.8 : 0.6,
  }));

  return [
    { url: "https://noerong.com", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://noerong.com/projects", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://noerong.com/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://noerong.com/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://noerong.com/essays", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...projectPages,
    ...essays,
  ];
}
