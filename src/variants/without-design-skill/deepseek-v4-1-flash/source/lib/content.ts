export const brand = {
  name: "Cortex",
  product: "a second brain",
} as const;

export const nav = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Changelog", href: "#changelog" },
] as const;

export const hero = {
  eyebrow: "Local-first notes · v4.2",
  headline: ["Your notes should", "remember for you."],
  sub: "Cortex is the notebook that connects what you write. Every note you drop in becomes linked, searchable, and answerable — so six months of thinking is never lost to a folder you forgot.",
  ctaPrimary: "Start your brain",
  ctaSecondary: "See how linking works",
  footnote: "Free for your first 1,000 notes. No account required to try.",
} as const;

export const features = [
  {
    kicker: "01",
    title: "Capture without friction",
    body: "A keystroke from anywhere — browser, phone, terminal. Type a thought, paste a link, clip a page. Cortext puts it in the right place before you have to think about it.",
    icon: "capture" as const,
  },
  {
    kicker: "02",
    title: "Connections that surface themselves",
    body: "Mention a person, a project, an idea — Cortex notices and links it. Your archive becomes a graph you can actually read, not a pile of orphaned documents.",
    icon: "graph" as const,
  },
  {
    kicker: "03",
    title: "Ask your own archive",
    body: "“What did I decide about pricing in March?” Cortex reads your notes, cites the exact lines, and shows you the meeting it came from. Answers, not search results.",
    icon: "spark" as const,
  },
  {
    kicker: "04",
    title: "Private, offline, and yours",
    body: "Your notes live on your disk, encrypted, synced peer to peer. Export everything as plain Markdown at any time. No lock-in, no training on your data.",
    icon: "lock" as const,
  },
] as const;

export const stats = [
  { value: "2.1M", label: "notes captured daily" },
  { value: "38k", label: "linked connections per brain" },
  { value: "94%", label: "of notes re-found in under 3s" },
  { value: "0", label: "trackers, ever" },
] as const;

export const quotes = [
  {
    body: "I stopped keeping a to-do app, a journal, and a research folder. It's one surface now, and it remembers the thread between them.",
    name: "Dana Okafor",
    role: "Staff PM, Kite",
  },
  {
    body: "The backlinks are the feature. Every time I write about a topic it hands me everything I've ever thought about it.",
    name: "Milo Reinhardt",
    role: "PhD candidate, HCI",
  },
  {
    body: "It's the first notes app that survived a laptop reinstall. Export is just Markdown, so I never felt trapped.",
    name: "Priya Raman",
    role: "Founder, Ledgerly",
  },
] as const;

export const footerGroups = [
  { title: "Product", items: ["Overview", "Sync", "Mobile", "Changelog", "Pricing"] },
  { title: "Company", items: ["About", "Manifesto", "Careers", "Press"] },
  { title: "Resources", items: ["Docs", "Markdown export", "Community", "Status"] },
] as const;

export type IconName = (typeof features)[number]["icon"];
