"use client";
import { useEffect } from "react";
import { useMotionPaused } from "@/components/motion-preference";
import type Lenis from "lenis";

const revealSelector = [
  "[data-reveal]", ".portfolio-section-heading", ".section-heading", ".intro-copy",
  ".notes-heading", ".notes-list article", ".project-card", ".case-design-heading",
  ".design-decision-grid article", ".case-section-copy article", ".case-evidence-grid figure",
  ".essay-archive-card", ".footer-lead",
].join(",");

export function StudioMotion() {
  const paused = useMotionPaused();

  // Enhance wheel input only. Touch, keyboard, browser find, and nested panels
  // retain their native behavior. A failed optional import leaves native scroll.
  useEffect(() => {
    if (paused || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let disposed = false;
    let scroll: Lenis | undefined;
    void import("lenis").then(({ default: SmoothScroll }) => {
      if (disposed) return;
      scroll = new SmoothScroll({
        autoRaf: true,
        lerp: 0.14,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        stopInertiaOnNavigate: true,
        prevent: node => node.closest(".studio-assistant, .mobile-menu, textarea, select, [data-native-scroll]") !== null,
      });
    }).catch(() => { /* Progressive enhancement: native scrolling remains usable. */ });
    return () => { disposed = true; scroll?.destroy(); };
  }, [paused]);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";
    if (paused || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.remove("reveal-pending");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
    const elements = document.querySelectorAll<HTMLElement>(revealSelector);
    elements.forEach(element => {
      element.dataset.reveal = "";
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add("reveal-pending");
        observer.observe(element);
      }
    });
    const revealFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest(".reveal-pending");
      if (target) { target.classList.remove("reveal-pending"); observer.unobserve(target); }
    };
    document.addEventListener("focusin", revealFocus);
    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", revealFocus);
      elements.forEach(element => element.classList.remove("reveal-pending"));
    };
  }, [paused]);
  return null;
}
