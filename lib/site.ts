export const siteConfig = {
  name: "Noerong",
  title: "Noerong — Big questions, carefully explored",
  description:
    "Long-form essays about history, science, civilization, philosophy, and the hidden forces that shape human life.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://noerong.com",
  author: "Rongali Chaitanya",
  email: "hello@noerong.com",
};

export const topicDescriptions: Record<string, string> = {
  History: "The accidents, decisions, and people that still live inside the present.",
  Geopolitics: "Power after the flags move and the maps are redrawn.",
  Philosophy: "Old questions examined with modern tools and a healthy suspicion of easy answers.",
  Science: "Reality at scales our intuition was never built to understand.",
  "Human Nature": "The strange machinery behind how people think, choose, and become.",
};
