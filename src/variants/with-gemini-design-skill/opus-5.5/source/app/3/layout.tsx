import type { Metadata } from "next";
import type { ReactNode } from "react";
// Gallery adaptation: fonts come from ../fonts.css (self-hosted, prefixed names) instead of next/font.

export const metadata: Metadata = {
  title: "Kept: never lose a good idea again",
  description:
    "Kept saves what you type, clip, and record, then links related notes for you. A second brain that works offline and stays yours.",
};

export default function PosterLayout({ children }: { children: ReactNode }) {
  return <div className="gf-archivo-archivo">{children}</div>;
}
