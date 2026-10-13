import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Outfit,
  Space_Grotesk,
  Plus_Jakarta_Sans,
  Cormorant_Garamond,
  JetBrains_Mono,
} from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/gemini-4-argon/source/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Second Brain Note-Taking - Five Design Iterations",
  description:
    "Five distinct anti-slop landing page iterations for a second-brain note-taking application.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-source-html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${spaceGrotesk.variable} ${jakarta.variable} ${cormorant.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <div data-source-body className="min-h-full flex flex-col font-sans">
        {children}
      </div>
    </div>
  );
}
