export function AppWindow() {
  return (
    <div className="overflow-hidden rounded-[18px] border border-[#e2ddd3] bg-white shadow-[0_40px_90px_-40px_rgba(30,24,18,0.45)]">
      {/* chrome */}
      <div className="flex items-center gap-3 border-b border-[#eee9df] bg-[#faf8f4] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#e6a297]" />
          <span className="size-2.5 rounded-full bg-[#e8cf95]" />
          <span className="size-2.5 rounded-full bg-[#a9ceb0]" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-md border border-[#eae5db] bg-white px-2.5 py-1 text-[10.5px] text-[#a8a196]">
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M4 1H2.5A1.5 1.5 0 0 0 1 2.5v5A1.5 1.5 0 0 0 2.5 9h5A1.5 1.5 0 0 0 9 7.5V6M6 1h3v3M9 1 4.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          cortex.app/brain/q4-strategy
        </div>
        <div className="flex items-center gap-1">
          <span className="flex size-5 items-center justify-center rounded-full bg-[#f0ece3] text-[9px] text-[#8b8478]">⌘</span>
          <span className="flex size-5 items-center justify-center rounded-full bg-[#f0ece3] text-[9px] text-[#8b8478]">K</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[168px_minmax(0,1fr)_176px]">
        {/* sidebar */}
        <aside className="hidden border-r border-[#f0ece3] bg-[#fbf9f5] p-2.5 md:block">
          <div className="flex items-center gap-1.5 rounded-md bg-[#f2eee5] px-2 py-1.5 text-[11px] text-[#8b8478]">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
              <circle cx="5.2" cy="5.2" r="3.6" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 8l2.4 2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Search notes
          </div>

          <p className="mt-3 px-1 font-mono text-[8.5px] tracking-[0.14em] text-[#bdb5a6] uppercase">
            Today
          </p>
          <ul className="mt-1.5 space-y-0.5 text-[11.5px] text-[#5d574d]">
            {[
              ["Q4 strategy notes", true],
              ["Pricing call — Dana", false],
              ["Reading: Deep Work", false],
              ["Onboarding rewrite", false],
            ].map(([label, active]) => (
              <li
                key={label as string}
                className={`flex items-center gap-1.5 truncate rounded-md px-1.5 py-1 ${
                  active ? "bg-[#efe9dc] font-medium text-[#2e2921]" : ""
                }`}
              >
                <span className={`size-1.5 shrink-0 rounded-full ${active ? "bg-[#c2643f]" : "bg-[#d8d2c5]"}`} />
                <span className="truncate">{label}</span>
              </li>
            ))}
          </ul>

          <p className="mt-3 px-1 font-mono text-[8.5px] tracking-[0.14em] text-[#bdb5a6] uppercase">
            Collections
          </p>
          <ul className="mt-1.5 space-y-0.5 text-[11.5px] text-[#6d675c]">
            {[
              ["# decisions", "12"],
              ["# people", "48"],
              ["# reading", "31"],
              ["# meetings", "126"],
            ].map(([label, n]) => (
              <li key={label} className="flex items-center justify-between rounded-md px-1.5 py-1">
                <span className="truncate">{label}</span>
                <span className="font-mono text-[9px] text-[#c2bbac]">{n}</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 rounded-lg border border-[#eae4d8] bg-white p-2">
            <div className="flex items-center justify-between font-mono text-[8.5px] tracking-[0.1em] text-[#a8a196] uppercase">
              <span>Sync</span>
              <span className="text-[#7d9a72]">live</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#f0ece3]">
              <div className="h-full w-[86%] rounded-full bg-[#a9c19c]" />
            </div>
          </div>
        </aside>

        {/* editor */}
        <div className="min-w-0 p-4 md:p-6">
          <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.08em] text-[#b0a897] uppercase">
            <span>notes</span>
            <span>/</span>
            <span>strategy</span>
            <span>/</span>
            <span className="text-[#8b8478]">q4</span>
          </div>

          <h3 className="mt-2 font-jakarta text-[19px] leading-tight font-semibold tracking-[-0.01em] text-[#221e18] md:text-[22px]">
            Q4 strategy notes
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {["#decisions", "#pricing", "#dana"].map((t) => (
              <span key={t} className="rounded-full bg-[#f3efe5] px-1.5 py-0.5 font-mono text-[8.5px] text-[#8b8478]">
                {t}
              </span>
            ))}
            <span className="font-mono text-[8.5px] text-[#c2bbac]">edited 2m ago</span>
          </div>

          <div className="mt-4 space-y-2.5 text-[11.5px] leading-[1.75] text-[#4f4a41] md:text-[12px]">
            <p>
              We&apos;re not selling storage anymore. The pitch is{" "}
              <span className="rounded-[3px] bg-[#f6e4c8]/70 px-0.5 text-[#5a4526]">
                recall
              </span>{" "}
              — the moment someone finds the thing they forgot they wrote.
            </p>
            <p className="text-[#6b655a]">
              Dana pushed back on usage-based pricing. Her point: the value compounds
              quietly, so the price should too. Proposal is a flat $8 with a generous
              free tier.
            </p>

            <div className="my-3 border-l-2 border-[#c2643f]/70 pl-2.5 text-[11px] text-[#7a7365] italic">
              “If it charges per note, I stop writing. That kills the product.”
              <span className="mt-1 block font-mono text-[8.5px] not-italic text-[#b0a897]">
                — linked from “Pricing call — Dana”
              </span>
            </div>

            <p className="text-[#6b655a]">
              Next step: test the flat tier against the usage ledger before the
              offsite on Friday.
            </p>
          </div>

          <div className="mt-4 flex items-center gap-1.5 border-t border-dashed border-[#eee9df] pt-3">
            <span className="font-mono text-[9px] text-[#c2bbac]">backlinks</span>
            <span className="rounded-full bg-[#f3efe5] px-1.5 py-px font-mono text-[8.5px] text-[#8b8478]">7</span>
            <span className="rounded-full bg-[#f3efe5] px-1.5 py-px font-mono text-[8.5px] text-[#8b8478]">3 people</span>
          </div>
        </div>

        {/* right rail: AI */}
        <aside className="hidden border-l border-[#f0ece3] bg-[#fbf9f5] p-2.5 md:block">
          <div className="rounded-lg border border-[#e6dfd0] bg-white p-2.5">
            <div className="flex items-center gap-1.5">
              <span className="flex size-4 items-center justify-center rounded-full bg-[#221e18] text-[8px] text-white">
                ✳
              </span>
              <span className="font-mono text-[8.5px] tracking-[0.1em] text-[#a8a196] uppercase">
                Ask cortex
              </span>
            </div>
            <p className="mt-2 text-[10.5px] leading-[1.6] text-[#5d574d]">
              What did we decide about pricing in March?
            </p>
            <div className="mt-2 space-y-1.5 border-t border-[#f0ece3] pt-2">
              <p className="text-[10px] leading-[1.6] text-[#4f4a41]">
                You landed on a flat $8/mo after rejecting usage tiers.
              </p>
              <p className="font-mono text-[8.5px] text-[#b0a897]">
                ↳ Pricing call — Dana · Mar 14
                <br />↳ Q4 strategy notes · Mar 15
              </p>
            </div>
          </div>

          <p className="mt-3 px-1 font-mono text-[8.5px] tracking-[0.14em] text-[#bdb5a6] uppercase">
            Connected
          </p>
          <div className="mt-1.5 space-y-1.5">
            {[
              ["Pricing call — Dana", "Mar 14"],
              ["Offsite agenda", "Mar 16"],
              ["Retention model", "Feb 28"],
            ].map(([t, d]) => (
              <div key={t} className="rounded-md border border-[#eee9df] bg-white px-2 py-1.5">
                <p className="truncate text-[10px] leading-tight text-[#5d574d]">{t}</p>
                <p className="mt-0.5 font-mono text-[8px] text-[#c2bbac]">{d}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
