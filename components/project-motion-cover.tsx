"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ProjectMotionCoverProps = {
  alt: string;
  className?: string;
  poster: string;
  priority?: boolean;
  sizes: string;
  video?: string;
};

export function ProjectMotionCover({ alt, className, poster, priority = false, sizes, video }: ProjectMotionCoverProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canAnimate, setCanAnimate] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!video || !frameRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reducedMotion || connection?.saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => setCanAnimate(entry.isIntersecting),
      { rootMargin: "180px 0px", threshold: 0.12 },
    );

    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, [video]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (canAnimate) {
      void videoRef.current.play().catch(() => undefined);
    } else {
      videoRef.current.pause();
    }
  }, [canAnimate]);

  return (
    <div ref={frameRef} className={["project-motion-cover", className].filter(Boolean).join(" ")} role="img" aria-label={alt}>
      <Image src={poster} alt="" fill priority={priority} unoptimized sizes={sizes} />
      {video && canAnimate && (
        <video
          ref={videoRef}
          aria-hidden="true"
          autoPlay
          className={ready ? "is-ready" : undefined}
          loop
          muted
          onCanPlay={() => setReady(true)}
          playsInline
          poster={poster}
          preload="metadata"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
