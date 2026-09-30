"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  crop?: { x: number; y: number; width: number; height: number };
};

export function CaseScreenshot({ src, alt, title, width, height, crop }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const titleId = useId();
  const frame = crop ?? { x: 0, y: 0, width, height };

  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element?.showModal();
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const picture = (expanded = false) => (
    <div className="case-shot-crop" style={{ aspectRatio: `${frame.width} / ${frame.height}` }}>
      <Image src={src} alt={alt} width={width} height={height} unoptimized loading={expanded ? "eager" : "lazy"}
        style={{ width: `${width / frame.width * 100}%`, left: `${-frame.x / frame.width * 100}%`, top: `${-frame.y / frame.height * 100}%` }} />
    </div>
  );

  return (
    <figure className="case-shot">
      <button className="case-shot-open" type="button" aria-label={`Enlarge screenshot: ${title}`} onClick={() => { setZoomed(false); setOpen(true); }}>
        {picture()}
        <span className="case-shot-hint" aria-hidden="true">Enlarge image ↗</span>
      </button>
      <figcaption>Product screenshot · Select the image to inspect the details</figcaption>
      <dialog ref={dialog} className="case-shot-dialog" aria-labelledby={titleId} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) setOpen(false); }}>
        <div className="case-shot-toolbar">
          <p id={titleId}>{title}</p>
          <button type="button" aria-pressed={zoomed} onClick={() => setZoomed(value => !value)}>{zoomed ? "Fit width" : "Actual size"}</button>
          <button type="button" className="case-shot-close" aria-label="Close image" onClick={() => setOpen(false)} autoFocus><span aria-hidden="true">×</span></button>
        </div>
        <div className="case-shot-viewport" data-lenis-prevent>
          <div className="case-shot-expanded" style={{ width: zoomed ? frame.width : "100%", maxWidth: frame.width }}>
            {open && picture(true)}
          </div>
        </div>
      </dialog>
    </figure>
  );
}
