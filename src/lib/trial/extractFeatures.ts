// lib/trial/extractFeatures.ts
import sharp from "sharp";

export type TrialFeatures = {
  silhouetteType: "balanced" | "vertical" | "petite";
  borderTolerance: "light" | "medium";
  colorProfile: "warm" | "neutral" | "cool";
  postureType: "upright" | "relaxed";
};

/**
 * ETHICAL FEATURE EXTRACTION (SERVER-SAFE)
 * - No image storage
 * - No face/body landmarks
 * - No measurements
 * - Pure heuristics
 */
export async function extractFeaturesFromImage(
  buffer: Buffer
): Promise<TrialFeatures> {
  // Decode image
  const image = sharp(buffer);
  const meta = await image.metadata();

  if (!meta.width || !meta.height) {
    throw new Error("Invalid image");
  }

  // ---------- silhouette (aspect ratio proxy)
  const ratio = meta.width / meta.height;
  const silhouetteType =
    ratio < 0.38 ? "vertical" : ratio > 0.52 ? "petite" : "balanced";

  const borderTolerance =
    meta.height > 1400 ? "medium" : "light";

  // ---------- color profile (average RGB → warmth)
  const { data, info } = await image
    .resize(200, 200, { fit: "inside" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  let r = 0,
    g = 0,
    b = 0;

  for (let i = 0; i < data.length; i += info.channels) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }

  const px = data.length / info.channels;
  r /= px;
  g /= px;
  b /= px;

  const colorProfile =
    r > b + 15 && r > g ? "warm" :
    b > r + 15 ? "cool" :
    "neutral";

  // ---------- posture proxy (edge energy)
  const edges = await image
    .grayscale()
    .linear(1.2)
    .convolve({
      width: 3,
      height: 3,
      kernel: [-1, -1, -1, -1, 8, -1, -1, -1, -1],
    })
    .raw()
    .toBuffer();

  let energy = 0;
  for (let i = 0; i < edges.length; i++) {
    energy += edges[i];
  }

  const postureType =
    energy / edges.length > 35 ? "upright" : "relaxed";

  return {
    silhouetteType,
    borderTolerance,
    colorProfile,
    postureType,
  };
}
