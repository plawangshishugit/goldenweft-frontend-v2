// app/studio/TrialIntro.tsx
"use client";

type TrialIntroProps = {
  onProceed: () => void;
  onSkip: () => void;
};

export default function TrialIntro({ onProceed, onSkip }: TrialIntroProps) {
  return (
    <section className="space-y-6">
      <h2 className="font-serif text-2xl text-gray-900">
        Your private trial studio
      </h2>

      <p className="font-sans text-sm text-gray-700 leading-relaxed">
        If you wish, you can see how sarees are chosen for your comfort,
        drape, and presence. This helps us suggest borders, fabrics, and
        colours that feel more natural to you.
      </p>

      <ul className="font-sans text-sm text-gray-700 space-y-2 list-disc pl-5">
        <li>Only a full-length image is used</li>
        <li>Images are processed briefly and never stored</li>
        <li>You may skip this step without missing anything</li>
      </ul>

      <div className="flex flex-col gap-3 pt-2">
        <button
          onClick={onProceed}
          className="w-full rounded-full border border-gray-900 py-4 
                     font-sans text-sm text-gray-900
                     hover:bg-gray-900 hover:text-white
                     transition-all"
        >
          Enter the trial studio
        </button>

        <button
          onClick={onSkip}
          className="w-full text-center font-sans text-sm underline text-gray-700"
        >
          Skip for now
        </button>
      </div>
    </section>
  );
}
