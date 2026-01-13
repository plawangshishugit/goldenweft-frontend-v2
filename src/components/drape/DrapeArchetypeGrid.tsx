import DrapeArchetypeCard from "./DrapeArchetypeCard";
import { DrapeArchetype } from "@/lib/drape/drape.types";

export default function DrapeArchetypeGrid({
  archetypes,
  preferredKeys = [],
}: {
  archetypes: DrapeArchetype[];
  preferredKeys?: string[];
}) {
  return (
    <section className="space-y-6">
      <div className="space-y-2 max-w-xl">
        <h2 className="font-serif text-2xl text-gray-900">
          Styling & Drape References
        </h2>
        <p className="font-sans text-sm text-gray-600">
          Editorial references to help visualise how the saree may be styled.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {archetypes.map((a) => (
          <DrapeArchetypeCard
            key={a.key}
            title={a.title}
            imageUrl={a.imageUrl}
            description={a.description}
            preferred={preferredKeys.includes(a.key)}
          />
        ))}
      </div>

      <p className="font-sans text-xs text-gray-500 italic max-w-xl">
        Styling references are editorial in nature and not representations of the
        wearer.
      </p>
    </section>
  );
}
