"use client";

import { motion, type Variants } from "motion/react";
import { Cta } from "./cta";
import { NoteEditor } from "./note-editor";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };
  const panel: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.985 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-10 sm:px-6 md:pt-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14 lg:px-8 lg:pb-24 lg:pt-16"
    >
      <div className="max-w-xl">
        <motion.h1
          variants={item}
          className="text-[40px] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl xl:text-[64px]"
        >
          Write it once.
          <br />
          <span className="text-(--k-fg-3)">Kept brings it back.</span>
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-6 max-w-[44ch] text-lg leading-relaxed text-(--k-fg-2)"
        >
          Kept links everything you capture and brings old notes back the moment they matter to what
          you&apos;re writing.
        </motion.p>
        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
          <Cta href="#pricing">Start free</Cta>
          <Cta href="#features" variant="secondary">
            See how it works
          </Cta>
        </motion.div>
      </div>

      <motion.div variants={panel} className="w-full">
        <NoteEditor />
      </motion.div>
    </motion.section>
  );
}
