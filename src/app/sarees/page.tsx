// app/sarees/page.tsx
"use client";

import { useEffect, useState } from "react";
import SareeCard from "../../components/saree/SareeCard";
import { rankSarees } from "../../lib/personalization/rankSarees";

type TrialFeatures = {
  silhouetteType: "balanced" | "vertical" | "petite";
  borderTolerance: "light" | "medium";
  colorProfile: "warm" | "neutral" | "cool";
  postureType: "upright" | "relaxed";
};

type Saree = {
  id: string;
  slug: string;
  name: string;
  region: string;
  imageUrl: string;
  reason: string;

  // soft attributes for ranking only
  borderWeight?: "light" | "medium";
  drape?: "soft" | "structured";
  colorTone?: "warm" | "neutral" | "cool";
};

export default function SareesPage() {
  const [sarees, setSarees] = useState<Saree[]>([]);

useEffect(() => {
  async function load() {
    const res = await fetch("/api/sarees");
    const data = (await res.json()) as Saree[];
      // setSarees(data);

    let features: TrialFeatures | null = null;
    try {
      const f = await fetch("/api/trial/session/read");
      if (f.ok) {
        const json = await f.json();
        features = json.features ?? null;
      }
    } catch {}

    const ranked = rankSarees(data, features);
    setSarees(ranked);
  }

  load();
}, []);


  return (
    <main className="min-h-screen bg-[#F7F5F2] px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="max-w-xl space-y-2">
          <h1 className="font-serif text-3xl text-gray-900">
            Sarees chosen for you
          </h1>
          {!sarees.length && (
            <p className="text-sm text-gray-600 italic">
              Our current selection is being curated.
            </p>
          )}
          <p className="font-sans text-sm text-gray-600">
            Based on what felt right to you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sarees.map((s) => (
            <SareeCard
              key={s.id}
              name={s.name}
              region={s.region}
              imageUrl={s.imageUrl}
              reason={s.reason}
              slug={s.slug}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
