"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { MotionControl, useMotionPaused } from "@/components/motion-preference";

type Study = "flow" | "orbit" | "fold";
type Settings = { study: Study; intensity: number };
const studies = [
  { id: "flow", number: "01", name: "Flow", detail: "A field of lines, finding its own rhythm." },
  { id: "orbit", number: "02", name: "Orbit", detail: "One continuous idea. A different perspective." },
  { id: "fold", number: "03", name: "Fold", detail: "Flat lines become something with dimension." },
] as const;
const tau = Math.PI * 2;
const orbitSegments = 108;
const flowRows = 28;
const flowVertices = 161;

function fitArtwork(
  context: CanvasRenderingContext2D, width: number, height: number, compact: boolean,
  offsetX: number, offsetY: number, left: number, right: number, top: number, bottom: number,
) {
  const areaLeft = compact ? 20 : width * .40;
  const areaRight = width - (compact ? 20 : 36);
  const areaTop = compact ? 96 : 92;
  const areaBottom = compact ? height - 242 : height - 82;
  const scale = Math.min(1, (areaRight - areaLeft) / (right - left), (areaBottom - areaTop) / (bottom - top));
  const originX = (areaLeft + areaRight) / 2 - (left + right) * scale / 2;
  const originY = (areaTop + areaBottom) / 2 - (top + bottom) * scale / 2;
  context.translate(originX - offsetX, originY - offsetY);
  context.scale(scale, scale);
}

/** Original mathematical drawings. The artwork never drives React renders. */
function drawStudy(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  compact: boolean,
  settings: Settings,
  time: number,
  pointer: { x: number; y: number },
  orbitPoints: Float32Array,
  orbitOrder: number[],
  flowPoints: Float32Array,
) {
  if (width <= 0 || height <= 0) return;
  const cx = width * (compact ? .5 : .67);
  const cy = height * (compact ? .40 : .5);
  const radius = Math.min(width * (compact ? .405 : .30), height * (compact ? .30 : .42));
  const energy = settings.intensity / 100;
  context.fillStyle = "#23231f";
  context.fillRect(0, 0, width, height);
  context.lineWidth = .7;
  context.strokeStyle = "rgba(246,245,239,.09)";
  context.beginPath();
  for (let x = 36; x < width; x += 72) {
    for (let y = 40; y < height - 30; y += 72) {
      context.moveTo(x - 2, y);
      context.lineTo(x + 2, y);
      context.moveTo(x, y - 2);
      context.lineTo(x, y + 2);
    }
  }
  context.stroke();
  context.save();
  context.translate(cx + pointer.x * 12, cy + pointer.y * 9);
  context.lineWidth = compact ? .8 : .9;

  if (settings.study === "flow") {
    const rotation = -.26 + pointer.x * .06;
    const cosRotation = Math.cos(rotation);
    const sinRotation = Math.sin(rotation);
    let left = Infinity;
    let right = -Infinity;
    let top = Infinity;
    let bottom = -Infinity;
    for (let line = 0; line < flowRows; line++) {
      const v = line / 27;
      for (let point = 0; point < flowVertices; point++) {
        const edge = point <= 80 ? v : v + .026;
        const u = point <= 80 ? point / 80 : (160 - point) / 80;
        const x = (u * 2 - 1) * radius * 1.03;
        const envelope = Math.sin(u * Math.PI);
        const wave = Math.sin(u * tau * 1.1 + edge * 3.1 + time * .36);
        const twist = Math.cos(u * tau * .55 - time * .2 + pointer.y * .35);
        const y = ((edge - .5) * 1.28 + envelope * wave * (.24 + energy * .40) + envelope * twist * .17) * radius;
        const rotatedX = x * cosRotation - y * sinRotation;
        const rotatedY = x * sinRotation + y * cosRotation;
        const offset = (line * flowVertices + point) * 2;
        flowPoints[offset] = rotatedX;
        flowPoints[offset + 1] = rotatedY;
        left = Math.min(left, rotatedX);
        right = Math.max(right, rotatedX);
        top = Math.min(top, rotatedY);
        bottom = Math.max(bottom, rotatedY);
      }
    }
    // Fit every pose, including full intensity, inside the editorial drawing area.
    fitArtwork(context, width, height, compact, cx + pointer.x * 12, cy + pointer.y * 9, left - .3, right + .3, top - .3, bottom + .3);
    for (let line = 0; line < flowRows; line++) {
      const shade = Math.round(30 * Math.sin(line / 27 * Math.PI));
      context.fillStyle = `rgb(${190 + shade},${66 + shade},${42 + shade})`;
      context.strokeStyle = "rgba(255,210,170,.45)";
      context.lineWidth = .6;
      context.beginPath();
      for (let point = 0; point < flowVertices; point++) {
        const offset = (line * flowVertices + point) * 2;
        if (point === 0) context.moveTo(flowPoints[offset], flowPoints[offset + 1]);
        else context.lineTo(flowPoints[offset], flowPoints[offset + 1]);
      }
      context.closePath();
      context.fill();
      context.stroke();
    }
  } else if (settings.study === "orbit") {
    const tilt = .44 + pointer.y * .22;
    const rotation = time * .13 + pointer.x * .35 + .4;
    const cosRotation = Math.cos(rotation);
    const sinRotation = Math.sin(rotation);
    const cosTilt = Math.cos(tilt);
    const sinTilt = Math.sin(tilt);
    let left = Infinity;
    let right = -Infinity;
    let top = Infinity;
    let bottom = -Infinity;
    for (let point = 0; point <= orbitSegments; point++) {
      const angle = point / orbitSegments * tau;
      const distance = 1.75 + Math.cos(angle * 3) * (.45 + energy * .45);
      const x = distance * Math.cos(angle * 2) * radius / 2.85;
      const y = distance * Math.sin(angle * 2) * radius / 2.85;
      const z = Math.sin(angle * 3) * radius * .36;
      const rotatedX = x * cosRotation - z * sinRotation;
      const rotatedZ = x * sinRotation + z * cosRotation;
      orbitPoints[point * 3] = rotatedX;
      orbitPoints[point * 3 + 1] = y * cosTilt - rotatedZ * sinTilt;
      orbitPoints[point * 3 + 2] = y * sinTilt + rotatedZ * cosTilt;
      left = Math.min(left, rotatedX);
      right = Math.max(right, rotatedX);
      top = Math.min(top, orbitPoints[point * 3 + 1]);
      bottom = Math.max(bottom, orbitPoints[point * 3 + 1]);
    }
    const strokeRadius = radius * .1;
    fitArtwork(context, width, height, compact, cx + pointer.x * 12, cy + pointer.y * 9, left - strokeRadius, right + strokeRadius, top - strokeRadius, bottom + strokeRadius);
    orbitOrder.sort((a, b) => orbitPoints[a * 3 + 2] - orbitPoints[b * 3 + 2]);
    context.lineCap = "round";
    for (const point of orbitOrder) {
      const light = Math.max(0, Math.min(1, .5 + orbitPoints[point * 3 + 2] / radius * .58));
      const shade = Math.round(light * 105);
      const isCoral = point > orbitSegments * .63 && point < orbitSegments * .78;
      context.strokeStyle = isCoral ? `rgb(${135 + shade},${48 + Math.round(shade * .58)},${31 + Math.round(shade * .42)})` : `rgb(${107 + shade},${114 + shade},${93 + shade})`;
      context.lineWidth = radius * (.17 + light * .03);
      context.beginPath();
      context.moveTo(orbitPoints[point * 3], orbitPoints[point * 3 + 1]);
      context.lineTo(orbitPoints[(point + 1) * 3], orbitPoints[(point + 1) * 3 + 1]);
      context.stroke();
    }
    context.lineCap = "butt";
  } else {
    const rotation = -.40 + pointer.x * .08;
    const cosRotation = Math.cos(rotation);
    const sinRotation = Math.sin(rotation);
    let left = Infinity;
    let right = -Infinity;
    let top = Infinity;
    let bottom = -Infinity;
    for (let line = 0; line < 21; line++) {
      const v = line / 20;
      for (let point = 0; point <= 120; point++) {
        const edge = point <= 60 ? v : v + .035;
        const u = point <= 60 ? point / 60 : (120 - point) / 60;
        const crease = Math.abs(u - .5) * 2;
        const angle = (edge - .5) * (1.8 + energy * 2.1) + Math.sin(time * .3) * .18;
        const widthAtFold = .48 + crease * .58;
        const x = Math.cos(angle) * (u - .5) * radius * 2.05;
        const depth = Math.sin(angle) * widthAtFold * radius;
        const y = (edge - .5) * radius * .75 + (1 - crease) * depth + (crease - .5) * radius * .6;
        const perspective = 1 + depth / (radius * 6);
        const projectedX = x * perspective;
        const projectedY = y + pointer.y * crease * 12;
        const rotatedX = projectedX * cosRotation - projectedY * sinRotation;
        const rotatedY = projectedX * sinRotation + projectedY * cosRotation;
        const offset = (line * 121 + point) * 2;
        // The active study reuses the same point storage as Flow.
        flowPoints[offset] = rotatedX;
        flowPoints[offset + 1] = rotatedY;
        left = Math.min(left, rotatedX);
        right = Math.max(right, rotatedX);
        top = Math.min(top, rotatedY);
        bottom = Math.max(bottom, rotatedY);
      }
    }
    fitArtwork(context, width, height, compact, cx + pointer.x * 12, cy + pointer.y * 9, left - .3, right + .3, top - .3, bottom + .3);
    for (let line = 0; line < 21; line++) {
      const shade = Math.round(Math.sin(line / 20 * Math.PI) * 75);
      context.fillStyle = line < 3 ? `rgb(${150 + shade},${58 + shade},${37 + shade})` : `rgb(${142 + shade},${147 + shade},${119 + shade})`;
      context.strokeStyle = "rgba(246,245,239,.4)";
      context.lineWidth = .6;
      context.beginPath();
      for (let point = 0; point <= 120; point++) {
        const offset = (line * 121 + point) * 2;
        if (point === 0) context.moveTo(flowPoints[offset], flowPoints[offset + 1]);
        else context.lineTo(flowPoints[offset], flowPoints[offset + 1]);
      }
      context.closePath();
      context.fill();
      context.stroke();
    }
  }
  context.restore();
}

export function MotionStudies() {
  const [study, setStudy] = useState<Study>("flow");
  const [intensity, setIntensity] = useState(55);
  const paused = useMotionPaused();
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef<Settings>({ study: "flow", intensity: 55 });
  const pointerRef = useRef({ x: 0, y: 0 });
  const playbackRef = useRef({ elapsed: 0, position: { x: 0, y: 0 } });
  const redrawRef = useRef<(() => void) | null>(null);
  const activeStudy = studies.find(item => item.id === study)!;

  useEffect(() => {
    settingsRef.current = { study, intensity };
    redrawRef.current?.();
  }, [study, intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !stage || !context) return;
    const playback = playbackRef.current;
    let width = 0;
    let height = 0;
    let compact = false;
    let frame = 0;
    let previous = 0;
    let elapsed = playback.elapsed;
    let inView = false;
    const position = playback.position;
    const orbitPoints = new Float32Array((orbitSegments + 1) * 3);
    const orbitOrder = Array.from({ length: orbitSegments }, (_, i) => i);
    const flowPoints = new Float32Array(flowRows * flowVertices * 2);
    const draw = () => drawStudy(context, width, height, compact, settingsRef.current, elapsed, position, orbitPoints, orbitOrder, flowPoints);
    const animate = (timestamp: number) => {
      if (previous === 0) previous = timestamp;
      const delta = timestamp - previous;
      // A 24fps drawing cadence keeps the slow movement light on mobile devices.
      if (delta >= 1000 / 24) {
        elapsed += Math.min(delta, 80) / 1000;
        position.x += (pointerRef.current.x - position.x) * .075;
        position.y += (pointerRef.current.y - position.y) * .075;
        draw();
        previous = timestamp;
      }
      frame = requestAnimationFrame(animate);
    };
    const syncAnimation = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      if (!paused && inView && !document.hidden) frame = requestAnimationFrame(animate);
    };
    const resize = () => {
      const rect = stage.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      compact = window.matchMedia("(max-width: 760px)").matches;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };
    redrawRef.current = draw;
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      document.documentElement.dataset.motionStudyVisible = String(inView);
      syncAnimation();
    }, { threshold: 0 });
    observer.observe(stage);
    document.addEventListener("visibilitychange", syncAnimation);
    return () => {
      playback.elapsed = elapsed;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
      delete document.documentElement.dataset.motionStudyVisible;
      document.removeEventListener("visibilitychange", syncAnimation);
      redrawRef.current = null;
    };
  }, [paused]);

  function movePointer(event: PointerEvent<HTMLDivElement>) {
    if (paused) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: (event.clientX - bounds.left) / bounds.width * 2 - 1,
      y: (event.clientY - bounds.top) / bounds.height * 2 - 1,
    };
  }

  return (
    <section className="motion-studies shell" id="motion-studies" aria-labelledby="motion-studies-title" data-reveal>
      <div className="motion-studies-heading">
        <p className="section-kicker">02 / Play</p>
        <h2 id="motion-studies-title">A little room for<br /><em>the unexpected.</em></h2>
        <p>A small space for curiosity. Original studies in form, movement, and the unexpected.</p>
      </div>
      <div className="motion-study-artboard" data-study={study}>
        <div className="motion-study-toolbar">
          <div className="motion-study-select" role="group" aria-label="Choose a motion study">
            {studies.map(item => (
              <button key={item.id} type="button" aria-pressed={study === item.id} onClick={() => setStudy(item.id)}>
                <span aria-hidden="true">{item.number}</span>{item.name}
              </button>
            ))}
          </div>
          <span className="motion-study-edition" aria-hidden="true">Noerong / Studies in motion</span>
        </div>
        <div className="motion-study-field" ref={stageRef} onPointerMove={movePointer} onPointerDown={movePointer} onPointerLeave={() => { pointerRef.current = { x: 0, y: 0 }; }}>
          <svg className="motion-study-fallback" viewBox="0 0 1000 560" aria-hidden="true" focusable="false">
            {Array.from({ length: 32 }, (_, i) => <path key={i} d={`M 360 ${140 + i * 6} C 480 ${360 + i * 3}, 650 ${40 + i * 9}, 890 ${240 + i * 4}`} fill="none" stroke={i % 6 === 0 ? "#ec7957" : "#dadec4"} strokeWidth=".8" />)}
          </svg>
          <canvas ref={canvasRef} aria-hidden="true" />
          <span className="motion-study-word" aria-hidden="true">{study}<span>.</span></span>
          <div className="motion-study-caption">
            <span>Study {activeStudy.number} / {activeStudy.name}</span>
            <p>{activeStudy.detail}</p>
          </div>
          <span className="motion-study-coordinate" aria-hidden="true">N° {activeStudy.number} / ∞</span>
        </div>
        <div className="motion-study-controls">
          <p><span aria-hidden="true">↗</span> {paused ? "Change the study or intensity. Make it your own." : "Move across the study. Make it your own."}</p>
          <div className="motion-study-intensity">
            <label htmlFor="motion-study-intensity">Intensity</label>
            <input id="motion-study-intensity" type="range" min="0" max="100" value={intensity} onChange={event => setIntensity(Number(event.target.value))} aria-valuetext={`${intensity} percent intensity`} />
            <output htmlFor="motion-study-intensity" aria-hidden="true">{String(intensity).padStart(2, "0")}</output>
          </div>
          <MotionControl />
        </div>
      </div>
    </section>
  );
}
