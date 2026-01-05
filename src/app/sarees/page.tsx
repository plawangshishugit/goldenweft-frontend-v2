// app/sarees/page.tsx
"use client";

import { useEffect, useState } from "react";
import SareeCard from "../../components/saree/SareeCard";
import { Persona } from "../../lib/studio/persona.types";
import { loadPersona } from "../../lib/studio/persona.storage";

type Saree = {
  id: string;
  slug: string;
  name: string;
  region: string;
  imageUrl: string;
  reason: string;
};

export default function SareesPage() {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [sarees, setSarees] = useState<Saree[]>([]);

  useEffect(() => {
    const storedPersona = loadPersona();
    setPersona(storedPersona);

    // TEMP curated mock data (slug is key now)
    const curated: Saree[] = [
      {
        id: "1",
        slug: "handwoven-banarasi-silk",
        name: "Handwoven Banarasi Silk",
        region: "Banaras, Uttar Pradesh",
        imageUrl: "/sarees/banarasi-1.jpg",
        reason:
          "Chosen for its rich weave and balanced border, suitable for long ceremonial hours.",
      },
      {
        id: "2",
        slug: "bhagalpuri-tussar-silk",
        name: "Bhagalpuri Tussar Silk",
        region: "Bhagalpur, Bihar",
        imageUrl: "/sarees/bhagalpuri-1.jpg",
        reason:
          "Selected for its soft fall and breathable comfort, ideal for composed gatherings.",
      },
      {
        id: "3",
        slug: "banarasi-subtle-zari",
        name: "Classic Banarasi with Subtle Zari",
        region: "Banaras, Uttar Pradesh",
        imageUrl: "/sarees/banarasi-2.jpg",
        reason:
          "Recommended for its understated richness that complements a graceful presence.",
      },
    ];

    setSarees(curated);
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F5F2] px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Heading */}
        <div className="max-w-xl space-y-2">
          <h1 className="font-serif text-3xl text-gray-900">
            Sarees chosen for you
          </h1>
          <p className="font-sans text-sm text-gray-600">
            Based on what felt right to you
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sarees.map((saree) => (
            <SareeCard
              key={saree.id}
              name={saree.name}
              region={saree.region}
              imageUrl={saree.imageUrl}
              reason={saree.reason}
              slug={saree.slug}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
