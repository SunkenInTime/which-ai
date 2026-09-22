import { ArrowRight } from "@phosphor-icons/react/ssr";

export function StartFree({ size = "md" }: { size?: "md" | "lg" }) {
  const pad = size === "lg" ? "h-13 px-7 text-base" : "h-11 px-5 text-[0.9375rem]";
  return (
    <a
      href="#start"
      className={`btn-primary inline-flex items-center gap-2 whitespace-nowrap font-medium ${pad}`}
    >
      Start free
      <ArrowRight aria-hidden size={16} weight="bold" />
    </a>
  );
}
