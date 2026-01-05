// app/studio/StepOccasion.tsx
"use client";

import OptionCard from "@/components/studio/OptionCard";
import { Persona } from "../../lib/studio/persona.types";

type StepOccasionProps = {
  persona: Persona;
  onSelect: (occasion: string) => void;
};

export default function StepOccasion({
  persona,
  onSelect,
}: StepOccasionProps) {
  const options = [
    "Pooja & rituals",
    "Family gathering",
    "Wedding (self / close family)",
    "Daily elegance",
  ];

  return (
    <section className="space-y-6">
      <h2 className="font-serif text-2xl text-gray-900">
        What are you dressing for?
      </h2>

      <div className="space-y-4">
        {options.map((option) => (
          <OptionCard
            key={option}
            title={option}
            isSelected={persona.occasion === option}
            onSelect={() => onSelect(option)}
          />
        ))}
      </div>
    </section>
  );
}
