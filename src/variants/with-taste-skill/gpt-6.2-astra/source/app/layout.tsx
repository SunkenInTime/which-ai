import type { Metadata, Viewport } from "next";

import "@/generated/scoped-variant-css/with-taste-skill/gpt-6.2-astra/source/app/globals.css";
import "@/generated/scoped-variant-css/with-taste-skill/gpt-6.2-astra/source/app/motion.css";

export const metadata: Metadata = {
  title: "Foliohm — Your second brain",
  description: "A personal notebook for capturing thoughts, connecting ideas, and finding them again.",
};
export const viewport: Viewport = { themeColor: "#f4f3ec" };

// Gallery adaptation: <html>/<body> become wrapper divs that keep the source's attributes, globals.css and the
// skill's motion.css come in through their scoped copies, the font preload and metadataBase/openGraph lines are
// dropped, and the model's switcher isn't rendered. The head script that marked <html> with m-enter before first
// paint now marks this div from an inline script (first load) and TasteSkillRuntime (src/components/gallery, every design the gallery shows),
// which also starts the skill's motion.js and moments.js. Original: see docs/benchmarks/gpt-6-2-astra.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div data-source-html lang="en" data-type="software" data-motion="on" data-radius="soft" data-buttons="solid" suppressHydrationWarning>
    <script dangerouslySetInnerHTML={{ __html: "var r=document.currentScript.parentElement;r.classList.add('m-enter');setTimeout(function(){r.classList.add('m-enter-done')},700)" }} />
    <div data-source-body>{children}</div>
  </div>;
}
