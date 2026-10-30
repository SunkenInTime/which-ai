import {
  Archivo,
  Bodoni_Moda,
  Courier_Prime,
  Fraunces,
  IBM_Plex_Mono,
  Karla,
  Newsreader,
  Public_Sans,
  Syne,
} from "next/font/google";

/* Each iteration carries its own type pairing. Preload is off per family so the
   root document doesn't preload nine families at once; fonts still self-host. */

export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--f-bodoni",
  preload: false,
});

export const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--f-courier",
  preload: false,
});

export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--f-newsreader",
  preload: false,
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--f-plex",
  preload: false,
});

export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--f-archivo",
  preload: false,
});

export const syne = Syne({
  subsets: ["latin"],
  variable: "--f-syne",
  preload: false,
});

export const karla = Karla({
  subsets: ["latin"],
  variable: "--f-karla",
  preload: false,
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--f-fraunces",
  preload: false,
});

export const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--f-public",
  preload: false,
});

export const fontVars = [
  bodoni.variable,
  courier.variable,
  newsreader.variable,
  plexMono.variable,
  archivo.variable,
  syne.variable,
  karla.variable,
  fraunces.variable,
  publicSans.variable,
].join(" ");
