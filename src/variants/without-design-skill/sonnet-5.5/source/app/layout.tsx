import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/generated/scoped-variant-css/without-design-skill/sonnet-5.5/source/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Engram — your second brain",
  description:
    "Engram is a note-taking app that works like a second brain: capture anything, connect it, and find it again.",
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
