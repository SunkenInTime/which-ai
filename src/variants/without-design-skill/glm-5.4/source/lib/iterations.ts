export type Iteration = {
  slug: string;
  href: string;
  name: string;
  note: string;
  swatch: [string, string, string];
};

export const ITERATIONS: Iteration[] = [
  {
    slug: "1",
    href: "/1",
    name: "Minimal",
    note: "Type on paper",
    swatch: ["#f6f4ee", "#141414", "#f4e63a"],
  },
  {
    slug: "2",
    href: "/2",
    name: "Editorial",
    note: "Ink and serif",
    swatch: ["#f3ecdf", "#1f3a2e", "#b4452b"],
  },
  {
    slug: "3",
    href: "/3",
    name: "Neural",
    note: "Dark graph",
    swatch: ["#08080c", "#a78bfa", "#22d3ee"],
  },
  {
    slug: "4",
    href: "/4",
    name: "Playful",
    note: "Stickers and ink",
    swatch: ["#fff3c9", "#ff5ca8", "#17140f"],
  },
  {
    slug: "5",
    href: "/5",
    name: "Calm",
    note: "Soft and organic",
    swatch: ["#eef3ec", "#2e7d6b", "#e98a6a"],
  },
];

export function step(index: number, dir: 1 | -1) {
  return ITERATIONS[(index + dir + ITERATIONS.length) % ITERATIONS.length].href;
}
