import {
  siEvernote,
  siGooglekeep,
  siJoplin,
  siLogseq,
  siNotion,
  siObsidian,
  siRoamresearch,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "../_lib/cn";

/** Real brand marks from the Simple Icons set. Logo only, no category labels. */
export const IMPORT_SOURCES: SimpleIcon[] = [
  siNotion,
  siObsidian,
  siEvernote,
  siLogseq,
  siRoamresearch,
  siJoplin,
  siGooglekeep,
];

export function BrandLogo({
  icon,
  className,
}: {
  icon: SimpleIcon;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={icon.title}
      fill="currentColor"
      className={cn("h-6 w-auto shrink-0", className)}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}

export function LogoRow({
  className,
  logoClassName,
}: {
  className?: string;
  logoClassName?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-10 gap-y-5", className)}>
      {IMPORT_SOURCES.map((icon) => (
        <li key={icon.slug}>
          <BrandLogo icon={icon} className={logoClassName} />
        </li>
      ))}
    </ul>
  );
}
