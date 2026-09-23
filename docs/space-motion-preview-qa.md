# Midnight motion preview QA

Date: 2026-09-23. Local preview: http://localhost:3033/. No production deployment was performed.

## Changes

- Dependency-free, lazily loaded WebGL planet scene with original generated cloud and lunar textures.
- Four-minute axial cloud rotation, independent subtle planetary drift, and depth-scaled star drift.
- Fixed lighting, foreground/background ring occlusion, and preserved static poster fallback.
- Studio default preserved. Midnight is an explicit visitor choice.
- Reduced motion, site Motion off, theme inactivity, and tab visibility stop animation updates.
- The reading veil is re-evaluated after route navigation. Mobile positioning protects the title and introductory text.

## Evidence

- Final production build and TypeScript completed successfully.
- Targeted ESLint and git diff whitespace checks passed.
- Site checker: 27 pages, 111 internal links, 54 existing image/source assets, zero failures.
- Profile checker: five structured pages, two permanent redirects, offer and brief checks passed.
- All 11 assistant/brief unit tests passed.
- Browser viewport reviews: 390 x 844 phone, 820 x 1180 tablet, 1366 x 768 laptop, 1440 x 900 desktop. No horizontal overflow observed.
- The mobile moon position was refined once more, rebuilt and visually rechecked at 390 x 844.
- Fresh-origin Studio reported animation paused with no planet renderer initialized. Switching to Midnight reported both textures ready and animation running.
- Two screenshots with site motion paused were byte-identical. Screenshots after resuming motion differed.
- Emulated prefers-reduced-motion reported animation paused. Emulation was cleared afterwards.
- About navigation reported reading=true, no broken loaded images, no console warnings/errors. Returning home restored the vivid hero scene.
- Switching back to Studio paused the scene. Preview was left in Midnight for review, with temporary viewport overrides reset.

## Boundaries

Responsive verification used browser viewport emulation, not physical phones or tablets. Unsupported-WebGL and context-loss fallbacks are implemented and code-reviewed, not fault-injected. Frame-rate limits are implementation caps, not a claim of measured performance on every device. The generated planetary surfaces are artistic, not scientific imagery.

## Shooting-star refinement

Updated local preview: http://localhost:3034/. Still unpublished.

- One bright, cool-white streak at a time, travelling bottom-left to top-right behind the planet layer. Each pass lasts 3.6 seconds in an eight-second cycle.
- Three alternating paths, a soft fading trail, and deliberate quiet gaps. Existing slow planet and star drift speeds are preserved.
- Three deterministic trajectory/timing tests, targeted ESLint, TypeScript, and the production build passed.
- Repeated site checker on this build: 27 pages, 111 internal links, 54 image/source assets, zero failures.
- Desktop, 820 x 1180 tablet, and 390 x 844 phone browser reviews passed without horizontal overflow. A desktop screenshot confirmed the visible glowing streak.
- Site Motion off and emulated reduced motion both reported paused animation and zero shooting stars. Motion was restored and media emulation cleared after testing.
- Fresh Studio remained paused without initializing the planet renderer. Midnight loaded both textures and enabled the new effect. Console warnings/errors were empty during the check.
- Temporary viewport overrides were reset and the updated Midnight preview was left open for review.
