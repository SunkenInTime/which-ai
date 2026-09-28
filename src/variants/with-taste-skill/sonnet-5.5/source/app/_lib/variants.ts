export const VARIANTS = [
  { n: 1, name: "Reading Room" },
  { n: 2, name: "Graph" },
  { n: 3, name: "Poster" },
  { n: 4, name: "Glass" },
  { n: 5, name: "Highlighter" },
] as const;

export type VariantNumber = (typeof VARIANTS)[number]["n"];
