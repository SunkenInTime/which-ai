import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/mistral-large-4/source/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mnemosyne - Your Second Brain",
  description: "A note-taking app that thinks the way you do. Capture, connect, and recall everything.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <div className="min-h-full flex flex-col">{children}</div>
    </div>
  );
}
