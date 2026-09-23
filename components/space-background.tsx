"use client";

import { useEffect, useRef } from "react";

/** Decorative particle field. No downloads, pointer capture, or layout shift. */
export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;
    const root = document.documentElement;
    const scene = canvas.parentElement;
    const hero = document.querySelector(".design-hero-stage");
    // Keep the artwork vivid in the hero, then quiet it behind readable content.
    const readingObserver = new IntersectionObserver(([entry]) => {
      if (scene) scene.dataset.reading = String(entry.intersectionRatio < .45);
    }, { threshold: [0, .45] });
    if (hero) readingObserver.observe(hero);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = 0;
    let time = 0;
    let width = 0;
    let height = 0;
    let seed = 20260923;
    const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const stars = Array.from({ length: 260 }, () => ({ x: random(), y: random(), r: .35 + random() ** 3 * 1.5, phase: random() * Math.PI * 2, depth: .2 + random() * .8 }));
    const enabled = () => root.dataset.appearance === "midnight" && !document.hidden;
    const animated = () => !reduced.matches && root.dataset.motion !== "paused";
    const draw = () => {
      context.clearRect(0, 0, width, height);
      const count = width < 600 ? 100 : stars.length;
      for (const star of stars.slice(0, count)) {
        const x = (star.x * width + time * star.depth * 1.3) % width;
        const y = (star.y * height - time * star.depth * .6 + height) % height;
        // Quiet left-hand reading area; a richer field around the hero artwork.
        const quiet = x < width * .48 ? .45 : 1;
        const alpha = (.45 + Math.sin(time * .22 + star.phase) * .16) * quiet;
        if (star.r > 1.2) {
          const glow = context.createRadialGradient(x, y, 0, x, y, star.r * 5);
          glow.addColorStop(0, `rgba(181,215,255,${alpha * .55})`);
          glow.addColorStop(1, "rgba(181,215,255,0)");
          context.fillStyle = glow;
          context.fillRect(x - star.r * 5, y - star.r * 5, star.r * 10, star.r * 10);
        }
        context.fillStyle = `rgba(221,234,255,${alpha})`;
        context.beginPath();
        context.arc(x, y, star.r, 0, Math.PI * 2);
        context.fill();
      }
    };
    const tick = (now: number) => {
      if (!enabled() || !animated()) return;
      if (now - last >= 32) { time += Math.min((now - last) / 1000, .05); last = now; draw(); }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      if (!enabled()) return;
      width = window.innerWidth; height = window.innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(); last = performance.now();
      if (animated()) frame = requestAnimationFrame(tick);
    };
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-appearance", "data-motion"] });
    window.addEventListener("resize", sync);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); readingObserver.disconnect();
      window.removeEventListener("resize", sync);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);
  return <div className="space-background" data-reading="true" aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
