// app/studio/StepFabric.tsx
"use client";

import OptionCard from "../../components/studio/OptionCard";
import { Persona } from "../../lib/studio/persona.types";

type StepFabricProps = {
  persona: Persona;
  onSelect: (fabricPreference: string) => void;
};

export default function StepFabric({
  persona,
  onSelect,
}: StepFabricProps) {
  const options = [
    "Soft & breathable",
    "Rich & ceremonial",
    "Balanced",
  ];

  return (
    <section className="space-y-6">
      <h2 className="font-serif text-2xl text-gray-900">
        What kind of comfort do you prefer today?
      </h2>

      <p className="font-sans text-sm text-gray-600">
        You can change this anytime later
      </p>

      <div className="space-y-4">
        {options.map((option) => (
          <OptionCard
            key={option}
            title={option}
            isSelected={persona.fabricPreference === option}
            onSelect={() => onSelect(option)}
          />
        ))}
      </div>
    </section>
  );
}
