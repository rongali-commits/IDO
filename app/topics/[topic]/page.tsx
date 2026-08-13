import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EssayCard } from "@/components/essay-card";
import { getAllEssays } from "@/lib/essays";
import { topicDescriptions } from "@/lib/site";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = Object.keys(topicDescriptions).find((item) => item.toLowerCase().replaceAll(" ", "-") === slug);
  if (!topic) return {};
  if (!getAllEssays().some((essay) => essay.topic === topic)) return {};
  return {
    title: `${topic} Essays`,
    description: `${topicDescriptions[topic]} Essays by Rongali Chaitanya for Noerong.`,
    alternates: { canonical: `/topics/${slug}` },
  };
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params;
  const topic = Object.keys(topicDescriptions).find((item) => item.toLowerCase().replaceAll(" ", "-") === slug);
  if (!topic) notFound();
  const essays = getAllEssays().filter((essay) => essay.topic === topic);
  if (!essays.length) notFound();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Topics", item: `${siteConfig.url}/topics` },
      { "@type": "ListItem", position: 3, name: topic, item: `${siteConfig.url}/topics/${slug}` },
    ],
  };
  return <main className="page-main shell"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} /><header className="page-header"><p className="eyebrow"><Link href="/topics">Topics</Link> / {topic}</p><h1>{topic}</h1><p>{topicDescriptions[topic]}</p></header><div className="archive-grid">{essays.map((essay) => <EssayCard key={essay.slug} essay={essay} />)}</div></main>;
}
