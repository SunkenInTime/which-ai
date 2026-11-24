import Image from "next/image";
import type { FormEvent } from "react";
import { Icon } from "./Icons";

type HeroProps = { edition: number; create: (text?: string) => void; openNote: (id: string) => void };
function Start({ children, onClick }: {children: React.ReactNode; onClick: () => void}) {
  return <button className="cta" onClick={onClick}>{children}<Icon name="arrow" size={18}/></button>;
}
function CurlyArrow({className}: {className: string}) {
  return <svg className={className} aria-hidden="true" viewBox="0 0 91 63" fill="none"><path d="M3 5c3 14 19 31 33 30 11-1 12-17 1-16-17 3-8 33 44 31m-9-7 11 7-11 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
export function Heroes({ edition, create, openNote }: HeroProps) {
  if (edition === 1) return <section className="studio-hero">
    <div className="scraps" aria-hidden="true">
      <div className="scrap lined-scrap"><div className="tape paper-tape"/><Image src="/variants/with-gemini-design-skill/gpt-6.2-astra/art/note-to-self.webp" alt="" width={627} height={627} loading="eager" unoptimized/></div>
      <figure className="scrap alpine-print"><div className="tape blue-tape"/><Image src="/variants/with-gemini-design-skill/gpt-6.2-astra/art/dolomites.webp" alt="" width={768} height={512} loading="eager" unoptimized/><figcaption>Dolomites, Italy</figcaption></figure>
      <div className="scrap yellow-scrap"><Image src="/variants/with-gemini-design-skill/gpt-6.2-astra/art/sticky-note.webp" alt="" width={627} height={627} loading="eager" unoptimized/></div>
      <figure className="scrap botanical-print"><div className="paperclip"/><Image src="/variants/with-gemini-design-skill/gpt-6.2-astra/art/olive-study.webp" alt="" width={768} height={512} loading="eager" unoptimized/></figure>
      <CurlyArrow className="curl left-curl"/>
      <svg viewBox="0 0 56 48" className="ink-spark" fill="none"><path d="m7 24 8-6m5-2L23 3m7 16 11-9" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round"/></svg>
    </div>
    <div className="hero-copy studio-copy"><h1>A home for your <span className="blue-line">wandering mind.<svg viewBox="0 0 480 16" preserveAspectRatio="none" aria-hidden="true"><path d="M3 10Q207-3 476 6M63 14Q265 4 429 10" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round"/></svg></span></h1>
      <p>Folio is your personal second brain. A quiet place to capture notes, connect ideas, and keep what inspires you.</p>
      <Start onClick={() => create()}>Start your notebook</Start>
      <span className="cta-note">Free to use. No sign-up needed.</span>
    </div>
  </section>;
  if (edition === 2) return <section className="field-hero"><div className="field-inner"><h1>Keep a field journal<br/>for your mind.</h1><div className="field-intro"><p>Gather observations, stray thoughts, and discoveries in a notebook that travels with you.</p><Start onClick={() => create()}>Begin a field note</Start></div></div><div className="photo-location"><Icon name="compass" size={17}/>Dolomites, Italy</div></section>;
  if (edition === 3) return <section className="atlas-hero">
    <svg aria-hidden="true" className="map-lines" viewBox="0 0 1400 610" preserveAspectRatio="none"><g fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M-60 25C110 35 60 226 186 226S210 423 420 453M140 226C220 140 310 90 402 115M1450 150C1320 150 1325 60 1230 132S1275 361 1070 457M1220 255C1325 390 1220 492 1460 510"/><path d="M307 620q-45-137 113-167m650 4q15 109-77 177" strokeDasharray="5 7"/></g><g fill="#f4cd83"><circle cx="420" cy="453" r="7"/><circle cx="402" cy="115" r="5"/><circle cx="1070" cy="457" r="7"/></g></svg>
    <button className="map-node node-left" onClick={() => openNote("light")}><Image src="/variants/with-gemini-design-skill/gpt-6.2-astra/art/architecture.webp" alt="" width={156} height={104}/><span><Icon name="photo" size={15}/>Light &amp; space</span></button>
    <button className="map-node node-right" onClick={() => openNote("reading")}><Icon name="book" size={27}/><span>The reading list</span></button>
    <div className="atlas-copy"><h1>One thought leads<br/><span>to another.</span></h1><p>Give your ideas a place to meet. Collect notes, link the threads, and see what grows between them.</p><Start onClick={() => create()}>Connect your first idea</Start></div>
  </section>;
  if (edition === 4) return <section className="reading-hero"><div className="reading-title"><h1>Room in the <i>margins.</i></h1></div><div className="reading-spread"><div className="reading-image" role="img" aria-label="An open, annotated book on a red desk"/><div className="reading-copy"><Icon name="book" size={36}/><p>A personal commonplace book for passages you underline, thoughts you return to, and ideas taking shape.</p><Start onClick={() => create()}>Write in the margins</Start></div></div></section>;
  function capture(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("thought") as HTMLInputElement;
    create(input.value.trim());
  }
  return <section className="night-hero"><div className="night-copy"><h1>A little space<br/><i>to think.</i></h1><p>Set down the thought that’s keeping you up. Your notes will be here when morning comes.</p><form onSubmit={capture} className="quick-capture"><label className="sr-only" htmlFor="thought">Your thought</label><Icon name="pen"/><input id="thought" name="thought" placeholder="Catch a thought…" autoComplete="off" required maxLength={2000}/><button type="submit" aria-label="Continue writing"><Icon name="arrow" size={19}/></button></form></div></section>;
}
