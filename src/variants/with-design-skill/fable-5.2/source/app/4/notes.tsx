"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import s from "./page.module.css";

/* ------------------------------------------------------------------ */
/* The notes. Bodies are written in Mull's own syntax: [[id|label]].   */
/* ------------------------------------------------------------------ */

type Block =
  | string
  | { kind: "entries" }
  | { kind: "qa"; q: string; a: string }
  | { kind: "source"; text: string }
  | { kind: "platforms" }
  | { kind: "download" };

type Note = { title: string; meta?: string; blocks: Block[] };

const NOTES: Record<string, Note> = {
  start: {
    title: "Your second brain starts with one note.",
    blocks: [
      "This is one. You are reading a page written in Mull, a note-taking app that links what you write and brings it back when you need it.",
      "The highlighted words are links. Open one and it stacks up next to this note, the way your own notes will. Start with [[capture|how a thought gets in]], then see what happens when [[links|notes link themselves]] and when [[resurfacing|an old one comes back]].",
      "You can [[ask|ask your notes a question]], and you always know [[files|where they live]]. Mull is free on one device. [[price|The price]] covers sync.",
      { kind: "download" },
    ],
  },
  today: {
    title: "Monday 9 November",
    meta: "Today’s note",
    blocks: [
      "Everything you capture lands here first, with the time. The box below works.",
      { kind: "entries" },
    ],
  },
  capture: {
    title: "Capture",
    blocks: [
      "Press Ctrl+Space in any app. Type the thought, press Enter, carry on. It lands in [[today|today’s note]] with the time.",
      "There is no title to invent and no folder to choose. On a phone, share to Mull, or hold the button and say it aloud.",
    ],
  },
  links: {
    title: "Links",
    blocks: [
      "Type [[ and the first letters of a title. That is the whole syntax.",
      "The other note learns about the link on its own. Look at the foot of this one, under Linked from. Nobody typed that.",
      "When you forget to link, Mull notices that two notes are about the same thing and proposes it with a dashed underline. You accept or dismiss. Nothing is rewired silently.",
      "Two notes written two years apart that found each other: [[desire-paths]] and [[cowpaths]].",
    ],
  },
  resurfacing: {
    title: "Resurfacing",
    blocks: [
      "While you write, Mull shows the notes that bear on the sentence in front of you. The 10:42 entry in [[today|today’s note]] brought up [[spacing-effect]], written in September 2023 and not opened since.",
      "Once a week it also sends a few notes that are about to go cold.",
    ],
  },
  ask: {
    title: "Ask your notes",
    blocks: [
      "Ask a question in plain words. Mull answers from your own notes and names each one it used, so you can check its work.",
      {
        kind: "qa",
        q: "What do I know about spacing things out?",
        a: "Three notes. Review works best just before you would forget: [[spacing-effect]]. The onboarding emails all land on day one: [[today|today, 10:42]]. Without review, most of a new thing is gone in days: [[forgetting-curve]].",
      },
    ],
  },
  files: {
    title: "Where your notes live",
    blocks: [
      "Every note is a plain Markdown file in a folder on your computer. Any editor opens them, and Mull works with no connection.",
      "Sync between devices is encrypted end to end, so nobody at Mull can read a word. Leaving means copying a folder.",
      "This note, as it sits on disk:",
      {
        kind: "source",
        text: "# Where your notes live\n\nEvery note is a plain Markdown file in a\nfolder on your computer.\n\nOne device is free. Sync is in [[Price]].",
      },
      "One device is free. Sync is in [[price|the price]].",
    ],
  },
  price: {
    title: "Price",
    blocks: [
      "Mull is free on one device, with every feature on this page and no limit on notes.",
      "Mull Sync is $6 a month. It keeps every device you own in step, encrypted end to end. Add it from inside the app when you need it.",
      { kind: "download" },
    ],
  },
  download: {
    title: "Download Mull",
    blocks: ["Pick a device. Your first note takes about four seconds.", { kind: "platforms" }],
  },
  "desire-paths": {
    title: "Desire paths",
    meta: "14 March 2024",
    blocks: [
      "People wear the route they want into the grass. Pave those.",
      "The same idea in software: [[cowpaths]]. It only works because the slow layer underneath stays put: [[pace-layers]].",
    ],
  },
  cowpaths: {
    title: "Pave the cowpaths",
    meta: "2 February 2026",
    blocks: [
      "Watch what users already do, then make that the official way.",
      "The bulk edit request is exactly this. People export to a spreadsheet, fix forty rows and import them again. See [[desire-paths]].",
    ],
  },
  "pace-layers": {
    title: "Pace layers",
    meta: "30 August 2022",
    blocks: ["Fast layers learn. Slow layers remember.", "From Stewart Brand, How Buildings Learn."],
  },
  "spacing-effect": {
    title: "Spacing effect",
    meta: "2 September 2023",
    blocks: [
      "Review just before you would forget, and the curve flattens.",
      "The curve in question: [[forgetting-curve]].",
    ],
  },
  "forgetting-curve": {
    title: "Forgetting curve",
    meta: "2 September 2023",
    blocks: ["Ebbinghaus, 1885. Without review, most of a new thing is gone in days."],
  },
};

type Entry = { time: string; text: string; related: string[]; mine?: boolean };

const FIRST_ENTRIES: Entry[] = [
  { time: "09:14", text: "Priya: the fourth onboarding email has a 6% open rate.", related: [] },
  {
    time: "10:42",
    text: "Onboarding emails all land on day one. Space them out?",
    related: ["spacing-effect"],
  },
];

/* The real app compares meaning. This page knows five sample notes and a few words each. */
const HINTS: Record<string, string[]> = {
  "spacing-effect": ["space", "spacing", "review", "repeat", "revis", "remind", "schedule", "email"],
  "forgetting-curve": ["forget", "memory", "remember", "recall"],
  "desire-paths": ["path", "shortcut", "workaround", "route", "walk", "habit", "design"],
  cowpaths: ["user", "feature", "export", "spreadsheet", "bulk", "customer", "request"],
  "pace-layers": ["slow", "fast", "layer", "change", "building", "pace"],
};

function relatedTo(text: string) {
  const lower = text.toLowerCase();
  return Object.entries(HINTS)
    .map(([id, words]) => ({ id, score: words.filter((w) => lower.includes(w)).length }))
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((m) => m.id);
}

const LINK = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

function linksIn(note: Note) {
  const found: string[] = [];
  for (const block of note.blocks) {
    if (typeof block !== "string" && block.kind === "download") found.push("download");
    const text = typeof block === "string" ? block : block.kind === "qa" ? block.a : "";
    for (const m of text.matchAll(LINK)) found.push(m[1]);
  }
  return found;
}

function linkedFrom(id: string, entries: Entry[]) {
  const from = Object.keys(NOTES).filter((other) => other !== id && linksIn(NOTES[other]).includes(id));
  if (id !== "today" && !from.includes("today") && entries.some((e) => e.related.includes(id))) {
    from.push("today");
  }
  return from;
}

/* ------------------------------------------------------------------ */

const SPINE = 48;
const DESKTOP = "(min-width: 860px)";

export function Notes() {
  const [stack, setStack] = useState(["start", "today"]);
  const [fresh, setFresh] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [covered, setCovered] = useState<boolean[]>([]);
  const [entries, setEntries] = useState(FIRST_ENTRIES);
  const [draft, setDraft] = useState("");

  const scroller = useRef<HTMLDivElement>(null);
  const panes = useRef<(HTMLElement | null)[]>([]);

  const reveal = useCallback((index: number) => {
    const el = panes.current[index];
    const box = scroller.current;
    if (!el || !box) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = calm ? "auto" : "smooth";
    if (window.matchMedia(DESKTOP).matches) {
      // Where each note starts, and the scroll positions at which the notes
      // before it are tucked away as whole spines rather than cut in half.
      const lefts: number[] = [];
      let total = 0;
      for (let i = 0; i <= index; i++) {
        lefts.push(total);
        total += panes.current[i]?.offsetWidth ?? 0;
      }
      const tidy = lefts.map((left, i) => left - i * SPINE);
      const max = box.scrollWidth - box.clientWidth;
      const fit = Math.max(0, total - box.clientWidth);
      if (box.scrollLeft < fit) {
        box.scrollTo({ left: tidy.find((t) => t >= fit && t <= max) ?? fit, behavior });
      } else if (box.scrollLeft > tidy[index]) {
        box.scrollTo({ left: tidy[index], behavior });
      }
    } else {
      el.scrollIntoView({ behavior, block: "start" });
    }
    el.querySelector<HTMLElement>("[data-title]")?.focus({ preventScroll: true });
  }, []);

  const open = (from: number, id: string) => {
    const at = stack.indexOf(id);
    if (at !== -1 && at <= from + 1) {
      setFlash(id);
      window.setTimeout(() => setFlash(null), 700);
      reveal(at);
      return;
    }
    setStack([...stack.slice(0, from + 1), id]);
    setFresh(id);
  };

  const close = (index: number) => {
    setStack(stack.slice(0, index));
    setFresh(null);
  };

  // Bring a newly opened note into view once it exists.
  useEffect(() => {
    if (fresh) reveal(stack.indexOf(fresh));
  }, [fresh, stack, reveal]);

  // A note that has slid under its neighbour shows only its spine.
  useEffect(() => {
    const box = scroller.current;
    if (!box) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const next = stack.map((_, i) => {
        const a = panes.current[i]?.getBoundingClientRect();
        const b = panes.current[i + 1]?.getBoundingClientRect();
        if (!a || !b || !window.matchMedia(DESKTOP).matches) return false;
        return a.right - b.left > a.width - SPINE - 110;
      });
      setCovered((prev) =>
        prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next,
      );
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    queue();
    box.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(frame);
      box.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [stack]);

  const capture = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    setEntries([...entries, { time, text, related: relatedTo(text), mine: true }]);
    setDraft("");
  };

  const rich = (text: string, from: number) => {
    const out: ReactNode[] = [];
    let last = 0;
    for (const m of text.matchAll(LINK)) {
      const index = m.index ?? 0;
      if (index > last) out.push(text.slice(last, index));
      const id = m[1];
      out.push(
        <a
          key={index}
          href={`#${id}`}
          className={s.link}
          data-open={stack[from + 1] === id ? "" : undefined}
          onClick={(e) => {
            e.preventDefault();
            open(from, id);
          }}
        >
          {m[2] ?? NOTES[id].title}
        </a>,
      );
      last = index + m[0].length;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
  };

  const block = (b: Block, key: number, from: number) => {
    if (typeof b === "string") {
      return (
        <p key={key} className={s.p}>
          {rich(b, from)}
        </p>
      );
    }
    if (b.kind === "download") {
      return (
        <p key={key} className={s.actions}>
          <a
            href="#download"
            className={s.cta}
            onClick={(e) => {
              e.preventDefault();
              open(from, "download");
            }}
          >
            Download Mull
          </a>
          <span className={s.aside}>Free on one device.</span>
        </p>
      );
    }
    if (b.kind === "platforms") {
      return (
        <ul key={key} className={s.platforms}>
          <li>
            <a className={s.cta} href="#download">
              Download for Windows
            </a>
          </li>
          {["Mac", "Linux", "iPhone", "Android"].map((name) => (
            <li key={name}>
              <a className={s.quiet} href="#download">
                {name}
              </a>
            </li>
          ))}
        </ul>
      );
    }
    if (b.kind === "qa") {
      return (
        <div key={key} className={s.qa}>
          <p className={s.q}>{b.q}</p>
          <p className={s.a}>{rich(b.a, from)}</p>
        </div>
      );
    }
    if (b.kind === "source") {
      return (
        <pre key={key} className={s.source}>
          {b.text}
        </pre>
      );
    }
    return (
      <div key={key}>
        <ol className={s.entries}>
          {entries.map((entry, i) => (
            <li key={i} className={s.entry} data-mine={entry.mine ? "" : undefined}>
              <time>{entry.time}</time>
              <div>
                <p>{entry.text}</p>
                {entry.related.length > 0 ? (
                  <p className={s.related}>
                    Mull suggests{" "}
                    {entry.related.map((id, n) => (
                      <span key={id}>
                        {n > 0 ? " and " : ""}
                        <a
                          href={`#${id}`}
                          className={s.suggest}
                          onClick={(e) => {
                            e.preventDefault();
                            open(from, id);
                          }}
                        >
                          {NOTES[id].title}
                        </a>
                      </span>
                    ))}
                  </p>
                ) : entry.mine ? (
                  <p className={s.related}>
                    Nothing related among the five sample notes on this page. Mull itself checks
                    everything you have written.
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
        <form className={s.captureForm} onSubmit={capture}>
          <label className={s.srOnly} htmlFor="capture-box">
            Write a thought
          </label>
          <input
            id="capture-box"
            className={s.captureInput}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write a thought, press Enter"
            autoComplete="off"
            maxLength={140}
          />
          <button type="submit" className={s.captureButton}>
            Capture
          </button>
        </form>
      </div>
    );
  };

  return (
    <>
      <header className={s.bar}>
        <a
          className={s.wordmark}
          href="#start"
          onClick={(e) => {
            e.preventDefault();
            reveal(0);
          }}
        >
          Mull
        </a>
        <a
          className={s.barButton}
          href="#download"
          onClick={(e) => {
            e.preventDefault();
            open(stack.length - 1, "download");
          }}
        >
          Download Mull
        </a>
      </header>

      <main className={s.panes} ref={scroller}>
        {stack.map((id, index) => {
          const note = NOTES[id];
          const back = linkedFrom(id, entries);
          const Title = index === 0 ? "h1" : "h2";
          return (
            <article
              key={id}
              id={id}
              ref={(el) => {
                panes.current[index] = el;
              }}
              className={s.pane}
              style={{ "--i": index } as CSSProperties}
              data-new={fresh === id ? "" : undefined}
              data-flash={flash === id ? "" : undefined}
              data-covered={covered[index] ? "" : undefined}
              aria-label={note.title}
            >
              <button
                type="button"
                className={s.spine}
                tabIndex={covered[index] ? 0 : -1}
                aria-hidden={!covered[index]}
                onClick={() => reveal(index)}
              >
                {note.title}
              </button>

              <div className={s.paneInner}>
                <div className={s.paneTop}>
                  <p className={s.meta}>{note.meta}</p>
                  {index > 0 ? (
                    <button type="button" className={s.close} onClick={() => close(index)}>
                      Close
                    </button>
                  ) : null}
                </div>
                <Title className={s.title} data-title tabIndex={-1}>
                  {note.title}
                </Title>
                {note.blocks.map((b, i) => block(b, i, index))}

                {back.length > 0 ? (
                  <footer className={s.linkedFrom}>
                    <h3>Linked from</h3>
                    <ul>
                      {back.map((from) => (
                        <li key={from}>
                          <a
                            href={`#${from}`}
                            className={s.backlink}
                            onClick={(e) => {
                              e.preventDefault();
                              open(index, from);
                            }}
                          >
                            {NOTES[from].title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </footer>
                ) : null}
              </div>
            </article>
          );
        })}
        <div className={s.ghost} aria-hidden="true">
          <p>Notes you open stack up here.</p>
        </div>
      </main>
    </>
  );
}
