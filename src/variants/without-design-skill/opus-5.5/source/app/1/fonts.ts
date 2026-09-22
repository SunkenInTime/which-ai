import { IBM_Plex_Mono, Instrument_Serif, Newsreader } from "next/font/google";

export const display = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
});

export const text = Newsreader({
  style: ["normal", "italic"],
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-text",
});

export const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-label",
});
