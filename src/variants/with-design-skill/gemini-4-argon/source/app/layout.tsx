import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Newsreader,
  Plus_Jakarta_Sans,
  IBM_Plex_Sans,
  Fraunces,
  Space_Grotesk,
  Literata,
  Bricolage_Grotesque,
  Instrument_Serif,
} from "next/font/google";
import "@/generated/scoped-variant-css/with-design-skill/gemini-4-argon/source/app/globals.css";

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

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
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

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marrow — A Second Brain for Long-Horizon Thinking",
  description:
    "Five distinct visual and architectural explorations for Marrow, a local-first personal knowledge base and associative notebook.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-source-html
      lang="en"
      className={[
        geistSans.variable,
        geistMono.variable,
        newsreader.variable,
        jakarta.variable,
        plexSans.variable,
        fraunces.variable,
        spaceGrotesk.variable,
        literata.variable,
        bricolage.variable,
        instrumentSerif.variable,
        "h-full antialiased",
      ].join(" ")}
    >
      <div data-source-body className="min-h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
