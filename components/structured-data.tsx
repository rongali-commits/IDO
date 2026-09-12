type StructuredDataProps = { data: Record<string, unknown> | Record<string, unknown>[] };

/** Server-rendered, escaped JSON-LD. Never include private or inferred claims. */
export function StructuredData({ data }: StructuredDataProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function breadcrumbData(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name,
      item: `https://noerong.com${item.path}`,
    })),
  };
}
