import type { MetadataRoute } from "next";
import { getAllEssays } from "@/lib/essays";

export default function sitemap(): MetadataRoute.Sitemap {
  const essays = getAllEssays().map((essay) => ({
    url: `https://noerong.com/essays/${essay.slug}`,
    lastModified: new Date(essay.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [
    { url: "https://noerong.com", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://noerong.com/essays", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...essays,
  ];
}
