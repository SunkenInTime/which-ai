import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Bricolage_Grotesque,
  DM_Sans,
  Fraunces,
  Instrument_Sans,
  Literata,
  Newsreader,
  Plus_Jakarta_Sans,
  Schibsted_Grotesk,
  Source_Serif_4,
} from "next/font/google";
import "@/generated/scoped-variant-css/with-design-skill/gemini-4-neon/source/app/globals.css";

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  axes: ["opsz"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Commonplace — A second brain for lasting thought",
  description:
    "Five distinct landing page design directions for Commonplace, a personal second-brain note-taking app.",
};

const fontVars = [
  literata.variable,
  instrumentSans.variable,
  fraunces.variable,
  plusJakarta.variable,
  schibstedGrotesk.variable,
  newsreader.variable,
  dmSans.variable,
  bricolageGrotesque.variable,
  sourceSerif.variable,
].join(" ");

// Gallery adaptation: <html>/<body> become wrapper divs, the source's globals.css is imported through its scoped
// copy, and the model's <IterationSwitcher /> isn't rendered (the gallery has its own). Original: see source-sha256.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div data-source-html lang="en" data-scroll-behavior="smooth" className={`${fontVars} h-full`}>
      <div data-source-body className="min-h-full">
        {children}
      </div>
    </div>
  );
}
