import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/generated/scoped-variant-css/with-gemini-design-skill/opus-5.5/source/app/globals.css";
import "@/generated/scoped-variant-css/with-gemini-design-skill/opus-5.5/source/app/fonts.css";

export const metadata: Metadata = {
  title: "Kept: your second brain",
  description: "Kept is a note-taking app that links what you save, so you can find any idea again.",
};

// Gallery adaptation: <html>/<body> become wrapper divs, the source's globals.css is imported through its scoped
// copy, and the model's design switcher isn't rendered (the gallery has its own). Original: see docs/benchmarks/gemini-design-skill.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div data-source-html lang="en" className="antialiased">
      <div data-source-body>{children}</div>
    </div>
  );
}
