import Link from "next/link";
import type { Essay } from "@/lib/essays";
import { ArrowIcon } from "./icons";
import { EssayCover } from "./essay-cover";

export function EssayCard({ essay, featured = false }: { essay: Essay; featured?: boolean }) {
  return (
    <article className={`essay-card ${featured ? "essay-card-featured" : ""}`}>
      <Link href={`/essays/${essay.slug}`} className="card-cover-link" tabIndex={-1} aria-hidden="true"><EssayCover accent={essay.accent} compact={!featured} /></Link>
      <div className="essay-card-copy">
        <p className="essay-meta"><span>{essay.topic}</span><i />{essay.readTime}</p>
        <h2><Link href={`/essays/${essay.slug}`}>{essay.title}</Link></h2>
        <p>{essay.description}</p>
        <Link className="text-link" href={`/essays/${essay.slug}`}>Read essay <ArrowIcon /></Link>
      </div>
    </article>
  );
}
