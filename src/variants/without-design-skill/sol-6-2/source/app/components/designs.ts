export const designs = {
  "1": { title: "Room to think", theme: "paper", color: "#2147d8" },
  "2": { title: "In connection", theme: "network", color: "#166d4a" },
  "3": { title: "The idea garden", theme: "garden", color: "#667c55" },
  "4": { title: "The capture desk", theme: "studio", color: "#fb623d" },
  "5": { title: "A mind of its own", theme: "cloud", color: "#8a73e9" },
} as const;

export type Design = keyof typeof designs;

export function isDesign(value: string): value is Design {
  return Object.hasOwn(designs, value);
}
