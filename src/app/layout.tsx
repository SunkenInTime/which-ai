import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/next";
import { GalleryThemeProvider } from "@/components/gallery/gallery-theme-provider";
import { galleryThemeInitScript } from "@/lib/gallery-theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Which AI Made This?",
  description:
    "Compare AI-generated UIs from the same prompt across models, with and without a frontend design skill.",
  icons: {
    icon: [{ url: "/favicon.webp", type: "image/webp" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: galleryThemeInitScript }} />
      </head>
      <body>
        <GalleryThemeProvider>{children}</GalleryThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
