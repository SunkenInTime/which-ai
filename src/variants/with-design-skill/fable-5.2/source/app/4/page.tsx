import type { Metadata } from "next";
import { Literata } from "next/font/google";
import { Notes } from "./notes";
import s from "./page.module.css";

const note = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-note",
});

export const metadata: Metadata = {
  title: "Mull, the page is a note (design 4 of 5)",
};

export default function PageIsANote() {
  return (
    <div className={`${s.app} ${note.variable}`} data-iteration="4">
      <Notes />
    </div>
  );
}
