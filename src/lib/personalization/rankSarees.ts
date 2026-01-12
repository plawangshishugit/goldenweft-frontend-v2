type TrialFeatures = {
  silhouetteType: "balanced" | "vertical" | "petite";
  borderTolerance: "light" | "medium";
  colorProfile: "warm" | "neutral" | "cool";
  postureType: "upright" | "relaxed";
};

export function rankSarees<T>(
  sarees: T[],
  features?: TrialFeatures | null
): T[] {
  if (!features) return sarees;

  const f = features;

  function score(s: any) {
    let pts = 0;

    if (f.borderTolerance === "light" && s.borderWeight === "light") pts += 2;
    if (f.borderTolerance === "medium" && s.borderWeight === "medium") pts += 2;

    if (f.postureType === "relaxed" && s.drape === "soft") pts += 1;
    if (f.postureType === "upright" && s.drape === "structured") pts += 1;

    if (f.colorProfile === s.colorTone) pts += 1;

    return pts;
  }

  return [...sarees].sort((a, b) => score(b) - score(a));
}
