"use client";

import { useState } from "react";
import { Icon } from "./icons";

const atlasNotes = [
  { id: "idea", title: "The shape of an idea", type: "Thinking", excerpt: "Ideas grow through association. What changes when you organize by relationship instead of by topic?" },
  { id: "attention", title: "On paying attention", type: "Observation", excerpt: "Take the same walk twice. The second time, look for what you missed the first time." },
  { id: "seeing", title: "Ways of seeing", type: "Reading note", excerpt: "Pay attention to what’s usually left out of the frame. A shift in perspective can reveal a whole new story." },
  { id: "garden", title: "A garden of ideas", type: "Project", excerpt: "Leave space for the things you jot down today to become something you can use tomorrow." },
  { id: "walk", title: "Notes from a walk", type: "Field note", excerpt: "The linden tree is the last one on the street to lose its leaves. I wonder what makes it different." },
];

export function AtlasPreview() {
  const [selected, setSelected] = useState(0);
  const note = atlasNotes[selected];

  return (
    <div className="atlas-board" aria-label="Interactive note map">
      <div className="atlas-board-top"><span><Icon name="network" size={17} /> Idea map</span><span>5 notes</span></div>
      <div className="atlas-map">
        <div className="atlas-lines" aria-hidden="true"><i /><i /><i /><i /></div>
        {atlasNotes.map(({ id, title, type }, index) => (
          <button key={id} type="button" className={`atlas-node node-${id}`} onClick={() => setSelected(index)} aria-pressed={index === selected}>
            <Icon name={index === 0 ? "network" : "notes"} size={19} />
            <span><strong>{title}</strong><small>{type}</small></span>
          </button>
        ))}
      </div>
      <div className="atlas-caption" aria-live="polite"><strong>{note.title}</strong><p>{note.excerpt}</p></div>
    </div>
  );
}

const notebooks = [
  {
    title: "Design research", color: "tomato", icon: "network", notes: [
      { title: "The shape of an idea", detail: "Thoughts on organizing by relationship.", tag: "Ideas" },
      { title: "A small guide to asking why", detail: "Questions for my next interview.", tag: "Research" },
      { title: "What makes a space feel open?", detail: "An observation from the museum.", tag: "Observations" },
      { title: "Listening for what’s missing", detail: "Notes from the Tuesday workshop.", tag: "Research" },
    ],
  },
  {
    title: "Reading list", color: "blue", icon: "book", notes: [
      { title: "Ways of seeing", detail: "Things we leave out of the frame.", tag: "Art" },
      { title: "Books for the train", detail: "Three picks for the trip north.", tag: "To read" },
      { title: "A garden of ideas", detail: "A chapter worth revisiting.", tag: "Ideas" },
    ],
  },
  {
    title: "Personal", color: "green", icon: "folder", notes: [
      { title: "Notes from a walk", detail: "The linden tree on the corner.", tag: "Observations" },
      { title: "The good lentil soup", detail: "Ginger, lemon, and a little extra cumin.", tag: "Recipes" },
      { title: "Where to go in June", detail: "A few quiet places near the water.", tag: "Travel" },
    ],
  },
] as const;

export function LibraryPreview() {
  const [selected, setSelected] = useState(0);
  const collection = notebooks[selected];

  return (
    <div className="library-window" aria-label="Interactive library preview">
      <div className="library-topbar">
        <span><Icon name="mark" size={17} /> My workspace</span>
        <span className="library-avatar" aria-label="Sample profile">JD</span>
      </div>
      <div className="library-body">
        <div className="library-sidebar">
          <p>Collections</p>
          {notebooks.map(({ title, color, icon }, index) => (
            <button type="button" key={title} onClick={() => setSelected(index)} aria-pressed={selected === index}>
              <span className={`library-folder ${color}`}><Icon name={icon} size={15} /></span>{title}
            </button>
          ))}
        </div>
        <div className="library-main" aria-live="polite">
          <div className="library-heading">
            <span className={`library-folder ${collection.color}`}><Icon name={collection.icon} size={24} /></span>
            <div><h2>{collection.title}</h2><p>{collection.notes.length} notes</p></div>
          </div>
          <div className="library-notes">
            {collection.notes.map(({ title, detail, tag }) => (
              <article key={title}>
                <Icon name="notes" size={17} />
                <h3>{title}</h3>
                <p>{detail}</p>
                <span>{tag}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
