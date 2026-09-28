import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engram — The second brain that keeps up with you",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 bg-zinc-50 font-[family-name:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif] text-zinc-950 selection:bg-indigo-200">
      {children}
    </div>
  );
}
