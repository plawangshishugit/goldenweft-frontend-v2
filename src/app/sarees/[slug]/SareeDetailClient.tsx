"use client";

import { useEffect, useState } from "react";
import SareeSkeleton from "../../../components/skeletons/SareeSkeleton";
import SareeHero from "../../../components/saree/SareeHero";
import SareeDetails from "../../../components/saree/SareeDetails";
import CareNote from "../../../components/saree/CareNote";
import PackagingNote from "../../../components/saree/PackagingNote";
import TrustSection from "../../../components/saree/TrustSection";
import SareeGallery from "../../../components/saree/SareeGallery";

import { buildPersonalizedReason } from "../../../lib/personalization/buildReason";
import { loadPersona } from "../../../lib/studio/persona.storage";
import { mapFeaturesToArchetypes } from "../../../lib/personalization/mapFeaturesToArchetypes";
import { DrapeArchetype } from "../../../lib/drape/drape.types";

import {
  Saree,
  TrialFeatures,
  ArchetypeKey,
} from "./types";

import SareePurchase from "./sections/SareePurchase";
import SareePersonalization from "./sections/SareePersonalization";

export default function SareeDetailClient({ slug }: { slug: string }) {
  const [saree, setSaree] = useState<Saree | null>(null);
  const [reason, setReason] = useState("");
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [archetypes, setArchetypes] = useState<DrapeArchetype[]>([]);
  const [preferred, setPreferred] = useState<ArchetypeKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        loadPersona(); // reserved

        const res = await fetch(`/api/sarees/${slug}`);
        if (res.status === 404) {
          if (mounted) setNotFound(true);
          return;
        }

        const data: Saree = await res.json();

        if (!mounted) return;

        setSaree(data);

        // fire-and-forget extras (non-blocking)
        fetch("/api/drape-archetypes")
          .then(r => r.json())
          .then(setArchetypes)
          .catch(() => {});

        fetch("/api/trial/session/read")
          .then(r => r.ok ? r.json() : null)
          .then(json => {
            const features = json?.features ?? null;
            const finalReason = buildPersonalizedReason(
              { defaultReason: data.baseReason },
              features
            );

            setReason(finalReason);
            setIsPersonalized(finalReason !== data.reason);
            setPreferred(mapFeaturesToArchetypes(features));
          })
          .catch(() => {});
      } catch {
        if (mounted) setNotFound(true);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return <SareeSkeleton />;
  }

  if (notFound || !saree) {
    return (
      <main className="min-h-screen bg-[#F7F5F2] px-6 py-12 flex justify-center">
        <div className="w-full max-w-2xl space-y-3">
          <h1 className="font-serif text-2xl text-gray-900">
            This saree could not be found
          </h1>
          <p className="font-sans text-sm text-gray-600">
            It may have been moved or is no longer part of the collection.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5F2] px-6 py-12 flex justify-center">
      <article className="w-full max-w-2xl space-y-10">
        <div className="fade-up"></div>
        <SareeHero
          name={saree.name}
          region={saree.region}
          imageUrl={saree.heroImage}
        />
        <div className="fade-up fade-delay-1">
          <SareeGallery
            images={[...saree.images].sort((a, b) => a.position - b.position)}
            sareeName={saree.name}
          />
        </div>        
        <div className="fade-up fade-delay-2">
          <SareePersonalization
          reason={reason}
          isPersonalized={isPersonalized}
          drape={saree.drape}
          archetypes={archetypes}
          preferredKeys={preferred}
        />
        </div>      
        <div className="fade-up fade-delay-3">
          <SareeDetails {...saree} />
        </div>    
        <div className="fade-up fade-delay-3">
          <SareePurchase saree={saree} />
        </div>
        <div className="fade-up fade-delay-4">
          <CareNote />
          <PackagingNote />
          <TrustSection />
        </div> 
      </article>
    </main>
  );
}
