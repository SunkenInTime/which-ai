import type { Metadata, Viewport } from "next";
import "@/generated/scoped-variant-css/with-taste-skill/sol-6-2/source/app/globals.css";
import "@/generated/scoped-variant-css/with-taste-skill/sol-6-2/source/app/motion.css";

export const metadata: Metadata = {
  title: { default: "Veybrin — A second brain for everyday notes", template: "%s — Veybrin" },
  description: "Write, link, and find your notes in a personal workspace.",
  applicationName: "Veybrin",
  icons: { icon: "/variants/with-taste-skill/sol-6-2/veybrin.svg" },
  other: { "page-type": "software", "site-kind": "software" },
};

export const viewport: Viewport = { viewportFit: "cover" };

// Gallery adaptation: <html>/<body> become wrapper divs that keep the source's attributes and the body's class,
// globals.css and the skill's motion.css come in through their scoped copies, the motion.css link, module
// preloads and metadataBase line are dropped, and the model's switcher isn't rendered. The head script marked
// <html> with m-enter and mo-js before first paint (m-enter-done after 700 ms, mo-safe after 2.5 s); here an inline
// script marks this div on first load, and TasteSkillRuntime does it for every design the gallery shows and starts
// the skill's motion.js and moments.js. Original: see docs/benchmarks/gpt-6-2-sol.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-source-html lang="en" data-type="software" data-radius="soft" data-motion="" suppressHydrationWarning>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "var r=document.currentScript.parentElement;r.classList.add('m-enter','mo-js');setTimeout(function(){r.classList.add('m-enter-done')},700);setTimeout(function(){r.classList.add('mo-safe')},2500)",
        }}
      />
      <div data-source-body className="landing">
        {children}
      </div>
    </div>
  );
}
