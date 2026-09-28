export const W = 1200;
export const H = 780;

export type Place = {
  id: string;
  name: string;
  x: number;
  y: number;
  /** How many notes live here. Drives height on the map. */
  notes: number;
  touched: string;
  /** 0 to 1: how much attention this place got this week. Drives the pink layer. */
  heat: number;
  roads: string[];
};

export const places: Place[] = [
  { id: "work", name: "Product launch", x: 850, y: 235, notes: 61, touched: "today", heat: 0.85, roads: ["memory", "lisbon"] },
  { id: "sourdough", name: "Sourdough", x: 585, y: 335, notes: 23, touched: "today", heat: 1, roads: ["kitchen", "memory"] },
  { id: "memory", name: "Memory and habit", x: 720, y: 470, notes: 38, touched: "yesterday", heat: 0.8, roads: ["work", "reading", "sourdough"] },
  { id: "kitchen", name: "Kitchen renovation", x: 300, y: 565, notes: 46, touched: "3 weeks ago", heat: 0.18, roads: ["sourdough", "family"] },
  { id: "lisbon", name: "Lisbon", x: 1035, y: 485, notes: 14, touched: "this week", heat: 0.5, roads: ["work"] },
  { id: "reading", name: "Reading", x: 545, y: 660, notes: 27, touched: "last week", heat: 0.32, roads: ["memory"] },
  { id: "family", name: "Family", x: 135, y: 470, notes: 33, touched: "2 weeks ago", heat: 0.22, roads: ["kitchen"] },
  { id: "piano", name: "Piano", x: 965, y: 690, notes: 9, touched: "in June", heat: 0.04, roads: [] },
];

export function byId(id: string) {
  return places.find((p) => p.id === id)!;
}

/** Each road once, regardless of which end lists it. */
export const roads: [string, string][] = (() => {
  const seen = new Set<string>();
  const out: [string, string][] = [];
  for (const p of places)
    for (const q of p.roads) {
      const key = [p.id, q].sort().join("|");
      if (!seen.has(key)) {
        seen.add(key);
        out.push([p.id, q]);
      }
    }
  return out;
})();
