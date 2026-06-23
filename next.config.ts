import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/posts/the-man-who-changed-8-billion-peoples-dna.html",
        destination: "/essays/the-man-who-changed-8-billion-peoples-dna",
        permanent: true,
      },
      {
        source: "/posts/the-man-who-changed-8-billion-peoples-dna",
        destination: "/essays/the-man-who-changed-8-billion-peoples-dna",
        permanent: true,
      },
      {
        source: "/posts/the-universe-is-not-a-coffee-mug.html",
        destination: "/essays/the-universe-is-not-a-coffee-mug",
        permanent: true,
      },
      {
        source: "/posts/the-universe-is-not-a-coffee-mug",
        destination: "/essays/the-universe-is-not-a-coffee-mug",
        permanent: true,
      },
      {
        source: "/posts/britishers-still-rule-the-world.html",
        destination: "/essays/britishers-still-rule-the-world",
        permanent: true,
      },
      {
        source: "/posts/britishers-still-rule-the-world",
        destination: "/essays/britishers-still-rule-the-world",
        permanent: true,
      },
      {
        source: "/posts",
        destination: "/essays",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: "base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
