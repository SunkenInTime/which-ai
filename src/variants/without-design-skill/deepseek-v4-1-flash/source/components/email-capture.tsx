"use client";

import { useState, type ReactNode } from "react";

type Props = {
  /** Wrapper (the form element) classes. */
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  buttonLabel: ReactNode;
  placeholder?: string;
  /** Applied to the success message when the form is submitted. */
  successClassName?: string;
  successMessage?: string;
};

/**
 * Email capture used by every iteration. Styling is passed in so each
 * direction keeps its own typography while the behaviour stays real:
 * validate, submit, confirm, and never reload the page.
 */
export default function EmailCapture({
  className,
  inputClassName,
  buttonClassName,
  buttonLabel,
  placeholder = "you@yourwork.com",
  successClassName,
  successMessage = "You're on the list — check your inbox.",
}: Props) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p role="status" className={successClassName}>
        {successMessage}
      </p>
    );
  }

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <input
        type="email"
        required
        name="email"
        autoComplete="email"
        placeholder={placeholder}
        aria-label="Email address"
        className={inputClassName}
      />
      <button type="submit" className={buttonClassName}>
        {buttonLabel}
      </button>
    </form>
  );
}
