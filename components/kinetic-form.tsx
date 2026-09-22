"use client";
import { useState, type CSSProperties } from "react";
import { useMotionPaused } from "@/components/motion-preference";
// An original parametric line sculpture. SVG stays sharp at every size.
export function KineticForm() {
  const [form, setForm] = useState(38);
  const paused = useMotionPaused();
  return <div className={`kinetic-form${paused ? " is-paused" : ""}`}>
    <div className="kinetic-canvas" style={{ "--form-turn": `${form * .6 - 23}deg` } as CSSProperties}>
      <svg className="kinetic-sculpture" viewBox="0 0 600 600" aria-hidden="true" focusable="false"><g className="sculpture-orbit">{Array.from({ length: 36 }, (_, i) => <ellipse key={i} cx="300" cy="300" rx={118 + form * .38} ry="246" transform={`rotate(${i * 5} 300 300)`} />)}</g><circle cx="300" cy="300" r="3" className="sculpture-center" /></svg>
      <span className="form-coordinate coordinate-top">N / 01</span><span className="form-coordinate coordinate-bottom">A study in balance</span>
    </div>
    <div className="form-controls"><label htmlFor="form-balance">Play with the form <span aria-hidden="true">↔</span></label><input id="form-balance" type="range" min="0" max="100" value={form} onChange={event => setForm(Number(event.target.value))} aria-valuetext={`${form}% openness`} /><span aria-hidden="true">{String(form).padStart(2, "0")}</span></div>
  </div>;
}
