"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { shootingStarAt } from "@/lib/shooting-stars.mjs";

/** Decorative scene. No pointer capture or layout shift; planets load only in Midnight. */
export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const planetRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;
    const root = document.documentElement;
    const scene = canvas.parentElement;
    let disposed = false;
    let loadingPlanets = false;
    let planets: ReturnType<typeof import("./planet-renderer").createPlanetRenderer> = null;
    if (scene) { scene.dataset.reading = "true"; delete scene.dataset.planets; }
    const hero = document.querySelector(".design-hero-stage");
    // Keep the artwork vivid in the hero, then quiet it behind readable content.
    const readingObserver = new IntersectionObserver(([entry]) => {
      if (scene) scene.dataset.reading = String(entry.intersectionRatio < .45);
    }, { threshold: [0, .45] });
    if (hero) readingObserver.observe(hero);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = 0;
    let lastPlanet = 0;
    let time = 0;
    let width = 0;
    let height = 0;
    let seed = 20260923;
    const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const stars = Array.from({ length: 260 }, () => ({ x: random(), y: random(), r: .35 + random() ** 3 * 1.5, phase: random() * Math.PI * 2, depth: .2 + random() * .8 }));
    const enabled = () => root.dataset.appearance === "midnight" && !document.hidden;
    const animated = () => !reduced.matches && root.dataset.motion !== "paused";
    const draw = (updatePlanets = true) => {
      context.clearRect(0, 0, width, height);
      if (updatePlanets && planets?.draw(width, height, time) && scene) scene.dataset.planets = "ready";
      const count = width < 600 ? 100 : stars.length;
      for (let i = 0; i < count; i++) {
        const star = stars[i];
        const x = (star.x * width + time * star.depth * 1.3) % width;
        const y = ((star.y * height - time * star.depth * .6) % height + height) % height;
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
      // This canvas is below the planet canvas, so passes disappear behind Saturn.
      // Keep the poster fallback free of streaks that would cross its flat planets.
      const shooting = scene?.dataset.planets === "ready" && animated()
        ? shootingStarAt(time, width, height) : null;
      const active = shooting ? "1" : "0";
      if (scene && scene.dataset.shootingStars !== active) scene.dataset.shootingStars = active;
      if (shooting) {
        const { x, y, directionX, directionY, trail, opacity } = shooting;
        const tailX = x - directionX * trail;
        const tailY = y - directionY * trail;
        const gradient = context.createLinearGradient(tailX, tailY, x, y);
        gradient.addColorStop(0, "rgba(126,186,255,0)");
        gradient.addColorStop(.65, `rgba(155,205,255,${opacity * .35})`);
        gradient.addColorStop(1, `rgba(234,246,255,${opacity})`);
        context.save();
        context.lineCap = "round";
        context.strokeStyle = gradient;
        for (const [lineWidth, alpha] of [[8, .10], [4, .24], [1.5, 1]]) {
          context.globalAlpha = alpha;
          context.lineWidth = lineWidth;
          context.beginPath(); context.moveTo(tailX, tailY); context.lineTo(x, y); context.stroke();
        }
        context.globalAlpha = 1;
        const halo = context.createRadialGradient(x, y, 0, x, y, 13);
        halo.addColorStop(0, `rgba(241,250,255,${opacity})`);
        halo.addColorStop(.18, `rgba(185,224,255,${opacity * .72})`);
        halo.addColorStop(1, "rgba(125,189,255,0)");
        context.fillStyle = halo; context.fillRect(x - 13, y - 13, 26, 26);
        context.fillStyle = `rgba(250,253,255,${opacity})`;
        context.beginPath(); context.arc(x, y, 1.8, 0, Math.PI * 2); context.fill();
        context.restore();
      }
    };
    const tick = (now: number) => {
      if (!enabled() || !animated()) return;
      const reading = scene?.dataset.reading === "true";
      if (now - last >= (reading ? 80 : 16)) {
        time += Math.min((now - last) / 1000, .12);
        last = now;
        // Smooth fast trails without increasing the heavier planet rendering rate.
        const updatePlanets = now - lastPlanet >= (reading ? 80 : 40);
        draw(updatePlanets);
        if (updatePlanets) lastPlanet = now;
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      if (scene) scene.dataset.animation = enabled() && animated() ? "running" : "paused";
      if (!enabled()) return;
      if (!loadingPlanets && planetRef.current) {
        loadingPlanets = true;
        void import("./planet-renderer").then(({ createPlanetRenderer }) => {
          if (disposed || !planetRef.current) return;
          planets = createPlanetRenderer(planetRef.current, () => { if (!disposed) sync(); });
        }).catch(() => { /* Keep the original poster if the renderer cannot load. */ });
      }
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
    const lost = () => { if (scene) delete scene.dataset.planets; };
    const planetCanvas = planetRef.current;
    planetCanvas?.addEventListener("webglcontextlost", lost);
    sync();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); readingObserver.disconnect();
      disposed = true;
      planets?.dispose();
      planetCanvas?.removeEventListener("webglcontextlost", lost);
      window.removeEventListener("resize", sync);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, [pathname]);
  return <div className="space-background" data-reading="true" aria-hidden="true"><canvas className="space-stars" ref={canvasRef} /><canvas className="space-planets" ref={planetRef} /></div>;
}
