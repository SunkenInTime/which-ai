import type { CSSProperties } from "react";

const paths = {
  arrow: "M4 12h15m-6-6 6 6-6 6",
  upRight: "M5 19 19 5M6 5h13v13",
  down: "M12 4v15m-6-6 6 6 6-6",
  chevron: "m6 14 6-6 6 6",
  grid: "M3 3h6v6H3zm12 0h6v6h-6zM3 15h6v6H3zm12 0h6v6h-6z",
  close: "m5 5 14 14M19 5 5 19",
  plus: "M12 4v16M4 12h16",
  search: "M16.5 10.5a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-2 5 5 5",
  file: "M5 3h9l5 5v13H5zM14 3v6h5M8 13h8M8 17h6",
  link: "m10 8 2-2a4 4 0 0 1 6 6l-2 2m-2 2-2 2a4 4 0 0 1-6-6l2-2m0 6 8-8",
  book: "M3 4c4-1 7 0 9 2 3-2 6-3 9-2v15c-3-1-6 0-9 2-2-2-5-3-9-2zM12 6v15",
  check: "m4 12 5 5L20 6",
  menu: "M3 8h18M3 16h18",
  sidebar: "M3 4h18v16H3zm6 0v16",
  back: "M20 12H4m6 6-6-6 6-6",
  circle: "M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  collapse: "M4 12h16",
  flower: "m12 2 0 20M2 12h20M5 5l14 14M5 19 19 5",
};
export function Icon({ name, size = 18, style }: { name: keyof typeof paths; size?: number; style?: CSSProperties }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={style}><path d={paths[name]}/></svg>;
}

export function BrandMark({ size = 33 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">{Array.from({length:12},(_,i)=><path key={i} transform={`rotate(${i*30} 20 20)`} d="M18 19.4 15.6 2.6Q18.1 1.3 20.6 1.9l1 17.4z"/>)}</svg>;
}

export function FeatureMark({kind}:{kind:"capture"|"connect"|"recall"}) {
  return <svg className="feature-mark" width="42" height="42" viewBox="0 0 42 42" aria-hidden="true">
    {kind==="capture" ? <g stroke="#272821" strokeWidth="1.5" strokeLinejoin="round"><path d="m4 12 22-6 6 24-22 5z" fill="#e8a58b"/><path d="m10 8 23-1 1 25-22 1z" fill="#f4f0e3"/><path d="m14 13 15-1m-15 6 14-1m-14 6 10-1" fill="none"/></g> :
    kind==="connect" ? <g stroke="#272821" strokeWidth="1.5"><path d="m7 29 12-18 14 13-26 5" fill="none"/><circle cx="18" cy="10" r="5.5" fill="#87a5cc"/><circle cx="7" cy="30" r="4.4" fill="#f0ebd8"/><circle cx="33" cy="24" r="5" fill="#e8a58b"/></g> :
    <g stroke="#272821" strokeWidth="1.6"><circle cx="17" cy="16" r="11" fill="#dfc96b"/><circle cx="17" cy="16" r="7" fill="#f5f3eb"/><path d="m24 24 5 5m-2-1 3-3 8 9-3 3z" fill="#272821"/></g>}
  </svg>;
}
