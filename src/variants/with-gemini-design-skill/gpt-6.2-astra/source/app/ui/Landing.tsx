"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { editions } from "./editions";
import { Icon, Logo } from "./Icons";
import { Heroes } from "./Heroes";
import { Notebook, NoteEditor } from "./Notebook";
import { blankNote, getNotes, serverNotes, subscribeNotes, type Note } from "./notes";

const steps = [
  { name: "Capture", title: "Keep the thought while it’s fresh.", text: "A line from a book. An idea on the train. Open a note and put it down in your own words." },
  { name: "Connect", title: "Give one idea a thread to follow.", text: "Link a note to something you’ve already collected. Follow that connection the next time you open it." },
  { name: "Revisit", title: "Find your way back to a good idea.", text: "Browse a collection, search for a half-remembered phrase, or keep a favorite close at hand." },
];
const guideArt = [
  ["note-to-self", "architecture", "green-notebook"],
  ["dolomites", "olive-study", "green-notebook"],
  ["sticky-note", "architecture", "note-to-self"],
  ["marginalia", "note-to-self", "green-notebook"],
  ["night-desk", "olive-study", "marginalia"],
];
const guideAlt: Record<string, string> = {
  "note-to-self": "A handwritten observation on ruled paper",
  architecture: "Soft daylight connects a sequence of vaulted rooms",
  "green-notebook": "A sage notebook and a yellow pencil",
  dolomites: "Pale limestone peaks rising above a pine forest",
  "olive-study": "A botanical study of an olive branch",
  "sticky-note": "A yellow note with a handwritten idea",
  marginalia: "Pencil underlines in an open book",
  "night-desk": "A notebook under a warm reading lamp",
};
const faq = [
  ["What can I keep in Folio?", "Write observations, reading notes, project ideas, and lists. Give each note a collection and link it to a related thought."],
  ["Where are my notes saved?", "Folio saves your notebook in this browser on this device. Your notes stay here when you close the page. Clearing the site’s browser data will remove your saved notebook."],
  ["Do I need an account?", "You can start writing immediately. The notebook is free to use and works without an account."],
];
function Switcher({ edition }: { edition: number }) {
  const [open, setOpen] = useState(false);
  const switcher = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    switcher.current?.querySelector<HTMLAnchorElement>("nav a")?.focus({preventScroll: true});
    const outside = (e: PointerEvent) => { if (!switcher.current?.contains(e.target as Node)) setOpen(false); };
    const escape = (e: KeyboardEvent) => {if (e.key === "Escape") {setOpen(false);trigger.current?.focus();}};
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {document.removeEventListener("pointerdown", outside);document.removeEventListener("keydown", escape);};
  }, [open]);
  return <div className="switcher" ref={switcher} onBlur={e => {if(e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);}}>
    {open && <nav className="switcher-menu" id="design-picker" aria-label="Landing page designs">{editions.map((item,i) => <Link key={item.name} href={'/' + (i+1)} aria-current={edition === i+1 ? "page" : undefined} onClick={() => setOpen(false)}><span className="design-dot" style={{backgroundColor:item.color}}/>{i+1}. {item.name}{edition === i+1 && <Icon name="check" size={15}/>}</Link>)}</nav>}
    <button ref={trigger} className="switcher-button" aria-expanded={open} aria-controls={open ? "design-picker" : undefined} aria-label={`Switch design, currently ${edition} of 5`} onClick={() => setOpen(!open)}><Icon name="layers" size={16}/><span>Design {edition} <b>/</b> 5</span><Icon name="chevron" size={14} className={open ? "" : "up"}/></button>
  </div>;
}
function Guide({ edition }: {edition:number}) {
  const [step, setStep] = useState(0);
  const current = steps[step];
  const art = guideArt[edition - 1][step];
  const titles = ["A notebook that thinks with you.", "A place for every discovery.", "Follow the connection.", "Make a thought your own.", "Give your thoughts a resting place."];
  return <section className="guide page-width" id="guide"><div className="guide-text"><h2>{titles[edition-1]}</h2><div className="guide-tabs" role="group" aria-label="Explore notebook features">{steps.map((s,i) => <button key={s.name} aria-pressed={step === i} onClick={() => setStep(i)}>{s.name}</button>)}</div><div className="guide-detail" aria-live="polite"><h3>{current.title}</h3><p>{current.text}</p></div></div><div className={'guide-visual art-' + art}><Image key={art} src={'/variants/with-gemini-design-skill/gpt-6.2-astra/art/' + art + '.webp'} alt={guideAlt[art]} width={550} height={425}/></div></section>;
}
export default function Landing({ edition }: { edition: number }) {
  const notes = useSyncExternalStore(subscribeNotes, getNotes, serverNotes);
  const [draft, setDraft] = useState<Note | null>(null);
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState(false);
  const [libraryVersion, setLibraryVersion] = useState(0);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(false), 2800);
    return () => clearTimeout(timer);
  }, [toast]);
  function newNote(text = "") { setDraft({...blankNote(), body:text}); }
  function saved() {
    setDraft(null);setLibraryVersion(v => v+1);setToast(true);
    requestAnimationFrame(() => document.getElementById("notebook")?.scrollIntoView({block:"start"}));
  }
  return <div className={'folio theme-' + edition} id="top">
    <a className="skip-link" href="#notebook">Skip to notebook</a>
    <header className="site-header"><div className="nav-shell"><a href="#top" aria-label="Folio home"><Logo/></a>
      <nav className={'site-nav' + (menu ? " open" : "")} aria-label="Main navigation" onClick={() => setMenu(false)}><a href="#notebook">Notebook</a><a href="#guide">How it works</a><a href="#questions">FAQ</a></nav>
      <div className="nav-actions"><a className="nav-cta" href="#notebook">Open notebook<Icon name="diagonal" size={15}/></a><button aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} className="mobile-menu" onClick={() => setMenu(!menu)}><Icon name={menu ? "x" : "menu"}/></button></div>
    </div></header>
    <main><Heroes edition={edition} create={newNote} openNote={id => {const note = notes.find(n => n.id === id);if(note) setDraft(note);}}/>
      <Notebook key={libraryVersion} notes={notes} onEdit={setDraft}/>
      <Guide edition={edition}/>
      <section className="faq page-width" id="questions"><h2>A few questions.</h2><div>{faq.map(([q,a]) => <details key={q}><summary>{q}<span className="expand"><Icon name="plus" size={18}/></span></summary><p>{a}</p></details>)}</div></section>
    </main>
    <footer><div className="footer-inner page-width"><a href="#top" aria-label="Folio home"><Logo/></a><span>Your personal second brain.</span><a href="#top">Back to top <Icon name="arrow" size={15}/></a></div></footer>
    {/* Gallery adaptation: the model's design switcher isn't rendered; the gallery has its own. */}
    {draft && <NoteEditor key={draft.id || "new"} note={draft} notes={notes} onSave={saved} close={() => setDraft(null)} onOpen={setDraft}/>}
    {toast && <div className="toast" role="status"><Icon name="check" size={16}/>Note saved to this device</div>}
  </div>;
}
