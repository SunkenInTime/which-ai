import { cn } from "../_lib/cn";

/**
 * The Pith mark: a ring with a core, like a stem cut in cross-section.
 * Built from two CSS shapes so it inherits currentColor and each
 * iteration's corner radius.
 */
export function Mark({
  className,
  shape = "round",
}: {
  className?: string;
  shape?: "round" | "square" | "soft";
}) {
  const radius =
    shape === "round" ? "rounded-full" : shape === "soft" ? "rounded-[5px]" : "rounded-none";
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-5 shrink-0 place-items-center border-[2.5px] border-current",
        radius,
        className,
      )}
    >
      <span className={cn("size-1.5 bg-current", radius)} />
    </span>
  );
}
