import type { Metadata } from "next";
import styles from "./p3.module.css";

// Gallery copy: the fonts come from app/fonts.css under "Sonnet v2" family names (see that file);
// these stand in for the next/font results and set the same CSS variables.
const display = { variable: "sonnet-v2-libre-franklin" };
const text = { variable: "sonnet-v2-source-serif-4" };

export const metadata: Metadata = {
  title: "Engram — a second brain for your notes",
  description:
    "Engram captures what you think, links it to what you know, and brings it back before you forget it. Built against the forgetting curve Hermann Ebbinghaus measured in 1885.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${display.variable} ${text.variable} ${styles.root}`}
      data-p3-root=""
      suppressHydrationWarning
    >
      {/* Sets the gate for entrance motion before first paint; without script nothing is ever hidden. */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "var r=document.currentScript.parentElement;r.classList.add('js');setTimeout(function(){if(!r.hasAttribute('data-motion'))r.classList.remove('js')},3500)",
        }}
      />
      {children}
    </div>
  );
}
