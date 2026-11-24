import type { Metadata } from "next";
import type { ReactNode } from "react";
// Gallery adaptation: fonts come from ../fonts.css (self-hosted, prefixed names) instead of next/font.

export const metadata: Metadata = {
  title: "Kept: a second brain that grows as you write",
  description:
    "Kept links every note, clip and voice memo to the ideas it belongs with, then brings them back when you need them.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <div className={`gf-bricolage-grotesque-display gf-hanken-grotesk-sans`}>{children}</div>;
}
