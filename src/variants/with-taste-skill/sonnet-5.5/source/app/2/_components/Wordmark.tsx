import { Cell } from "./Cell";
import s from "../p2.module.css";

export function Wordmark({ href = "#top" }: { href?: string }) {
  return (
    <a className={s.wordmark} href={href} aria-label="Engram, back to the top">
      <Cell className={s.wordmarkCell} />
      <span>engram</span>
    </a>
  );
}
