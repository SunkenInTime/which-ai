import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Space_Mono, Archivo_Black } from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/mistral-large-4/source/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Mnemos - Your Second Brain",
  description:
    "A note-taking app that thinks the way you do. Capture, connect, and recall everything.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${spaceMono.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <div className="mistral-fonts min-h-full flex flex-col font-sans">
        {children}
      </div>
    </div>
  );
}
