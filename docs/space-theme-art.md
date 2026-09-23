# Midnight space artwork

Original artwork generated with the built-in image-generation tool on 2026-09-23.

Prompt: Dark premium space website background with near-black #050a13 negative space across left 55%, muted icy-blue Saturn-like planet and silver rings upper right, smaller cratered crescent moon lower right, tiny distant planet, restrained realistic cinematic texture, sparse stars, no bright nebula, text, logos, or UI.

Project asset: `public/noerong-space-2026.webp` (1672 x 941, 35,138 bytes). Source PNG is retained at `../output/imagegen/premium-space-background-20260923.png`. WebP conversion preserves the composition.

Only the Midnight palette uses this artwork. The decorative canvas adds slowly drifting stars, stops when the theme is inactive or tab hidden, and respects reduced motion and the existing site animation control. The Studio palette and original project imagery are unchanged.

Final readability refinement: a dark veil quiets the artwork on interior pages and after the homepage hero scrolls away. An IntersectionObserver controls the homepage transition without a per-scroll React render. This keeps the planet from competing with paragraph text.

## Animated Midnight preview (2026-09-23)

The original poster is retained as the loading and unsupported-WebGL fallback. In Midnight, a lazy-loaded native WebGL renderer replaces it only after both textures are ready. This is a real spherical surface, not a rotated background photograph. The Saturn-like planet rotates once every 240 seconds with fixed lighting and correctly occluded rings. Planets drift independently along small periodic paths. The star field retains its independent, depth-scaled drift.

Original generated, evenly lit equirectangular texture assets:

- `public/saturn-clouds-2026.webp`: 2048 x 1024, 191,976 bytes. Icy-blue gas-giant atmospheric cloud bands, generated specifically for a spherical map.
- `public/lunar-surface-2026.webp`: 1024 x 512, 161,032 bytes. Cratered lunar terrain, generated specifically for a spherical map.

These are artistic planets, not scientific planetary imagery. Both source PNGs remain in the tool's generated-images directory. Only loss-aware resize/WebP format conversion was applied after generation.

The renderer has no external dependencies, no pointer handlers, and no layout impact. It caps planet rendering at 25fps in the hero and 12.5fps behind the reading veil, caps the WebGL canvas width at 1600 pixels, and stops updates in Studio, in hidden tabs, under reduced motion, or when site motion is paused. Route changes dispose GPU resources and re-evaluate the reading veil. Phones place the main planet lower to protect headline readability. A lost graphics context restores the original poster.

### Sparse shooting stars

The Midnight preview adds a single bright, cool-white shooting star every eight seconds. Each pass lasts 3.6 seconds and travels from bottom-left to top-right, with a short glowing blue-white trail and smooth fade-in/out. Three deterministic paths alternate. The star canvas is composited below the planet canvas, so Saturn and the moon occlude the streaks. They are disabled for the flattened-poster fallback, reduced motion, and site Motion off.

The lightweight star layer refreshes up to approximately 60fps in the hero for smooth fast motion; the planet renderer keeps its lower independent cap. Trail length scales down on phones. No video, additional image, dependency, or network request is needed for the shooting stars. Geometry and timing are covered by `scripts/shooting-stars.test.mjs`.

This addition is local-only until separately approved for publication.
