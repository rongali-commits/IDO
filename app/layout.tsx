import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import "./studio-home.css";
import "./studio-craft.css";
import "./motion-studies.css";
import "./appearance.css";
import "./kiln-case-study.css";
import { StudioAssistant } from "@/components/studio-assistant";
import { StudioMotion } from "@/components/studio-motion";
import { SpaceBackground } from "@/components/space-background";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const editorial = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-editorial" });

// The portfolio only changes when a new version is deployed. Keep the
// generated pages fresh at the edge so a cold application worker is not on
// the critical path for visitors.
export const revalidate = 86400;

export const metadata: Metadata = {
  metadataBase: new URL("https://noerong.com"),
  title: {
    default: "Noerong | Independent SaaS product studio",
    template: "%s | Noerong",
  },
  description: "Noerong is an independent SaaS product studio founded in December 2021 by Rongali Chaitanya in Bengaluru, India.",
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
    description: "Independent SaaS, AI, and automation products founded and built by Rongali Chaitanya in Bengaluru.",
    images: [{ url: "/og-design-2026.webp", width: 1200, height: 630, alt: "Noerong independent design and development studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noerong | Independent SaaS product studio",
    description: "Independent SaaS, AI, and automation products founded and built by Rongali Chaitanya in Bengaluru.",
    images: ["/og-design-2026.webp"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://noerong.com/#studio",
    name: "Noerong",
    url: "https://noerong.com",
    logo: "https://noerong.com/icon-192.png",
    description: "An independent SaaS product studio building practical AI and automation products.",
    foundingDate: "2021-12",
    email: "hello@noerong.com",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 1,
    },
    founder: {
      "@type": "Person",
      "@id": "https://noerong.com/about#rongali",
      name: "Rongali Chaitanya",
      url: "https://noerong.com/about",
      jobTitle: "Founder and SaaS Product Builder",
      sameAs: [
        "https://github.com/rongali-commits",
        "https://www.linkedin.com/in/rongalichaitanya",
      ],
    },
    foundingLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
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
    <html lang="en" suppressHydrationWarning>
      <head><script id="noerong-appearance-init" dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.appearance=localStorage.getItem("noerong-appearance-v1")==="midnight"?"midnight":"studio"}catch{}` }} /></head>
      <body className={`${geist.variable} ${mono.variable} ${editorial.variable}`}>
        <SpaceBackground />
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
        <StudioMotion />
        <StudioAssistant />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
