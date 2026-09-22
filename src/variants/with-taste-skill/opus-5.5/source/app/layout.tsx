import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/opus-5.5/source/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kept - a second brain for everything you read and think",
  description:
    "Kept is a note-taking app that links your ideas together, so what you save today resurfaces when you need it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
     
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <div className="min-h-dvh" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>
        {children}
        
      </div>
    </div>
  );
}
