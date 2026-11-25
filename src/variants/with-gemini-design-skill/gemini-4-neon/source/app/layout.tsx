import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/generated/scoped-variant-css/with-gemini-design-skill/gemini-4-neon/source/app/globals.css";
import "@/generated/scoped-variant-css/with-gemini-design-skill/gemini-4-neon/source/app/fonts.css";

export const metadata: Metadata = {
  title: "Cairn | Your Second Brain",
  description:
    "A calm, fast note-taking application that connects your reading, daily notes, and long-term thinking into a durable second brain.",
};

// Gallery adaptation: <html>/<body> become wrapper divs, the source's globals.css is imported through its scoped
// copy, and the model's design switcher isn't rendered (the gallery has its own). Original: see docs/benchmarks/gemini-design-skill.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div data-source-html lang="en" className="h-full">
      <div data-source-body className="min-h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
