import field from "./field.json";

/**
 * The chart is drawn in a 1000 × 1000 box with the pole at (500, 500).
 * Background stars are pre-generated (see field.json) so that server and
 * client render exactly the same sky.
 */
export const FIELD = field as [x: number, y: number, r: number, opacity: number, twinkle: number][];

export const GREEK = ["α", "β", "γ", "δ", "ε", "ζ", "η"];

export type Star = {
  x: number;
  y: number;
  /** 1 is brightest. */
  mag: 1 | 2 | 3;
  title: string;
  links: number;
  /** Offset of the Greek letter from the star. */
  dx?: number;
  dy?: number;
};

export type Constellation = {
  id: string;
  name: string;
  gloss: string;
  since: string;
  label: [x: number, y: number];
  stars: Star[];
  edges: [number, number][];
};

export const CONSTELLATIONS: Constellation[] = [
  {
    id: "memoria",
    name: "Memoria",
    gloss: "on remembering",
    since: "Nov 2022",
    label: [300, 146],
    stars: [
      { x: 330, y: 190, mag: 1, title: "The forgetting curve", links: 9 },
      { x: 250, y: 215, mag: 2, title: "Spaced repetition, explained to myself", links: 6, dx: -16, dy: -8 },
      { x: 265, y: 330, mag: 2, title: "Why I forget what I read", links: 5, dx: -6, dy: 20 },
      { x: 395, y: 250, mag: 3, title: "The testing effect", links: 4 },
      { x: 345, y: 320, mag: 3, title: "Sleep is when memory gets filed", links: 4, dx: 10, dy: 16 },
      { x: 205, y: 290, mag: 3, title: "Memory palaces, tried once", links: 2, dx: -18, dy: 4 },
    ],
    edges: [
      [1, 0],
      [0, 3],
      [3, 4],
      [4, 2],
      [2, 5],
      [5, 1],
      [0, 4],
    ],
  },
  {
    id: "ambulatio",
    name: "Ambulatio",
    gloss: "on walking",
    since: "Jun 2022",
    label: [706, 138],
    stars: [
      { x: 600, y: 170, mag: 1, title: "Walking makes ideas", links: 5, dx: -16, dy: -8 },
      { x: 750, y: 205, mag: 2, title: "Jane Jacobs on sidewalks", links: 4 },
      { x: 670, y: 230, mag: 3, title: "Solvitur ambulando", links: 3, dx: -6, dy: 20 },
      { x: 800, y: 290, mag: 3, title: "Desire paths", links: 3 },
      { x: 720, y: 330, mag: 2, title: "Walking one-on-ones", links: 4, dx: -18, dy: 14 },
    ],
    edges: [
      [0, 2],
      [2, 1],
      [1, 3],
      [3, 4],
      [2, 4],
    ],
  },
  {
    id: "officina",
    name: "Officina",
    gloss: "on work",
    since: "Sep 2023",
    label: [762, 634],
    stars: [
      { x: 790, y: 470, mag: 1, title: "Pricing: three tiers is a habit, not a law", links: 5 },
      { x: 700, y: 450, mag: 2, title: "Meeting notes are not notes", links: 8, dx: -16, dy: -8 },
      { x: 830, y: 560, mag: 3, title: "Launch retro, what we’d change", links: 6 },
      { x: 740, y: 580, mag: 2, title: "Questions to ask before saying yes", links: 6, dx: -4, dy: 21 },
      { x: 660, y: 540, mag: 3, title: "Prompts for a better one-on-one", links: 3, dx: -18, dy: 6 },
    ],
    edges: [
      [1, 0],
      [0, 2],
      [2, 3],
      [3, 4],
      [4, 1],
    ],
  },
  {
    id: "panis",
    name: "Panis",
    gloss: "on bread",
    since: "Feb 2024",
    label: [664, 872],
    stars: [
      { x: 590, y: 700, mag: 1, title: "Sourdough, attempt nine", links: 3, dx: -16, dy: -6 },
      { x: 680, y: 720, mag: 2, title: "Hydration ratios, a table", links: 4, dx: 8, dy: -9 },
      { x: 650, y: 810, mag: 3, title: "The fridge trick", links: 2, dx: -17, dy: 10 },
      { x: 740, y: 800, mag: 2, title: "Grandmother’s rye", links: 3 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 0],
      [1, 3],
    ],
  },
  {
    id: "hortus",
    name: "Hortus",
    gloss: "on gardens",
    since: "Apr 2024",
    label: [436, 842],
    stars: [
      { x: 330, y: 660, mag: 1, title: "Tomatoes want deeper water", links: 3, dx: 10, dy: -8 },
      { x: 270, y: 720, mag: 3, title: "Compost log", links: 2, dx: -18, dy: 6 },
      { x: 390, y: 730, mag: 2, title: "What bolted in July", links: 2 },
      { x: 330, y: 790, mag: 2, title: "Seed order, spring", links: 3, dx: 10, dy: 12 },
      { x: 300, y: 850, mag: 3, title: "Soil is alive", links: 2, dx: -18, dy: 8 },
    ],
    edges: [
      [1, 0],
      [0, 2],
      [0, 3],
      [3, 4],
    ],
  },
  {
    id: "fabula",
    name: "Fabula",
    gloss: "on stories",
    since: "Dec 2022",
    label: [228, 664],
    stars: [
      { x: 160, y: 440, mag: 1, title: "Dad’s ferry story, recorded", links: 2, dx: -6, dy: -12 },
      { x: 230, y: 470, mag: 3, title: "Opening lines I love", links: 4, dx: 8, dy: -9 },
      { x: 270, y: 540, mag: 2, title: "Plot is a promise", links: 5 },
      { x: 210, y: 600, mag: 2, title: "Notes on The Overstory", links: 3, dx: 8, dy: 16 },
      { x: 140, y: 560, mag: 3, title: "Names of the other deckhands", links: 1, dx: -18, dy: 6 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
];

/**
 * The lines nobody planned: links that jump between subjects.
 * [constellation, star] → [constellation, star]
 */
export const CROSSINGS: [[number, number], [number, number]][] = [
  // The forgetting curve → Walking makes ideas
  [
    [0, 0],
    [1, 0],
  ],
  // Walking one-on-ones → Meeting notes are not notes
  [
    [1, 4],
    [2, 1],
  ],
  // Tomatoes want deeper water → Sourdough, attempt nine
  [
    [4, 0],
    [3, 0],
  ],
  // Dad’s ferry story → Memory palaces
  [
    [5, 0],
    [0, 5],
  ],
];

export const TOTALS = { notes: 1284, links: 3906 };
