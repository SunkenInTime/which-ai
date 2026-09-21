"use client";

import { useState } from "react";

export function StartButton({
  className,
  statusClassName,
  stackClassName,
}: {
  className: string;
  statusClassName: string;
  stackClassName: string;
}) {
  const [started, setStarted] = useState(false);

  return (
    <div className={stackClassName}>
      <button
        type="button"
        className={className}
        onClick={() => setStarted(true)}
      >
        Start a commonplace
      </button>
      {started ? (
        <p className={statusClassName} role="status">
          Started. This preview stores nothing.
        </p>
      ) : null}
    </div>
  );
}
