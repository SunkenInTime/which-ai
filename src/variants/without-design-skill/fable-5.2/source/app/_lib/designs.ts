export type Design = {
  id: number;
  href: string;
  name: string;
  tagline: string;
  rationale: string;
  type: string;
  swatches: string[];
};

export const designs: Design[] = [
  {
    id: 1,
    href: "/1",
    name: "Workbench",
    tagline: "The page is the demo.",
    rationale:
      "Product-led and precise. The hero is a working editor: type a thought and older notes surface beside it, which is the whole promise of a second brain in ten seconds.",
    type: "Instrument Sans · Geist Mono",
    swatches: ["#f5f5f1", "#0d0e12", "#2a45f5", "#eaedff"],
  },
  {
    id: 2,
    href: "/2",
    name: "Marginalia",
    tagline: "An essay with notes in the margin.",
    rationale:
      "Editorial and argued. The landing page is written the way the app works — linked phrases you can hover, sidenotes, related notes turning up in the margin, and testimonials as backlinks.",
    type: "Newsreader · IBM Plex Mono · Reenie Beanie",
    swatches: ["#f4f1e9", "#1b1a17", "#ffe566", "#d23b2a"],
  },
  {
    id: 3,
    href: "/3",
    name: "Atlas",
    tagline: "Your notes as a night sky.",
    rationale:
      "Atmospheric and a little romantic. Every note is a star, every link a line; the hero is an explorable chart of constellations drawn like an engraved celestial atlas.",
    type: "Cormorant · EB Garamond · DM Mono",
    swatches: ["#0a1026", "#16224b", "#ede6d3", "#d6b56c"],
  },
  {
    id: 4,
    href: "/4",
    name: "Zettel",
    tagline: "Forget everything.",
    rationale:
      "Loud and systematic. A Swiss-poster treatment built on the index card — the original second brain — with a deck you can deal through and features filed A to Z.",
    type: "Archivo (condensed → wide) · Courier Prime",
    swatches: ["#ff4a1c", "#0d0d0d", "#f4efe4", "#ebd9a8"],
  },
  {
    id: 5,
    href: "/5",
    name: "Stillwater",
    tagline: "Set it down.",
    rationale:
      "Quiet and humane. For people who want a lighter head rather than a system: drop a thought in the water, watch it settle, and trust it to come back.",
    type: "Quicksand · Delius",
    swatches: ["#e9eee8", "#2c3531", "#3f5a49", "#c9a58e"],
  },
];
