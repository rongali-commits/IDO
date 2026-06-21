import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const ESSAYS_DIR = path.join(process.cwd(), "content", "essays");

export type Essay = {
  slug: string;
  title: string;
  description: string;
  topic: string;
  date: string;
  updated: string;
  featured: boolean;
  accent: "coral" | "blue" | "gold";
  readTime: string;
  wordCount: number;
  content: string;
};

export function getEssaySlugs() {
  return fs.readdirSync(ESSAYS_DIR).filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
}

export function getEssay(slug: string): Essay {
  const raw = fs.readFileSync(path.join(ESSAYS_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const readingStats = readingTime(content);
  return {
    slug,
    title: data.title,
    description: data.description,
    topic: data.topic,
    date: data.date,
    updated: data.updated || data.date,
    featured: Boolean(data.featured),
    accent: data.accent || "coral",
    readTime: readingStats.text.replace("min read", "minute read"),
    wordCount: readingStats.words,
    content,
  };
}

export function getAllEssays() {
  return getEssaySlugs()
    .map(getEssay)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(date));
}
