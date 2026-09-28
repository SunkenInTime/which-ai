import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/sonnet-5.5/source/app/globals.css";
import { Providers } from "./_components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pith, a second brain for everything you write",
    template: "%s | Pith",
  },
  description:
    "Pith is a notes app that links your ideas as you write, keeps them in plain files, and answers from them when you ask.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="min-h-dvh">
        <Providers>
          {children}
        </Providers>
      </div>
    </div>
  );
}
