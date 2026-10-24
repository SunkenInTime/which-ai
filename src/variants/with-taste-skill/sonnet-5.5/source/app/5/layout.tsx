import type { Metadata } from "next";
import styles from "./page.module.css";

// Gallery copy: the fonts come from app/fonts.css under "Sonnet v2" family names (see that file);
// these stand in for the next/font results and set the same CSS variables.
const Switzer = { className: "sonnet-v2-switzer-family", variable: "sonnet-v2-switzer" };

export const metadata: Metadata = {
  title: "Engram: notes that work like a second brain",
  description:
    "Engram links what you write to what you already know, and brings it back when it matters. Plain Markdown files, on every device.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div data-p5-root className={`${Switzer.className} ${Switzer.variable} ${styles.root}`}>
      {children}
    </div>
  );
}
