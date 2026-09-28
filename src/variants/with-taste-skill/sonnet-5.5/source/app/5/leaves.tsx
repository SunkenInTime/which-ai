"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  ArrowsClockwise,
  Check,
  FolderSimple,
  Lightning,
  LinkSimple,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { Photo } from "../_components/photo";
import { cn } from "../_lib/cn";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Try it", href: "#try" },
  { label: "Privacy", href: "#privacy" },
] as const;

/** Nav links with a marker that glides to whichever one you point at. */
export function NavLinks() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <nav
      aria-label="Primary"
      onMouseLeave={() => setHovered(null)}
      className="hidden items-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface,var(--bg-2))] p-1 md:flex"
    >
      {NAV_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onMouseEnter={() => setHovered(link.label)}
          onFocus={() => setHovered(link.label)}
          onBlur={() => setHovered(null)}
          className="relative rounded-full px-4 py-2 text-[15px] font-medium"
        >
          {hovered === link.label && (
            <motion.span
              layoutId="nav-marker"
              className="absolute inset-0 rounded-full bg-[color:var(--accent)]"
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
            />
          )}
          <span
            className={cn(
              "relative transition-colors duration-150",
              hovered === link.label ? "text-[color:var(--on-accent)]" : "text-[color:var(--fg-2)]",
            )}
          >
            {link.label}
          </span>
        </a>
      ))}
    </nav>
  );
}

const STRIPS = [
  {
    title: "Capture",
    body: "One shortcut, any app. Clip pages, dictate, or forward an email into one inbox.",
    photo: 63,
    alt: "A white cup of coffee seen from above on a saturated red table",
    Icon: Lightning,
  },
  {
    title: "Link",
    body: "Type [[ and pick a note. The link shows up on both sides.",
    photo: 157,
    alt: "A white skateboard leaning beside a metal stool against a white wall",
    Icon: LinkSimple,
  },
  {
    title: "Ask",
    body: "Ask in plain English. Answers come from your notes, and the notes are listed.",
    photo: 174,
    alt: "A hot air balloon rising over green palm trees in warm haze",
    Icon: MagnifyingGlass,
  },
  {
    title: "Return",
    body: "A few old notes come back each morning, picked to fit what you are working on.",
    photo: 163,
    alt: "A cafe table under a green vine with potted flowers",
    Icon: ArrowsClockwise,
  },
  {
    title: "Keep",
    body: "Plain Markdown files in a folder you own. Leave any time and take everything.",
    photo: 225,
    alt: "A glass teapot beside a small bunch of yellow roses",
    Icon: FolderSimple,
  },
] as const;

/**
 * Accordion of photo strips. Hover or focus one and it opens while the others
 * fold down to an icon. Layout animation runs on transforms, not width.
 */
export function Strips() {
  const [active, setActive] = useState(0);
  return (
    <ul className="flex h-[680px] flex-col gap-3 md:h-[540px] md:flex-row">
      {STRIPS.map((strip, i) => {
        const open = i === active;
        return (
          <motion.li
            key={strip.title}
            layout
            style={{ borderRadius: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 28 }}
            onMouseEnter={() => setActive(i)}
            className={cn(
              "relative min-h-0 min-w-0 overflow-hidden text-zinc-50",
              open ? "flex-[6]" : "flex-1",
            )}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-label={strip.title}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="absolute inset-0 text-left"
            >
              <motion.div layout className="absolute inset-0 bg-[color:var(--bg-2)]">
                <Photo id={strip.photo} alt={strip.alt} sizes="(min-width: 768px) 60vw, 100vw" />
              </motion.div>
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-zinc-950/20 to-zinc-950/10"
              />
              <motion.div
                layout="position"
                className="relative flex h-full flex-col justify-between p-4 md:p-6"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[color:var(--surface,var(--bg-2))] text-[color:var(--fg)]">
                  <strip.Icon size={22} weight="bold" />
                </span>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="copy"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.08 } }}
                      transition={{ duration: 0.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
                        {strip.title}
                      </h3>
                      <p className="mt-2 max-w-[36ch] text-base leading-snug text-zinc-100 md:text-lg">
                        {strip.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </button>
          </motion.li>
        );
      })}
    </ul>
  );
}

const ESSAY = [
  "Before printing was cheap, readers copied the passages they wanted to keep into a notebook.",
  "The notebook was not a summary of the book. It was a record of what the reader found useful.",
  "Over the years it became a second memory, organized by the reader's own questions.",
  "Pith works the same way: you save the parts that matter, and it remembers where they came from.",
] as const;

/** Click a sentence to highlight it and watch it land in the notes panel. */
export function HighlightDemo() {
  const [saved, setSaved] = useState<number[]>([]);
  const toggle = (i: number) =>
    setSaved((prev) => (prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i]));

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <article className="rounded-[20px] border border-[color:var(--line)] bg-[color:var(--surface,var(--bg-2))] p-7 md:p-10 lg:col-span-7">
        <h3 className="text-xl font-semibold tracking-tight">On commonplace books</h3>
        <p className="mt-6 text-xl leading-[1.75] md:text-[1.6rem] md:leading-[1.7]">
          {ESSAY.map((sentence, i) => {
            const on = saved.includes(i);
            return (
              <button
                key={sentence}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(i)}
                className={cn(
                  "mr-1 inline rounded-[6px] text-left transition-[background-color,box-shadow] duration-300 [box-decoration-break:clone] hover:bg-[color:var(--accent)]/40 focus-visible:bg-[color:var(--accent)]/40",
                  on && "bg-[color:var(--accent)] text-[color:var(--on-accent)] hover:bg-[color:var(--accent)]",
                )}
              >
                {sentence}
              </button>
            );
          })}
        </p>
      </article>

      <aside
        aria-live="polite"
        className="rounded-[20px] border border-dashed border-[color:var(--fg-3)]/50 p-7 md:p-8 lg:col-span-5"
      >
        <h3 className="text-xl font-semibold tracking-tight">Reading notes</h3>
        {saved.length === 0 ? (
          <p className="mt-4 max-w-[30ch] text-lg leading-snug text-[color:var(--fg-2)]">
            Nothing saved yet. Click a sentence on the left and it lands here.
          </p>
        ) : (
          <ul className="mt-5 space-y-3">
            <AnimatePresence initial={false}>
              {[...saved]
                .sort((a, b) => a - b)
                .map((i) => (
                  <motion.li
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="rounded-2xl bg-[color:var(--bg-2)] p-4"
                  >
                    <p className="leading-snug">
                      <span className="rounded-[4px] bg-[color:var(--accent)] px-1 text-[color:var(--on-accent)] [box-decoration-break:clone]">
                        {ESSAY[i]}
                      </span>
                    </p>
                    <p className="mt-3 flex items-center gap-1.5 text-[13px] text-[color:var(--fg-2)]">
                      <Check size={14} weight="bold" />
                      From On commonplace books
                    </p>
                  </motion.li>
                ))}
            </AnimatePresence>
          </ul>
        )}
      </aside>
    </div>
  );
}
