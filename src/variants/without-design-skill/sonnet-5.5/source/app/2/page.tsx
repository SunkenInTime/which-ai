import { JetBrains_Mono } from "next/font/google";
import { VersionSwitcher } from "../_components/version-switcher";

const mono = JetBrains_Mono({ subsets: ["latin"] });

const cmds = [
  ["engram new", "capture a thought in under a second"],
  ["engram link", "auto-connect related notes"],
  ["engram ask \"what did I decide about pricing?\"", "answers cited from your notes"],
  ["engram resurface", "daily digest of forgotten ideas"],
];

export default function Page() {
  return (
    <main className={`${mono.className} min-h-screen bg-[#0a0d0a] text-[#b7f5c0]`}>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 text-sm">
        <span className="text-[#5dff85]">~/engram<span className="animate-pulse">_</span></span>
        <div className="flex gap-6 text-[#6fa77b]">
          <a href="#cmds" className="hover:text-[#5dff85]">commands</a>
          <a href="#log" className="hover:text-[#5dff85]">changelog</a>
          <a href="#install" className="hover:text-[#5dff85]">install</a>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 pb-20 pt-14">
        <p className="text-sm text-[#6fa77b]">$ cat README.md</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-[#5dff85] sm:text-6xl">
          &gt; a second brain<br />that you can grep.
        </h1>
        <p className="mt-6 max-w-2xl leading-relaxed text-[#8fc99a]">
          Plain-text notes, bidirectional links, and an index that never forgets. Keyboard first, local first, yours forever.
        </p>
        <div id="install" className="mt-8 flex flex-wrap items-center gap-4">
          <code className="rounded border border-[#1f3a26] bg-[#0f160f] px-4 py-3 text-sm text-[#5dff85]">
            $ brew install engram
          </code>
          <a href="#" className="rounded bg-[#5dff85] px-5 py-3 text-sm font-bold text-[#0a0d0a] hover:bg-[#b7f5c0]">
            open web app &rarr;
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="overflow-hidden rounded-lg border border-[#1f3a26] bg-[#0d120d]">
          <div className="flex items-center gap-2 border-b border-[#1f3a26] px-4 py-2 text-xs text-[#6fa77b]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-3">zsh — engram</span>
          </div>
          <pre className="overflow-x-auto p-5 text-sm leading-7">
{`$ engram ask "why did we drop the annual plan?"

  > found 4 notes, 2 linked
  > 2025-03-11  pricing-review.md
  > 2025-04-02  churn-interviews.md

  Annual plan was dropped because 3 of 5 interviewees
  felt locked in. [[pricing-review]] [[churn-interviews]]

$ `}<span className="animate-pulse">█</span>
          </pre>
        </div>
      </section>

      <section id="cmds" className="mx-auto mt-24 max-w-5xl px-6">
        <h2 className="text-2xl font-bold text-[#5dff85]"># commands</h2>
        <ul className="mt-6 divide-y divide-[#1f3a26] border-y border-[#1f3a26]">
          {cmds.map(([c, d]) => (
            <li key={c} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8">
              <code className="text-[#5dff85] sm:w-1/2">$ {c}</code>
              <span className="text-sm text-[#6fa77b]"># {d}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="log" className="mx-auto mt-24 max-w-5xl px-6 pb-32">
        <h2 className="text-2xl font-bold text-[#5dff85]"># changelog</h2>
        <div className="mt-6 space-y-2 text-sm text-[#8fc99a]">
          <p><span className="text-[#ffbd2e]">v2.4</span> + graph view, 60fps on 100k notes</p>
          <p><span className="text-[#ffbd2e]">v2.3</span> + local embeddings, nothing leaves your machine</p>
          <p><span className="text-[#ffbd2e]">v2.2</span> + vim keybindings, obviously</p>
        </div>
      </section>
      <VersionSwitcher />
    </main>
  );
}
