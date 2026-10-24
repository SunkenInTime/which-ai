/* Die-cut edges for the stationery, as clip-path polygons: scallops bitten out of an edge, and a zigzag tear.
   x runs in percent of the piece's width, y in pixels from the edge, so the cut keeps its depth at any width. */

type Edge = "top" | "bottom";

function bites(count: number, depth: number, edge: Edge) {
  const pts: string[] = [];
  const steps = 6;
  const w = 100 / count;
  const order = edge === "top" ? [...Array(count).keys()] : [...Array(count).keys()].reverse();
  for (const k of order) {
    for (let s = 0; s <= steps; s++) {
      const t = edge === "top" ? s / steps : 1 - s / steps;
      const angle = Math.PI * (1 - t);
      const x = (k + 0.5) * w + (w / 2) * Math.cos(angle);
      const y = depth * Math.sin(angle);
      const xs = `${x.toFixed(3)}%`;
      pts.push(edge === "top" ? `${xs} ${y.toFixed(2)}px` : `${xs} calc(100% - ${y.toFixed(2)}px)`);
    }
  }
  return pts;
}

/** A piece with scalloped top and/or bottom edges and straight sides. */
export function scallops(count: number, depth: number, top = true, bottom = true) {
  const pts = [
    ...(top ? bites(count, depth, "top") : ["0% 0px", "100% 0px"]),
    ...(bottom ? bites(count, depth, "bottom") : ["100% 100%", "0% 100%"]),
  ];
  return `polygon(${pts.join(", ")})`;
}

/** A slip torn off along a zigzag at the bottom. */
export function zigzag(teeth: number, depth: number) {
  const pts = ["0% 0px", "100% 0px"];
  for (let k = teeth * 2; k >= 0; k--) {
    const x = (k / (teeth * 2)) * 100;
    pts.push(`${x.toFixed(3)}% ${k % 2 ? "100%" : `calc(100% - ${depth}px)`}`);
  }
  return `polygon(${pts.join(", ")})`;
}
