import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/muse-wonder-1.0/source/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cortex - Your second brain",
  description: "Cortex is a note-taking app that links, retrieves, and resurfaces everything you know.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-source-html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <div data-source-body className="min-h-full">
        {children}
      </div>
    </div>
  );
}
