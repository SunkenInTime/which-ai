"use client";

import { useRef } from "react";
import {
  motion,
  transform,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";
import {
  BookOpenText,
  ImageSquare,
  Lightbulb,
  LinkSimple,
  Microphone,
  Newspaper,
  Quotes,
  type Icon,
} from "@phosphor-icons/react";

// Scroll-linked values are mapped through a JS function on purpose: Motion's
// hardware-accelerated scroll-timeline path mis-times opacity on a sticky
// target, so these stay on the main-thread motion-value path.
function useMap(p: MotionValue<number>, input: number[], output: number[]): MotionValue<number>;
function useMap(p: MotionValue<number>, input: number[], output: string[]): MotionValue<string>;
function useMap(
  p: MotionValue<number>,
  input: number[],
  output: number[] | string[],
): MotionValue<number> | MotionValue<string> {
  return useTransform(p, (v) => transform(v, input, output as number[]));
}

type Snippet = {
  source: string;
  icon: Icon;
  text: string;
  // ordered slot centre, in % of the stage (mobile / desktop)
  slot: { m: [number, number]; d: [number, number] };
  // where it floats before it is kept, in % of its own size, and a tilt
  from: { x: number; y: number; r: number };
};

const SNIPPETS: Snippet[] = [
  {
    source: "Saved quote",
    icon: Quotes,
    text: "“The best way to have a good idea is to have lots of ideas.” Linus Pauling",
    slot: { m: [27, 17], d: [18, 27] },
    from: { x: -40, y: 70, r: -11 },
  },
  {
    source: "Voice memo, 11:42pm",
    icon: Microphone,
    text: "What if chapter 3 opens at the harbour instead of the flat?",
    slot: { m: [27, 83], d: [18, 73] },
    from: { x: 90, y: -120, r: 8 },
  },
  {
    source: "Clipped article",
    icon: Newspaper,
    text: "Testing yourself beats rereading for anything you want to remember next month.",
    slot: { m: [73, 50], d: [82, 27] },
    from: { x: -150, y: 110, r: 7 },
  },
  {
    source: "Screenshot",
    icon: ImageSquare,
    text: "Fishing boats at dawn. Colours for the chapter 3 opening.",
    slot: { m: [73, 83], d: [50, 73] },
    from: { x: 130, y: 40, r: -14 },
  },
  {
    source: "Essay idea",
    icon: Lightbulb,
    text: "Why do we underline books we never open again?",
    slot: { m: [73, 17], d: [50, 27] },
    from: { x: 30, y: 150, r: 13 },
  },
  {
    source: "Lecture notes",
    icon: BookOpenText,
    text: "Week 7: memory is rebuilt every time you recall it, not replayed.",
    slot: { m: [27, 50], d: [82, 73] },
    from: { x: -110, y: -90, r: -6 },
  },
];

// pairs of snippet indexes that get linked once the notes settle
const LINKS: [number, number][] = [
  [0, 4],
  [4, 2],
  [2, 5],
  [1, 3],
];

function SnippetCard({
  s,
  i,
  progress,
}: {
  s: Snippet;
  i: number;
  progress: MotionValue<number>;
}) {
  const start = 0.08 + i * 0.035;
  const end = 0.55 + i * 0.025;
  const x = useMap(progress, [start, end], [`${s.from.x}%`, "0%"]);
  const y = useMap(progress, [start, end], [`${s.from.y}%`, "0%"]);
  const rotate = useMap(progress, [start, end], [s.from.r, 0]);
  const linked = useMap(progress, [0.62, 0.78], [0, 1]);
  const Glyph = s.icon;

  return (
    <motion.li
      style={
        {
          x,
          y,
          rotate,
          "--m-l": `${s.slot.m[0]}%`,
          "--m-t": `${s.slot.m[1]}%`,
          "--d-l": `${s.slot.d[0]}%`,
          "--d-t": `${s.slot.d[1]}%`,
        } as unknown as MotionStyle
      }
      className="absolute left-(--m-l) top-(--m-t) w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-(--v4-line) bg-(--v4-raised) p-4 shadow-(--v4-shadow) md:left-(--d-l) md:top-(--d-t) md:w-[29%] md:p-6"
    >
      <p className="flex items-center gap-2 text-xs font-semibold text-(--v4-accent-ink) md:text-sm">
        <Glyph size={16} weight="bold" aria-hidden />
        {s.source}
      </p>
      <p className="mt-2 text-sm leading-snug md:mt-3 md:text-lg">{s.text}</p>
      <motion.p
        style={{ opacity: linked }}
        className="mt-3 hidden items-center gap-1.5 text-xs text-(--v4-muted) sm:flex"
      >
        <LinkSimple size={14} weight="bold" aria-hidden />
        Linked
      </motion.p>
    </motion.li>
  );
}

function Wire({
  a,
  b,
  which,
  draw,
}: {
  a: [number, number];
  b: [number, number];
  which: "m" | "d";
  draw: MotionValue<number>;
}) {
  // Every link sits on one axis, so a connector is a bar that grows from
  // one card centre to the other (scaleX / scaleY, transform only).
  const horizontal = a[1] === b[1];
  const left = Math.min(a[0], b[0]);
  const top = Math.min(a[1], b[1]);
  const box = horizontal
    ? { left: `${left}%`, top: `${top}%`, width: `${Math.abs(a[0] - b[0])}%`, height: 3 }
    : { left: `${left}%`, top: `${top}%`, height: `${Math.abs(a[1] - b[1])}%`, width: 3 };
  return (
    <motion.span
      aria-hidden
      style={{
        ...box,
        scaleX: horizontal ? draw : 1,
        scaleY: horizontal ? 1 : draw,
      }}
      className={`absolute -translate-x-px -translate-y-px rounded-full bg-(--v4-accent) ${
        horizontal ? "origin-left" : "origin-top"
      } ${which === "m" ? "md:hidden" : "hidden md:block"}`}
    />
  );
}

function Wires({ progress }: { progress: MotionValue<number> }) {
  const draw = useMap(progress, [0.58, 0.8], [0, 1]);
  return (
    <>
      {(["m", "d"] as const).flatMap((which) =>
        LINKS.map(([a, b]) => (
          <Wire
            key={`${which}-${a}-${b}`}
            a={SNIPPETS[a].slot[which]}
            b={SNIPPETS[b].slot[which]}
            which={which}
            draw={draw}
          />
        )),
      )}
    </>
  );
}

/**
 * Before/after: loose snippets drift into a tidy grid and get wired together
 * as the section scrolls past. Driven by useScroll + useTransform only.
 * Reduced motion skips the choreography and shows the settled state.
 */
export function ScatterToOrder() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const settled = useMotionValue(1);
  const progress = reduce ? settled : scrollYProgress;

  const beforeOpacity = useMap(progress, [0, 0.3, 0.42], [1, 1, 0]);
  const beforeY = useMap(progress, [0.3, 0.42], ["0%", "-40%"]);
  const afterOpacity = useMap(progress, [0.45, 0.6], [0, 1]);
  const afterY = useMap(progress, [0.45, 0.6], ["40%", "0%"]);

  return (
    <section
      id="how"
      ref={ref}
      className={`relative overflow-x-clip ${reduce ? "" : "h-[300vh]"}`}
      aria-labelledby="how-title"
    >
      <div
        className={`${reduce ? "py-24" : "sticky top-0 h-[100dvh]"} mx-auto flex max-w-[1400px] flex-col px-5 pt-16 md:px-10 md:pt-20`}
      >
        <div className="relative grid">
          {!reduce && (
            <motion.p
              aria-hidden
              style={{ opacity: beforeOpacity, y: beforeY }}
              className="v4-display col-start-1 row-start-1 max-w-[16ch] text-4xl font-[700] leading-[1.02] tracking-[-0.035em] md:text-6xl"
            >
              Right now your ideas live in every app you own.
            </motion.p>
          )}
          <motion.h2
            id="how-title"
            style={{ opacity: afterOpacity, y: afterY }}
            className="v4-display col-start-1 row-start-1 max-w-[16ch] text-4xl font-[700] leading-[1.02] tracking-[-0.035em] md:text-6xl"
          >
            In Kept they land in one place and{" "}
            <span className="text-(--v4-accent-ink)">find each other.</span>
          </motion.h2>
        </div>

        <div className="relative mt-8 min-h-[600px] flex-1 md:min-h-[440px] md:mt-4 md:mb-10">
          <Wires progress={progress} />
          <ul className="contents">
            {SNIPPETS.map((s, i) => (
              <SnippetCard key={s.source} s={s} i={i} progress={progress} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
