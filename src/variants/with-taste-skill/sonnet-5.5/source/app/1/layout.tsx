import type { Metadata } from "next";
import s from "./p1.module.css";

// Gallery copy: the fonts come from app/fonts.css under "Sonnet v2" family names (see that file);
// these stand in for the next/font results and set the same CSS variables.
const anton = { variable: "sonnet-v2-anton" };
const workSans = { variable: "sonnet-v2-work-sans" };

export const metadata: Metadata = {
  title: "Engram: a second brain in numbered cards",
  description:
    "Engram numbers every note, links it to the ones it belongs with, and brings it back before you forget it.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="p1" className={`${anton.variable} ${workSans.variable} ${s.root}`}>
      {children}
    </div>
  );
}
