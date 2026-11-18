"use client";

import { useLayoutEffect } from "react";

// Runs the taste skill's motion kit (assets/motion/motion.js and assets/moments/moments.js, tasteskill 2.5.x) for
// a gallery entry that ships it. The original pages load those files as module scripts once per page load, with
// a head script that marks <html> with m-enter (m-enter-done 700 ms later) for the hero entrance. In the gallery
// the designs swap without a page load, so this does per design what a fresh page load did in the original: it
// starts motion.js's init() and moments.js's mountAll() on the design, turns on only that design's moment
// stylesheets, and tears its moments down when the design goes. Each entry's copy of the two files marks the
// source's root div ([data-source-html]) instead of <html> (see the note at the top of each file).
//
// `base` is the entry's public assets folder, such as "/variants/with-taste-skill/gpt-6.2-astra/assets".

type MotionModule = { init: () => void };
type MomentsModule = { mountAll: (root: Element) => Promise<unknown> };
type MomentApi = { destroy?: () => void } | null;
type MomentHost = HTMLElement & { __moment?: MomentApi; __momentP?: Promise<MomentApi> };

const loaded = new Map<string, { motion: Promise<MotionModule>; moments: Promise<MomentsModule> }>();

// moments.js links each moment's stylesheet into <head> once and keeps it. On a fresh page that is only the
// design's own moments; here it would be every moment visited so far, and two of them can style the same element.
function enableMomentStyles(base: string, ids: Set<string>) {
  document.querySelectorAll<HTMLLinkElement>(`link[rel="stylesheet"][href*="${base}/moments/"]`).forEach((link) => {
    link.disabled = ![...ids].some((id) => link.href.includes(`/moments/${id}/`));
  });
}

export function TasteSkillRuntime({ base, design }: { base: string; design: string | number }) {
  useLayoutEffect(() => {
    const root = document.querySelector("[data-source-html]");
    if (!root) return;
    // The head script's job: the hero waits for its entrance only from first paint, with a 700 ms safety mark.
    root.classList.add("m-enter");
    const safety = window.setTimeout(() => root.classList.add("m-enter-done"), 700);
    let cancelled = false;

    // This design's moment hosts, kept so they can be torn down even after React has removed them from the page.
    const hosts = [...root.querySelectorAll<MomentHost>("[data-moment]")];
    const ids = new Set(hosts.map((host) => host.dataset.moment ?? ""));
    enableMomentStyles(base, ids);

    const first = !loaded.has(base);
    if (first) {
      // Without this flag moments.js mounts every [data-moment] in the document when it first loads.
      (window as unknown as { __momentsManual?: boolean }).__momentsManual = true;
      loaded.set(base, {
        motion: import(/* webpackIgnore: true */ `${base}/motion/motion.js`) as Promise<MotionModule>,
        moments: import(/* webpackIgnore: true */ `${base}/moments/moments.js`) as Promise<MomentsModule>,
      });
    }
    const { motion, moments } = loaded.get(base)!;
    motion.then((kit) => {
      // A fresh import runs init() by itself; later designs need it called.
      if (!cancelled && !first) kit.init();
    });
    moments.then((kit) => {
      if (cancelled) return;
      kit.mountAll(root).then(() => {
        if (!cancelled) enableMomentStyles(base, ids);
      });
    });

    return () => {
      cancelled = true;
      window.clearTimeout(safety);
      enableMomentStyles(base, new Set());
      // A mount that is still loading finishes first, then goes, so nothing it adds (listeners, SVG filters in
      // <body>) outlives the design.
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
  }, [base, design]);

  return null;
}
