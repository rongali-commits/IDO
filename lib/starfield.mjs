/** Stable points, varied brightness, and independent slow scintillation. */
export function createStarfield() {
  let seed = 20260924;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  return Array.from({ length: 900 }, () => {
    const x = random(), y = random(), bright = random() > .91;
    return { x, y, bright, r: bright ? 1.05 + random() * .6 : .3 + random() ** 2 * .65,
      phase: random() * Math.PI * 2, depth: .2 + random() * .8,
      rate: .45 + random() * .45, warm: random() > .82 };
  });
}
export function starCount(width, height) {
  return Math.max(300, Math.min(900, Math.round(width * height * .00065)));
}
export function starAlpha(star, time, quiet = 1) {
  const pulse = Math.sin(time * star.rate + star.phase) * .15
    + Math.sin(time * star.rate * .47 + star.phase * 2) * .06;
  return ((star.bright ? .7 : .5) + pulse) * quiet;
}
