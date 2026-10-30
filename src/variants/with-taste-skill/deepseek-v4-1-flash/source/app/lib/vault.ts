// The sample vault every page on this site demonstrates. Real note titles, real links,
// so the linking demos on the pages compute their answers instead of printing them.

export type Note = {
  id: string;
  title: string;
  folder: string;
  date: string;
  line: string;
  body: string[];
  links: string[];
};

export const NOTES: Note[] = [
  {
    id: "card-catalogue",
    title: "Card catalogue drawers",
    folder: "Archive",
    date: "1 March",
    line: "A library's catalogue was a second brain with brass handles.",
    body: [
      "One card, one thought, findable by anyone who could read the alphabet. The drawer is the unit: small enough to hold one idea, big enough to hold a paragraph.",
      "The failure was the order. Dewey gave every card exactly one address, so an idea that belonged in two places had to pick one.",
    ],
    links: ["dewey", "how-i-read", "library-card"],
  },
  {
    id: "marginalia",
    title: "Marginalia",
    folder: "Reading",
    date: "11 February",
    line: "Writing in the margin is a conversation with the author, held a week late.",
    body: [
      "I read with a pencil because I forget what I thought. The margin is the only place where the thought and its trigger sit on the same page.",
      "In Lattice the margin becomes a note of its own, linked back to the passage.",
    ],
    links: ["reading-as-conversation", "how-i-read"],
  },
  {
    id: "reading-as-conversation",
    title: "Reading as a conversation",
    folder: "Reading",
    date: "4 March",
    line: "The book is a slow interlocutor; the notes keep it talking after I close it.",
    body: [
      "Two things make a book stay: I argue with it in writing, and I connect it to something I already believe.",
      "Both need a place to happen. A highlight on its own is only a bookmark.",
    ],
    links: ["marginalia", "how-i-read", "zettelkasten"],
  },
  {
    id: "how-i-read",
    title: "How I read",
    folder: "Reading",
    date: "19 November",
    line: "Two passes: one for the shape of the argument, one for the sentences worth keeping.",
    body: [
      "First pass, no pencil: what is this book trying to do, and to whom. Second pass, pencil: the six sentences I would quote.",
      "The two passes are two notes, not one.",
    ],
    links: ["reading-as-conversation", "card-catalogue"],
  },
  {
    id: "zettelkasten",
    title: "Zettelkasten, without the mystique",
    folder: "Method",
    date: "2 September",
    line: "One idea per note, in your own words, linked to the note it argues with.",
    body: [
      "The method is smaller than the books about it: write the thought down as a sentence you would say out loud, then say what it is next to.",
      "The numbering system was a workaround for paper. Links do the same job and let a note sit in two places.",
    ],
    links: ["how-i-read", "a-note-is-a-promise"],
  },
  {
    id: "a-note-is-a-promise",
    title: "A note is a promise",
    folder: "Method",
    date: "27 October",
    line: "A note that repeats the page is a photocopy. A good note says what you will do with it.",
    body: [
      "Every note should be able to answer: what will I do differently because I wrote this? If it cannot, it is a clipping.",
      "Clippings are allowed. They just do not get to call themselves notes.",
    ],
    links: ["zettelkasten", "inbox-zero"],
  },
  {
    id: "inbox-zero",
    title: "Inbox zero is a chore",
    folder: "Method",
    date: "8 December",
    line: "Triage once, then let the inbox fill. The work is the writing, not the emptying.",
    body: [
      "An empty inbox is a clean desk: satisfying for an hour, unrelated to the work.",
      "What matters is that nothing important is waiting for a decision.",
    ],
    links: ["weekly-review", "a-note-is-a-promise"],
  },
  {
    id: "weekly-review",
    title: "The weekly review",
    folder: "Practice",
    date: "12 January",
    line: "Forty minutes on Friday: what moved, what stalled, what to drop.",
    body: [
      "Three questions, written down in the same note every week so the answers sit next to last month's.",
      "The note is long by December and it is the most useful thing in the vault.",
    ],
    links: ["inbox-zero", "projects", "a-note-is-a-promise"],
  },
  {
    id: "projects",
    title: "Projects I keep moving",
    folder: "Practice",
    date: "2 February",
    line: "Four at a time. A fifth means one of the four is already dead.",
    body: [
      "The list is short on purpose. Anything else is a someday note, and someday notes live in their own folder where they cannot nag.",
      "Every project note asks for one next step, small enough to do on a Tuesday.",
    ],
    links: ["weekly-review", "sourdough", "meeting"],
  },
  {
    id: "sourdough",
    title: "Sourdough starter, week nine",
    folder: "Kitchen",
    date: "30 January",
    line: "Feeding at eight and eight. The jar is a small clock.",
    body: [
      "Two hundred grams of flour, two hundred of water, and a smell that tells me whether yesterday was too warm.",
      "The notes are the recipe now; the book was only the beginning.",
    ],
    links: ["kitchen-shelf", "projects"],
  },
  {
    id: "kitchen-shelf",
    title: "The kitchen shelf",
    folder: "Kitchen",
    date: "14 August",
    line: "What lives within reach is what gets used. Everything else is storage.",
    body: [
      "We moved the stand mixer to the cellar and started baking more, because the bowl and the scale stayed out.",
      "The same rule applies to commands, and to notes.",
    ],
    links: ["sourdough"],
  },
  {
    id: "dewey",
    title: "Dewey, and why we left it",
    folder: "Archive",
    date: "20 February",
    line: "A single order forces every new idea into an old category. Links do not.",
    body: [
      "Classification is a promise that the world has a shape. Libraries need that promise; a notebook does not.",
      "The shelf number was never the useful part. The cross-reference card was.",
    ],
    links: ["card-catalogue", "a-note-is-a-promise"],
  },
  {
    id: "meeting",
    title: "Meeting, 14 March",
    folder: "Work",
    date: "14 March",
    line: "Three decisions, two owners, one thing nobody has agreed to yet.",
    body: [
      "Decided: the release moves to the 27th, the pricing page waits for the trial data, and Sam owns the migration note.",
      "Not decided: who answers the support queue in April. Written down so it cannot be forgotten politely.",
    ],
    links: ["projects", "weekly-review"],
  },
  {
    id: "long-way",
    title: "On taking the long way",
    folder: "Walking",
    date: "26 February",
    line: "The route home past the reservoir adds nine minutes and removes the day.",
    body: [
      "I started walking it in the dark because the lights are better, and kept it because the walk ends with nothing to do.",
      "A note with no purpose is the only kind that gets reread.",
    ],
    links: ["kitchen-shelf", "reservoir"],
  },
  {
    id: "reservoir",
    title: "The reservoir at seven",
    folder: "Walking",
    date: "9 March",
    line: "Flat water, four herons, nobody. The best hour in the city.",
    body: [
      "The gate opens at half six. By eight there are dogs and a coffee van, and the herons have moved to the far bank.",
      "Worth the early alarm twice a week, which is a sentence I did not expect to write.",
    ],
    links: ["long-way"],
  },
  {
    id: "library-card",
    title: "What a library card promised",
    folder: "Archive",
    date: "21 July",
    line: "Borrowing was a way of trying ideas without owning them.",
    body: [
      "The card was a claim on everything in the building, and the building was a claim on everything printed.",
      "Nothing digital has replaced that feeling of a whole collection being one signature away.",
    ],
    links: ["card-catalogue", "dewey"],
  },
];

export const byId = (id: string) => NOTES.find((n) => n.id === id);

/** Notes that link to `id`. The demo panels compute this, they do not print it. */
export function backlinksOf(id: string): Note[] {
  return NOTES.filter((n) => n.links.includes(id));
}

export function searchTitles(query: string, limit = 5): Note[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return NOTES.filter(
    (n) => n.title.toLowerCase().includes(q) || n.folder.toLowerCase().includes(q),
  ).slice(0, limit);
}
