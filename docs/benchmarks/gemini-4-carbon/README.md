# Gemini 4 Carbon in Cursor

Two frontend runs on 2026-11-10: Without Design Skill and With Design Skill (Anthropic frontend-design). Both ran in Cursor desktop 3.29.15 on macOS (the Agents window), with Gemini 4 Carbon at High reasoning in fresh chats. The setup matches the [Gemini 4 Argon run](../gemini-4-argon/README.md) so the two can be compared directly. The taste-skill and motion runs will come later.

## Prompts and source

The prompts are the Argon prompts, unchanged, saved next to this file. They ask for the same five second-brain landing pages on ports 3281 and 3282. Each workspace is a fresh clone of the Argon starter commit (`eeeb008` for no skills, `005d1e8` for frontend-design), with the same lockfile and the same `SKILL.md`; [provenance.json](provenance.json) has the hashes. Generation happened in `/Users/Shared/whichai-gemini-4-carbon`, outside the gallery checkout.

## Instruction isolation

Before the chats were created, `~/.agents/skills`, `~/.cursor/rules` and `~/.cursor/skills` were moved out of Cursor's search paths and Cursor was restarted. They were moved at 16:38:51 UTC and restored at 17:13:28 UTC, after both chats had finished.

An unscored preflight chat asked the model to list everything in its startup context ([preflight.final.txt](preflight.final.txt)). It listed the workspace `AGENTS.md`, 18 Cursor built-in skills and 58 installed-plugin skills (Supabase, Slack, Granola, pstack, Google Drive, X and ElevenLabs), with no personal skills or rules. That is more than Argon's 21 because more plugins are installed now; none are design skills. It also named `poteto-mode` inside a built-in subagent's description and said it was not loaded. This is context isolation, not a filesystem jail.

Cursor's local chat records show which files each session read. The no-skill session read no skill or instruction files. The frontend-design session read its assigned `SKILL.md` and `CLAUDE.md`. Both also read Next.js docs from `node_modules`, which the starter's `AGENTS.md` tells them to do.

## Sessions

| Condition | Product | Prompt sent (UTC) | Cursor "worked" | Browser use |
| --- | --- | --- | ---: | --- |
| Without Design Skill | Engram | 16:47:30 | 19m 50s | 7 navigations, 5 screenshots |
| With Design Skill | Cairn | 16:48:13 | 22m 15s | 6 navigations, 9 screenshots, 4 CDP calls |

Each chat got one prompt and nothing else. No permission prompts appeared, there was no model fallback, and no session was continued. Astra (GPT-6 Astra) operated the Cursor desktop app through computer use; it did not edit any files. Full tool-call counts are in [provenance.json](provenance.json). The final replies are in `no-skills.final.txt` and `frontend-design.final.txt`. Their image links point at screenshots in Cursor's temporary folder, which are not kept.

Cursor saves `maxMode: true` in these chats' model config, as it did for Argon. Max Mode was off in the picker, so the run is labeled High reasoning, not Max Mode.

## Cost

Not recorded yet. Cursor keeps per-request token usage only in its dashboard usage export; the local database has no totals for these chats. The cards show no cost until that export is matched to the chat timestamps, as was done for Argon.

## Gallery adaptation

The gallery changes these things and nothing else:

- `<html>`/`<body>` become `data-source-html`/`data-source-body` divs. `globals.css` goes through the scoped copy, and the model's iteration switcher is not rendered.
- Without Design Skill only: the gallery strips Tailwind's `@theme` block, which held the model's font utilities (`font-newsreader`, `font-space`, `font-plex-mono` and others). Those utilities are written out in `globals.css`, and the `:root`/`html`/`body` rules move onto the wrapper divs. Without this, every heading fell back to the gallery's Geist.
- The no-skill pages import four icons from `lucide-react`. The model installed ^1.71; the gallery resolves its own 0.542.
- Gemini 4 Carbon gets its own archive family, so Gemini 4 Argon stays on the home page.

Source hashes for every file the model changed or added are in `no-skills.source-sha256.json` and `frontend-design.source-sha256.json`.
