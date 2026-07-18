export const siteConfig = {
  name: "Noerong",
  title: "Noerong — Essays by Rongali Chaitanya",
  description:
    "Rongali Chaitanya's independent publication of long-form essays on history, science, philosophy, civilization, and human life.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://noerong.com",
  author: "Rongali Chaitanya",
  personalUrl: "https://www.rongalichaitanya.com",
  githubUrl: "https://github.com/rongali-commits",
  linkedinUrl: "https://www.linkedin.com/in/rongali-chaitanya-ba5746317",
  email: "hello@noerong.com",
};

export const topicDescriptions: Record<string, string> = {
  History: "The accidents, decisions, and people that still live inside the present.",
  Geopolitics: "Power after the flags move and the maps are redrawn.",
  Philosophy: "Old questions examined with modern tools and a healthy suspicion of easy answers.",
  Science: "Reality at scales our intuition was never built to understand.",
  "Human Nature": "The strange machinery behind how people think, choose, and become.",
};
