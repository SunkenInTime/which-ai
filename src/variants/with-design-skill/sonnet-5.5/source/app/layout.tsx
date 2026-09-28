import type { Metadata } from "next";
import "@/generated/scoped-variant-css/with-design-skill/sonnet-5.5/source/app/globals.css";

export const metadata: Metadata = {
  title: "Loam — a second brain that grows with you",
  description:
    "Loam is a note-taking app that links what you write, so your notes turn into a second brain.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>{children}</div>
  );
}
