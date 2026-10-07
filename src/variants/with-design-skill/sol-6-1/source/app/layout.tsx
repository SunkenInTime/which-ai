import type { Metadata } from "next";
import { DM_Sans, Manrope, Space_Grotesk, Lora, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import "@/generated/scoped-variant-css/with-design-skill/sol-6-1/source/app/globals.css";

const dm = DM_Sans({ variable: "--font-dm", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Morrow — A little more room for your mind",
  description: "A calm home for your notes, discoveries, and ideas. Capture what matters, connect your thinking, and find it when you need it.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div data-source-html lang="en" className={`${dm.variable} ${manrope.variable} ${space.variable} ${lora.variable} ${bricolage.variable} ${instrument.variable}`}><div data-source-body>{children}</div></div>;
}
