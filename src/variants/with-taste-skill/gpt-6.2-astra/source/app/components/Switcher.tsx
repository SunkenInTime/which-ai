"use client";
import { useEffect, useRef, useState } from "react";
import { designs, type Design } from "./content";
import { Icon } from "./Icons";

export default function Switcher({ design }: { design: Design }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const click = (e: PointerEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener("pointerdown",click); document.addEventListener("keydown",key);
    return () => { document.removeEventListener("pointerdown",click); document.removeEventListener("keydown",key); };
  },[open]);
  return <div className="design-switch" ref={box}>
    <button className="switch-trigger" ref={trigger} aria-expanded={open} aria-controls="design-list" onClick={()=>setOpen(!open)}><Icon name="grid" size={14}/><span>Design <b>0{design}</b><i> / 05</i></span><Icon name="chevron" size={13} style={{transform:open?"rotate(180deg)":""}}/></button>
    {open && <nav aria-label="Choose a landing page design" id="design-list" className="design-list"><div className="micro">Design iterations</div>{designs.map((d,i)=>
      <a key={d.name} href={'/'+(i+1)} aria-current={i+1===design?"page":undefined}><span className="design-swatch" style={{background:d.color}}/><small>0{i+1}</small><span>{d.name}</span>{design===i+1&&<Icon name="check" size={14}/>}</a>
    )}</nav>}
  </div>;
}
