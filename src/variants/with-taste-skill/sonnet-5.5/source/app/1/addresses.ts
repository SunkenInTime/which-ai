import { NOTES, type Note } from "../_shared/facts";

/**
 * Luhmann-style card addresses for the sample notes. A trunk number, a slash,
 * then a branch that alternates digits and letters: 21/3 has a child 21/3a,
 * which has a child 21/3a1, and so on. The address says where an idea grew from.
 */
export const ADDR: Record<string, string> = {
  forgetting: "21/3",
  spacing: "21/3a",
  retrieval: "21/3a1",
  slipbox: "21/4",
  atomic: "21/4a",
  writing: "21/5",
  "interview-maya": "7/2",
  pricing: "7/2a",
  trust: "7/2b",
  files: "7/2b1",
  shelf: "33/1",
  oak: "33/1a",
  lisbon: "40/1",
  sourdough: "52/1",
};

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

/** The first free address one step below `parent`. */
export function childAddress(parent: string): string {
  const taken = new Set(Object.values(ADDR));
  const afterDigit = /\d$/.test(parent);
  for (let i = 0; i < LETTERS.length; i++) {
    const candidate = parent + (afterDigit ? LETTERS[i] : String(i + 1));
    if (!taken.has(candidate)) return candidate;
  }
  return parent + "z";
}

/** The next free trunk, for a card that links to nothing yet. */
export function nextTrunk(): string {
  const trunks = Object.values(ADDR).map((a) => parseInt(a.split("/")[0], 10));
  return `${Math.max(...trunks) + 1}/1`;
}

const STOP = new Set(
  "about after again also because been before being could does doing from have into just like more much only other over said should some than that their them then there these they this those through very want what when where which while with without would your".split(
    " ",
  ),
);

const words = (text: string) =>
  new Set(
    text
      .toLowerCase()
      .replace(/\[\[[^\]]*\]\]/g, " ")
      .split(/[^a-zà-ÿ]+/)
      .filter((w) => w.length >= 4 && !STOP.has(w))
      .map((w) => w.slice(0, 5)),
  );

const NOTE_WORDS: Record<string, Set<string>> = Object.fromEntries(
  NOTES.map((n) => [n.id, words(`${n.title} ${n.title} ${n.body}`)]),
);

export type Suggestion = { note: Note; shared: string[] };

/** The words of the draft by their five-letter stem, so a match can be shown as the word the writer used. */
function spelled(text: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const w of text
    .toLowerCase()
    .replace(/\[\[[^\]]*\]\]/g, " ")
    .split(/[^a-zà-ÿ]+/)) {
    if (w.length >= 4 && !STOP.has(w) && !map.has(w.slice(0, 5))) map.set(w.slice(0, 5), w);
  }
  return map;
}

/** Notes that share the most words with the draft, best first. */
export function suggest(text: string, exclude: Set<string>): Suggestion[] {
  const mine = words(text);
  if (mine.size === 0) return [];
  const shown = spelled(text);
  return NOTES.filter((n) => !exclude.has(n.id))
    .map((note) => {
      const shared = [...NOTE_WORDS[note.id]]
        .filter((w) => mine.has(w))
        .map((w) => shown.get(w) ?? w);
      return { note, shared };
    })
    .filter((s) => s.shared.length >= 2)
    .sort((a, b) => b.shared.length - a.shared.length)
    .slice(0, 3);
}

/** The notes a draft already links to with [[Title]]. */
export function linkedIn(text: string): Note[] {
  const found: Note[] = [];
  for (const m of text.matchAll(/\[\[([^\]]+)\]\]/g)) {
    const q = m[1].trim().toLowerCase();
    const hit = NOTES.find(
      (n) => n.title.toLowerCase() === q || n.title.toLowerCase().includes(q),
    );
    if (hit && !found.includes(hit)) found.push(hit);
  }
  return found;
}

/** Notes whose title matches what has been typed after an open [[ . */
export function pick(query: string): Note[] {
  const q = query.trim().toLowerCase();
  return NOTES.filter((n) => !q || n.title.toLowerCase().includes(q)).slice(0, 4);
}
