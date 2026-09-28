"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { QUOTES } from "../_lib/pith";

const STEPS = [
  {
    verb: "Capture",
    key: "⌥ Space",
    body: "Open a note over any app. Type, paste or dictate, then close it and get back to work.",
  },
  {
    verb: "Link",
    key: "[[",
    body: "Pick a note while you write. Pith links both sides and suggests the ones you would have missed.",
  },
  {
    verb: "Recall",
    key: "⌘ K",
    body: "Ask a question, or wait for the morning review to bring back what you have forgotten.",
  },
] as const;

/** Vertical timeline whose rail fills as the section scrolls through the screen. */
export function Workflow() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.6"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const fill = reduce ? scrollYProgress : smooth;
  const scaleY = useTransform(fill, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative space-y-16 pl-10 md:space-y-24 md:pl-16">
      <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-[color:var(--line)] md:left-[15px]" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : scaleY }}
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-[color:var(--accent)] md:left-[15px]"
      />
      {STEPS.map((step) => (
        <li key={step.verb} className="relative">
          <span
            aria-hidden
            className="absolute -left-10 top-3 size-[15px] rounded-[4px] border border-[color:var(--accent)] bg-[color:var(--bg)] md:-left-16 md:top-4 md:size-[31px] md:rounded-[8px]"
          />
          <h3 className="text-4xl font-semibold tracking-[-0.03em] md:text-6xl">{step.verb}</h3>
          <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-[color:var(--fg-2)]">{step.body}</p>
          <kbd className="mt-5 inline-flex h-9 items-center rounded-md border border-[color:var(--line)] bg-[color:var(--bg-2)] px-3 font-[family-name:var(--v-mono)] text-[13px] text-[color:var(--fg)]">
            {step.key}
          </kbd>
        </li>
      ))}
    </ol>
  );
}

/**
 * Horizontal, snap-scrolling quotes with explicit arrow controls.
 * The rail aligns with the page container on the left and bleeds off the right edge.
 */
export function QuoteRail() {
  const ref = useRef<HTMLUListElement>(null);
  const scrollBy = (dir: 1 | -1) =>
    ref.current?.scrollBy({ left: dir * 380, behavior: "smooth" });

  return (
    <div className="[--gutter:max(1.25rem,calc((100vw-80rem)/2+2rem))] md:[--gutter:max(2rem,calc((100vw-80rem)/2+2rem))]">
      <ul
        ref={ref}
        tabIndex={0}
        aria-label="Quotes from people who use Pith"
        className="flex snap-x snap-mandatory scroll-px-(--gutter) gap-4 overflow-x-auto px-(--gutter) pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {QUOTES.map((quote) => (
          <li
            key={quote.name}
            className="flex min-h-[260px] w-[min(82vw,360px)] shrink-0 snap-start flex-col justify-between rounded-xl border border-[color:var(--line)] bg-[color:var(--bg-2)] p-6 transition-colors duration-300 hover:border-[color:var(--accent)]/60"
          >
            <p className="text-xl leading-snug tracking-tight">&ldquo;{quote.body}&rdquo;</p>
            <p className="mt-8 text-sm">
              <span className="font-medium">{quote.name}</span>
              <span className="block text-[color:var(--fg-2)]">{quote.role}</span>
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex gap-2 px-(--gutter)">
        {(
          [
            { dir: -1, label: "Previous quote", Icon: ArrowLeft },
            { dir: 1, label: "Next quote", Icon: ArrowRight },
          ] as const
        ).map(({ dir, label, Icon }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            onClick={() => scrollBy(dir)}
            className="grid size-11 place-items-center rounded-md border border-[color:var(--line)] text-[color:var(--fg)] transition-[background-color,transform,border-color] duration-200 hover:border-[color:var(--fg-3)] hover:bg-[color:var(--bg-2)] active:scale-95"
          >
            <Icon size={18} weight="bold" />
          </button>
        ))}
      </div>
    </div>
  );
}
