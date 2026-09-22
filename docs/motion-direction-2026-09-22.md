# Noerong: second design pass

22 September 2026. Local work only; publishing requires the owner's approval.

## Reference study

The references informed principles, not copied layouts or assets.

- [Lusion](https://lusion.co/): inspected its current live homepage visually and through its page structure. A large dimensional composition establishes craft; plain navigation and featured projects still provide a direct path through the work. Noerong borrows the principle of showing interactive capability through an original signature object.
- [Studio Freight](https://studiofreight.com/work/studio-freight): inspected the live case study, including its moving identity and account of a bespoke visual language. Noerong uses a related family of contour, ribbon, knot, and folded forms to create continuity through the experience.
- [Unseen](https://unseen.co/): researched its live page content and exploratory interaction prompts. The transferable principle is an invitation to participate, supported by ordinary project navigation. Its animation was not visually verified in this review.
- [Active Theory XR](https://xr.activetheory.net/): researched its official experiment collection as a precedent for showing technical craft through small interactive studies. No assets or code were reused.

## The design decisions

1. **Keep the liked hero and deepen it.** The original vermilion sculpture gains pointer-responsive perspective and fine registration axes. Its native slider still changes the geometry. It stops when outside the viewport or in a hidden tab.
2. **Give each project an artboard.** Large background lettering, individual paper colors, a small edition marker, gentle perspective, and deliberate screenshot framing give the work a more authored presentation. Mobile preserves straight, fully readable screenshots.
3. **Introduce a motion studio.** Flow, Orbit, and Fold are original mathematical compositions, rendered locally in Canvas. Their forms differ substantially: pleated coral ribbons, a shaded knot, and sage folded planes. Every mode and intensity can be changed using native controls; pointer and touch add another dimension. They are explicitly studio studies, not fictional client projects.
4. **Make the portrait personal and accurate.** The supplied PNG is copied without bitmap changes. Its SHA-256 matches the source. Both visible portraits, About social metadata, and Person structured data reference this same color photo. No grayscale filter remains.
5. **Connect the details.** Typography arrives gently, while project covers respond with restrained perspective. Native navigation and anchor jumps remain immediate, keeping the motion concentrated in the artwork.

## Interaction and performance boundaries

- No custom cursor, scroll hijacking, mandatory loader, autoplay audio, or new animation dependency.
- Canvas animation renders at up to 24 fps, caps pixel density at 1.5, and stops offscreen, in hidden tabs, and when paused. A static SVG remains if Canvas is unavailable.
- The motion toggle is shared across the hero, studies, video covers, and reveals. System reduced-motion is the default; an explicit saved user preference persists.
- Touch scrolling remains native. Study buttons and sliders provide alternatives to pointer movement.
- User approval is required before pushing or publishing a deployment.

Final device and interaction results are recorded separately after testing the production build.
