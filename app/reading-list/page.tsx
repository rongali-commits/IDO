import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading List",
  description: "Books and intellectual influences behind Noerong and Rongali Chaitanya's essays.",
  alternates: { canonical: "/reading-list" },
};

const shelves = [
  { title: "How knowledge changes", books: [["The Structure of Scientific Revolutions", "Thomas S. Kuhn"], ["The Beginning of Infinity", "David Deutsch"]] },
  { title: "Power, states, and civilization", books: [["Seeing Like a State", "James C. Scott"], ["The Silk Roads", "Peter Frankopan"]] },
  { title: "The machinery of human judgment", books: [["Thinking, Fast and Slow", "Daniel Kahneman"], ["The Righteous Mind", "Jonathan Haidt"]] },
];

export default function ReadingListPage() {
  return <main className="page-main shell"><header className="page-header"><p className="eyebrow">A working shelf</p><h1>Reading List</h1><p>Books that sharpen questions, complicate easy stories, and influence how Noerong approaches the world.</p></header><div className="resource-grid">{shelves.map((shelf) => <section className="resource-card" key={shelf.title}><h2>{shelf.title}</h2><ul>{shelf.books.map(([book, author]) => <li key={book}><strong>{book}</strong><span>{author}</span></li>)}</ul></section>)}</div></main>;
}
