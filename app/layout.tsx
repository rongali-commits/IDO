import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: "%s — Noerong" },
  description: siteConfig.description,
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { title: siteConfig.title, description: siteConfig.description, url: siteConfig.url, siteName: siteConfig.name, type: "website" },
};

const themeScript = `(function(){try{var t=localStorage.getItem('noerong-theme');var d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className={`${sans.variable} ${serif.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
