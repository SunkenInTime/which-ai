import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/generated/scoped-variant-css/without-design-skill/mistral-large-4/source/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mindscape — Your Second Brain",
  description:
    "Mindscape is a note-taking app that works like a second brain: capture, connect, and rediscover your ideas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <div className="min-h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
