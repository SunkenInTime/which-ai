import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "@/generated/scoped-variant-css/without-design-skill/fable-5.2/source/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Engram — five landing page directions",
    template: "%s · Engram",
  },
  description:
    "Five landing page directions for Engram, a note-taking app that works like a second brain.",
};

// Gallery adaptation: <html>/<body> become wrapper divs, the source's globals.css is imported through its scoped
// copy, and the model's <Switcher /> isn't rendered (the gallery has its own). Original: see source-sha256.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-source-html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <div data-source-body>{children}</div>
    </div>
  );
}
