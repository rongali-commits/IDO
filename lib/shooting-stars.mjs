// Sparse, deterministic paths: one 3.6-second pass, then 4.4 seconds of quiet.
// Coordinates are viewport fractions. Canvas y decreases toward the top.
const paths = [
  [-0.12, 1.02, 1.12, 0.12],
  [-0.16, 0.78, 1.08, -0.12],
  [0.03, 1.14, 1.14, 0.08],
];

export function shootingStarAt(time, width, height) {
  if (time < 2 || width <= 0 || height <= 0) return null;
  const elapsed = time - 2;
  const cycle = Math.floor(elapsed / 8);
  const age = elapsed % 8;
  if (age >= 3.6) return null;
  const progress = age / 3.6;
  const [startX, startY, endX, endY] = paths[cycle % paths.length];
  const dx = (endX - startX) * width;
  const dy = (endY - startY) * height;
  const distance = Math.hypot(dx, dy);
  // Fade in and out without a sudden flash or a visible reset.
  const envelope = Math.min(1, age / 0.35, (3.6 - age) / 0.5);
  return {
    x: startX * width + dx * progress,
    y: startY * height + dy * progress,
    directionX: dx / distance,
    directionY: dy / distance,
    trail: Math.min(160, width * 0.19),
    opacity: Math.max(0, envelope) * 0.92,
  };
}
