"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { SPRING } from "./reveal";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const reduceRef = useRef(false);
  useEffect(() => {
    reduceRef.current = Boolean(reduce);
  }, [reduce]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Slow zoom and drift as the hero leaves the viewport. Off under reduced motion.
  // Both start at identity so server and client render the same markup.
  const scale = useTransform(scrollYProgress, (v) => (reduceRef.current ? 1 : 1 + v * 0.14));
  const y = useTransform(scrollYProgress, (v) => (reduceRef.current ? "0%" : `${v * 6}%`));

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100dvh] items-end overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 -z-10 will-change-transform"
        style={{ scale, y }}
      >
        <Image
          src="https://picsum.photos/seed/kept-grove-forest-morning-17/2400/1600"
          alt="A quiet path through a pine forest"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      {/* Scrim: keeps nav and glass panel text readable over any photo. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(8_18_12/0.72)_0%,rgb(8_18_12/0.25)_45%,rgb(8_18_12/0.1)_70%,rgb(8_18_12/0.6)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_100%,rgb(8_18_12/0.55),transparent_60%)]"
      />

      <div className="mx-auto w-full max-w-[1400px] px-4 pt-28 pb-6 sm:px-8 md:pb-12">
        <motion.div
          className="glass-panel w-full max-w-[640px] p-7 text-[#f3f6f0] sm:p-10"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.15 }}
        >
          <h1 className="text-[2.6rem] leading-[1.02] font-medium tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.1rem]">
            A quiet place for ideas to grow.
          </h1>
          <p className="mt-5 max-w-[42ch] text-lg leading-relaxed font-light text-[#dce4da] sm:text-xl">
            Kept holds everything you capture, links it together, and brings
            old notes back when they matter again.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#pricing"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-(--accent) px-6 text-[15px] font-medium whitespace-nowrap text-(--on-accent) transition-[background-color,transform] duration-300 hover:bg-(--accent-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
            >
              Start free
              <ArrowRight size={16} weight="bold" aria-hidden />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center rounded-full border border-white/35 px-6 text-[15px] font-normal whitespace-nowrap text-white transition-[background-color,transform] duration-300 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
            >
              See how it works
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
