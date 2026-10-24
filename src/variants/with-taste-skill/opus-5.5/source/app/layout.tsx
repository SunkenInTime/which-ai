import type { Metadata } from "next";
import "@/generated/scoped-variant-css/with-taste-skill/opus-5.5/source/app/fonts.css";
import "@/generated/scoped-variant-css/with-taste-skill/opus-5.5/source/app/globals.css";

export const metadata: Metadata = {
  title: "Engram",
  description: "Five landing page iterations for Engram, a note-taking app that works as a second brain.",
};

// Gallery copy: <html>/<body> become divs. The source adds the "js" class to <html> with an inline
// script before first paint; here the root div carries it from the server, and the five CSS modules
// read it from there (see the note at the top of each). The corner iteration switcher each page
// rendered is not rendered, because the gallery has its own iteration navigation.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-source-html lang="en" className="js">
      <div data-source-body>{children}</div>
    </div>
  );
}
