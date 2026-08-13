import type { Metadata } from "next";
import Link from "next/link";
import { getAllEssays } from "@/lib/essays";
import { topicDescriptions } from "@/lib/site";

export const metadata: Metadata = {
  title: "Topics",
  description: "Explore Noerong essays by Rongali Chaitanya, organized by topic.",
  alternates: { canonical: "/topics" },
};
export default function TopicsPage() {
  const essays = getAllEssays();
  const publishedTopics = Object.entries(topicDescriptions).filter(([topic]) => essays.some((essay) => essay.topic === topic));
  return <main className="page-main shell"><header className="page-header"><p className="eyebrow">Collections</p><h1>Topics</h1><p>Different doors into the same unruly world.</p></header><div className="topics-list">{publishedTopics.map(([topic, description]) => { const count = essays.filter((e) => e.topic === topic).length; return <Link key={topic} href={`/topics/${topic.toLowerCase().replaceAll(" ", "-")}`}><div><span>{String(count).padStart(2, "0")} essay{count === 1 ? "" : "s"}</span><h2>{topic}</h2></div><p>{description}</p><b>→</b></Link>; })}</div></main>;
}
