// lib/studio/persona.storage.ts

import { Persona } from "./persona.types";

const STORAGE_KEY = "goldenweft_persona";

export function loadPersona(): Persona {
  if (typeof window === "undefined") {
    return {
      occasion: null,
      fabricPreference: null,
      colorChoices: [],
      styleExpression: null,
    };
  }

  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      occasion: null,
      fabricPreference: null,
      colorChoices: [],
      styleExpression: null,
    };
  }

  return JSON.parse(stored);
}

export function savePersona(persona: Persona) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(persona));
}
