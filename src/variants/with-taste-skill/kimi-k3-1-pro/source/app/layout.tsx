import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Cormorant_Garamond,
  Figtree,
  Hanken_Grotesk,
  League_Spartan,
  Red_Hat_Display,
  Red_Hat_Text,
} from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/kimi-k3-1-pro/source/app/globals.css";
import "@/generated/scoped-variant-css/with-taste-skill/kimi-k3-1-pro/source/app/landing.css";
import "@/generated/scoped-variant-css/with-taste-skill/kimi-k3-1-pro/source/app/versions-one-two.css";
import "@/generated/scoped-variant-css/with-taste-skill/kimi-k3-1-pro/source/app/versions-three-five.css";

const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500", "600"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const redHatDisplay = Red_Hat_Display({ variable: "--font-red-display", subsets: ["latin"], weight: "900" });
const redHatText = Red_Hat_Text({ variable: "--font-red-text", subsets: ["latin"] });
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"] });
const league = League_Spartan({ variable: "--font-league", subsets: ["latin"], weight: "700" });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Morrow — Your second brain",
  description: "Keep every thought close with Morrow, a second brain for connected notes and natural recall.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-source-html lang="en" className={`${cormorant.variable} ${bricolage.variable} ${redHatDisplay.variable} ${redHatText.variable} ${hanken.variable} ${league.variable} ${figtree.variable}`}>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=boska@400,500&display=swap" rel="stylesheet" />
      <div data-source-body>{children}</div>
    </div>
  );
}
