// components/saree/WhyChosen.tsx
"use client";

type WhyChosenProps = {
  reason: string;
  drapeLabel?: string; 
};

export default function WhyChosen({
  reason,
  drapeLabel,
}: WhyChosenProps) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
      <h2 className="font-serif text-xl text-gray-900">
        Why this was chosen for you
      </h2>

      <p className="font-sans text-sm text-gray-700 leading-relaxed">
        {reason}
      </p>

      {/* Subtle editorial drape cue */}
      {drapeLabel && (
        <p className="text-xs text-gray-500 italic">
          Often styled with a {drapeLabel} drape.
        </p>
      )}
    </section>
  );
}
