import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Archivo,
  Bricolage_Grotesque,
  Fraunces,
  Hanken_Grotesk,
  Instrument_Sans,
  Literata,
  Newsreader,
  Source_Serif_4,
} from "next/font/google";
import "@/generated/scoped-variant-css/with-design-skill/gemini-4-neon/source/app/globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

const literata = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-literata",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cairn — A quiet second brain for your notes",
  description:
    "Capture fleeting thoughts, connect ideas across years, and keep everything in plain local Markdown files you own forever.",
};

const fontVariables = [
  newsreader.variable,
  hankenGrotesk.variable,
  fraunces.variable,
  instrumentSans.variable,
  bricolage.variable,
  archivo.variable,
  sourceSerif.variable,
  literata.variable,
].join(" ");

// Gallery adaptation: <html>/<body> become wrapper divs, the source's globals.css is imported through its scoped
// copy, and the model's <IterationSwitcher /> isn't rendered (the gallery has its own). Original: see source-sha256.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-source-html
      lang="en"
      className={`${fontVariables} h-full antialiased`}
    >
      <div data-source-body className="min-h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
