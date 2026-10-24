import {
  NOTES,
  NOTE_BY_ID,
  RESURFACE_DAYS,
  type Note,
} from "../../_shared/facts";

/**
 * The sample second brain behind every fragment on /5.
 * Titles, ages and link structure come from app/_shared/facts.ts; the bodies here
 * carry the links inline as [[Title]], the way Engram stores them in Markdown.
 * assertLinksMatchFacts() checks that nothing here disagrees with facts.ts.
 */

export type DemoNote = {
  id: string;
  title: string;
  body: string;
  /** Words that make another note worth suggesting while you write. */
  tags: string[];
  /** Days since the note was last opened (drives Resurface). */
  lastOpened: number;
  /** Days since it was written. */
  age: number;
};

const t = (id: string) => NOTE_BY_ID[id].title;
const L = (id: string) => `[[${t(id)}]]`;

const BODIES: Record<string, string> = {
  forgetting: `Ebbinghaus, 1885: most of what we learn is gone within a week unless we return to it. The loss is steepest in the first hour.\n\nThe cure is a schedule: ${L("spacing")}. Trying to recall beats rereading: ${L("retrieval")}. Luhmann’s box did the same job in paper: ${L("slipbox")}.`,
  spacing: `Return to an idea at widening intervals and the curve flattens. 1, 3, 7, 21, 60 days is a good start.\n\nWhy it works: ${L("forgetting")}, and ${L("retrieval")}. Maya’s interview made it concrete: ${L("interview-maya")}.`,
  retrieval: `Trying to recall something strengthens it more than reading it again. A note that asks you a question is worth more than one that tells you an answer.\n\nSee ${L("forgetting")} and ${L("spacing")}. It is why notes feed ${L("writing")}.`,
  slipbox: `About 90,000 index cards, each with a number, each pointing to its neighbours. He said he never had a thought he did not first have in the box.\n\nStart from ${L("atomic")}; the box feeds ${L("writing")}. The curve behind it: ${L("forgetting")}.`,
  atomic: `If a note needs an “and” in its title, it is two notes. Small notes link better.\n\nSee ${L("slipbox")} and ${L("writing")}.`,
  writing: `An essay is a walk through notes you already have. Pick a note, follow its links, and the outline appears.\n\nBuilt on ${L("slipbox")} and ${L("atomic")}. Recall helps: ${L("retrieval")}. For the launch post: ${L("pricing")}.`,
  "interview-maya": `She stopped using her old app because she could not find anything. “I wrote it down. I just can’t say where.”\n\nPrice was not the issue; trust was. See ${L("pricing")} and ${L("trust")}.\n\nWhat she asked for:\n- to see her notes as files, in her own folder\n- to find a note by what it meant, not by what she typed\n- to be reminded of the ones she would otherwise lose\n\nShe forgets what she wrote within a week: ${L("spacing")}.`,
  pricing: `Notes should be free and yours. Charge for the work that costs us something: sync, the model, storage.\n\nFrom ${L("interview-maya")}: it was never the price. ${L("trust")}. For the launch post: ${L("writing")}.`,
  trust: `Plain files. Export is the folder. If the company disappears, nothing is lost.\n\nMaya again: ${L("interview-maya")}. It shapes ${L("pricing")}. Why files: ${L("files")}.`,
  files: `A Markdown file written in 2004 opens today on anything. Few apps from 2004 can say the same.\n\nPart of ${L("trust")}.`,
  shelf: `Alcove is 94 cm wide, 31 cm deep. Oak, 22 mm. Brackets every 40 cm. Spice jars are 6 cm; tall oil bottles need 32 cm of height.\n\nFinish: ${L("oak")}.`,
  oak: `Hardwax oil, two thin coats, sand lightly between them. Wait a day before putting anything wet on it.\n\nFor the ${L("shelf")}.`,
  lisbon: `Train from Porto leaves at 08:12. The place by the tram stop with the custard tarts: Rua de Santa Marta, closed Mondays.`,
  sourdough: `75% hydration, 20% starter, 12 hours at 21 °C. Bake covered for 20 minutes, uncovered for 25.`,
};

const TAGS: Record<string, string[]> = {
  forgetting: ["forget", "week", "curve", "memory"],
  spacing: ["repetition", "interval", "come back", "revisit"],
  retrieval: ["recall", "find", "remember", "reread", "retriev"],
  slipbox: ["luhmann", "index card", "cards", "slip"],
  atomic: ["one idea", "small notes", "atomic"],
  writing: ["essay", "outline", "blank page", "draft", "writing"],
  "interview-maya": ["maya", "interview"],
  pricing: ["price", "pricing", "charge", "sync"],
  trust: ["trust", "leave", "export"],
  files: ["markdown", "plain text", "files", "format"],
  shelf: ["shelf", "alcove", "bracket", "kitchen"],
  oak: ["oak", "wax", "oil", "sand"],
  lisbon: ["lisbon", "train", "porto"],
  sourdough: ["sourdough", "starter", "hydration", "bread"],
};

/** Days since each note was last opened: the numbers Resurface works from. */
const LAST_OPENED: Record<string, number> = {
  forgetting: 60,
  spacing: 21,
  retrieval: 7,
  slipbox: 3,
  shelf: 1,
};

export const DEMO_NOTES: DemoNote[] = NOTES.map((n: Note) => ({
  id: n.id,
  title: n.title,
  body: BODIES[n.id],
  tags: TAGS[n.id] ?? [],
  lastOpened: LAST_OPENED[n.id] ?? n.age,
  age: n.age,
}));

export const HERO_NOTE_ID = "interview-maya";

/* ---------- links ---------- */

const LINK_RE = /\[\[([^[\]\n]+)\]\]/g;

export function titleIndex(notes: DemoNote[]) {
  const map = new Map<string, DemoNote>();
  notes.forEach((n) => map.set(n.title.toLowerCase(), n));
  return map;
}

/** The notes a body links to, in order, without repeats. */
export function outgoing(body: string, notes: DemoNote[]): DemoNote[] {
  const idx = titleIndex(notes);
  const seen = new Set<string>();
  const out: DemoNote[] = [];
  for (const m of body.matchAll(LINK_RE)) {
    const hit = idx.get(m[1].trim().toLowerCase());
    if (hit && !seen.has(hit.id)) {
      seen.add(hit.id);
      out.push(hit);
    }
  }
  return out;
}

export type Excerpt = { text: string; hit: boolean }[];

/** The paragraph of `from` that holds the link to `target`, split so the link can be marked. */
export function contextFor(from: DemoNote, target: DemoNote): Excerpt {
  const para =
    from.body.split("\n\n").find((p) => p.toLowerCase().includes(`[[${target.title.toLowerCase()}]]`)) ??
    from.body;
  const parts: Excerpt = [];
  let last = 0;
  for (const m of para.matchAll(LINK_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) parts.push({ text: para.slice(last, idx), hit: false });
    parts.push({ text: m[1], hit: m[1].toLowerCase() === target.title.toLowerCase() });
    last = idx + m[0].length;
  }
  if (last < para.length) parts.push({ text: para.slice(last), hit: false });
  return parts;
}

/** Every note whose body links to `target`. Links are two-way, so this needs no bookkeeping. */
export function backlinks(target: DemoNote, notes: DemoNote[]): DemoNote[] {
  return notes.filter(
    (n) => n.id !== target.id && outgoing(n.body, notes).some((o) => o.id === target.id),
  );
}

/** Notes worth linking from `current`, by how many of their words the text already uses. */
export function suggestions(current: DemoNote, body: string, notes: DemoNote[], max = 2) {
  const text = body.replace(LINK_RE, " ").toLowerCase();
  const linked = new Set(outgoing(body, notes).map((n) => n.id));
  return notes
    .filter((n) => n.id !== current.id && !linked.has(n.id))
    .map((n) => ({ note: n, score: n.tags.filter((w) => text.includes(w)).length }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((s) => s.note);
}

export const slug = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

/* ---------- ask your notes ---------- */

export type Answer = {
  question: string;
  parts: (string | number)[]; // numbers are footnote marks
  sources: { id: string; quote: string }[];
};

const quote = (id: string, from: string) => ({ id, quote: from });

export const QUESTIONS = [
  "Why did Maya leave her old app?",
  "What did I decide about pricing?",
  "How wide is the kitchen alcove?",
  "When does the Porto train leave?",
  "What did Priya say about hiring?",
] as const;

const CANNED: Answer[] = [
  {
    question: QUESTIONS[0],
    parts: [
      "She stopped using it because she could not find anything she had written",
      1,
      ". It was not the price; it was trust",
      1,
      ". Your notes point to files she can leave with",
      2,
      ".",
    ],
    sources: [
      quote("interview-maya", "“I wrote it down. I just can’t say where.” Price was not the issue; trust was."),
      quote("trust", "Plain files. Export is the folder."),
    ],
  },
  {
    question: QUESTIONS[1],
    parts: [
      "You decided to charge for sync, not for notes",
      1,
      ": notes should be free and yours, and the cost sits in sync, the model and storage",
      1,
      ". Maya’s interview is why: price was not the issue; trust was",
      2,
      ".",
    ],
    sources: [
      quote("pricing", "Notes should be free and yours. Charge for the work that costs us something: sync, the model, storage."),
      quote("interview-maya", "Price was not the issue; trust was."),
    ],
  },
  {
    question: QUESTIONS[2],
    parts: [
      "The alcove is 94 cm wide and 31 cm deep",
      1,
      ". The oak is 22 mm thick, with brackets every 40 cm",
      1,
      ", and tall oil bottles need 32 cm of height",
      1,
      ".",
    ],
    sources: [
      quote("shelf", "Alcove is 94 cm wide, 31 cm deep. Oak, 22 mm. Brackets every 40 cm."),
    ],
  },
  {
    question: QUESTIONS[3],
    parts: [
      "At 08:12",
      1,
      ". The same note says the place with the custard tarts is by the tram stop, on Rua de Santa Marta, and closed on Mondays",
      1,
      ".",
    ],
    sources: [quote("lisbon", "Train from Porto leaves at 08:12.")],
  },
];

const STOP = new Set(
  "what when where which that this with from your have does about their there would should could into than then they them were been some more most also only over such very just like make made says said want how the and for did was are who why can you his her its has not but all any our out too one get got let may per via".split(
    " ",
  ),
);

const words = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));

const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, "").trim();

/** A deliberately small retriever: canned answers for the suggested questions, an honest fallback for the rest. */
export function ask(question: string, notes: DemoNote[] = DEMO_NOTES): Answer {
  const nq = norm(question);
  const canned = CANNED.find((c) => norm(c.question) === nq);
  if (canned) return canned;

  const qw = new Set(words(question));
  const scored = notes
    .map((n) => {
      const nw = new Set(words(`${n.title} ${n.body.replace(LINK_RE, "$1")}`));
      let score = 0;
      qw.forEach((w) => nw.has(w) && score++);
      return { n, score };
    })
    .sort((a, b) => b.score - a.score);
  const best = scored[0];
  if (best && best.score >= 2) {
    const first = best.n.body.split("\n\n")[0];
    return {
      question,
      parts: [
        "Your notes do not answer this directly. The closest match begins: “" +
          first.slice(0, 120).trim() +
          (first.length > 120 ? "…" : "") +
          "”",
        1,
      ],
      sources: [quote(best.n.id, first)],
    };
  }
  return {
    question,
    parts: [
      "Your notes do not say. Nothing in them matches this question, so there is nothing to cite and nothing to make up.",
    ],
    sources: [],
  };
}

/* ---------- resurface ---------- */

export type Due = { id: string; interval: number; next: number | null };

/** The five notes due today, each at the interval it is on. */
export function dueToday(notes: DemoNote[] = DEMO_NOTES): Due[] {
  return notes
    .filter((n) => (RESURFACE_DAYS as readonly number[]).includes(n.lastOpened))
    .sort((a, b) => b.lastOpened - a.lastOpened)
    .slice(0, 5)
    .map((n) => {
      const i = (RESURFACE_DAYS as readonly number[]).indexOf(n.lastOpened);
      return { id: n.id, interval: n.lastOpened, next: RESURFACE_DAYS[i + 1] ?? null };
    });
}

export const noteById = (id: string, notes: DemoNote[] = DEMO_NOTES) =>
  notes.find((n) => n.id === id) as DemoNote;

/* ---------- the map ---------- */

/** Hand-placed positions in a 460 x 340 box: memory on the left, method on top, the product on the right. */
export const MAP_POS: Record<string, [number, number]> = {
  forgetting: [78, 124],
  spacing: [168, 206],
  retrieval: [214, 122],
  slipbox: [96, 46],
  atomic: [214, 36],
  writing: [318, 86],
  pricing: [390, 148],
  "interview-maya": [304, 214],
  trust: [398, 252],
  files: [424, 318],
  shelf: [56, 288],
  oak: [138, 308],
  lisbon: [236, 304],
  sourdough: [318, 312],
};

export function edges(notes: DemoNote[] = DEMO_NOTES) {
  const seen = new Set<string>();
  const out: [string, string][] = [];
  for (const n of notes) {
    for (const o of outgoing(n.body, notes)) {
      const k = [n.id, o.id].sort().join("|");
      if (!seen.has(k)) {
        seen.add(k);
        out.push([n.id, o.id]);
      }
    }
  }
  return out;
}

/** Dev check: the inline links in BODIES must be exactly the links in facts.ts. */
export function assertLinksMatchFacts() {
  for (const n of NOTES) {
    const got = outgoing(BODIES[n.id], DEMO_NOTES).map((x) => x.id).sort();
    const want = [...n.links].sort();
    if (JSON.stringify(got) !== JSON.stringify(want)) {
      console.warn(`[engram demo] links of "${n.id}" differ from facts.ts`, { got, want });
    }
  }
}
