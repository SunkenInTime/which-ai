export type Design = 1 | 2 | 3 | 4 | 5;
export const designs = [
  { name: "Commonplace", color: "#ef602f" },
  { name: "Field journal", color: "#718761" },
  { name: "Observatory", color: "#aee6bc" },
  { name: "Card index", color: "#ff6649" },
  { name: "Daybook", color: "#7089f7" },
];

export type Note = { id: string; title: string; body: string; links: string[] };
export const starterNotes: Note[] = [
  { id: "walk", title: "Thinking on foot", body: "Take the longer way home.\n\nA walk gives a half-formed idea time to become a question. Bring a notebook, leave a little space on the page, and write down what catches your eye.", links: ["attention","garden"] },
  { id: "attention", title: "The art of noticing", body: "A list of things I almost missed today.\n\nThe shadow that crossed my desk. A new leaf on the windowsill. The same bird on the same branch, three mornings in a row.", links: ["walk"] },
  { id: "garden", title: "A garden of ideas", body: "Return to the notes that still feel unfinished.\n\nSome thoughts need another thought beside them. This one belongs with my notes on walking and paying attention.", links: ["walk"] },
  { id: "reading", title: "The reading pile", body: "Keep a list of the ideas worth coming back to after the last page.\n\nOne thought per note, with a link back to the question that led me there.", links: ["attention"] },
];

export const features = [
  { title: "Capture anything", body: "A home for every passing thought.", icon: "capture", text: "Write down the sentence you keep turning over. Give it a title when you’re ready." },
  { title: "Connect ideas", body: "Find the threads between your notes.", icon: "connect", text: "Link two notes and follow the connection in either direction. Your original thought stays within reach." },
  { title: "Recall with ease", body: "Get back to what matters.", icon: "recall", text: "Search titles and the words inside a note. A single word can take you back to the whole idea." },
] as const;

export const questions = [
  ["What can I keep in Foliohm?", "Write a quick thought, a reading note, or a longer entry. Each note has a title, a body, and space for links to related notes."],
  ["Where are my notes saved?", "This notebook saves your notes in this browser on this device. They stay here when you refresh or switch between the five designs. Clearing your browser’s site data also clears the notebook."],
  ["How do I connect two notes?", "Open a note and choose a title under “Link a note”. Your connected notes appear on both pages so you can follow the thread back."],
  ["Do I need an account?", "You can open the notebook and start writing immediately. The browser keeps your saved notes without a sign-in."],
];
