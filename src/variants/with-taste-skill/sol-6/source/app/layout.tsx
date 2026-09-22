import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/sol-6/source/app/globals.css";

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
  display: "swap",
});

export const metadata: Metadata = {
  title: "Margin | A home for your thinking",
  description: "Five landing page directions for Margin, a thoughtful second brain for notes, ideas, and connections.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
     
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <div className="min-h-full flex flex-col">
        {children}
        
      </div>
    </div>
  );
}
