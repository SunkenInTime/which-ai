export type Edition = 1 | 2 | 3 | 4 | 5;

export const editions = [
  { id: 1, name: "Alpine", color: "#39543a" },
  { id: 2, name: "Constellation", color: "#7e76ba" },
  { id: 3, name: "Commonplace", color: "#26489a" },
  { id: 4, name: "Pinboard", color: "#e8a1ba" },
  { id: 5, name: "Still Life", color: "#9c7557" },
] as const;

export const chapters = [
  {
    label: "Capture",
    title: "Catch a passing thought.",
    body: "Open a new note and write down the part you want to remember. A sentence from a book, a question on a walk, or the beginnings of a project all belong here.",
    example:
      "Walk the long way home. The best ideas seem to arrive somewhere between the park and my front door.",
    exampleTitle: "On the walk home",
  },
  {
    label: "Connect",
    title: "Give your ideas a thread.",
    body: "Add a topic to a note. Notes with the same topic appear together under Related notes, so you can move between a thought and the ideas it sparked.",
    example:
      "Two notes on paying attention, one from a walk and one from a book. I want to explore where they meet.",
    exampleTitle: "Creative practice",
  },
  {
    label: "Recall",
    title: "Find your way back.",
    body: "Search your notebook for a title, a topic, or a phrase you remember. Open a result to pick up your thought exactly where you left it.",
    example:
      "What was that idea I had on the walk home? Searching for “park” brings the whole note back.",
    exampleTitle: "Back to the park",
  },
];
