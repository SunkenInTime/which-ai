/** Little illustrated plant for each note-growth stage: 0 seedling, 1 budding, 2 evergreen. */
export function Plant({ stage, className = "" }: { stage: 0 | 1 | 2; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <ellipse cx="32" cy="58" rx="16" ry="3" fill="#1f3a2b" fillOpacity=".12" />
      {stage === 0 && (
        <g className="origin-bottom animate-grow">
          <path d="M32 56V42" stroke="#3f7a44" strokeWidth="3" strokeLinecap="round" />
          <path d="M32 44c-8 0-12-5-12-11 8 0 12 4 12 11Z" fill="#7fb87a" />
          <path d="M32 42c7 0 11-4 11-10-7 0-11 4-11 10Z" fill="#5f9b5d" />
        </g>
      )}
      {stage === 1 && (
        <g className="origin-bottom animate-grow">
          <path d="M32 56V26" stroke="#3f7a44" strokeWidth="3" strokeLinecap="round" />
          <path d="M32 46c-9 0-14-5-14-12 9 0 14 5 14 12Z" fill="#7fb87a" />
          <path d="M32 38c8 0 13-5 13-11-8 0-13 5-13 11Z" fill="#5f9b5d" />
          <path d="M32 30c-6 0-9-4-9-9 6 0 9 4 9 9Z" fill="#7fb87a" />
          <circle cx="32" cy="22" r="5" fill="#f4a698" />
          <circle cx="32" cy="22" r="2" fill="#f4e3a1" />
        </g>
      )}
      {stage === 2 && (
        <g className="origin-bottom animate-grow">
          <path d="M32 56V30" stroke="#6b4a32" strokeWidth="4" strokeLinecap="round" />
          <circle cx="32" cy="22" r="14" fill="#3f7a44" />
          <circle cx="21" cy="28" r="9" fill="#5f9b5d" />
          <circle cx="43" cy="28" r="9" fill="#5f9b5d" />
          <circle cx="30" cy="16" r="6" fill="#7fb87a" />
          <circle cx="40" cy="20" r="2" fill="#f4c3b9" />
          <circle cx="24" cy="24" r="2" fill="#f4e3a1" />
        </g>
      )}
    </svg>
  );
}
