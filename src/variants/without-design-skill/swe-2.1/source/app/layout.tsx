import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
// Gallery adaptation: <html>/<body> become wrapper divs, the source's globals.css is imported through its scoped
// copy, and the source's IterationSwitcher isn't rendered.
import "@/generated/scoped-variant-css/without-design-skill/swe-2.1/source/app/globals.css";

// Gallery adaptation: next/font/local with the Latin file the original next/font/google build served, under a SWE-2.1
// family name, so other entries' same-named Google faces can't stand in for it (see docs/benchmarks/swe-2-1). Not
// preloaded: the gallery registry imports every entry, so a preload would fetch these on every gallery page.
const swe21NoSkillsGeist = localFont({
  src: "./fonts/geist-normal.woff2",
  variable: "--font-geist-sans",
  preload: false,
  weight: "100 900",
  style: "normal",
});

const swe21NoSkillsGeistMono = localFont({
  src: "./fonts/geist-mono-normal.woff2",
  variable: "--font-geist-mono",
  preload: false,
  weight: "100 900",
  style: "normal",
});

export const metadata: Metadata = {
  title: {
    default: "Engram — Your second brain",
    template: "%s | Engram",
  },
  description:
    "Five landing page iterations for Engram, a note-taking application designed as a second brain.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-source-html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${swe21NoSkillsGeist.variable} ${swe21NoSkillsGeistMono.variable} h-full antialiased`}
    >
      <div data-source-body className="min-h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
