# Noerong: final curator review

22 September 2026. Local production preview: http://127.0.0.1:3022/

## Verdict

Ready for the owner's publishing review. The second pass gives Noerong a more recognizable and expressive identity: a responsive line sculpture, individually composed project covers, original interactive motion studies, editorial typography, and the supplied color portrait. The portfolio demonstrates both design decisions and working interactions, with a direct path to real projects and contact.

The finish is coherent across the homepage and interior pages. No blocking layout, link, image, or interaction issues remain in the tested configurations. This is a qualitative portfolio assessment, not a worldwide percentile ranking or a prediction of Contra's admission decision.

## Delivered

- Replaced the portrait on Home and About with the exact supplied PNG. About Open Graph, Twitter, and Person metadata use it too. The source and copied asset have matching SHA-256 hashes; the grayscale filter is removed.
- Kept the original hero sculpture and added pointer perspective, registration axes, keyboard-adjustable geometry, and offscreen suspension.
- Added Flow, Orbit, and Fold: three original interactive studies with distinct geometry, depth, color, and typography. Native buttons and an intensity slider work with mouse, touch, and keyboard.
- Added project artboard lettering, edition marks, restrained perspective, and responsive framing.
- Added Play to desktop and mobile navigation. Section jumps remain immediate; the mobile menu closes after selection and supports Escape.
- Preserved the earlier case-study design narratives, real demos, project limitations, prices, writing, contact brief, and assistant.

The [reference study and design decisions](motion-direction-2026-09-22.md) document the inspiration from official studio websites and the original implementation.

## Issues caught and corrected

| Finding | Final correction |
| --- | --- |
| Grayscale portrait and older sharing references | Supplied color photo used consistently, without bitmap alteration |
| Artwork crossed its frame or nearby labels at extreme poses | All three studies fit their full projected geometry inside explicit safe drawing bounds |
| Canvas layout and CSS used different compact breakpoints | Both use the same 760px media query |
| Pausing restarted the composition | Elapsed time and pointer pose persist across pause/resume |
| Heavy drawing cost in the knot | 108 segments, at most 24 drawing frames per second, 1.5 pixel-density cap, and a batched grid stroke |
| Navigation timing competed with the experience | Immediate native navigation; motion concentrated within the artwork |
| Floating assistant could cover a studio control | Launcher steps out of view while the artboard is visible and returns outside it |
| Motion prompts still suggested pointer movement while paused | Paused prompt points to the working study and intensity controls |

## Verification

| Check | Result |
| --- | --- |
| Vercel production build and TypeScript | Passed; 32 generated routes |
| Content rules, ESLint, Git whitespace check | Passed |
| Existing assistant and project-brief regression tests | 11 passed |
| Sitemap and local links | 26 pages, 103 local links, zero failures |
| Image and video source assets | 48 checked, zero failures |
| Structured pages, redirects, offers and brief | 5 structured pages, 2 permanent redirects, passed |
| Responsive page matrix | 182 checks: all 26 pages at 320×740, 390×844, 768×1024, 1024×800, 1366×768, 1440×900, and 1920×1080 |
| Matrix findings | No horizontal document overflow, clipped text/controls, broken loaded images, or missing/duplicate primary headings |
| Motion controls near breakpoints | 30 checks: all 3 studies, both intensity endpoints, at widths 320, 740, 760, 761, and 1024; correct selected states and no overflow |
| Motion geometry | 11,475 sampled poses across 5 widths, 3 studies, 3 intensities, 51 times, and 5 pointer positions; no canvas, toolbar, or mobile-word overlap |
| Reduced motion | Emulated system preference produces a static hero and study, no hidden reveals, identical screenshot hashes across captures, and usable study/intensity controls |
| Final launcher correction | Homepage rechecked at all 7 sizes with motion enabled: Play target visible, menu closes, controls retain 44px CSS touch height, launcher hidden during the study |
| Browser runtime | No application console errors observed in the final preview |

The 182-page matrix and 30-control sweep ran on build `RnhqWC9419myCgpl-RyCE`. The final launcher-only correction was built as `QD-9H3-LwU4z-8-u42-rz`; the seven-size homepage follow-up and HTTP/link/asset/metadata checks passed on that build. The geometry sweep was an inline diagnostic against the drawing functions, including transformed paths and stroke widths.

## Review evidence

Local screenshots and audit JSON are in `outputs/design-review/`, including:

- `home-mobile-final.png`
- `about-color-mobile.png`
- `motion-flow-desktop.png`
- `motion-orbit-desktop.png`
- `motion-fold-desktop.png`
- `motion-mobile-final.png`
- `motion-tablet-740.png`
- `second-pass-responsive-audit.json`
- `motion-controls-audit.json`
- `final-home-audit.json`

Responsive verification used browser viewport emulation, including tablet portrait/landscape and laptop sizes. Physical devices and every browser engine were not available. Existing narrated project videos retain their previous caption limitations; the redesign does not create new narration. No live paid AI request, purchase, outreach, or production deployment was performed.

## Publication state

All work is local on branch `design/contra-labs-2026-09-22`. The production website is unchanged. Publishing awaits explicit owner approval.
