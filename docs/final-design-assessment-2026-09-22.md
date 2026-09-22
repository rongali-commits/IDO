# Noerong final design assessment

22 September 2026 · Local production preview · Publishing approval pending

## Curator verdict

The redesign makes Noerong legible as an independent design and development practice. Its opening now has a recognizable visual identity: oversized type, a warm neutral canvas, restrained vermilion, and an original interactive line sculpture. The project sequence demonstrates editorial web design, product interaction, and information hierarchy rather than relying only on a list of technologies.

The strongest improvement is the connection between appearance and explanation. Seatloom, FrameProof, Margin & Matter, and SignalRoom now have specific design narratives tied to their existing screenshots and workflows. Authorship, independent-project status, product limitations, and commercial terms remain explicit.

This is a qualitative curator assessment. No objective evidence establishes a worldwide percentile, and Contra Labs independently decides who advances through its portfolio, video, and evaluation process.

## What changed

- Rebuilt the homepage around a distinct design identity and four curated projects.
- Created a responsive parametric SVG sculpture with a keyboard-operable shape control.
- Added subtle content reveals with visible server-rendered fallbacks.
- Unified cover videos, artwork, and reveals under the site motion preference, retaining system reduced-motion support.
- Revised the archive, case-study, About, contact, writing, policy, navigation, and footer styling through shared components.
- Moved case-study buying options below the evidence while preserving exact prices, destinations, and limitations.
- Added 12 concrete design decisions across the four featured case studies.
- Created an original 1200 × 630 social image and updated default metadata.
- Reduced the visual weight of the floating assistant and added Escape/focus handling to the mobile menu.

## Issues caught and corrected in the review

| Issue | Correction |
| --- | --- |
| The SVG's intrinsic dimensions overruled the intended desktop height. | Positioned the SVG inside a constrained aspect-ratio canvas and reduced its maximum width. |
| The assistant launcher competed with the mobile content. | Changed it to a smaller, quiet 44px control with adequate target size. |
| Footer description and hover colors inherited old dark-background assumptions. | Corrected the actual winning selectors for readable text and hover contrast. |
| The services wrapper retained the previous white panel and inset alignment. | Removed the redundant panel and aligned the section to the common page grid. |
| The native mobile menu did not provide Escape closing with focus restoration. | Added a small isolated client component for that keyboard behavior. |
| Case-study offers displaced the design evidence near the top. | Placed the preserved offers in a dedicated later section. |
| Source files had redundant trailing blank lines. | Removed them; Git whitespace verification passes. |

## Verification evidence

The preview uses the native Next.js production build used by the repository's Vercel configuration, not a development-only mockup. Content pages are prerendered. The browser audit examines all 26 sitemap pages at 320, 390, 768, 1366, and 1920 CSS pixels. It checks one H1, document overflow, edge clipping of visible text/controls, and broken loaded images. HTTP checks independently cover all referenced local assets, including lazy media.

Recorded checks are listed in `outputs/design-review/responsive-audit.json`. Representative screenshots are saved beside it. Browser automation screenshots are viewport captures; the multi-scroll stitched capture was discarded because the capture mechanism duplicated sections.

| Check | Result |
| --- | --- |
| Native Vercel-compatible production build and TypeScript | Passed |
| ESLint | Passed |
| Existing assistant and project-brief regression suite | 11 passed |
| Sitemap pages | 26 passed |
| Internal page links and anchor destinations | 102 passed |
| Local image and source assets | 48 passed |
| Structured data and canonical URLs | 5 representative page types passed |
| Legacy permanent redirects | 2 passed |
| Custom 404 | Passed |
| Responsive layout sweep | 130 checks passed |
| Core palette: ink on paper | 14.44:1 |
| Core palette: secondary text on paper | 5.70:1 |
| Vermilion on paper | 4.57:1 |
| Footer accent on its background | 5.41:1 |
| Practice-section body text on dark background | 8.79:1 |

## Scope and practical limits

The underlying applications shown in the portfolio were not rebuilt or recertified during this task. Existing product demonstrations, videos, source-kit offers, and scope statements remain. Existing narrated walkthroughs that state “No subtitles” still lack captions. No client outcomes, testimonials, awards, or affiliation were invented.

No email, Contra message, purchase, paid AI request, GitHub push, Vercel deployment, or application submission was performed. Assistant UI and local regression behavior were checked; the production model-provider request was not invoked. The Vercel connector returned no teams in this session, so deployment/account state has not been independently verified through that connector. The GitHub remote, current main commit, and native Vercel build configuration were verified locally.

## Review and release

Preview: http://127.0.0.1:3022
Repository: https://github.com/rongali-commits/IDO
Local branch: design/contra-labs-2026-09-22
Baseline: e75a57ddb3c13e3ebbbd4395b97dab13efb9b498

The live domain is unchanged. Publishing requires the user's approval of this concrete revision. After approval, confirm the target branch and current production state, publish through the existing GitHub/Vercel setup, and verify the production domain and key routes.

## Final interaction review

- Mobile menu opens, navigates to Writing, closes with Escape, and restores focus to its summary control.
- The assistant opens within the 390px viewport (346px panel) and closes with Escape from its text field. No question was sent.
- The project brief renders the entered test content and a reviewable email link; nothing was submitted externally.
- The sculpture slider responds to arrow keys and both range endpoints. Its accessible value describes the selected openness.
- Site motion switches between paused and running. Emulated system reduced motion disables the sculpture animation and leaves reveal content visible. The temporary emulation was reset.
- Seatloom's cover video reached ready state 4, played successfully, and reported no media error.
- The final checked browser session reported no console errors.
- The corrected build was checked again at all five viewport widths: 130 checks, zero detected failures.

Representative captures: `outputs/design-review/home-desktop.png`, `home-mobile.png`, `selected-work-mobile.png`, `seatloom-desktop.png`, `design-rationale.png`, and `footer-desktop.png`.
Verified production build ID: `qyc45n7DZ8OK8wfpWcZzO`.
