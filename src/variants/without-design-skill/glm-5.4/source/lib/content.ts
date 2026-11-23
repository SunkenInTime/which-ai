import type { IconName } from "@/variants/without-design-skill/glm-5.4/source/components/icons";

export type Feature = { id: string; icon: IconName; title: string; blurb: string };

export const features: Feature[] = [
  {
    id: "capture",
    icon: "inbox",
    title: "Capture without friction",
    blurb: "Type, paste a link, forward an email or just talk. Everything lands in one inbox, already sorted.",
  },
  {
    id: "connect",
    icon: "network",
    title: "A brain that connects itself",
    blurb: "Every new note is linked to related ideas automatically, so yesterday's reading resurfaces when it matters.",
  },
  {
    id: "ask",
    icon: "sparkles",
    title: "Ask, don't search",
    blurb: "Question your notes in plain language and get an answer with sources. What did I decide about pricing in March?",
  },
  {
    id: "resurface",
    icon: "repeat",
    title: "Resurface on schedule",
    blurb: "Spaced repeats bring old ideas back right before you would have forgotten them.",
  },
  {
    id: "yours",
    icon: "lock",
    title: "Yours, forever",
    blurb: "Plain Markdown underneath, end-to-end encrypted and exportable in one click. No lock-in, ever.",
  },
  {
    id: "fast",
    icon: "zap",
    title: "Fast everywhere",
    blurb: "Offline-first with sync in under 50ms. Press ⌘K and jump to any thought you have ever had.",
  },
];

export const testimonials = [
  {
    quote:
      "I had four thousand notes and no memory of any of them. Axon is the first tool that actually remembers with me.",
    name: "Maya Chen",
    role: "Product designer, Northwind",
    initials: "MC",
  },
  {
    quote:
      "Meeting notes, articles and half-formed ideas finally talk to each other in Axon. It changed how I write.",
    name: "Daniel Okafor",
    role: "Engineering lead, Ferro Labs",
    initials: "DO",
  },
  {
    quote:
      "I asked what we had decided about pricing last quarter. It answered in four seconds, with links.",
    name: "Sofia Marques",
    role: "Founder, Studio Lume",
    initials: "SM",
  },
];

export const stats = [
  { value: "48k", label: "thinkers on Axon" },
  { value: "12M", label: "links made every week" },
  { value: "4.9", label: "average App Store rating" },
  { value: "48ms", label: "median sync time" },
];

export const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    blurb: "For getting your first hundred thoughts down.",
    items: ["100 notes", "3 notebooks", "Instant search"],
    cta: "Start for free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$8",
    period: "per month",
    blurb: "For people who think for a living.",
    items: ["Unlimited notes", "Auto-linking and graph", "Ask your notes", "Spaced repeats"],
    cta: "Start a 14-day trial",
    featured: true,
  },
  {
    name: "Team",
    price: "$14",
    period: "per seat, per month",
    blurb: "For teams that share a brain.",
    items: ["Everything in Pro", "Shared brains", "Comments and mentions", "SSO and admin controls"],
    cta: "Talk to us",
    featured: false,
  },
];

export const steps = [
  {
    title: "Capture",
    body: "Drop in anything. A thought, a PDF, a voice memo from the walk home.",
  },
  {
    title: "Connect",
    body: "Axon reads it, tags it and wires it to everything related you have ever saved.",
  },
  {
    title: "Recall",
    body: "Ask, browse the graph, or let the right note find you at the right time.",
  },
];

export const faqs = [
  {
    q: "How is Axon different from Notion or Obsidian?",
    a: "Axon is built around remembering, not organising. You never maintain a folder tree. Links, tags and summaries are made for you, and the graph is something you read rather than something you tend.",
  },
  {
    q: "Where do my notes live?",
    a: "On your devices first. Notes sync end-to-end encrypted through our relay, and every note is a plain Markdown file you can export at any time.",
  },
  {
    q: "Does the AI train on my notes?",
    a: "No. Your notes are yours. We never train models on your content, and AI features run against your vault only, at your request.",
  },
  {
    q: "Which platforms are supported?",
    a: "Mac, Windows, iOS, Android and the web, with offline mode everywhere. Linux is in beta.",
  },
  {
    q: "Can I import from my current tool?",
    a: "Yes. One-click import from Notion, Evernote, Obsidian, Roam, Apple Notes and plain Markdown folders keeps your links intact.",
  },
];

export const logos = ["Northwind", "Ferro Labs", "Studio Lume", "Halide", "Kindred", "Arca"];
