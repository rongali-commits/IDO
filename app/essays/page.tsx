import type { Metadata } from "next";
import { EssayCard } from "@/components/essay-card";
import { getAllEssays } from "@/lib/essays";

export const metadata: Metadata = { title: "Essays", description: "Long-form Noerong essays on history, science, geopolitics, and philosophy.", alternates: { canonical: "/essays" } };

export default function EssaysPage() {
  const essays = getAllEssays();
  return <main className="page-main shell"><header className="page-header"><p className="eyebrow">The archive</p><h1>Essays</h1><p>Deep dives into ideas that are easy to miss and hard to stop thinking about.</p></header><div className="archive-grid">{essays.map((essay) => <EssayCard key={essay.slug} essay={essay} />)}</div></main>;
}
