export type Variant = {
  n: number;
  href: string;
  name: string;
  blurb: string;
  swatch: string;
};

export const variants: Variant[] = [
  {
    n: 1,
    href: "/1",
    name: "Slip box",
    blurb: "Manila index cards on a leather desk, typed on a typewriter",
    swatch: "#f0d9a7",
  },
  {
    n: 2,
    href: "/2",
    name: "Legal pad",
    blurb: "A canary pad with real rules, written in marker",
    swatch: "#f8e27c",
  },
  {
    n: 3,
    href: "/3",
    name: "Margins",
    blurb: "A book page with highlighter and pencil notes in the margin",
    swatch: "#ffe24d",
  },
  {
    n: 4,
    href: "/4",
    name: "Chalkboard",
    blurb: "A chalk-drawn map of every note and every link",
    swatch: "#213a31",
  },
  {
    n: 5,
    href: "/5",
    name: "Two brains",
    blurb: "Black and white, split down the middle, with a draggable divider",
    swatch: "#000000",
  },
];
