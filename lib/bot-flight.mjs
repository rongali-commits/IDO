const bounded = (value, limit) => Math.max(-limit, Math.min(limit, value));

/** Time-based easing without overshoot. Transient pose stays outside React state. */
export function advanceFlight(current, target, seconds, travelling = true, reduced = false) {
  if (reduced) return { x: target.x, y: target.y, bank: 0, yaw: 0, pitch: 0 };
  const dt = Math.max(0, Math.min(seconds, .05));
  const follow = 1 - Math.exp(-dt / .055);
  const turn = 1 - Math.exp(-dt / .09);
  const dx = target.x - current.x, dy = target.y - current.y;
  return {
    x: current.x + dx * follow,
    y: current.y + dy * follow,
    bank: current.bank + ((travelling ? bounded(dx * .55, 23) : 0) - current.bank) * turn,
    yaw: current.yaw + ((travelling ? bounded(dx * .7, 27) : 0) - current.yaw) * turn,
    pitch: current.pitch + ((travelling ? bounded(-dy * .5, 18) : 0) - current.pitch) * turn,
  };
}

export function flightAtRest(current, target) {
  return Math.hypot(target.x - current.x, target.y - current.y) < .1
    && Math.max(Math.abs(current.bank), Math.abs(current.yaw), Math.abs(current.pitch)) < .1;
}
