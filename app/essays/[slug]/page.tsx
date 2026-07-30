import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { EssayCover } from "@/components/essay-cover";
import { EssayShare } from "@/components/essay-share";
import { ReadingProgress } from "@/components/reading-progress";
import { mdxComponents } from "@/components/essay-components";
import { formatDate, getAllEssays, getEssay, getEssaySlugs } from "@/lib/essays";
import { siteConfig } from "@/lib/site";
import { NewsletterForm } from "@/components/newsletter-form";

export function generateStaticParams() { return getEssaySlugs().map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!getEssaySlugs().includes(slug)) return {};
  const essay = getEssay(slug);
  const url = `${siteConfig.url}/essays/${slug}`;
  const image = `${siteConfig.url}${essay.coverImage}`;
  return {
    title: essay.title,
    description: essay.description,
    authors: [{ name: siteConfig.author, url: `${siteConfig.url}${siteConfig.authorPath}` }],
    alternates: { canonical: url },
    openGraph: { title: essay.title, description: essay.description, url, type: "article", publishedTime: essay.date, modifiedTime: essay.updated, authors: [siteConfig.author], section: essay.topic, images: [{ url: image, width: 1800, height: 1200, alt: essay.coverAlt }] },
    twitter: { card: "summary_large_image", title: essay.title, description: essay.description, images: [image] },
  };
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getEssaySlugs().includes(slug)) notFound();
  const essay = getEssay(slug);
  const related = getAllEssays().filter((item) => item.slug !== slug).slice(0, 2);
  const sourcesMatch = /^## Sources and Further Reading$/m.exec(essay.content);
  const essayContent = sourcesMatch ? essay.content.slice(0, sourcesMatch.index) : essay.content;
  const sourcesContent = sourcesMatch ? essay.content.slice(sourcesMatch.index) : null;
  const essayUrl = `${siteConfig.url}/essays/${slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: essay.title,
    description: essay.description,
    datePublished: essay.date,
    dateModified: essay.updated,
    wordCount: essay.wordCount,
    articleSection: essay.topic,
    inLanguage: "en",
    image: `${siteConfig.url}${essay.coverImage}`,
    author: {
      "@type": "Person",
      "@id": siteConfig.personId,
      name: siteConfig.author,
      url: `${siteConfig.url}${siteConfig.authorPath}`,
      sameAs: [siteConfig.personalUrl, siteConfig.githubUrl, siteConfig.linkedinUrl],
    },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: essayUrl,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Essays", item: `${siteConfig.url}/essays` },
      { "@type": "ListItem", position: 3, name: essay.title, item: `${siteConfig.url}/essays/${slug}` },
    ],
  };
  return (
    <main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} /><ReadingProgress /><article>
      <header className="article-header shell-narrow"><p className="essay-meta"><Link href={`/topics/${essay.topic.toLowerCase().replaceAll(" ", "-")}`}>{essay.topic}</Link><i />{essay.readTime}</p><h1>{essay.title}</h1><p className="article-deck">{essay.description}</p><div className="byline"><span className="avatar">RC</span><p>By <strong>{siteConfig.author}</strong><br /><time dateTime={essay.date}>{formatDate(essay.date)}</time></p></div></header>
      <div className="article-cover-wrap shell"><EssayCover accent={essay.accent} src={essay.coverImage} alt={essay.coverAlt} credit={essay.coverCredit} sourceUrl={essay.coverSource} license={essay.coverLicense} priority /></div>
      <div className="article-body">
        <MDXRemote source={essayContent} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        <EssayShare title={essay.title} url={essayUrl} />
        {sourcesContent ? <div className="article-sources"><MDXRemote source={sourcesContent} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} /></div> : null}
      </div>
      <aside className="article-newsletter shell-narrow"><div><p className="eyebrow">Continue the conversation</p><h2>One worthwhile idea,<br />occasionally.</h2><p>New Noerong essays and research notes, sent only when there is something worth reading.</p></div><NewsletterForm source={`essay_${slug}`} /></aside>
      <footer className="article-end shell-narrow"><span className="end-mark">N.</span><p>Written by <Link href={siteConfig.authorPath}>{siteConfig.author}</Link> for Noerong.</p></footer>
    </article>
    <section className="related shell"><p className="eyebrow">Keep thinking</p><h2>Read next</h2><div className="related-grid">{related.map((item) => <Link href={`/essays/${item.slug}`} key={item.slug}><span>{item.topic} · {item.readTime}</span><h3>{item.title}</h3></Link>)}</div></section>
    </main>
  );
}
