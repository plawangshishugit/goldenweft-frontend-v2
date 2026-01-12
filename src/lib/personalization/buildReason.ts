// lib/personalization/buildReason.ts

type TrialFeatures = {
  silhouetteType: "balanced" | "vertical" | "petite";
  borderTolerance: "light" | "medium";
  colorProfile: "warm" | "neutral" | "cool";
  postureType: "upright" | "relaxed";
};

type SareeBase = {
  defaultReason: string;
};

export function buildPersonalizedReason(
  saree: SareeBase,
  features?: TrialFeatures | null
): string {
  if (!features) {
    return saree.defaultReason;
  }

  const notes: string[] = [];

  // Border & visual weight
  if (features.borderTolerance === "light") {
    notes.push(
      "lighter borders were prioritised to keep the overall look composed"
    );
  } else {
    notes.push(
      "a slightly stronger border was chosen to maintain visual balance"
    );
  }

  // Fabric & drape
  if (features.postureType === "relaxed") {
    notes.push(
      "a softer drape helps the saree feel comfortable through extended wear"
    );
  } else {
    notes.push(
      "a structured weave supports a poised and elegant fall"
    );
  }

  // Colour tone
  if (features.colorProfile === "warm") {
    notes.push(
      "warmer tones were favoured as they adapt well across natural lighting"
    );
  } else if (features.colorProfile === "cool") {
    notes.push(
      "cooler tones were selected for their calm and refined presence"
    );
  } else {
    notes.push(
      "neutral tones were chosen for their versatility across occasions"
    );
  }
const personalizedLine =
  " In addition, " + notes.join(", ") + ".";
  return (
    saree.defaultReason + personalizedLine
  );
}
