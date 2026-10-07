import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  EB_Garamond,
  Space_Grotesk,
} from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/sol-6-1/source/app/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  preload: false,
  subsets: ["latin"],
});
const editorial = EB_Garamond({
  variable: "--font-editorial",
  preload: false,
  subsets: ["latin"],
});
const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  preload: false,
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recollect | A home for every thought",
  description:
    "A little space for everything on your mind. Explore five ways to build your second brain with Recollect.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-source-html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${editorial.variable} ${grotesk.variable}`}
    >
      <div data-source-body>{children}</div>
    </div>
  );
}
