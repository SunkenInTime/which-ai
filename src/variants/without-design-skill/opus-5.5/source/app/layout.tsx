import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/generated/scoped-variant-css/without-design-skill/opus-5.5/source/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mneme — a second brain for everything you think",
  description:
    "Mneme captures your notes, links them on its own, and hands them back the moment you need them.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
     
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <div className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>
        {children}
        
      </div>
    </div>
  );
}
