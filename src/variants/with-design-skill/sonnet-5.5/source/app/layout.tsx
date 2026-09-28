import type { Metadata } from "next";
import "@/generated/scoped-variant-css/with-design-skill/sonnet-5.5/source/app/globals.css";

export const metadata: Metadata = {
  title: "Engram: a second brain for your notes",
  description:
    "Engram is a local-first notebook that links, resurfaces and answers from everything you write down.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full antialiased">
      <div className="min-h-full">
        {children}
      </div>
    </div>
  );
}
