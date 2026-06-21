import type { Metadata } from "next";

export const metadata: Metadata = { title: "Now", description: "What Noerong is currently researching and thinking about.", alternates: { canonical: "/now" } };

export default function NowPage() {
  return <main className="page-main shell"><header className="page-header"><p className="eyebrow">Updated June 2026</p><h1>Now</h1><p>A public notebook of the questions currently circling Noerong.</p></header><div className="now-grid"><section><span>01</span><h2>Researching</h2><p>How old institutions remain present inside modern systems long after their original names and flags disappear.</p></section><section><span>02</span><h2>Reading</h2><p>Across the history of science, state power, genetics, and the limits of human intuition.</p></section><section><span>03</span><h2>Building</h2><p>A slower publication: clear sourcing, careful arguments, and a useful archive rather than a content treadmill.</p></section></div></main>;
}
