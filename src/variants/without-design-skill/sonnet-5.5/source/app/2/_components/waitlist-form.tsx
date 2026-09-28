"use client";

import { useState } from "react";
import { Icon } from "@/variants/without-design-skill/sonnet-5.5/source/app/_components/icons";

export function WaitlistForm({ id }: { id: string }) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p
        role="status"
        className="mx-auto flex w-full max-w-md items-center justify-center gap-2 rounded-full border border-[color:#5ef0ff]/40 bg-[color:#5ef0ff]/10 px-5 py-3.5 font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-sm text-[color:#5ef0ff]"
      >
        <Icon name="check" className="size-4" /> You&rsquo;re on the list. Check your inbox.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="mx-auto flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] p-1.5 backdrop-blur transition focus-within:border-[color:#5ef0ff]/60 focus-within:shadow-[0_0_0_4px_rgba(94,240,255,0.12)]"
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        type="email"
        required
        placeholder="you@domain.com"
        className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-[color:#8a90a8]"
      />
      <button
        type="submit"
        className="rounded-full bg-[color:#5ef0ff] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-[color:#05060a] transition hover:bg-white"
      >
        Get early access
      </button>
    </form>
  );
}
