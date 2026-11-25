import type { Metadata } from "next";
import type { ReactNode } from "react";
// Gallery adaptation: fonts come from ../fonts.css (self-hosted, prefixed names) instead of next/font.

export const metadata: Metadata = {
  title: "Kept: a second brain that remembers for you",
  description:
    "Kept saves what you capture, links related ideas on its own, and hands them back the moment you need them.",
};

export default function DaylightLayout({ children }: { children: ReactNode }) {
  return <div className="gf-manrope-daylight">{children}</div>;
}
