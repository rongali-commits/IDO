import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllEssays } from "@/lib/essays";
import { products } from "@/lib/products";

export default function Home() {
  const essays = getAllEssays();
  const flagship = products[0];
  const flagshipPurchaseUrl = flagship.contraUrl ?? flagship.purchaseUrl;

  return (
    <main>
      <SiteHeader />

      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Independent SaaS product studio</p>
          <h1>Useful software.<br /><em>Built to earn its place.</em></h1>
          <p className="hero-intro">
            Noerong builds focused AI and automation products for small businesses,
            agencies, and operators who need less busywork and more leverage.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={flagshipPurchaseUrl} target="_blank" rel="noreferrer">Buy LeadDesk on Contra · from {flagship.startingPrice} <span>↗</span></a>
            <a className="button button-secondary" href="#products">See all products <span>↘</span></a>
          </div>
          <div className="proof-row" aria-label="Product proof">
            <div><strong>07</strong><span>working systems</span></div>
            <div><strong>03</strong><span>production products</span></div>
            <div><strong>0</strong><span>slide-deck-only ideas</span></div>
          </div>
        </div>

        <aside className="launch-card" aria-label="Current flagship product">
          <div className="launch-topline"><span className="status-dot" /> Live now <b>01 / 07</b></div>
          <div className="launch-preview">
            <Image src={flagship.image} alt={flagship.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 44vw" />
          </div>
          <div className="launch-copy">
            <div className="launch-heading"><span>Flagship product</span><h2>{flagship.name}</h2></div>
            <p>{flagship.summary}</p>
            <div className="launch-actions">
              <a href={flagship.liveUrl} target="_blank" rel="noreferrer">Try live demo <span>↗</span></a>
              {flagship.contraUrl && <a className="launch-buy" href={flagship.contraUrl} target="_blank" rel="noreferrer">Buy on Contra <span>From {flagship.startingPrice} ↗</span></a>}
              {flagship.purchaseUrl && <a href={flagship.purchaseUrl} target="_blank" rel="noreferrer">Also available on Upwork <span>↗</span></a>}
            </div>
          </div>
        </aside>
      </section>

      <section id="products" className="products-section">
        <div className="section-title shell">
          <div><p className="eyebrow"><span /> Products, not promises</p><h2>Small systems for<br />expensive problems.</h2></div>
          <p>Each product begins with one repeated, measurable business frustration. Then it is designed, tested, documented, and made demonstrable.</p>
        </div>

        <div className="product-grid shell">
          {products.map((product, index) => (
            <article className={`product-card ${index === 0 ? "product-card-wide" : ""}`} key={product.slug}>
              <a className="product-image" href={product.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${product.name} live demo`}>
                <Image src={product.image} alt={product.imageAlt} fill sizes={index === 0 ? "(max-width: 900px) 100vw, 66vw" : "(max-width: 900px) 100vw, 40vw"} />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </a>
              <div className="product-card-copy">
                <div className="product-meta"><span>{product.stage}</span><span>{product.category}</span></div>
                <h3>{product.name}</h3>
                <p>{product.summary}</p>
                <strong>{product.problem}</strong>
                <ul>{product.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                <div className="product-links">
                  {product.contraUrl && <a className="purchase-link" href={product.contraUrl} target="_blank" rel="noreferrer">Buy on Contra · from {product.startingPrice} ↗</a>}
                  {product.purchaseUrl && <a href={product.purchaseUrl} target="_blank" rel="noreferrer">Upwork ↗</a>}
                  <a href={product.liveUrl} target="_blank" rel="noreferrer">Live demo ↗</a>
                  {product.repository && <a href={product.repository} target="_blank" rel="noreferrer">View source ↗</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="offer-section shell">
        <div className="offer-heading">
          <p className="eyebrow"><span /> What clients can buy</p>
          <h2>Start with something that already works.</h2>
          <p>Noerong products are designed to shorten the distance between a useful idea and a reliable business tool.</p>
        </div>
        <div className="offer-grid">
          <article><span>01</span><h3>Ready-made product</h3><p>Purchase a focused working base instead of funding the same foundations from zero.</p></article>
          <article><span>02</span><h3>Branded deployment</h3><p>Apply your business identity, approved content, workflow rules, and destination systems.</p></article>
          <article><span>03</span><h3>Focused custom build</h3><p>Adapt a proven pattern to one painful process with a controlled scope and clear handoff.</p></article>
        </div>
        <a className="button button-dark" href="#contact">Tell us what is slowing you down <span>↘</span></a>
      </section>

      <section id="method" className="method-section">
        <div className="shell method-grid">
          <div>
            <p className="eyebrow"><span /> How Noerong works</p>
            <h2>Proof before polish.</h2>
          </div>
          <ol>
            <li><span>01</span><div><h3>Find the expensive repetition.</h3><p>Start with a workflow that repeatedly costs time, attention, API spend, or missed revenue.</p></div></li>
            <li><span>02</span><div><h3>Make the core outcome work.</h3><p>Build the smallest honest product that solves the task and can be tested by a real buyer.</p></div></li>
            <li><span>03</span><div><h3>Package the ownership.</h3><p>Add deployment, documentation, customization boundaries, and a handoff a client can understand.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="essays-section">
        <div className="shell essays-layout">
          <div className="essays-intro">
            <p className="eyebrow eyebrow-dark"><span /> Ideas, after hours</p>
            <h2>The writing stays.<br />It just does not run the company.</h2>
            <p>Essays remain part of Noerong as evidence of curiosity, research, and clear thinking; they are not a freelance writing service.</p>
            <a className="text-link-dark" href="/essays">Browse the essay archive <span>→</span></a>
          </div>
          <div className="essay-list">
            {essays.map((essay, index) => (
              <a href={`/essays/${essay.slug}`} key={essay.slug}>
                <span>{String(index + 1).padStart(2, "0")} · {essay.topic}</span>
                <h3>{essay.title}</h3>
                <p>{essay.description}</p>
                <b>Read essay ↗</b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="studio-section shell">
        <div className="studio-mark" aria-hidden="true">N<span>●</span></div>
        <div>
          <p className="eyebrow"><span /> About the founder</p>
          <h2>Rongali Chaitanya.</h2>
          <p className="founder-role">Founder of Noerong · SaaS product builder · Bengaluru, India</p>
          <div className="founder-copy">
            <p>Rongali builds focused software for small businesses, agencies, and operators. He founded Noerong to turn costly, repetitive workflows into products people can inspect, use, and own.</p>
            <p>His background in long-form research, editorial fact-checking, and clear communication shapes how every product is made: evidence first, honest demos, controlled scope, and practical handoff.</p>
          </div>
          <ul className="founder-skills" aria-label="Founder capabilities">
            <li>Python automation</li>
            <li>FastAPI</li>
            <li>Next.js</li>
            <li>AI integrations</li>
            <li>Product research</li>
          </ul>
          <div className="studio-links">
            <a href="https://contra.com/noerong_au1wq0v2" target="_blank" rel="noreferrer">View Contra ↗</a>
            <a href="https://www.linkedin.com/in/rongalichaitanya" target="_blank" rel="noreferrer">View LinkedIn ↗</a>
            <a href="https://x.com/rongalichay" target="_blank" rel="noreferrer">View X ↗</a>
            <a href="https://github.com/rongali-commits" target="_blank" rel="noreferrer">View GitHub ↗</a>
            <a href="mailto:hello@noerong.com">hello@noerong.com ↗</a>
          </div>
        </div>
      </section>

      <section id="contact" className="closing-section shell">
        <p className="eyebrow"><span /> Have a costly workflow?</p>
        <h2>Let&apos;s turn it into<br /><em>a product.</em></h2>
        <div className="contact-row">
          <a className="button button-primary" href={flagshipPurchaseUrl} target="_blank" rel="noreferrer">Buy LeadDesk on Contra <span>From {flagship.startingPrice} ↗</span></a>
          <a className="button button-secondary" href="mailto:hello@noerong.com?subject=Noerong%20product%20enquiry">Email hello@noerong.com <span>↗</span></a>
          <p><strong>Reply within 12 hours.</strong><span>Tell me what is slowing your business down, what you use today, and the outcome you want.</span></p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
