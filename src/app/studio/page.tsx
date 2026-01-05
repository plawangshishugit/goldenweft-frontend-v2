// app/studio/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import StudioContainer from "./StudioContainer";
import StepOccasion from "./StepOccasion";
import StepFabric from "./StepFabric";
import StepColors from "./StepColors";
import StepStyle from "./StepStyle";
import TrialIntro from "./TrialIntro";
import TrialUpload from "./TrialUpload";

import { Persona } from "../../lib/studio/persona.types";
import { loadPersona, savePersona } from "../../lib/studio/persona.storage";

export default function StudioPage() {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [persona, setPersona] = useState<Persona>({
    occasion: null,
    fabricPreference: null,
    colorChoices: [],
    styleExpression: null,
  });

  // Load stored persona
  useEffect(() => {
    const stored = loadPersona();
    setPersona(stored);
  }, []);

  // Save persona on every change
  useEffect(() => {
    savePersona(persona);
  }, [persona]);

  return (
    <StudioContainer>
      {step === 1 && (
        <StepOccasion
          persona={persona}
          onSelect={(value) => {
            setPersona({ ...persona, occasion: value });
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <StepFabric
          persona={persona}
          onSelect={(value) => {
            setPersona({ ...persona, fabricPreference: value });
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <StepColors
          persona={persona}
          onChange={(colors) =>
            setPersona({ ...persona, colorChoices: colors })
          }
          onContinue={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <StepStyle
          persona={persona}
          onSelect={(value) => {
            setPersona({ ...persona, styleExpression: value });
            setStep(5);
          }}
        />
      )}

      {/* Trial Studio Intro */}
      {step === 5 && (
        <TrialIntro
          onProceed={() => setStep(6)}
          onSkip={() => router.push("/sarees")}
        />
      )}

      {/* Trial Studio Upload */}
      {step === 6 && (
        <TrialUpload
          onUpload={(file) => {
            // TEMP: we do nothing yet (CV comes later)
            console.log("Uploaded image:", file.name);
            router.push("/sarees");
          }}
          onSkip={() => router.push("/sarees")}
        />
      )}
    </StudioContainer>
  );
}
