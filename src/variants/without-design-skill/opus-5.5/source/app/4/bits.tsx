import type { CSSProperties } from "react";

const PIN_COLORS = {
  tomato: ["#FF8A70", "#E4472C", "#8F2211"],
  marigold: ["#FFE29A", "#F5B83D", "#A36A0A"],
  cobalt: ["#8FA6FF", "#2446C8", "#10206B"],
  ink: ["#8A7D70", "#3A3029", "#120D09"],
} as const;

export type PinColor = keyof typeof PIN_COLORS;

/** A glossy push-pin head. Purely decorative. */
export function Pin({
  color = "tomato",
  className = "",
  style,
}: {
  color?: PinColor;
  className?: string;
  style?: CSSProperties;
}) {
  const [hi, mid, lo] = PIN_COLORS[color];
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute block h-[18px] w-[18px] rounded-full ${className}`}
      style={{
        background: `radial-gradient(circle at 34% 30%, ${hi} 0 14%, ${mid} 46%, ${lo} 100%)`,
        boxShadow:
          "0 1px 0 rgba(255,255,255,.25) inset, 3px 4px 3px -1px rgba(40,20,0,.45)",
        ...style,
      }}
    />
  );
}

/** A strip of translucent masking tape. */
export function Tape({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute block h-6 w-24 ${className}`}
      style={{
        background:
          "linear-gradient(90deg, rgba(250,240,205,.78), rgba(245,232,190,.7))",
        boxShadow: "0 1px 2px rgba(60,40,0,.18)",
        clipPath:
          "polygon(0 8%, 4% 0, 8% 10%, 12% 0, 100% 0, 97% 20%, 100% 40%, 96% 60%, 100% 80%, 97% 100%, 0 100%, 3% 70%, 0 45%, 4% 25%)",
        ...style,
      }}
    />
  );
}

/** clip-path for paper with a torn / serrated bottom edge. */
export function tornBottom(teeth = 16, depth = 7): string {
  const pts = ["0 0", "100% 0"];
  for (let i = 0; i <= teeth * 2; i++) {
    const x = 100 - (i * 100) / (teeth * 2);
    const y = i % 2 === 0 ? `calc(100% - ${depth}px)` : "100%";
    pts.push(`${x.toFixed(2)}% ${y}`);
  }
  return `polygon(${pts.join(", ")})`;
}

export const CORK: CSSProperties = {
  backgroundColor: "#C69361",
  backgroundImage: [
    "radial-gradient(circle, rgba(120,70,25,.55) 0.8px, transparent 1.4px)",
    "radial-gradient(circle, rgba(236,196,146,.6) 0.8px, transparent 1.5px)",
    "radial-gradient(circle, rgba(95,55,20,.35) 1.2px, transparent 2px)",
    "radial-gradient(ellipse at 30% 20%, rgba(255,220,170,.25), transparent 60%)",
  ].join(", "),
  backgroundSize: "7px 7px, 11px 11px, 23px 23px, 100% 100%",
  backgroundPosition: "0 0, 3px 5px, 9px 13px, 0 0",
};
