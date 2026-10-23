import localFont from "next/font/local";
import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, Manrope } from "next/font/google";
import "@/generated/scoped-variant-css/with-design-skill/kimi-k3-1-pro/source/app/globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

// Preserve the generated app's variable Syne font: the gallery's compatibility
// font fetch returns static weights, which changes wrapping at weight 750.
const syne = localFont({
  src: "./fonts/syne-latin.woff2",
  variable: "--font-syne",
  weight: "400 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Locus — Your second brain",
  description:
    "Five landing page directions for Locus, a calmer way to capture, connect, and rediscover your thinking.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-source-html
      lang="en"
      className={`${dmSans.variable} ${manrope.variable} ${instrumentSerif.variable} ${syne.variable}`}
    >
      <div data-source-body>
        {children}

      </div>
    </div>
  );
}
