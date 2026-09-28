export type Design = {
  n: number;
  name: string;
  /** Three swatches shown next to the name in the switcher. */
  swatches: [string, string, string];
};

export const designs: Design[] = [
  { n: 1, name: "Living Note", swatches: ["#FBFBFD", "#20263A", "#4A3FCB"] },
  { n: 2, name: "Strata", swatches: ["#E7EAE4", "#2B3654", "#E0A82E"] },
  { n: 3, name: "Slip Box", swatches: ["#234E45", "#F7F6F0", "#D2493F"] },
  { n: 4, name: "Highlighter", swatches: ["#2340F0", "#FFFFFF", "#FFE500"] },
  { n: 5, name: "Atlas", swatches: ["#EEF1EC", "#164A8F", "#FF4FA3"] },
];
