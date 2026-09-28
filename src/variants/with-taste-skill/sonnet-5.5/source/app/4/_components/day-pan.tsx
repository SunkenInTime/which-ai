"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Moment = { time: string; title: string; body: string; img: string; alt: string };

/**
 * Vertical scroll pans the track sideways so the day reads left to right.
 * Below 768px, or with reduced motion, it is a plain swipeable row.
 */
export function DayPan({ moments }: { moments: Moment[] }) {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapEl = wrap.current;
    const trackEl = track.current;
    if (!wrapEl || !trackEl) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      wrapEl.style.overflowX = "hidden";
      const distance = () => Math.max(trackEl.scrollWidth - window.innerWidth, 0);
      gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapEl,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        wrapEl.style.overflowX = "";
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={wrap} id="day" className="no-scrollbar relative overflow-x-auto bg-(--c-surface)">
      <div
        ref={track}
        className="flex w-max snap-x items-center gap-6 px-4 py-16 sm:px-6 md:min-h-[100dvh] md:gap-10 md:px-[8vw] md:py-0"
      >
        <div className="w-[82vw] shrink-0 snap-start md:w-[30vw]">
          <h2 className="text-[38px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[52px]">
            A normal day, remembered for you.
          </h2>
        </div>
        {moments.map((m) => (
          <article key={m.time} className="w-[82vw] shrink-0 snap-start md:w-[34vw]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={m.img}
              alt={m.alt}
              width={800}
              height={640}
              loading="lazy"
              className="aspect-[5/4] w-full rounded-[20px] object-cover"
            />
            <h3 className="mt-5 text-[26px] font-semibold tracking-[-0.03em]">{m.time}</h3>
            <p className="mt-1 max-w-[40ch] text-[16px] leading-relaxed text-(--c-fg-2)">
              <span className="font-medium text-(--c-fg)">{m.title}.</span> {m.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
