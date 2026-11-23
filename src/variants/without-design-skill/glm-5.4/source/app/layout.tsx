import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
// Gallery adaptation: scoped copies of the source's globals.css and of its Tailwind utilities compiled with its
// own theme (see scripts/compile-variant-tailwind.mjs); the source's DesignSwitcher isn't rendered.
import "@/generated/scoped-variant-css/without-design-skill/glm-5.4/source/app/globals.css";
import "@/generated/scoped-variant-css/without-design-skill/glm-5.4/source/app/tailwind-theme.css";

// Gallery adaptation: next/font/local with the Latin file the original next/font/google build served, under a GLM 5.4
// family name, so other entries' same-named Google faces can't stand in for it (see docs/benchmarks/glm-5-4).
const glm54NoSkillsGeist = localFont({
  src: "./fonts/geist-normal.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  style: "normal",
});

const glm54NoSkillsGeistMono = localFont({
  src: "./fonts/geist-mono-normal.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  style: "normal",
});

export const metadata: Metadata = {
  title: {
    default: "Axon — Your second brain",
    template: "%s · Axon",
  },
  description:
    "Axon is a note-taking app that links your ideas automatically, resurfaces what you forgot and lets you ask your notes questions.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-source-html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${glm54NoSkillsGeist.variable} ${glm54NoSkillsGeistMono.variable}`}
    >
      <div data-source-body className="antialiased">
        {children}
      </div>
    </div>
  );
}
