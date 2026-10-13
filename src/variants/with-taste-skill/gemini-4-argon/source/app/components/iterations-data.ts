export interface IterationMeta {
  id: string;
  path: string;
  brand: string;
  title: string;
  archetype: string;
  dials: {
    variance: number;
    motion: number;
    density: number;
  };
  palette: string;
}

export const ITERATIONS: IterationMeta[] = [
  {
    id: "1",
    path: "/1",
    brand: "Vellum",
    title: "Archival Monograph",
    archetype: "Editorial research & citation studio",
    dials: { variance: 6, motion: 4, density: 3 },
    palette: "Alabaster & Cobalt",
  },
  {
    id: "2",
    path: "/2",
    brand: "Cortex",
    title: "Graph-Native Local",
    archetype: "Technical systems & instant recall",
    dials: { variance: 7, motion: 6, density: 5 },
    palette: "Zinc & Emerald",
  },
  {
    id: "3",
    path: "/3",
    brand: "Atelier",
    title: "Spatial Canvas",
    archetype: "Sticky-stack choreography & moodboards",
    dials: { variance: 9, motion: 8, density: 3 },
    palette: "Silver-Smoke & Vermilion",
  },
  {
    id: "4",
    path: "/4",
    brand: "Zettel",
    title: "Swiss Slip-Box",
    archetype: "High-density brutalist atomic index",
    dials: { variance: 8, motion: 4, density: 8 },
    palette: "Stone & Brick Red",
  },
  {
    id: "5",
    path: "/5",
    brand: "Canopy",
    title: "Botanical Recall",
    archetype: "Calm frosted-glass daily reflection",
    dials: { variance: 7, motion: 6, density: 3 },
    palette: "Forest Mist & Amber",
  },
];
