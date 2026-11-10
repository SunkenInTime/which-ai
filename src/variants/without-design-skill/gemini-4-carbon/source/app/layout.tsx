import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Geist,
  Geist_Mono,
  Newsreader,
  Instrument_Serif,
  Fraunces,
  Space_Grotesk,
  Plus_Jakarta_Sans,
  IBM_Plex_Mono,
  JetBrains_Mono,
} from "next/font/google";
import "@/generated/scoped-variant-css/without-design-skill/gemini-4-carbon/source/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader-var",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-var",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces-var",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-var",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta-var",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono-var",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-var",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Engram — Your Second Brain",
  description:
    "Capture fleeting thoughts, weave bidirectional connections, and recall everything effortlessly. Explore five distinct design iterations.",
};

// Gallery adaptation: <html>/<body> become wrapper divs, the source's globals.css is imported through its scoped
// copy, and the model's <IterationSwitcher /> isn't rendered (the gallery has its own). Original: see source-sha256.
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const fontVariables = [
    geistSans.variable,
    geistMono.variable,
    newsreader.variable,
    instrumentSerif.variable,
    fraunces.variable,
    spaceGrotesk.variable,
    plusJakarta.variable,
    ibmPlexMono.variable,
    jetbrainsMono.variable,
  ].join(" ");

  return (
    <div data-source-html lang="en" className={`${fontVariables} h-full antialiased`}>
      <div data-source-body className="min-h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
