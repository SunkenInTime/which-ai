// Sample notes for the interface fragments on every iteration. One dataset, so the five designs are
// compared on design alone. All of it is sample content to be replaced by a real user's notebook.

export type Kind = "reading" | "kitchen" | "garden" | "travel" | "idea" | "people" | "hub";

export type Note = {
  id: string;
  title: string;
  date: string; // ISO date the note was written
  kind: Kind;
  body: string;
  links: string[]; // ids this note links to
};

export const notes: Note[] = [
  { id: "sourdough", title: "Sourdough at 78% hydration", date: "2026-03-14", kind: "kitchen", body: "The kitchen is cold in March. 78% hydration, a twelve-hour cold proof, and the crumb finally opened. Next time, a little less salt and a hotter oven.", links: ["kitchen-notes", "oven-temperatures"] },
  { id: "forgetting-curve", title: "The forgetting curve", date: "2025-11-02", kind: "reading", body: "Ebbinghaus, 1885. After twenty minutes about 58% is left, after an hour 44%, after a day 34%, after a month 21%. Every review flattens the curve.", links: ["spacing", "second-brain"] },
  { id: "luhmann", title: "Luhmann’s 90,000 slips", date: "2025-09-28", kind: "reading", body: "Forty-five years, one set of wooden drawers, about 90,000 slips. He called the box his second memory and said it answered back.", links: ["second-brain", "index-cards"] },
  { id: "locke", title: "Locke’s index, 1706", date: "2026-01-19", kind: "reading", body: "A New Method of Making Common-Place-Books. Two pages of index: every heading is filed by its first letter and the first vowel after it. Memory goes under M e.", links: ["commonplace-books", "second-brain"] },
  { id: "olive", title: "Repot the olive in March", date: "2026-02-07", kind: "garden", body: "The olive on the balcony wants a pot two sizes up and gritty soil. Do it before the first warm week, not after.", links: ["balcony"] },
  { id: "calvino", title: "Calvino on lightness", date: "2025-12-12", kind: "reading", body: "“Lightness for me goes with precision and determination, not with vagueness.” Six Memos, the first lecture.", links: ["reading-list"] },
  { id: "porto-bridge", title: "Why the Porto bridge is iron", date: "2026-04-02", kind: "travel", body: "Dona Maria Pia, 1877, from Eiffel’s office. Iron because stone could not span the Douro in one arch. Compare the Garabit viaduct.", links: ["porto"] },
  { id: "garden-plan", title: "Garden plan with Priya", date: "2026-05-11", kind: "people", body: "Raised beds along the south wall. Priya wants the herbs nearest the kitchen door. Order the timber by the twentieth.", links: ["balcony", "kitchen-notes"] },
  { id: "memex", title: "Bush’s memex, 1945", date: "2025-10-15", kind: "reading", body: "“As We May Think”: a desk of microfilm where any item can be tied to any other, and the trail itself is kept. The first description of a link.", links: ["second-brain"] },
  { id: "cajal", title: "Cajal’s butterflies", date: "2026-06-03", kind: "reading", body: "He drew neurons by hand from Golgi-stained slides and called them the butterflies of the soul. A memory is a change in how they touch.", links: ["second-brain", "hippocampus"] },
  { id: "spacing", title: "Spaced repetition, plainly", date: "2025-11-03", kind: "idea", body: "See a thing again just before you would have forgotten it. Day one, day three, day seven, day twenty-one. The gaps grow because the memory does.", links: ["forgetting-curve"] },
  { id: "green-tea", title: "Tea at 80 degrees", date: "2026-07-21", kind: "kitchen", body: "Green tea scalds above 80°. Let the kettle stand for three minutes, or pour it over a cold cup first.", links: ["kitchen-notes"] },
  { id: "hippocampus", title: "The seahorse in the brain", date: "2026-06-04", kind: "reading", body: "Arantius named the hippocampus in 1587 for its shape: a seahorse, curled under the temporal lobe. It is where a day becomes a memory.", links: ["cajal"] },
  { id: "oven-temperatures", title: "Oven temperatures, checked", date: "2026-03-02", kind: "kitchen", body: "The dial says 230°, the thermometer says 212°. Everything baked here needs twenty degrees more than the recipe, the sourdough included.", links: ["kitchen-notes", "sourdough"] },
  { id: "index-cards", title: "Index cards, three by five", date: "2025-09-30", kind: "idea", body: "76 by 127 millimetres. Small enough that one idea fits and two do not, which is the whole discipline.", links: ["luhmann"] },
  { id: "miller", title: "Seven, plus or minus two", date: "2025-11-20", kind: "reading", body: "Miller, 1956. Working memory holds about seven things. Everything past that has to be written down or it is gone.", links: ["forgetting-curve"] },
  { id: "kitchen-notes", title: "Kitchen notes", date: "2025-08-01", kind: "hub", body: "Everything learned at the stove and the oven, in one place.", links: ["sourdough", "oven-temperatures", "green-tea"] },
  { id: "balcony", title: "The balcony", date: "2025-08-03", kind: "hub", body: "Four pots, an olive tree, a bench and a south wall.", links: ["olive", "garden-plan"] },
  { id: "second-brain", title: "Second brain", date: "2025-08-01", kind: "hub", body: "Why a notebook that answers back is older than it looks.", links: ["luhmann", "memex", "forgetting-curve", "cajal"] },
  { id: "commonplace-books", title: "Commonplace books", date: "2025-08-02", kind: "hub", body: "Readers’ own books of passages, kept since the Renaissance.", links: ["locke"] },
  { id: "reading-list", title: "Reading list", date: "2025-08-01", kind: "hub", body: "What is on the table (Calvino, Berger, Sebald) and what is next.", links: ["calvino"] },
  { id: "porto", title: "Porto", date: "2026-03-30", kind: "hub", body: "Four days in April, the trip notes.", links: ["porto-bridge"] },
];

export const byId = Object.fromEntries(notes.map((n) => [n.id, n])) as Record<string, Note>;

export function backlinks(id: string): Note[] {
  return notes.filter((n) => n.links.includes(id));
}

export function unlinkedMentions(id: string): Note[] {
  const words = byId[id].title.toLowerCase().split(/\W+/).filter((w) => w.length > 4);
  return notes.filter((n) => n.id !== id && !n.links.includes(id) && words.some((w) => n.body.toLowerCase().includes(w)));
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00Z");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function shortDate(iso: string): string {
  const d = new Date(iso + "T12:00:00Z");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

// Ebbinghaus (1885), savings after one learning, rounded to whole percentages. Used by the live figures.
export const ebbinghaus: { label: string; hours: number; keep: number }[] = [
  { label: "20 minutes", hours: 1 / 3, keep: 58 },
  { label: "1 hour", hours: 1, keep: 44 },
  { label: "9 hours", hours: 9, keep: 36 },
  { label: "1 day", hours: 24, keep: 34 },
  { label: "2 days", hours: 48, keep: 28 },
  { label: "6 days", hours: 144, keep: 25 },
  { label: "31 days", hours: 744, keep: 21 },
];

// A note comes back on day 1, 3, 7, 21, 60 and 180 after it is written, then yearly.
export const schedule = [1, 3, 7, 21, 60, 180];

// Which notes have come back for review most recently (sample).
export const resurfaced: { id: string; reason: string }[] = [
  { id: "forgetting-curve", reason: "180 days since you wrote it" },
  { id: "olive", reason: "You linked it from Garden plan with Priya" },
  { id: "calvino", reason: "Due today, third return" },
  { id: "memex", reason: "Mentioned in Cajal’s butterflies" },
];
