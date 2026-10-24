"use client";

import { useLayoutEffect, useRef } from "react";

/** One word sized by measurement so it spans its container's content width exactly. */
export default function FitWord({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return;
    const fit = () => {
      const cs = getComputedStyle(box);
      const width = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      el.style.fontSize = "100px";
      const natural = el.getBoundingClientRect().width;
      if (natural > 0) el.style.fontSize = `${Math.floor((100 * width) / natural * 10) / 10}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
