import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/components/plain-link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { projectDetails } from "@/lib/project-details";
import { products } from "@/lib/products";

type ProjectPageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return {};
  return { title: product.name, description: product.summary, alternates: { canonical: `/projects/${slug}` }, openGraph: { title: `${product.name} | Noerong`, description: product.summary, url: `https://noerong.com/projects/${slug}`, images: [{ url: product.image, alt: product.imageAlt }] } };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const index = products.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const product = products[index];
  const detail = projectDetails[slug];
  if (!detail) notFound();
  const next = products[(index + 1) % products.length];

  return (
    <main>
      <SiteHeader />
      <header className="case-hero shell">
        <Link className="case-breadcrumb" href="/projects">← Projects / {product.category}</Link>
        <div className="case-hero-grid"><h1>{product.name}</h1><div className="case-intro"><p className="section-kicker">{product.stage}</p><p>{product.summary}</p><div className="case-actions"><a className="button button-dark" href={product.liveUrl} target="_blank" rel="noreferrer">View live product <span>↗</span></a>{product.contraUrl && <a className="button button-outline" href={product.contraUrl} target="_blank" rel="noreferrer">Launch for $29 <span>↗</span></a>}{product.sourceKitUrl && <a className="button button-outline" href={product.sourceKitUrl} target="_blank" rel="noreferrer">Buy source kit for $19 <span>↗</span></a>}</div></div></div>
      </header>
      <div className="case-cover"><Image src={product.image} alt={product.imageAlt} fill priority unoptimized sizes="100vw" /></div>
      <section className="case-overview shell"><div className="case-facts"><div><span>Industry</span><strong>{product.category}</strong></div><div><span>Audience</span><strong>{detail.audience}</strong></div><div><span>Studio role</span><strong>{detail.role}</strong></div><div><span>Released</span><strong>{detail.year}</strong></div></div><div className="case-story"><p className="section-kicker">The product</p><h2>Built around the<br /><em>actual workflow.</em></h2><p>{detail.overview}</p></div></section>
      <section className="case-sections shell">
        <div className="case-section"><div><p className="section-kicker">Product approach</p><h2>Less friction.<br />More clarity.</h2></div><div className="case-story"><p>{detail.approach}</p></div></div>
        <div className="case-section"><div><p className="section-kicker">Core system</p><h2>What it<br />brings together.</h2></div><div className="case-section-copy">{detail.features.map((feature, featureIndex) => <article key={feature.title}><span>0{featureIndex + 1}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div></div>
        <div className="case-section"><div><p className="section-kicker">Technology</p><h2>Chosen for<br />the product.</h2></div><div className="case-section-copy">{product.tags.map((tag, tagIndex) => <article key={tag}><span>0{tagIndex + 1}</span><h3>{tag}</h3><p>A deliberate part of the product stack, selected for maintainability, speed, and a dependable operating experience.</p></article>)}</div></div>
      </section>
      <Link className="next-project shell" href={`/projects/${next.slug}`}><div><span>Next project</span><h2>{next.name}</h2></div><b>↗</b></Link>
      <SiteFooter />
    </main>
  );
}
