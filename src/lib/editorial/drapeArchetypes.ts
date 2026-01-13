export type ArchetypeKey =
  | "soft-flowing"
  | "structured-poised"
  | "pallu-forward"
  | "minimal-balanced";

export const DRAPE_ARCHETYPES = [
  {
    key: "soft-flowing" as const,
    title: "Soft & Flowing",
    image: "/drape/soft-flowing/soft-flowing-1.jpg",
    description:
      "Falls gently with ease, allowing the saree to move naturally and feel breathable across long rituals and gatherings.",
  },
  {
    key: "structured-poised" as const,
    title: "Structured & Poised",
    image: "/drape/structured-poised/structured-poised-1.jpg",
    description:
      "Holds its form with clarity, creating a composed and dignified presence suited for ceremonial moments.",
  },
  {
    key: "pallu-forward" as const,
    title: "Pallu-Forward Grace",
    image: "/drape/pallu-forward/pallu-forward-1.jpg",
    description:
      "Places visual emphasis on the pallu, letting its weave and detail carry the story while the rest remains understated.",
  },
  {
    key: "minimal-balanced" as const,
    title: "Minimal & Balanced",
    image: "/drape/minimal-balanced.png",
    description:
      "Keeps every element subtle and in proportion, creating a quiet, modern balance that adapts across occasions.",
  },
];
