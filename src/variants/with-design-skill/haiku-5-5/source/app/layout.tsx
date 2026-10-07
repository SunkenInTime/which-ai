import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/generated/scoped-variant-css/with-design-skill/haiku-5-5/source/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loam: a second brain for your notes",
  description:
    "Loam keeps what you capture, links it as you write, and brings it back when it matters.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-source-html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <div data-source-body className="min-h-full flex flex-col">
        {children}

      </div>
    </div>
  );
}
