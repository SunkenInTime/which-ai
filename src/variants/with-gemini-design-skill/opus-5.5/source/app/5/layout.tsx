import type { Metadata } from "next";
import type { ReactNode } from "react";
// Gallery adaptation: fonts come from ../fonts.css (self-hosted, prefixed names) instead of next/font.

export const metadata: Metadata = {
  title: "Kept: a second brain for people who think at night",
  description:
    "Kept links your notes as you write, answers questions from your own archive, and brings old ideas back when you need them.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <div className={`gf-newsreader-serif-5 gf-inter-tight-sans-5`}>{children}</div>;
}
