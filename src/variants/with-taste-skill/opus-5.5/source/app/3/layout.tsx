import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/opus-5.5/source/app/3/styles.css";

const geist = Geist({
  variable: "--font-v3-sans",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-v3-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Kept - notes that link themselves and come back when they matter",
  description:
    "Kept is a keyboard-first second brain. Capture anything, link ideas with [[, and let old notes resurface when they become relevant.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${geist.variable} ${jetbrains.variable} v3 min-h-[100dvh] antialiased`}>
      {children}
    </div>
  );
}
