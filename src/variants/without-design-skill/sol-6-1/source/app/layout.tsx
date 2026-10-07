import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, Caveat, Geist } from "next/font/google";
import "@/generated/scoped-variant-css/without-design-skill/sol-6-1/source/app/globals.css";

const sans = DM_Sans({ variable: "--font-dm", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
const handwritten = Caveat({ variable: "--font-hand", subsets: ["latin"] });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mori — A little space for your whole mind",
  description:
    "A calmer home for your notes, ideas, and everything in between. Capture your thoughts, connect the dots, and make room for what comes next.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-source-html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${serif.variable} ${handwritten.variable} ${geist.variable}`}
    >
      <div data-source-body>{children}</div>
    </div>
  );
}
