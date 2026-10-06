import type { Metadata } from "next";
import "@/generated/scoped-variant-css/with-design-skill/mistral-large-4/source/app/globals.css";

export const metadata: Metadata = {
  title: "Mnemos — your second brain",
  description:
    "A note-taking application that thinks the way you do. Capture, connect, and recall every idea.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en" className="h-full antialiased">
      <div className="min-h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
