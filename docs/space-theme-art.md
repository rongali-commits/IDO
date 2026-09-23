# Midnight space artwork

Original artwork generated with the built-in image-generation tool on 2026-09-23.

Prompt: Dark premium space website background with near-black #050a13 negative space across left 55%, muted icy-blue Saturn-like planet and silver rings upper right, smaller cratered crescent moon lower right, tiny distant planet, restrained realistic cinematic texture, sparse stars, no bright nebula, text, logos, or UI.

Project asset: `public/noerong-space-2026.webp` (1672 x 941, 35,138 bytes). Source PNG is retained at `../output/imagegen/premium-space-background-20260923.png`. WebP conversion preserves the composition.

Only the Midnight palette uses this artwork. The decorative canvas adds slowly drifting stars, stops when the theme is inactive or tab hidden, and respects reduced motion and the existing site animation control. The Studio palette and original project imagery are unchanged.

Final readability refinement: a dark veil quiets the artwork on interior pages and after the homepage hero scrolls away. An IntersectionObserver controls the homepage transition without a per-scroll React render. This keeps the planet from competing with paragraph text.
