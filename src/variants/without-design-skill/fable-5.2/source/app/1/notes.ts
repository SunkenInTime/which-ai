/**
 * A small, believable "second brain" for the live demo in the hero.
 *
 * `kw` are the hooks a note can be recalled by. A trailing `*` means
 * "starts with", so `memor*` catches memory / memories / memorise.
 * `x` / `y` place the note on the mini map (viewBox 300 × 150).
 */
export type Note = {
  id: string;
  title: string;
  short: string;
  when: string;
  body: string;
  kw: string[];
  links: number;
  x: number;
  y: number;
};

export const NOTES: Note[] = [
  {
    id: "curve",
    title: "The forgetting curve",
    short: "Forgetting curve",
    when: "Mar 2023",
    body: "Without review, most of a lesson is gone within days. Every time you retrieve a memory, the curve flattens a little.",
    kw: ["forg*", "memor*", "remember*", "curve", "review*", "retriev*", "retain*", "survive*", "lesson*"],
    links: 9,
    x: 62,
    y: 34,
  },
  {
    id: "spaced",
    title: "Spaced repetition, explained to myself",
    short: "Spaced repetition",
    when: "Nov 2022",
    body: "Review just before you would forget. The interval grows each time: a day, three, eight, twenty-one. Memory likes a little struggle.",
    kw: ["spaced", "repetition", "review*", "flashcard*", "interval*", "study*", "learn*", "memor*", "test*", "explain*"],
    links: 6,
    x: 32,
    y: 70,
  },
  {
    id: "read",
    title: "How to read a book (twice)",
    short: "Read a book twice",
    when: "Jan 2024",
    body: "First pass for the shape, second for the argument. Then close the book and write the chapter summary from memory.",
    kw: ["read", "reading", "reread*", "book*", "chapter*", "summar*", "highlight*", "author*", "page*", "novel*"],
    links: 7,
    x: 98,
    y: 16,
  },
  {
    id: "sleep",
    title: "Sleep is when memory gets filed",
    short: "Sleep & memory",
    when: "Aug 2023",
    body: "Deep sleep replays the day and files it. An all-nighter trades tomorrow's memory for tonight's hours.",
    kw: ["sleep*", "slept", "nap*", "dream*", "tired", "insomnia", "memor*", "bedtime", "all-nighter"],
    links: 4,
    x: 58,
    y: 116,
  },
  {
    id: "walk",
    title: "Walking makes ideas",
    short: "Walking makes ideas",
    when: "May 2023",
    body: "Every good idea this year arrived on foot. Twenty minutes, no headphones, and explain the problem out loud to nobody.",
    kw: ["walk*", "idea*", "stuck", "stroll*", "hike*", "outside", "aloud", "loud", "creativ*", "think*"],
    links: 5,
    x: 236,
    y: 30,
  },
  {
    id: "write",
    title: "Writing is thinking",
    short: "Writing is thinking",
    when: "Feb 2023",
    body: "If I can't explain it plainly, I don't understand it yet. A draft is how I find out what I think.",
    kw: ["writ*", "wrote", "draft*", "essay*", "explain*", "understand*", "think*", "note*", "journal*"],
    links: 11,
    x: 204,
    y: 62,
  },
  {
    id: "bread",
    title: "Sourdough: what finally worked",
    short: "Sourdough",
    when: "Feb 2024",
    body: "78% hydration, four folds, then overnight in the fridge. The cold is where the flavour comes from. Patience is an ingredient.",
    kw: ["bread", "sourdough", "bak*", "dough", "flour", "starter", "recipe*", "cook*", "kitchen", "oven", "loaf"],
    links: 3,
    x: 268,
    y: 96,
  },
  {
    id: "meeting",
    title: "Meeting notes are not notes",
    short: "Meeting notes",
    when: "Sep 2023",
    body: "Write down the decision and who owns it. Everything else in a meeting is transcript, and nobody rereads transcript.",
    kw: ["meeting*", "decision*", "decid*", "team*", "agenda", "standup", "manager*", "project*", "transcript*"],
    links: 8,
    x: 226,
    y: 126,
  },
  {
    id: "pricing",
    title: "Pricing: three tiers is a habit, not a law",
    short: "Pricing tiers",
    when: "Oct 2023",
    body: "We keep adding a middle plan so the top one looks sane. Start from what a customer would miss if it vanished.",
    kw: ["pric*", "tier*", "customer*", "revenue", "launch*", "product*", "business", "sell*", "paid"],
    links: 5,
    x: 184,
    y: 136,
  },
  {
    id: "jacobs",
    title: "Jane Jacobs on sidewalks",
    short: "Jacobs on sidewalks",
    when: "Jun 2022",
    body: "Eyes on the street. A city block is safe when lots of people have small reasons to walk down it.",
    kw: ["city", "cities", "street*", "urban*", "sidewalk*", "neighbo*", "walk*", "jacobs", "block*", "town*"],
    links: 4,
    x: 272,
    y: 54,
  },
  {
    id: "garden",
    title: "The garden is a system",
    short: "Garden as system",
    when: "Apr 2024",
    body: "Tomatoes don't want more water, they want deeper water. Most of the care a plant needs is restraint.",
    kw: ["garden*", "plant*", "tomato*", "water*", "soil", "grow*", "seed*", "compost", "weed*"],
    links: 3,
    x: 128,
    y: 132,
  },
  {
    id: "yes",
    title: "Questions to ask before saying yes",
    short: "Before saying yes",
    when: "Dec 2023",
    body: "Would I still want to do this next Tuesday? If not, it is a no dressed up as a later. Protect the calendar.",
    kw: ["yes", "commit*", "calendar", "busy", "priorit*", "focus*", "overwhelm*", "burnout", "decid*"],
    links: 6,
    x: 22,
    y: 112,
  },
  {
    id: "talk",
    title: "Talk idea: tools for forgetting",
    short: "Tools for forgetting",
    when: "Jul 2024",
    body: "Pitch: the best memory tools are the ones that let you forget on purpose. Open with the story about the lost notebook.",
    kw: ["talk*", "conference*", "slide*", "present*", "audience", "pitch*", "forg*", "tool*", "notebook*", "speak*"],
    links: 2,
    x: 20,
    y: 28,
  },
  {
    id: "dad",
    title: "Dad's stories, recorded",
    short: "Dad's stories",
    when: "Dec 2022",
    body: "The one about the ferry in '74. Next time, ask him for the names of the other deckhands before he forgets them too.",
    kw: ["dad", "father", "mum", "mom", "mother", "family", "stories", "story", "parent*", "kid*", "child*", "ferry", "grand*"],
    links: 2,
    x: 152,
    y: 14,
  },
];

/** Faint, always-on threads so the map reads as a web that already exists. */
export const THREADS: [string, string][] = [
  ["curve", "spaced"],
  ["curve", "read"],
  ["curve", "sleep"],
  ["spaced", "sleep"],
  ["read", "dad"],
  ["walk", "write"],
  ["walk", "jacobs"],
  ["write", "meeting"],
  ["meeting", "pricing"],
  ["bread", "garden"],
  ["yes", "spaced"],
  ["talk", "curve"],
  ["pricing", "garden"],
  ["write", "dad"],
];
