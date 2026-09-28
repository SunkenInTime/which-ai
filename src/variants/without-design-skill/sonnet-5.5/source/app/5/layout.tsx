import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  variable: "--f-fraunces",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--f-dm",
});

export const metadata: Metadata = {
  title: "Engram — Let your ideas grow",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${fraunces.variable} ${dmSans.variable} relative flex-1 overflow-x-clip bg-[color:#eef2e4] font-[family-name:var(--f-dm),var(--font-geist-sans),sans-serif] text-[color:#1f3a2b] selection:bg-[color:#f4e3a1]`}
    >
      {/* soft paper grain */}
      <svg aria-hidden className="pointer-events-none fixed inset-0 z-0 size-full opacity-[0.35] mix-blend-multiply">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.12  0 0 0 0 0.23  0 0 0 0 0.17  0 0 0 0.09 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
