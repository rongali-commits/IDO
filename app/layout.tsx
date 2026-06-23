import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: "%s — Noerong" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author, url: `${siteConfig.url}/about` }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  alternates: { canonical: "./", types: { "application/rss+xml": "/feed.xml" } },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" }], apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { title: siteConfig.title, description: siteConfig.description, url: siteConfig.url, siteName: siteConfig.name, type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Noerong — Question the obvious. Follow the strange." }] },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description, images: ["/twitter-image"] },
};

const themeScript = `(function(){try{var t=localStorage.getItem('noerong-theme');var d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const publicationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: "en",
        author: { "@id": `${siteConfig.url}/about#rongali-chaitanya` },
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        logo: `${siteConfig.url}/favicon-48x48.png`,
        founder: { "@id": `${siteConfig.url}/about#rongali-chaitanya` },
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/about#rongali-chaitanya`,
        name: siteConfig.author,
        url: `${siteConfig.url}/about`,
        description: "Writer and builder of Noerong.",
      },
    ],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className={`${sans.variable} ${serif.variable}`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(publicationJsonLd).replace(/</g, "\\u003c") }} />
        <Header />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
