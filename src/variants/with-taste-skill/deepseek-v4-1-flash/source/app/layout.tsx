import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Albert_Sans,
  Hanken_Grotesk,
  Schibsted_Grotesk,
  Stack_Sans_Headline,
  Stack_Sans_Text,
} from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/deepseek-v4-1-flash/source/app/globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const albert = Albert_Sans({
  variable: "--font-albert",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

const stackHeadline = Stack_Sans_Headline({
  variable: "--font-stack-headline",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const stackText = Stack_Sans_Text({
  variable: "--font-stack-text",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lattice — notes that link into a second brain",
  description:
    "Lattice is a note-taking app for plain-text notes. Every note can link to any other, and the links stay visible. Five landing page designs, one product.",
};

// Gallery adaptations: <html>/<body> are divs, globals.css is the gallery's scoped copy, and the
// <VersionSwitch /> design switcher is not rendered because the gallery provides iteration navigation.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-source-html
      lang="en"
      className={[
        bricolage.variable,
        albert.variable,
        hanken.variable,
        schibsted.variable,
        stackHeadline.variable,
        stackText.variable,
      ].join(" ")}
    >
      <div data-source-body>{children}</div>
    </div>
  );
}
