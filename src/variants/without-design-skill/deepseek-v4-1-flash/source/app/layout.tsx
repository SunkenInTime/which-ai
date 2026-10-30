import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  DM_Sans,
  Geist,
  Geist_Mono,
  Instrument_Serif,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from "next/font/google";
import "@/generated/scoped-variant-css/without-design-skill/deepseek-v4-1-flash/source/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cortex — a second brain for your notes",
  description:
    "Five landing page directions for Cortex, a local-first note-taking app that thinks alongside you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-source-html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${jakarta.variable} ${bricolage.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <div data-source-body className="min-h-full">
        {children}
      </div>
    </div>
  );
}
