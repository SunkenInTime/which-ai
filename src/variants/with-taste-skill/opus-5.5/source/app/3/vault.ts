// A sample vault for the search on /3: fourteen notes a person might really keep.
// The search scores words in the title, the tags and the body, and widens each word through a
// small map of related words, the way Engram matches by meaning rather than by spelling.

export type Note = {
  id: string;
  title: string;
  folder: string;
  date: string;
  body: string[];
  tags: string[];
  links: string[];
};

export const NOTES: Note[] = [
  {
    id: "ebbinghaus",
    title: "Ebbinghaus: the forgetting curve",
    folder: "Reading",
    date: "3 Feb 2026",
    body: [
      "He tested himself on lists of nonsense syllables in 1885. After a day about two-thirds were gone; after a month, four-fifths.",
      "Reviewing at the right moment flattens the curve. See [[Spaced reviews, not rereading]].",
    ],
    tags: ["forget", "memory", "remember", "read", "learning", "review", "curve"],
    links: ["spaced", "commonplace"],
  },
  {
    id: "sleep",
    title: "Sleep and memory",
    folder: "Reading",
    date: "11 Jan 2026",
    body: [
      "Chapter six: deep sleep moves the day’s memories from the hippocampus into the cortex for keeping.",
      "An all-nighter before an exam costs more of what you learned than it buys. Link to [[Ebbinghaus: the forgetting curve]].",
    ],
    tags: ["sleep", "memory", "rest", "brain", "learning", "forget", "night"],
    links: ["ebbinghaus"],
  },
  {
    id: "commonplace",
    title: "Why I keep a commonplace book",
    folder: "Ideas",
    date: "20 Mar 2025",
    body: [
      "Locke indexed his by the first letter and the first vowel of each heading.",
      "The point was never storage. It was finding the passage again on the day you need it.",
    ],
    tags: ["commonplace", "notebook", "read", "remember", "keep", "find", "index", "quote"],
    links: ["ebbinghaus"],
  },
  {
    id: "spaced",
    title: "Spaced reviews, not rereading",
    folder: "Reading",
    date: "9 Feb 2026",
    body: [
      "Rereading feels like learning and isn’t. Testing yourself a day, a week and a month later is what sticks.",
      "This is the job I want the morning review to do.",
    ],
    tags: ["review", "learning", "read", "remember", "forget", "memory", "study", "test"],
    links: ["ebbinghaus"],
  },
  {
    id: "walk",
    title: "Walk before writing",
    folder: "Ideas",
    date: "2 Sep 2025",
    body: [
      "Twenty minutes outside and the paragraph I was stuck on writes itself.",
      "Tried it five mornings out of seven in August. Worked four times.",
    ],
    tags: ["walk", "writing", "ideas", "stuck", "morning", "habit"],
    links: [],
  },
  {
    id: "daniel",
    title: "Meeting with Daniel, 14 March",
    folder: "Work",
    date: "14 Mar 2026",
    body: [
      "Launch moves to 2 June. Daniel wants pricing settled first: one plan, monthly and yearly, no seats.",
      "Next check-in Friday. Bring the numbers from [[Q3 planning: what slipped]].",
    ],
    tags: ["daniel", "launch", "pricing", "price", "meeting", "plan", "work", "say", "said"],
    links: ["q3"],
  },
  {
    id: "q3",
    title: "Q3 planning: what slipped",
    folder: "Work",
    date: "30 Sep 2025",
    body: [
      "The search rewrite slipped two weeks; the onboarding emails shipped on time.",
      "Daniel’s point stands: fewer projects, finished.",
    ],
    tags: ["plan", "planning", "work", "quarter", "slipped", "daniel", "launch"],
    links: ["daniel"],
  },
  {
    id: "kitchen",
    title: "Kitchen: three quotes compared",
    folder: "Home",
    date: "8 Apr 2026",
    body: [
      "Marques: £8,400, six weeks. Hollins: £9,150, four weeks, worktops included. Abreu: £7,900 without worktops.",
      "The cheapest isn’t the cheapest once the worktops are added.",
    ],
    tags: ["kitchen", "quote", "quotes", "renovation", "cost", "home", "price", "builder"],
    links: [],
  },
  {
    id: "lisbon",
    title: "Lisbon in May",
    folder: "Travel",
    date: "19 Apr 2026",
    body: [
      "Stay in Graça, not Baixa. Tram 28 early, before the queues.",
      "Ask about the tile museum’s Tuesday hours. Old sea chart of the Tagus saved in attachments.",
    ],
    tags: ["lisbon", "trip", "travel", "portugal", "may", "holiday", "map"],
    links: [],
  },
  {
    id: "sourdough",
    title: "Sourdough starter log",
    folder: "Home",
    date: "6 Jan 2026",
    body: [
      "Day nine: doubled in five hours at 24 °C.",
      "75% hydration was too slack for this flour; 70% holds its shape on the bench.",
    ],
    tags: ["bread", "sourdough", "dough", "hydration", "wet", "flour", "baking", "starter"],
    links: [],
  },
  {
    id: "mira",
    title: "Gift ideas for Mira",
    folder: "Life",
    date: "2 Oct 2025",
    body: [
      "She stopped at the second-hand bookshop window in July and talked about the green Penguins.",
      "Size six for gloves. Not another candle.",
    ],
    tags: ["gift", "birthday", "mira", "present", "idea", "ideas"],
    links: [],
  },
  {
    id: "rose",
    title: "The Name of the Rose",
    folder: "Reading",
    date: "24 Jul 2025",
    body: [
      "The library as a labyrinth. For the essay: the monks’ index was a weapon as well as a map.",
      "Compare with [[Why I keep a commonplace book]].",
    ],
    tags: ["book", "library", "read", "novel", "index", "essay"],
    links: ["commonplace"],
  },
  {
    id: "knee",
    title: "Running: left knee",
    folder: "Health",
    date: "12 Aug 2025",
    body: [
      "Pain on the outside of the knee after 8 km.",
      "Physio says hip strength, not the shoes. Clamshells, three sets of fifteen.",
    ],
    tags: ["run", "running", "knee", "health", "pain", "exercise", "physio"],
    links: [],
  },
  {
    id: "garden",
    title: "Names of things in the garden",
    folder: "Home",
    date: "5 May 2025",
    body: [
      "The pale green one by the gate is a hellebore. The iris bulbs went in last October.",
      "Besler drew the same iris in 1613; the plate is saved below.",
    ],
    tags: ["garden", "plants", "flower", "iris", "hellebore", "names"],
    links: [],
  },
];

const RELATED: Record<string, string[]> = {
  forget: ["forgetting", "memory", "remember", "review", "curve"],
  forgot: ["forget", "memory", "remember"],
  remember: ["memory", "review", "forget"],
  memory: ["remember", "sleep", "forget", "brain"],
  read: ["reading", "book", "learning"],
  sleep: ["rest", "night", "memory"],
  tired: ["sleep", "rest"],
  study: ["learning", "review", "test"],
  exam: ["learning", "study", "sleep"],
  pricing: ["price", "plan", "launch"],
  price: ["pricing", "cost", "quote"],
  say: ["said", "meeting"],
  launch: ["pricing", "plan", "daniel"],
  wet: ["hydration", "slack", "dough"],
  dough: ["bread", "sourdough", "hydration", "flour"],
  bread: ["sourdough", "dough", "baking"],
  trip: ["travel", "holiday", "lisbon"],
  travel: ["trip", "holiday", "lisbon"],
  holiday: ["trip", "travel"],
  portugal: ["lisbon"],
  gift: ["present", "birthday"],
  present: ["gift", "birthday"],
  birthday: ["gift", "present"],
  kitchen: ["renovation", "quote", "builder"],
  cost: ["price", "quote"],
  knee: ["running", "physio", "pain"],
  flower: ["plants", "garden", "iris", "hellebore"],
  plant: ["garden", "flower"],
  writing: ["walk", "stuck", "essay"],
  stuck: ["walk", "writing"],
  notebook: ["commonplace", "keep"],
  ideas: ["idea"],
};

const STOP = new Set(
  "a an the and or of to in on at for with about what why how when where who did do does i me my is was it that this be should have has from by as so".split(
    " ",
  ),
);

const stem = (w: string) => w.replace(/(ing|ed|es|s)$/u, "") || w;

export function terms(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w));
}

export type Hit = { note: Note; score: number; matched: string[]; related: string[] };

export function search(query: string, limit = 3): Hit[] {
  const words = terms(query);
  if (!words.length) return [];
  const hits: Hit[] = [];
  for (const note of NOTES) {
    const title = note.title.toLowerCase();
    const body = note.body.join(" ").toLowerCase();
    const tags = note.tags.map(stem);
    let score = 0;
    const matched = new Set<string>();
    const related = new Set<string>();
    for (const word of words) {
      const s = stem(word);
      let direct = 0;
      if (title.includes(s)) direct += 3;
      if (tags.includes(s)) direct += 2;
      if (body.includes(s)) direct += 1;
      if (direct) {
        score += direct;
        matched.add(word);
      }
      for (const r of RELATED[word] ?? RELATED[s] ?? []) {
        const rs = stem(r);
        if (tags.includes(rs) || title.includes(rs)) {
          score += direct ? 1 : 1.5;
          if (!direct) related.add(r);
          break;
        }
      }
    }
    if (score > 0) hits.push({ note, score, matched: [...matched], related: [...related] });
  }
  hits.sort((a, b) => b.score - a.score || a.note.title.localeCompare(b.note.title));
  const top = hits[0]?.score ?? 0;
  return hits.filter((h) => h.score >= top * 0.25).slice(0, limit);
}

export const byId = (id: string) => NOTES.find((n) => n.id === id);

/** The notes that link to this one: Engram's backlinks. */
export const backlinks = (id: string) => NOTES.filter((n) => n.links.includes(id));
