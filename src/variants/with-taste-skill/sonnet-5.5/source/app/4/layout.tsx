import type { Metadata } from "next";
import styles from "./p4.module.css";

// Gallery copy: the fonts come from app/fonts.css under "Sonnet v2" family names (see that file);
// these stand in for the next/font results and set the same CSS variables.
const newsreader = { variable: "sonnet-v2-newsreader" };

export const metadata: Metadata = {
  title: "Engram: everything you know under one sky",
  description:
    "Engram is a note-taking app that works as a second brain. Capture anything, draw the links between it all, and it comes back when it matters.",
};

// Runs before first paint on a hard load, so the hero's masked lines start hidden
// instead of flashing in and then rising. Everything below the fold is armed by the
// client once the page has hydrated, so a failed script never leaves content hidden.
const armLoad = `document.currentScript.parentElement.setAttribute('data-p4load','')`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${newsreader.variable} ${styles.root}`} data-p4root suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: armLoad }} />
      {children}
    </div>
  );
}
