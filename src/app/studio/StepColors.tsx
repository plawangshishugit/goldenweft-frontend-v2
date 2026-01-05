// app/studio/StepColors.tsx
"use client";

import { Persona } from "../../lib/studio/persona.types";
import ColorSwatch from "../../components/studio/ColorSwatch";

type StepColorsProps = {
  persona: Persona;
  onChange: (colors: string[]) => void;
  onContinue: () => void;
};

const COLORS = [
  { label: "Sindoor Red", value: "sindoor", hex: "#8B1E1E" },
  { label: "Maroon", value: "maroon", hex: "#6E1F2B" },
  { label: "Ivory", value: "ivory", hex: "#EFE9DA" },
  { label: "Mustard", value: "mustard", hex: "#C49A2D" },
  { label: "Emerald", value: "emerald", hex: "#1E7F5C" },
  { label: "Soft Pastels", value: "pastel", hex: "#E8CFC8" },
];

export default function StepColors({
  persona,
  onChange,
  onContinue,
}: StepColorsProps) {
  function toggleColor(value: string) {
    if (persona.colorChoices.includes(value)) {
      onChange(persona.colorChoices.filter((c) => c !== value));
    } else {
      onChange([...persona.colorChoices, value]);
    }
  }

  return (
    <section className="space-y-6">
      <h2 className="font-serif text-2xl text-gray-900">
        Which colours feel right for you?
      </h2>

      <p className="font-sans text-sm text-gray-600">
        You may skip this step
      </p>

      <div className="grid grid-cols-2 gap-4">
        {COLORS.map((c) => (
          <ColorSwatch
            key={c.value}
            label={c.label}
            color={c.hex}
            isSelected={persona.colorChoices.includes(c.value)}
            onToggle={() => toggleColor(c.value)}
          />
        ))}
      </div>

      <button
        onClick={onContinue}
        className="font-sans text-sm underline text-gray-700"
      >
        Continue
      </button>
    </section>
  );
}
