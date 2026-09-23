# Studio and Midnight release review

## Appearance contract

- Studio is the default for a visitor with no saved appearance preference. Operating-system dark mode does not select Midnight.
- Midnight is enabled only by the Appearance control. The explicit choice persists through reloads and navigation.
- Switching back to Studio restores the original warm paper palette and graphite bot. Midnight retains the ceramic bot and original space artwork.
- Project media, content, links, and prices are unchanged by this release.

## Final pre-publication checks

- Native Next.js production build generated 33 routes successfully and passed TypeScript.
- Targeted ESLint passed for all changed TSX components and the root layout.
- Eleven assistant and project-brief tests passed. Provider responses in the unit tests are mocked, so they do not spend AI credits.
- All 27 sitemap pages, 111 internal links, 54 image/source assets, custom 404, two permanent redirects, structured metadata, and offer/brief checks passed against the final production-mode build.
- Sixty layout checks covered ten representative page layouts in both themes at 390 x 844, 820 x 1180, and 1440 x 900. Eighteen further checks covered the final readability fix at 320 x 740, 820 x 1180, and 1366 x 768.
- No horizontal page overflow, missing primary heading, broken loaded image, framework error overlay, or browser console error was found in those checks.
- Visual review covered the Studio and Midnight homepage, mobile menu, case study, writing archive, contact brief, chatbot, and footer.
- Midnight's bright planet initially reduced paragraph readability. The final build dims the art on reading pages and after the homepage hero leaves view. Verified the reading veil at 0.82 opacity while preserving the vivid hero.
- Contact brief generation was tested with synthetic input. The review state correctly said the brief had not been sent. No external message was submitted.
- Bot dragging, click-to-open, position persistence, session dismissal, footer restore, keyboard controls, greeting expansion, smile, wave, and symmetric resting arms were checked across the interaction review and final pass.
- Reduced-motion emulation stopped bot animation and background transitions. Emulation was reset after testing.
- Production dependency audit reported zero known vulnerabilities at review time. No unrelated forced dependency upgrades were made.
- Content punctuation and diff whitespace checks passed.

## Limits

These are browser viewport tests, not physical-device certification. The in-app browser does not support touch-event injection, so physical iOS/Android touch testing is not claimed. No accessibility certification or curator-ranking guarantee is implied.

The Vercel connector returned a team-scope 403. The established GitHub-to-Vercel deployment path and direct live-site verification are used for release confirmation. Vercel private runtime-log access is not claimed.
