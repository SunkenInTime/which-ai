"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Notepad } from "@phosphor-icons/react";
import { Photo } from "../_components/photo";
import { ASK_EXAMPLES, QUOTES } from "../_lib/pith";
import { cn } from "../_lib/cn";

/** Photo card that leans toward the pointer, the way a glass slab would. */
export function TiltPhoto({
  id,
  alt,
  sizes,
  className,
  priority,
  strength = 7,
}: {
  id: number;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [strength, -strength]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-strength, strength]), {
    stiffness: 140,
    damping: 18,
  });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType === "touch" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        px.set((e.clientX - rect.left) / rect.width - 0.5);
        py.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className={cn("relative overflow-hidden", className)}
    >
      <Photo id={id} alt={alt} sizes={sizes} priority={priority} />
    </motion.div>
  );
}

/** Wraps the small hero photo so it drifts against the scroll. */
export function Drift({
  children,
  className,
  distance = 60,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} style={{ y: reduce ? 0 : y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Ask, as a working tile: pick a question, watch it load, read the answer with sources. */
export function AskTile() {
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const loading = answered !== index;

  useEffect(() => {
    const timer = setTimeout(() => setAnswered(index), reduce ? 0 : 650);
    return () => clearTimeout(timer);
  }, [index, reduce]);

  const item = ASK_EXAMPLES[index];

  return (
    <div className="flex h-full flex-col">
      <h3 className="text-2xl font-medium tracking-tight">Ask your notes</h3>
      <p id="ask-tile-label" className="mt-1.5 text-[color:var(--fg-2)]">
        Try one of these.
      </p>
      <div
        role="group"
        aria-labelledby="ask-tile-label"
        className="mt-5 flex flex-wrap gap-2"
      >
        {ASK_EXAMPLES.map((example, i) => (
          <button
            key={example.q}
            type="button"
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "rounded-full border px-4 py-2 text-left text-sm transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97]",
              i === index
                ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-[color:var(--on-accent)]"
                : "border-[color:var(--line)] bg-[color:var(--bg)]/60 text-[color:var(--fg)] hover:border-[color:var(--fg-3)]",
            )}
          >
            {example.q}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-6 flex-1 rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg)]/70 p-5">
        <AnimatePresence mode="wait" initial={false}>
          {loading ? (
            <motion.div
              key={`l-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              aria-label="Searching your notes"
              className="space-y-3"
            >
              <div className="h-3.5 w-11/12 animate-pulse rounded-full bg-[color:var(--line)]" />
              <div className="h-3.5 w-full animate-pulse rounded-full bg-[color:var(--line)]" />
              <div className="h-3.5 w-2/3 animate-pulse rounded-full bg-[color:var(--line)]" />
            </motion.div>
          ) : (
            <motion.div
              key={`a-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-lg leading-relaxed">{item.a}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {item.sources.map((source) => (
                  <li
                    key={source}
                    className="flex items-center gap-1.5 rounded-full bg-[color:var(--bg-2)] px-3 py-1.5 text-[13px] text-[color:var(--fg-2)]"
                  >
                    <Notepad size={14} className="text-[color:var(--accent)]" />
                    {source}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/** One quote at a time. Advances on its own until the reader hovers, focuses, or prefers reduced motion. */
export function QuoteCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 7000);
    return () => clearInterval(timer);
  }, [paused, reduce]);

  const quote = QUOTES[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="min-h-[15rem] md:min-h-[14rem]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className="max-w-[30ch] text-3xl font-light leading-[1.15] tracking-[-0.02em] text-balance md:text-5xl">
              &ldquo;{quote.body}&rdquo;
            </blockquote>
            <figcaption className="mt-7 text-base">
              <span className="font-medium">{quote.name}</span>
              <span className="text-[color:var(--fg-2)]">, {quote.role.toLowerCase()}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center gap-2" role="group" aria-label="Choose a quote">
        {QUOTES.map((q, i) => (
          <button
            key={q.name}
            type="button"
            aria-label={`Quote from ${q.name}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className="group grid h-8 place-items-center px-1"
          >
            <span
              className={cn(
                "block h-2 rounded-full transition-[width,background-color] duration-300",
                i === index ? "w-8 bg-[color:var(--accent)]" : "w-2 bg-[color:var(--fg-3)]/60 group-hover:bg-[color:var(--fg-3)]",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
