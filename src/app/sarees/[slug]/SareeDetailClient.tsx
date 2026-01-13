"use client";

import { useEffect, useState } from "react";

import SareeHero from "../../../components/saree/SareeHero";
import WhyChosen from "../../../components/saree/WhyChosen";
import SareeDetails from "../../../components/saree/SareeDetails";
import CareNote from "../../../components/saree/CareNote";
import PackagingNote from "../../../components/saree/PackagingNote";
import TrustSection from "../../../components/saree/TrustSection";
import ClearPersonalization from "../../../components/saree/ClearPersonalization";
import DrapeArchetypeGrid from "../../../components/drape/DrapeArchetypeGrid";

import { buildPersonalizedReason } from "../../../lib/personalization/buildReason";
import { loadPersona } from "../../../lib/studio/persona.storage";
import { Persona } from "../../../lib/studio/persona.types";
import { mapFeaturesToArchetypes } from "../../../lib/personalization/mapFeaturesToArchetypes";
import { DrapeArchetype } from "../../../lib/drape/drape.types";

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

type Saree = {
  id: string;
  slug: string;
  name: string;
  region: string;

  imageUrl: string;
  heroImage: string;

  reason: string;
  baseReason: string;

  fabric: string;
  weave: string;
  feel: string;
  weight: string;
  occasions: string[];

  price: number;
  stock: number;
  isActive: boolean;
};

export default function SareeDetailClient({
  slug,
}: {
  slug: string;
}) {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [saree, setSaree] = useState<Saree | null>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [adding, setAdding] = useState(false);
  const [archetypes, setArchetypes] = useState<DrapeArchetype[]>([]);
  const [preferredArchetypes, setPreferredArchetypes] =
    useState<ArchetypeKey[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        // Persona (reserved)
        const storedPersona = loadPersona();
        if (isMounted) setPersona(storedPersona);

        // 1️⃣ Fetch saree
        const res = await fetch(`/api/sarees/${slug}`);
        if (res.status === 404) {
          if (isMounted) setNotFound(true);
          return;
        }

        const data: Saree = await res.json();

        // 2️⃣ Fetch drape archetypes (AFTER saree exists)
        const archetypeRes = await fetch("/api/drape-archetypes");
        if (archetypeRes.ok) {
          const all: DrapeArchetype[] = await archetypeRes.json();
          if (isMounted) setArchetypes(all);
        }

        // 3️⃣ Trial features
        let trialFeatures: TrialFeatures | null = null;
        try {
          const cookieRes = await fetch("/api/trial/session/read");
          if (cookieRes.ok) {
            const json = await cookieRes.json();
            trialFeatures = json.features ?? null;
          }
        } catch {}

        // 4️⃣ Personalization
        const finalReason = buildPersonalizedReason(
          { defaultReason: data.baseReason  },
          trialFeatures
        );

        const preferred = mapFeaturesToArchetypes(trialFeatures);

        if (isMounted) {
          setSaree(data);
          setReason(finalReason);
          setIsPersonalized(finalReason !== data.reason);
          setPreferredArchetypes(preferred);
        }
      } catch {
        if (isMounted) setNotFound(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F5F2] px-6 py-12 flex justify-center">
        <div className="w-full max-w-2xl font-sans text-sm text-gray-600">
          Loading saree details…
        </div>
      </main>
    );
  }

  if (notFound || !saree) {
    return (
      <main className="min-h-screen bg-[#F7F5F2] px-6 py-12 flex justify-center">
        <div className="w-full max-w-2xl space-y-3">
          <h1 className="font-serif text-2xl text-gray-900">
            This saree could not be found
          </h1>
          <p className="font-sans text-sm text-gray-600">
            It may have been moved or is no longer part of the current collection.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5F2] px-6 py-12 flex justify-center">
      <article
        aria-label={`Saree details for ${saree.name}`}
        className="w-full max-w-2xl space-y-10"
      >
        <SareeHero
          name={saree.name}
          region={saree.region}
          imageUrl={saree.heroImage}
        />
        <section className="space-y-2">
          <WhyChosen reason={reason} />
          {isPersonalized && <ClearPersonalization />}

          <section aria-label="Styling and drape references">
            <DrapeArchetypeGrid
              archetypes={archetypes}
              preferredKeys={preferredArchetypes}
            />
          </section>
        </section>

        <SareeDetails
          fabric={saree.fabric}
          weave={saree.weave}
          feel={saree.feel}
          weight={saree.weight}
          occasions={saree.occasions}
        />

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-2">
          <p className="font-sans text-xs text-gray-600">
            Priced to honour craftsmanship and fair work
          </p>
          <p className="font-serif text-2xl text-gray-900">
            ₹{saree.price.toLocaleString("en-IN")}
          </p>
        </section>

        {/* Stock & availability guard */}
        {!saree.isActive ? (
          <p className="text-sm text-gray-600 italic text-center">
            This saree is currently unavailable.
          </p>
        ) : saree.stock === 0 ? (
          <p className="text-sm text-gray-600 italic text-center">
            Currently out of stock.
          </p>
        ) : (
            <button
              disabled={adding}
              onClick={() => {
                setAdding(true);

                sessionStorage.setItem(
                  "gw_checkout_saree",
                  JSON.stringify({
                    slug: saree.slug,
                    name: saree.name,
                    price: saree.price,
                  })
                );

                setTimeout(() => {
                  window.location.href = "/checkout";
                }, 400);
              }}
              className={`w-full rounded-full border py-4 font-sans text-sm transition-all
                ${adding
                  ? "bg-gray-900 text-white cursor-wait"
                  : "border-gray-900 hover:bg-gray-900 hover:text-white"
                }`}
            >
              {adding ? "Reserving this saree…" : "Add to My Collection"}
            </button>
        )}
        <CareNote />
        <PackagingNote />
        <TrustSection />
      </article>
    </main>
  );
}
