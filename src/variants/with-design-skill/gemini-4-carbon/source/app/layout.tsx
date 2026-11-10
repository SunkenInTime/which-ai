import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Besley,
  Bricolage_Grotesque,
  Figtree,
  Fraunces,
  Hanken_Grotesk,
  Literata,
  Recursive,
  Schibsted_Grotesk,
  Spline_Sans,
} from "next/font/google";
import "@/generated/scoped-variant-css/with-design-skill/gemini-4-carbon/source/app/globals.css";

const besley = Besley({
  variable: "--font-besley",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const spline = Spline_Sans({
  variable: "--font-spline",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

const recursive = Recursive({
  variable: "--font-recursive",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cairn | Notes that find their way back to you",
  description:
    "A local-first note-taking application built to keep decades of reading, fragments, and working thoughts connected.",
};

// Gallery adaptation: <html>/<body> become wrapper divs, the source's globals.css is imported through its scoped
// copy, and the model's <IterationSwitcher /> isn't rendered (the gallery has its own). Original: see source-sha256.
export default function RootLayout({ children }: { children: ReactNode }) {
  const fontVariables = [
    besley.variable,
    figtree.variable,
    literata.variable,
    bricolage.variable,
    spline.variable,
    fraunces.variable,
    hanken.variable,
    schibsted.variable,
    recursive.variable,
  ].join(" ");

  return (
    <div
      data-source-html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fontVariables} h-full antialiased`}
    >
      <div data-source-body className="min-h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
