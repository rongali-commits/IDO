import { ImageResponse } from "next/og";

export const alt = "Noerong — Question the obvious. Follow the strange.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 82px", color: "#17231f", background: "#f6f0e5", fontFamily: "Georgia, serif" }}>
      <div style={{ display: "flex", fontFamily: "Arial, sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: 5 }}>NOERONG<span style={{ color: "#e96546" }}>.</span></div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", maxWidth: 950, fontSize: 82, lineHeight: 0.98, letterSpacing: -4 }}>Question the obvious.<br />Follow the strange.</div>
        <div style={{ display: "flex", marginTop: 32, fontFamily: "Arial, sans-serif", fontSize: 25, color: "#58615c" }}>Independent essays by Rongali Chaitanya on history, science, philosophy, and civilization.</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Arial, sans-serif", fontSize: 22, color: "#58615c" }}><span style={{ width: 42, height: 4, background: "#e96546" }} />noerong.com</div>
    </div>,
    size,
  );
}
