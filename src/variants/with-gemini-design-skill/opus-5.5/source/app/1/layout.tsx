import type { Metadata } from "next";
import type { ReactNode } from "react";
// Gallery adaptation: fonts come from ../fonts.css (self-hosted, prefixed names) instead of next/font.

export const metadata: Metadata = {
  title: "Kept: notes that connect themselves",
  description:
    "Kept links every note, clip and voice memo to what you already know, so the right idea shows up when you need it.",
};

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return <div className="gf-inter-tight-gallery">{children}</div>;
}
