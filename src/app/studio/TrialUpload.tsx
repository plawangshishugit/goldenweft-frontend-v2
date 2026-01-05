// app/studio/TrialUpload.tsx
"use client";

import { useRef } from "react";

type TrialUploadProps = {
  onUpload: (file: File) => void;
  onSkip: () => void;
};

export default function TrialUpload({ onUpload, onSkip }: TrialUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <section className="space-y-6">
      <h2 className="font-serif text-2xl text-gray-900">
        Upload a full-length image
      </h2>

      <p className="font-sans text-sm text-gray-700 leading-relaxed">
        A simple, well-lit image helps us understand how sarees fall and
        feel on you. Any comfortable clothing is perfectly fine.
      </p>

      <ul className="font-sans text-sm text-gray-700 space-y-2 list-disc pl-5">
        <li>Natural lighting is best</li>
        <li>Full-length, front-facing image</li>
        <li>No need for professional photos</li>
      </ul>

      {/* Upload box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="cursor-pointer border-2 border-dashed border-gray-300 
                   rounded-2xl p-8 text-center space-y-2
                   hover:border-gray-900 transition-all"
      >
        <p className="font-sans text-sm text-gray-800">
          Tap to select an image
        </p>
        <p className="font-sans text-xs text-gray-600">
          JPG or PNG, up to 5MB
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onUpload(file);
          }
        }}
      />

      <button
        onClick={onSkip}
        className="w-full text-center font-sans text-sm underline text-gray-700"
      >
        Skip this step
      </button>
    </section>
  );
}
