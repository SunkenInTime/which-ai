import type { Metadata } from "next";
import "@/generated/scoped-variant-css/with-taste-skill/fable-5.1/source/app/fonts.css";
import "@/generated/scoped-variant-css/with-taste-skill/fable-5.1/source/app/globals.css";
import "@/generated/scoped-variant-css/with-taste-skill/fable-5.1/source/app/taste.css";

export const metadata: Metadata = {
  title: "Commonplace, a notebook that remembers for you",
  description:
    "Commonplace is a note-taking app that works as a second brain: every note links to what you already know and comes back before you forget it.",
};

// Gallery copy: <html>/<body> become divs. The source's inline script added the `js` class to
// <html> to arm the entrance motion; here the outer div carries it. The (designs) layout, which
// only adds the corner design switcher, is not rendered because the gallery has its own
// iteration navigation.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-source-html lang="en" className="js">
      <div data-source-body>{children}</div>
    </div>
  );
}
