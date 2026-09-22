import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/generated/scoped-variant-css/without-design-skill/sol-6/source/app/globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mori — a second brain for your best thinking",
  description: "Five landing page concepts for Mori, a thoughtful home for notes, ideas, and everything worth remembering.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-scroll-behavior="smooth" className={`${geist.variable} ${geistMono.variable}`}>
      <div>{children}</div>
    </div>
  );
}
