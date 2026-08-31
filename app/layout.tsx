import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://noerong.com"),
  title: {
    default: "Noerong | Independent SaaS product studio",
    template: "%s | Noerong",
  },
  description: "Noerong designs and builds focused SaaS products, AI systems, and business automation from idea to production.",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/icon-192.png", type: "image/png", sizes: "192x192" }],
    apple: [{ url: "/icon-192.png", type: "image/png", sizes: "192x192" }],
  },
  openGraph: {
    type: "website",
    url: "https://noerong.com",
    siteName: "Noerong",
    title: "Noerong | Independent SaaS product studio",
    description: "Focused SaaS products, AI systems, and business automation built from idea to production.",
    images: [{ url: "/og-v2.webp", width: 1200, height: 630, alt: "Noerong independent SaaS product studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noerong | Independent SaaS product studio",
    description: "Focused SaaS products, AI systems, and business automation built from idea to production.",
    images: ["/og-v2.webp"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Noerong",
    url: "https://noerong.com",
    logo: "https://noerong.com/icon-192.png",
    description: "An independent SaaS product studio building practical AI and automation products.",
    founder: {
      "@type": "Person",
      name: "Rongali Chaitanya",
      url: "https://noerong.com/about",
      jobTitle: "Founder and SaaS Product Builder",
      sameAs: [
        "https://github.com/rongali-commits",
        "https://www.linkedin.com/in/rongalichaitanya",
      ],
    },
    location: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
    },
    sameAs: [
      "https://github.com/rongali-commits",
      "https://www.linkedin.com/in/rongalichaitanya",
    ],
  };

  return (
    <html lang="en">
      <body className={`${geist.variable} ${mono.variable}`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div id="main-content">{children}</div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
