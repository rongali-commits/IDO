# Noerong v2

A production-ready long-form publication built with Next.js 15, TypeScript, MDX, and a custom editorial design.

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Publish a new essay

1. Duplicate one of the files in `content/essays/`.
2. Rename it to the URL slug you want, such as `why-intelligence-evolves.mdx`.
3. Update the frontmatter:

```yaml
---
title: "Why Intelligence Evolves"
description: "A one-sentence promise to the reader."
topic: "Human Nature"
date: "2026-06-20"
featured: false
accent: "coral" # coral, blue, or gold
---
```

4. Write the essay beneath the frontmatter using Markdown.
5. Commit and push. Vercel rebuilds the site automatically.

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Keep the detected Next.js defaults and deploy.
4. In **Project Settings → Domains**, add `noerong.com` and `www.noerong.com`.
5. Vercel will show the DNS records to add in Hostinger. Add those records in Hostinger's DNS Zone Editor and remove any old records that point to the previous host.
6. Set `NEXT_PUBLIC_SITE_URL=https://noerong.com` in Vercel's environment variables.

Your domain remains registered at Hostinger; only the web traffic points to Vercel.

## Newsletter

The subscription form is wired for [Buttondown](https://buttondown.email/). Create an account, copy its API key, and add this Vercel environment variable:

```text
BUTTONDOWN_API_KEY=your_key_here
```

Without that key, the site still builds and the form displays a clear configuration message instead of silently losing an address.

## Included

- Responsive editorial homepage
- MDX essay publishing
- Essay archive and topic collections
- Reading progress and automatic reading time
- Dark mode
- Newsletter endpoint
- SEO metadata, sitemap, robots.txt, and RSS
- Three migrated Noerong essays
- Generated original hero artwork

## Verification

```bash
pnpm typecheck
pnpm build
```
