import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Geist,
  Geist_Mono,
  Newsreader,
  Fraunces,
  Space_Grotesk,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "@/generated/scoped-variant-css/without-design-skill/gemini-4-neon/source/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Engram — Your Second Brain",
  description:
    "A note-taking application designed as a living second brain. Five distinct design explorations.",
};

// Gallery adaptation: <html>/<body> become wrapper divs, the source's globals.css is imported through its scoped
// copy, and the model's <IterationSwitcher /> isn't rendered (the gallery has its own). Original: see source-sha256.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-source-html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${fraunces.variable} ${spaceGrotesk.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <div data-source-body className="min-h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
