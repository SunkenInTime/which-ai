/**
 * Systemic Z-Index Scale (Section 6.F of design-taste-frontend skill)
 * Never use arbitrary z-index values outside this scale.
 */
export const Z_INDEX = {
  base: "z-0",
  elevated: "z-10",
  stickyNav: "z-30",
  switcher: "z-50",
} as const;
