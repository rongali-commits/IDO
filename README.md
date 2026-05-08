# Noerong

**Big Ideas. Vivid Thinking.**

The personal essay site of Sai R — writing on history, anthropology, geopolitics, philosophy, and the quiet forces that shape who we are.

---

## File structure

```
noerong/
├── index.html              ← Homepage
├── essays.html             ← Archive with category filters
├── about.html              ← About page
├── contact.html            ← Contact page
├── css/
│   └── style.css           ← All styling
├── posts/
│   ├── the-man-who-changed-8-billion-peoples-dna.html
│   ├── britishers-still-rule-the-world.html
│   └── the-universe-is-not-a-coffee-mug.html
├── images/                 ← For future article images
├── .gitignore
└── README.md
```

---

## How to publish a new essay

1. **Copy** any existing post in `/posts/` as a template
2. **Rename** the file: `your-essay-slug.html` (lowercase, hyphens, no spaces)
3. **Edit** these things in the new file:
   - `<title>` tag in the `<head>`
   - All `<meta>` description tags
   - The article meta line (category, read time)
   - The `<h1>` title
   - The `<p class="article-subtitle">` subtitle
   - The article body content
   - The closing line in `<p class="article-closing">`
4. **Add** the essay card to `index.html` (top of the essays list)
5. **Add** the essay card to `essays.html` with the correct `data-category` attribute
6. **Commit and push:**
   ```bash
   git add .
   git commit -m "Published: [Essay Title]"
   git push
   ```
7. Hostinger auto-deploys in 30–60 seconds.

---

## Categories supported

Each essay card uses a `data-category` attribute that matches the filter buttons on the essays page:

- History
- Geopolitics
- Philosophy
- Anthropology
- Science
- What If

To add a new category: update both the filter button list in `essays.html` and add the category to a new essay card.

---

## Design tokens (in case you want to tweak)

Edit `css/style.css`:

- `--bg: #0e0e14` — page background
- `--text: #ece7da` — body text
- `--accent: #c9a84c` — gold/amber accent
- `--serif: 'Cormorant Garamond'` — heading font
- `--sans: 'Inter'` — body font

---

© 2026 Sai R · noerong.com
