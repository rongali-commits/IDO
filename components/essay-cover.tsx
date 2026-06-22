import Image from "next/image";

export function EssayCover({ accent, src, alt, compact = false, priority = false, decorative = false }: { accent: "coral" | "blue" | "gold"; src: string; alt: string; compact?: boolean; priority?: boolean; decorative?: boolean }) {
  return (
    <div className={`essay-cover cover-${accent} ${compact ? "cover-compact" : ""}`}>
      <Image className="essay-cover-image" src={src} alt={decorative ? "" : alt} fill priority={priority} sizes={compact ? "(max-width: 650px) 110px, 160px" : "(max-width: 900px) calc(100vw - 48px), 720px"} />
    </div>
  );
}
