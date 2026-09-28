import type { Metadata } from "next";
import "@/generated/scoped-variant-css/without-design-skill/sonnet-5.5/source/app/globals.css";

export const metadata: Metadata = {
  title: "Engram — your second brain",
  description: "A note-taking app that remembers, connects and resurfaces everything you know.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-full antialiased">{children}</div>;
}
