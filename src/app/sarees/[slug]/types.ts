export type TrialFeatures = {
  silhouetteType: "balanced" | "vertical" | "petite";
  borderTolerance: "light" | "medium";
  colorProfile: "warm" | "neutral" | "cool";
  postureType: "upright" | "relaxed";
};

export type ArchetypeKey =
  | "soft-flowing"
  | "structured-poised"
  | "pallu-forward"
  | "minimal-balanced";

export type SareeImage = {
  id: string;
  imageUrl: string;
  position: number;
};

export type Saree = {
  id: string;
  slug: string;
  name: string;
  region: string;

  heroImage: string;
  images: SareeImage[];

  baseReason: string;
  reason: string;

  fabric: string;
  weave: string;
  feel: string;
  weight: string;
  occasions: string[];

  price: number;
  stock: number;
  isActive: boolean;

  drape: "soft" | "structured";
  borderWeight: "light" | "medium";
  colorTone: "warm" | "neutral" | "cool";
};
