"use client";

import { useLayoutEffect } from "react";

// Gallery adaptation. The source's layout loads the taste skill's motion.js and moments/moments.js as module
// scripts once per page load, and a head script marks <html> with m-enter (m-enter-done 700 ms later) for the
// hero entrance. In the gallery the designs swap without a page load, so this starts the same modules each time
// a design mounts: motion.js's init() and moments.js's mountAll() on the design, and unmountAll() when it goes.
// The modules are the skill's files, served from this entry's public folder; their marks land on the source's
// root div ([data-source-html]) instead of <html> (see the note at the top of each file).
const BASE = "/variants/with-taste-skill/gpt-6.2-astra/assets";

type MotionModule = { init: () => void };
type MomentsModule = { mountAll: (root: Element) => Promise<unknown>; unmountAll: (root: Element) => void };

let motionLoaded: Promise<MotionModule> | null = null;
let momentsLoaded: Promise<MomentsModule> | null = null;

export default function TasteRuntime({ design }: { design: number }) {
  useLayoutEffect(() => {
    const root = document.querySelector("[data-source-html]");
    if (!root) return;
    // The head script's job: the hero waits for its entrance only from first paint, with a 700 ms safety mark.
    root.classList.add("m-enter");
    const safety = window.setTimeout(() => root.classList.add("m-enter-done"), 700);
    let cancelled = false;

    const firstMotion = !motionLoaded;
    motionLoaded ??= import(/* webpackIgnore: true */ `${BASE}/motion/motion.js`) as Promise<MotionModule>;
    motionLoaded.then((motion) => {
      // A fresh import runs init() by itself; later designs need it called.
      if (!cancelled && !firstMotion) motion.init();
    });

    // Without this flag moments.js mounts every [data-moment] in the document when it first loads.
    (window as unknown as { __momentsManual?: boolean }).__momentsManual = true;
    momentsLoaded ??= import(/* webpackIgnore: true */ `${BASE}/moments/moments.js`) as Promise<MomentsModule>;
    momentsLoaded.then((moments) => {
      if (!cancelled) moments.mountAll(root);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(safety);
      momentsLoaded?.then((moments) => moments.unmountAll(root));
      root.classList.remove("m-enter", "m-enter-done");
    };
  }, [design]);

  return null;
}
