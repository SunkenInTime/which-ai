import type { Metadata } from "next";
import s from "./p2.module.css";

// Gallery copy: the fonts come from app/fonts.css under "Sonnet v2" family names (see that file);
// these stand in for the next/font results and set the same CSS variables.
const grotesk = { variable: "sonnet-v2-schibsted-grotesk" };

export const metadata: Metadata = {
  title: "Engram: a second brain for your notes",
  description:
    "Engram is a note-taking app that links what you write to what you already know, and brings it back when it matters.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${grotesk.variable} ${s.root}`}>{children}</div>;
}
