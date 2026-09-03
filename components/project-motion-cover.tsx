"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMotionPaused } from "@/components/motion-preference";

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
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const paused = useMotionPaused();

  useEffect(() => {
    if (!video || !frameRef.current) return;

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData || paused) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCanAnimate(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "0px", threshold: 0.12 },
    );

    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, [video, paused]);

  useEffect(() => {
    if (!videoRef.current) return;
    const syncPlayback = () => {
      if (videoRef.current && canAnimate && !paused && !document.hidden) {
        void videoRef.current.play().catch(() => undefined);
      } else videoRef.current?.pause();
    };
    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => document.removeEventListener("visibilitychange", syncPlayback);
  }, [canAnimate, paused, shouldLoad]);

  return (
    <div ref={frameRef} className={["project-motion-cover", className].filter(Boolean).join(" ")} role="img" aria-label={alt}>
      <Image src={poster} alt="" fill priority={priority} unoptimized sizes={sizes} style={{ objectFit: "contain" }} />
      {video && shouldLoad && (
        <video
          ref={videoRef}
          aria-hidden="true"
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
