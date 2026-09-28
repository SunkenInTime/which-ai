/*
  Product facts shared by all five iterations so the copy stays consistent.
  Everything here is placeholder content for a design exploration:
  names, quotes and prices are invented (mock).
*/

export const BRAND = "Pith";

/** One label per intent, used everywhere a page asks for the download. */
export const CTA_PRIMARY = "Download Pith";
export const CTA_SECONDARY = "See how it works";

export const QUOTES = [
  {
    body: "I stopped filing things. I write what I'm thinking and the links show up on their own.",
    name: "Dalia Haddad",
    role: "Doctoral researcher",
  },
  {
    body: "Three years of interview notes, and Pith found the one sentence I half remembered.",
    name: "Tomasz Wierzbicki",
    role: "Product designer",
  },
  {
    body: "It's the first notes app where old notes come back to me, instead of me digging for them.",
    name: "Sione Havili",
    role: "Staff writer",
  },
  {
    body: "Plain Markdown on my own disk was the deal breaker. Everything else was a bonus.",
    name: "Priya Raghunathan",
    role: "Patent attorney",
  },
] as const;

export const FAQ = [
  {
    q: "Where are my notes stored?",
    a: "On your device, as plain Markdown files in a folder you choose. Sync is optional and end-to-end encrypted.",
  },
  {
    q: "Can I bring my notes from Obsidian or Notion?",
    a: "Yes. Point Pith at an export or a vault and it keeps your links, tags and attachments.",
  },
  {
    q: "How does Ask work?",
    a: "You ask a question in plain English. Pith answers from your notes only and lists the notes it used.",
  },
  {
    q: "Does it work offline?",
    a: "Everything except sync and Ask works offline. Ask can run on-device on recent Macs.",
  },
] as const;

export const FOOTER_LINKS = {
  Product: ["Features", "Privacy", "Pricing", "Changelog"],
  Company: ["About", "Journal", "Careers", "Contact"],
  Legal: ["Terms", "Privacy policy", "Security"],
} as const;

export const ASK_EXAMPLES = [
  {
    q: "What did I decide about the launch date?",
    a: "You moved the launch to the first week of March after the vendor call, and dropped the Android beta to keep that date.",
    sources: ["Launch checklist", "Call with the vendor"],
  },
  {
    q: "What did I read about sleep and memory?",
    a: "Three notes agree that sleep after learning matters more than extra study time. Your own experiment note suggests reviewing the night before, not the morning of.",
    sources: ["Why We Sleep, highlights", "Spaced repetition", "Exam week experiment"],
  },
  {
    q: "Where did the idea for the garden layout come from?",
    a: "From a walk on 14 May. You sketched raised beds along the south fence and linked it to your notes on companion planting.",
    sources: ["Garden beds, first sketch", "Companion planting"],
  },
] as const;
