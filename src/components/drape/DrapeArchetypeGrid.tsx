// components/drape/DrapeArchetypeGrid.tsx
import DrapeArchetypeCard from "./DrapeArchetypeCard";

type ArchetypeKey =
  | "soft-flowing"
  | "structured-poised"
  | "pallu-forward"
  | "minimal-balanced";

type Props = {
  preferredArchetypes?: ArchetypeKey[];
};

const ARCHETYPES = [
  {
    key: "soft-flowing" as const,
    title: "Soft & Flowing",
    imageUrl: "/drape/soft-flowing.jpg",
    description:
      "Falls gently with ease, allowing the saree to move naturally and feel breathable across long rituals and gatherings.",
  },
  {
    key: "structured-poised" as const,
    title: "Structured & Poised",
    imageUrl: "/drape/structured-poised.jpg",
    description:
      "Holds its form with clarity, creating a composed and dignified presence suited for ceremonial moments.",
  },
  {
    key: "pallu-forward" as const,
    title: "Pallu-Forward Grace",
    imageUrl: "/drape/pallu-forward.jpg",
    description:
      "Places visual emphasis on the pallu, letting its weave and detail carry the story while the rest remains understated.",
  },
  {
    key: "minimal-balanced" as const,
    title: "Minimal & Balanced",
    imageUrl: "/drape/minimal-balanced.jpg",
    description:
      "Keeps every element subtle and in proportion, creating a quiet, modern balance that adapts across occasions.",
  },
];

export default function DrapeArchetypeGrid({
  preferredArchetypes = [],
}: Props) {
  const sorted = [...ARCHETYPES].sort((a, b) => {
    const aPref = preferredArchetypes.includes(a.key);
    const bPref = preferredArchetypes.includes(b.key);
    return Number(bPref) - Number(aPref);
  });

  return (
    <section className="space-y-6">
      <div className="space-y-2 max-w-xl">
        <h2 className="font-serif text-2xl text-gray-900">
          Styling & Drape References
        </h2>
        <p className="font-sans text-sm text-gray-600">
          These references help visualise how a saree can feel when styled
          differently.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sorted.map((a) => (
          <DrapeArchetypeCard
            key={a.key}
            title={a.title}
            imageUrl={a.imageUrl}
            description={a.description}
            preferred={preferredArchetypes.includes(a.key)}
          />
        ))}
      </div>

        {/* ✅ MICRO-COPY (IMPORTANT) */}
        <div className="max-w-xl space-y-1">
          <p className="font-sans text-xs text-gray-500 italic">
            Some drape styles are shown first based on common styling preferences
            observed across occasions and wear.
          </p>
          <p className="font-sans text-xs text-gray-500 italic">
            These references are shared only as gentle guidance — all styles remain
            equally yours to explore.
          </p>
        </div>
    </section>
  );
}
