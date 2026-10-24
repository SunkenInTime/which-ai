import { EBBINGHAUS, RESURFACE_DAYS } from "../_shared/facts";

export { EBBINGHAUS, RESURFACE_DAYS };

/** The seven measured points, with the delay in hours and the savings in per cent. */
export const POINTS = EBBINGHAUS.savings.map((s) => ({
  label: s.delay,
  hours: s.hours,
  pct: s.pct,
}));

/** Time axis: a gentle log scale so 20 minutes and 60 days share one picture. */
export const AXIS_MAX_HOURS = 60 * 24;
export const U = (hours: number) => Math.log(1 + hours);
export const U_MAX = U(AXIS_MAX_HOURS);
export const U_MIN = U(POINTS[0].hours);
export const hoursFromU = (u: number) => Math.exp(u) - 1;

/** Savings read from the measured points; null outside the measured range. */
export function savingsAt(hours: number): { pct: number; measured: boolean } | null {
  const first = POINTS[0];
  const last = POINTS[POINTS.length - 1];
  if (hours < first.hours - 1e-9 || hours > last.hours + 1e-9) return null;
  for (let i = 0; i < POINTS.length; i++) {
    const p = POINTS[i];
    if (Math.abs(p.hours - hours) < 1e-6) return { pct: p.pct, measured: true };
    const q = POINTS[i + 1];
    if (q && hours > p.hours && hours < q.hours) {
      const k = (U(hours) - U(p.hours)) / (U(q.hours) - U(p.hours));
      return { pct: p.pct + (q.pct - p.pct) * k, measured: false };
    }
  }
  return null;
}

/**
 * The schematic of Engram's returns. It reuses the shape of the measured curve,
 * restarting at the top on each return day and stretching the clock each time.
 * It is an illustration of the principle, not data, and is always labelled as such.
 */
export function schematicPath(): { hours: number; pct: number }[] {
  const out: { hours: number; pct: number }[] = [];
  const returns = [0, ...RESURFACE_DAYS.map((d) => d * 24)];
  const f = (tau: number) => {
    // measured curve, with 100 at tau = 0, read on the same log scale
    if (tau <= 0) return 100;
    const first = POINTS[0];
    if (tau <= first.hours) {
      const k = U(tau) / U(first.hours);
      return 100 + (first.pct - 100) * k;
    }
    const r = savingsAt(Math.min(tau, POINTS[POINTS.length - 1].hours));
    return r ? r.pct : POINTS[POINTS.length - 1].pct;
  };
  returns.forEach((start, k) => {
    const end = k < returns.length - 1 ? returns[k + 1] : AXIS_MAX_HOURS;
    const stretch = Math.pow(8, k);
    const steps = 14;
    for (let i = 0; i <= steps; i++) {
      // sample on a log grid so the early drop is drawn smoothly
      const span = end - start;
      const tau = (Math.exp((Math.log(1 + span) * i) / steps) - 1);
      out.push({ hours: start + tau, pct: f(tau / stretch) });
    }
  });
  return out;
}

export function formatDelay(hours: number): string {
  if (hours < 1) {
    const m = Math.round(hours * 60);
    return `${m} minutes`;
  }
  if (hours < 24) {
    const h = Math.round(hours);
    return h === 1 ? "1 hour" : `${h} hours`;
  }
  const d = Math.round(hours / 24);
  return d === 1 ? "1 day" : `${d} days`;
}
