"use client";

import { FormEvent, useState } from "react";
import { primaryCta } from "@/variants/with-taste-skill/grok-4.7/source/lib/cta";

type Status = "idle" | "loading" | "error" | "success";

export function EmailForm({ id }: { id: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 700));
    window.sessionStorage.setItem("halden-demo-email", value);
    setStatus("success");
  }

  if (status === "success") {
    return (
      <p className="text-base font-medium" role="status">
        Saved here. This page does not send email yet.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        Email
      </label>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        <input
          id={id}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@studio.com"
          aria-invalid={status === "error"}
          aria-describedby={`${id}-help${status === "error" ? ` ${id}-error` : ""}`}
          className="h-12 w-full min-w-0 flex-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-3 text-base text-[var(--fg)] outline-none placeholder:text-[var(--muted)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-busy={status === "loading"}
          className={`${primaryCta} w-full sm:w-auto disabled:opacity-70`}
        >
          {status === "loading" ? (
            <>
              <span className="sr-only">Sending your email</span>
              <span aria-hidden="true">Sending</span>
            </>
          ) : (
            "Start writing"
          )}
        </button>
      </div>
      <p id={`${id}-help`} className="text-sm text-[var(--muted)]">
        Checked in the browser. This demo does not send mail.
      </p>
      <p
        id={`${id}-error`}
        role={status === "error" ? "alert" : undefined}
        className="min-h-5 text-sm text-[var(--danger)]"
      >
        {status === "error"
          ? "Enter a full email address, including the domain."
          : ""}
      </p>
    </form>
  );
}
