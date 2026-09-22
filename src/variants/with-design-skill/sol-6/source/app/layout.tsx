import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "@/generated/scoped-variant-css/with-design-skill/sol-6/source/app/globals.css";

const dmSans = DM_Sans({ variable: "--font-dm", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Commonplace — a home for your thoughts",
  description: "Five explorations for Commonplace, a connected home for notes and ideas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${dmSans.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} ${plexMono.variable}`}>
      <div style={{ fontFamily: "var(--font-dm), Arial, sans-serif" }}>{children}</div>
    </div>
  );
}
