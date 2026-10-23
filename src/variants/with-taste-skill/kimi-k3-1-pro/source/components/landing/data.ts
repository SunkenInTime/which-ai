export type Memory = {
  id: number;
  title: string;
  body: string;
  date: string;
  kind: string;
  tags: string[];
  related: string[];
};

export const memories: Memory[] = [
  {
    id: 1,
    title: "Slower mornings",
    body: "Leave the first hour unclaimed. Coffee on the steps, a paperback instead of a feed, and one page of loose thoughts before the day gets noisy.",
    date: "Tuesday, 8:14 am",
    kind: "Journal",
    tags: ["rituals", "attention", "morning"],
    related: ["The attention residue essay", "A house with fewer notifications"],
  },
  {
    id: 2,
    title: "The attention residue essay",
    body: "The cost of switching is not only the lost minute. Part of the mind stays with the previous task. Keep a parking-lot note open and return to one thing.",
    date: "18 October",
    kind: "Reading note",
    tags: ["attention", "research", "focus"],
    related: ["Slower mornings", "Deep work questions"],
  },
  {
    id: 3,
    title: "A garden for the north wall",
    body: "Ferns near the downpipe, hellebores under the window, and a narrow bench where the afternoon sun reaches. Ask about soil depth before buying anything.",
    date: "12 October",
    kind: "Project",
    tags: ["garden", "home", "plants"],
    related: ["Shade plants to research", "Weekend errands"],
  },
  {
    id: 4,
    title: "Deep work questions",
    body: "What would make focused work feel like the default rather than an achievement? Try one closed-door block, then write down where the interruptions began.",
    date: "4 October",
    kind: "Thinking",
    tags: ["focus", "attention", "work"],
    related: ["The attention residue essay", "Slower mornings"],
  },
  {
    id: 5,
    title: "Lisbon, without a checklist",
    body: "Save the long way up to Graça, the tiny ceramics studio, and an unplanned afternoon by the river. One good place each day is enough.",
    date: "28 September",
    kind: "Travel",
    tags: ["travel", "lisbon", "places"],
    related: ["Books for the train", "A slower kind of itinerary"],
  },
  {
    id: 6,
    title: "A house with fewer notifications",
    body: "Chargers outside the bedroom, one shared paper list in the kitchen, and a small basket for phones by the door. Make the quiet choice the easy choice.",
    date: "19 September",
    kind: "Idea",
    tags: ["home", "attention", "rituals"],
    related: ["Slower mornings", "The attention residue essay"],
  },
];

export const faqs = [
  {
    question: "Is Morrow another place to organise folders?",
    answer: "Only if you want it to be. Notes can live in collections, but Morrow also connects people, places, sources, and recurring ideas so a useful thought can find you later.",
  },
  {
    question: "Can I bring my existing notes?",
    answer: "Yes. Import Markdown, plain text, and common note exports. Your original files remain readable, and you can export your whole space whenever you like.",
  },
  {
    question: "Does it work offline?",
    answer: "Yes. Capture and search on your device without a connection. Changes sync when you are back online, with end-to-end encryption on private spaces.",
  },
  {
    question: "Will AI read everything I write?",
    answer: "No. Your private notes are never used to train shared models. Optional recall features run only on the notes you choose, and every suggestion links back to its source.",
  },
  {
    question: "What happens if I cancel?",
    answer: "Your space moves to the free plan. You keep every note and can export the complete archive, including attachments and connections, at any time.",
  },
];

export const capabilities = [
  {
    title: "Capture before it disappears",
    short: "Quick capture",
    body: "Send a sentence, a voice memo, a photo, or a whole article. Morrow keeps the source and the moment, without asking you to file it first.",
    detail: "A new note takes seconds, not sorting.",
  },
  {
    title: "Connections form as you write",
    short: "Gentle connections",
    body: "Related notes surface beside your draft. A name from last spring or a sentence from a book returns when it can help, not as another notification.",
    detail: "Every suggestion leads to the original note.",
  },
  {
    title: "Search the way you remember",
    short: "Natural recall",
    body: "Ask for “that garden idea with the north wall” or “the essay about attention.” Meaning, dates, and your own words work together.",
    detail: "Search six real sample notes on this page.",
  },
  {
    title: "Private by design",
    short: "Private spaces",
    body: "Your archive belongs to you. Private spaces are encrypted, exports are complete, and your thinking is never raw material for someone else’s model.",
    detail: "Offline access and complete exports included.",
  },
];
