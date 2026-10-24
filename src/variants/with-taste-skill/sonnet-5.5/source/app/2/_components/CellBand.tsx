import { CELL_PATH } from "./Cell";
import s from "../p2.module.css";

/**
 * A row of cells, all reaching the same way: the band that stands where a
 * stripe would. Drawn as one SVG pattern; it drifts one period, slowly.
 */
export function CellBand({
  id,
  cell = 32,
  gap = 16,
  className = "",
  drift = true,
}: {
  id: string;
  cell?: number;
  gap?: number;
  className?: string;
  drift?: boolean;
}) {
  const period = cell + gap;
  return (
    <div className={`${s.band} ${className}`} style={{ height: cell }} aria-hidden="true">
      <svg
        className={drift ? s.bandDrift : undefined}
        style={{ ["--period" as string]: `${period}px`, width: "calc(100% + 400px)", height: cell }}
        height={cell}
      >
        <defs>
          <pattern id={id} width={period} height={cell} patternUnits="userSpaceOnUse">
            <path d={CELL_PATH} transform={`scale(${cell / 24})`} fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height={cell} fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
