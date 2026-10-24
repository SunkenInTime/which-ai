// Sample content for iteration 5. Every note, name and date here is sample data for the client to confirm.

export type Note = {
  slug: string;
  title: string;
  edited: string;
  folder: string;
  body: string[];
  backlinks: number;
};

/** The notes this page links to with [[double brackets]]. */
export const NOTES: Record<string, Note> = {
  daniel: {
    slug: "daniel",
    title: "Meeting with Daniel, 14 March 2024",
    edited: "14 March 2024",
    folder: "Work",
    body: [
      "The lease on the shop ends in June 2026. Ask about renewing before January, not after.",
      "Daniel would rather sign for five years than two, if the rent rise stays under 4%.",
    ],
    backlinks: 3,
  },
  brackets: {
    slug: "brackets",
    title: "How linking works",
    edited: "2 October 2026",
    folder: "Engram guide",
    body: [
      "Type two square brackets and start typing a title. Engram suggests notes as you go; pick one, or press Enter to make a new note with that name.",
      "The note you linked to now lists this one under Backlinks, so the link works in both directions.",
    ],
    backlinks: 41,
  },
  disk: {
    slug: "disk",
    title: "Where my notes live",
    edited: "19 August 2026",
    folder: "Home",
    body: [
      "~/Engram on the Mac, the same folder on the phone through Sync. Every note is one .md file: Kitchen quotes.md, Lisbon in May.md.",
      "Opened the folder in TextEdit once to check. They were all there, links and all.",
    ],
    backlinks: 2,
  },
  curve: {
    slug: "curve",
    title: "Ebbinghaus: the forgetting curve",
    edited: "6 January 2026",
    folder: "Reading",
    body: [
      "In 1885 Hermann Ebbinghaus learned lists of nonsense syllables and tested how much he kept. After twenty minutes he had lost 42%; after a day, 66%; after a month, 79%.",
      "Meeting the material again at the right moment is what flattens the curve.",
    ],
    backlinks: 5,
  },
  commonplace: {
    slug: "commonplace",
    title: "Why I keep a commonplace book",
    edited: "28 May 2025",
    folder: "Reading",
    body: [
      "John Locke published his method in 1706: one notebook, headings by first letter and first vowel, an index at the back.",
      "Mine lives in Engram now. The index builds itself, and old entries turn up on their own.",
    ],
    backlinks: 4,
  },
  bm: {
    slug: "bm",
    title: "British Museum Reading Room",
    edited: "3 March 2024",
    folder: "Travel",
    body: [
      "Opened in 1857 under a dome about 43 metres across. Readers sat at desks marked with a letter and a number.",
      "Desk F1 is near the door. Wrote half of the March notes there.",
    ],
    backlinks: 1,
  },
};

export const NOTE_ORDER = ["daniel", "brackets", "disk", "curve", "commonplace", "bm"];

/* ---------- The margin demo ---------- */

export type Recall = {
  id: string;
  title: string;
  age: string;
  days: number;
  clipped: boolean;
  words: string[]; // words it shares with the note being written
  meaning: string[]; // what it shares by meaning only
  excerpt: string;
  score: number;
};

export const RECALLS: Recall[] = [
  {
    id: "sofia",
    title: "Sofia’s Lisbon list",
    age: "7 weeks ago",
    days: 51,
    clipped: false,
    words: ["bookshop", "Chiado"],
    meaning: [],
    excerpt: "Livraria Bertrand in Chiado, the oldest bookshop still open. Go on a weekday morning.",
    score: 9,
  },
  {
    id: "season",
    title: "Travelling in shoulder season",
    age: "3 weeks ago",
    days: 24,
    clipped: false,
    words: [],
    meaning: ["May", "crowds"],
    excerpt: "May and October: warm enough, half the queues. Do the famous things before nine.",
    score: 7,
  },
  {
    id: "2019",
    title: "Lisbon, 2019: what we missed",
    age: "7 years ago",
    days: 2694,
    clipped: false,
    words: ["Alfama", "dinner"],
    meaning: [],
    excerpt: "Never made it to Alfama for dinner. Next time one night there, away from the viewpoints.",
    score: 8,
  },
  {
    id: "tram",
    title: "Tram 28 from Martim Moniz",
    age: "3 years ago",
    days: 1301,
    clipped: true,
    words: ["tram 28", "Martim Moniz"],
    meaning: [],
    excerpt: "Clipped from a city guide: board at the first stop before nine; by ten the queue can take an hour.",
    score: 6,
  },
  {
    id: "quiet",
    title: "Restaurants: the quiet ones",
    age: "11 months ago",
    days: 340,
    clipped: false,
    words: [],
    meaning: ["a quiet dinner"],
    excerpt: "The best dinners were in rooms without a view. Fewer people, and we could hear each other.",
    score: 5,
  },
  {
    id: "books",
    title: "Bookshops worth the trip",
    age: "1 year ago",
    days: 620,
    clipped: false,
    words: ["bookshop"],
    meaning: [],
    excerpt: "Shakespeare and Company in Paris. Bertrand in Lisbon. Daunt Books in Marylebone, for the travel shelves.",
    score: 4,
  },
];

/* ---------- The morning note ---------- */

export type MorningEntry = {
  id: string;
  when: "week" | "month" | "year";
  title: string;
  excerpt: string;
  clipped: boolean;
};

export const MORNING: MorningEntry[] = [
  {
    id: "kitchen",
    when: "week",
    title: "Kitchen: three quotes compared",
    excerpt: "The oak worktop costs £1,140 more but is fitted in two weeks, not six.",
    clipped: false,
  },
  {
    id: "renovation",
    when: "week",
    title: "Worktops: oiling oak",
    excerpt: "Clipped from a joinery guide: oil once a day for a week, once a week for a month, then once a month.",
    clipped: true,
  },
  {
    id: "q3",
    when: "month",
    title: "Q3 planning: what slipped",
    excerpt: "The hiring plan slipped twice. Both times we were waiting on the budget review.",
    clipped: false,
  },
  {
    id: "mira",
    when: "month",
    title: "Gift ideas for Mira",
    excerpt: "She stopped at the botanical prints at the Sunday market. The fern one, framed.",
    clipped: false,
  },
  {
    id: "sourdough",
    when: "year",
    title: "Sourdough starter log",
    excerpt: "Day 9. Doubled in five hours at 24°. Feed at 1:5:5 from now on.",
    clipped: false,
  },
  {
    id: "ratio",
    when: "year",
    title: "Baker’s percentages",
    excerpt: "Clipped from a baking site: flour is always 100%; water 70–75% for an open crumb.",
    clipped: true,
  },
];

/* ---------- Pricing, set like a menu ---------- */

export type PriceItem = { name: string; price: string; note: string };
export type PriceGroup = { name: string; items: PriceItem[] };

export const PRICES: PriceGroup[][] = [
  [
    {
      name: "By the month, in US dollars",
      items: [
        { name: "Free", price: "$0", note: "One device. Unlimited notes, links, resurfacing and search." },
        { name: "Sync", price: "6", note: "Every device you own, end-to-end encrypted. A year of version history, 20 GB for attachments." },
        { name: "Family", price: "10", note: "Up to five people, each with a private vault, plus one vault you share." },
      ],
    },
    {
      name: "By the year",
      items: [
        { name: "Sync", price: "$60", note: "Twelve months for the price of ten." },
        { name: "Family", price: "100", note: "Twelve months for the price of ten." },
      ],
    },
  ],
  [
    {
      name: "Free for",
      items: [
        { name: "Students and teachers", price: "$0", note: "Sync, with a school or university email address. Renew once a year." },
        { name: "Anyone, on one device", price: "0", note: "The free plan has no time limit and no limit on notes." },
      ],
    },
    {
      name: "In every plan",
      items: [
        { name: "Import", price: "Included", note: "From Apple Notes, Evernote, Notion, Obsidian or any folder of Markdown." },
        { name: "Export", price: "Included", note: "Your notes are already files. Copy the folder." },
        { name: "The apps", price: "Included", note: "Mac, Windows, Linux, iPhone, iPad and Android." },
      ],
    },
  ],
];

/* ---------- Questions ---------- */

export const QUESTIONS: { q: string; a: string }[] = [
  {
    q: "Where are my notes stored?",
    a: "In a folder on your own disk, as plain Markdown files, one per note. With Sync, an encrypted copy travels between your devices, and we cannot read it.",
  },
  {
    q: "How does the margin find old notes without sending them anywhere?",
    a: "A small language model, about 80 MB, runs on your device and indexes your notes there. It matches by meaning as well as by words, and it works with the Wi-Fi off.",
  },
  {
    q: "Can I bring my notes from another app?",
    a: "Yes: Apple Notes, Evernote (.enex), a Notion export, an Obsidian vault or any folder of Markdown files. Links between notes come across where the old app had them.",
  },
  {
    q: "What happens to my notes if Engram shuts down?",
    a: "Nothing. They are files in your folder, readable by any text editor, and the free app keeps working without our servers.",
  },
  {
    q: "Does it work offline?",
    a: "Everything works offline except Sync, which catches up the next time you are connected.",
  },
  {
    q: "Is there a web version?",
    a: "Not yet. Engram runs on Mac, Windows, Linux, iPhone, iPad and Android.",
  },
  {
    q: "Can I share a note?",
    a: "Publish any single note as a web page with its own link, and unpublish it whenever you like. On Family, one vault is shared by everyone in it.",
  },
  {
    q: "Is it free for students?",
    a: "Sync is free for students and teachers with a school or university email address. You renew it once a year.",
  },
  {
    q: "How many notes can it hold?",
    a: "It is built for decades of notes. Search and resurfacing run on your device, so a large vault stays as quick as your disk.",
  },
];
