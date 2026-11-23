"use client";

import { useId, useState } from "react";

type Props = {
  label?: string;
  prompt?: string;
  done?: string;
};

export default function Signup({
  label = "Send me an invite",
  prompt = "Where should we send your invitation?",
  done = "You’re on the list. Your first note is on its way.",
}: Props) {
  const id = useId();
  const [sent, setSent] = useState(false);

  return (
    <form
      className="signup"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      {sent ? (
        <p className="signup-done" role="status">
          {done}
        </p>
      ) : (
        <>
          <label className="signup-prompt" htmlFor={id}>
            {prompt}
          </label>
          <div className="signup-row">
            <input
              className="signup-input"
              id={id}
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
            <button className="signup-button" type="submit">
              {label}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
