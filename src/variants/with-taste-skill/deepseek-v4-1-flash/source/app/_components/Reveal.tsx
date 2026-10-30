"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
};

/**
 * Marks its element for a staggered entrance the first time it comes into view.
 * A plain scroll/resize check rather than an IntersectionObserver, so a fast scroll
 * or a jump to an anchor can never leave a heading sitting invisible.
 * The hidden starting state lives in each design's CSS inside
 * @media (prefers-reduced-motion: no-preference), so the reduced page is the finished page.
 */
export default function Reveal({ children, as: Tag = "div", delay = 0, className, id, style }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let queued = false;

    const check = () => {
      queued = false;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.94 && r.bottom > -80) {
        el.setAttribute("data-in", "");
        detach();
      }
    };
    const request = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(check);
    };
    const detach = () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };

    check();
    if (!el.hasAttribute("data-in")) {
      window.addEventListener("scroll", request, { passive: true });
      window.addEventListener("resize", request);
    }
    return detach;
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      className={className}
      id={id}
      style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}
