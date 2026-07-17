# Noerong

[Live publication](https://noerong.com) · [Editorial policy](https://noerong.com/editorial-policy) · [RSS feed](https://noerong.com/feed.xml)

Noerong is an independent long-form publication for essays on history, science, philosophy, geopolitics, and the hidden systems shaping ordinary life. This repository contains the complete editorial website and publishing workflow.

![Noerong editorial homepage](public/images/noerong-hero.webp)

## What this project demonstrates

- a production Next.js publishing platform with TypeScript;
- MDX-based essays with front matter and reusable editorial components;
- topic archives, essay indexes, reading lists, and structured navigation;
- generated Open Graph and X images for the publication and individual essays;
- RSS, sitemap, robots, manifest, and SEO metadata;
- reading progress, theme controls, responsive navigation, and accessible long-form typography;
- editorial-policy, privacy, newsletter, now, and about surfaces.

## Architecture

```text
content/essays/*.mdx
        ↓
front-matter parsing + essay utilities
        ↓
Next.js App Router pages and topic indexes
        ↓
SEO / RSS / social cards / production deployment
```

## Stack

| Layer | Implementation |
| --- | --- |
| Framework | Next.js 15, React 19, TypeScript |
| Content | MDX, gray-matter, remark-gfm |
| Design | Tailwind CSS, Typography plugin, custom editorial CSS |
| Publishing | RSS, dynamic metadata, sitemap, social-image routes |
| Deployment | Production site at [noerong.com](https://noerong.com) |

## Local development

Requires Node.js 20 or newer and pnpm.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Verification:

```bash
pnpm typecheck
pnpm build
```

## Essay workflow

Essays live in `content/essays/` as MDX files. Each document supplies the publication metadata used by article pages, archives, feeds, and social cards. Shared editorial components keep citations, images, callouts, and long-form typography consistent.

## Repository structure

```text
app/               routes, metadata, feeds, and social cards
components/        editorial and navigation components
content/essays/    published MDX essays
lib/               content loading and site configuration
public/            publication imagery, icons, and manifest
```

## Rights

The website source code is available under the MIT License. Noerong essays, brand assets, and original editorial imagery remain © Rongali Chaitanya unless a page states otherwise.

