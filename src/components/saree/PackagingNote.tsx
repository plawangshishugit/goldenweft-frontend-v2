// components/saree/PackagingNote.tsx
"use client";

type PackagingNoteProps = {
  note?: string;
};

export default function PackagingNote({ note }: PackagingNoteProps) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
      <h2 className="font-serif text-xl text-gray-900">
        How it reaches you
      </h2>

      <p className="font-sans text-sm text-gray-700 leading-relaxed">
        {note ??
          "Your saree is prepared and packed with care, wrapped gently to protect its weave and finished by hand. We include a personal note and care guidance, so it arrives ready to be worn or gifted."}
      </p>

      <p className="font-sans text-xs text-gray-600">
        Thoughtfully prepared, never rushed.
      </p>
    </section>
  );
}
