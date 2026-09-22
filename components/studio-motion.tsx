"use client";
import { useEffect } from "react";
import { useMotionPaused } from "@/components/motion-preference";
export function StudioMotion() {
  const paused = useMotionPaused();
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";
    if (paused || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.remove("reveal-pending");
        observer.unobserve(entry.target);
      }
    }, { threshold: .08 });
    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add("reveal-pending");
        observer.observe(element);
      }
    });
    return () => { observer.disconnect(); elements.forEach(element => element.classList.remove("reveal-pending")); };
  }, [paused]);
  return null;
}
