"use client";

import { useId, useState } from "react";
import { ArrowRight, Check } from "@phosphor-icons/react";

type State =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | { kind: "done"; email: string };

export function Signup() {
  const id = useId();
  const [state, setState] = useState<State>({ kind: "idle" });

  if (state.kind === "done") {
    return (
      <p
        role="status"
        className="font-serif-v2 flex items-start gap-3 text-xl leading-[1.5]"
      >
        <Check
          aria-hidden
          size={22}
          weight="bold"
          className="mt-1 shrink-0 text-(--accent-text)"
        />
        <span>
          A sign-in link is on its way to{" "}
          <span className="italic">{state.email}</span>. Your first page is
          waiting.
        </span>
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
        if (!email) {
          setState({ kind: "error", message: "Enter your email to start." });
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setState({ kind: "error", message: "That email address looks incomplete." });
        } else {
          setState({ kind: "done", email });
        }
      }}
      className="max-w-xl"
    >
      <label htmlFor={id} className="font-ui text-[0.9375rem] font-medium">
        Email
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id={id}
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={state.kind === "error"}
          aria-describedby={`${id}-help`}
          onChange={() => state.kind === "error" && setState({ kind: "idle" })}
          className="font-ui h-13 min-w-0 flex-1 border border-(--ink-soft) bg-transparent px-4 text-base text-(--ink) outline-none placeholder:text-(--ink-soft) focus-visible:border-(--accent) aria-invalid:border-(--accent)"
          placeholder="you@example.com"
        />
        <button
          type="submit"
          className="btn-primary font-ui inline-flex h-13 items-center justify-center gap-2 px-7 text-base font-medium whitespace-nowrap"
        >
          Start free
          <ArrowRight aria-hidden size={16} weight="bold" />
        </button>
      </div>
      <p
        id={`${id}-help`}
        aria-live="polite"
        className={`font-ui mt-2.5 text-[0.875rem] ${
          state.kind === "error" ? "text-(--accent-text)" : "text-(--ink-soft)"
        }`}
      >
        {state.kind === "error"
          ? state.message
          : "No card needed. The free plan has no time limit."}
      </p>
    </form>
  );
}
