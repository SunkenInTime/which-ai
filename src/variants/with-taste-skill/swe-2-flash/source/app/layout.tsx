import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/swe-2-flash/source/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Palimpsest, your second brain",
  description:
    "Palimpsest is a note-taking app that connects your ideas into a second brain.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-source-html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <div data-source-body className="min-h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
