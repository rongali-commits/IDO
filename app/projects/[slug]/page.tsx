import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/components/plain-link";
import { notFound } from "next/navigation";
import { ProjectMotionCover } from "@/components/project-motion-cover";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { projectDetails } from "@/lib/project-details";
import { projectEvidence } from "@/lib/project-evidence";
import { products } from "@/lib/products";

type ProjectPageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return {};
  const image = new URL(product.image, "https://noerong.com").toString();
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title: `${product.name} | Noerong`, description: product.summary, url: `https://noerong.com/projects/${slug}`, images: [{ url: image, alt: product.imageAlt }] },
    twitter: { card: "summary_large_image", title: `${product.name} | Noerong`, description: product.summary, images: [image] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const index = products.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const product = products[index];
  const detail = projectDetails[slug];
  const evidence = projectEvidence[slug];
  if (!detail) notFound();
  const next = products[(index + 1) % products.length];

  return (
    <main>
      <SiteHeader motionControls={Boolean(product.motionCover)} />
      <header className="case-hero shell">
        <Link className="case-breadcrumb" href="/projects">← Projects / {product.category}</Link>
        <div className="case-hero-grid"><h1>{product.name}</h1><div className="case-intro"><p className="section-kicker">{product.stage} · Independent Noerong product</p><p>{product.summary}</p><div className="case-actions"><a className="button button-dark" href={product.liveUrl} target="_blank" rel="noreferrer">{product.stage === "Live product" ? "View live product" : "Explore working demo"} <span aria-hidden="true">↗</span></a>{product.sourceKitUrl && <a className="button button-outline" href={product.sourceKitUrl} target="_blank" rel="noreferrer">{product.sourceKitLabel ?? "Source kit"} · {product.sourceKitPrice} <span aria-hidden="true">↗</span></a>}{product.contraUrl && <a className="button button-outline" href={product.contraUrl} target="_blank" rel="noreferrer">Setup service · from {product.startingPrice} <span aria-hidden="true">↗</span></a>}</div>{(product.sourceKitUrl || product.offerNote) && <p className="case-offer-note">{product.offerNote ?? "Source kit: downloadable code and documentation. Setup service: a separately scoped implementation. Hosting, domains, paid APIs, and extra integrations are not included in the source-kit price."}</p>}</div></div>
      </header>
      <div className="case-cover"><ProjectMotionCover poster={product.image} video={product.motionCover} alt={product.imageAlt} priority sizes="100vw" /></div>
      <section className="case-overview shell"><div className="case-facts"><div><span>Industry</span><strong>{product.category}</strong></div><div><span>Audience</span><strong>{detail.audience}</strong></div><div><span>Studio role</span><strong>{detail.role}</strong></div><div><span>Released</span><strong>{detail.year}</strong></div></div><div className="case-story"><p className="section-kicker">The product</p><h2>Built around the<br /><em>actual workflow.</em></h2><p>{detail.overview}</p></div></section>
      <section className="case-sections shell">
        <div className="case-section"><div><p className="section-kicker">Product approach</p><h2>Less friction.<br />More clarity.</h2></div><div className="case-story"><p>{detail.approach}</p></div></div>
        <div className="case-section"><div><p className="section-kicker">Core system</p><h2>What it<br />brings together.</h2></div><div className="case-section-copy">{detail.features.map((feature, featureIndex) => <article key={feature.title}><span>0{featureIndex + 1}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div></div>
        {evidence?.gallery && <section className="case-evidence" aria-labelledby="inside-product"><p className="section-kicker">Inside the product</p><h2 id="inside-product">The work, in detail.</h2><div className="case-evidence-grid">{evidence.gallery.map((item) => <figure key={item.image}><a href={item.image} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${item.caption}`}><Image src={item.image} alt={item.caption} width={item.width ?? 2400} height={item.height ?? 1800} unoptimized sizes="(max-width: 680px) 100vw, 50vw" /></a><figcaption>{item.caption}</figcaption></figure>)}</div><p className="case-evidence-note">Open any image for its full-size view. Sample records illustrate product behavior, not client performance.</p></section>}
        <div className="case-section"><div><p className="section-kicker">Architecture</p><h2>Why these<br />decisions.</h2></div><div className="case-story"><div className="tag-row">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><p>{evidence?.architecture ?? detail.approach}</p></div></div>
        {evidence && <div className="case-section"><div><p className="section-kicker">Outcome and boundaries</p><h2>What is built.<br />What comes next.</h2></div><div className="case-story"><h3>Delivered product</h3><p>{evidence.outcome}</p><h3>Before a business launch</h3><p>{evidence.deployment}</p><p className="case-evidence-note">Independently designed and built by Rongali Chaitanya at Noerong. Scope and acceptance criteria are agreed before a client implementation.</p></div></div>}
      </section>
      <Link className="next-project shell" href={`/projects/${next.slug}`}><div><span>Next project</span><h2>{next.name}</h2></div><b>↗</b></Link>
      <SiteFooter />
    </main>
  );
}
