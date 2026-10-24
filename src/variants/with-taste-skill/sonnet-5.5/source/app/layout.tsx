import type { Metadata } from "next";
import "@/generated/scoped-variant-css/with-taste-skill/sonnet-5.5/source/app/fonts.css";
import "@/generated/scoped-variant-css/with-taste-skill/sonnet-5.5/source/app/globals.css";

export const metadata: Metadata = {
  title: "Engram — a second brain for your notes",
  description:
    "Engram captures what you think, links it to what you already know, and brings it back when it matters.",
};

// Gallery copy: <html>/<body> become divs, and the source's corner design switcher is not rendered
// because the gallery has its own iteration navigation.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-source-html lang="en">
      <div data-source-body>{children}</div>
    </div>
  );
}
