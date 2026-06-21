import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { EssayCover } from "@/components/essay-cover";
import { ReadingProgress } from "@/components/reading-progress";
import { mdxComponents } from "@/components/essay-components";
import { formatDate, getAllEssays, getEssay, getEssaySlugs } from "@/lib/essays";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() { return getEssaySlugs().map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!getEssaySlugs().includes(slug)) return {};
  const essay = getEssay(slug);
  const url = `${siteConfig.url}/essays/${slug}`;
  return { title: essay.title, description: essay.description, authors: [{ name: siteConfig.author }], alternates: { canonical: url }, openGraph: { title: essay.title, description: essay.description, url, type: "article", publishedTime: essay.date, authors: [siteConfig.author] } };
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getEssaySlugs().includes(slug)) notFound();
  const essay = getEssay(slug);
  const related = getAllEssays().filter((item) => item.slug !== slug).slice(0, 2);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: essay.title,
    description: essay.description,
    datePublished: essay.date,
    author: { "@type": "Person", name: siteConfig.author, url: `${siteConfig.url}/about` },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/essays/${slug}`,
  };
  return (
    <main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} /><ReadingProgress /><article>
      <header className="article-header shell-narrow"><p className="essay-meta"><Link href={`/topics/${essay.topic.toLowerCase().replaceAll(" ", "-")}`}>{essay.topic}</Link><i />{essay.readTime}</p><h1>{essay.title}</h1><p className="article-deck">{essay.description}</p><div className="byline"><span className="avatar">SR</span><p>By <strong>Sai R</strong><br /><time dateTime={essay.date}>{formatDate(essay.date)}</time></p></div></header>
      <div className="article-cover-wrap shell"><EssayCover accent={essay.accent} /></div>
      <div className="article-body"><MDXRemote source={essay.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} /></div>
      <footer className="article-end shell-narrow"><span className="end-mark">N.</span><p>Written by <Link href="/about">Sai R</Link> for Noerong.</p></footer>
    </article>
    <section className="related shell"><p className="eyebrow">Keep thinking</p><h2>Read next</h2><div className="related-grid">{related.map((item) => <Link href={`/essays/${item.slug}`} key={item.slug}><span>{item.topic} · {item.readTime}</span><h3>{item.title}</h3></Link>)}</div></section>
    </main>
  );
}
