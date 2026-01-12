// components/saree/CareNote.tsx
"use client";

type CareNoteProps = {
  note?: string;
};

export default function CareNote({ note }: CareNoteProps) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
      <h2 className="font-serif text-xl text-gray-900">
        Caring for your saree
      </h2>

      <p className="font-sans text-sm text-gray-700 leading-relaxed">
        {note ??
          "This saree is woven to be worn and cherished over years. Gentle dry cleaning and careful storage away from direct sunlight will help preserve its texture and colour. We include detailed care guidance with every order."}
      </p>

      <p className="font-sans text-xs text-gray-600">
        Crafted for longevity, not for seasons.
      </p>
    </section>
  );
}
