import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatDate, getEssay, getEssaySlugs, getAllEssays } from "@/lib/essays";

type EssayPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return getEssaySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: EssayPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!getEssaySlugs().includes(slug)) return {};
  const essay = getEssay(slug);
  const url = `https://noerong.com/essays/${slug}`;
  const image = new URL(essay.coverImage, "https://noerong.com").toString();

  return {
    title: essay.title,
    description: essay.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: essay.title,
      description: essay.description,
      publishedTime: essay.date,
      modifiedTime: essay.updated,
      authors: ["Rongali Chaitanya"],
      images: [{ url: image, alt: essay.coverAlt }],
    },
    twitter: { card: "summary_large_image", title: essay.title, description: essay.description, images: [image] },
  };
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;
  if (!getEssaySlugs().includes(slug)) notFound();
  const essay = getEssay(slug);

  const [body, sources] = essay.content.split(/^## Sources and Further Reading\s*$/m);
  const related = getAllEssays().filter(item => item.slug !== slug);

  return (
    <main>
      <SiteHeader />
      <article className="article-page">
        <header className="article-header shell">
          <a href="/essays">← Essay archive</a>
          <p>{essay.topic} · {formatDate(essay.date)} · {essay.readTime}</p>
          <h1>{essay.title}</h1>
          <p>{essay.description}</p>
          <div className="article-byline"><a href="/about">By Rongali Chaitanya</a><span>Updated {formatDate(essay.updated)}</span>{sources && <a href="#sources">Sources ↓</a>}</div>
        </header>
        <div className="article-cover shell">
          <Image src={essay.coverImage} alt={essay.coverAlt} fill priority sizes="(max-width: 900px) 100vw, 1200px" />
        </div>
        {essay.coverCredit && <p className="cover-credit shell">Image: <a href={essay.coverSource}>{essay.coverCredit}</a>{essay.coverLicense && ` · ${essay.coverLicense}`}</p>}
        <div className="article-body shell">
          <ReactMarkdown skipHtml remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
          {sources && <section id="sources" className="article-sources" aria-labelledby="sources-title"><p className="section-kicker">Explore the evidence</p><h2 id="sources-title">Sources and further reading</h2><ReactMarkdown skipHtml remarkPlugins={[remarkGfm]}>{sources}</ReactMarkdown></section>}
        </div>
      </article>
      <section className="article-end shell">
        <div><span>Continue reading</span><h2>Another perspective.</h2></div>
        <div className="related-essays">{related.map(item => <a key={item.slug} href={`/essays/${item.slug}`}><span>{item.topic}</span><strong>{item.title} ↗</strong></a>)}</div>
      </section>
      <SiteFooter showProjectCta={false} />
    </main>
  );
}
