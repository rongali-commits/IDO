export function EssayCover({ accent, compact = false }: { accent: "coral" | "blue" | "gold"; compact?: boolean }) {
  return (
    <div className={`essay-cover cover-${accent} ${compact ? "cover-compact" : ""}`} aria-hidden="true">
      <span className="cover-orbit orbit-one" />
      <span className="cover-orbit orbit-two" />
      <span className="cover-dot dot-one" />
      <span className="cover-dot dot-two" />
      <span className="cover-line" />
      <span className="cover-figure">●</span>
    </div>
  );
}
