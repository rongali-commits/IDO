import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatDate, getEssay, getEssaySlugs } from "@/lib/essays";

type EssayPageProps = { params: Promise<{ slug: string }> };

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
      images: [{ url: image, alt: essay.coverAlt }],
    },
    twitter: { card: "summary_large_image", title: essay.title, description: essay.description, images: [image] },
  };
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;
  if (!getEssaySlugs().includes(slug)) notFound();
  const essay = getEssay(slug);

  return (
    <main>
      <SiteHeader />
      <article className="article-page">
        <header className="article-header shell">
          <a href="/essays">← Essay archive</a>
          <p>{essay.topic} · {formatDate(essay.date)} · {essay.readTime}</p>
          <h1>{essay.title}</h1>
          <p>{essay.description}</p>
        </header>
        <div className="article-cover shell">
          <Image src={essay.coverImage} alt={essay.coverAlt} fill priority sizes="(max-width: 900px) 100vw, 1200px" />
        </div>
        <div className="article-body shell">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{essay.content}</ReactMarkdown>
        </div>
      </article>
      <section className="article-end shell">
        <div><span>Back to the studio</span><h2>Writing is the side room.<br />Software is the work.</h2></div>
        <a className="button button-outline" href="/projects">Explore projects <span>↗</span></a>
      </section>
      <SiteFooter />
    </main>
  );
}
