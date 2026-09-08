import type { MetadataRoute } from "next";
import { getAllEssays } from "@/lib/essays";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const essays = getAllEssays().map((essay) => ({
    url: `https://noerong.com/essays/${essay.slug}`,
    lastModified: new Date(essay.updated),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const projectPages = products.map((product) => ({
    url: `https://noerong.com/projects/${product.slug}`,
    
    changeFrequency: "monthly" as const,
    priority: product.stage === "Live product" ? 0.8 : 0.6,
  }));

  return [
    { url: "https://noerong.com",  changeFrequency: "monthly", priority: 1 },
    { url: "https://noerong.com/projects",  changeFrequency: "monthly", priority: 0.9 },
    { url: "https://noerong.com/about",  changeFrequency: "monthly", priority: 0.7 },
    { url: "https://noerong.com/contact",  changeFrequency: "monthly", priority: 0.7 },
    { url: "https://noerong.com/essays",  changeFrequency: "monthly", priority: 0.6 },
    ...["privacy", "terms", "mission", "assistant-privacy"].map(path => ({ url: `https://noerong.com/${path}`, changeFrequency: "yearly" as const, priority: 0.3 })),
    ...projectPages,
    ...essays,
  ];
}
