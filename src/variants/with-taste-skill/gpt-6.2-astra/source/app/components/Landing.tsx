"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Hero from "./Heroes";
import Notebook from "./Notebook";
import { BrandMark, Icon } from "./Icons";
import { features, questions, starterNotes, type Design } from "./content";

function Logo() {
  return <a href="#top" className="logo" aria-label="Foliohm home"><BrandMark/><span>Foliohm</span></a>;
}
function Navigation({openNote}:{openNote:()=>void}) {
  const [open,setOpen]=useState(false);
  const marker=useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    if(!open)return;
    const escape=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);marker.current?.focus();}};
    document.addEventListener("keydown",escape);
    return ()=>document.removeEventListener("keydown",escape);
  },[open]);
  return <header className="site-nav nav"><div className="wrap nav-inner">
    <Logo/><nav id="main-nav" aria-label="Main navigation" className={open?"nav-links expanded":"nav-links"} onClick={()=>setOpen(false)}>
      <a href="#notebook">How it works</a><a href="#use-cases">Use cases</a><a href="#questions">FAQ</a>
    </nav><div className="nav-actions"><button className="nav-cta btn" onClick={()=>{setOpen(false);openNote();}}>Open notebook <Icon name="upRight" size={15}/></button>
    <button ref={marker} className="hamburger" aria-expanded={open} aria-controls="main-nav" aria-label={open?"Close menu":"Open menu"} onClick={()=>setOpen(!open)}><Icon name={open?"close":"menu"} size={23}/></button></div>
  </div></header>;
}

function Preview({tab,openNote}:{tab:number;openNote:(id?:string)=>void}) {
  const [search,setSearch]=useState("");
  const [current,setCurrent]=useState("walk");
  const note=starterNotes.find(n=>n.id===current)!;
  const results=starterNotes.filter(n=>(n.title+n.body).toLowerCase().includes(search.toLowerCase()));
  return <div className="app-frame preview ui" data-ui="doc">
    <div className="app-bar"><div className="window-dots" aria-hidden="true"><i/><i/><i/></div><span>Foliohm / My notebook</span><Icon name="sidebar" size={15}/></div>
    <div className="preview-body"><aside className="preview-aside"><div className="workspace-name"><BrandMark size={18}/> My notebook</div><div className="micro">Pages</div>
      {starterNotes.map(n=><button key={n.id} className={n.id===current?"current":""} onClick={()=>setCurrent(n.id)}><Icon name="file" size={14}/>{n.title}</button>)}
    </aside><article className="preview-doc">
      {tab===2?<><span className="micro">Notebook search</span><label className="preview-search"><Icon name="search" size={18}/><input type="search" aria-label="Search the notebook preview" placeholder="Search your notes" value={search} onChange={e=>setSearch(e.target.value)}/></label>
      <div className="search-results">{results.map(n=><button key={n.id} onClick={()=>openNote(n.id)}><Icon name="file" size={14}/>{n.title}<Icon name="upRight" size={13}/></button>)}{!results.length&&<p>No matching notes.</p>}</div></>:
      <><div className="micro"><Icon name="file" size={13}/> {tab===0?"Notebook entry":"Linked note"}</div><h3>{note.title}</h3><p>{note.body.split("\n\n")[0]}</p><p>{note.body.split("\n\n")[1]}</p>
      {tab===1?<div className="preview-relations">{starterNotes.filter(n=>n.id!==current&&(note.links.includes(n.id)||n.links.includes(current))).map(n=><button key={n.id} onClick={()=>setCurrent(n.id)}><Icon name="link" size={14}/>{n.title}</button>)}</div>:<button className="edit-note" onClick={()=>openNote(note.id)}>Edit this note <Icon name="upRight" size={13}/></button>}</>}
    </article></div>
  </div>;
}

const uses=[
  {label:"For reading",title:"Keep what you underline.",text:"Give each passage a page of its own. Add what it made you think of, and link it to a question you’re already asking.",note:"reading"},
  {label:"For projects",title:"Gather the pieces of a project.",text:"Keep your questions, early ideas, and decisions in separate notes. Link them together as the work takes shape.",note:"garden"},
  {label:"For everyday life",title:"Notice the little things.",text:"Record a detail from the walk home. Leave a thought for tomorrow. Small entries give you something to return to.",note:"attention"},
];

export default function Landing({design}:{design:Design}) {
  const [editor,setEditor]=useState<string|null>(null);
  const [feature,setFeature]=useState(0);
  const [usage,setUsage]=useState(0);
  const openNote=(id?:string)=>setEditor(id||"open");
  const moment = ["iris-opens","pinned-chapters","liquid-type","letters-assemble","line-carries-colour"][design-1];
  const caseContent=uses[usage];
  return <div className={'site v'+design}>
    <a className="skip-link" href="#content">Skip to content</a>
    <Navigation openNote={()=>openNote()}/>
    <main id="content">
      <Hero openNote={openNote} design={design} selectFeature={setFeature}/>
      <section className="notebook-section full-section" id="notebook" data-moment={design===1||design===5?moment:undefined}>
        <div className="wrap section-layout"><div className="section-heading"><div className="eyebrow"><i/> Inside Foliohm</div><h2>Your notebook, open.</h2></div>
        <div className="demo-layout"><div className="feature-options">{features.map((f,i)=>
          <button className={i===feature?"feature-option chosen":"feature-option"} key={f.icon} onClick={()=>setFeature(i)} aria-pressed={feature===i}><span className="feature-number">0{i+1}</span><span><b>{f.title}</b>{feature===i&&<small>{f.text}</small>}</span><Icon name={feature===i?"collapse":"plus"} size={17}/></button>)}</div>
        <Preview tab={feature} openNote={openNote}/></div></div>
      </section>
      {design===2 ? <section id="use-cases" className="full-section use-section chapters" data-moment={moment}>
        <div className="wrap mo-pc__grid"><div className="mo-pc__text"><h2>From the field journal</h2><ol className="mo-pc__steps">{uses.map(u=><li key={u.note} className="mo-pc__step"><h3>{u.label}</h3><p>{u.text}</p><figure className="mo-pc__visual"><div className="chapter-page"><Icon name="book" size={22}/><strong>{starterNotes.find(n=>n.id===u.note)?.title}</strong><p>{starterNotes.find(n=>n.id===u.note)?.body.split("\n\n")[0]}</p></div></figure></li>)}</ol></div><div className="mo-pc__visuals"/></div>
      </section>:<section className="use-section full-section" id="use-cases" data-moment={design===3||design===4?moment:undefined}>
        <div className="wrap use-spread">
          <div className="use-copy">
            <div className="section-heading"><div className="eyebrow"><i/> Use cases</div><h2 className="mo-la__type mo-lt__type">A notebook for life.</h2></div>
            <div className="use-tabs">{uses.map((u,i)=><button key={u.note} aria-pressed={i===usage} onClick={()=>setUsage(i)}>{u.label}</button>)}</div>
            <article className="use-description"><h3>{caseContent.title}</h3><p>{caseContent.text}</p><button className="text-link" onClick={()=>openNote(caseContent.note)}>Read the entry <Icon name="upRight" size={15}/></button></article>
          </div>
          <figure className="use-plate"><Image src={'/variants/with-taste-skill/gpt-6.2-astra/art/'+["reading","projects","everyday"][usage]+'.webp'} width={550} height={380} alt={["An engraved open book","A drawing compass","A botanical leaf study"][usage]}/></figure>
        </div>
      </section>}
    </main>
    <footer className="closing" id="questions"><div className="faq-section"><div className="wrap faq-wrap"><div><div className="eyebrow"><i/> FAQ</div><h2>Notebook<br/><em>questions.</em></h2><button className="button faq-action" onClick={()=>openNote()}>Open notebook <Icon name="upRight" size={16}/></button></div><div className="questions">{questions.map(([q,a])=><details key={q}><summary>{q}<Icon name="plus" size={17}/></summary><p>{a}</p></details>)}</div></div></div>
    <div className="wrap footer-row"><Logo/><a className="text-link" href="#top">Back to top <Icon name="down" size={14} style={{transform:"rotate(180deg)"}}/></a></div>
      {design===2&&<div className="wrap credits">Landscape by <a href="https://commons.wikimedia.org/wiki/File:Sl%C3%B8verfjorden_towards_northeast,_Austv%C3%A5g%C3%B8ya,_Lofoten,_Norway,_2015_September.jpg">Ximonic, via Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a></div>}
    </footer>
    {/* Gallery adaptation: the model's design switcher isn't rendered; the gallery has its own. */}
    {editor!==null&&<Notebook initialId={editor==="open"?undefined:editor} onClose={()=>setEditor(null)}/>}
  </div>;
}
