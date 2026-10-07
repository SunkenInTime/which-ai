import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "@/generated/scoped-variant-css/without-design-skill/haiku-5-5/source/app/globals.css";

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

export const metadata: Metadata = {
  title: "Synapse — Your second brain",
  description: "Capture everything, connect what matters, and resurface it when you need it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-source-html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <div data-source-body className="min-h-full flex flex-col">{children}</div>
    </div>
  );
}
