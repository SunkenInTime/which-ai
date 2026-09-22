import type { Metadata } from "next";
import "@/generated/scoped-variant-css/with-design-skill/opus-5.5/source/app/globals.css";

export const metadata: Metadata = {
  title: "Commonplace — a notebook that remembers for you",
  description:
    "Commonplace links your notes as you write and brings old ones back when they're useful again.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        {children}
        
      </div>
    </div>
  );
}
