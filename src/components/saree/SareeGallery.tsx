"use client";

import { useEffect, useRef } from "react";

type GalleryImage = {
  id: string;
  imageUrl: string;
};

export default function SareeGallery({
  images,
  sareeName,
}: {
  images: GalleryImage[];
  sareeName: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // prevent page scroll
      e.preventDefault();

      // move gallery horizontally
      el.scrollLeft += e.deltaY;
    };

    // 👇 CRITICAL: passive must be false
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="font-serif text-xl text-gray-900">
        Details & Craft
      </h2>

      <div
        ref={scrollRef}
        className="
          flex gap-4 overflow-x-auto scrollbar-hide
          animate-fade-in scroll-smooth samp-x snap-mandatory
        "
      >
        {images.map((img) => (
          <img
            key={img.id}
            src={img.imageUrl}
            alt={`${sareeName} detail`}
            className="h-72 w-auto rounded-2xl object-cover flex-shrink-0 border"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      <p className="text-xs text-gray-500 italic">
        Each piece carries subtle variations from hand-finishing.
      </p>
    </section>
  );
}
