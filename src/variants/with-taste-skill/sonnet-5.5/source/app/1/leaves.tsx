"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Notepad } from "@phosphor-icons/react";
import { Photo } from "../_components/photo";
import { ASK_EXAMPLES } from "../_lib/pith";
import { cn } from "../_lib/cn";

/** Photo that drifts slightly against the scroll, so the page feels deeper than it is. */
export function ParallaxPhoto({
  id,
  alt,
  sizes,
  className,
}: {
  id: number;
  alt: string;
  sizes: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-[color:var(--bg-2)]", className)}>
      <motion.div
        style={{ y: reduce ? 0 : y }}
        className="absolute inset-x-0 -inset-y-[9%]"
      >
        <Photo id={id} alt={alt} sizes={sizes} className="grayscale contrast-[1.05]" />
      </motion.div>
    </div>
  );
}

function Word({
  word,
  progress,
  range,
  reduce,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <>
      <motion.span style={{ opacity: reduce ? 1 : opacity }} className="inline-block">
        {word}
      </motion.span>{" "}
    </>
  );
}

/** Reading-paced statement: each word firms up as it passes the middle of the screen. */
export function ScrollText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "end 0.55"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <Word
            key={`${word}-${i}`}
            word={word}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            reduce={reduce}
          />
        ))}
      </span>
    </p>
  );
}

/** A working mini version of Ask: pick a question, get an answer with its sources. */
export function AskDemo() {
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const loading = answered !== index;

  useEffect(() => {
    const timer = setTimeout(() => setAnswered(index), reduce ? 0 : 700);
    return () => clearTimeout(timer);
  }, [index, reduce]);

  const item = ASK_EXAMPLES[index];
  const words = item.a.split(" ");

  return (
    <div className="border border-[color:var(--line)] bg-[color:var(--bg-2)]">
      <div className="border-b border-[color:var(--line)] p-5 md:p-6">
        <p id="ask-label" className="text-sm font-medium text-[color:var(--fg-2)]">
          Try a question
        </p>
        <div
          role="group"
          aria-labelledby="ask-label"
          className="mt-3 flex flex-wrap gap-2"
        >
          {ASK_EXAMPLES.map((example, i) => (
            <button
              key={example.q}
              type="button"
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "border px-4 py-2.5 text-left text-sm transition-[background-color,color,transform] duration-200 active:scale-[0.98]",
                i === index
                  ? "border-[color:var(--fg)] bg-[color:var(--fg)] text-[color:var(--bg)]"
                  : "border-[color:var(--line)] bg-[color:var(--bg)] text-[color:var(--fg)] hover:border-[color:var(--fg)]",
              )}
            >
              {example.q}
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite" className="min-h-[300px] p-6 md:p-8">
        <AnimatePresence mode="wait" initial={false}>
          {loading ? (
            <motion.div
              key={`loading-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-3"
              aria-label="Searching your notes"
            >
              <div className="h-4 w-3/4 animate-pulse bg-[color:var(--line)]" />
              <div className="h-4 w-full animate-pulse bg-[color:var(--line)]" />
              <div className="h-4 w-5/6 animate-pulse bg-[color:var(--line)]" />
              <div className="h-4 w-2/5 animate-pulse bg-[color:var(--line)]" />
            </motion.div>
          ) : (
            <motion.div
              key={`answer-${index}`}
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.018 } } }}
            >
              <p className="max-w-[52ch] text-xl leading-relaxed tracking-tight md:text-2xl">
                {words.map((word, i) => (
                  <Fragment key={i}>
                    <motion.span
                      variants={{
                        hidden: { opacity: 0, y: 6 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>{" "}
                  </Fragment>
                ))}
              </p>
              <motion.div
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8"
              >
                <p className="text-sm font-medium text-[color:var(--fg-2)]">From your notes</p>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  {item.sources.map((source) => (
                    <li key={source} className="flex items-center gap-2 text-sm">
                      <Notepad size={16} weight="regular" className="text-[color:var(--accent)]" />
                      <span className="underline decoration-[color:var(--line)] underline-offset-4">
                        {source}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
