"use client";
import { useState } from "react";
import Image from "next/image";
import { BrandMark, FeatureMark, Icon } from "./Icons";
import { features, starterNotes, type Design } from "./content";

type HeroProps = { design: Design; openNote: (id?: string) => void; selectFeature: (i: number) => void };
type Open = Pick<HeroProps, "openNote">;
function Actions({openNote, secondary=true, label="Open notebook"}: Open & {secondary?:boolean;label?:string}) {
  return <div className="hero-actions"><button className="button btn" onClick={()=>openNote()}>{label}<Icon name="upRight" size={17}/></button>{secondary&&<a className="text-link" href="#notebook">See how it works <Icon name="down" size={15}/></a>}</div>;
}
function Label({children}:{children:React.ReactNode}) {
  return <div className="eyebrow"><span className="label-mark"><BrandMark size={17}/></span>{children}</div>;
}
function FeatureRail({selectFeature}:{selectFeature:(i:number)=>void}) {
  return <div className="feature-rail">{features.map((f,i)=><a key={f.title} href="#notebook" onClick={()=>selectFeature(i)}>
    <FeatureMark kind={f.icon}/><div><b>{f.title}</b><span>{f.body}</span></div></a>)}</div>;
}

function Commonplace({openNote, selectFeature}: HeroProps) {
  return <div className="wrap paper-hero">
    <div className="paper-spread">
      <div className="hero-copy">
        <Label>A personal knowledge notebook</Label>
        <h1>Your second <br/><em>brain.</em></h1>
        <p className="lead">A home for your notes, ideas, and everything in between. Capture a thought, connect the dots, and find it again.</p>
        <Actions openNote={openNote}/>
      </div>
      <div className="study-plate" data-visual data-enter-media>
        <div className="plate-meta"><span className="plate-tick" aria-hidden="true"/><span>Fig. 01</span></div>
        <picture><source media="(max-width: 700px)" srcSet="/variants/with-taste-skill/gpt-6.2-astra/art/thought-study-small.webp"/><Image src="/variants/with-taste-skill/gpt-6.2-astra/art/thought-study.webp" width={1448} height={1086} alt="A cut-paper classical bust with field notes, a leafy branch, and a butterfly emerging from its head." loading="eager" fetchPriority="high" className="study-art"/></picture>
        <span className="plate-bottom" aria-hidden="true"/>
      </div>
    </div>
    <FeatureRail selectFeature={selectFeature}/>
  </div>;
}

function FieldJournal({openNote}: Open) {
  return <div className="forest-hero">
    <picture><source media="(max-width: 700px)" srcSet="/variants/with-taste-skill/gpt-6.2-astra/art/field-landscape-small.webp"/><Image src="/variants/with-taste-skill/gpt-6.2-astra/art/field-landscape.webp" alt="Mountains and autumn foliage reflected in the still water of Sløverfjorden" width={2400} height={1568} loading="eager" fetchPriority="high" className="forest-image" data-enter-media data-source="commons" data-subject="landscape"/></picture>
    <div className="forest-shade"/>
    <div className="forest-inner wrap">
      <div className="forest-title"><Label>The field journal</Label><h1>A notebook for<br/><em>wandering minds.</em></h1>
        <p className="lead">For things you notice along the way. Keep a thought, a passage, or a question, then follow it back to the rest of your notes.</p>
        <Actions openNote={openNote} secondary={false}/>
      </div>
      <div className="field-foot"><span><span className="field-cross">✳</span> Sløverfjorden, Norway</span><a href="#notebook">Inside the journal <Icon name="down" size={15}/></a></div>
    </div>
  </div>;
}

const points = [[28,39],[49,25],[67,38],[49,58],[23,69],[76,67],[60,83],[13,51],[34,17],[84,46],[77,19],[36,80],[65,12],[8,29],[89,80],[14,87]];
const edges = [[0,1],[0,3],[0,4],[1,2],[1,8],[2,3],[2,5],[3,4],[3,5],[3,6],[0,7],[4,7],[4,11],[5,6],[2,9],[9,10],[1,12],[8,12],[7,13],[5,14],[4,15],[2,10],[0,8],[6,11],[3,11],[5,9]];
const nodeNotes = ["walk","attention","reading","garden"];
function Observatory({openNote}: Open) {
  const [current,setCurrent] = useState("garden");
  const selected=starterNotes.find(n=>n.id===current)!;
  return <div className="wrap observatory">
    <div className="orbit-main"><div className="hero-copy"><Label>Connected notes</Label><h1>Ideas live<br/>in <em>clusters.</em></h1><p className="lead">Follow the links between your notes. A reading list, a walk, a half-finished thought. See what they have in common.</p><Actions openNote={openNote}/></div>
    <div className="graph" data-visual data-enter-media>
      <div className="graph-info"><span><i/> Local graph</span><Icon name="grid" size={14}/></div>
      <svg className="constellation" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs><pattern id="starfield" width="7.5" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".12" fill="#b4c2af"/></pattern></defs>
        <rect width="100" height="100" fill="url(#starfield)"/>
        <g fill="none" stroke="#435b4f" strokeWidth=".13">{[18,30,42].map(r=><ellipse key={r} cx="49" cy="50" rx={r} ry={r} strokeDasharray=".7 .7"/>)}</g>
        {edges.map(([a,b])=><line key={a+'-'+b} x1={points[a][0]} y1={points[a][1]} x2={points[b][0]} y2={points[b][1]} stroke={nodeNotes[a]===current||nodeNotes[b]===current?"#b4eaaa":"#619578"} strokeWidth=".22"/>)}
        {points.slice(4).map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r={i%3===0?.84:.5} fill={i%3===0?"#d1ddac":"#839c87"}/>)}
      </svg>
      {nodeNotes.map((id,i)=><button key={id} className={'graph-node '+(current===id?"active":"")} style={{left:points[i][0]+'%',top:points[i][1]+'%'}} onClick={()=>setCurrent(id)} aria-pressed={current===id}><i/><span>{starterNotes.find(n=>n.id===id)?.title}</span></button>)}
      <button className="graph-preview" onClick={()=>openNote(current)}><span><Icon name="file" size={15}/>{selected.title}</span><Icon name="upRight" size={15}/></button>
    </div></div>
    <div className="observatory-foot"><span><i/> Notebook online</span><span>04 notes in view</span></div>
  </div>;
}

function CardIndex({openNote}: Open) {
  const [i,setI]=useState(0);
  const note=starterNotes[i];
  return <div className="wrap index-hero">
    <div className="index-mast"><Label>The personal card index</Label><span className="micro">A—Z</span></div>
    <div className="index-head"><h1>A place for<br/><em>every idea.</em></h1><div><p className="lead">Collect your notes in a personal index. File a thought, link it to another, and find both when you need them.</p><Actions openNote={openNote} secondary={false}/></div></div>
    <div className="card-cabinet" data-visual data-enter-media>
      <div className="cabinet-tabs">{["Walking","Noticing","Gardening","Reading"].map((t,x)=><button key={t} aria-pressed={i===x} className={i===x?"active":""} onClick={()=>setI(x)}><span>0{x+1}</span>{t}</button>)}</div>
      <div className="catalogue-card"><div className="catalogue-id"><span className="micro">Note card</span><b>0{i+1}</b></div><div className="catalogue-entry"><span className="micro">From the notebook</span><h2>{note.title}</h2><p>{note.body.split("\n")[0]}</p></div><Image src={'/variants/with-taste-skill/gpt-6.2-astra/art/'+["everyday","everyday","projects","reading"][i]+'.webp'} alt="" width={190} height={110} className="catalogue-print"/><button aria-label={'Open '+note.title} onClick={()=>openNote(note.id)} className="card-open"><Icon name="upRight" size={28}/></button></div>
    </div>
  </div>;
}

function Daybook({openNote}: Open) {
  return <div className="wrap daybook-hero"><div className="day-intro">
    <span className="sunmark" aria-hidden="true"><BrandMark size={54}/></span><Label>The daily notebook</Label>
    <h1>Start with <em>today.</em></h1><p className="lead">A page for what’s on your mind. Keep the small observations and see which ideas return.</p><Actions openNote={openNote} secondary={false}/>
  </div>
  <div className="open-book" data-visual data-enter-media><div className="book-ribbon"/><div className="book-page book-left"><div className="book-kicker">Foliohm <span>Daybook</span></div><div className="hand">Notes to myself</div><p>Take the longer way home.<br/>Bring a notebook.<br/>See what catches my eye.</p><span className="book-pg">01</span></div>
    <div className="book-page book-right"><div className="book-kicker">Linked pages <Icon name="link" size={13}/></div><div className="hand">Pick up a thread</div>{starterNotes.slice(0,2).map(n=><button key={n.id} onClick={()=>openNote(n.id)}>{n.title}<Icon name="upRight" size={16}/></button>)}<Image src="/variants/with-taste-skill/gpt-6.2-astra/art/everyday.webp" alt="" width={100} height={100} className="book-print"/><span className="book-pg">02</span></div>
  </div></div>;
}
export default function Hero(props:HeroProps) {
  const Component=[Commonplace, FieldJournal, Observatory, CardIndex, Daybook][props.design-1];
  return <section className="hero" data-enter="true" id="top"><Component {...props}/></section>;
}
