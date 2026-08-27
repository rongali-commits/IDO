import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://noerong.com"),
  title: {
    default: "Noerong — Focused SaaS products for real business work",
    template: "%s — Noerong",
  },
  description: "Noerong builds practical AI and automation products for small businesses, agencies, and operators.",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/icon-192.png", type: "image/png", sizes: "192x192" }],
    apple: [{ url: "/icon-192.png", type: "image/png", sizes: "192x192" }],
  },
  openGraph: {
    type: "website",
    url: "https://noerong.com",
    siteName: "Noerong",
    title: "Noerong — Focused SaaS products for real business work",
    description: "Practical AI and automation products for small businesses, agencies, and operators.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Noerong — Focused SaaS products for real business work" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noerong — Focused SaaS products for real business work",
    description: "Practical AI and automation products for small businesses, agencies, and operators.",
    images: ["/og.png"],
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
      url: "https://noerong.com/#about",
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
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
