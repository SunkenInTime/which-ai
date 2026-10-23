import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "@/generated/scoped-variant-css/without-design-skill/kimi-k3-1-pro/source/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Soma — Your second brain",
  description: "A calm, connected place for your notes, ideas, and everything you're learning. Explore five Soma landing page directions.",
};

export const viewport: Viewport = {
  themeColor: "#f7f5ee",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-source-html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}>
      <div data-source-body className="min-h-full">{children}</div>
    </div>
  );
}
