export type Note = {
  id: string;
  title: string;
  body: string;
  collection: string;
  favorite: boolean;
  linked: string;
  image?: string;
};
export const collections = ["Ideas", "Field notes", "Reading"];
export const initialNotes: Note[] = [
  { id: "noticing", title: "The art of noticing", body: "A good idea often starts with paying a little more attention.\n\nOn the way home, I walked the same block twice. The second time I noticed the pale blue door, the smell of rosemary, and a bird’s nest above the awning.\n\nTry this again tomorrow.", collection: "Ideas", favorite: true, linked: "light" },
  { id: "light", title: "Light & space", body: "A collection of spaces that make me pause. The soft curve of the ceiling carries daylight deep into the room.\n\nA reminder to leave some empty space on the page.", collection: "Field notes", favorite: false, linked: "noticing", image: "architecture" },
  { id: "reading", title: "The reading list", body: "Books to spend a little more time with.\n\nThe Creative Act, Rick Rubin\nWays of Seeing, John Berger\nA Field Guide to Getting Lost, Rebecca Solnit", collection: "Reading", favorite: true, linked: "noticing", image: "green-notebook" },
  { id: "alps", title: "A week in the Dolomites", body: "Morning light on the pale limestone. Take the longer trail next time and bring a sketchbook.", collection: "Field notes", favorite: false, linked: "light", image: "dolomites" },
  { id: "olive", title: "An olive branch", body: "The underside of each leaf is lighter than the top. Keep this study for the botanical drawing series.", collection: "Field notes", favorite: false, linked: "noticing", image: "olive-study" },
  { id: "margin", title: "In the margins", body: "Put a pencil next to every book. A line in the margin is often the beginning of a thought worth keeping.", collection: "Reading", favorite: false, linked: "reading", image: "marginalia" },
];
export function blankNote(): Note {
  return { id: "", title: "", body: "", collection: "Ideas", favorite: false, linked: "" };
}
const storageKey = "folio-notebook-v1";
const localChange = "folio:notes";
let lastRaw: string | null = null;
let cache: Note[] = initialNotes;

export function getNotes(): Note[] {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw === lastRaw) return cache;
    const parsed: unknown = raw ? JSON.parse(raw) : initialNotes;
    if (Array.isArray(parsed) && parsed.every(n => n && ["id", "title", "body", "collection", "linked"].every(k => typeof n[k] === "string") && typeof n.favorite === "boolean")) {
      cache = parsed;
      lastRaw = raw;
    }
  } catch { /* Keep the current notebook available when storage is unavailable. */ }
  return cache;
}
export const serverNotes = () => initialNotes;
export function subscribeNotes(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(localChange, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(localChange, callback);
  };
}
export function writeNote(note: Note) {
  const notes = getNotes();
  const updated = notes.some(n => n.id === note.id) ? notes.map(n => n.id === note.id ? note : n) : [note, ...notes];
  const raw = JSON.stringify(updated);
  localStorage.setItem(storageKey, raw);
  cache = updated;
  lastRaw = raw;
  window.dispatchEvent(new Event(localChange));
}
