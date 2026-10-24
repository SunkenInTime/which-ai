// The sample vault used by every fragment on /1. All of it is sample content (see .taste-skill/v1/notes.md).

export type Picture = { src: string; width: number; height: number; alt: string };

export type Note = {
  id: string;
  title: string;
  date: string; // ISO date the note was written
  folder: string;
  body: string;
  concepts: string[];
  picture?: Picture;
  clip?: { src: string; poster: string; width: number; height: number; label: string };
};

/** "Now" for every relative date on the page, fixed so the server and the browser agree. */
export const TODAY = "2026-10-24";

/** Groups of words that mean the same thing to the recall margin: the stand-in for the on-device model. */
export const CONCEPTS: Record<string, { label: string; words: string[] }> = {
  mira: { label: "Mira", words: ["mira", "mira's", "mira’s"] },
  birthday: { label: "presents", words: ["birthday", "gift", "gifts", "present", "presents", "surprise"] },
  trip: { label: "the Lisbon trip", words: ["trip", "lisbon", "holiday", "travel", "tram", "portugal", "flight", "flights", "alfama"] },
  art: { label: "the wave print", words: ["wave", "print", "prints", "hokusai", "museum", "exhibition", "painting", "framed"] },
  dinner: { label: "eating out", words: ["dinner", "restaurant", "restaurants", "lunch", "taberna", "eat", "booked"] },
  sleep: { label: "sleep", words: ["sleep", "slept", "sleeping", "tired", "nap", "naps", "insomnia", "bed", "awake", "asleep"] },
  memory: { label: "memory", words: ["memory", "memories", "remember", "forget", "forgot", "forgetting", "forgotten", "recall"] },
  coffee: { label: "coffee", words: ["coffee", "caffeine", "espresso"] },
  walk: { label: "walking", words: ["walk", "walks", "walking", "walked"] },
  writing: { label: "writing", words: ["write", "writing", "wrote", "draft", "drafts", "essay", "notebook", "notes"] },
  kitchen: { label: "the kitchen", words: ["kitchen", "worktop", "worktops", "oak", "beech", "cabinets", "fitter", "renovation"] },
  money: { label: "money", words: ["budget", "cost", "costs", "price", "quote", "quotes", "invoice", "€"] },
  work: { label: "work", words: ["report", "meeting", "deadline", "project", "q3", "planning", "review", "daniel", "onboarding", "slipped"] },
  bread: { label: "baking", words: ["bread", "sourdough", "starter", "bake", "baking", "loaf", "flour", "dough"] },
  garden: { label: "the balcony", words: ["balcony", "plant", "plants", "fern", "ferns", "shade", "garden", "pots"] },
  running: { label: "running", words: ["run", "running", "ran", "knee", "physio", "stride", "race"] },
};

export const PICTURES = {
  wave: {
    src: "/variants/with-taste-skill/opus-5.5/v1/under-the-wave-off-kanagawa-kanagawa-oki.jpg",
    width: 1600,
    height: 1076,
    alt: "Hokusai’s woodblock print of a great blue wave curling over three boats, Mount Fuji small in the distance",
  },
  tram: {
    src: "/variants/with-taste-skill/opus-5.5/v1/le-tram-28.jpg",
    width: 1600,
    height: 1070,
    alt: "A yellow Lisbon tram, route 28, climbing a cobbled street under bare trees",
  },
  alfama: {
    src: "/variants/with-taste-skill/opus-5.5/v1/lissabon-strassenbahn-28-linie-28-alfama-2011.jpg",
    width: 1600,
    height: 1258,
    alt: "Tram 28 turning between red and ochre houses and a palm tree in Alfama, Lisbon",
  },
  woods: {
    src: "/variants/with-taste-skill/opus-5.5/v1/larousse-bois-hetre-tilleul-nouveau-larousse-illustre.jpg",
    width: 1600,
    height: 2198,
    alt: "A 1906 encyclopedia plate of eighteen wood samples, from pale beech to dark red mahogany",
  },
  fern: {
    src: "/variants/with-taste-skill/opus-5.5/v1/nature-print-of-moonwort-and-adder-s.jpg",
    width: 1600,
    height: 2363,
    alt: "A Victorian nature print of small ferns, moonwort and adder’s tongue, with their roots, on cream paper",
  },
  loaf: {
    src: "/variants/with-taste-skill/opus-5.5/v1/sourdough-bread.jpg",
    width: 1600,
    height: 1200,
    alt: "A round sourdough loaf with a dark, floured crust and a leaf-shaped score, on a wooden board",
  },
} satisfies Record<string, Picture>;

export const NOTES: Note[] = [
  {
    id: "gift-mira",
    title: "Gift ideas for Mira",
    date: "2026-09-12",
    folder: "Personal",
    body: "She stood in front of the Great Wave for ten minutes at the exhibition. A print, framed, for her birthday? Or something blue from Lisbon: the tiles she photographed in Alfama.",
    concepts: ["mira", "birthday", "art", "trip"],
    picture: PICTURES.wave,
  },
  {
    id: "lisbon",
    title: "Lisbon in May",
    date: "2025-05-30",
    folder: "Travel",
    body: "Tram 28 before nine, or it is full by the second stop. Miradouro da Graça at sunset; take a jumper. Dinner at the taberna on Rua das Flores, booked two days ahead.",
    concepts: ["trip", "dinner"],
    picture: PICTURES.tram,
    clip: {
      src: "/variants/with-taste-skill/opus-5.5/v1/lisbon-tram-28-night.webm",
      poster: "/variants/with-taste-skill/opus-5.5/v1/lisbon-tram-28-night-poster.jpg",
      width: 854,
      height: 480,
      label: "A night ride on tram 28 through Lisbon, filmed from the window and sped up",
    },
  },
  {
    id: "restaurants",
    title: "Restaurants worth going back to",
    date: "2026-02-03",
    folder: "Personal",
    body: "The taberna on Rua das Flores in Lisbon. Noor, for her birthday last year: ask for the window table. The ramen place by the station closes at nine.",
    concepts: ["dinner", "trip"],
  },
  {
    id: "kitchen",
    title: "Kitchen: three quotes compared",
    date: "2026-10-17",
    folder: "Home",
    body: "Oak worktop, fitted: Hartley €4,850, Brandt €5,200, Ostrowski €4,400 without fitting. Beech is €600 less but marks easily. The fitter can start on 9 November.",
    concepts: ["kitchen", "money"],
    picture: PICTURES.woods,
  },
  {
    id: "balcony",
    title: "Balcony: what grows in shade",
    date: "2026-09-24",
    folder: "Home",
    body: "The balcony gets two hours of sun. Ferns do well: hart’s tongue and maidenhair. Water the pots every other day in summer, once a week from October.",
    concepts: ["garden"],
    picture: PICTURES.fern,
  },
  {
    id: "sourdough",
    title: "Sourdough starter log",
    date: "2025-10-24",
    folder: "Kitchen",
    body: "Day nine: the starter doubled in six hours at 24 °C. Feed at 1:5:5. First loaf tonight; the crust burned, the crumb was right.",
    concepts: ["bread", "kitchen"],
    picture: PICTURES.loaf,
  },
  {
    id: "sleep",
    title: "Sleep and memory",
    date: "2025-03-11",
    folder: "Reading",
    body: "From the book on sleep: the hippocampus replays the day at night and files it away. Sleep after learning, not instead of it. An all-nighter before a test costs more than it saves.",
    concepts: ["sleep", "memory"],
  },
  {
    id: "coffee",
    title: "Coffee and naps",
    date: "2026-07-02",
    folder: "Health",
    body: "Coffee, then a twenty-minute nap: you wake as the caffeine arrives. No coffee after two or I sleep badly.",
    concepts: ["coffee", "sleep"],
  },
  {
    id: "walk",
    title: "Walk before writing",
    date: "2025-06-02",
    folder: "Ideas",
    body: "Every good draft this year started after a walk. Twenty minutes, no phone, then write before checking anything.",
    concepts: ["walk", "writing"],
  },
  {
    id: "daniel",
    title: "Meeting with Daniel, 14 March",
    date: "2026-03-14",
    folder: "Work",
    body: "He wants the report by the 28th. Ask about the budget line for contractors before then; nobody owns it.",
    concepts: ["work", "money"],
  },
  {
    id: "q3",
    title: "Q3 planning: what slipped",
    date: "2026-10-02",
    folder: "Work",
    body: "The onboarding rewrite slipped twice, both times waiting on review. Next quarter: one reviewer, named on day one.",
    concepts: ["work"],
  },
  {
    id: "knee",
    title: "Running: the knee",
    date: "2026-08-19",
    folder: "Health",
    body: "Physio says a shorter stride, not fewer runs. Ice after anything over ten kilometres.",
    concepts: ["running"],
  },
  {
    id: "commonplace",
    title: "Why I keep a commonplace book",
    date: "2025-01-08",
    folder: "Ideas",
    body: "Write down what you read in your own words, or you only remember that you read it. The notes are for the person who forgets.",
    concepts: ["writing", "memory"],
  },
  {
    id: "ebbinghaus",
    title: "Ebbinghaus: the forgetting curve",
    date: "2025-11-20",
    folder: "Reading",
    body: "In 1885 he learned lists of nonsense syllables and timed how fast they went. After a day about a third was left; after a month, a fifth.",
    concepts: ["memory"],
  },
];

export type Match = { note: Note; score: number; shared: string[]; excerpt: { text: string; hit: boolean }[] };

const tokenise = (text: string) =>
  text
    .toLowerCase()
    .replace(/[’']/g, "’")
    .split(/[^a-z0-9€’]+/u)
    .filter(Boolean);

const wordsOf = (concept: string) => new Set(CONCEPTS[concept].words.map((w) => w.replace(/'/g, "’")));

/** The concepts a piece of text touches. */
export function conceptsIn(text: string): string[] {
  const tokens = new Set(tokenise(text));
  return Object.keys(CONCEPTS).filter((c) => [...wordsOf(c)].some((w) => tokens.has(w)));
}

/** The best sentence of a note for the shared concepts, split into plain and highlighted runs. */
function excerptFor(note: Note, shared: string[]) {
  const hits = new Set(shared.flatMap((c) => [...wordsOf(c)]));
  const sentences = note.body.match(/[^.!?]+[.!?]+/g) ?? [note.body];
  const chosen = sentences.find((s) => tokenise(s).some((t) => hits.has(t))) ?? sentences[0];
  const parts = chosen.trim().split(/(\s+)/);
  return parts.map((p) => ({ text: p, hit: hits.has(p.toLowerCase().replace(/[^a-z0-9€’]/g, "")) }));
}

/** Older notes that share meaning with what is being written, best first. */
export function recall(text: string, exclude: string[] = [], limit = 4): Match[] {
  const present = conceptsIn(text);
  if (!present.length) return [];
  return NOTES.filter((n) => !exclude.includes(n.id))
    .map((note) => {
      const shared = note.concepts.filter((c) => present.includes(c));
      return { note, score: shared.length, shared, excerpt: excerptFor(note, shared) };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score || (a.note.picture ? -1 : 0) - (b.note.picture ? -1 : 0) || b.note.date.localeCompare(a.note.date))
    .slice(0, limit);
}

/** "Both about the Lisbon trip and eating out" */
export function reasonFor(shared: string[]) {
  const labels = shared.map((c) => CONCEPTS[c].label);
  const list = labels.length > 1 ? `${labels.slice(0, -1).join(", ")} and ${labels.at(-1)}` : labels[0];
  return `Also about ${list}`;
}

/** "7 months ago", from the fixed TODAY. */
export function ago(iso: string) {
  const now = new Date(TODAY + "T12:00:00Z").getTime();
  const then = new Date(iso + "T12:00:00Z").getTime();
  const days = Math.round((now - then) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 14) return "A week ago";
  if (days < 28) return `${Math.round(days / 7)} weeks ago`;
  const months = Math.round(days / 30.44);
  if (months <= 1) return "A month ago";
  if (months < 12) return `${months} months ago`;
  if (months < 18 && Math.abs(days - 365) < 20) return "A year ago";
  return `${months} months ago`;
}

export function longDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
