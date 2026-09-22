"use client";

import Image from "next/image";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { useEffect, useState } from "react";
import { ArrowDownRight } from "@phosphor-icons/react";
import { MagneticCta } from "./magnetic-cta";

const WORDS = [
  "ideas",
  "quotes",
  "half-thoughts",
  "reading notes",
  "voice memos",
];
const EASE = [0.16, 1, 0.3, 1] as const;

function CyclingWord() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((n) => (n + 1) % WORDS.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [reduce]);

  const word = WORDS[index];

  // overflow-hidden clips the swap; leading-[1.12] + pb reserve keeps the
  // descenders in "half-thoughts" and "reading" clear of the clip edge.
  return (
    <span className="relative inline-flex overflow-hidden pb-[0.1em] align-top leading-[1.12]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-105%" }}
          transition={{ type: "spring", stiffness: 210, damping: 24 }}
          className="block whitespace-nowrap"
        >
          {word}.
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Entrance props are identical on server and client (no hydration mismatch);
// MotionConfig reducedMotion="user" drops the movement for reduced-motion users.
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

export function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="mx-auto grid min-h-[calc(100dvh-5rem)] max-w-[1400px] grid-cols-1 content-center gap-12 px-5 pb-16 pt-6 md:grid-cols-12 md:gap-6 md:px-10 md:pb-20">
        <div className="md:col-span-8">
          <h1 className="v4-display text-[13vw] font-[650] leading-[0.95] tracking-[-0.05em] md:text-[8.4vw] xl:text-[8rem]">
            <span className="sr-only">
              Keep all your ideas, quotes, half-thoughts and reading notes.
            </span>
            <motion.span aria-hidden className="block" {...rise(0)}>
              Keep all your
            </motion.span>
            <motion.span
              aria-hidden
              className="block font-[800] text-(--v4-accent-ink) lg:pl-[0.6em]"
              {...rise(0.08)}
            >
              <CyclingWord />
            </motion.span>
          </h1>

          <motion.div
            className="mt-8 max-w-[31rem] md:mt-10 lg:ml-[calc(min(8.4vw,8rem)*0.6)]"
            {...rise(0.2)}
          >
            <p className="text-lg leading-relaxed text-(--v4-muted) md:text-xl">
              Capture anything, link it to everything else, and watch old notes
              come back right when you need them.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <MagneticCta href="#pricing">Start free</MagneticCta>
              <a
                href="#how"
                className="group inline-flex items-center gap-2 font-semibold underline decoration-(--v4-line) decoration-2 underline-offset-8 transition-colors hover:decoration-(--v4-accent-ink)"
              >
                See how it works
                <ArrowDownRight
                  size={18}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="relative mx-auto w-[72%] max-w-[380px] md:col-span-4 md:mx-0 md:w-full md:self-center md:justify-self-end">
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-full bg-(--v4-accent)"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 9, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 14,
              delay: 0.3,
            }}
          />
          <motion.div
            className="relative aspect-[3/4.3] overflow-hidden rounded-full shadow-(--v4-shadow)"
            initial={{ rotate: 6, y: 60, opacity: 0 }}
            animate={{ rotate: -4, y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 15,
              delay: 0.15,
            }}
          >
            <Image
              src="https://picsum.photos/seed/kept-notes-pile/760/1090"
              alt="A small table on terracotta tiles with a coffee, a phone and a camera, seen from above"
              fill
              priority
              quality={75}
              sizes="(min-width: 768px) 30vw, 72vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
