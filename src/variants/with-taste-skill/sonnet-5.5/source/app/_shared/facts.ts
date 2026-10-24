/**
 * One source of truth for what Engram is, what it does and what it costs.
 * All five designs (/1 to /5) pull their facts from here, so a price or a platform
 * never disagrees between iterations. Each design writes its own headlines, voice
 * and layout around these facts.
 *
 * Everything here is SAMPLE content (the product is a concept): the name, prices,
 * schedules and example notes are there so the pages can be seen at full density.
 */

export const PRODUCT = {
  name: "Engram",
  /** What it is, in the plainest words. */
  what: "A note-taking app that works as a second brain.",
  /** The three things it does, in the order a thought travels. */
  verbs: ["Capture", "Connect", "Recall"] as const,
  platforms: ["Mac", "Windows", "Linux", "iPhone", "iPad", "Android", "Web"],
  /** The one primary action on every design. Keep the wording identical. */
  primaryAction: "Start free",
  /** Placeholder destination until a real sign-up exists. */
  primaryHref: "#start",
  contactEmail: "hello@engram.example",
} as const;

/** What each part of the product does, stated as facts that can be shown. */
export const FEATURES = {
  capture: {
    name: "Capture",
    line: "Anything becomes a note in under a second.",
    facts: [
      "A global shortcut (Option+Space on Mac, Ctrl+Space elsewhere) opens an empty note over whatever you are doing.",
      "Share from any app on your phone; forward any email to your private capture address.",
      "The web clipper keeps the page as clean text, with the link and the date.",
      "Voice memos are written out on your device, never uploaded to be transcribed.",
      "Screenshots and photos of whiteboards get their text pulled out, so you can search them.",
    ],
  },
  connect: {
    name: "Connect",
    line: "Type [[ and a note becomes part of what you already know.",
    facts: [
      "Every link works both ways: open a note and see every note that points to it under it.",
      "While you write, Engram suggests notes you may want to link. You accept a suggestion or ignore it. Nothing is linked without you.",
      "Each day has a note of its own; links from it build your timeline.",
      "The map shows the shape of what you know: clusters, bridges, and notes nothing points to yet.",
    ],
  },
  recall: {
    name: "Recall",
    line: "Find it by what it meant, not what you typed.",
    facts: [
      "Search understands meaning: “what did Maya say about pricing in March” finds the note without the word pricing in it.",
      "Ask your notes a question and get an answer in sentences, with the notes it drew on as footnotes.",
      "Resurface brings a note back after 1, 3, 7, 21 and 60 days, unless you opened it since. Five notes a day at most.",
      "Every answer links to the source. If your notes do not say, Engram says that.",
    ],
  },
  own: {
    name: "Own",
    line: "Plain Markdown files in a folder on your disk.",
    facts: [
      "Open the folder in any other editor. Leave whenever you like; your notes are already out.",
      "Works offline. Nothing waits for a connection.",
      "Sync between devices is end-to-end encrypted: Engram cannot read your notes.",
      "Search by meaning runs on your device. Ask-your-notes is optional and sends only the passages it needs, stores nothing, and can be switched off.",
    ],
  },
} as const;

/** The forgetting-curve facts, from Hermann Ebbinghaus, “Über das Gedächtnis” (1885). */
export const EBBINGHAUS = {
  year: 1885,
  /** Savings (share of the learning effort still saved on relearning) after the delay. */
  savings: [
    { delay: "20 minutes", hours: 0.33, pct: 58 },
    { delay: "1 hour", hours: 1, pct: 44 },
    { delay: "9 hours", hours: 9, pct: 36 },
    { delay: "1 day", hours: 24, pct: 34 },
    { delay: "2 days", hours: 48, pct: 28 },
    { delay: "6 days", hours: 144, pct: 25 },
    { delay: "31 days", hours: 744, pct: 21 },
  ],
  note: "Ebbinghaus measured it on himself, with lists of nonsense syllables. The figures are the “savings” he recorded when relearning a list after the delay.",
} as const;

/** The resurfacing schedule the product uses. */
export const RESURFACE_DAYS = [1, 3, 7, 21, 60] as const;

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    line: "Everything on one device, for as long as you like.",
    includes: [
      "Unlimited notes, links, backlinks and the map",
      "Search by keyword and by meaning, on your device",
      "Quick capture and voice memos",
      "Plain Markdown files, export at any time",
    ],
  },
  plus: {
    name: "Plus",
    pricePerMonthBilledYearly: 8,
    pricePerYear: 96,
    pricePerMonthBilledMonthly: 10,
    line: "Every device, and a brain that answers.",
    includes: [
      "Everything in Free",
      "Encrypted sync across all your devices",
      "Ask your notes, with sources",
      "Resurface, web clipper and email capture",
      "50 GB of attachments and 30 days of version history",
    ],
  },
  trial: "Every new account starts with 30 days of Plus. No card to start.",
} as const;

export const FAQ = [
  {
    q: "Can I bring the notes I already have?",
    a: "Yes. Point Engram at a folder of Markdown files, or import from Evernote, Apple Notes, Notion and plain text. Links in [[double brackets]] come through as links.",
  },
  {
    q: "Where are my notes stored?",
    a: "In a folder on your computer, as plain Markdown files. Engram keeps its index beside them. If you delete Engram, the folder is still there and still readable.",
  },
  {
    q: "Can Engram read my notes?",
    a: "No. Sync is end-to-end encrypted and the keys stay on your devices. Search by meaning runs on your device too.",
  },
  {
    q: "What does “ask your notes” send anywhere?",
    a: "Only the few passages needed to answer your question, to a model that does not store them or train on them. It is off until you turn it on, and you can turn it off again.",
  },
  {
    q: "Does it work offline?",
    a: "All of it does, except sync and ask-your-notes, which catch up when you are back online.",
  },
  {
    q: "Will it organise my notes for me?",
    a: "It suggests links and never files anything away. There are no folders to maintain. You decide what connects; Engram helps you notice what could.",
  },
  {
    q: "What if I stop paying for Plus?",
    a: "You keep every note and every link, and Free keeps working on one device. You lose sync, ask-your-notes and Resurface until you come back.",
  },
  {
    q: "Is there a student price?",
    a: "Plus is half price with a school address. Write to us from it and we will switch it on.",
  },
] as const;

/**
 * A small, believable second brain to use in demos and live things.
 * Each note links to others by id. `age` is days since it was written.
 * Titles are things a person who reads, builds and cooks might actually keep.
 */
export type Note = {
  id: string;
  title: string;
  body: string;
  links: string[];
  age: number;
};

export const NOTES: Note[] = [
  {
    id: "forgetting",
    title: "The forgetting curve",
    body: "Ebbinghaus, 1885: most of what we learn is gone within a week unless we return to it. The loss is steepest in the first hour.",
    links: ["spacing", "slipbox", "retrieval"],
    age: 41,
  },
  {
    id: "spacing",
    title: "Spaced repetition",
    body: "Return to an idea at widening intervals and the curve flattens. 1, 3, 7, 21, 60 days is a good start.",
    links: ["forgetting", "retrieval", "interview-maya"],
    age: 38,
  },
  {
    id: "retrieval",
    title: "Retrieval beats rereading",
    body: "Trying to recall something strengthens it more than reading it again. A note that asks you a question is worth more than one that tells you an answer.",
    links: ["forgetting", "spacing", "writing"],
    age: 30,
  },
  {
    id: "slipbox",
    title: "Luhmann’s slip box",
    body: "About 90,000 index cards, each with a number, each pointing to its neighbours. He said he never had a thought he did not first have in the box.",
    links: ["forgetting", "writing", "atomic"],
    age: 52,
  },
  {
    id: "atomic",
    title: "One idea per note",
    body: "If a note needs an “and” in its title, it is two notes. Small notes link better.",
    links: ["slipbox", "writing"],
    age: 27,
  },
  {
    id: "writing",
    title: "Writing starts from notes, not from a blank page",
    body: "An essay is a walk through notes you already have. Pick a note, follow its links, and the outline appears.",
    links: ["slipbox", "atomic", "retrieval", "pricing"],
    age: 19,
  },
  {
    id: "interview-maya",
    title: "Interview with Maya, 14 March",
    body: "She stopped using her old app because she could not find anything. “I wrote it down. I just can’t say where.” Price was not the issue; trust was.",
    links: ["spacing", "pricing", "trust"],
    age: 223,
  },
  {
    id: "pricing",
    title: "Pricing idea: charge for sync, not for notes",
    body: "Notes should be free and yours. Charge for the work that costs us something: sync, the model, storage.",
    links: ["interview-maya", "trust", "writing"],
    age: 200,
  },
  {
    id: "trust",
    title: "Trust comes from being able to leave",
    body: "Plain files. Export is the folder. If the company disappears, nothing is lost.",
    links: ["interview-maya", "pricing", "files"],
    age: 180,
  },
  {
    id: "files",
    title: "Plain text lasts",
    body: "A Markdown file written in 2004 opens today on anything. Few apps from 2004 can say the same.",
    links: ["trust"],
    age: 150,
  },
  {
    id: "shelf",
    title: "Kitchen shelf, measurements",
    body: "Alcove is 94 cm wide, 31 cm deep. Oak, 22 mm. Brackets every 40 cm. Spice jars are 6 cm; tall oil bottles need 32 cm of height.",
    links: ["oak"],
    age: 12,
  },
  {
    id: "oak",
    title: "Oak, how to finish",
    body: "Hardwax oil, two thin coats, sand lightly between them. Wait a day before putting anything wet on it.",
    links: ["shelf"],
    age: 9,
  },
  {
    id: "lisbon",
    title: "Lisbon, September",
    body: "Train from Porto leaves at 08:12. The place by the tram stop with the custard tarts: Rua de Santa Marta, closed Mondays.",
    links: [],
    age: 66,
  },
  {
    id: "sourdough",
    title: "Sourdough, what worked",
    body: "75% hydration, 20% starter, 12 hours at 21 °C. Bake covered for 20 minutes, uncovered for 25.",
    links: [],
    age: 88,
  },
];

export const NOTE_BY_ID: Record<string, Note> = Object.fromEntries(
  NOTES.map((n) => [n.id, n]),
);

/** A sentence Ask-your-notes can answer, with the notes it draws on. */
export const SAMPLE_QUESTION = {
  q: "Why did Maya leave her old app?",
  a: "She couldn’t find anything she had written. Price wasn’t the reason; she no longer trusted that her notes were retrievable.",
  sources: ["interview-maya", "trust"],
} as const;
