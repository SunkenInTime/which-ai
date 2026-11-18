import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/generated/scoped-variant-css/without-design-skill/gpt-6.2-astra/source/app/globals.css";

const sans = localFont({
  src: "./fonts/dm-sans-normal.woff2",
  weight: "400 800",
  variable: "--sans",
});
const display = localFont({
  src: "./fonts/bricolage-grotesque-normal.woff2",
  weight: "400 800",
  variable: "--display",
});
const serif = localFont({
  src: [
    { path: "./fonts/instrument-serif-normal.woff2", style: "normal" },
    { path: "./fonts/instrument-serif-italic.woff2", style: "italic" },
  ],
  variable: "--serif",
});
const mono = localFont({
  src: "./fonts/ibm-plex-mono-normal.woff2",
  variable: "--mono",
  preload: false,
});

export const metadata: Metadata = {
  title: "Daymark — A notebook for your mind",
  description:
    "Capture your notes, connect your ideas, and rediscover what matters in Daymark, your personal second brain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Gallery adaptation: <html>/<body> become wrapper divs, the source's globals.css is imported through its
    // scoped copy, and the model's switcher isn't rendered. Original: see docs/benchmarks/gpt-6-2-astra.
    <div
      data-source-html
      lang="en"
      data-scroll-behavior="smooth"
      className={[
        sans.variable,
        display.variable,
        serif.variable,
        mono.variable,
      ].join(" ")}
    >
      <div data-source-body>{children}</div>
    </div>
  );
}
