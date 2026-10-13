import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Newsreader,
  Space_Grotesk,
  Bricolage_Grotesque,
  Fraunces,
  JetBrains_Mono,
  IBM_Plex_Mono,
  Lora,
} from "next/font/google";
import "@/generated/scoped-variant-css/without-design-skill/gemini-4-argon/source/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noema — Your Second Brain for Networked Thought",
  description:
    "Capture fleeting thoughts, cultivate evergreen notes, and synthesize across your personal knowledge graph. Explore 5 distinct design iterations (/1 to /5).",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-source-html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${newsreader.variable} ${spaceGrotesk.variable} ${bricolage.variable} ${fraunces.variable} ${jetbrainsMono.variable} ${ibmPlexMono.variable} ${lora.variable} h-full antialiased`}
    >
      <div data-source-body className="min-h-full flex flex-col selection:bg-sky-500/20">
        {children}
      </div>
    </div>
  );
}
