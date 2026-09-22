"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { useMotionPaused } from "@/components/motion-preference";

export function ProjectArtboard({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const element = useRef<HTMLAnchorElement>(null);
  const paused = useMotionPaused();

  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (paused || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--art-x", `${(x - .5) * 4}deg`);
    event.currentTarget.style.setProperty("--art-y", `${(.5 - y) * 4}deg`);
    event.currentTarget.style.setProperty("--light-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--light-y", `${y * 100}%`);
  }

  function reset() {
    element.current?.style.removeProperty("--art-x");
    element.current?.style.removeProperty("--art-y");
  }

  return <a ref={element} className="curated-work-media" href={href} aria-label={label} onPointerMove={move} onPointerLeave={reset} onBlur={reset}>{children}</a>;
}
