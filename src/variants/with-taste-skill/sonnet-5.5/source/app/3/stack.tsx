"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { Photo } from "../_components/photo";
import { cn } from "../_lib/cn";

const CARDS = [
  {
    verb: "Capture",
    body: "A shortcut opens a blank note over whatever you are doing. Clip a page, dictate a thought, forward an email. It all lands in one inbox.",
    photo: 252,
    alt: "Typewriter parts laid out in rows on a white surface",
    tone: "bg-[color:var(--bg-2)]",
  },
  {
    verb: "Link",
    body: "Type [[ and pick a note. The link works in both directions, so the older note knows about the new one without you touching it.",
    photo: 36,
    alt: "Small electronic parts arranged in a neat grid on white",
    tone: "bg-[color:var(--accent)] text-[color:var(--on-accent)]",
  },
  {
    verb: "Ask",
    body: "Ask in plain English. Pith answers from your notes only, and shows you which ones it used, so you can check.",
    photo: 24,
    alt: "An old open book resting on a wooden table",
    tone: "bg-[color:var(--bg)]",
  },
  {
    verb: "Return",
    body: "Every morning a few forgotten notes come back, chosen because they relate to what you are working on now.",
    photo: 175,
    alt: "A black and white clock face showing almost seven",
    tone: "bg-[color:var(--bg-2)]",
  },
  {
    verb: "Keep",
    body: "Notes are plain Markdown files in a folder you own. If Pith disappears tomorrow, your notes do not.",
    photo: 232,
    alt: "Two street lamps glowing at night while snow falls",
    tone: "bg-[color:var(--accent)] text-[color:var(--on-accent)]",
  },
] as const;

function StackCard({
  card,
  index,
  progress,
  reduce,
}: {
  card: (typeof CARDS)[number];
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const total = CARDS.length;
  const isLast = index === total - 1;
  const scale = useTransform(progress, [index / total, (index + 1) / total], [1, 0.95]);
  const veil = useTransform(progress, [index / total, (index + 1) / total], [0, 0.4]);

  return (
    <div className="sticky" style={{ top: `calc(4.5rem + ${index * 14}px)` }}>
      <motion.article
        style={{ scale: reduce || isLast ? 1 : scale, transformOrigin: "50% 0%" }}
        className={cn(
          "relative grid min-h-[min(74dvh,620px)] overflow-hidden border-2 border-[color:var(--line)] lg:grid-cols-12",
          card.tone,
        )}
      >
        <div className="flex flex-col justify-between gap-10 p-6 md:p-10 lg:col-span-7">
          <h3 className="display text-[clamp(3rem,7.4vw,6.75rem)]">{card.verb}</h3>
          <p className="max-w-[40ch] text-lg font-medium leading-snug md:text-xl">{card.body}</p>
        </div>
        <div className="relative min-h-[240px] border-t-2 border-[color:var(--line)] lg:col-span-5 lg:border-l-2 lg:border-t-0">
          <Photo
            id={card.photo}
            alt={card.alt}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="grayscale contrast-[1.1]"
          />
        </div>
        {!isLast && (
          <motion.span
            aria-hidden
            style={{ opacity: reduce ? 0 : veil }}
            className="pointer-events-none absolute inset-0 bg-[color:var(--bg)]"
          />
        )}
      </motion.article>
    </div>
  );
}

/**
 * Real sticky stack: every card pins near the top and the next one slides over it.
 * As a card gets covered it shrinks and dims, so the eye follows the newest one.
 */
export function StackCards() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="relative">
      {CARDS.map((card, i) => (
        <StackCard
          key={card.verb}
          card={card}
          index={i}
          progress={scrollYProgress}
          reduce={reduce}
        />
      ))}
    </div>
  );
}

/**
 * Highlighter band that draws in behind a phrase when it scrolls into view.
 * Block level, so a phrase that wraps on small screens stays inside the band.
 */
export function Marked({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative block px-[0.1em] pb-[0.04em] pt-[0.06em]">
      <motion.span
        aria-hidden
        initial={{ scaleX: reduce ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.9 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="absolute inset-0 origin-left bg-[color:var(--accent)]"
      />
      <span className="relative text-[color:var(--on-accent)]">{children}</span>
    </span>
  );
}
