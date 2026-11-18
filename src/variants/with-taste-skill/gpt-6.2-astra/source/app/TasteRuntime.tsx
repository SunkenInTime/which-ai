"use client";

import { useLayoutEffect } from "react";

// Gallery adaptation. The source's layout loads the taste skill's motion.js and moments/moments.js as module
// scripts once per page load, and a head script marks <html> with m-enter (m-enter-done 700 ms later) for the
// hero entrance. In the gallery the designs swap without a page load, so this does per design what a fresh page
// load did in the original: it starts motion.js's init() and moments.js's mountAll() on the design, turns on only
// that design's moment stylesheets, and tears its moments down when the design goes. The modules are the skill's
// files, served from this entry's public folder; their marks land on the source's root div ([data-source-html])
// instead of <html> (see the note at the top of each file).
const BASE = "/variants/with-taste-skill/gpt-6.2-astra/assets";

type MotionModule = { init: () => void };
type MomentsModule = { mountAll: (root: Element) => Promise<unknown> };
type MomentApi = { destroy?: () => void } | null;
type MomentHost = HTMLElement & { __moment?: MomentApi; __momentP?: Promise<MomentApi> };

let motionLoaded: Promise<MotionModule> | null = null;
let momentsLoaded: Promise<MomentsModule> | null = null;

// moments.js links each moment's stylesheet into <head> once and keeps it. On a fresh page that is only the
// design's own moment; here it would be every moment visited so far, and two of them style the same heading.
function enableMomentStyles(ids: Set<string>) {
  document.querySelectorAll<HTMLLinkElement>(`link[rel="stylesheet"][href*="${BASE}/moments/"]`).forEach((link) => {
    link.disabled = ![...ids].some((id) => link.href.includes(`/moments/${id}/`));
  });
}

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

    // This design's moment hosts, kept so they can be torn down even after React has removed them from the page.
    const hosts = [...root.querySelectorAll<MomentHost>("[data-moment]")];
    const ids = new Set(hosts.map((host) => host.dataset.moment ?? ""));
    enableMomentStyles(ids);
    // Without this flag moments.js mounts every [data-moment] in the document when it first loads.
    (window as unknown as { __momentsManual?: boolean }).__momentsManual = true;
    momentsLoaded ??= import(/* webpackIgnore: true */ `${BASE}/moments/moments.js`) as Promise<MomentsModule>;
    momentsLoaded.then((moments) => {
      if (cancelled) return;
      moments.mountAll(root).then(() => {
        if (!cancelled) enableMomentStyles(ids);
      });
    });

    return () => {
      cancelled = true;
      window.clearTimeout(safety);
      enableMomentStyles(new Set());
      // A mount that is still loading finishes first, then goes, so nothing it adds (listeners, the liquid-type
      // SVG filter in <body>) outlives the design.
      for (const host of hosts) {
        const pending = host.__momentP;
        delete host.__momentP;
        delete host.__moment;
        host.removeAttribute("data-moment-mounted");
        pending
          ?.then((api) => api?.destroy?.())
          .catch(() => {
            // A moment that failed to mount, or is already gone, has nothing to tear down.
          });
      }
      root.classList.remove("m-enter", "m-enter-done");
    };
  }, [design]);

  return null;
}
