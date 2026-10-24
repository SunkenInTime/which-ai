"use client";

import { useEffect, useRef, useState } from "react";

// A wordmark set as SVG text with a viewBox fitted to the word by measurement, so it spans its
// container at any width without wrapping and without a size guessed for one face.
export function SvgWord({ text, font, weight = 400, className }: { text: string; font: string; weight?: number; className?: string }) {
  const ref = useRef<SVGTextElement>(null);
  const [box, setBox] = useState({ w: 1000, h: 200, x: 0, y: 160 });
  useEffect(() => {
    const measure = () => {
      const t = ref.current;
      if (!t) return;
      const b = t.getBBox();
      if (!b.width) return;
      setBox({ w: Math.ceil(b.width), h: Math.ceil(b.height), x: -b.x, y: -b.y });
    };
    measure();
    // Gallery copy: each measure moves the word by its own last offset, so where it lands depends
    // on whether the first measure has been applied before the second. In the source the remote
    // fonts are still loading when this runs, so it has; the gallery's local fonts are already
    // there, so the second measure waits two frames to land where the source's does.
    document.fonts?.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(measure)));
  }, [text, font, weight]);
  return (
    <svg className={className} viewBox={`0 0 ${box.w} ${box.h}`} width="100%" aria-hidden="true" style={{ display: "block", overflow: "visible" }}>
      <text ref={ref} x={box.x} y={box.y} fontFamily={font} fontWeight={weight} fontSize="200" fill="currentColor" dominantBaseline="hanging" style={{ letterSpacing: "-0.02em" }}>
        {text}
      </text>
    </svg>
  );
}
