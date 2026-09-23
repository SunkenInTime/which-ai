import type { Metadata } from "next";
import {
  Archivo,
  DM_Mono,
  DM_Sans,
  Fraunces,
  Manrope,
  Newsreader,
  Space_Grotesk,
} from "next/font/google";
import "@/generated/scoped-variant-css/with-design-skill/luna-6/source/app/globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Morrow — a home for what you want to remember",
  description:
    "Morrow connects the things you save, then brings the right thought back when you need it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${dmSans.variable} ${dmMono.variable} ${manrope.variable} ${fraunces.variable} ${spaceGrotesk.variable} ${newsreader.variable} ${archivo.variable}`}
    >
      <div style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{children}</div>
    </div>
  );
}
