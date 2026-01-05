// app/sarees/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";

import SareeHero from "../../../components/saree/SareeHero";
import WhyChosen from "../../../components/saree/WhyChosen";
import SareeDetails from "../../../components/saree/SareeDetails";

import { loadPersona } from "../../../lib/studio/persona.storage";
import { Persona } from "../../../lib/studio/persona.types";

type Saree = {
  name: string;
  region: string;
  imageUrl: string;
  reason: string;
  fabric: string;
  weave: string;
  feel: string;
  weight: string;
  occasions: string[];
  price: number;
};

export default function SareeDetailPage() {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [saree, setSaree] = useState<Saree | null>(null);

  useEffect(() => {
    // Load persona (for future dynamic reasoning)
    const storedPersona = loadPersona();
    setPersona(storedPersona);

    // TEMP: mock saree data (will come from DB later)
    const mockSaree: Saree = {
      name: "Handwoven Banarasi Silk",
      region: "Banaras, Uttar Pradesh",
      imageUrl: "/sarees/banarasi-1.jpg",
      reason:
        "This saree was selected for its rich weave and balanced border, which complements your presence and remains comfortable through long ceremonial hours.",
      fabric: "Handwoven silk",
      weave: "Traditional handloom",
      feel: "Rich yet composed",
      weight: "Comfortable for extended wear",
      occasions: ["Wedding functions", "Family ceremonies"],
      price: 38500,
    };

    setSaree(mockSaree);
  }, []);

  if (!saree) return null;

  return (
    <main className="min-h-screen bg-[#F7F5F2] px-6 py-12 flex justify-center">
      <div className="w-full max-w-2xl space-y-10">
        {/* Hero */}
        <SareeHero
          name={saree.name}
          region={saree.region}
          imageUrl={saree.imageUrl}
        />

        {/* Why chosen */}
        <WhyChosen reason={saree.reason} />

        {/* Details */}
        <SareeDetails
          fabric={saree.fabric}
          weave={saree.weave}
          feel={saree.feel}
          weight={saree.weight}
          occasions={saree.occasions}
        />

        {/* Price */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-2">
          <p className="font-sans text-xs text-gray-600">
            Priced to honour craftsmanship and fair work
          </p>
          <p className="font-serif text-2xl text-gray-900">
            ₹{saree.price.toLocaleString("en-IN")}
          </p>
        </section>

        {/* CTA */}
        <button
          className="w-full rounded-full border border-gray-900 py-4 
                     font-sans text-sm text-gray-900
                     hover:bg-gray-900 hover:text-white
                     transition-all"
        >
          Add to My Collection
        </button>
      </div>
    </main>
  );
}
