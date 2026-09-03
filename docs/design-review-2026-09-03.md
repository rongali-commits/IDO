# Noerong visual and usability review

## Scope

Review from the perspective of a prospective buyer or portfolio reviewer, not an official Contra assessment. Home, archive, all ten case studies, About, Contact, writing archive, three essays, and missing-page recovery.

## Strengths preserved

- Distinctive paper, ink, and olive identity, expressive typography, and consistent editorial tone.
- Real product screens, sharp motion covers, complete case-study galleries, and the founder portrait.
- Clear separation between downloadable source kits and implementation services.
- Explicit independent-project attribution and implementation boundaries rather than unverified client results.
- Product URLs, contact destinations, case-study text, prices, and HD source assets are unchanged.

## Issues corrected

1. Process headings were pushed down by an automatic margin inside fixed-height cards. Number-to-heading spacing is now 32px on larger layouts and 24px on phones, instead of approximately 121px at the tested desktop width.
2. The home hero combined a minimum height, space-between alignment, and large heading margins. It now follows its content with controlled responsive gaps; the introduction has a wider, less fragmented reading measure.
3. The fixed motion control and image status badge obscured content. Playback control now sits in the header; product status sits beside the product title, outside the artwork.
4. Long names overflowed narrow case-study and selected-work layouts. Responsive type sizing and zero-minimum grid tracks keep text within the viewport.
5. Framework image-fill defaults could override stylesheet-only contain behavior. Project posters now explicitly use contain, preserving the complete image on both publishing targets.
6. Alternating full-width archive cards created oversized, slow-to-scan panels. A consistent two-column desktop / one-column mobile archive keeps all artwork visible and makes comparison easier.
7. Related sections and feature cards had excessively stacked gaps. Spacing now follows a more consistent rhythm while retaining intentional breathing room.
8. Small olive labels measured approximately 3.29:1 contrast on paper. Their separate text color measures approximately 5.21:1; the original large olive display type is retained.
9. Motion buttons lacked an explicit keyboard focus style, and the skip link targeted a wrapper before navigation. Focus styling and the skip destination are corrected.
10. Missing URLs now have a branded 404 page with a clear return to the project archive.
11. A second-pass review found that the Essays introduction occupied too much of a common laptop viewport before revealing the work. Its scale and vertical rhythm are now tighter on desktop, tablet, and phone while retaining the editorial character.
12. The transition from the founder note into the homepage writing section has a shorter, more deliberate pause. The writing introduction now clearly presents essays as the founder's personal passion for unconventional topics and different perspectives, separate from client services.

## Verification

- Browser layout sweep: 18 content routes at five requested viewport widths (320, 390, 768, 1024, 1440px), 90 combinations. Browser scrollbar reduces the actual content viewport by 15px in the test fixture. No detected horizontal overflow, missing headings, or broken loaded images after fixes. All project posters reported contain.
- Manual visual inspection: desktop home/process, project archive, About portrait, Contact, writing archive, case-study gallery, mobile project introduction, and the revised writing sections at laptop, tablet, and phone widths.
- Real browser interaction: motion pause state and accessible label changed correctly; mobile navigation expanded; Projects opened the archive; a project title opened its full case study.
- Read-only route/link check: 18 pages, 43 unique local links, 26 image/source references, and branded HTTP 404 recovery passed locally.
- Repeatable network check: `node scripts/check-site.mjs http://localhost:3000` (or the deployed origin).
- Responsive fixture retained under scripts, not public assets. It is not part of the published site.

## Limits

This is a visual, responsive, content-structure, and navigation review. It is not a guarantee of Contra acceptance, real-user performance on every device, or third-party checkout availability. No payment, enquiry, order, or review was submitted during testing.
