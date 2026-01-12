// lib/personalization/mapFeaturesToArchetypes.ts

type TrialFeatures = {
  silhouetteType: "balanced" | "vertical" | "petite";
  borderTolerance: "light" | "medium";
  colorProfile: "warm" | "neutral" | "cool";
  postureType: "upright" | "relaxed";
};

type ArchetypeKey =
  | "soft-flowing"
  | "structured-poised"
  | "pallu-forward"
  | "minimal-balanced";

/**
 * Returns 1–2 archetypes that may feel more natural.
 * Never exclusive. Never forced.
 */
export function mapFeaturesToArchetypes(
  features?: TrialFeatures | null
): ArchetypeKey[] {
  if (!features) return [];

  const preferred: ArchetypeKey[] = [];

  if (features.postureType === "relaxed") {
    preferred.push("soft-flowing");
  }

  if (features.postureType === "upright") {
    preferred.push("structured-poised");
  }

  if (features.borderTolerance === "light") {
    preferred.push("minimal-balanced");
  }

  if (features.borderTolerance === "medium") {
    preferred.push("pallu-forward");
  }

  // Max 2 — restraint matters
  return preferred.slice(0, 2);
}
