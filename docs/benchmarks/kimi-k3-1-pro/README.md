# Kimi K3.1 Pro — 2026-10-23

OpenRouter `moonshotai/kimi-k3.1-pro`, high reasoning, OpenCode 1.18.32. Three frontend conditions each generated five iterations; one no-skill Framekit session generated three motion iterations. Exact prompts, original validation results, archive URLs and SHA-256 hashes are saved alongside this document.

## Cost and interruptions

| Condition | USD |
| --- | ---: |
| No skills | 0.7195156 |
| Anthropic frontend-design | 0.7933308 |
| Design taste | 8.0573012 |
| Motion | 2.2654820 |
| **Total** | **11.8356296** |

Costs sum all assistant messages in each isolated OpenCode database, including motion subagents and interrupted attempts. They are session costs, not per-page/per-video costs or invoice reconciliation. The local batch stop was $20. An earlier parent-transcript-only estimate omitted $2.0814228 of motion subagent calls.

Design taste resumed twice in the same session after a provider-credit failure and a network certificate interruption. Its elapsed time and cost therefore are not a clean uninterrupted comparison. No paid generations were rerun for this import.

## Integration

The source archives preserve original generated projects. Gallery copies adapt imports and public-asset paths, scope CSS, replace document html/body wrappers with divs, and bypass the generated iteration switchers. Body styles target the inner source wrapper to preserve font variables. The gallery owns navigation. The frontend-design copy bundles the original Latin variable Syne font under its OFL license; static compatibility weights changed the source’s 750-weight heading wrapping. No rankings are assigned by this import.

All original frontend lint/build checks and all three original Framekit contract checks passed. Gallery validation is recorded separately from those generation checks.

## Motion

All three final videos are rendered, 1920×1080, 60 fps, 900 frames, 15 seconds, using the existing Framekit finish pipeline. Rendering used Apple M5 Pro GPU because the Windows reference renderer was unreachable; render performance is not directly comparable with the Windows runs. The run registry records the actual renderer and machine.

Masters, lightweight previews and posters are hosted under `https://media.whichai.dev/baseline/kimi-k3-1-pro/`. Source archives are listed in `archives.json`. Hosting assets does not publish the gallery changes; those ship only if the PR is merged and deployed.

## Gallery verification

- Full Playwright suite: **449 passed** in 2.1 minutes.
- Production build passed (1,419 static pages), TypeScript passed, and targeted ESLint passed.
- All 15 Kimi frontend preview routes returned HTTP 200 at 1440×900 and 390×900 with no page errors. Contact sheets compare original source to the imported gallery (rows: no skills, frontend-design, taste; columns: iterations 1–5). Original local switchers are intentionally absent from gallery previews.
- All three hosted videos played in Chromium with advancing currentTime and no media errors. All 13 hosted files were downloaded and matched against local SHA-256 hashes.
- Repository-wide ESLint reports 209 errors and 200 warnings in pre-existing generations; no Kimi files appeared in that report. Targeted changed-source lint is clean.
- Local Google Fonts connections timed out at the gallery's normal concurrency. The successful local build used an uncommitted dependency-only downloader that fetched the same Google URLs through curl, with six concurrent requests and a local cache. No font responses were mocked. Existing Big Shoulders fallback-metric warnings remain.
