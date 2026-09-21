"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type Panel = {
  src: string;
  alt: string;
  title: string;
  body: string;
};

export function ThreadPan({ panels }: { panels: Panel[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  if (reduce) {
    return (
      <div ref={ref} className="mx-auto grid max-w-[1400px] gap-12 px-4 md:px-8">
        {panels.map((panel) => (
          <PanelView key={panel.title} panel={panel} />
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[400dvh]">
      <div className="sticky top-16 h-[calc(100dvh-4rem)] overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex h-full w-[400vw] will-change-transform"
        >
          {panels.map((panel) => (
            <div
              key={panel.title}
              className="flex w-screen shrink-0 items-center px-4 md:px-16"
            >
              <div className="mx-auto w-full max-w-5xl">
                <PanelView panel={panel} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function PanelView({ panel }: { panel: Panel }) {
  return (
    <div className="grid items-center gap-6 md:grid-cols-2">
      <div className="relative h-[30dvh] md:h-[62dvh]">
        <Image
          src={panel.src}
          alt={panel.alt}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="text-3xl tracking-tight md:text-5xl">{panel.title}</h3>
        <p className="mt-4 max-w-[34ch] text-base leading-relaxed text-[var(--muted)]">
          {panel.body}
        </p>
      </div>
    </div>
  );
}
