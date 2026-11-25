import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/generated/scoped-variant-css/with-gemini-design-skill/fable-5.2/source/app/globals.css";
import "@/generated/scoped-variant-css/with-gemini-design-skill/fable-5.2/source/app/fonts.css";

export const metadata: Metadata = {
  title: "Engram: your second brain",
  description:
    "Engram is a note-taking app that connects what you write to what you already know.",
};

// Gallery adaptation: <html>/<body> become wrapper divs, the source's globals.css is imported through its scoped
// copy, Geist comes from fonts.css instead of next/font, and the model's design switcher isn't rendered (the gallery
// has its own). Original: see docs/benchmarks/gemini-design-skill.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div data-source-html lang="en" data-scroll-behavior="smooth" className="gf-geist-geist-sans antialiased">
      <div data-source-body>{children}</div>
    </div>
  );
}
