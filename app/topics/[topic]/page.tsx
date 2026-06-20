import Link from "next/link";
import { notFound } from "next/navigation";
import { EssayCard } from "@/components/essay-card";
import { getAllEssays } from "@/lib/essays";
import { topicDescriptions } from "@/lib/site";

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params;
  const topic = Object.keys(topicDescriptions).find((item) => item.toLowerCase().replaceAll(" ", "-") === slug);
  if (!topic) notFound();
  const essays = getAllEssays().filter((essay) => essay.topic === topic);
  return <main className="page-main shell"><header className="page-header"><p className="eyebrow"><Link href="/topics">Topics</Link> / {topic}</p><h1>{topic}</h1><p>{topicDescriptions[topic]}</p></header>{essays.length ? <div className="archive-grid">{essays.map((essay) => <EssayCard key={essay.slug} essay={essay} />)}</div> : <div className="empty-state"><p>The first {topic.toLowerCase()} essay is being researched.</p><Link className="button" href="/essays">Browse all essays</Link></div>}</main>;
}
