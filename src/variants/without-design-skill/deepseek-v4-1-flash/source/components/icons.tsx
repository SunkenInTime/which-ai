import type { IconName } from "@/variants/without-design-skill/deepseek-v4-1-flash/source/lib/content";

type Props = { className?: string; strokeWidth?: number };

const base = (className?: string) => ({
  viewBox: "0 0 24 24",
  fill: "none" as const,
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
  className,
});

export function CaptureIcon({ className, strokeWidth = 1.4 }: Props) {
  return (
    <svg {...base(className)}>
      <path d="M4 19.5V6.8c0-.99.8-1.8 1.8-1.8h8.4c.99 0 1.8.8 1.8 1.8v8.4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M4 19.5h7.2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M13.6 19.5 20 13.1a1.9 1.9 0 0 0-2.7-2.7L10.9 16.8v2.7h2.7Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M7 8.5h6M7 11.5h4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function GraphIcon({ className, strokeWidth = 1.4 }: Props) {
  return (
    <svg {...base(className)}>
      <circle cx="6" cy="7" r="2.2" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="18" cy="6" r="2.2" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="12" cy="13.5" r="2.6" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="7" cy="19" r="1.9" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="17.5" cy="18.5" r="1.9" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M7.7 8.8l2.3 2.6M16.3 7.6l-2.5 3.3M10.9 15.7 8.4 17.8M13.5 15.5l2.5 1.6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function SparkIcon({ className, strokeWidth = 1.4 }: Props) {
  return (
    <svg {...base(className)}>
      <path d="M12 3.2c.5 3.6 1.9 5 5.5 5.5-3.6.5-5 1.9-5.5 5.5-.5-3.6-1.9-5-5.5-5.5 3.6-.5 5-1.9 5.5-5.5Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M17.5 15c.3 2 1 2.7 3 3-2 .3-2.7 1-3 3-.3-2-1-2.7-3-3 2-.3 2.7-1 3-3Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}

export function LockIcon({ className, strokeWidth = 1.4 }: Props) {
  return (
    <svg {...base(className)}>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.2" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M12 14v2.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function ArrowIcon({ className, strokeWidth = 1.5 }: Props) {
  return (
    <svg {...base(className)}>
      <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className, strokeWidth = 1.6 }: Props) {
  return (
    <svg {...base(className)}>
      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const iconMap = {
  capture: CaptureIcon,
  graph: GraphIcon,
  spark: SparkIcon,
  lock: LockIcon,
};

export function FeatureIcon({ name, className, strokeWidth }: { name: IconName } & Props) {
  const Cmp = iconMap[name];
  return <Cmp className={className} strokeWidth={strokeWidth} />;
}

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
      <path d="M12 2.8v5.2M12 16v5.2M2.8 12h5.2M16 12h5.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
