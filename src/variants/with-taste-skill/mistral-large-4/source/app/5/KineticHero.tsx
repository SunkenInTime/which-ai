"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

const words = ["CAPTURE", "CONNECT", "RECALL", "REMEMBER"];

export function KineticHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-6 pt-16">
      {/* Animated background word */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <motion.span
          initial={reduce ? false : { opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="select-none whitespace-nowrap text-[20vw] font-black uppercase leading-none tracking-tighter text-white/[0.04]"
        >
          MNEMOS
        </motion.span>
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        {/* Eyebrow */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] uppercase tracking-[0.3em] text-zinc-500"
        >
          ( A SECOND BRAIN )
        </motion.p>

        {/* Kinetic headline - words stagger in */}
        <h1 className="mt-6 text-[12vw] font-black uppercase leading-[0.85] tracking-tighter md:text-[9vw] lg:text-[8rem]">
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={reduce ? false : { opacity: 0, y: 60, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block overflow-hidden"
            >
              <span
                className={`inline-block pb-2 ${
                  i === words.length - 1
                    ? "text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.6)]"
                    : "text-white"
                }`}
              >
                {word}
                {i < words.length - 1 && (
                  <span className="ml-4 text-[0.35em] text-rose-500 [-webkit-text-stroke:0]">
                    .
                  </span>
                )}
              </span>
            </motion.span>
          ))}
        </h1>

        {/* Sub + CTA */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-end justify-between gap-6"
        >
          <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
            A note-taking app that moves the way you think. Capture,
            connect, and recall, with zero friction.
          </p>
          <Link
            href="./5"
            className="group inline-flex items-center gap-3 border border-white px-6 py-3 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-black active:scale-95"
          >
            Start now
            <ArrowRight
              size={14}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>

      {/* Bottom meta strip */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative mt-16 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.2em] text-zinc-600"
      >
        <span>SCROLL</span>
        <span className="hidden md:inline">SECOND BRAIN - EST. 2026</span>
        <span>01 / 05</span>
      </motion.div>
    </section>
  );
}
