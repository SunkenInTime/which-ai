import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
// Gallery adaptation: <html>/<body> become wrapper divs and the source's globals.css is imported through its scoped
// copy. The source's iteration dock (in app/components/landing.tsx) isn't rendered.
import "@/generated/scoped-variant-css/with-taste-skill/swe-2.1/source/app/globals.css";

// Gallery adaptation: next/font/local with the Latin file each original next/font/google call served, under a SWE-2.1
// family name and the source's CSS variable, so other entries' same-named Google faces can't stand in for them (see
// docs/benchmarks/swe-2-1). Not preloaded: the gallery registry imports every entry, so a preload would fetch these on
// every gallery page.
const swe21TasteGeist = localFont({
  src: "./fonts/geist-normal.woff2",
  variable: "--font-geist",
  preload: false,
  weight: "100 900",
  style: "normal",
});

const swe21TasteEpilogue = localFont({
  src: "./fonts/epilogue-normal.woff2",
  variable: "--font-epilogue",
  preload: false,
  weight: "100 900",
  style: "normal",
});

const swe21TasteInstrumentSans = localFont({
  src: "./fonts/instrument-sans-normal.woff2",
  variable: "--font-instrument",
  preload: false,
  weight: "400 700",
  style: "normal",
});

const swe21TasteChivo = localFont({
  src: "./fonts/chivo-normal.woff2",
  variable: "--font-chivo",
  preload: false,
  weight: "100 900",
  style: "normal",
});

const swe21TasteManrope = localFont({
  src: "./fonts/manrope-normal.woff2",
  variable: "--font-manrope",
  preload: false,
  weight: "200 800",
  style: "normal",
});

const swe21TasteJetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-normal.woff2",
  variable: "--font-mono",
  preload: false,
  weight: "100 800",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Notomind: five landing page studies",
  description:
    "Five visual directions for a note-taking application designed as a second brain.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-source-html
      lang="en"
      className={`${swe21TasteGeist.variable} ${swe21TasteEpilogue.variable} ${swe21TasteInstrumentSans.variable} ${swe21TasteChivo.variable} ${swe21TasteManrope.variable} ${swe21TasteJetbrainsMono.variable}`}
    >
      <div data-source-body>{children}</div>
    </div>
  );
}
