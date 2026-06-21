import { ImageResponse } from "next/og";
import { getEssay, getEssaySlugs } from "@/lib/essays";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() { return getEssaySlugs().map((slug) => ({ slug })); }

const colors = {
  coral: { background: "#d8563e", foreground: "#f6f0e5", accent: "#f2c0a8" },
  blue: { background: "#173648", foreground: "#f6f0e5", accent: "#dfc891" },
  gold: { background: "#d9aa3d", foreground: "#17231f", accent: "#29403b" },
};

export default async function EssayOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getEssay(slug);
  const palette = colors[essay.accent];
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "66px 76px", color: palette.foreground, background: palette.background, fontFamily: "Georgia, serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Arial, sans-serif", fontSize: 24, fontWeight: 800, letterSpacing: 4 }}><span>NOERONG.</span><span style={{ color: palette.accent, letterSpacing: 2 }}>{essay.topic.toUpperCase()}</span></div>
      <div style={{ display: "flex", maxWidth: 1040, fontSize: essay.title.length > 64 ? 61 : 72, lineHeight: 1.02, letterSpacing: -2 }}>{essay.title}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Arial, sans-serif", fontSize: 22 }}><span>By Sai R</span><span>noerong.com</span></div>
    </div>,
    size,
  );
}
