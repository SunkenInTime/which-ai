export const editions = [
  { id: 1, name: "Paper system", color: "#ffd036" },
  { id: 2, name: "Pinboard", color: "#bcb8ea" },
  { id: 3, name: "Constellation", color: "#6565c7" },
  { id: 4, name: "Field journal", color: "#8e9d74" },
  { id: 5, name: "Card index", color: "#2a43d3" },
];

export type Note = {
  id: string;
  title: string;
  body: string;
  collection: string;
  links: string[];
};

export const examples: Note[] = [
  {
    id: "slow",
    title: "The art of noticing",
    collection: "Observations",
    body: "Take the long way home. Write down three things you usually walk past.\n\nToday it was the geometry of a fire escape, the smell of rain on brick, and the blue of a shopfront before it opened.",
    links: ["light", "walking"],
  },
  {
    id: "light",
    title: "Studies in light",
    collection: "References",
    body: "A collection of shapes made by afternoon light.\n\nLook for the moment a shadow stops belonging to the object that cast it. Save this as a reference for the next photo walk.",
    links: ["slow", "shapes"],
  },
  {
    id: "walking",
    title: "Thinking on foot",
    collection: "Ideas",
    body: "The best part of a walk is the space between destinations. Try taking a question outside and bringing one sentence home.",
    links: ["slow", "valley"],
  },
  {
    id: "shapes",
    title: "Borrowed shapes",
    collection: "Projects",
    body: "Build a small library of everyday shapes. A stairwell, a paper fold, a leaf caught between paving stones.\n\nUse one as the starting point for a new sketch.",
    links: ["light"],
  },
  {
    id: "valley",
    title: "The valley floor",
    collection: "Field notes",
    body: "From the ridge, the path looked like a thread. Down in the valley, every turn had its own weather.\n\nRemember the silver of the river against the dark firs.",
    links: ["walking", "quiet"],
  },
  {
    id: "lines",
    title: "Lines of inquiry",
    collection: "Research",
    body: "Which questions keep turning up in different projects? Keep a short list here and return to it when starting something new.",
    links: ["shapes"],
  },
  {
    id: "material",
    title: "Material studies",
    collection: "Projects",
    body: "Collect the textures that catch the afternoon light. Try a pencil rubbing of the stone wall by the studio.",
    links: ["light"],
  },
  {
    id: "quiet",
    title: "A quiet morning",
    collection: "Field notes",
    body: "Mist gathered between the trees before the first light reached the clearing. For ten minutes, the only sound was water.",
    links: ["valley"],
  },
];

export type OpenNotebook = (id?: string) => void;
