import type { Metadata } from "next";
import {
  Anton,
  Caveat,
  Fraunces,
  IBM_Plex_Mono,
  Newsreader,
  Oswald,
} from "next/font/google";
import "@/generated/scoped-variant-css/with-design-skill/swe-2-flash/source/app/globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Commonplace — a second brain",
  description:
    "Five design directions for Commonplace, a note-taking app that works as your second brain.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-source-html
      lang="en"
      className={`${oswald.variable} ${newsreader.variable} ${plexMono.variable} ${fraunces.variable} ${anton.variable} ${caveat.variable} h-full antialiased`}
    >
      <div data-source-body className="min-h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
