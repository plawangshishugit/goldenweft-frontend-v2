import WhyChosen from "../../../../components/saree/WhyChosen";
import ClearPersonalization from "../../../../components/saree/ClearPersonalization";
import DrapeArchetypeGrid from "../../../../components/drape/DrapeArchetypeGrid";
import { ArchetypeKey } from "../types";
import { DrapeArchetype } from "../../../../lib/drape/drape.types";

export default function SareePersonalization({
  reason,
  isPersonalized,
  drape,
  archetypes,
  preferredKeys,
}: {
  reason: string;
  isPersonalized: boolean;
  drape: "soft" | "structured";
  archetypes: DrapeArchetype[];
  preferredKeys: ArchetypeKey[];
}) {
  return (
    <section className="space-y-2">
      <WhyChosen
        reason={reason}
        drapeLabel={
          drape === "structured" ? "structured, poised" : "soft, flowing"
        }
      />

      {isPersonalized && <ClearPersonalization />}

      <section aria-label="Styling and drape references">
        <DrapeArchetypeGrid
          archetypes={archetypes}
          preferredKeys={preferredKeys}
        />
      </section>
    </section>
  );
}
