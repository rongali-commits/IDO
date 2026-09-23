# Noerong Bot interaction preview

Interaction checks for the approved release. See `studio-midnight-release-qa-2026-09-23.md` for the final pre-publication review.

## Interaction contract

- Tap or click opens chat. A movement threshold separates clicking from dragging.
- Mouse and touch share Pointer Events. Only the primary pointer initiates a drag.
- The bot stays inside the viewport. Its saved position is proportional, so resizing does not strand it offscreen.
- Dragging shows an X/remove target. Releasing there hides the bot for the current tab session.
- The footer provides Add bot / Remove bot on every page. Dismissal and position persist through full-page navigation and refresh using session storage.
- Arrow keys reposition the focused bot. Shift increases the step. Delete hides it. Escape cancels an active drag. Enter opens chat.
- The chat panel remains in its readable corner position and stacks above the movable mascot.
- Both resting arms use mirrored geometry with equal body gaps. Greeting animation ends with the waving arm returned to that symmetric position. Reduced-motion preferences continue to disable the greeting and idle animation.
- Assistant prompts refer to Rongali.

## Browser checks

- Laptop mouse drag repositions the bot without opening chat.
- Click after a drag opens the chat with the updated prompt.
- Position survives navigation from Home to About.
- Footer removal persists through Privacy navigation and reload.
- Footer restoration returns the bot.
- Dropping on the X target removes the bot.
- Keyboard movement, opening, and deletion work.
- Phone (390 x 844) and tablet (820 x 1180) layouts have no horizontal overflow and keep the bot within bounds.
- No browser errors were recorded during these checks.
- Production build, TypeScript, targeted ESLint, and diff whitespace checks passed.
- Greeting expansion was observed in a 551px-high preview, with an animated scale of 2.95 en route to 3.15.

The in-app browser does not support touch-event injection. Pointer handling was checked with mouse input and narrow viewports; physical-device touch testing remains advisable before a production release.
