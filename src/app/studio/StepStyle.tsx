// app/studio/StepStyle.tsx
"use client";

import OptionCard from "../../components/studio/OptionCard";
import { Persona } from "../../lib/studio/persona.types";

type StepStyleProps = {
  persona: Persona;
  onSelect: (styleExpression: string) => void;
};

export default function StepStyle({
  persona,
  onSelect,
}: StepStyleProps) {
  const options = [
    {
      label: "Subtle & graceful",
      description: "Soft presence, timeless elegance",
    },
    {
      label: "Traditional & rich",
      description: "Celebratory, rooted in heritage",
    },
    {
      label: "Calm & grounded",
      description: "Composed, confident, and effortless",
    },
  ];

  return (
    <section className="space-y-6">
      <h2 className="font-serif text-2xl text-gray-900">
        How would you like to feel?
      </h2>

      <div className="space-y-4">
        {options.map((option) => (
          <div key={option.label} className="space-y-1">
            <OptionCard
              title={option.label}
              isSelected={persona.styleExpression === option.label}
              onSelect={() => onSelect(option.label)}
            />
            <p className="font-sans text-xs text-gray-600 pl-2">
              {option.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
