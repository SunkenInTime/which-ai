import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/generated/scoped-variant-css/with-design-skill/fable-5.2/source/app/globals.css";

export const metadata: Metadata = {
  title: "Mull, a second brain for your notes",
  description:
    "Mull is a note-taking app that links what you write and brings it back when you need it.",
};

// Gallery adaptation: <html>/<body> become wrapper divs, the source's globals.css is imported through its scoped
// copy, and the model's <Switcher /> isn't rendered (the gallery has its own). Original: see source-sha256.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div data-source-html lang="en" data-scroll-behavior="smooth">
      <div data-source-body>{children}</div>
    </div>
  );
}
