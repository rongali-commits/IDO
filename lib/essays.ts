import readingTime from "reading-time";
import { parse as parseYaml } from "yaml";
import worldWarSource from "@/content/essays/would-i-exist-without-world-war-ii.mdx?raw";
import universeSource from "@/content/essays/the-universe-is-not-a-coffee-mug.mdx?raw";
import empireSource from "@/content/essays/the-british-empire-didnt-vanish-it-became-background-noise.mdx?raw";

const essaySources: Record<string, string> = {
  "would-i-exist-without-world-war-ii": worldWarSource,
  "the-universe-is-not-a-coffee-mug": universeSource,
  "the-british-empire-didnt-vanish-it-became-background-noise": empireSource,
};

const essayCache = new Map<string, Essay>();

export type Essay = {
  slug: string;
  title: string;
  description: string;
  topic: string;
  date: string;
  coverImage: string;
  coverAlt: string;
  readTime: string;
  content: string;
};

export function getEssaySlugs() {
  return Object.keys(essaySources);
}

export function getEssay(slug: string): Essay {
  const cached = essayCache.get(slug);
  if (cached) return cached;
  const source = essaySources[slug];
  if (!source) throw new Error(`Unknown essay: ${slug}`);
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Invalid essay frontmatter: ${slug}`);
  const data = parseYaml(match[1]) as Record<string, unknown>;
  const content = match[2];
  const essay = {
    slug,
    title: String(data.title),
    description: String(data.description),
    topic: String(data.topic),
    date: String(data.date),
    coverImage: String(data.coverImage),
    coverAlt: String(data.coverAlt || data.title),
    readTime: readingTime(content).text.replace("min read", "minute read"),
    content,
  };
  essayCache.set(slug, essay);
  return essay;
}

export function getAllEssays() {
  return getEssaySlugs().map(getEssay).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(date));
}
