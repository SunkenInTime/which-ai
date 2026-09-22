"use client";

import { useRef } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const PEOPLE = [
  {
    quote: "My lit review lived in forty tabs. Now each paper links to the ones it argues with.",
    name: "Ngozi Okafor",
    role: "PhD student, cognitive neuroscience",
  },
  {
    quote: "A line I wrote two years ago showed up next to the chapter I was stuck on.",
    name: "Mateus Carvalho",
    role: "Novelist",
  },
  {
    quote: "I ask what we decided about onboarding and get an answer citing the meeting notes.",
    name: "Hana Kobayashi",
    role: "Product lead",
  },
  {
    quote: "Plain Markdown files on my own laptop is what sold me. The rest was a bonus.",
    name: "Aoife Brennan",
    role: "History teacher",
  },
  {
    quote: "Voice memos from the bus are transcribed and linked before I sit down to draw.",
    name: "Tomás Riera",
    role: "Illustration student",
  },
  {
    quote: "Old interview notes resurface right when a new study needs them.",
    name: "Priya Raman",
    role: "Public health researcher",
  },
];

/** Draggable testimonial rail. Motion drag with the viewport as constraints, plus buttons for keyboard users. */
export function Testimonials() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const reduce = useReducedMotion();

  function step(dir: 1 | -1) {
    const v = viewport.current;
    const t = track.current;
    if (!v || !t) return;
    const card = t.firstElementChild as HTMLElement | null;
    const amount = (card?.offsetWidth ?? 360) + 20;
    const min = Math.min(0, v.offsetWidth - t.scrollWidth);
    const target = Math.max(min, Math.min(0, x.get() - dir * amount));
    animate(x, target, reduce ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 26 });
  }

  return (
    <section aria-labelledby="people-title" className="py-32 md:py-44">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between md:px-10">
        <h2
          id="people-title"
          className="v4-display max-w-[14ch] text-5xl font-[700] leading-[1] tracking-[-0.04em] md:text-7xl"
        >
          People who stopped losing things.
        </h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous testimonials"
            className="grid size-14 place-items-center rounded-full ring-1 ring-(--v4-line) transition-colors hover:bg-(--v4-accent) hover:text-(--v4-on-accent) hover:ring-(--v4-accent) active:scale-[0.96]"
          >
            <ArrowLeft size={22} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next testimonials"
            className="grid size-14 place-items-center rounded-full ring-1 ring-(--v4-line) transition-colors hover:bg-(--v4-accent) hover:text-(--v4-on-accent) hover:ring-(--v4-accent) active:scale-[0.96]"
          >
            <ArrowRight size={22} weight="bold" />
          </button>
        </div>
      </div>

      <div ref={viewport} className="mx-auto mt-14 max-w-[1400px] overflow-hidden px-5 md:px-10">
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={viewport}
          dragElastic={0.12}
          style={{ x }}
          className="flex w-max cursor-grab gap-5 active:cursor-grabbing"
        >
          {PEOPLE.map((p, i) => (
            <figure
              key={p.name}
              className={`flex min-h-[15rem] w-[82vw] shrink-0 select-none flex-col justify-between rounded-[28px] p-7 sm:w-[30rem] md:p-9 ${
                i === 1
                  ? "bg-(--v4-accent) text-(--v4-on-accent)"
                  : i % 2 === 0
                    ? "bg-(--v4-surface)"
                    : "v4-dots bg-(--v4-raised) ring-1 ring-(--v4-line)"
              } ${i % 3 === 2 ? "md:mt-12" : ""}`}
            >
              <blockquote className="v4-display text-lg font-[600] leading-[1.2] tracking-[-0.015em] sm:text-2xl">
                &ldquo;{p.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-semibold">{p.name}</p>
                <p className={i === 1 ? "text-(--v4-on-accent)/80" : "text-(--v4-muted)"}>{p.role}</p>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
