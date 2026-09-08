import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function StudioDocument({ label, title, intro, children }: { label: string; title: string; intro: string; children: ReactNode }) {
  return <main><SiteHeader /><article className="studio-document shell"><header><p className="eyebrow">{label}</p><h1>{title}</h1><p className="document-intro">{intro}</p><p className="document-date">Updated 8 September 2026</p></header><div className="document-body">{children}</div></article><SiteFooter showProjectCta={false} /></main>;
}
