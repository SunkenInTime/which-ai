export const editions = [
  {
    id: "1",
    name: "Field notes",
    layout: "centred",
    label: "A personal notes app",
    title: ["A second brain", "for everyday notes."],
    description: "Keep the notes you write and the things you find in one place. Link ideas as you go and pick up a thought where you left it.",
    workspaceTitle: "Write your first note.",
    workspaceCopy: "Write a note, then follow a link to see what connects it to the rest of your notebook.",
    close: "Give that thought a page.",
    theme: "#f7f6ee",
    moment: "pinned-chapters",
  },
  {
    id: "2",
    name: "Mind map",
    layout: "split",
    label: "The linked notebook",
    title: ["Notes with", "connections."],
    description: "Give each idea a note of its own. Link related notes as you write, then see how they fit together on a single map.",
    workspaceTitle: "Follow the note links.",
    workspaceCopy: "Open a note, see what links to it, and follow one of those links to another part of your notebook.",
    close: "Put your ideas on the map.",
    theme: "#0b1427",
    moment: "cursor-spotlight",
  },
  {
    id: "3",
    name: "Scratchpad",
    layout: "collage",
    label: "The daily scratchpad",
    title: ["Notes for life’s", "loose ends."],
    description: "The line you heard on the train. The link you’ll need on Friday. Put it in a note now and sort it when you have time.",
    workspaceTitle: "Start with a line.",
    workspaceCopy: "Give a passing thought a title and a line or two. Attach it to a note that already has some context.",
    close: "Catch the next thought.",
    theme: "#fff7f2",
    moment: "word-highlight",
  },
  {
    id: "4",
    name: "The index",
    layout: "triptych",
    label: "A personal notebook",
    title: ["A notebook", "with an index."],
    description: "Keep reading lists, routes, and research in collections. Open any note and see the other pages that refer to it.",
    workspaceTitle: "Open a collection.",
    workspaceCopy: "Open a trip note to find the route, the packing list, and the details you’ve saved along the way.",
    close: "Start your own collection.",
    theme: "#f3f1e8",
    moment: "marquee-row",
  },
  {
    id: "5",
    name: "Recall",
    layout: "recall",
    label: "A searchable notebook",
    title: ["Your notes,", "back in reach."],
    description: "Type a word you remember. Veybrin searches the titles and text of your notes, so you can reopen the page you meant to find.",
    workspaceTitle: "Find a note again.",
    workspaceCopy: "Search for a word from a note. Open the result to pick up the thread or see where else you mentioned it.",
    close: "Keep a thought worth finding.",
    theme: "#181915",
    moment: "line-carries-colour",
  },
] as const;

export type Edition = (typeof editions)[number];
export type EditionId = Edition["id"];

export type Note = {
  id: string;
  title: string;
  text: string;
  collection: string;
  date: string;
  links: string[];
  image?: "forest" | "coast";
};

export const initialNotes: Note[] = [
  { id: "forest", title: "The art of noticing", collection: "Field notes", date: "Apr 12",
    text: "On the walk through the cedars, the light reached the ferns long before it touched the path. Come back here in the rain and see what stands out then.",
    links: ["walk", "reading"], image: "forest" },
  { id: "walk", title: "The long way home", collection: "Field notes", date: "Apr 10",
    text: "Take the path behind the station. Get off the path at the wooden bridge and follow the water as far as the old mill.",
    links: ["forest", "weekend"] },
  { id: "reading", title: "Ideas from the margins", collection: "Reading", date: "Apr 9",
    text: "When a passage makes you think about something else, write down both things. The association is easier to forget than the passage.",
    links: ["forest", "desk"] },
  { id: "train", title: "Things to look up", collection: "Inbox", date: "Apr 14",
    text: "Why rain smells stronger on warm pavement. The name of the plant growing between the stairs at the train station.",
    links: ["desk", "forest"] },
  { id: "coast", title: "Liguria on foot", collection: "Trips", date: "Apr 16",
    text: "Start above the village while the path is still in shade. Take the stone steps down through the olive groves and stop for lunch by the water.",
    links: ["weekend", "packing"], image: "coast" },
  { id: "packing", title: "A weekend bag", collection: "Trips", date: "Apr 15",
    text: "Notebook, pencil, rain shell, water bottle and the small camera. Put the itinerary in the outside pocket.",
    links: ["coast", "weekend"] },
  { id: "desk", title: "Notes from the desk", collection: "Projects", date: "Apr 7",
    text: "Keep a running list of unfinished questions at the end of each draft. Start there the next morning.",
    links: ["reading"] },
  { id: "weekend", title: "Plans for Saturday", collection: "Inbox", date: "Apr 13",
    text: "Walk to the market before lunch. If the rain holds, take the afternoon train out to the hills.",
    links: ["walk", "packing"] },
];

export const initialNoteByEdition: Record<EditionId, string> = {
  "1": "forest", "2": "forest", "3": "train", "4": "coast", "5": "train",
};
