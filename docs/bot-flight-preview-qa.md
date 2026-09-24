# Bot flight and Midnight motion preview

Date: 2026-09-24
Status: local review only, not published.
Preview: http://localhost:3036/?bot-preview=1
Production build directory: `.next-space-flight-final`.

## Changes

- Both robot flippers now use the same mirrored shape, socket height, depth plane, and shoulder pivot. The greeting has three smaller wave gestures and returns both arms to rest.
- Pointer movement uses time-based frame easing. The bot banks, turns, and pitches toward its travel direction, then settles upright. Transient animation updates are held in refs rather than React state.
- Midnight has an adaptive 300-900 star field with independent, smooth brightness variation and warm/cool points. Bright stars are a small subset. Studio remains the default appearance.
- Saturn completes a surface rotation in 72 seconds rather than 240 seconds. The moon completes one in 90 seconds rather than approximately 35 minutes. Both also drift more noticeably. Existing sparse shooting stars remain.
- Reduced motion and the site's Motion Off control disable the decorative movement and directional tilt. Background rendering still stops when hidden and uses lower update rates while reading.

## Verification

- Production Next.js build and TypeScript checks passed.
- Targeted ESLint check passed for all four changed TypeScript components.
- 18 Node tests passed: assistant boundaries, project brief, shooting stars, flight convergence/direction/reduced motion, and star density/brightness.
- Full local site check: 27 pages, 111 internal links, 54 image/source assets, zero failures. Branded 404 checked.
- Profile-polish check: five structured pages, two permanent redirects, offer and brief checks passed.
- Browser layout inspection: all 27 pages at 390x844, 820x1180, and 1366x768. No horizontal overflow; one primary heading per page. One early bot check ran before client mount; explicit visible-state recheck passed.
- Studio cross-check: home, projects, about, contact, and essays at all three sizes. No overflow and bot remains inside viewport after resizing.
- Visual inspection: Studio and Midnight home, mobile article, tablet project page, mobile chat, and expanded welcome. Matched shoulder pivots verified; wave returns both arms to rest.
- Mouse drag tested in both directions, with visible 3D banking during travel and upright settling on release. Click-to-chat still works. Keyboard repositioning, Delete-to-hide, footer restore, drag-to-remove, and cross-page hidden state verified.
- Emulated prefers-reduced-motion verified: no flight tilt, direct following, paused star/planet scene, and no shooting stars. Motion Off/On controls verified separately.
- Browser warning/error logs were empty after the route checks.
- No files were committed, pushed, or deployed for this preview.

## Verification limits

- Responsive sizes were emulated in the in-app browser, not tested on physical devices. Native touch injection is not supported by this browser. Small-screen mouse/pointer dragging and `touch-action: none` were checked, but a physical touch-device test remains useful.
- No live AI request, checkout, or contact message was sent. Those integrations were outside this visual-motion change; assistant regression tests passed.
- No claim of real-device frame-rate benchmarks or a complete accessibility audit is made.
